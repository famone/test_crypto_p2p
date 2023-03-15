<template>
  <v-container>
    <WaitingDeals class="mb-8" :deals="dealingsStore.waitingDeals" />
    <NewDeals :deals="dealingsStore.newDeals" />
  </v-container>
</template>

<script>
import WaitingDeals from '../components/dealings/WaitingDeals.vue'
import NewDeals from '../components/dealings/NewDeals.vue'
import { useDealingsStore } from '../stores/dealings'
export default {
  components: {WaitingDeals, NewDeals},
  data: () => ({
    tab: 1,
    dealingsStore: useDealingsStore()
  }), 
  created(){
    this.dealingsStore.LOAD_DEALINGS()
  }
}
</script>