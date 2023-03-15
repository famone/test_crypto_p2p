import Pusher from 'pusher-js'
import { useDealingsStore } from '../stores/dealings'

Pusher.logToConsole = false;
var pusher = new Pusher('e6b84ea94a0e61e2d4db', {
    cluster: 'eu'
});


export const socket = {
    chanel: null,
    subscribe: function(){
        this.chanel = pusher.subscribe('exchange-update')
    },
    createOrder: function(){
        this.chanel.bind('createOrder', function(data) {
            useDealingsStore().LOAD_DEALINGS()
        })
    },
    updateOrder: function(){
        this.chanel.bind('updateOrder', function(data) {
            useDealingsStore().LOAD_DEALINGS()
        })
    },
}



// channel.bind('viewOrder', function(data) {
//     app.messages.push(JSON.stringify(data));
//   });
//   channel.bind('updateOrder', function(data) {
//     app.messages.push(JSON.stringify(data));
//   });
//   channel.bind('createOrder', function(data) {
//     app.messages.push(JSON.stringify(data));
//   });