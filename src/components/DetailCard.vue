<template>
    <div>
            <v-card outlined>
                <v-card-title>
                    <a v-bind:href="this.program.url" target="_blank">{{this.program.title}}</a>
                    <v-spacer></v-spacer>
                    <div v-if="favorite">
                        <v-btn icon color="pink" @click="removeFavorite">
                            <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn icon @click="addFavorite">
                            <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>

                <v-card-text>

                    <b>Description: </b>{{this.program.summary}}
                    <span v-if="this.program.logistics !== '' ">
                    <br><br>
                    <b>Logistics: </b>{{this.program.logistics}}
                </span>
                    <br>
                    <span v-if="this.program.minAge !== '' ">
                    <br>
                    <b>Ages: </b>{{this.program.minAge}} to {{this.program.maxAge}}
                </span>

                    <span v-if="this.program.minYear !== '' ">
                    <br>
                    <b>Grades: </b>{{this.program.minYear}} to {{this.program.maxYear}}
                </span>

                    <span v-if="this.program.length !== '' ">
                    <br>
                    <b>Length: </b>{{this.program.length}}
                </span>

                    <span v-if="this.program.time !== '' ">
                    <br>
                    <b>When: </b>{{this.program.time}}
                </span>

                    <span v-if="this.program.due !== '' ">
                    <br>
                    <b>Deadline: </b>{{this.program.due}}
                </span>

                    <span v-if="this.program.contact !== '' ">
                    <br>
                    <b>Contact: </b>{{this.program.contact}}
                </span>

                    <span v-if="this.program.price !== '' ">
                    <br>
                    <span v-if="this.program.price === 0">
                        <b>   FREE</b>
                    </span>
                    <span v-else>
                        <b>  ${{this.program.price}}</b>
                    </span>
                </span>
                </v-card-text>
            </v-card>

    </div>
</template>

<script>
    export default {
        name: "DetailCard",
        props: {
            program: Object
        },
        computed: {
            interestList() {
                if(this.program.interests !== null) {
                    let str = this.program.interests[0];
                    for(let i = 1; i < this.program.interests.length; i++) {
                        str += ", ";
                        str += this.program.interests[i];
                    }
                    return str;
                } else {
                    return null;
                }
            },
            favorite() {
                return this.$store.state.favorites.includes(this.program.id);
            }
        },
        methods: {
            addFavorite() {
                this.$store.commit("addFavorite", this.program.id);
            },
            removeFavorite() {
                this.$store.commit("removeFavorite", this.program.id);
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>