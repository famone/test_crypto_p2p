<template>
    <v-container>
        <v-row v-if="catalogsStore.get_crypto_currencies">
            <v-col cols="12">
                <h2 class="text-white">Курс</h2>
            </v-col>
            <v-col cols="6" lg="2" class="pr-1" v-for="(item, index) in Object.keys(catalogsStore.get_crypto_currencies)" :key="index">
                <v-card color="#2f2f2f" class="elevation-0 py-6 px-4 rounded-lg">
                    <div class="text-h5 text-white font-weight-bold mb-1 d-flex align-center">
                        <v-avatar class="mr-1" size="24"><v-img :src="`https://www.cryptocompare.com${catalogsStore.get_crypto_currencies[item].RUB.IMAGEURL}`"></v-img></v-avatar>
                        {{1}} {{catalogsStore.get_crypto_currencies[item].RUB.FROMSYMBOL}}
                    </div>
                    <p class="text-grey text-body-2">≈ {{catalogsStore.get_crypto_currencies[item].RUB.PRICE.toLocaleString()}} ₽</p>
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" class="pr-1">
                <v-card color="#2f2f2f" class="elevation-0 py-6 px-4 rounded-lg">
                    <div class="text-h6 text-white font-weight-bold mb-1 d-flex align-center">
                        <v-avatar class="mr-1" size="24"><v-img src="https://bin.bnbstatic.com/image/c2c/currency-icons/RUB.png"></v-img></v-avatar>
                        {{getTotal}} <span class="text-grey text-body-1 ml-1"> RUB</span>
                    </div>
                    <p class="text-grey text-body-2">Прибыль со сделок</p>
                </v-card>
            </v-col>
            <v-col cols="12">
                <h2 class="text-white mb-8 mt-8">История сделок</h2>
                <HistoryDeals :deals="dealingsStore.completedDeals" />    
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'
import { useCatalogsStore } from '../stores/catalogs.js'
import dates from '../mixins/dates'
import HistoryDeals from '../components/dealings/HistoryDeals.vue'
import { useDealingsStore } from '../stores/dealings'

export default {
    mixins: [dates],
    components: {HistoryDeals},
    data(){
        return{
            authStore: useAuthStore(),
            catalogsStore: useCatalogsStore(),
            dealingsStore: useDealingsStore()
        }
    },
    computed: {
        getTotal(){
            
            const value = this.dealingsStore.completedDeals.reduce((acc, current) => {
                return acc + (parseFloat(current.sum) || 0)
            }, 0)
            return parseFloat(value).toLocaleString()
        }
    },
    created(){
        this.dealingsStore.LOAD_DEALINGS()
        this.authStore.GET_SESSIONS()
    }
}
</script>


<style scoped>
td{
    white-space: nowrap !important;
}
</style>