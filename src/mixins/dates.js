import moment from "moment"

export default{
    methods: {
        formateDate(date){
            return moment(date).format('MM.DD.YYYY')
        }
    }
}