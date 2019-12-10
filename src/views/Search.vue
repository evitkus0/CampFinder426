<template>
    <div class="search">
        <v-card outlined class="pa-4">
        <v-row>
            <v-col cols="12">
        <v-autocomplete
                :items="interestOptions"
                label="Interests"
                multiple
                v-model="interests"
        ></v-autocomplete>
            </v-col>
        <v-col cols="12" sm="4">
            <v-select
                    :items="['Abroad', 'Domestic', 'Abroad and Domestic']"
                    label="Location"
                    v-model="location"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="4">
            <v-select
                    :items="['9', '10', '11', '12']"
                    label="Grade (Rising)"
                    v-model="grade"
            ></v-select>
        </v-col>
            <v-col cols="12" sm="4">
                <v-select
                        :items="['13', '14', '15', '16', '17', '18']"
                        label="Age"
                        v-model="age"
                ></v-select>
            </v-col>
            <v-col cols="12">
                <v-subheader>Maximum Price</v-subheader>
                <v-slider
                        v-model="maxPrice"
                        class="align-center"
                        :max="max"
                        :min="min"
                        hide-details
                >
                    <template v-slot:append>
                        <v-text-field
                                v-model="maxPrice"
                                class="mt-0 pt-0"
                                hide-details
                                single-line
                                type="number"
                                style="width: 60px"
                        ></v-text-field>
                    </template>
                </v-slider>
            </v-col>
        </v-row>
            <br>
            <v-card-actions>
                <v-btn color="primary" @click="reset">Reset Form</v-btn>
                <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitSearch">Search</v-btn>
                </v-card-actions>
        </v-card>
        <DetailCard v-for="(program, index) in programs"
                                 v-bind:program="program"
                                 v-bind:index="index"
                                 v-bind:key="index">
    </DetailCard>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import DetailCard from "../components/DetailCard.vue";
    import firebase from "firebase";
    export default {
        name: "Search",
        components: {
            DetailCard
        },
        data: () => ({
            max: 8000,
            min: 0,
            age: null,
            grade: null,
            interests: [],
            maxPrice: 0,
            location: null,
            programs: [],
        }),
        computed: {
            ...mapState(["interestOptions"]),
        },
        methods: {
          reset() {
              this.age = null;
              this.grade = null;
              this.maxPrice = 0;
              this.interests = [];
              this.location = null;
          },
            submitSearch() {
                this.programs = [];
                let db = firebase.firestore();
                let processingPrograms = [];
                let vm = this;
                if(this.interests.length !== 0) {
                        db.collection("programs").where("interests", "array-contains-any", this.interests).where("price", "<=", this.maxPrice).get()
                            .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    processingPrograms.push(doc.data());
                                });
                            }).then(function() {
                            processingPrograms = processingPrograms.filter(function(program) {
                                return program.approved;
                            });
                            if(vm.location === "Abroad") {
                                processingPrograms = processingPrograms.filter(function(program) {
                                    return (program.abroad === "TRUE");
                                });
                            }
                            if(vm.location === "Domestic") {
                                processingPrograms = processingPrograms.filter(function(program) {
                                    return !(program.abroad === "TRUE");
                                });
                            }
                            if(vm.age !== null) {
                                processingPrograms = processingPrograms.filter(function(program) {
                                    return vm.age >= program.minAge &&  vm.age <= program.maxAge;
                                });
                            }
                            if(vm.grade !== null) {
                                processingPrograms.filter(function(program) {
                                    return vm.grade >= program.minYear &&  vm.grade <= program.maxYear;
                                });
                            }
                            vm.programs = processingPrograms;
                        });;
                } else {
                    db.collection("programs").where("price", "<=", this.maxPrice).get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                processingPrograms.push(doc.data());
                            });
                        }).then(function() {
                        processingPrograms = processingPrograms.filter(function(program) {
                            return program.approved;
                        });
                        if(vm.location === "Abroad") {
                            processingPrograms = processingPrograms.filter(function(program) {
                                return (program.abroad === "TRUE");
                            });
                        }
                        if(vm.location === "Domestic") {
                            processingPrograms = processingPrograms.filter(function(program) {
                                return !(program.abroad === "TRUE");
                            });
                        }
                        if(vm.age !== null) {
                            processingPrograms = processingPrograms.filter(function(program) {
                                return vm.age >= program.minAge &&  vm.age <= program.maxAge;
                            });
                        }
                        if(vm.grade !== null) {
                            processingPrograms.filter(function(program) {
                                return vm.grade >= program.minYear &&  vm.grade <= program.maxYear;
                            });
                        }
                        vm.programs = processingPrograms;
                    });
                }

            }

        },
        created() {
            if(this.$store.state.authenticated) {
                this.grade = this.$store.state.grade;
            }
            this.interests = this.$store.state.interests;
        }
    }
</script>

<style scoped>
</style>
