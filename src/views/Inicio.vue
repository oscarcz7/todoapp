<template>
  <div>
    <div class="m-4">
      <h6>Bienvenido {{ usuario.email }}</h6>
    </div>
    <div class="container mt-3 mb-2">
      <v-btn href="/agregar" text color="green">
        <span class="mr-2">Agregar Tarea</span>
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col>
          <v-simple-table
            class="table table-primary mt-5 text-centers shadow table-striped"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Tarea</th>
                  <th scope="col">Detalle</th>
                  <th scope="col">Fecha Inicio</th>
                  <th scope="col">Fecha Fin</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tareas" :key="index">
                  <th scope="row">1</th>
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.fechaInicio }}</td>
                  <td>{{ item.fechaFin }}</td>
                  <td>{{ item.estado }}</td>
                  <td>
                    <v-btn
                      :to="{ name: 'Editar', params: { id: item.id } }"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="cyan"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      @click="eliminarTarea(item.id)"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="red"
                    >
                      <v-icon dark> mdi-minus </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Inicio",

  created() {
    this.getTareas();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea"]),
  },
  computed: {
    ...mapState(["tareas", "usuario"]),
  },
};
</script>