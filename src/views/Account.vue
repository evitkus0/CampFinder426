<template>
  <div class="account">
    <h1 class="text-center">Hi {{name}}!</h1>
    <h2>Favorites</h2>
    <li>favorite 1</li>
    <li>favorite 2</li>
    <li>favorite 3</li>
    <v-btn text v-on="on"  >View Account Preferences</v-btn>
        <v-btn text v-on="on"   @click="submit" link to = "/">Delete Account</v-btn>

  </div>
</template>

<script>
import { mapState } from "vuex";
    import firebase from "firebase";
export default {
  name: "NavBar",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState(["authenticated"]),
    ...mapState(["user"]),
    ...mapState(["name"])
  },
  methods: {
      submit() {
            firebase.auth().currentUser.delete();
            console.log("asdfasdf")
      }
    }
};
</script>

<style scoped></style>
