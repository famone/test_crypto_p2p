import moment from "moment"
export default {
    methods:{
        getCountDown(date){
            const time_zone = new Date().getTimezoneOffset() / -60
            const end_time = moment(date).add(time_zone, 'hours').add(15, 'minutes')
            const real_time = moment(new Date())
            const countdown = end_time.diff(real_time) / 1000

            return countdown*1000
        },
        formateTimer(time) {
            if(time <= 0){
                return '00:00'
            }
            return moment.utc(time*1000).format('mm:ss')
        },
    }
  }