export default{
    data(){
        return{
            banksItems: [
                {
                    name: 'tinkoff',
                    logo: new URL('../assets/img/banks/tink.svg', import.meta.url),
                    color: 'yellow-darken-1',
                    txt: 'Тинькофф',
                },
                {
                    name: 'sberbank',
                    logo: new URL('../assets/img/banks/sber.svg', import.meta.url),
                    color: 'green',
                    txt: 'Сбербанк',
                },
                {
                    name: 'rajfajzen',
                    logo: new URL('../assets/img/banks/raif.svg', import.meta.url),
                    color: 'grey-darken-3',
                    txt: 'Райффайзен',
                }
            ]
        }
    },
    methods: {
        getBankName(param){
            const bank = this.banksItems.find((item) => item.name === param)
            if(bank){
                return bank.txt
            }else{
                return 'Другой'
            }
        },
    }
}