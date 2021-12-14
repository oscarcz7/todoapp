<template>
  <v-card height="290" v-if="task.estado == 'Por Hacer'" color="red">
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
     <v-btn
        @click="eliminarTareaT(task.id)"
        class="mx-2"
        fab
        dark
        small
        color="blue"
        id="v-step-1"
      >
        <v-icon dark> mdi-minus </v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'Pop', params: { id: task.id } }"
        class="mx-2"
        fab
        dark
        small
        color="cyan"
        id="v-step-0"
      >
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
  </v-card>
  <v-card height="290" v-else-if="task.estado == 'En Progreso'" color="yellow">
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
    <v-btn
        @click="eliminarTareaT(task.id)"
        class="mx-2"
        fab
        dark
        small
        color="blue"
        id="v-step-1"
      >
        <v-icon dark> mdi-minus </v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'Pop', params: { id: task.id } }"
        class="mx-2"
        fab
        dark
        small
        color="cyan"
        id="v-step-0"
      >
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
  </v-card>
  <v-card height="290" v-else-if="task.estado == 'Terminado'" color="green">
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
    <v-btn
        @click="eliminarTareaT(task.id)"
        class="mx-2"
        fab
        dark
        small
        color="blue"
        id="v-step-1"
      >
        <v-icon dark> mdi-minus </v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'Pop', params: { id: task.id } }"
        class="mx-2"
        fab
        dark
        small
        color="cyan"
        id="v-step-0"
      >
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
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
  
  methods: {
    ...mapActions(["eliminarTareaT"]),
  },
};
</script>
