<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useFlowStore } from "./stores/flow";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const flow = useFlowStore();

function logout() {
  auth.logout();
  flow.resetAfterLogin();
  router.push({ name: "login" });
}
</script>

<template>
  <el-container class="app-root">
    <el-header class="app-header" height="56px">
      <div class="header-bar">
        <span class="brand">TF 商城 · 网页流程</span>
        <el-menu
          mode="horizontal"
          :ellipsis="false"
          class="top-menu"
          :router="true"
          :default-active="route.path"
        >
          <el-menu-item index="/rush">抢购任务</el-menu-item>
          <template v-if="auth.accessToken">
            <el-menu-item index="/goods">商品</el-menu-item>
            <el-menu-item index="/checkout">结算</el-menu-item>
          </template>
          <el-menu-item v-else index="/login">商城登录</el-menu-item>
        </el-menu>
        <div class="header-actions">
          <el-text
            v-if="auth.accessToken && auth.currentUser"
            type="info"
            size="small"
            class="user-label"
          >
            {{ auth.currentUser.phone || auth.currentUser.account }}
          </el-text>
          <el-button
            v-if="auth.accessToken"
            type="primary"
            link
            @click="logout"
          >
            退出
          </el-button>
        </div>
      </div>
    </el-header>
    <el-main class="app-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
html {
  overflow-y: auto;
}
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  font-family:
    "Helvetica Neue", helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Segoe UI", system-ui, sans-serif;
}
#app {
  min-height: 100vh;
  overflow: visible;
}
/* Element Plus：避免整页被套进「视口高度 + main 内滚动」导致底部表格被裁切 */
.app-root.el-container {
  min-height: 100vh;
  height: auto !important;
  max-height: none !important;
  display: flex;
  flex-direction: column;
  overflow: visible !important;
}
.app-header {
  padding: 0 16px;
  border-bottom: 1px solid var(--el-border-color);
}
.header-bar {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand {
  flex-shrink: 0;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--el-text-color-primary);
}
.top-menu {
  flex: 1;
  min-width: 0;
  border-bottom: none !important;
  background: transparent !important;
}
.top-menu.el-menu--horizontal {
  height: 56px;
}
.header-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-label {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-main.el-main {
  width: 100%;
  padding: 20px 16px 48px;
  box-sizing: border-box;
  flex: 0 0 auto !important;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;
  flex-basis: auto !important;
  height: auto !important;
  max-height: none !important;
  min-height: 0 !important;
  overflow: visible !important;
}
</style>
