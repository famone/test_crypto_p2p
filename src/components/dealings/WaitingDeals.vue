<template>
    <v-row>
        <v-col class="d-flex justify-space-between align-end pb-0">
            <h3 class="text-white">Ожидают подтверждения <v-badge inline :content="deals.length" color="red"></v-badge></h3>
            <!-- <v-btn color="primary">Пришли деньги</v-btn> -->
        </v-col>
        <v-col cols="12">
            <v-table theme="dark">
                <thead>
                    <tr>
                        <th class="text-left">Сделка</th>
                        <th class="text-left">Курс</th>
                        <th class="text-left">Сумма</th>
                        <th class="text-left">Реквизиты</th>
                        <th class="text-left">Покупатель</th>
                        <th>Действия</th>
                    </tr>
                </thead>

                <tbody v-if="dealingsStore.loader">
                        <tr>
                            <td :colspan="6" style="height:inherit!important; padding:0!important;">
                                <v-progress-linear indeterminate color="primary" class="px-0"></v-progress-linear>
                            </td>
                        </tr>
                    </tbody>
                <tbody v-if="deals.length">
                    <tr v-for="(item, index) in deals.slice(getFirstItemPage , (10*activePage))" :key="index">
                        <td>
                            <v-chip label size="x-small" class="px-1 mr-1">
                                <v-icon color="white" size="x-small">mdi-identifier</v-icon>
                            </v-chip>
                            {{ item.id }}
                        </td>
                        <td> <v-chip color="green" label><v-icon size="x-small" start icon="mdi-arrow-up"></v-icon>{{ item.kurs }}</v-chip></td>
                        <td>
                            <p class="text-red text-body-2"> - {{ item.usdt.toFixed(2) }} $</p>
                            <p class="text-green text-body-2">+ {{ parseFloat(item.sum).toLocaleString() }} ₽</p>
                        </td>
                        <td class="text-body-2">
                            <v-chip class="mr-1" color="grey" size="x-small" label>
                                {{getBankName(item.bank.name)}}
                            </v-chip>
                             {{item.card.value}}
                            <v-chip label size="x-small" class="px-1 ml-1" @click="copyToClipboard(item.card.value)">
                                <v-icon color="white" size="x-small">mdi-content-copy</v-icon>
                            </v-chip>
                        </td>
                        <td><v-icon size="x-small" color="blue" class="mr-1">mdi-check-decagram</v-icon>{{ item.merchant.name }}</td>
                        <td>
                            <div class="d-flex align-center">
                                <v-chip color="red" label>
                                    <vue-countdown :time="getCountDown(item.date.created.date)" v-slot="{ totalSeconds }" v-if="getCountDown(item.date.created.date) > 0">
                                        {{ formateTimer(totalSeconds) }}
                                    </vue-countdown>
                                    <span v-else>Отменена</span>
                                </v-chip>
                                <v-btn class="elevation-0 ml-2" size="small" color="green" v-if="getCountDown(item.date.created.date) > 0" @click="[apply_dialog = true, selected_deal = item.id]">
                                    Подтвердить
                                </v-btn>
                                <v-btn class="elevation-0 ml-2" size="small" color="grey-darken-3">
                                    Проблема сделки
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!dealingsStore.loader && !deals.length">
                        <tr>
                            <td :colspan="6">
                               <p class="text-center text-grey">
                                    <v-icon size="small">mdi-cancel</v-icon>
                                    Оплаченных сделок нет
                                </p>
                            </td>
                        </tr>
                    </tbody>
            </v-table>
            <div class="d-flex justify-end align-center" v-if="deals.length">
                <v-btn variant="text" size="x-small" class="elevation-0" icon="mdi-arrow-left" color="white" @click="changePage(-1)" 
                :disabled="activePage === 1"></v-btn>
                <p class="mx-4 text-white">{{activePage}} <span class="mx-2">из</span> {{Math.ceil(deals.length/10)}}</p>
                <v-btn variant="text" size="x-small" class="elevation-0" icon="mdi-arrow-right" color="white" @click="changePage(1)" 
                :disabled="activePage === Math.ceil(deals.length/10)"></v-btn>
            </div>
        </v-col>

        <v-dialog
            v-model="apply_dialog"
            width="auto"
        >
            <v-card color="#333">
                <v-card-text class="pa-10">
                    <p class="text-body-1 text-white text-center">Вы уверены, что хотите подттврдить <br> оплату сделки {{selected_deal}} ?</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        color="grey"
                        variant="text"
                        @click="apply_dialog = false"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        color="green"
                        variant="text"
                        @click="applyDeal()"
                        :loading="load"
                    >
                        Подтвердить оплату
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
    </v-row>
</template>

<script>
import cardFormater from '../../mixins/cardFormater.js'
import countdown from '../../mixins/countdown.js'
import banks from '../../mixins/banks.js'
import { useDealingsStore } from '../../stores/dealings.js'

export default {
    mixins: [cardFormater, countdown, banks],
    props: {
        deals: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            activePage: 1,
            load: false,
            apply_dialog: false,
            selected_deal: null,
            dealingsStore: useDealingsStore()
        }
    },
    methods: {
        changePage(e){
            this.activePage += e
        },
        applyDeal(){
            this.load = true
            const payload = {
                order_id: this.selected_deal,
                status: 'completed'
            }
            this.dealingsStore.APPLY_DEAL(payload).then(() =>{
                this.load = false
                this.apply_dialog = false
                this.dealingsStore.LOAD_DEALINGS()
            })
        }
    },
    computed: {
        getFirstItemPage(){
             return 10 * (this.activePage - 1)
        }
    }
}
</script>
<style scoped>
td{
    white-space: nowrap !important;
}
</style>