<template>
  <div class="home">


      <v-slide-group multiple>
        <v-slide-item class="ma-3">
          <ProgramCard></ProgramCard>
        </v-slide-item>
        <v-slide-item class="ma-3">
          <ProgramCard></ProgramCard>
        </v-slide-item>
        <v-slide-item class="ma-3">
          <ProgramCard></ProgramCard>
        </v-slide-item>
        <v-slide-item class="ma-3">
          <ProgramCard></ProgramCard>
        </v-slide-item>
      </v-slide-group>

  </div>
</template>

<script>
// @ is an alias to /src
import ProgramCard from "@/components/ProgramCard.vue";

export default {
  name: "home",
  components: {
    ProgramCard
  }
};
</script>
