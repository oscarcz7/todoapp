import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "../firebase";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tareas: [],
    tareasIP: [],
    tareasPH: [],
    tareasT: [],
    tarea: { name: "", id: "", color: "", start: "", end: "", descripcion: "" },
    usuario: null,
    error: null,
    perfil: [],
    notifiacion: false,
    columns: [],
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
    setPerfil(state, payload) {
      state.perfil = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setTareasIP(state, payload) {
      state.tareasIP = payload;
    },
    setTareasPH(state, payload) {
      state.tareasPH = payload;
    },
    setTareasT(state, payload) {
      state.tareasT = payload;
    },
    setNotificaion(state, payload) {
      state.notifiacion = payload;
    },
    setColumns(state, payload) {
      state.columns = payload;
    },
  },
  actions: {
    addColumns({ commit, state }) {
      let column = [
        {
          title: "Por Hacer",
          tasks: state.tareasPH ? state.tareasPH : null,
        },
        {
          title: "En Progreso",
          tasks: state.tareasIP ? state.tareasIP : null,
        },
        {
          title: "Terminado",
          tasks: state.tareasT ? state.tareasT : null,
        },
      ];
      commit("setColumns", column);
    },
    getPerfil({ commit, state }) {
      const perfils = [];
      let correo = state.usuario.email;
      db.collection("perfil")
        .where("email", "==", correo)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let perfil = doc.data();
            perfil.id = doc.id;
            perfils.push(perfil);
          });
          commit("setPerfil", perfils);
        })
        .catch((error) => console.log(error));
    },
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

    getTareasIP({ commit, state }) {
      const tareas = [];
      db.collection(state.usuario.email)
        .where("estado", "==", "En Progreso")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });

          commit("setTareasIP", tareas);
        })
        .catch((error) => console.log(error));
    },
    getTareasPH({ commit, state }) {
      const tareas = [];
      db.collection(state.usuario.email)
        .where("estado", "==", "Por Hacer")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          commit("setTareasPH", tareas);
        })
        .catch((error) => console.log(error));
    },
    getTareasT({ commit, state }) {
      const tareas = [];
      db.collection(state.usuario.email)
        .where("estado", "==", "Terminado")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tarea = doc.data();
            tarea.id = doc.id;

            tareas.push(tarea);
          });
          commit("setTareasT", tareas);
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
          name: tarea.name,
          estado: tarea.estado,
          start: tarea.start,
          hourend: tarea.hourend,
          hourstart: tarea.hourstart,
          end: tarea.end,
          color: tarea.color,
          descripcion: tarea.descripcion,
        })
        .then(() => {
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    editarTareaP({ commit, state }, tarea) {
      db.collection(state.usuario.email)
        .doc(tarea.id)
        .update({
          name: tarea.name,
          estado: tarea.estado,
          start: tarea.start,
          end: tarea.end,
          hourend: tarea.hourend,
          hourstart: tarea.hourstart,
          color: tarea.color,
          descripcion: tarea.descripcion,
        })
        .then(() => {
          router.push({ name: "Tablero" });
        })
        .catch((error) => console.log(error));
    },
    editarTareaC({ commit, state }, tarea) {
      db.collection(state.usuario.email)
        .doc(tarea.id)
        .update({
          name: tarea.name,
          estado: tarea.estado,
          start: tarea.start,
          end: tarea.end,
          hourend: tarea.hourend,
          hourstart: tarea.hourstart,
          color: tarea.color,
          descripcion: tarea.descripcion,
        })
        .then(() => {
          router.push({ name: "Calendario" });
        })
        .catch((error) => console.log(error));
    },

    agregarTarea({ commit, state }, nameTarea) {
      db.collection(state.usuario.email)
        .add({
          name: nameTarea.name,
          descripcion: nameTarea.descripcion,
          estado: nameTarea.estado,
          end: nameTarea.end,
          hourend: nameTarea.hourend,
          hourstart: nameTarea.hourstart,
          start: nameTarea.start,
          color: nameTarea.color,
        })
        .then((doc) => {
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    agregarTareaC({ commit, state }, nameTarea) {
      db.collection(state.usuario.email)
        .add({
          name: nameTarea.name,
          descripcion: nameTarea.descripcion,
          estado: nameTarea.estado,
          end: nameTarea.end,
          start: nameTarea.start,
          hourend: nameTarea.hourend,
          hourstart: nameTarea.hourstart,
          color: nameTarea.color,
        })
        .then((doc) => {
          router.push({ name: "Tablero" });
        })
        .catch((error) => console.log(error));
    },
    eliminarTarea({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setEliminarTarea", id);
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    eliminarTareaC({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setEliminarTarea", id);
          router.push({ name: "Calendar" });
        })
        .catch((error) => console.log(error));
    },
    eliminarTareaT({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setEliminarTarea", id);
          router.push({ name: "Tablero" });
        })
        .catch((error) => console.log(error));
    },
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid,
          };
          db.collection(res.user.email)
            .add({
              name: "Esta es una tarea de prueba",
              descripcion: "Esta es una tarea de prueba",
              estado: "Por Hacer",
              end: "",
              start: "",
              color: "",

              hourend: "",
              hourstart: "",
            })
            .then((doc) => {
              commit("setUsuario", usuarioCreado);
              router.push("/perfil");
            })
            .catch((err) => {
              console.log(error);
            });
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    crearPerfil({ commit, state }, perfil) {
      db.collection("perfil")
        .add({
          username: perfil.username,
          lastname: perfil.lastname,
          age: perfil.age,
          birthdate: perfil.birthdate,
          email: state.usuario.email,
        })
        .then((doc) => {
          router.push({ name: "Inicio" });
        })
        .catch((error) => console.log(error));
    },
    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          const usuarioLogueado = {
            email: res.user.email,
            uid: res.user.uid,
          };
          commit("setUsuario", usuarioLogueado);
          router.push("/inicio");
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
