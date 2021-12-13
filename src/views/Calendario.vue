<template>
  <v-card class="mt-2">
    <v-tour name="myTour" :steps="steps"></v-tour>
    <v-sheet height="74" class="mx-auto">
      <v-toolbar dense color="white">
        <v-btn
          fab
          dark
          small
          color="blue"
          @click.stop="dialog = true"
          id="v-step-0"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-btn outlined class="mx-2" @click="setToday" id="v-step-1">
          Hoy
        </v-btn>
        <v-btn fab text small @click="prev" id="v-step-2">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next" id="v-step-3">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title class="d-none d-lg-block">{{ title }}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on" id="v-step-4">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Dia</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mes</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 dias</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-container>
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
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDate" max-width="700">
      <v-card>
        <v-container>
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
        </v-container>
      </v-card>
    </v-dialog>

    <v-sheet height="700" width="98%" class="mx-auto">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="tareas"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="setDialogDate"
        @change="updateRange"
        id="v-step-5"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card min-width="350px" dense>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <p class="text-h4 text--primary">{{ selectedEvent.descripcion }}</p>
            <p class="text-h5 text--primary">
              Estado: {{ selectedEvent.estado }}
            </p>
            <v-chip-group column>
              <v-chip class="light-blue lighten-1 white--text">{{
                selectedEvent.start
              }}</v-chip>
              <v-chip class="indigo darken-4 white--text">{{
                selectedEvent.end
              }}</v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions class="py-4">
            <v-spacer></v-spacer>

            <v-btn
              :to="{ name: 'CalEdit', params: { id: selectedEvent.id } }"
              class="mx-2"
              fab
              dark
              color="teal"
            >
              <v-icon dark> edit</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              fab
              dark
              color="teal"
              @click="eliminarTareaC(selectedEvent.id)"
            >
              <v-icon dark> delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    //data for the task
    name: "",
    descripcion: "",
    end: null,
    start: null,
    estado: null,
    hourend: null,
    hourstart: null,
    color: "#1976D2", // default event color
    items: ["Por Hacer", "Item 2", "En Progreso", "Terminado"],
    options: [
      { value: "Por Hacer", text: "Por Hacer" },
      { value: "En Progreso", text: "En Progreso" },
      { value: "Terminado", text: "Terminado" },
    ],
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false,
    steps: [
      {
        target: "#v-step-0", // We're using document.querySelector() under the hood
        content: `Agrega nuevas tareas a tu calendario`,
      },
      {
        target: "#v-step-1",
        content: "Si te perdiste regresa a la marca de este dia",
      },
      {
        target: "#v-step-2",
        content: "Regresa un dia, semana! ",
      },
      {
        target: "#v-step-3",
        content: "Adelanta un dia, semana! ",
      },
      {
        target: "#v-step-4",
        content: "Selecciona la vista que necesites!",
      },
      {
        target: "#v-step-5",
        content: "Visualiza tus tareas, editalas o eliminalas!",
      },
    ],
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
    ...mapState(["tareas", "usuario"]),
  },
  created() {
    this.getTareas();
  },
  methods: {
    ...mapActions(["agregarTareaC", "getTareas", "eliminarTareaC"]),

    setDialogDate({ date }) {
      this.dialogDate = true;
      this.focus = date;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
  },
  mounted: function () {
    this.$tours["myTour"].start();
  },
};
</script>
