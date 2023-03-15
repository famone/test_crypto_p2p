
export default {
    methods:{
        copyToClipboard(text){
            navigator.clipboard.writeText(text)
            this.emitter.emit("toggle-snackbar", {text: 'Скопировано', color: 'success'});
        },
        cardFormater(str){
            return str.toString().replace(/\d{4}(?=.)/g, '$& ');
        },
        getPaymentSystem(str){
            if(!str || str === '') return ''
            let re = new RegExp("^4");
            if (str.match(re) !== null) return new URL('../assets/img/visa.svg', import.meta.url)
        
            re = new RegExp("^5[1-5]");
            if (str.match(re) !== null) return new URL('../assets/img/master.svg', import.meta.url)
        
            re = new RegExp("^2");
            if (str.match(re) !== null) return new URL('../assets/img/mir.svg', import.meta.url)

        },
        getPaymentSystemWh(str){
            if(!str || str === '') return ''
            let re = new RegExp("^4");
            if (str.match(re) !== null) return new URL('../assets/img/cards/visa.svg', import.meta.url)
        
            re = new RegExp("^5[1-5]");
            if (str.match(re) !== null) return new URL('../assets/img/cards/master.svg', import.meta.url)
        
            re = new RegExp("^2");
            if (str.match(re) !== null) return new URL('../assets/img/cards/mir.svg', import.meta.url)

        }
    }
  }