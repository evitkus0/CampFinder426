
<template>
  <div class="Contact">
    <div class="submit text-center">
      <h1>Know a great summer program? Share it with SummerSearch here!</h1>

      <v-container class="grey lighten-5 containerPadding">
        <v-row justify="center">
          <v-col>
            <v-card class="mx-auto" max-width="600px">
              <v-img
                class="white--text align-end"
                height="300px"
                src="https://www.usnews.com/dims4/USNEWS/871b6f1/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F64%2F61%2Fc1f49d6447d0baf9e9743b185f91%2F140509-highschoolteamwork-stock.jpg"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-layout row wrap align-center>
              <div></div>

              <p
                class="padding"
              >Our service is greatly augmented by users and organizations that help us build out our portfolio of programs. Your suggestion increases the chances that an aspiring young student can find the program of their dreams!</p>
              <p
                class="padding"
              >Please consider filling out the form below to have your program, or a program you know of, be featured within our platform!</p>
            </v-layout>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="container" v-if="this.authenticated">
      <v-card outlined class="pa-4">
      <form>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Program Title*"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field label="Length" v-model="length"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-checkbox
                    v-model="abroad"
                    label="Abroad?"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
        <v-text-field
          v-model="url"
          :error-messages="urlErrors"
          label="URL*"
          required
          @input="$v.url.$touch()"
          @blur="$v.url.$touch()"
        ></v-text-field>
          </v-col>
            <v-col cols="12" md="6">

        <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="Program Contact Email"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
        ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="['Rolling', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
              label="Application Due Date"
              v-model="due"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select :items="['9', '10', '11', '12']" label="Minimum Grade" v-model="minYear"></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select :items="['9', '10', '11', '12']" label="Maxiumum Grade" v-model="maxYear"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="['11', '12', '13', '14', '15', '16', '17', '18', '19']"
              label="Minimum Age"
              v-model="minAge"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              :items="['11', '12', '13', '14', '15', '16', '17', '18', '19']"
              label="Maximum Age"
              v-model="maxAge"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="price"
              :error-messages="priceErrors"
              label="Program Cost (Ideally 0!)"
              required
              @input="$v.price.$touch()"
              @blur="$v.price.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Camp Description and Logistics at bottom -->
        <v-autocomplete
                :items="interestOptions"
                label="For students interested in..."
                multiple
                v-model="interests"
        ></v-autocomplete>
        <v-textarea
          v-model="description"
          :error-messages="descriptionErrors"
          label="Description*"
          required
          auto-grow
          rows="4"
          outlined
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        ></v-textarea>
        <v-textarea
          v-model="logistics"
          label="Logistics"
          auto-grow
          rows="4"
          outlined
        ></v-textarea>

        <small>*indicates required field</small>
        <v-card-actions>
          <v-btn @click="clear" color="primary">clear</v-btn>
          <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="submit" color="primary">submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
      <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="text-lg-center">Thank you for your submission!</v-card-text>
      </v-card>
    </v-dialog>
    </div>
    <div class="container text-center" v-else>
      <h2>Please register or sign in to submit program recommendations.</h2>
    </div>
  </div>
</template>



<script>
import { validationMixin } from "vuelidate";
import required from "vuelidate/src/validators/required";
import email from "vuelidate/src/validators/email";
import url from "vuelidate/src/validators/url";
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "RegistrationDialog",

  mixins: [validationMixin],
  validations: {
    name: { required },
    description: { required },
    price: { required },
    url: { required, url },
    email: { email }
  },
  data: () => ({
    name: "",
    email: "",
    minYear: "",
    maxYear: "",
    minAge: "",
    maxAge: "",
    description: "",
    logistics: "",
    interests: [],
    url: "",
    abroad: false,
    length: "",
    due: "",
    price: "",
    dialog: false,
  }),
  computed: {
    ...mapState(["interestOptions"]),
    ...mapState(["authenticated"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Program name is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push("Cost is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid email");
      return errors;
    },
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.url && errors.push("Must be valid link");
      !this.$v.url.required && errors.push("Link to program website is required");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required &&
        errors.push("Program description is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      if (!this.$v.$anyError) {
        let db = firebase.firestore();
        let vm = this;
        let id = (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString();
        db.collection("programs").doc(id).set({
          id: id,
          approved: false,
          abroad: this.abroad,
          interests: this.interests,
          minYear: this.minYear,
          maxYear: this.maxYear,
          minAge: this.minAge,
          maxAge: this.maxAge,
          title: this.name,
          contact: this.email,
          summary: this.description,
          logistics: this.logistics,
          url: this.url,
          length: this.length,
          due: this.due,
          price: this.price,
          time: ""
        }).then(function() {
            vm.dialog = true;
            this.clear();
        });
      }
    },
    clear() {
      this.name = "";
      this.email = "";
      this.minYear = "";
      this.maxYear = "";
              this.minAge = "";
              this.maxAge = "";
              this.description = "";
              this.logistics = "",
              this.interests = [];
              this.url = "";
              this.abroad = false;
              this.length = "";
              this.due = "";
              this.price = "";
    }
  }
};
</script>


<style>
  .padding {
    margin-top: 50px;
    margin-right: 70px;
  }
  .containerPadding {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>