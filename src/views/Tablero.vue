<template>
  <div>
    <v-container mt-4 :style="`background-color: ${tablero.color}` ">
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <v-col v-for="column in columns2" :key="column.title">
                <h3 class="text-center">{{ column.title }}</h3>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                
                  <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                  <task-card
                    v-for="task in column.tasks"
                    :key="task.id"
                    :task="task"
                    class="mt-3 cursor-move"
                  ></task-card>
                
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
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
      id: this.$route.params.id,
      dialog: false,
      color: null,
      id2: null
    };
  },
 
  methods: {
    onInput(val) {
      this.color = val.hex;
    },
    validando(id) {
      if(this.id !== this.identificador){
        this.id2 = this.id
      }
    },
    ...mapActions([  "getTablero", "getTareasTablero", "validar"]),
  },
  created() {
    
    this.getTablero(this.id);
    this.getTareasTablero(this.id);
    this.validar(this.id);
    
  },
  computed: {
    ...mapState([ "columns2", "tablero", "identificador"]),
  },
};
</script>