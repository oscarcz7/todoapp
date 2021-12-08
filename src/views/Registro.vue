<template>
  <div>
    <h1 class="text-center">Registrate ahora!</h1>
    <div class="row">
      <form
        @submit.prevent="crearUsuario({ email: email, password: pass1 })"
        class="col-md-12"
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
            v-model="pass1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Repita la Contraseña</label
          >
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            v-model="pass2"
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="!desactivar">
          Registrarme
        </button>
      </form>
    </div>

    <div class="mt-3">
      <p class="red">{{ error }}</p>
    </div>
  </div>
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