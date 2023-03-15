<template>
    <v-app-bar :elevation="0" theme="dark" color="#2f2f2f">
        <template v-slot:append>
          <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        openDrawer(){
            this.emitter.emit("toggle-drawer", true);
        }
    }
}
</script>
