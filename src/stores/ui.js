import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => {
        return {
            snackbar: null
        }
    },
    getters: {
        getSnackbar(){
            return this.snackbar
        }
    },
    actions: {
        SET_SNACKBAR(snack){
            this.snackbar = snack
        }
    },
})