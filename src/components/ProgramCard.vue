<template>
    <div>
    <v-slide-item class="ma-3">
    <v-card
            max-width="330"
            min-width="330"
            outlined
            class="flexcard"
            height="180"
    >
        <v-card-title>
            <a v-bind:href="this.program.url" target="_blank">{{this.program.title}}</a>
        </v-card-title>

        <v-card-subtitle>
            {{interestList}}
        </v-card-subtitle>
        <v-card-text class="grow">
        </v-card-text>


        <v-card-actions>

            <v-btn icon>
                <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn text
            @click.stop="dialog = true">
                LEARN MORE
            </v-btn>

        </v-card-actions>
    </v-card>

    </v-slide-item>
    <v-dialog
            v-model="dialog"
            max-width="500"
    >
        <v-card>
            <v-card-title>
                <a v-bind:href="this.program.url" target="_blank">{{this.program.title}}</a>
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

            <v-card-actions>
                <v-spacer></v-spacer>


                <v-btn
                        text
                        @click="dialog = false"
                >
                    Add to Favorites
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
    export default {
        name: "ProgramCard",
        props: {
          program: Object
        },
        data: () => ({
            dialog: false
        }),
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
            }
        }
    }
</script>

<style scoped>
    .v-card__text, .v-card__title {
        word-break: normal;
    }
    a {
        text-decoration: none;
    }
    .flexcard {
        display: flex;
        flex-direction: column;
    }
</style>