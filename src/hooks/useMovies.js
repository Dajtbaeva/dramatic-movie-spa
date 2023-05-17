import axios from "axios";
import { ref } from "vue";
import { useMovieStore } from "../store/MovieStore";

export function useMovies() {
  const movies = ref([]);
  const shows = ref([]);
  const popularMovies = ref([]);
  const trendingMovies = ref([]);
  const loading = ref(false);
  const totalP = ref(0);

  const MOVIE_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=4d46c9665cacd5bd3f1d64df374f4c7f";
  const SHOWS_URL =
    "https://api.themoviedb.org/3/discover/tv?api_key=4d46c9665cacd5bd3f1d64df374f4c7f";
  const POPULAR_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=4d46c9665cacd5bd3f1d64df374f4c7f";
  const TRENDING_URL =
    "https://api.themoviedb.org/3/trending/movie/day?&api_key=4d46c9665cacd5bd3f1d64df374f4c7f";

  const updatedList = (initialList) => {
    const { favMovies } = useMovieStore();
    const tempMovies = [];
    if (favMovies.length > 0) {
      // console.log("I see favMovies array");
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

  const getMovies = async (pageN = 1) => {
    try {
      loading.value = true;
      const response = await axios.get(`${MOVIE_URL}`, {
        params: {
          page: pageN,
          sort_by: "popularity.desc",
        },
      });
      movies.value = response.data.results;
      totalP.value = response.data.total_pages;
      movies.value = updatedList(movies.value);
    } catch (err) {
      console.log("Error from useMovies:" + err);
    } finally {
      loading.value = false;
    }
  };
  const getShows = async (pageN = 1) => {
    try {
      loading.value = true;
      const response = await axios.get(`${SHOWS_URL}`, {
        params: {
          page: pageN,
          sort_by: "popularity.desc",
        },
      });
      shows.value = response.data.results;
      totalP.value = response.data.total_pages;
      shows.value = updatedList(shows.value);
    } catch (err) {
      console.log("Error from useMovies:" + err);
    } finally {
      loading.value = false;
    }
  };
  const getPopularMovies = async (pageN = 1) => {
    try {
      loading.value = true;
      const response = await axios.get(`${POPULAR_URL}`, {
        params: {
          page: pageN,
          sort_by: "popularity.desc",
        },
      });
      popularMovies.value = response.data.results;
      totalP.value = response.data.total_pages;
      popularMovies.value = updatedList(popularMovies.value);
    } catch (err) {
      console.log("Error from useMovies:" + err);
    } finally {
      loading.value = false;
    }
  };
  const getTrendingMovies = async (pageN = 1) => {
    try {
      loading.value = true;
      const response = await axios.get(`${TRENDING_URL}`, {
        params: {
          page: pageN,
        },
      });
      trendingMovies.value = response.data.results;
      totalP.value = response.data.total_pages;
      trendingMovies.value = updatedList(trendingMovies.value);
    } catch (err) {
      console.log("Error from useMovies:" + err);
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    totalP,
    movies,
    shows,
    popularMovies,
    trendingMovies,
    getMovies,
    getShows,
    getPopularMovies,
    getTrendingMovies,
  };
}
