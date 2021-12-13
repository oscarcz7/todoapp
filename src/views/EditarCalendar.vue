<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h3>
            Editar la tarea: <span>{{ tarea.name }}</span>
          </h3>

          <hr />
          <v-form @submit.prevent="editarTareaC(tarea)" mt-3>
            <v-text-field
              label="Titulo"
              type="text"
              name="name"
              v-model="tarea.name"
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
              v-model="tarea.estado"
              :items="options"
            ></v-select>
            <v-text-field
              v-model="color"
              type="color"
              label="color (click to open color menu)"
            ></v-text-field>
            <v-btn type="submit" elevation="2" block color="primary"
              >Editar</v-btn
            >
          </v-form>
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
    ...mapActions(["getTarea", "editarTareaC"]),
  },
  computed: {
    ...mapState(["tarea"]),
  },
};
</script>

<style>
</style>