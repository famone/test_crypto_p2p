import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
import { API } from '../HTTP-common'


export const useCallsStore = defineStore('calls', {
    state: () => {
        return {
            calls: []
        }
    },
    getters: {
        getCalls(){
            return this.calls
        }
    },
    actions: {
        ADD_CALL(payload){
            this.calls.push(payload)
        },
        LOAD_CALLS(){
            this.calls = []
            const user = useAuthStore()
            const headers = {
                'Authorization': `Bearer ${user.getUser.token}`
            }
            axios.get(`${API}api/exchange/v1/get/calls`, {headers})
            .then((res) =>{
                this.calls = res.data
            })
            .catch((err) =>{
                console.log(err)
            })
        },
        SWITCH_CALL(payload){
            const user = useAuthStore()
            const headers = {
                'Authorization': `Bearer ${user.getUser.token}`
            }
            axios.post(`${API}/api/exchange/v1/switch/calls`, payload, {headers})
            .then((res) =>{
                // сделать замену в стэйте
                console.log(res.data)
            })
        },
        DELETE_CALL(id){
            const user = useAuthStore()
            const headers = {
                'Authorization': `Bearer ${user.getUser.token}`
            }
            axios.delete(`${API}/api/exchange/v1/delete/calls`, {data: {id: id}, headers })
            .then(() =>{
               const index = this.calls.findIndex((obj) => obj.id === id)
               this.calls.splice(index, 1);
            })
        }
    },
})