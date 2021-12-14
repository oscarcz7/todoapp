<template>
  <v-container>
    <v-row class="my-5 ml-1">
      <h2 v-for="(item, index) in perfil" :key="index">
        Bienvenido {{ item.username }} {{ item.lastname }}
      </h2>
    </v-row>
    <v-dialog v-model="dialog" width="390" class="white">
      <v-container class="d-block">
        <v-row no-gutters align="center" justify="space-between">
          <v-row no-gutters>
            <h3>Agregar nuevo Tablero</h3>
          </v-row>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-row>
        <v-form
          @submit.prevent="
            agregarTablero({
              name: name,
              color: color,
              sharedwith1: sharedwith1,
              sharedwith2: sharedwith2,
              sharedwith3: sharedwith3,
            })
          "
        >
          <div class="d-flex flex-column">
            <v-text-field
              label="Nombre del Tablero"
              type="text"
              required
              v-model="name"
            ></v-text-field>
            <v-color-picker
              v-model="color"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email1"
              v-model="sharedwith1"
              name="email"
            ></v-text-field>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email2"
              v-model="sharedwith2"
              name="email"
            ></v-text-field>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email3"
              v-model="sharedwith3"
              name="email"
            ></v-text-field>
            <v-btn color="primary" type="submit">Crear</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-dialog>
    <div class="d-flex flex-row align-center justify-space-between">
      <h1>Mis Tableros</h1>
      <v-btn small depressed @click="addBoard">Agregar Tablero</v-btn>
    </div>
    <div class="d-flex flex-wrap align-center justify-start">
      <!-- <p v-if="boards.length === 0">You have no boards yet.</p> -->
      <v-card
        v-for="(item, index) in tableros"
        :key="index.id"
        :style="item.color ? `background-color:${item.color}` : ''"
        class="mr-5 my-3"
      >
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            :to="{ name: 'Tablero', params: { id: item.id } }"
          >
            Tablero Kanban
          </v-btn>
          <v-btn
            :to="{ name: 'Agregar', params: { id: item.id } }"
            text
            outlined
            color="black"
          >
            <span class="mr-2">Agregar Tarea</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-divider class="my-4" />
    <div class="mt-4 d-flex flex-row align-center justify-space-between">
      <h1>Tableros Compartidos</h1>
    </div>
    <div
      class="d-flex flex-wrap align-center justify-start"
      v-if="!tablerosCompartidos.lenght"
    >
      <!-- <p v-if="boards.length === 0">You have no boards yet.</p> -->
      <v-card
        v-for="(item, index) in tablerosCompartidos"
        :key="index.id"
        :style="item.color ? `background-color:${item.color}` : ''"
        class="mr-5 my-3"
      >
        <v-card-title> Compartido de: {{ item.email }} </v-card-title>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            :to="{ name: 'Tablero', params: { id: item.id } }"
          >
            Tablero Kanban
          </v-btn>
          <v-btn
            :to="{ name: 'Agregar', params: { id: item.id } }"
            text
            outlined
            color="black"
          >
            <span class="mr-2">Agregar Tarea a Este Tablero</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div
      class="d-flex flex-wrap align-center justify-start"
      v-if="!tablerosCompartidos2.lenght"
    >
      <!-- <p v-if="boards.length === 0">You have no boards yet.</p> -->
      <v-card
        v-for="(item, index) in tablerosCompartidos2"
        :key="index.id"
        :style="item.color ? `background-color:${item.color}` : ''"
        class="mr-5 my-3"
      >
        <v-card-title color="white">
          Compartido de: {{ item.email }}
        </v-card-title>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            :to="{ name: 'Tablero', params: { id: item.id } }"
          >
            Tablero Kanban
          </v-btn>
          <v-btn
            :to="{ name: 'Agregar', params: { id: item.id } }"
            text
            outlined
            color="black"
          >
            <span class="mr-2">Agregar Tarea a Este Tablero</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div
      class="d-flex flex-wrap align-center justify-start"
      v-if="!tablerosCompartidos3.lenght"
    >
      <!-- <p v-if="boards.length === 0">You have no boards yet.</p> -->
      <v-card
        v-for="(item, index) in tablerosCompartidos3"
        :key="index.id"
        :style="item.color ? `background-color:${item.color}` : ''"
        class="mr-5 my-3"
      >
        <v-card-title> Compartido de: {{ item.email }} </v-card-title>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            :to="{ name: 'Tablero', params: { id: item.id } }"
          >
            Tablero Kanban
          </v-btn>
          <v-btn
            :to="{ name: 'Agregar', params: { id: item.id } }"
            text
            outlined
            color="black"
          >
            <span class="mr-2">Agregar Tarea a Este Tablero</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      enableColor: false,
      dialog: false,
      validate: false,
      name: "",
      color: "",
      sharedwith1: "",
      sharedwith2: "",
      sharedwith3: "",
      tablerosT: [],
    };
  },
  created() {
    this.getTableros();
    this.getTablerosCompartidos();
    this.getPerfil();
  },
  methods: {
    ...mapActions([
      "getTableros",
      "getTablerosCompartidos",
      "getTablerosCompartidos2",
      "getTablerosCompartidos3",
      "agregarTablero",
      "getPerfil",
    ]),

    addBoard() {
      //lets create a temp id we can use to save our doc and our storage files
      this.dialog = true;
    },
  },
  computed: {
    ...mapState([
      "tableros",
      "tablerosCompartidos",
      "tablerosCompartidos2",
      "tablerosCompartidos3",
      "perfil",
    ]),
  },
};
</script>

<style lang="scss">
.v-dialog {
  border-radius: 15px;
  background-color: white;
  padding: 15px;
}
</style>
