<template>
  <v-app>
    <v-app-bar app color="light" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.jpeg"
          transition="scale-transition"
          width="55"
        />
        <v-btn
          href="/"
          text
          v-if="existeUsuario"
        >
          <span class="mr-2">Inicio</span>
          
        </v-btn>
        <v-btn to="/tablero" text v-if="existeUsuario">
          <span class="mr-2">Tablero</span>
        </v-btn>
        <v-btn to="/calendario" text v-if="existeUsuario">
          <span class="mr-2">Calendario</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
          href="/registro"
          text
          v-if="!existeUsuario"
        >
          <span class="mr-2">Registrarse</span>
          
        </v-btn>
        <v-btn
          href="/acceso"
          text
          v-if="!existeUsuario"
        >
          <span class="mr-2">Ingresar</span>
          
        </v-btn>
        <v-btn
          @click="cerrarSesion"
          text
          v-if="existeUsuario"
        >
          <span class="mr-2">Salir</span>
          
        </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
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