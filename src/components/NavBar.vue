<template>
  <span>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/sign-up">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/sign-in">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Summer Search</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="this.authenticated">Hi {"this.user"}!</span>
      <span v-else>
        <SignInDialog></SignInDialog>
        <RegistrationDialog></RegistrationDialog>
      </span>
    </v-app-bar>
  </span>
</template>

<script>
import RegistrationDialog from "./RegistrationDialog.vue";
import SignInDialog from "./SignInDialog.vue";

import { mapState } from "vuex";

export default {
  name: "NavBar",
  props: {
    source: String
  },
  components: {
    RegistrationDialog,
    SignInDialog
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState(["authenticated"]),
    ...mapState(["user"])

  }
};
</script>

<style scoped></style>
