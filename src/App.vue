<template>
  <v-app>
    <v-card height="100%" class="overflow-hidden">
      <v-app-bar height="95" dense color="blue-grey darken-4" dark>
        <span class="hidden-sm-and-up">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </span>
        <v-toolbar-title color="grey lighten-5" v-if="existeUsuario">
          {{ appTitle }}
        </v-toolbar-title>
        <v-toolbar-title color="grey lighten-5" v-if="!existeUsuario">
          <v-btn text to="/">{{ appTitle }}</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row justify="end" class="hidden-xs-only" v-if="existeUsuario">
          <v-btn
            to="/tableros"
            class="mr-3"
          >
            <v-icon left dark>dashboard</v-icon>
            Tableros
          </v-btn>
          
          <v-btn
            v-for="item in menuItemsIn"
            :key="item.title"
            :to="item.path"
            class="mr-3"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn @click="cerrarSesion">
            <v-icon left dark>logout</v-icon>
            Salir
          </v-btn>
        </v-row>
        <v-row justify="end" class="hidden-xs-only" v-if="!existeUsuario">
          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
            class="mr-3"
            elevation="2"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-row>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            v-if="existeUsuario"
          >
          <v-list-item to="/tableros">
              <v-list-item-icon>
                <v-icon>dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Tableros</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="item in menuItemsIn"
              :key="item.title"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="cerrarSesion">
              <v-list-item-icon>
                <v-icon>logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Salir</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            v-if="!existeUsuario"
          >
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path"
              :class="item.class"
              
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>

      <v-bottom-sheet v-model="sheet" hide-overlay>
        <v-app-bar
          bottom
          height="25"
          dense
          color="blue-grey darken-4"
          dark
          v-if="existeUsuario"
        >
          <span class="hidden-sm-and-up">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </span>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
              v-if="existeUsuario"
            >
              <v-list-item @click="location.reload();" to="/tableros">
                <v-list-item-icon>
                  <v-icon>dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Tableros</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="item in menuItemsIn"
                :key="item.title"
                :to="item.path"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="cerrarSesion">
                <v-list-item-icon>
                  <v-icon>logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Salir</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
              v-if="!existeUsuario"
            >
              <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
                :class="item.class"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-bottom-sheet>
    </v-card>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sheet: true,
      show: true,
      today: "",
      appTitle: "KANBAN TEAM",
      menuItems: [
        {
          title: "Registrarse",
          path: "/registro",
          icon: "face",
          class: "v-step-0",
        },
        {
          title: "Ingresar",
          path: "/acceso",
          icon: "lock_open",
          class: "v-step-1",
        },
      ],
      menuItemsIn: [
        // { title: "Tableros", path: "/tableros", icon: "dashboard" },
        { title: "Tareas", path: "/inicio", icon: "home" },
        { title: "Calendario", path: "/calendario", icon: "calendar_today" },
      ],
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
    ...mapState(["tareas"]),
  },
};
</script>