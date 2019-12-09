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

        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/submit">
          <v-list-item-action>
            <v-icon>mdi-check-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Submit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/contact">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Summer Search</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="this.authenticated">
        Hi {{name}}!
        <v-btn text v-on="on" link to="/account">View Account Details</v-btn>
      </span>
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
    ...mapState(["user"]),
    ...mapState(["name"])
  }
};
</script>

<style scoped></style>
