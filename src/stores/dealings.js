import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { API } from '../HTTP-common'


export const useDealingsStore = defineStore('dealings', {
    state: () => {
        return {
            snackbar: null,
            newDeals: [],
            waitingDeals: [],
            completedDeals: [],
            loader: true
        }
    },
    getters: {
        getNewDeals(){
            return this.newDeals
        },
        getWaitingDeals(){
            return this.waitingDeals
        },
        getCompletedDeals(){
            return this.completedDeals
        },
        getLoader(){
            return this.loader
        },
    },
    actions: {
        async LOAD_DEALINGS(){
            this.loader = true
            const user = useAuthStore()
            const headers = {
                'Authorization': `Bearer ${user.getUser.token}`
            }
            try{
                const {data} = await axios.get(`${API}api/exchange/v1/get/user/sales`, {headers})
                this.newDeals = data.filter((i) => i.status === 'pending')
                this.waitingDeals = data.filter((i) => i.status === 'processing')
                this.completedDeals = data.filter((i) => i.status === 'completed')
                this.loader = false
            } catch(err) {
                console.log(err)
                this.loader = false
            }
        },
        async APPLY_DEAL(payload){
            const user = useAuthStore()
            const headers = {
                'Authorization': `Bearer ${user.getUser.token}`
            }
            try{
                const {data} = await axios.post(`${API}api/exchange/v1/set/sale/status`, payload, {headers})
            } catch(err) {
                console.log(err)
            }
        }
    },
})