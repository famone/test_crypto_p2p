<template>
    <v-container class="py-16">
        <SelectBank 
        :available_banks="available_banks" 
        :banks="banksItems" 
        :sum="sum"
        :merchant="merchant"
        :invid="invid"
        :signature="signature"
        @selectBank="selectBank" 
        v-if="!deal_created" />
        
        <PaymentCard 
        v-if="deal_created && deal_created.status === 'pending'" 
        :deal_created="deal_created"
        :banks="banksItems"
        :sum="sum"
        @payedDeal="payedDeal" 
        />

        <v-row v-if="deal_created && deal_created.status === 'processing'">
            <v-col cols="12" class="text-center mb-4">
                <!-- <v-icon color="green">mdi-shield-check</v-icon> -->
                    <v-btn class="mb-2" icon="mdi-thumb-up" color="#ffd54f3d" elevation="0">
                        <v-progress-circular
                        :size="24"
                    color="amber-lighten-2"
                    indeterminate
                    ></v-progress-circular>
                    </v-btn>
                <h2 class="text-white">3. Подтверждение сделки</h2>
                <p class="text-body-1 text-grey">Менеджер проверяет поступление денежных средств</p>
            </v-col>
        </v-row>

        <v-row v-if="deal_created && deal_created.status === 'completed'">
            <v-col cols="12" class="text-center mb-4">
                <v-btn class="mb-2" icon="mdi-thumb-up" color="#4caf5036" elevation="0">
                    <v-icon color="success">mdi-check-bold</v-icon>
                </v-btn>
                <h2 class="text-white">Оплата совершена!</h2>
                <p class="text-body-1 text-grey">Ваш баланс пополнен</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment'
import SelectBank from '../components/payment/SelectBank.vue'
import PaymentCard from '../components/payment/PaymentCard.vue'
import axios from 'axios'
import banks from '../mixins/banks.js'
import {API} from '../HTTP-common'

export default {
    components: {SelectBank, PaymentCard},
    mixins: [banks],
    data(){
        return{
            countdown: 600,
            countdownInterval: null,
            sum: 0,
            merchant: '',
            invid: '',
            signature: '',
            available_banks: [],
            deal_created: null,
            dealInterval: null
            // payed_deal: false,
        }
    },
    watch: {
        deal_created: {
            handler(){
                if(this.deal_created && this.deal_created.status === 'processing'){
                    // this.checkDealCompleted()
                    this.startDealInterval()
                }
            },
            deep: true
        }
    },
    methods: {
        selectBank(payload){
            this.deal_created = payload
        },
        // запуск интервала для проверки оплаты
        startDealInterval(){
            this.dealInterval = setInterval(() => {
                this.checkDealCompleted()
            }, 10000)
        },
        // метод на проверку выполненной сделки
        checkDealCompleted(){
            const payload = {
                merchant: this.merchant,
                invid: this.invid
            }
            axios.post(`${API}api/exchange/v1/check/sale`, payload)
            .then((res) =>{
                if(res.data.status === 'completed'){
                    this.deal_created = res.data
                    clearInterval(this.dealInterval)
                }
            })
        },
        payedDeal(){
            const payload = {
                order_id: this.deal_created.id,
                status: 'processing'
            }
            axios.post(`${API}api/exchange/v1/set/sale/status`, payload)
            .then((res) => {
                this.deal_created.status = payload.status
            })
        },
        checkSale(){
            const payload = {
                merchant: this.merchant,
                invid: this.invid
            }
            axios.post(`${API}api/exchange/v1/check/sale`, payload)
            .then((res) =>{
                this.deal_created = res.data
            })
            .catch((err) =>{
                if(err.response.status === 403){
                    this.laodBanks()
                }
            })
        },
        laodBanks(){
            const payload = {
                currency: 'RUB',
                sum: this.sum
            }
            axios.post(`${API}api/exchange/v1/create/sales/bank/available`, payload)
            .then(res => {
                this.available_banks = res.data
            })
        }
    },
    created(){
        this.sum = this.$route.query.sum
        this.merchant = this.$route.query.merchant
        this.invid = this.$route.query.invid
        this.signature = this.$route.query.signature
        this.checkSale()
    }
}
</script>