<template>
    <div v-if="programs.length > 0">
    <h3>{{interest}}</h3>
    <v-slide-group multiple
    width="100%">
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
            interest: String,
            freeonly: Boolean
        },
        components: {
            ProgramCard
        },
        created() {
            this.fetchPrograms(this.freeOnly);
        },
        methods: {
            fetchPrograms(free) {
                this.programs = [];
                let db = firebase.firestore();
                let vm = this;
                if(free) {
                    db.collection("programs").where("interests", "array-contains", this.interest).where("price", "==", 0).get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                vm.programs.push(doc.data());
                            });
                        });
                } else {
                    db.collection("programs").where("interests", "array-contains", this.interest).get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                vm.programs.push(doc.data());
                            });
                        });
                }
            }
        },
        watch: {
            freeonly: function(newVal) { // watch it
                this.fetchPrograms(newVal);
            }
        }
    }
</script>

<style scoped>
    h3 {
        color: dimgray;
        padding-left: 60px;
        padding-top: 20px;
    }
</style>