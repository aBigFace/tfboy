import axios from "axios";
import { getActivePinia } from "pinia";
import { useAuthStore } from "../stores/auth";
import { REL_U, REL_P } from "../config/reloginKeys";

/** 不带拦截器的裸客户端，仅用于静默登录，避免死循环 */
const raw = axios.create({
  baseURL: "",
  timeout: 60000,
});

const http = axios.create({
  baseURL: "",
  timeout: 60000,
});

/** 多请求同时 401 时共用一个登录过程 */
let reloginChain = Promise.resolve(null);

function isSessionInvalid(response) {
  if (!response) return false;
  if (response.status === 401) return true;
  const d = response.data;
  if (!d || typeof d !== "object") return false;
  const msg = [d.message, d.detail?.error, d.detail?.error_description]
    .filter(Boolean)
    .join(" ");
  const low = JSON.stringify(d).toLowerCase();
  if (msg.includes("401")) return true;
  if (low.includes("账号在其他地方登录")) return true;
  if (d.detail?.error === "invalid_token") return true;
  if (d.detail?.error === "unauthorized") return true;
  return false;
}

function applyLoginPayload(payload) {
  sessionStorage.setItem("tf_at", payload.access_token);
  sessionStorage.setItem("tf_login", JSON.stringify(payload));
  try {
    const pinia = getActivePinia();
    if (pinia) useAuthStore().setLogin(payload);
  } catch {
    /* pinia 尚未就绪时仅写 sessionStorage */
  }
}

async function silentReloginOnce() {
  const u = sessionStorage.getItem(REL_U);
  const p = sessionStorage.getItem(REL_P);
  if (!u || !p) return null;
  const { data } = await raw.post("/api/auth/login", {
    username: u,
    password: p,
  });
  if (!data?.ok || !data.data?.access_token) return null;
  applyLoginPayload(data.data);
  return data.data.access_token;
}

function queueRelogin() {
  reloginChain = reloginChain.then(async () => {
    try {
      return await silentReloginOnce();
    } catch {
      return null;
    }
  });
  return reloginChain;
}

http.interceptors.request.use((config) => {
  if (config.__skipAuth) return config;
  const url = String(config.url || "");
  if (url.includes("/api/auth/login")) {
    delete config.headers.Authorization;
    return config;
  }
  /** 抢购接口仅用服务端 rush 账号 token，勿带商城 Bearer，避免失效 token 触发 401 重登/误杀请求 */
  if (url.includes("/api/rush")) {
    delete config.headers.Authorization;
    return config;
  }
  const t = sessionStorage.getItem("tf_at");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const res = error.response;
    const cfg = error.config;
    if (!cfg || cfg.__authRetry || cfg.__skipAuth) {
      return Promise.reject(error);
    }
    if (!isSessionInvalid(res)) {
      return Promise.reject(error);
    }
    const token = await queueRelogin();
    if (!token) {
      try {
        const pinia = getActivePinia();
        if (pinia) useAuthStore().clearSessionOnly();
      } catch {
        sessionStorage.removeItem("tf_at");
        sessionStorage.removeItem("tf_login");
      }
      return Promise.reject(error);
    }
    const retry = {
      ...cfg,
      __authRetry: true,
      headers: { ...cfg.headers, Authorization: `Bearer ${token}` },
    };
    return http.request(retry);
  }
);

export { raw as rawHttp };
export default http;
