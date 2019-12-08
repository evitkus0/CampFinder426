<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Register</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name*"
                required
                v-model="$v.name.$model"
                :error-messages="nameErrors"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="Email*"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
                v-model="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
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
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from "vuelidate";
import required from "vuelidate/src/validators/required";
import email from "vuelidate/src/validators/email";
import minLength from "vuelidate/src/validators/minLength";
import { mapState } from "vuex";

export default {
  name: "RegistrationDialog",
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    password: "",
    grade: null,
    interests: []
  }),
  computed: {
    ...mapState(["interestOptions"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid email");
      !this.$v.email.required && errors.push("Email is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    submit() {

      if (!this.$v.$anyError) {
        this.$store.dispatch("userJoin", {
          email: this.email,
          password: this.password,
          name: this.name,
          interests: this.interests,
          grade: this.grade
        });
        this.dialog = false;
      }

    }
  }
};
</script>

<style scoped></style>
