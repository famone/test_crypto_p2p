import { defineStore } from 'pinia'
import axios from 'axios'
import { API } from '../HTTP-common'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null
        }
    },
    getters: {
        getUser(){
            return this.user
        }
    },
    actions: {
        async AUTH_REQUEST(payload) {
            try {
                const { data } = await axios.post(`${API}api/jwt-auth/v1/token`, payload)
                return this.VALIDATE(data)
            }
            catch (err) {
                return err.response.status
            }
        },
        async VALIDATE(payload){
            try {
                const { data } = await axios({
                    url: `${API}api/jwt-auth/v1/token/validate`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${payload.token}`
                    }
                })
                if(data.data.status === 200){
                    this.user = payload
                }else{
                    this.user = null
                }
                return data.data.status
            }
            catch (err) {
                return err.response.status
            }
        },
        async CREATE_USER(payload){
            try{
                const { data } = await axios.post('https://exchange.webink.site/api/exchange/v1/add/user', payload)
                console.log(data)
            }
            catch (err) {
                console.log(err)
            }
        },
        logOut(){
            this.user = null
        },
        async CHANGE_STATUS(payload){
            const headers = {
                'Authorization': `Bearer ${this.user.token}`
            }
            try{
                const { data } = await axios.post(`${API}api/exchange/v1/switch/status`, payload, {headers})
                this.user.active = data
            } catch(err) {
                console.log(err)
            }
        },
        GET_SESSIONS(){
            const headers = {
                'Authorization': `Bearer ${this.user.token}`
            }
            axios.get(`${API}/api/exchange/v1/get/session`, {headers})
            .then(res =>{
                console.log(res)
            })
        }
    },
    persist: true
})