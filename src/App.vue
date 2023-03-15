<template>
  <v-app>
     <!-- <v-progress-linear
        indeterminate
        :height="5"
        absolute
        bottom
        color="deep-purple-accent-4"
      ></v-progress-linear> -->
    <Sidebar v-if="$route.name !== 'login' && $route.name !== 'signup' && $route.name !== 'payment'" />
    <v-main>
      <Snackbar />
      <MobileNav v-if="this.$vuetify.display.smAndDown && $route.name !== 'login' && $route.name !== 'signup' && $route.name !== 'payment'" />
      <OnlineStatus v-if="authStore.getUser && $route.name !== 'login' && $route.name !== 'signup' && $route.name !== 'payment'" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/ui/Sidebar.vue'
import OnlineStatus from './components/ui/OnlineStatus.vue'
import Snackbar from './components/ui/Snackbar.vue'
import MobileNav from './components/ui/MobileNav.vue'
import { useAuthStore } from './stores/auth.js'
import { useCatalogsStore } from './stores/catalogs.js'
import { socket } from './plugins/pusher'

export default {
  name: 'App',
  components: {Sidebar, OnlineStatus, Snackbar, MobileNav},
  created(){
    this.catalogsStore.LOAD_USDT_COURSE()
    this.catalogsStore.LOAD_CURRENCIES()
    socket.subscribe()
    socket.createOrder()
    socket.updateOrder()
  },
  data: () => ({
    authStore: useAuthStore(),
    catalogsStore: useCatalogsStore(),
    // dealingsStore: useDealingsStore()
  }),
}
</script>
