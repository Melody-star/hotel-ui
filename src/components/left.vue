<template>
    <div class="content">
        <div class="content-left">
            <div class="left-title">
                <div class="nav-title2">功能菜单</div>
            </div>
            <slot></slot>

            <el-menu :default-active="activeIndex" @select="handleSelect" :router="true" background-color="#1c232f"
                text-color="white" active-text-color="white">

                <el-sub-menu index="1">
                    <template #title>
                        <span>客房管理</span>
                    </template>
                    <el-menu-item :index="{ name: 'ShowRoom' }">客房列表</el-menu-item>
                    <el-menu-item :index="{ name: 'AddRoom' }">添加客房</el-menu-item>
                    <el-menu-item :index="{ name: 'FindRoom' }">查找客房</el-menu-item>
                    <el-menu-item :index="{ name: 'BookRoom' }">客房预订</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                        <span>餐饮管理</span>
                    </template>
                    <el-menu-item :index="{ name: 'ShowFood' }">菜品列表</el-menu-item>
                    <el-menu-item :index="{ name: 'AddFood' }">添加菜品</el-menu-item>
                    <el-menu-item :index="{ name: 'FindFood' }">查找菜品</el-menu-item>
                    <el-menu-item :index="{ name: 'FoodCount' }">信息统计</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>
                        <span>财务管理</span>
                    </template>
                    <el-menu-item index="3-1">查看账单</el-menu-item>
                    <el-menu-item index="3-2">工资管理</el-menu-item>
                    <el-menu-item index="3-3">打印报表</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="4">
                    <template #title>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1">待使用</el-menu-item>
                    <el-menu-item index="4-2">未支付</el-menu-item>
                    <el-menu-item index="4-3">历史记录</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'

let activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
    activeIndex = key
}
</script>
  
<style scoped>
.content {
    width: 100%;
    height: 100%;
}

.content-left {
    width: 100%;
    height: 835px;
    background-color: #1c232f;
    float: left;
}

.content-right {
    width: 81%;
    height: 600px;
    background-color: #6495ED;
    float: left;
}

.left-title {
    width: 100%;
    height: 50px;
}

.left-title>a {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    /*去掉a下默认下划线*/
    text-decoration: none;
}

/*分割线*/
.seg {
    height: 1px;
    width: 100%;
    background-color: black;
}

.nav {
    /*上下5,左右0*/
    margin: 5px 0;
}

/*菜单项主标题*/
.nav-title {
    height: 40px;
    width: 100%;
    color: white;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}

.nav-title2 {
    height: 40px;
    width: 100%;
    color: white;
    text-align: center;
    line-height: 40px;
}

/*子标题内容区*/
.nav-content {
    width: 100%;
    height: 100%;
    background-color: #0C1119;
}

/*子标题的样式*/
.nav-content>a {
    display: block;
    width: 100%;
    height: 30px;
    color: #CCCCCC;
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
}

/*子标题鼠标经过时的改变颜色*/
.nav-content>a:hover {
    color: #FFFFFF;
    background-color: #12040c;
}

/*内容区*/
.content-right {
    font-size: 50px;
    line-height: 600px;
    text-align: center;
}
</style>
  