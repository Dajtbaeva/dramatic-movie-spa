<template>
  <v-card
    class="mx-auto"
    style="background-color: black; cursor: pointer"
    max-width="200"
  >
    <v-img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${tv.poster_path}`"
      :alt="tv.name"
      :height="auto"
      @click="openMoviePage(tv)"
      cover
    ></v-img>
    <v-card-title style="color: white" @click="openMoviePage(tv)">
      {{ tv.name }} </v-card-title
    >title
    <div class="justify-self-start">
      <v-card-subtitle style="color: rgba(175, 175, 175, 1)">
        {{ tv.first_air_date.slice(0, 4) }}
      </v-card-subtitle>
    </div>
    <v-card-actions style="padding: 0">
      <v-list-item class="w-100">
        <template v-slot:prepend class="justify-self-start">
          <v-card-text style="padding: 0; color: #ffc907"
            >IMDb: {{ tv.vote_average }}</v-card-text
          >
        </template>
        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn
              size="small"
              variant="text"
              icon="mdi-heart"
              @click="tv.isLiked ? unlikeMovie() : likeMovie()"
              :color="tv.isLiked ? 'red' : 'grey'"
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
    tv: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const movieStore = useMovieStore();
    const router = useRouter();
    const likeMovie = () => {
      movieStore.likeMovie(props.tv);
      console.log("From movieItem: " + props.tv.isLiked);
    };
    const unlikeMovie = () => {
      movieStore.unlikeMovie(props.tv);
    };
    const openMoviePage = (tv) => {
      router.push(`/tv/${tv.id}`);
    };
    return { likeMovie, unlikeMovie, openMoviePage };
  },
};
</script>
<style scoped>
* {
  background: rgba(11, 15, 22, 0.47);
  box-shadow: 8px -8px 10px rgba(0, 0, 0, 0.25);
  font-weight: 700;
}
</style>
