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
      uid: null,
      favorites: [],
      admin: false
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
      setFavorites(state, payload) {
          state.favorites = payload;
      },
      setAdmin(state, payload) {
          state.admin = payload;
      },
      addFavorite(state, payload) {
        this.state.favorites.push(payload);
          if(state.authenticated) {
              let db = firebase.firestore();
              db.collection("users").doc(this.state.uid).update({
                  favorites: state.favorites
              });
          }
      },
      removeFavorite(state, payload) {
          let i = state.favorites.indexOf(payload);
          state.favorites.splice(i, 1);
          if(state.authenticated) {
              let db = firebase.firestore();
              db.collection("users").doc(this.state.uid).update({
                  favorites: state.favorites
              });
          }
      }
  },
  actions: {
    getInterestOptions({ commit}) {
        let db = firebase.firestore();
        db.collection("general").doc("interests").get().then(function(doc) {
        commit("setInterestOptions", doc.data().interests);
      });
    },
    updateUser({commit}, {name, interests, grade}){
      let db = firebase.firestore();
      db.collection("users").doc(this.state.uid).update({
            name: name,
            interests: interests,
            grade: grade
        });
        commit("setInterests", interests);
        commit("setName", name);
        commit("setGrade", grade);
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
              email: email,
              favorites: this.state.favorites,
              admin: false
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
                      if(data.favorites.length > 0) {
                          commit("setFavorites", data.favorites);
                      }
                      commit("setInterests", data.interests);
                      commit("setName", data.name);
                      commit("setGrade", data.grade);
                      if(data.admin) {
                          commit("setAdmin", data.admin);
                      }
                  });
              })
              .catch(() => {
                  commit("setUser", null);
                  commit("setIsAuthenticated", false);
              });

      },
      deleteAccount() {
        let db = firebase.firestore();
        db.collection("users").doc(this.state.uid).delete();
        firebase.auth().currentUser.delete();
        this.dispatch("logout");
      },
      logout({commit}) {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          commit("setName", null);
          commit("setGrade", null);
          commit("setUid", null);
          commit("setFavorites", []);
          commit("setAdmin", false);

      },

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
