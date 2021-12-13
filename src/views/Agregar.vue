<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Agregar nueva tarea</h1>
          <v-form
            @submit.prevent="
              agregarTarea({
                name: name,
                descripcion: descripcion,
                start: start,
                hourstart: hourstart,
                end: end,
                hourend: hourend,
                estado: estado,
                color: color,
              })
            "
          >
            <v-text-field
              label="Titulo"
              type="text"
              v-model="name"
              class="form-control"
            />
            <v-text-field
              label="Detalle"
              type="text"
              v-model="descripcion"
              class="form-control"
            />
            <v-text-field
              label="Fecha Inicio"
              type="date"
              v-model="start"
              class="form-control"
            />

            <v-text-field
              label="Hora Inicio"
              type="time"
              v-model="hourstart"
              class="form-control"
            />

            <v-text-field
              label="Fecha Fin"
              type="date"
              v-model="end"
              class="form-control"
            />
            <v-text-field
              label="Hora Fin"
              type="time"
              v-model="hourend"
              class="form-control"
            />
            <v-select
              label="Estado"
              name="estado"
              class="form-control"
              v-model="estado"
              :items="options"
            ></v-select>
            <v-text-field
              v-model="color"
              type="color"
              label="color (click to open color menu)"
            ></v-text-field>
            <v-btn type="submit" elevation="2" block color="primary">
              Crear
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
  name: "Agregar",
  data() {
    return {
      name: "",
      descripcion: "",
      end: null,
      start: null,
      estado: null,
      hourend: null,
      hourstart: null,
      color: null, // default event color
      items: ["Por Hacer", "Item 2", "En Progreso", "Terminado"],
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