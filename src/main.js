import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import firebase from "firebase";
import Vuelidate from "vuelidate";
import AsyncComputed from 'vue-async-computed'

//import fbKeys from "./fbKeys.js";
Vue.config.productionTip = false;

/*const firebaseConfig = {
  apiKey: fbKeys.apiKey,
  authDomain: fbKeys.authDomain,
  databaseURL: fbKeys.databaseURL,
  projectId: fbKeys.projectId,
  storageBucket: fbKeys.storageBucket,
  messagingSenderId: fbKeys.messagingSenderId,
  appId: fbKeys.appId,
  measurementId: fbKeys.measurementId
};*/
const fbKeys = {
  apiKey: "AIzaSyDoH_7m7cXvAUv_pHthL_V2LG3jogTG5uw",
  authDomain: "summersearch426.firebaseapp.com",
  databaseURL: "https://summersearch426.firebaseio.com",
  projectId: "summersearch426",
  storageBucket: "summersearch426.appspot.com",
  messagingSenderId: "639225008821",
  appId: "1:639225008821:web:29170d67de3da1b7efe4fc",
  measurementId: "G-Y183SR7B7H"
};
// Initialize Firebase
firebase.initializeApp(fbKeys);
firebase.analytics();

Vue.use(Vuelidate);
Vue.use(AsyncComputed);
new Vue({
  router,
  store,
  vuetify,
  created() {
    //initialize store data structure by submitting action.
    this.$store.dispatch('getInterestOptions');
  },
  validations: {},

  render: h => h(App)
}).$mount("#app");




