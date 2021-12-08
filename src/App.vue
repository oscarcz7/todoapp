<template>
  <div id="app" >

    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #2E4C6D;">
      <div class="container-fluid">
         <router-link to="/"
          ><img src="./assets/logo.jpeg" alt="" width="75" height="75"
        /></router-link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item shadow-lg mx-2 p-1 bg-blue-100 rounded">
              <router-link to="/" class="nav-link active text-white"  v-if="existeUsuario">Inicio</router-link>
            </li>
            <li class="nav-item shadow-lg mx-2 p-1 bg-blue-100 rounded">
              <router-link to="/calendario" class="nav-link text-white" v-if="existeUsuario">Calendario</router-link>
            </li>
            <li class="nav-item shadow-lg mx-2 p-1 bg-blue-100 rounded">
              <router-link to="/tablero" class="nav-link text-white" v-if="existeUsuario">Tablero</router-link>
            </li>
          </ul>
        <div >
          
          <div class="d-flex">
            <router-link v-if="!existeUsuario" to="/acceso" class="m-1">
              <button type="button" class="btn btn-outline-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-door-open"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"
                  />
                  <path
                    d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"
                  />
                </svg>
                Ingresar
              </button>
            </router-link>
            <router-link v-if="!existeUsuario" to="/registro" class="m-1">
              <button type="button" class="btn btn-outline-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-journal-text"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                  />
                  <path
                    d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
                  />
                  <path
                    d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
                  />
                </svg>
                Registrarme
              </button>
            </router-link>
            <button
              type="button"
              class="btn btn-success"
              v-if="existeUsuario"
              @click="cerrarSesion"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-bar-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mt-5">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
  },
};
</script>