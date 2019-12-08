<template>
    <v-card
            class="mx-auto"
            max-width="344"
            outlined
    >
        <v-card-title>
            <a v-bind:href="link" target="_blank">{{title}}</a>
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
</template>

<script>
    export default {
        name: "ProgramCard",
        data: () => ({
            title: "National Security Language Initiative for Youth",
            interests: ["Languages", "Literature"],
            location: "Abroad (Multiple)",
            link: "https://www.nsliforyouth.org/",
            about: "The National Security Language Initiative for Youth (NSLI-Y) program, sponsored by the U.S. Department of State, provides merit-based scholarships for high school students to study less commonly taught languages in countries where they’re spoken."
        }),
        computed: {
            interestList() {
                if(this.interests !== null) {
                    let str = this.interests[0];
                    for(let i = 1; i < this.interests.length; i++) {
                        str += ", ";
                        str += this.interests[i];
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