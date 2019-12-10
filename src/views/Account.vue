<template>
  <div class="account">
    <h1 class="text-center">Hi {{name}}!</h1>

    <v-card outlined class="pa-4">
      <v-card-title>
        Account Preferences
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
                  label="Name*"
                  required
                  v-model="$v.nameNew.$model"
                  :error-messages="nameErrors"
                  @input="$v.nameNew.$touch()"
                  @blur="$v.nameNew.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
                  :items="['9', '10', '11', '12']"
                  label="Grade (Rising)"
                  v-model="grade"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
                  :items="interestOptions"
                  label="Interests"
                  multiple
                  v-model="interests"
          ></v-autocomplete>
        </v-col>

      </v-row>
      <br>
      <v-card-actions>
        <v-btn color="primary" @click="deleteAccount" link to="/">Delete Account</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveChanges">Save Changes</v-btn>
      </v-card-actions>
    </v-card>
    <div v-if="this.favorites.length !== 0">
      <h1>Saved Programs</h1>
      <DetailCard v-for="(program, index) in favoritePrograms"
                  v-bind:program="program"
                  v-bind:index="index"
                  v-bind:key="index">
      </DetailCard>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import required from "vuelidate/src/validators/required";
import firebase from "firebase";
import DetailCard from "../components/DetailCard.vue";

export default {
  name: "Account",
  props: {
    source: String
  },
  components: {
    DetailCard
  },
  mixins: [validationMixin],
  validations:{
    nameNew: {required}
  },
  data: () => ({
      interests: [],
      nameNew: null,
      grade: null
  }),

  computed: {
    ...mapState(["authenticated"]),
    ...mapState(["user"]),
    ...mapState(["interestOptions"]),
    ...mapState(["name"]),
    ...mapState(["favorites"]),

    nameErrors() {
      const errors = [];
      if (!this.$v.nameNew.$dirty) return errors;
      !this.$v.nameNew.required && errors.push("Name is required.");
      return errors;
    },
  },
  asyncComputed: {
    favoritePrograms: {
      get() {
        let favs = [];

        this.favorites.forEach(function(id){
          let db = firebase.firestore();
          db.collection("programs").doc(id).get().then(function(doc) {
            favs.push(doc.data());
          });
        });
        return favs;
      }

    },
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
    },

    saveChanges() {
      if (!this.$v.$anyError) {
        this.$store.dispatch("updateUser", {
          name: this.nameNew,
          interests: this.interests,
          grade: this.grade
        });
      }
    } 

  },
  created() {
    if(this.$store.state.grade !== null) {
      this.grade = this.$store.state.grade;
    }
    if(this.$store.state.interests !== null) {
      this.interests = this.$store.state.interests;
    }
    this.nameNew = this.$store.state.name;
  }
};
</script>

<style scoped></style>


