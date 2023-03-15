<template>
    <v-container>
        <v-row>
            <v-col>
                <v-alert density="compact" class="mb-4 pa-4" :color="authStore.getUser.active === 1 ? 'green' : 'error'" :icon="authStore.getUser.active === 1 ? 'mdi-shield-check' : 'mdi-shield-alert'">
                    <div class="d-lg-flex justify-space-between">
                        <div class="mb-2 mb-lg-0">
                            <p class="text-body-1 font-weight-bold">Аккаунт {{authStore.getUser.active === 1 ? 'онлайн' : 'оффлайн'}}</p>
                            <p class="text-body-2" v-if="authStore.getUser.active === 1">Внимание, все активные объявления будут доступны покупателю!</p>
                            <p class="text-body-2" v-else>Новые сделки не создаются, необходимо перейти в онлайн режим!</p>
                        </div>
                        <v-btn color="white" elevation="0" @click="changeStatus" :loading="loader">
                            Перейти в {{authStore.getUser.active === 1 ? 'оффлайн' : 'онлайн'}}
                        </v-btn>
                    </div>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../../stores/auth.js'

export default {
    data(){
        return{
            authStore: useAuthStore(),
            loader: false
        }
    },
    methods: {
        async changeStatus(){
            this.loader = true
            const payload = this.authStore.getUser.active === 1 ? { active: 0 } : { active: 1 }
            await this.authStore.CHANGE_STATUS(payload).then(() =>{
                this.loader = false
            })
            
        }
    }
}
</script>