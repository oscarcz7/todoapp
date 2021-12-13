<template>
  <v-container >
    <v-layout row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>Ingresar a la App</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="ingresoUsuario({ email: email, password: pass })">
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="pass"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-center" mt-5>
              <v-btn color="primary" type="submit">Ingresar</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <v-container>
          <p class="red">{{ error }}</p>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
  },
};
</script>

<style>
</style>