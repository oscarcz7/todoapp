<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-ceter">
            <h1 class="text-center">BIENVENIDO A KANBAN TEAM</h1>
          </div>
          <form
            @submit.prevent="ingresoUsuario({ email: email, password: pass })"
          >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Contraseña</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="pass"
              />
            </div>

            <button type="submit" class="btn btn-primary">Ingresar</button>
          </form>
          <div class="mt-3">
            <p class="red">{{ error }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
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