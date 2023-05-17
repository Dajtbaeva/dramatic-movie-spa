<template>
  <v-container fluid>
    <v-list
      v-if="movieStore.favMovies.length !== 0"
      style="
        background: linear-gradient(
          90deg,
          #000000 17.76%,
          rgba(0, 0, 0, 0.687449) 41.44%,
          rgba(196, 196, 196, 0) 100%
        );
      "
    >
      <template v-slot:default>
        <v-container fluid>
          <h2 align="center" style="color: #a1b1cb">Your favourite movies and TV shows</h2>
          <v-row style="margin-top: 30px">
            <v-col
              v-for="movie of movieStore.favMovies"
              :key="movie.id"
              cols="12"
              sm="6"
              md="14"
              lg="3"
            >
              <MovieItem v-if="movie.title" :movie="movie" />
              <TvItem v-else :tv="movie" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-list>
    <h2 v-else align="center" style="color: #a1b1cb">
      Your favourite list is empty!
    </h2>
  </v-container>
</template>
<script>
import { useMovieStore } from "../store/MovieStore";

export default {
  setup() {
    const movieStore = useMovieStore();
    return { movieStore };
  },
};
</script>
