<template>
  <v-container fluid :style="containerStyle">
    <v-row>
      <!-- <v-col cols="12" sm="4" md="3">
        <v-img
          :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
          :alt="movie.title"
          height="600"
        ></v-img>
      </v-col> -->
      <v-col cols="12" sm="6" md="8" style="margin: auto">
        <v-row>
          <v-col cols="12">
            <h1 class="movie-title">{{ movie.title }}</h1>
          </v-col>
          <v-col cols="12" md="6">
            <p class="movie-info">
              <strong>Release Date:</strong> {{ movie.release_date }}
            </p>
            <p class="movie-info">
              <strong>Duration:</strong> {{ movie.runtime }} minutes
            </p>
            <strong style="color: yellow">Genres:</strong>

            <div
              class="movie-info"
              v-for="genre of movie.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </div>
          </v-col>
          <v-col cols="9">
            <h2 class="movie-heading">Overview</h2>
            <p class="movie-overview">{{ movie.overview }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-col cols="12" style="margin: 30px 50px">
    <h2 class="movie-heading">Watch trailer!</h2>
    <iframe
      class="youtube-player"
      id="player"
      type="text/html"
      width="90%"
      height="500px"
      :src="trailerLink"
      frameborder="0"
    ></iframe>
  </v-col>
</template>
<script>
import axios from "./axios";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    const movieId = route.params.id;
    const trailerLink = ref("");
    const movieBack = ref("");
    const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=4d46c9665cacd5bd3f1d64df374f4c7f`;
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4d46c9665cacd5bd3f1d64df374f4c7f`;
    const getMovie = async () => {
      try {
        const response = await axios.get(`${URL}`);
        const response2 = await axios.get(`${VIDEO_URL}`);
        movie.value = response.data;
        const trailerKey = response2.data.results[0]?.key;
        trailerLink.value = `https://www.youtube.com/embed/${trailerKey}`;
        movieBack.value = `https://image.tmdb.org/t/p/original${movie.value.backdrop_path}`;
        // console.log(response2);
        // console.log(trailerLink);
      } catch (err) {
        console.log("Error from MoviePage:" + err);
      }
    };
    const containerStyle = computed(() => ({
      background: `linear-gradient(
        90deg,
        #000000 17.76%,
        rgba(0, 0, 0, 0.687449) 41.44%,
        rgba(196, 196, 196, 0) 100%
      ), url(${movieBack.value})`,
      backgroundSize: "cover",
    }));

    onMounted(getMovie);
    return {
      movieId,
      movie,
      trailerLink,
      containerStyle,
    };
  },
};
</script>
<style scoped>
* {
  color: #a1b1cb;
}
.movie-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  color: white;
}

.movie-info {
  margin-bottom: 8px;
}

.movie-heading {
  font-size: 24px;
  font-weight: bold;
  /* margin-top: 24px; */
  margin-bottom: 8px;
  color: white;
}

.movie-overview {
  margin-bottom: 24px;
}
</style>
