import { defineStore } from 'pinia'
import axios from 'axios'

export const useCatalogsStore = defineStore('catalogs', {
    state: () => {
        return {
            udst_to_rub: 0,
            currencies: [],
            crypto_currencies: null
        }
    },
    getters: {
        get_udst_to_rub(){
            return this.udst_to_rub
        },
        get_crypto_currencies(){
            return this.crypto_currencies
        },
        getCurrencies(){
            const currencies = Object.keys(this.currencies).map((i)=>{
                return {
                    ...this.currencies[i],
                    search: `${this.currencies[i].CharCode}-${this.currencies[i].Name}`
                }
            })
            currencies.unshift({CharCode: 'RUB', search: 'RUB-Российский рубль'})
            return currencies
        }
    },
    actions: {
        async LOAD_USDT_COURSE(){
            try{
                const { data } = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=USDT&tsyms=RUB')
                // ,BTC,ETH,BNB
                this.crypto_currencies = data.RAW
                this.udst_to_rub = data.RAW.USDT.RUB.PRICE
            }catch(err){
                console.log(err)
            }
        },
        async LOAD_CURRENCIES(){
            try{
                const { data } = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
                this.currencies = data.Valute
            }catch(err){
                console.log(err)
            }
        }
    },
})