<template>
  <v-card
    class="mx-auto"
    style="background-color: black; cursor: pointer"
    max-width="200"
  >
    <v-img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      :height="auto"
      @click="openMoviePage(movie)"
      cover
    ></v-img>

    <v-card-title style="color: white" @click="openMoviePage(movie)">
      {{ movie.title }}
    </v-card-title>
    <div class="justify-self-start">
      <v-card-subtitle style="color: rgba(175, 175, 175, 1)">
        {{ movie.release_date.slice(0, 4) }}
      </v-card-subtitle>
    </div>
    <v-card-actions style="padding: 0">
      <v-list-item class="w-100">
        <template v-slot:prepend class="justify-self-start">
          <v-card-text style="padding: 0; color: #ffc907"
            >IMDb: {{ movie.vote_average }}</v-card-text
          >
        </template>
        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn
              size="small"
              variant="text"
              icon="mdi-heart"
              @click="movie.isLiked ? unlikeMovie() : likeMovie()"
              :color="movie.isLiked ? 'red' : 'grey'"
            ></v-btn>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useMovieStore } from "../store/MovieStore";
import { useRouter } from "vue-router";
export default {
  props: {
    movie: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const movieStore = useMovieStore();
    const router = useRouter();
    const likeMovie = () => {
      movieStore.likeMovie(props.movie);
      console.log("From movieItem: " + props.movie.isLiked);
    };
    const unlikeMovie = () => {
      movieStore.unlikeMovie(props.movie);
    };
    const openMoviePage = (movie) => {
      router.push(`/movies/${movie.id}`);
    };
    return { likeMovie, unlikeMovie, openMoviePage };
  },
};
</script>
<style scoped>
* {
  background: rgba(11, 15, 22, 0.47);
  box-shadow: 8px -8px 10px rgba(0, 0, 0, 0.25);
  /* backdrop-filter: blur(12.5px); */
  font-weight: 700;
}
</style>
