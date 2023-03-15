<template>
    <v-container>
        <v-row style="height:100vh;" class="d-flex align-center">
            <v-col cols="12" lg="4" class="mx-auto">
                <div class="text-center d-flex justify-center align-center px-2 mb-4 mx-auto">
                    <img src="../assets/img/fireex.gif" style="height:30px;" class="mr-2">
                    <p class="font-weight-bold text-white text-h6">fireex.online</p>
                </div>
                <v-card color="#2f2f2f" flat class="py-8 px-12 pb-12 px-lg-16 rounded-lg">
                    <h3 class="text-white text-h6 font-weight-bold text-center mb-4">Авторизация</h3>
                    <v-form @submit.prevent="submit">
                        <v-text-field v-model="username" label="Логин" variant="solo" color="primary" bg-color="white" class="elevation-0" density="comfortable"/>
                        <v-text-field 
                            v-model="password" 
                            label="Пароль" 
                            variant="solo" 
                            color="primary" 
                            bg-color="white" 
                            class="elevation-0" 
                            density="comfortable" 
                            :type="show_pass ? 'text' : 'password'">
                                <template v-slot:append-inner>
                                    <v-icon size="small" @click="show_pass = !show_pass">{{show_pass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}}</v-icon>
                                </template>
                        </v-text-field>
                        <v-btn type="submit" color="primary" class="elevation-0 mx-auto" block size="large" :loading="load">Войти</v-btn>
                        <!-- <p class="text-white text-center text-body-2 mt-4">Еще нет аккаунта? <router-link tag="a" to="/signup" class="text-white">Зарегистироватья!</router-link></p> -->
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'
import { useUiStore } from '../stores/ui.js'

export default {
    // computed: {
    //     // note we are not passing an array, just one store after the other
    //     // each store will be accessible as its id + 'Store'
    //     ...mapStores(useCartStore, useUserStore)
    // },
    data(){
        return{
            show_pass: false,
            load: false,
            authStore: useAuthStore(),
            uiStore: useUiStore(),
            username: '',
            password: ''
        }
    },
    methods: {
        submit(){
            this.load = true
            const payload = { 
                username: this.username, 
                password: this.password 
            }
            this.authStore.AUTH_REQUEST(payload).then((status) =>{
                this.load = false
                console.log(status)
                if(status == 200){
                   this.emitter.emit("toggle-snackbar", {text: 'Вход в аккаунт выполнен', color: 'success'});
                   this.$router.replace('/')
                }else{
                    this.emitter.emit("toggle-snackbar", {text: 'Ошибка входа!', color: 'error'});
                }
            })
        }
    }
}
</script>