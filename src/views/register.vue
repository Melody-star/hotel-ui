<template>
    <div class="control">
        <div class="item">
            <div @click="login">登录</div>
            <div class="active">注册</div>
        </div>
        <div class="content">
            <div style="display: block;">
                <form>
                    <p>账号</p>
                    <input v-model="username" type="text" placeholder="username" />
                    <p>密码</p>
                    <input v-model="password" type="password" placeholder="password" />
                    <p>确认密码</p>
                    <input v-model="password2" type="password" placeholder="password" />
                    <p>邮箱</p>
                    <input v-model="email" type="text" placeholder="email" />
                    <br />
                    <button @click="register">注册</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"  // 引入userRouter
import { ElMessage } from "element-plus"
import axios from "axios"

const router = useRouter()

let username = ref("")
let password = ref("")
let password2 = ref("")
let email = ref("")

const login = () => {
    router.push({
        path: '/login'
    })
}

const register = async () => {
    if (username.value && password.value && password2.value && email.value) {
        if (password.value != password2.value) {
            ElMessage({
                message: '两次输入的密码不一致',
                type: 'warning'
            })
            return
        }

        const res = await axios.post('/user', {
            username: username.value,
            password: password.value,
            email: email.value,
            name: "",
            userType: "1",
            phoneNumber: ""
        })
        if (res.data.message == '注册成功') {
            ElMessage({
                message: '注册成功',
                type: 'success'
            })
            login()
        } else {
            ElMessage({
                message: '注册失败',
                type: 'error'
            })
        }
    } else {
        ElMessage({
            message: '请填写完整信息',
            type: 'info'
        })
    }
    // login()
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