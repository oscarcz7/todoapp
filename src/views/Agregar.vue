<template>
  <div>
    <h1>Agregar nueva tarea</h1>
    <form @submit.prevent="agregarTarea(nombre)">
      <input type="text" v-model="nombre" />
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Agregar",
  data() {
    return {
      nombre: "",
    };
  },
  methods:{
      ...mapActions(['agregarTarea'])
  }
};
</script>

<style>
</style>