import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router/router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import MovieItem from "./components/MovieItem.vue";
import TvItem from "./components/TvItem.vue";

const app = createApp(App);
app.component("MovieItem", MovieItem);
app.component("TvItem", TvItem);
loadFonts();

app.use(vuetify);
app.use(router);
app.use(createPinia());
app.mount("#app");
