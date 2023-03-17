<script setup>
    import { onMounted, defineEmits } from 'vue';

    const emit = defineEmits(['closeBanner']);

    onMounted(() => {
        const banner = document.querySelector('.banner');
        const yellow = 'rgb(255, 204, 0)';
        const orange = 'rgb(240, 142, 42)';
        const audio = new Audio(require('@/assets/audio/wrong-turn-warning.mp3'));
        audio.play();

        let interval = setInterval(() => {
            const colour = window.getComputedStyle(banner)?.backgroundColor;

            if(!colour)
                return;

            if(colour === orange) {
                banner.style.background = yellow;
            } else if(colour === yellow) {
                banner.style.background = orange;
            }
        }, 1000)
    });
</script>

<template>

    <div class='banner'>
        <span class='text'>
            Possible Wrong Turn Detected - Hold Position and Contact ATC for new directions.
        </span>
        <font-awesome-icon :icon='`fa-solid fa-multiply`' class='close-icon' @click='emit("closeBanner")'></font-awesome-icon>
    </div>

</template>

<style scoped>
    .banner {
        width: 100%;
        position: absolute;
        top: 20px;
        left: 0;
        background: var(--yellow);
        min-height: 40px;
        color: var(--dark-grey);
        z-index: 30;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 3px 0;
    }

    .close-icon {
        font-size: 20px;
        margin-right: 15px;
    }

    .close-icon:hover {
        cursor: pointer;
        color: var(--red);;
    }

    .text {
        font-weight: 600;
        font-size: 1.7vw;
        display: flex;
        justify-content: center;
        flex-grow: 1;
    }
</style>