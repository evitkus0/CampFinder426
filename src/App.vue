<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-content transition="slide-x-transition">
      <v-container class="pa-3">
      <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
  .v-card__text, .v-card__title {
    word-break: normal;
  }
</style>
