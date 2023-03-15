<template>
    <v-container>
        <v-row style="height:100vh;" class="d-flex align-center">
            <v-col cols="4" class="mx-auto">
                <div class="text-center d-flex justify-center align-center px-2 mb-4 mx-auto">
                    <img src="../assets/img/fireex.gif" style="height:30px;" class="mr-2">
                    <p class="font-weight-bold text-white text-h6">fireex.online</p>
                </div>
                <v-card color="#2f2f2f" flat class="py-8 px-16 pb-12 rounded-lg">
                    <h3 class="text-white text-h6 font-weight-bold text-center mb-4">Регистрация</h3>
                    <v-form @submit.prevent="submit">
                        <v-text-field v-model="email" label="E-mail" variant="solo" color="primary" bg-color="white" class="elevation-0" density="comfortable"/>
                        <v-text-field v-model="phone" label="Телефон" variant="solo" color="primary" bg-color="white" class="elevation-0" density="comfortable" v-mask="'+7 (###) ###-##-##'"/>
                        <v-text-field v-model="password" label="Пароль" variant="solo" color="primary" bg-color="white" class="elevation-0" density="comfortable" type="password"/>
                        <v-btn type="submit" color="primary" class="elevation-0 mx-auto" block size="large" :loading="load">Войти</v-btn>
                        <p class="text-white text-center text-body-2 mt-4">Уже есть аккаунта? <router-link tag="a" to="/enter" class="text-white">Войти!</router-link></p>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
    data(){
        return{
            load: false,
            authStore: useAuthStore(),
            email: '',
            phone: '',
            password: ''
        }
    },
    methods: {
        submit(){
            this.load = true
            const payload = { 
                email: this.email,
                phone: this.phone,
                password: this.password 
            }
            this.authStore.CREATE_USER(payload).then(() =>{
                this.load = false
                // this.$router.replace('/enter')
            })
        }
    }
}
</script>