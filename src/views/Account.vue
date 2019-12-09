<template>
  <div class="account">
    <h1 class="text-center">Hi {{name}}!</h1>
    <h2>Favorites</h2>
    <li>favorite 1</li>
    <li>favorite 2</li>
    <li>favorite 3</li>
    <div v-if="!isHidden">
      <p>Hide me on click event!</p>
      <!--<v-text-field
        label="Name*"
        v-model="$v.name.$model"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>-->
      <v-text-field label="Name" v-model="name"></v-text-field>
      <v-select :items="['9', '10', '11', '12']" label="Grade (Rising)" v-model="grade"></v-select>
      <v-btn text v-on="on" v-on:click="isHidden = !isHidden">Submit</v-btn>
      <v-btn v-if="!isHidden" text v-on="on" v-on:click="isHidden = !isHidden">Cancel</v-btn>
    </div>
    <v-btn v-if="isHidden" text v-on="on" v-on:click="isHidden = !isHidden">View Account Preferences</v-btn>
    
    <v-btn text v-on="on" @click="submit" link to="/">Delete Account</v-btn>
    

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    isHidden: true
  }),
  computed: {
    ...mapState(["authenticated"]),
    ...mapState(["user"]),
    ...mapState(["name"]),
    ...mapState(["grade"])
  },
  methods: {
    submit() {
      this.$store.dispatch("deleteAccount");
    }
  }
};
</script>

<style scoped></style>

