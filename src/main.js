import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

import { auth } from "./firebase";
import vuetify from './plugins/vuetify'

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("detectarUsuario", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("detectarUsuario", user);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  }).$mount("#app");
});
