<template>
  <div class="Contact">
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
            <v-text-field
              v-model="appDueDate"
              :error-messages="appDueDateErrors"
              label="Application Due Date"
              required
              @input="$v.appDueDate.$touch()"
              @blur="$v.appDueDate.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="minGrade"
              :error-messages="minGradeErrors"
              label="Minimum Grade"
              required
              @input="$v.minGrade.$touch()"
              @blur="$v.minGrade.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="maxGrade"
              :error-messages="maxGradeErrors"
              label="Maximum Grade"
              required
              @input="$v.maxGrade.$touch()"
              @blur="$v.maxGrade.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="minAge"
              :error-messages="minAgeErrors"
              label="Minimum Age"
              required
              @input="$v.minAge.$touch()"
              @blur="$v.minAge.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="maxAge"
              :error-messages="maxAgeErrors"
              label="Maximum Age"
              required
              @input="$v.maxAge.$touch()"
              @blur="$v.maxAge.$touch()"
            ></v-text-field>
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
