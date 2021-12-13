<template>
  <v-card height="290">
    <v-card-title>{{ task.name }}</v-card-title>
    <v-card-text>
      {{ task.descripcion }}
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>Fechas</v-card-title>

    <v-card-text>
      <v-chip-group column>
        <v-chip class="teal lighten-3 white--text">{{ task.start }}</v-chip>
        <v-chip class="red lighten-1 white--text">{{ task.end }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      individual: [],
      id: this.$route.params.id,
    };
  },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.getTareas();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTareaT"]),
  },
  computed: {
    ...mapState(["tareas", "usuario", "tarea"]),
  },
};
</script>
