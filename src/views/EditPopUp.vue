<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ tarea.name }}
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="editarTarea(tarea)" mt-3>
              <v-text-field
                label="Titulo"
                type="text"
                name="name"
                v-model="tarea.name"
                class="form-control"
              />
              <v-text-field
                label="Fecha Inicio"
                type="date-local"
                v-model="tarea.start"
                class="form-control"
              />
              <v-text-field
                label="Fecha Fin"
                type="datetime-local"
                v-model="tarea.end"
                class="form-control"
              />
              <v-select
                label="Estado"
                name="estado"
                class="form-control"
                v-model="tarea.estado"
                :items="options"
              ></v-select>

              <v-btn type="submit" elevation="2" block color="primary"
                >Editar</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    ...mapActions(["getTarea", "editarTareaP"]),
  },
  computed: {
    ...mapState(["tarea"]),
  },
};
</script>



<style>
</style>