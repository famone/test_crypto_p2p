<template>
    <v-card :width="this.$vuetify.display.smAndDown ? 'auto' : '800'" class="mx-auto">
        <v-toolbar color="primary" class="px-6">
            <div class="text-h6">Новое объявление</div>
        </v-toolbar>
        <v-card-text class="pt-8">
            <v-row>
                <v-col cols="12" lg="4">
                    <!-- <v-select label="Выберите тип" :items="['Продать', 'Купить']" variant="outlined" color="primary" bg-color="white" class="elevation-0" density="compact" hide-details v-model="new_call.call_type"/> -->
                    <v-select label="Способ оплаты" :items="banks" variant="outlined" color="primary" bg-color="white" density="compact" class="elevation-0" hide-details  v-model="new_call.payment_bank" item-title="name" item-value="value" />
                </v-col>
                <!-- <v-col cols="6" lg="4">
                    <v-select label="Криптоактив" :items="['USDT']" variant="outlined" color="primary" bg-color="white" density="compact" class="elevation-0" hide-details v-model="new_call.crypto"/>
                </v-col> -->
                 <v-col cols="6" lg="4">
                    <v-autocomplete 
                        label="Валюта"
                        variant="outlined"
                        auto-select-first
                        color="primary" 
                        bg-color="white"
                        density="compact"
                        class="elevation-0"
                        hide-selected
                        hide-details
                        v-model="new_call.currency"
                        :items="['RUB']"
                        />
                </v-col>
                <v-col cols="6" lg="4">
                    <v-text-field label="Курс" variant="outlined" color="primary" bg-color="white" density="compact" class="elevation-0" hide-details v-model="new_call.course">
                        <template v-slot:prepend>
                           <v-icon size="small" @click="new_call.course = (parseFloat(new_call.course) - 0.01).toFixed(2)">mdi-minus</v-icon>
                        </template>
                        <template v-slot:append>
                           <v-icon size="small" @click="new_call.course = (parseFloat(new_call.course) + 0.01).toFixed(2)">mdi-plus</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0">
                    <label>Реквизиты</label>
                </v-col>
                <v-col cols="12" lg="8" class="d-flex" v-for="(item, i) in new_call.cards" :key="i">
                    <v-text-field 
                    label="Номер карты" 
                    variant="outlined" 
                    color="primary" 
                    bg-color="white" 
                    density="compact" 
                    class="elevation-0 mr-2" 
                    hide-details   
                    v-model="item.value"
                    v-mask="'#### #### #### ####'">
                        <template v-slot:append-inner>
                           <div class="d-flex align-center" style="height:22px;color:#6200ee;">
                             <img :src="getPaymentSystem(item.value)" style="height:10px;">
                           </div>
                        </template>
                    </v-text-field>
                    <v-btn height="40" color="primary" class="elevation-0" variant="text" @click="addRequiz">
                        <v-icon>mdi-plus-circle</v-icon>
                        <span class="d-none d-sm-block">Добавить</span>
                    </v-btn>
                    <v-btn height="40" min-width="40" max-width="40" class="elevation-0" variant="text" color="grey" @click="new_call.reqviz.splice(i, 1)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" class="pt-4">
                    <v-divider class="my-0"></v-divider>
                </v-col>
                <v-col cols="12" lg="8">
                    <label>Лимит</label>
                    <div class="d-flex">
                        <v-text-field v-model="new_call.min" label="От" variant="outlined" color="primary" bg-color="white" density="compact" class="elevation-0 mr-2" hide-details/>
                        <v-text-field v-model="new_call.max" label="До" variant="outlined" color="primary" bg-color="white" density="compact" class="elevation-0 ml-2" hide-details/>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn @click="closeDialog">Закрыть</v-btn>
            <v-btn color="primary" @click="addNewCall" :loading="loader">Создать объявление</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
import cardFormater from '../../mixins/cardFormater.js'
import { useCallsStore } from '../../stores/calls.js'
import { useCatalogsStore } from '../../stores/catalogs.js'
import { useAuthStore } from '../../stores/auth.js'
import { API } from '../../HTTP-common'

export default {
    props: {
        currencies: {
            required: true,
            type: Array
        }
    },
    mixins: [cardFormater],
    data(){
        return{
            cardNum: '',
            callsStore: useCallsStore(),
            catalogsStore: useCatalogsStore(),
            authStore: useAuthStore(),
            loader: false,
            banks: [
                {
                    name: 'Сбербанк',
                    value: 'sberbank'
                },
                {
                    name: 'Тинькофф',
                    value: 'tinkoff'
                },
                {
                    name: 'Райфайзен',
                    value: 'rajfajzen'
                }
            ],
            new_call: {
                payment_bank: '',
                course: useCatalogsStore().get_udst_to_rub,
                currency: '',
                cards: [
                    {
                        value: ''
                    }
                ],
                min: '',
                max: ''
            }
        }
    },
    methods: {
        closeDialog(){
            this.$emit('closeDialog')
        },
        addRequiz(){
            this.new_call.cards.push({value: ''})
        },
        addNewCall(){
            const payload = {
                    ...this.new_call
                }
            const headers = {
                'Authorization': `Bearer ${this.authStore.getUser.token}`
            }
            this.loader = true
            axios.post(`${API}api/exchange/v1/set/calls`, payload, {headers})
            .then(res =>{
                this.loader = false
                this.emitter.emit("toggle-snackbar", {text: 'Объявление создано', color: 'success'});
                this.closeDialog()
                this.callsStore.LOAD_CALLS()
            })
            .catch(() =>{
                this.emitter.emit("toggle-snackbar", {text: 'Ошибка!', color: 'error'});
                this.closeDialog()
            })
            // this.callsStore.ADD_CALL(payload)
        }
    }
}
</script>