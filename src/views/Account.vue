<template>
  <div class="account">
    <h1 class="text-center">Hi {{name}}!</h1>
    <h2>Favorites</h2>
    <li>favorite 1</li>
    <li>favorite 2</li>
    <li>favorite 3</li>
    <div v-if="!isHidden">
      <!--<v-text-field
        label="Name*"
        v-model="$v.name.$model"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>-->
      <v-text-field label="Name" required  v-model="name"    :error-messages="nameErrors"
></v-text-field>
      <v-select :items="['9', '10', '11', '12']" label="Grade (Rising)" v-model="grade"></v-select>
      <v-btn text  v-on:click="isHidden = !isHidden" @click="submitEdits" 
>Submit</v-btn>
      <v-btn v-if="!isHidden" text  v-on:click="isHidden = !isHidden">Cancel</v-btn>
    </div>
    <v-btn v-if="isHidden" text  v-on:click="isHidden = !isHidden">View Account Preferences</v-btn>
    
    <v-btn text  @click="deleteAccount" link to="/">Delete Account</v-btn>
    

  </div>
</template>

<script>
import { mapState } from "vuex";
import required from "vuelidate/src/validators/required";
export default {
  name: "Account",
  props: {
    source: String
  },
  validations:{
    name: {required}
  },
  data: () => ({
    drawer: null,
    isHidden: true
  }),
  computed: {
    ...mapState(["authenticated"]),
    ...mapState(["user"]),
    ...mapState(["name"]),
    nameErrors() {
      const errors = [];
      if (!name) return errors;
      !name && errors.push("Name is required.");
      return errors;
    },
    grade: {
      get() {
        return this.$store.state.grade;
      },
      set (value) {
        //this.$store.commit('setGrade', grade)
          this.$store.dispatch("updateUser", {
          name: this.$store.name,
          grade:this.$store.grade,
        });
      }
    },
        name: {
      get() {
        return this.$store.state.name;
      },
      set () {
        //this.$store.commit('setGrade', grade)
          this.$store.dispatch("updateUser", {
          name: this.$store.name,
          grade:this.$store.grade});
      }
    },
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
    },
    submitEdits(){

        this.dialog = false;
    } 

  }
};
</script>

<style scoped></style>


