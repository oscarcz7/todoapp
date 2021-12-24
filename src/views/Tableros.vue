<template>
  <v-container>
    <v-row class="my-5 ml-1">
      <h2 v-for="(item, index) in perfil" :key="index">
        Bienvenido {{ item.username }} {{ item.lastname }}
      </h2>
    </v-row>

    <!-- dialog for edit -->
    <v-dialog v-model="dialog2" width="390" class="white">
      <v-container class="d-block">
        <v-row no-gutters align="center" justify="space-between">
          <v-row no-gutters>
            <h3>Agregar nuevo Tablero</h3>
          </v-row>
          <v-icon @click="dialog2 = false">mdi-close</v-icon>
        </v-row>
        <v-form @submit.prevent="editarTablero(tablero)">
          <div class="d-flex flex-column">
            <v-text-field
              label="Nombre del Tablero"
              type="text"
              required
              v-model="tablero.name"
            ></v-text-field>
            <v-color-picker
              v-model="tablero.color"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email1"
              v-model="tablero.sharedwith1"
              name="email"
            ></v-text-field>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email2"
              v-model="tablero.sharedwith2"
              name="email"
            ></v-text-field>
            <v-text-field
              type="email"
              class="form-control"
              label="Compartir con: email3"
              v-model="tablero.sharedwith3"
              name="email"
            ></v-text-field>
            <v-btn color="primary" type="submit">Editar</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-dialog>
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
          <v-btn
            @click="eliminarTablero(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="red"
          >
            <v-icon dark> delete </v-icon>
          </v-btn>
          <v-btn
            @click="editar(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="green"
          >
            <v-icon dark> edit </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Tablero' }"
            @click="guardando(item.id)"
          >
            <v-icon left> dashboard </v-icon>
            Tablero Kanban
          </v-btn>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Inicio' }"
            @click="guardando(item.id)"
          >
            <v-icon left> table_view</v-icon>
            Tabla
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Calendario' }"
            @click="guardando(item.id)"
          >
            <v-icon left> event</v-icon>
            Calendario
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
          <v-btn
            @click="eliminarTablero(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="red"
          >
            <v-icon dark> delete </v-icon>
          </v-btn>
          <v-btn
            @click="editar(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="green"
          >
            <v-icon dark> edit </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Tablero' }"
            @click="guardando(item.id)"
          >
            <v-icon left> dashboard </v-icon>
            Tablero Kanban
          </v-btn>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Inicio' }"
            @click="guardando(item.id)"
          >
            <v-icon left> table_view</v-icon>
            Tabla
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Calendario' }"
            @click="guardando(item.id)"
          >
            <v-icon left> event</v-icon>
            Calendario
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
          <v-btn
            @click="eliminarTablero(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="red"
          >
            <v-icon dark> delete </v-icon>
          </v-btn>
          <v-btn
            @click="editar(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="green"
          >
            <v-icon dark> edit </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Tablero' }"
            @click="guardando(item.id)"
          >
            <v-icon left> dashboard </v-icon>
            Tablero Kanban
          </v-btn>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Inicio' }"
            @click="guardando(item.id)"
          >
            <v-icon left> table_view</v-icon>
            Tabla
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Calendario' }"
            @click="guardando(item.id)"
          >
            <v-icon left> event</v-icon>
            Calendario
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
          <v-btn
            @click="eliminarTablero(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="red"
          >
            <v-icon dark> delete </v-icon>
          </v-btn>
          <v-btn
            @click="editar(item.id)"
            class="mx-2"
            fab
            dark
            small
            color="green"
          >
            <v-icon dark> edit </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Tablero' }"
            @click="guardando(item.id)"
          >
            <v-icon left> dashboard </v-icon>
            Tablero Kanban
          </v-btn>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Inicio' }"
            @click="guardando(item.id)"
          >
            <v-icon left> table_view</v-icon>
            Tabla
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            tile
            outlined
            color="indigo"
            :to="{ name: 'Calendario' }"
            @click="guardando(item.id)"
          >
            <v-icon left> event</v-icon>
            Calendario
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
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      enableColor: false,
      dialog: false,
      dialog2: false,
      validate: false,
      name: "",
      color: "",
      sharedwith1: "",
      sharedwith2: "",
      sharedwith3: "",
      tablerosT: [],
      identificador: "",
    };
  },
  created() {
    this.getTableros();
    this.getTablerosCompartidos();
    this.getPerfil();
  },
  mounted() {
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
  methods: {
    guardando(id) {
      localStorage.setItem("param", id);
    },
    editar(id) {
      this.identificador = id;
      this.getTablero(this.identificador);
      this.dialog2 = true;
    },
    ...mapActions([
      "getTableros",
      "getTablerosCompartidos",
      "getTablerosCompartidos2",
      "getTablerosCompartidos3",
      "agregarTablero",
      "getPerfil",
      "eliminarTablero",
      "getTablero",
      "editarTablero",
    ]),

    addBoard() {
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
      "tablero",
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
