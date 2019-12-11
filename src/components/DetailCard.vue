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
                                <div> 
                <v-btn icon @click="shareFacebook">
                    <v-icon> mdi-facebook </v-icon> 
                    </v-btn>
            </div>
                        <div> 
                <v-btn icon @click="shareTwitter">
                    <v-icon> mdi-twitter </v-icon> 
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
            },
             shareFacebook(){
               /* let v = "1";
                let apitype = "1";
                let apikey = "2bf8cc342fac66e51a0672ab823f315d"
                let service = "5";*/
                let link = this.program.url;
                let api = "https://www.shareaholic.com/api/share/?v=1&apitype=1&apikey=2bf8cc342fac66e51a0672ab823f315d&service=5&link=" + link + "&";
                window.open(api);
         },
             shareTwitter(){
               /* let v = "1";
                let apitype = "1";
                let apikey = "2bf8cc342fac66e51a0672ab823f315d"*/
                let link = this.program.url;
                let api = "https://www.shareaholic.com/api/share/?v=1&apitype=1&apikey=2bf8cc342fac66e51a0672ab823f315d&service=7&link=" + link + "&";
                window.open(api);
         }
        },
          head: {

    // Meta tags
    meta: [
      { name: 'shareaholic:site_id', content: '2bf8cc342fac66e51a0672ab823f315d' },
      // ...
    ],
    // link tags
    link: [
      { rel: 'preload', href:"https://cdn.shareaholic.net/assets/pub/shareaholic.js", type: 'script' },
  
    ],
  script: [
      { type: 'text/javascript', src: "https://cdn.shareaholic.net/assets/pub/shareaholic.js", async: true}, // Insert in body
      // with shorthand
      // ...
    ],
  }
    }
</script>


<style scoped>
    a {
        text-decoration: none;
    }
</style>
