import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: () => import("../views/Inicio.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: () => import("../views/Editar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/popedit/:id",
    name: "Pop",
    component: () => import("../views/EditPopUp.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/calendaredit/:id",
    name: "CalEdit",
    component: () => import("../views/EditarCalendar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/agregar",
    name: "Agregar",
    component: () => import("../views/Agregar.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/calendario",
    name: "Calendario",
    component: () => import("../views/Calendario.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/tablero",
    name: "Tablero",
    component: () => import("../views/Tablero.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/tableros",
    name: "Tableros",
    component: () => import("../views/Tableros.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
  },
  {
    path: "/acceso",
    name: "Acceso",
    component: () => import("../views/Acceso.vue"),
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () => import("../views/Perfil.vue"),
    meta: { requireAuth: true },
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
