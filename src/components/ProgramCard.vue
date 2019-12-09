<template>
    <v-slide-item class="ma-3">
    <v-card
            max-width="344"
            outlined
    >
        <v-card-title>
            <a v-bind:href="this.program.url" target="_blank">{{this.program.title}}</a>
        </v-card-title>

        <v-card-subtitle>
            {{interestList}}
        </v-card-subtitle>
        <!---
        <v-card-text>
            {{about}}
        </v-card-text>
        --->
        <v-card-actions>

            <v-btn icon>
                <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn text>
                LEARN MORE
            </v-btn>

        </v-card-actions>
    </v-card>
    </v-slide-item>
</template>

<script>
    export default {
        name: "ProgramCard",
        props: {
          program: Object
        },
        data: () => ({}),
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
</style>