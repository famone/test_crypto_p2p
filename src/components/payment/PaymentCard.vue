<template>
    <v-row>
        <v-col cols="12" class="text-center mb-4">
            <h2 class="text-white">Шаг 2: Запрос успешно принят</h2>
            <p class="text-body-1 text-grey">Сделайте перевод суммы на указанную карту</p>
        </v-col>

        <div class="mx-auto">
            <v-card width="450" :color="getBankItem().color" rounded="xl" class="pa-6 mb-8 payment-card" elevation="0">
                <div class="d-flex justify-space-between mb-6">
                    <img :src="getBankItem().logo" style="height:50px;">
                    <!-- <img :src="getPaymentSystemWh(deal_created.card.value)" alt=""> -->
                </div>
                <div class="d-flex justify-space-between align-center mb-4">
                    <div>
                        <p class="text-body-2">Номер карты для перевода</p>
                        <p class="font-weight-medium text-h6">{{deal_created.card.value}}</p>
                    </div>
                    <v-btn color="grey-lighten-1" elevation="0" min-width="40px" max-width="40px"  @click="copyToClipboard(deal_created.card.value)">
                        <v-icon color="white">mdi-content-copy</v-icon>
                    </v-btn>
                </div>
                <div class="d-flex justify-space-between align-center mb-6">
                    <div>
                        <p class="text-body-2">Сумма перевода</p>
                        <p class="font-weight-medium text-h6">{{sum}} ₽</p>
                    </div>
                    <v-btn color="grey-lighten-1" elevation="0" min-width="40px" max-width="40px"  @click="copyToClipboard(sum)">
                        <v-icon color="white">mdi-content-copy</v-icon>
                    </v-btn>
                </div>
            </v-card>
            <div class="text-center">
                 <vue-countdown :time="getCountDown(deal_created.time.date)" v-slot="{ totalSeconds }" v-if="getCountDown(deal_created.time.date) > 0">
                    <p class="text-white text-h4 font-weight-normal mb-4">
                            {{ formateTimer(totalSeconds) }}
                    </p>
                    <p class="text-body-2 text-red">Переводите строго точную сумму одним переводом!</p>
                    <p class="text-body-2 text-grey">Если вы отправили средства - нажмите <span class="text-blue">Я
                            отправил</span></p>
                    <v-btn v-if="totalSeconds > 0" color="primary" size="large" block class="mt-10 elevation-0" @click="payed" :loading="load">Я отправил</v-btn>
                    <v-btn v-else color="red" size="large" block class="mt-10 elevation-0">Сделка отменена</v-btn>
                </vue-countdown>
            </div>
        </div>
    </v-row>
</template>

<script>
import cardFormater from '../../mixins/cardFormater'
import moment from 'moment'
import countdown from '../../mixins/countdown.js'


export default {
    mixins: [cardFormater, countdown],
    props: {
        deal_created: {
            required: true,
            type: Object
        },
        banks: {
            required: true,
            type: Array
        },
        sum: {
            required: true,
            type: String
        }
    },
    data(){
        return {
            load: false
        } 
    },
    methods:{
        payed(){
            this.load = true
            this.$emit('payedDeal')
        },
        getBankItem(){
            const bank = this.banks.find((item) => item.name === this.deal_created.bank)
            return bank
        }
    }
}
</script>