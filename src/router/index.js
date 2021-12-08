import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inicio.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Editar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/agregar",
    name: "Agregar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Agregar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/calendario",
    name: "Calendario",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calendario.vue"),
    meta: { requireAuth: true },
  },
  ,
  {
    path: "/tablero",
    name: "Tablero",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Tablero.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/registro",
    name: "Registro",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Registro.vue"),
  },
  {
    path: "/acceso",
    name: "Acceso",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Acceso.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const usuario = auth.currentUser;
    console.log("usuario", usuario)
    if (usuario) {
      next({ path: "/acceso", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
