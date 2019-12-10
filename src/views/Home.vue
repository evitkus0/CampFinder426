<template>
  <div class="home">
    <v-container>
      <v-layout row wrap>
        <v-flex xs8 lg8>
      <v-autocomplete
              :items="this.interestOptions"
              label="Interests"
              multiple
              chips
              deletable-chips
              v-model="interests"
      ></v-autocomplete>
          </v-flex>

        <v-flex class="flex-shrink-1">
      <v-switch v-model="freeOnly" :label="switchLabel" ></v-switch>
          </v-flex>
      </v-layout>
    </v-container>

    <ProgramRow v-for="(interest, index) in displayInterests"
                v-bind:interest="interest"
                v-bind:freeonly="freeOnly"
                v-bind:index="index"
                v-bind:key="index">
    </ProgramRow>

  </div>
</template>

<script>
// @ is an alias to /src
import ProgramRow from "../components/ProgramRow.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  data: () => ({
    freeOnly: false
  }),
  components: {
    ProgramRow
  },
  computed: {
    ...mapState(["interestOptions"]),
    switchLabel() {
      if(this.freeOnly) {
        return "Free Only";
      } else {
        return "Free and Paid";
      }
    },
    interests: {
      get() {
        return this.$store.state.interests;
      },
      set (value) {
        this.$store.commit('setInterests', value);
      }
    },

      displayInterests() {
        if(this.$store.state.interests.length === 0) {
          return this.interestOptions;
        } else {
          return this.interests;
        }
      }
  }
};
</script>
