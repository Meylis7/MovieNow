<template>
    <section class="movies">
        <div class="auto_container">
            <div class="movies_wrap">
                <h4 class="movies_title">Фильмы</h4>

                <div class="movies_filter">
                    <div class="movies_filter-checkbox">
                        <input type="radio" name="sort" id="SortName" v-model="sortType" value="name" />
                        <label class="check_label" for="SortName">Отсортировать по названию</label>
                    </div>

                    <div class="movies_filter-checkbox">
                        <input type="radio" name="sort" id="SortYear" v-model="sortType" value="year" />
                        <label class="check_label" for="SortYear">Отсортировать по году</label>
                    </div>
                </div>

                <div class="movies_box">
                    <span v-if="loading" class="loader">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.4803 52.0001C11.5849 52.0001 10.8855 52.7785 11.0156 53.6643C13.9413 73.5773 30.2359 88.9196 50.0387 88.9196C69.8415 88.9196 86.1361 73.5773 89.0618 53.6643C89.192 52.7785 88.4925 52.0001 87.5972 52.0001V52.0001C86.8328 52.0001 86.1926 52.5751 86.0798 53.3312C83.3171 71.8558 68.1704 85.9196 50.0387 85.9196C31.907 85.9196 16.7604 71.8558 13.9976 53.3312C13.8849 52.5751 13.2447 52.0001 12.4803 52.0001V52.0001Z"
                                fill="#FA2828" fill-opacity="0.98" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5.2129 49.9999C4.18233 49.9999 3.36231 49.1285 3.46529 48.1031C5.89074 23.9524 25.76 5.05116 50 5.05116C74.24 5.05116 94.1092 23.9524 96.5346 48.1031C96.6376 49.1285 95.8176 49.9999 94.787 49.9999V49.9999C93.8458 49.9999 93.0695 49.2676 92.973 48.3314C90.6665 25.9718 72.2676 8.61792 50 8.61792C27.7324 8.61792 9.33347 25.9718 7.02697 48.3314C6.93039 49.2676 6.15408 49.9999 5.2129 49.9999V49.9999Z"
                                fill="black" />
                        </svg>
                    </span>

                
                    <movie-card v-for="movie in sortedMovies" :key="movie.id" :movie="movie"></movie-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MovieCard from './MovieCard.vue';
import { store } from '../store.js';

export default {
    components: {
        MovieCard,
    },

    data() {
        return {
            movies: store.movies,
            sortType: '',
            loading: true,
        };
    },

    computed: {
        sortedMovies() {
            if (this.sortType === 'name') {
                return [...this.movies].sort((a, b) => a.title.localeCompare(b.title));
            } else if (this.sortType === 'year') {
                return [...this.movies].sort((a, b) => a.year - b.year);
            } else {
                return this.movies;
            }
        },
    },

    async mounted() {
        if (store.movies.length === 0) {
            try {
                const response = await fetch('https://mashroom-movies-api.netlify.app/api/movies');
                const result = await response.json();
                if (result.success) {
                    store.setMovies(result.data);
                    this.movies = store.movies;
                } else {
                    console.error('Failed to fetch movies:', result);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                this.loading = false;
            }
        } else {
            this.loading = false;
        }
    },

    beforeUnmount() {
        store.clearMovies();
    },
};

</script>

<style scoped></style>
