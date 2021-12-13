<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>REGISTRO</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="crearUsuario({ email: email, password: pass1 })">
          <v-layout column>
            <v-flex>
              <v-text-field
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                label="Email"
                v-model="email"
                name="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                 v-model="pass1"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Repita la Contraseña"
                id="confirmPassword"
                type="password"
                v-model="pass2"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="!desactivar">Registrarme</v-btn>
            </v-flex>
          </v-layout>
        </form>

        <v-container>
          <p>{{error}}</p>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
    },
  },
};
</script>

<style>
</style>