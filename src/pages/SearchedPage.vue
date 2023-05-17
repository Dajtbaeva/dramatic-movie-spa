<template>
  <v-container fluid>
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <form @submit.prevent="searchStore.getMovies(searchMovie, 1)">
            <v-text-field
              v-model="searchMovie"
              hide-details="auto"
              label="Search..."
              name="input"
              id="input"
              style="color: #a1b1cb"
              class="text-end"
            ></v-text-field>
          </form>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="!searchStore.loader">
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
                v-for="movie of searchStore.movies"
                :key="movie.id"
                cols="12"
                sm="6"
                md="14"
                lg="3"
                >{{ movie.title }}
                <MovieItem :movie="movie" />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-list>
      <v-container class="max-width">
        <v-pagination
          v-model="page"
          :length="searchStore.totalPages"
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
import { ref, watch } from "vue";
import { useSearchStore } from "../store/SearchStore";

export default {
  setup() {
    const page = ref();
    const searchStore = useSearchStore();
    const searchMovie = ref("");
    const loadMoreItems = async () => {
      try {
        await searchStore.getMovies(searchMovie.value, page.value);
      } catch (err) {
        console.log("Error from loadMoreItems: " + err);
      }
    };
    watch(page, () => {
      loadMoreItems();
    });
    return {
      searchMovie,
      page,
      searchStore,
    };
  },
};
</script>
<style>
* {
  padding: 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 0 50px;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>
