import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
import axios from "./axios";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);
  const totalPages = ref(0);
  const URL =
    "https://api.themoviedb.org/3/search/movie?api_key=4d46c9665cacd5bd3f1d64df374f4c7f&query=";

  const updatedList = (initialList) => {
    const { favMovies } = useMovieStore();
    const tempMovies = [];
    if (favMovies.length > 0) {
      for (const movie of initialList) {
        const favMovie = favMovies.find((m) => m.id === movie.id);
        movie.isLiked = favMovie ? true : false;
        tempMovies.push(movie);
      }
    } else {
      initialList.forEach((movie) => {
        movie.isLiked = false;
        tempMovies.push(movie);
      });
    }
    [...initialList] = tempMovies;
    return initialList;
  };
  const getMovies = async (search, pageN = 1) => {
    try {
      loader.value = true;
      const response = await axios.get(`${URL}${search}`, {
        params: {
          page: pageN,
        },
      });
      movies.value = response.data.results;
      movies.value = updatedList(movies.value);
      totalPages.value = response.data.total_pages;
      // console.log(totalPages.value);
      loader.value = false;
    } catch (err) {
      console.log("Error from SearchStore: " + err);
    } finally {
      loader.value = false;
    }
  };

  return {
    loader,
    movies,
    getMovies,
    totalPages,
  };
});
