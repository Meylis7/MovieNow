<template>
    <section class="movies">
        <div class="auto_container">
            <div class="movies_wrap">
                <router-link to="/" @click.native="clearMovieList">
                    <div class="back_list">
                        <span>
                            <svg width="12" height="20" viewBox="0 0 12 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.67 1.86998L9.9 0.0999756L0 9.99998L9.9 19.9L11.67 18.13L3.54 9.99998L11.67 1.86998Z"
                                    fill="#FF5252" fill-opacity="0.98" />
                            </svg>
                        </span>
                        <p>Назад к списку</p>
                    </div>
                </router-link>

                <span v-if="loading" class="loader">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.4803 52.0001C11.5849 52.0001 10.8855 52.7785 11.0156 53.6643C13.9413 73.5773 30.2359 88.9196 50.0387 88.9196C69.8415 88.9196 86.1361 73.5773 89.0618 53.6643C89.192 52.7785 88.4925 52.0001 87.5972 52.0001V52.0001C86.8328 52.0001 86.1926 52.5751 86.0798 53.3312C83.3171 71.8558 68.1704 85.9196 50.0387 85.9196C31.907 85.9196 16.7604 71.8558 13.9976 53.3312C13.8849 52.5751 13.2447 52.0001 12.4803 52.0001V52.0001Z"
                            fill="#FA2828" fill-opacity="0.98" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.2129 49.9999C4.18233 49.9999 3.36231 49.1285 3.46529 48.1031C5.89074 23.9524 25.76 5.05116 50 5.05116C74.24 5.05116 94.1092 23.9524 96.5346 48.1031C96.6376 49.1285 95.8176 49.9999 94.787 49.9999V49.9999C93.8458 49.9999 93.0695 49.2676 92.973 48.3314C90.6665 25.9718 72.2676 8.61792 50 8.61792C27.7324 8.61792 9.33347 25.9718 7.02697 48.3314C6.93039 49.2676 6.15408 49.9999 5.2129 49.9999V49.9999Z"
                            fill="black" />
                    </svg>
                </span>

                <div v-else-if="movie" class="movie-detail">
                    <div class="movies_item">
                        <div class="movies_item-photo">
                            <img src="../assets/images/placeholder.png" :alt="movie.title">
                        </div>

                        <div class="movies_item-info">
                            <h1 class="movies_item-title">{{ movie.title }}</h1>

                            <p class="movies_item-txt">
                                {{ movie.year }}, {{ movie.genres.join(', ') }}
                            </p>

                            <p class="movies_item-txt">
                                режиссёр: {{ movie.directors && movie.directors.length > 0 ? movie.directors.join(', ')
                                    : 'N/A' }}
                            </p>

                            <p class="movies_item-txt">
                                Актёры:

                                <span>
                                    {{ movie.actors && movie.actors.length > 0 ? movie.actors.join(', ') : 'N/A' }}
                                </span>
                            </p>

                            <p class="movies_item-description">
                                {{ movie.description }}
                            </p>

                            <p v-if="movie.collapse?.duration" class="movies_item-duration">
                                {{ movie.collapse?.duration[0] || '' }}

                                <span>
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0V2H12V0H4V2H2V0H0V18H2V16H4V18H12V16H14V18H16V0H14ZM4 14H2V12H4V14ZM4 10H2V8H4V10ZM4 6H2V4H4V6ZM10 16H6V2H10V16ZM14 14H12V12H14V14ZM14 10H12V8H14V10ZM14 6H12V4H14V6Z"
                                            fill="#FA2828" fill-opacity="0.98" />
                                    </svg>
                                </span>
                            </p>
                        </div>


                    </div>
                </div>

                <div v-else="!movie" class="not_found">
                    <p>К сожалению, по вашему запросу ничего не найдено...</p>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            movie: store.selectedMovie,
            loading: true,
        };
    },

    methods: {
        clearMovieList() {
            store.clearMovies(); 
        },
    },

    async mounted() {
        if (store.selectedMovie && store.selectedMovie.id === parseInt(this.$route.params.id, 10)) {
            this.movie = store.selectedMovie;
            this.loading = false;
        } else {
            try {
                const response = await fetch(
                    `https://mashroom-movies-api.netlify.app/api/movie/${this.$route.params.id}`
                );
                const result = await response.json();
                if (result.success) {
                    this.movie = result.data;
                    store.setSelectedMovie(this.movie); 
                } else {
                    this.movie = null; 
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
                this.movie = null;
            } finally {
                this.loading = false;
            }
        }
    },
};

</script>

<style scoped>
.movies_item {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
