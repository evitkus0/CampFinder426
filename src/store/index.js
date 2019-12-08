import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
     name: "",
     grade: null,
      interests: [],
    interestOptions: [],
      uid: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.authenticated = payload;
    },
      setInterests(state, payload) {
          state.interests = payload;
      },
      setName(state, payload) {
          state.name = payload;
      },
      setGrade(state, payload) {
          state.grade = payload;
      },
      setUid(state, payload) {
          state.uid = payload;
      },
    setInterestOptions(state, payload) {
      state.interestOptions = payload;
    },
  },
  actions: {
    getInterestOptions({ commit}) {
        let db = firebase.firestore();

        db.collection("general").doc("interests").get().then(function(doc) {
        commit("setInterestOptions", doc.data().interests);
      });
    },
    userJoin({ commit }, { email, password, name, interests, grade }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user.user.email);
          commit("setIsAuthenticated", true);
          commit("setInterests", interests);
          commit("setName", name);
          commit("setGrade", grade);
            commit("setUid", user.user.uid);
            let db = firebase.firestore();

          db.collection("users").doc(user.user.uid).set({
              name: name,
              grade: grade,
              interests: interests,
              email: email
          });
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });

    },



      userSignIn({ commit }, { email, password}) {
          firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(user => {
                  commit("setUser", user.user.email);
                  commit("setIsAuthenticated", true);
                  commit("setUid", user.user.uid);
                  let db = firebase.firestore();

                  db.collection("users").doc(user.user.uid).get().then(function(doc) {
                      let data = doc.data();
                      commit("setInterests", data.interests);
                      commit("setName", data.name);
                      commit("setGrade", data.grade);
                  });
              })
              .catch(() => {
                  commit("setUser", null);
                  commit("setIsAuthenticated", false);
              });

      }
  },
  modules: {},
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
});
