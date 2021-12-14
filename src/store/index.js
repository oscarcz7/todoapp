import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "../firebase";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableros: [],
    tablerosCompartidos: [],
    tablerosCompartidos2: [],
    tablerosCompartidos3: [],
    tareas: [],
    tareasIP: [],
    tareasPH: [],
    tareasT: [],
    tarea: { name: "", id: "", color: "", start: "", end: "", descripcion: "" },
    tablero: { name: "", id: "", color: "" },
    usuario: null,
    error: null,
    perfil: [],
    notifiacion: false,
    columns2: [
      {
        title: "Por Hacer",
        tasks: [],
      },
      {
        title: "En Progreso",
        tasks: [],
      },
      {
        title: "Terminado",
        tasks: [],
      },
    ],
    idParam: "",
    identificador:null
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload;
    },
    setTableros(state, payload) {
      state.tableros = payload;
    },
    setTablerosCompartidos(state, payload) {
      state.tablerosCompartidos = payload;
    },
    setTablerosCompartidos2(state, payload) {
      state.tablerosCompartidos2 = payload;
    },
    setTablerosCompartidos3(state, payload) {
      state.tablerosCompartidos3 = payload;
    },
    setTarea(state, payload) {
      state.tarea = payload;
    },
    setTablero(state, payload) {
      state.tablero = payload;
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
    setId(state, payload) {
      state.idParam = payload;
    },
    setIdentificador(state, payload) {
      state.identificador = payload;
    }
  },
  actions: {
    validar({ commit, state}, id){

      commit('setIdentificador', id)
    },
    //PERFIL
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
    //TABLEROS
    agregarTablero({ commit, state }, tablero) {
      db.collection("tableros")
        .add({
          email: state.usuario.email,
          name: tablero.name,
          color: tablero.color,
          sharedwith1: tablero.sharedwith1,
          sharedwith2: tablero.sharedwith2,
          sharedwith3: tablero.sharedwith3,
        })
        .then((doc) => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    getTablero({ commit, state }, id) {
      db.collection("tableros")
        .doc(id)
        .get()
        .then((doc) => {
          let tablero = doc.data();
          tablero.id = doc.id;
          commit("setTablero", tablero);
        })
        .catch((error) => console.log(error));
    },
    getTableros({ commit, state }) {
      const tableros = [];
      let correo = state.usuario.email;
      db.collection("tableros")
        .where("email", "==", correo)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tablero = doc.data();
            tablero.id = doc.id;
            tableros.push(tablero);
          });
          commit("setTableros", tableros);
        })
        .catch((error) => console.log(error));
    },
    getTablerosCompartidos({ commit, state }) {
      const tableros = [];
      let correo = state.usuario.email;
      db.collection("tableros")
        .where("sharedwith1", "==", correo)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tablero = doc.data();
            tablero.id = doc.id;
            tableros.push(tablero);
          });

          commit("setTablerosCompartidos", tableros);
        })
        .catch((error) => console.log(error));
    },
    getTablerosCompartidos2({ commit, state }) {
      const tableros = [];
      let correo = state.usuario.email;
      db.collection("tableros")
        .where("sharedwith2", "==", correo)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tablero = doc.data();
            tablero.id = doc.id;
            tableros.push(tablero);
          });

          commit("setTablerosCompartidos2", tableros);
        })
        .catch((error) => console.log(error));
    },
    getTablerosCompartidos3({ commit, state }) {
      const tableros = [];
      let correo = state.usuario.email;
      db.collection("tableros")
        .where("sharedwith3", "==", correo)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let tablero = doc.data();
            tablero.id = doc.id;
            tableros.push(tablero);
          });

          commit("setTablerosCompartidos3", tableros);
        })
        .catch((error) => console.log(error));
    },
    //TAREAS
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
          console.log("tareas", tareas);
          commit("setTareas", tareas);
        })
        .catch((error) => console.log(error));
    },
    getTareasTablero({ commit, state }, id) {
      const tareas = [];

      db.collection(state.usuario.email)
        .where("tableroid", "==", id)
        .get()
        .then((res) => {
          const tareasPH = [];
          const tareasIP = [];
          const tareasT = [];
          res.forEach((doc) => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          console.log("tareas", tareas);
          tareas.forEach((tarea) => {
            if (tarea.estado == "Por Hacer") {
              tareasPH.push(tarea);
              typeof state.columns2[0].tasks.push(tarea)
            }
          });
          tareas.forEach((tarea) => {
            if (tarea.estado == "En Progreso") {
              tareasIP.push(tarea);
              typeof state.columns2[1].tasks.push(tarea)
            }
          });
          tareas.forEach((tarea) => {
            if (tarea.estado == "Terminado") {
              tareasT.push(tarea);
              typeof state.columns2[2].tasks.push(tarea)
            }
          });
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
          tableroid: nameTarea.tableroid,
        })
        .then((doc) => {
          router.push({ name: "Tableros" });
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
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    eliminarTareaT({ commit, state }, id) {
      db.collection(state.usuario.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setEliminarTarea", id);
          router.push({ name: "Inicio" });
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
          db.collection("tableros")
            .add({
              email: usuario.email,
              name: "Tablero Ejemplo",
              color: "#fff",
              sharedwith1: "",
              sharedwith2: "",
              sharedwith3: "",
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
          router.push({ name: "Tableros" });
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
          router.push("/tableros");
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
