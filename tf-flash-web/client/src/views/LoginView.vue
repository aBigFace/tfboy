<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "../api/http";
import { useAuthStore } from "../stores/auth";
import { useFlowStore } from "../stores/flow";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const flow = useFlowStore();

const username = ref("");
const password = ref("");
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    const { data } = await http.post("/api/auth/login", {
      username: username.value.trim(),
      password: password.value,
    });
    if (!data.ok) throw new Error(data.message || "登录失败");
    auth.setLogin(data.data);
    auth.saveReloginCredentials(
      username.value.trim(),
      password.value
    );
    flow.resetAfterLogin();
    ElMessage.success("登录成功");
    const redir = route.query.redirect;
    router.replace(typeof redir === "string" ? redir : "/goods");
  } catch (e) {
    ElMessage.error(
      e.response?.data?.message ||
        e.response?.data?.detail?.error_description ||
        e.message ||
        String(e)
    );
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <el-card shadow="hover" class="login-card">
    <template #header>
      <span>账号登录</span>
    </template>
    <el-text type="info" size="small" class="login-hint">
      密码规则与小程序一致，服务端 RSA 加密；仅用于学习自用。
    </el-text>
    <el-form label-position="top" @submit.prevent="submit">
      <el-form-item label="手机号 / 邮箱">
        <el-input
          v-model="username"
          autocomplete="username"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="password"
          type="password"
          show-password
          autocomplete="current-password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
          {{ loading ? "登录中…" : "登录" }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.login-card {
  max-width: 420px;
  margin: 0 auto;
}
.login-hint {
  display: block;
  margin-bottom: 16px;
  line-height: 1.5;
}
</style>
