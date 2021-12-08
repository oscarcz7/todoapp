<template>
  <div>
    <h1>Agregar nueva tarea</h1>
    <form
      @submit.prevent="
        agregarTarea({
          nombre: nombre,
          descripcion: descripcion,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          estado: estado,
        })
      "
    >
      <div class="row mb-2">
        <div class="col-md-4">
          <input
            type="text"
            v-model="nombre"
            class="form-control"
            placeholder="Nombre de la tarea"
          />
        </div>
        <div class="col-md-4">
          <input
            type="text"
            v-model="descripcion"
            class="form-control"
            placeholder="Descripcion de la tarea"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-4">
          <input type="date" v-model="fechaInicio" class="form-control" />
        </div>
        <div class="col-md-4">
          <input type="date" v-model="fechaFin" class="form-control" />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-4">
          <label for="estado" class="fw-bold">Estado</label>
          <b-form-select
            name="estado"
            class="form-control"
            v-model="estado"
            :options="options"
          ></b-form-select>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg">Crear</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Agregar",
  data() {
    return {
      nombre: "",
      descripcion: "",
      fechaFin: "",
      fechaInicio: "",
      estado: null,
      options: [
        { value: "Por Hacer", text: "Por Hacer" },
        { value: "En Progreso", text: "En Progreso" },
        { value: "Terminado", text: "Terminado" },
      ],
    };
  },
  methods: {
    ...mapActions(["agregarTarea"]),
  },
};
</script>

<style>
</style>