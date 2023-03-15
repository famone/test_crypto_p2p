<template>
    <div>
        <!-- <v-btn color="green" @click="addSnack">снекбар</v-btn> -->
        <!-- <v-btn @click="triggerBus">dsfdsf</v-btn> -->
        <div v-if="snackbars.length">
             <v-snackbar 
            location="bottom right"
            :style="`transform: translateY(-${60 * i}px);`" 
            v-for="(snack, i) in snackbars" 
            :key="i" v-model="snack.show" 
            :color="snack.color"
            :timeout="snack.timeout" >
                {{ snack.text }}
            </v-snackbar>
        </div>
    </div>
</template>

<script>
import { useUiStore } from '../../stores/ui.js'

export default {
    data(){
        return {
            uiStore: useUiStore(),
            timeout: 2000,
            show: false,
            snackbars: [],
        }
    },
    mounted(){
        // подписка на шину событий, опять же - это блевотина)
        this.emitter.on("toggle-snackbar", (payload) => {
            this.addSnack(payload)
        });
    },
    methods: {
        addSnack(payload){
            const item = {
                text: payload.text,
                timeout: 3000,
                show:true,
                color: payload.color
            }
            this.snackbars.push(item)

            //После отрисовки таймер на удаления
            this.$nextTick(() => {
                setTimeout(() => {
                    this.remove(item)
                }, 3500);
            })
        },
        remove(item){
            const index = this.snackbars.indexOf(item)
            return  this.snackbars.splice(index, 1)
        }
    }
}
</script>