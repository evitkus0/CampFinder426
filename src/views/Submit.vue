
<template>
  <div class="Contact">
    <div class="submit text-center">
    <h1>Know a great summer program? Share it with our SummerSearch community here!</h1>

<v-container class="grey lighten-5 containerPadding">
              <v-row justify="center">      <v-col>

    <v-card
        class="mx-auto"
        max-width="600px"
      >
                      <v-img
                        class="white--text align-end"
                        height="300px"
                        src="https://www.usnews.com/dims4/USNEWS/871b6f1/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F64%2F61%2Fc1f49d6447d0baf9e9743b185f91%2F140509-highschoolteamwork-stock.jpg"
                      >
                      </v-img>
                    </v-card>        
      </v-col>
            <v-col>
                      <v-layout row wrap align-center>
                      <div> </div>

          
      <p class="padding"> Our service is greatly augmented by users and organizations that help us build out our portfolio of camps. Your suggestion increases the chances that an aspiring young student can find the program of their dreams!</p> 
       <p class="padding"> Please consider filling out the form below to have your camp, or a camp/program you know of, be featured within our platform!</p> </v-layout>

      </v-col>
    </v-row>
  </v-container>
  </div>
    <div class="container">
      <form>
        <v-text-field
          v-model="campName"
          :error-messages="campNameErrors"

          label="Camp Name"
          required
          @input="$v.campName.$touch()"
          @blur="$v.campName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="url"
          :error-messages="urlErrors"
          label="URL"
          required
          @input="$v.url.$touch()"
          @blur="$v.url.$touch()"
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="4">
                     <v-select
                :items="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
                label="Due Date"
                v-model="dueDate"
              ></v-select>    


          </v-col>
          <v-col cols="12" md="4">
             <v-select
                :items="['9', '10', '11', '12']"
                label="Minimum Grade"
                v-model="grade"
              ></v-select>

          </v-col>
          <v-col cols="12" md="4">
                         <v-select
                :items="['9', '10', '11', '12']"
                label="Maxiumum Grade"
                v-model="gradeMax"
              ></v-select>

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
              label="Cost of Camp"
              required
              @input="$v.price.$touch()"
              @blur="$v.price.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <!--Camp Description and Logistics at bottom -->
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-textarea
          v-model="description"
          :error-messages="descriptionErrors"
          label="Describe the camp"
          required
          auto-grow
          rows="4"
          outlined
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        ></v-textarea>
        <v-textarea
          v-model="logistics"
          :error-messages="logisticsErrors"
          label="Logistics Regarding the Camp"
          required
          auto-grow
          rows="4"
          outlined
          @input="$v.logistics.$touch()"
          @blur="$v.logistics.$touch()"
        ></v-textarea>
                <small>*indicates required field</small>

        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </div>
  </div>
</template>


<style>

.padding{
  margin-top: 50px;
  margin-right: 70px
}
.containerPadding{
  margin-left: 20px;
  margin-right: 20px
}
</style>
<script>
  import { validationMixin } from "vuelidate";
import required from "vuelidate/src/validators/required";
import email from "vuelidate/src/validators/email";
import minLength from "vuelidate/src/validators/minLength";
import url from "vuelidate/src/validators/url"
import { mapState } from "vuex";
export default {
  name: "RegistrationDialog",
  
  mixins: [validationMixin],
  validations: {
    campName: { required },
    description: {required},
    email: { required, email },
    url: {required, url},
    password: { required, minLength: minLength(8) }
  },
  data: () => ({
    dialog: false,
    campName: "",
    email: "",
    password: "",
    grade: null,
    description: "",
    interests: [],
    url: ""
  }),
  computed: {
    ...mapState(["interestOptions"]),
    campNameErrors() {
      const errors = [];
      if (!this.$v.campName.$dirty) return errors;
      !this.$v.campName.required && errors.push("Camp Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid email");
      !this.$v.email.required && errors.push("Email is required");
      return errors;
    },
    urlErrors(){
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.url && errors.push("Must be valid link");
      !this.$v.url.required && errors.push("Link to camp is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
      descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Camp description is required.");
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

