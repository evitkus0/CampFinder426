<template>
    <div>
    <h3>{{interest}}</h3>
    <v-slide-group multiple>
        <ProgramCard   v-for="(program, index) in programs"
                           v-bind:program="program"
                           v-bind:index="index"
                           v-bind:key="program.id">
        </ProgramCard>
    </v-slide-group>
    </div>
</template>

<script>
    import ProgramCard from "./ProgramCard.vue";
    import firebase from "firebase";

    export default {
        name: "ProgramRow",
        data: () => ({
            programs: []
        }),
        props: {
            interest: String
        },
        components: {
            ProgramCard
        },
        created() {
            let db = firebase.firestore();
            let vm = this;
            db.collection("programs").where("interests", "array-contains", this.interest).get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        vm.programs.push(doc.data());
                    });
                });
        }
    }
</script>

<style scoped>

</style>