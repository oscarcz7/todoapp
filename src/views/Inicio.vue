<template>
  <v-container class="mt-4" height="900">
    <v-row class="my-5 mx-3">
      <h2 v-for="(item, index) in perfil" :key="index">
        Bienvenido {{ item.username }} {{ item.lastname }}
      </h2>
    </v-row>
    <div class="container mt-2 mb-2">
      <v-btn href="/agregar" text color="green" id="v-step-0">
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
                      id="v-step-1"
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
                      id="v-step-2"
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
                      id="v-step-3"
                    >
                      <v-icon large> dashboard</v-icon>
                    </v-badge>
                    <v-badge
                      v-else-if="item.end == today"
                      :content="1"
                      :value="1"
                      color="orange"
                      overlap
                      id="v-step-3"
                    >
                      <v-icon large> dashboard</v-icon>
                    </v-badge>
                    <v-badge
                      v-if="item.end < today"
                      :content="1"
                      :value="1"
                      color="green"
                      overlap
                      id="v-step-3"
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
    <v-container >
      <v-tour name="myTour" :steps="steps">
        <template slot-scope="tour">
          <transition name="fade">
            <v-step
              v-if="tour.steps[tour.currentStep]"
              :key="tour.currentStep"
              :step="tour.steps[tour.currentStep]"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              class="d-none d-lg-block"
            >
              <template v-if="tour.currentStep === 2">
                <div slot="actions">
                  <button @click="tour.previousStep" class="btn btn-primary">
                    Retroceder
                  </button>
                  <button @click="tour.nextStep" class="btn btn-primary">
                    Siguiente
                  </button>
                </div>
              </template>
            </v-step>
          </transition>
        </template>
      </v-tour>
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
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          content: `Agrega nuevas tareas!`,
        },
        {
          target: "#v-step-1",
          content: "Edita la tarea cuando quieras!",
        },
        {
          target: "#v-step-2",
          content: "Elimina la tarea pero ten cuidado no podras recuperarla!",
        },
        {
          target: "#v-step-3",
          content: "Tienes alertas o nitificaciones!",
        },
      ],
    };
  },
  created() {
    this.getTareas();
    this.getPerfil();
  },
  mounted: function () {
    this.$tours["myTour"].start();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea", "getPerfil"]),
  },
  computed: {
    ...mapState(["tareas", "usuario", "perfil"]),
  },
};
</script>