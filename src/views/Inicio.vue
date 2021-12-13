<template>
  <v-container class="mt-4">
    <v-row>
      <h2 v-for="(item, index) in perfil" :key="index">
        Bienvenido {{ item.username }} {{ item.lastname }}
      </h2>
    </v-row>
    <div class="container mt-3 mb-2">
      <v-btn href="/agregar" text color="green">
        <span class="mr-2">Agregar Tarea</span>
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col>
          <v-simple-table>
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
                  <th scope="col">Alertas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tareas" :key="index">
                  <th scope="row">1</th>
                  <td>{{ item.name }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.start }}</td>
                  <td>{{ item.end }}</td>
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
                  <td>
                    <v-badge
                      v-if="item.end > today"
                      :content="1"
                      :value="1"
                      color="red"
                      overlap
                    >
                      <v-icon large> dashboard</v-icon>
                    </v-badge>
                    <v-badge
                      v-else-if="item.end == today"
                      :content="1"
                      :value="1"
                      color="orange"
                      overlap
                    >
                      <v-icon large> dashboard</v-icon>
                    </v-badge>
                    <v-badge
                      v-if="item.end < today  "
                      :content="1"
                      :value="1"
                      color="green"
                      overlap
                    >
                      <v-icon large> dashboard</v-icon>
                    </v-badge>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  name: "Inicio",
  data() {
    return {
      messages: 0,
      today: moment().format("YYYY-MM-DD"),
    };
  },
  created() {
    this.getTareas();
    this.getPerfil();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea", "getPerfil"]),
  },
  computed: {
    ...mapState(["tareas", "usuario", "perfil"]),
  },
  
};
</script>