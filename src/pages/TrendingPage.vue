<template>
  <v-container fluid>
    <v-row style="margin: 0 100px">
      <v-col cols="10">
        <h2 style="color: #a1b1cb">Trending today</h2>
      </v-col>
      <v-col cols="2">
        <v-autocomplete
          v-model="selectedOption"
          :items="options"
          label="Filter"
          hide-details="auto"
          style="color: #a1b1cb"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <div v-if="!loading">
      <v-list
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
            <v-row>
              <v-col
                v-for="movie of sortedList"
                :key="movie.id"
                cols="12"
                sm="6"
                md="14"
                lg="3"
              >
                <MovieItem :movie="movie" />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-list>
      <v-container class="max-width">
        <v-pagination
          v-model="page"
          :length="totalP"
          :total-visible="6"
          rounded="circle"
          style="color: #a1b1cb"
        ></v-pagination>
      </v-container>
    </div>
    <h3 align="center" style="color: #a1b1cb" v-else>Loading...</h3>
  </v-container>
</template>
<script>
import { ref, computed, watch, onMounted } from "vue";
import { useMovies } from "../hooks/useMovies";

export default {
  data() {
    return {
      options: [
        { value: "title", title: "By title" },
        { value: "popularity", title: "By popularity" }, // "release_date": "2023-03-23"
      ],
    };
  },
  setup() {
    const page = ref();
    const { loading, trendingMovies, getTrendingMovies, totalP } = useMovies();
    const selectedOption = ref("");
    const currentMovies = ref([]);
    const loadMoreMovies = async () => {
      try {
        await getTrendingMovies(page.value);
        currentMovies.value = [...trendingMovies.value];
      } catch (err) {
        console.log("Error from loadMoreTrendingMovies: " + err);
      }
    };
    const sortedList = computed(() => {
      const sortedMovies = [...currentMovies.value];
      if (selectedOption.value === "popularity") {
        sortedMovies.sort((m1, m2) => m2.popularity - m1.popularity);
      } else {
        sortedMovies.sort((m1, m2) =>
          m1[selectedOption.value]?.localeCompare(m2[selectedOption.value])
        );
      }
      return sortedMovies;
    });
    watch(page, () => {
      loadMoreMovies();
    });
    onMounted(loadMoreMovies);
    return {
      totalP,
      page,
      loading,
      selectedOption,
      sortedList,
    };
  },
};
</script>
<style>
* {
  padding: 0;
}
</style>
