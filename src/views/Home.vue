<template>
  <div class="home">
    <ProgramRow interest="Art"></ProgramRow>
    <ProgramRow interest="Technology"></ProgramRow>
    <ProgramRow interest="Language"></ProgramRow>
  </div>
</template>

<script>
// @ is an alias to /src
import ProgramRow from "../components/ProgramRow.vue";

export default {
  name: "home",
  components: {
    ProgramRow
  }
};
</script>
