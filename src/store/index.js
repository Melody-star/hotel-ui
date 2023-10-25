import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const useUserStore = defineStore('user', () => {
    let userInfo = ref({})
    function setUserInfo(value) {
        userInfo = value
    }

    return { userInfo, setUserInfo }
})