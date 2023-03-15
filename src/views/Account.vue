<template>
    <v-container>
        <v-row>
            <v-col cols="12" lg="4">
                <h2 class="text-white mb-8">Профиль</h2>
                <v-row>
                    <v-col cols="4">
                        <p class="text-grey text-body-2">Пользователь</p>
                    </v-col>
                    <v-col cols="8">
                        <p class="text-white text-body-1">  
                            <span>{{authStore.getUser.user_nicename}}</span>
                        </p>
                    </v-col>

                    <v-col cols="4">
                        <p class="text-grey text-body-2">Зарегистрирован</p>
                    </v-col>
                    <v-col cols="8">
                        <p class="text-white text-body-1">  
                            <span>{{formateDate(authStore.getUser.registred)}}</span>
                        </p>
                    </v-col>

                    <v-col cols="4">
                        <p class="text-grey text-body-2">E-mail</p>
                    </v-col>
                    <v-col cols="8">
                        <p class="text-white text-body-1">  
                            {{authStore.getUser.user_email}}
                        </p>
                    </v-col>
                    <v-col cols="4">
                        <p class="text-grey text-body-2">Телефон</p>
                    </v-col>
                    <v-col cols="8">
                        <p class="text-white text-body-1">  
                            +7 999 999-99-99
                        </p>
                    </v-col>
                </v-row>

                <!-- <v-row>
                    <v-col cols="4">
                        <p class="text-grey text-body-2">Кешбек</p>
                    </v-col>
                    <v-col cols="8">
                        <p class="text-white text-body-1">  
                            1,7%
                        </p>
                    </v-col>
                </v-row> -->
            </v-col>
            <v-col cols="12">
                <h2 class="text-white mt-8">API</h2>
                <v-table theme="dark">
                <thead>
                    <tr>
                        <th class="text-left">Название</th>
                        <th class="text-left">Параметры</th>
                        <th class="text-left">Права доступа</th>
                        <th class="text-left">Дата окончания</th>
                        <th class="text-left">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in 4" :key="i" class="text-body-2">
                        <td>Без названия <br> <span class="text-body-2 text-grey">{{new Date()}}</span></td>
                        <td><v-icon size="x-small" color="green" class="mr-1">mdi-shield-check</v-icon>2FA включён</td>
                        <td style="white-space:nowrap;">
                           <v-chip class="mr-1" color="green" label>read</v-chip>
                           <v-chip class="mr-1" color="green" label>action</v-chip>
                           <v-chip class="mr-1" color="green" label>post</v-chip>
                        </td>
                        <td class="text-body-2">Никогда</td>
                        <td><v-btn class="elevation-0" size="small">Отозвать</v-btn></td>
                    </tr>
                </tbody>
            </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'
import dates from '../mixins/dates'

export default {
    mixins: [dates],
    data(){
        return{
            authStore: useAuthStore(),
        }
    }
}
</script>

<style scoped>
td{
    white-space: nowrap !important;
}
</style>