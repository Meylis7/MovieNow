// store.js
import { reactive } from 'vue';

export const store = reactive({
  movies: [], 
  selectedMovie: null, 

  setMovies(movies) {
    this.movies = movies;
  },

  clearMovies() {
    this.movies = [];
  },

  setSelectedMovie(movie) {
    this.selectedMovie = movie;
  },

  clearSelectedMovie() {
    this.selectedMovie = null;
  },
});
