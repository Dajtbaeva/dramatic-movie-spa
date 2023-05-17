import { createRouter, createWebHashHistory } from "vue-router";
import MoviesPage from "../pages/MoviesPage.vue";
import SingleMoviePage from "../pages/SingleMoviePage.vue";
import SingleTvPage from "../pages/SingleTvPage.vue";
import SearchedPage from "../pages/SearchedPage.vue";
import TvShowsPage from "../pages/TvShowsPage.vue";
import PopularPage from "../pages/PopularPage.vue";
import TrendingPage from "../pages/TrendingPage.vue";
import FavouritesPage from "../pages/FavouritesPage.vue";

const routes = [
  { path: "/", component: MoviesPage },
  { path: "/movies/:id", component: SingleMoviePage },
  { path: "/tv/:id", component: SingleTvPage },
  { path: "/search", component: SearchedPage },
  { path: "/shows", component: TvShowsPage },
  { path: "/popular", component: PopularPage },
  { path: "/trending", component: TrendingPage },
  { path: "/favourites", component: FavouritesPage },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
