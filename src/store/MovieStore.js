import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const favMovies = ref([]);
  const loading = ref(false);

  const moviesInLocalStorage = localStorage.getItem("movies");
  if (moviesInLocalStorage) favMovies.value = JSON.parse(moviesInLocalStorage);

  const unlikeMovie = (object) => {
    const id = object.id;
    object.isLiked = false;
    favMovies.value = favMovies.value.filter((el) => el.id !== id);
    localStorage.setItem("movies", JSON.stringify(favMovies.value));
  };

  const likeMovie = (object) => {
    object.isLiked = true;
    if (favMovies.value.length > 0) {
      favMovies.value.push(object);
    } else {
      favMovies.value = [object];
    }
    localStorage.setItem("movies", JSON.stringify(favMovies.value));
  };

  watch(
    () => favMovies.value,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );
  return {
    favMovies,
    likeMovie,
    unlikeMovie,
    loading,
  };
});
