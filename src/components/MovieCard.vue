<template>
    <div class="movies_item" @mouseover="hover = true" @mouseleave="hover = false" :class="{ 'hover': hover }">
        <div class="movies_item-photo">
            <!-- <img :src="movie.poster" :alt="movie.title" /> -->
            <img src="../assets/images/placeholder.png" :alt="movie.title">

        </div>

        <div class="movies_item-info">
            <router-link :to="`/movie/${movie.id}`" class="movies_item-title">
                {{ movie.title }}
            </router-link>

            <p class="movies_item-txt">{{ movie.year }}, {{ movie.genres ? movie.genres.join(', ') : 'N/A' }}</p>

            <p class="movies_item-txt">Режиссёр: {{ movie.directors ? movie.directors.join(', ') : 'N/A' }}</p>

            <p class="movies_item-txt">
                Актёры:
                <span>{{ movie.actors && movie.actors.length > 0 ? movie.actors.join(', ') : 'N/A' }}</span>
            </p>

            <p v-if="movie.description" class="movies_item-description">
                {{ movie.description }}
            </p>

            <p v-if="movie.collapse?.duration" class="movies_item-duration">
                {{ movie.collapse?.duration[0] || '' }}

                <span>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 0V2H12V0H4V2H2V0H0V18H2V16H4V18H12V16H14V18H16V0H14ZM4 14H2V12H4V14ZM4 10H2V8H4V10ZM4 6H2V4H4V6ZM10 16H6V2H10V16ZM14 14H12V12H14V14ZM14 10H12V8H14V10ZM14 6H12V4H14V6Z"
                            fill="#FA2828" fill-opacity="0.98" />
                    </svg>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    data() {
        return {
            hover: false,
        };
    },

    props: {
        movie: Object,
    },

    methods: {
        selectMovie() {
            store.setSelectedMovie(this.movie); 
        },
    },
};

</script>

<style scoped>
.movies_item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movies_item.hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
