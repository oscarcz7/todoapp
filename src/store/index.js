import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "../firebase";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: { nombre: "", id: "" },
    usuario: null,
    error: null,
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload;
    },
    setTarea(state, payload) {
      state.tarea = payload;
    },
    setEliminarTarea(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload);
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    getTareas({ commit, state }) {
      const tareas = [];
      db.collection(state.usuario.email)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          commit("setTareas", tareas);
        })
        .catch((error) => console.log(error));
    },
    getTarea({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .get()
        .then((doc) => {
          let tarea = doc.data();
          tarea.id = doc.id;
          commit("setTarea", tarea);
        })
        .catch((error) => console.log(error));
    },
    editarTarea({ commit, state }, tarea) {
      db.collection(state.usuario.email)
        .doc(tarea.id)
        .update({
          nombre: tarea.nombre,
        })
        .then(() => {
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    agregarTarea({ commit, state }, nombreTarea) {
      db.collection(state.usuario.email)
        .add({
          nombre: nombreTarea,
        })
        .then((doc) => {
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    eliminarTarea({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setEliminarTarea", id);
        })
        .catch((error) => console.log(error));
    },
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          console.log(res);
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid,
          };

          //creando tareas

          db.collection(res.user.email)
            .add({
              nombre: "tarea de ejepmplo",
            })
            .then((doc) => {
              commit("setUsuario", usuarioCreado);
              router.push("/");
            })
            .catch((err) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error.message);
        });
    },
    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          console.log(res);
          const usuarioLogueado = {
            email: res.user.email,
            uid: res.user.uid,
          };
          commit("setUsuario", usuarioLogueado);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error.message);
        });
    },
    cerrarSesion({ commit }) {
      auth.signOut().then(() => {
        router.push("/acceso");
      });
    },
    detectarUsuario({ commit }, usuarioLogueado) {
      commit("setUsuario", usuarioLogueado);
    },
  },
  modules: {},
  getters: {
    existeUsuario(state) {
      if (state.usuario === null) {
        return false;
      } else {
        return true;
      }
    },
  },
});
