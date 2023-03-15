<template>
    <v-row>
        <v-col cols="12" class="text-center mb-4">
            <h2 class="text-white">Шаг 1: Выберите банк</h2>
            <p class="text-body-1 text-grey">Нажмите на удобный Вам банк</p>
        </v-col>
        <v-col cols="12" lg="3" sm="8" md="6" class="mx-auto" v-if="available_banks.length">
            <v-card @click="selectBank(getBankItem(item).name, index)" :color="getBankItem(item).color" rounded="lg" class="pa-6 mb-8" elevation="0" v-for="(item, index) in available_banks" :key="index">
                <div class="d-flex justify-space-between align-center">
                    <img :src="getBankItem(item).logo" alt="">
                    <v-progress-circular
                    indeterminate
                    v-if="selected_index !== null && index === selected_index"
                    color="white"
                    ></v-progress-circular>
                    <div class="text-body-1 font-weight-medium" v-else>{{getBankItem(item).txt}}</div>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" lg="3" sm="8" md="6" class="mx-auto" v-else>
            <div class="text-body-1 font-weight-medium text-white text-center mb-2">Загрузка банков</div>
            <v-progress-linear indeterminate color="amber-lighten-2" class="px-0 mb-4"></v-progress-linear>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
import {API} from '../../HTTP-common'

export default {
    props:{
        available_banks: {
            required: true,
            type: Array
        },
        banks: {
            required: true,
            type: Array
        },
        sum: {
            required: true,
            type: String
        },
        merchant: {
            required: true,
            type: String
        },
        invid: {
            required: true,
            type: String
        },
        signature: {
            required: true,
            type: String
        },
    },
    data(){
        return {
            loader: false,
            selected_index: null
        }
    },
    methods: {
        getBankItem(i){
            const bank = this.banks.find((item) => item.name === i)
            return bank
        },
        selectBank(i, index){
            this.selected_index = index
            const payload = {
                currency: 'RUB',
                merchant: this.merchant,
                invid: this.invid,
                sum: parseFloat(this.sum),
                bank: i,
                signature: this.signature
            }
            axios.post(`${API}api/exchange/v1/create/sales`, payload)
            .then((res) => {
                this.selected_index = null
                this.$emit('selectBank', res.data)
            })
        }
    }
}
</script>
