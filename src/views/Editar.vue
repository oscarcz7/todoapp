<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="container m-3">
            <h3>
              Editar la tarea: <span class="fw-bold">{{ tarea.nombre }}</span>
            </h3>
          </div>
          <hr />
          <form @submit.prevent="editarTarea(tarea)">
            <div class="row mb-2">
              <div class="col-md-4">
                <label for="nombre" class="fw-bold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  v-model="tarea.nombre"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label for="fechaInicio" class="fw-bold">Fecha Inicio</label>
                <input
                  type="date"
                  nombre="fechaInicion"
                  v-model="tarea.fechaInicio"
                  class="form-control"
                />
              </div>
              <div class="col-md-4">
                <label for="fechaFin" class="fw-bold">Estado</label>
                <input
                  type="date"
                  nombre="fechaFin"
                  v-model="tarea.fechaFin"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label for="estadp" class="fw-bold">Estado</label>
                <b-form-select
                  name="estado"
                  class="form-control"
                  v-model="tarea.estado"
                  :options="options"
                ></b-form-select>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">Editar</button>
                </div>
              </div>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Editar",
  data() {
    return {
      id: this.$route.params.id,
      options: [
        { value: "Por Hacer", text: "Por Hacer" },
        { value: "En Progreso", text: "En Progreso" },
        { value: "Terminado", text: "Terminado" },
      ],
    };
  },
  created() {
    this.getTarea(this.id);
  },
  methods: {
    ...mapActions(["getTarea", "editarTarea"]),
  },
  computed: {
    ...mapState(["tarea"]),
  },
};
</script>

<style>
</style>