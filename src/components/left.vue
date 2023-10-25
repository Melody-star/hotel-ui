<template>
  <div style="background-color: #1c232f;height: 100vh;">
    <div class="left-title">
      <div style="color: #ffffff;width: 100%;text-align: center;padding-top: 20px;">功能菜单</div>
    </div>
    <slot></slot>

    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      :router="true"
      background-color="#1c232f"
      text-color="white"
      active-text-color="white"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>客房管理</span>
        </template>
        <el-menu-item :index="{ name: 'ShowRoom' }">客房列表</el-menu-item>
        <el-menu-item v-show="isLogin && isAdmin" :index="{ name: 'AddRoom' }"
          >添加客房</el-menu-item
        >
        <el-menu-item :index="{ name: 'FindRoom' }">查找客房</el-menu-item>
        <el-menu-item :index="{ name: 'BookRoom' }">客房预订</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <span>餐饮管理</span>
        </template>
        <el-menu-item :index="{ name: 'ShowFood' }">菜品列表</el-menu-item>
        <el-menu-item v-show="isLogin && isAdmin" :index="{ name: 'AddFood' }"
          >添加菜品</el-menu-item
        >
        <el-menu-item :index="{ name: 'FindFood' }">查找菜品</el-menu-item>
        <!-- <el-menu-item :index="{ name: 'FoodCount' }">信息统计</el-menu-item> -->
      </el-sub-menu>

      <el-sub-menu v-show="isLogin && isAdmin" index="3">
        <template #title>
          <span>财务管理</span>
        </template>
        <el-menu-item :index="{ name: 'Bill' }">查看账单</el-menu-item>
        <el-menu-item :index="{ name: 'Wages' }">工资管理</el-menu-item>
        <el-menu-item :index="{ name: 'Count' }">财务统计</el-menu-item>
      </el-sub-menu>

      <el-sub-menu v-show="isLogin && isAdmin" index="4">
        <template #title>
          <span>订单管理</span>
        </template>
        <el-menu-item :index="{ name: 'Unpaid' }">待支付</el-menu-item>
        <el-menu-item :index="{ name: 'UnUse' }">待使用</el-menu-item>
        <el-menu-item :index="{ name: 'OrderHistory' }">历史记录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/index";

const userStore = useUserStore();
let isLogin = ref(null);
let isAdmin = ref(null);

onMounted(() => {
  if (Object.keys(userStore.userInfo).length != 0) {
    isLogin.value = true;
    if (userStore.userInfo.userType == 1) {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }
  } else {
    isLogin.value = false;
  }
});

let activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  activeIndex = key;
};
</script>

<style scoped>

</style>
