<template>
<!-- https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=RUB -->
    <v-container>
        <v-row>
            <v-col class="d-flex justify-space-between align-end">
                <h2 class="text-white">Объявления</h2>
                <v-btn color="primary" @click="dialog = true">
                    <v-icon size="small">mdi-plus</v-icon>
                    Создать объявление
                </v-btn>
                <v-dialog v-model="dialog" :fullscreen="this.$vuetify.display.smAndDown ? true : false">
                    <CreateCallDialog 
                    @closeDialog="dialog = false"
                    :currencies="catalogsStore.getCurrencies"
                    />
                </v-dialog>
            </v-col>
            <v-col cols="12">
                <v-table theme="dark">
                    <thead>
                        <tr>
                            <th class="text-left">ID</th>
                            <!-- <th class="text-left">Объявление</th> -->
                            <th class="text-left">Курс</th>
                            <th class="text-left">Пара</th>
                            <th class="text-left" >Реквизиты</th>
                            <th class="text-left">Лимит</th>
                            <th class="text-left">Действия</th>
                        </tr>
                    </thead>
                    <tbody v-if="!callsStore.getCalls.length">
                        <tr>
                            <td :colspan="6" style="height:inherit!important; padding:0!important;">
                                <v-progress-linear indeterminate color="primary" class="px-0"></v-progress-linear>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="(item, index) in callsStore.getCalls" :key="index">
                            <td>
                                <v-chip label size="x-small" class="px-1 mr-1">
                                    <v-icon color="white" size="x-small">mdi-identifier</v-icon>
                                </v-chip>
                                {{ item.id }}
                            </td>
                
                            <td> <v-chip color="green" label>
                                <v-icon size="x-small" start icon="mdi-swap-vertical"></v-icon>
                                    {{item.course}}
                                </v-chip>
                            </td>
                            <td style="white-space:nowrap;">
                                <p class="text-green text-body-2">USDT/RUB</p>
                            </td>
                            <td class="text-body-2" style="white-space:nowrap;"> 
                                <div v-for="(rqz, i) in item.cards" :key="i" class="d-flex align-center my-2">
                                    <v-chip class="mr-1" color="grey" size="x-small" label>
                                        {{getBankName(item.payment_bank)}}
                                    </v-chip>
                                    {{ rqz.value }} 
                                    <v-chip label size="x-small" class="px-1 ml-1" @click="copyToClipboard(rqz.value)">
                                        <v-icon color="white" size="x-small">mdi-content-copy</v-icon>
                                    </v-chip>
                                </div>
                            </td>
                            <td>{{parseInt(item.min)?.toLocaleString()}} - {{parseInt(item.max)?.toLocaleString()}} <span class="text-grey text-body-2">{{item.currency}}</span></td>
                            <td >
                                <div class="d-flex align-center">
                                    <v-btn class="elevation-0 px-1 mr-2" size="small" color="red" variant="text" @click="deleteCall(item.id)">Удалить</v-btn>
                                    <v-btn class="elevation-0 px-1 mr-2" size="small" color="grey" variant="text">Править</v-btn>
                                    <v-switch
                                    class="d-block"
                                    hide-details=""
                                    v-model="item.active"
                                    true-value="publish"
                                    false-value="draft"
                                    density="compact"
                                    color="green"
                                    @change="switchCall(item)"
                                    >   
                                        <template v-slot:label>
                                           <span style="font-size:12px;opacity:1;" class="text-white d-none d-lg-block">Активно</span>
                                        </template>
                                    </v-switch>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import cardFormater from '../mixins/cardFormater.js'
import CreateCallDialog from '../components/calls/CreateCallDialog.vue'
import { useCallsStore } from '../stores/calls.js'
import { useCatalogsStore } from '../stores/catalogs.js'
import banks from '../mixins/banks.js'

export default {
    components: {CreateCallDialog},
    mixins: [cardFormater, banks],
    created(){
        this.catalogsStore.LOAD_USDT_COURSE()
        this.catalogsStore.LOAD_CURRENCIES()
        this.callsStore.LOAD_CALLS()
    },
    mounted(){
        setTimeout(() =>{
            this.load = false
        }, 2000)
    },
    methods:{
        deleteCall(id){
            this.callsStore.DELETE_CALL(id)
        },
        switchCall(item){
            const payload = {
                id: item.id,
                status: item.active
            }
            this.callsStore.SWITCH_CALL(payload)
        },
    },
    data() {
        return{
            dialog: false,
            load: true,
            callsStore: useCallsStore(),
            catalogsStore: useCatalogsStore(),
        }
    }
}
</script>

<style scoped>
td{
    white-space: nowrap !important;
}
</style>