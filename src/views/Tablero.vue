<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-btn outlined color="blue" large bottom left @click="dialog = !dialog">
        <v-icon left> edit</v-icon>
        Fondo
      </v-btn>
    </v-row>
    <v-container mt-4 :style="{ 'background-color': color, width: '100%' }">
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <v-col v-for="column in columns" :key="column.title">
                <h3 class="text-center">{{ column.title }}</h3>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable
                  :list="column.tasks"
                  :animation="200"
                  ghost-class="ghost-card"
                  group="tasks"
                >
                  <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                  <task-card
                    v-for="task in column.tasks"
                    :key="task.id"
                    :task="task"
                    class="mt-3 cursor-move"
                  ></task-card>
                  <!-- </transition-group> -->
                </draggable>                
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-color-picker elevation="15" @input="onInput"></v-color-picker>
        </v-card>
      </v-dialog>
    </v-container>
    
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";

export default {
  components: {
    TaskCard,
    draggable,
  },
  data() {
    return {
      dialog: false,
      color: null,
    };
  },
  mounted() {
    this.addColumns();
  },
  methods: {
    onInput(val) {
      this.color = val.hex;
    },
    ...mapActions(["getTareasIP", "getTareasPH", "getTareasT", "addColumns"]),
  },
  created() {
    this.getTareasIP();
    this.getTareasPH();
    this.getTareasT();
    this.addColumns();
  },
  computed: {
    ...mapState(["tareasIP", "tareasPH", "tareasT", "columns"]),
  },
};
</script>