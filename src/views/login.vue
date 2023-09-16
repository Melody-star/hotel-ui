<template>
    <div class="control">
        <div class="item">
            <div class="active">登录</div>
            <div @click="register">注册</div>
        </div>
        <div class="content">
            <div style="display: block;">
                <form name="login">
                    <p>账号</p>
                    <input v-model="username" type="text" placeholder="username" />
                    <p>密码</p>
                    <input v-model="password" type="password" placeholder="password" />
                    <br />
                    <button @click="login">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"  // 引入userRouter
import { ref } from "vue"
import axios from "axios"
import { ElMessage } from "element-plus"
import { useUserStore } from "../store/index"

const userStore = useUserStore()
const router = useRouter()

let username = ref("")
let password = ref("")

const register = () => {
    router.push({
        path: '/register'
    })
}

const login = async () => {
    if (username.value && password.value) {
        const res = await axios.get('/user/login', {
            params: {
                username: username.value,
                password: password.value
            }
        })
        if (res.data.message == '登录成功') {
            ElMessage({
                message: '登录成功',
                type: 'success'
            })
            userStore.userInfo = res.data.data
            router.push({
                path: '/home'
            })
        } else {
            ElMessage({
                message: res.data.message,
                type: 'error'
            })
        }
    } else {
        ElMessage({
            message: '请输入账号和密码',
            type: 'info'
        })
    }
}
</script>

<style scoped>
.control {
    width: 340px;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
}

.item {
    width: 340px;
    height: 60px;
    background: #eeeeee;
}

.item div {
    width: 170px;
    height: 60px;
    display: inline-block;
    color: black;
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
}

.content {
    width: 100%;
}

.content div {
    margin: 20px 30px;
    display: none;
    text-align: left;
}

p {
    color: #4a4a4a;
    margin-top: 30px;
    margin-bottom: 6px;
    font-size: 15px;
}

.content input[type="text"],
.content input[type="password"] {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #adadad;
    padding: 0 10px;
    box-sizing: border-box;
}

button {
    margin-top: 40px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    color: white;
    border: 1px solid #adadad;
    background: #00dd60;
    cursor: pointer;
    letter-spacing: 4px;
    margin-bottom: 40px;
}

.active {
    background: white;
}

.item div:hover {
    background: #f6f6f6;
}
</style>
