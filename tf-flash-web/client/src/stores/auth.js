import { defineStore } from "pinia";
import { REL_U, REL_P } from "../config/reloginKeys";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    loginPayload: null,
  }),
  getters: {
    currentUser: (s) => s.loginPayload?.currentUser ?? null,
  },
  actions: {
    setLogin(data) {
      this.accessToken = data.access_token || "";
      this.loginPayload = data;
      if (this.accessToken) {
        sessionStorage.setItem("tf_at", this.accessToken);
        sessionStorage.setItem("tf_login", JSON.stringify(data));
      }
    },
    /** 供静默重登：保存最近一次商城登录账号密码（sessionStorage） */
    saveReloginCredentials(username, password) {
      if (username && password != null) {
        sessionStorage.setItem(REL_U, String(username).trim());
        sessionStorage.setItem(REL_P, String(password));
      }
    },
    clearReloginCredentials() {
      sessionStorage.removeItem(REL_U);
      sessionStorage.removeItem(REL_P);
    },
    loadSession() {
      const raw = sessionStorage.getItem("tf_login");
      if (!raw) return;
      try {
        const d = JSON.parse(raw);
        this.accessToken = d.access_token || "";
        this.loginPayload = d;
      } catch {
        this.logout();
      }
    },
    /** 只清 token（静默重登失败时保留已存账号密码方便再次手动登录） */
    clearSessionOnly() {
      this.accessToken = "";
      this.loginPayload = null;
      sessionStorage.removeItem("tf_at");
      sessionStorage.removeItem("tf_login");
    },
    logout() {
      this.clearSessionOnly();
      sessionStorage.removeItem(REL_U);
      sessionStorage.removeItem(REL_P);
    },
  },
});
