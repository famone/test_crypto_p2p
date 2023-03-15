<template>
    <v-navigation-drawer v-model="drawer" :temporary="this.$vuetify.display.smAndDown ? true : false" color="#2f2f2f" class="pt-4 px-4">
        <!-- app clipped -->
        <div class="text-center d-flex justify-center align-center px-2 mb-4 mx-auto">
            <img src="../../assets/img/fireex.gif" style="height:30px;" class="mr-2">
            <p class="font-weight-bold text-white text-h6">fireex.online</p>
        </div>
        <v-divider color="grey"></v-divider>
        <v-list nav dense expand >
            <v-list-item nav link :to="'/'">
                <v-list-item-title class=" text-white">
                    <v-icon class="mr-2">mdi-text-box-outline</v-icon>Сделки
                </v-list-item-title>
            </v-list-item>
            <v-list-item nav link :to="'/calls'">
                <v-list-item-title class="text-white">
                    <v-icon class="mr-2">mdi-currency-usd</v-icon>Объявления
                </v-list-item-title>
            </v-list-item>
            <v-list-item nav link :to="'/balance'">
                <v-list-item-title class=" text-white">
                    <v-icon class="mr-2">mdi-piggy-bank-outline</v-icon>Баланс
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <v-divider color="grey" class="mb-8"></v-divider>
        <div class="px-4 mb-4" v-if="authStore.user">
            <div>
                <v-badge dot color="success" >
                        <v-avatar color="primary" size="30">
                        <v-icon icon="mdi-account-circle"></v-icon>
                        </v-avatar>
                    </v-badge>
                <span class="text-body-2 text-white ml-4">{{authStore.user?.user_email}}</span>
            </div>
        </div>
        <v-list nav dense expand >
            <v-list-item nav link :to="'/account'">
                <v-list-item-title class=" text-white">
                    <v-icon class="mr-2">mdi-account-check</v-icon>Профиль
                </v-list-item-title>
            </v-list-item>
            <v-list-item nav link @click="logOut">
                <v-list-item-title class="text-white">
                    <v-icon class="mr-2">mdi-exit-to-app</v-icon>Выход
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { useAuthStore } from '../../stores/auth.js'

export default {
    data(){
        return{
            drawer: true,
            authStore: useAuthStore(),
        }
    },
    methods: {
        logOut(){
            this.authStore.logOut()
            this.emitter.emit("toggle-snackbar", {text: 'Сессия завершена', color: ''});
            this.$router.replace('/enter')
        }
    },
    mounted(){
        this.emitter.on("toggle-drawer", (payload) => {
            this.drawer = payload
        });
    }
}
</script>