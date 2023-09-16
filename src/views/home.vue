<template>
    <div class="box">
        <div class="box-top">
            <top></top>
        </div>
        <div class="box-bottom">
            <div style="flex-grow: 1;border-right: 4px solid #008000;">
                <left>
                    <div v-show="showLogin">
                        <router-link to="/login">
                        <div class="text-login">注册/登录</div>
                    </router-link>
                    </div>
                </left>
            </div>
            <div style="flex-grow: 32;">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup>
import top from "../components/top.vue"
import left from '../components/left.vue'
import { useUserStore } from "../store/index"
import { onMounted, ref } from "vue"

const userStore = useUserStore()

const showLogin = ref(false)

onMounted(() => {
    if (Object.keys(userStore.userInfo).length === 0) {
        showLogin.value = true
    } else {
        showLogin.value = false
    }
})
</script>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
}

.box-top {
    border-bottom: 4px solid #008000;
}

.box-bottom {
    display: flex;
}

.text-login {
    color: white;
    width: 100%;
    text-align: center;
    margin-top: 69px;
}
</style>