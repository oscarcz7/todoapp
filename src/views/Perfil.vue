<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Agregar nueva tarea</h1>
          <v-form
            @submit.prevent="
              crearPerfil({
                username: username,
                lastname: lastname,
                age: age,
                birthdate: birthdate
              })
            "
          >
            <v-text-field
              label="Nombre de Usuario"
              type="text"
              v-model="username"
              class="form-control"
            />
            <v-text-field
              label="Appellido"
              type="text"
              v-model="lastname"
              class="form-control"
            />
            <v-text-field
              label="Edad"
              type="number"
              min="0"
              v-model="age"
              class="form-control"
            />
            <v-text-field
              label="Fecha Nacimiento"
              type="date"
              v-model="birthdate"
              class="form-control"
            />
           
            <v-btn type="submit" elevation="2" block color="primary">
              Generar Perfil
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Perfil",
  data() {
    return {
      username: "",
      lastname: "",
      age: 0,
      birthdate: "",
    };
  },
  methods: {
    ...mapActions(["crearPerfil"]),
  },
};
</script>

<style>
</style>