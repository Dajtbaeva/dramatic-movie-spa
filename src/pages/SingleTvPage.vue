<template>
  <v-container fluid :style="containerStyle">
    <v-row>
      <v-col v-if="!tvBack" cols="12" sm="4" md="3">
        <v-img :src="tvImg" :alt="tv.name" height="600"></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="8" style="margin: auto">
        <v-row>
          <v-col cols="12">
            <h1 class="movie-title">{{ tv.name }}</h1>
          </v-col>
          <v-col cols="12" md="6">
            <p class="movie-info">
              <strong>Release Date:</strong> {{ tv.first_air_date }}
            </p>
            <p class="movie-info" v-if="runTime">
              <strong>Episode run time:</strong>
              {{ runTime }} minutes
            </p>
            <p class="movie-info">
              <strong>Total seasons:</strong>
              {{ tv.number_of_seasons }}
            </p>
            <p class="movie-info">
              <strong>Total episodes:</strong>
              {{ tv.number_of_episodes }}
            </p>
            <p class="movie-info">
              <strong>Average rating:</strong>
              {{ tv.vote_average }}
            </p>
            <strong style="color: yellow">Genres:</strong>
            <div class="movie-info" v-for="genre of tv.genres" :key="genre.id">
              {{ genre.name }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-col cols="12" v-if="trailerLink" style="margin: 30px 50px">
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
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const tv = ref({});
    const route = useRoute();
    const tvId = route.params.id;
    const trailerLink = ref("");
    const tvImg = ref("");
    const tvBack = ref("");
    const URL = `https://api.themoviedb.org/3/tv/${tvId}?api_key=4d46c9665cacd5bd3f1d64df374f4c7f`;
    const VIDEO_URL = `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=4d46c9665cacd5bd3f1d64df374f4c7f`;
    const getTvShow = async () => {
      try {
        const response = await axios.get(`${URL}`);
        const response2 = await axios.get(`${VIDEO_URL}`);
        tv.value = response.data;
        const trailerKey = response2.data.results;
        tvImg.value = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${tv.value.poster_path}`;
        tvBack.value = `https://image.tmdb.org/t/p/original${tv.value.backdrop_path}`;
        if (trailerKey.length > 0) {
          const temp = response2.data.results[0]?.key;
          trailerLink.value = `https://www.youtube.com/embed/${temp}`;
        }
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
      ), url(${tvBack.value})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // backgroundPosition: "center",
      // marginTop: "30px",
    }));
    onMounted(getTvShow);
    return {
      tvId,
      tv,
      tvImg,
      trailerLink,
      containerStyle,
      tvBack,
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
