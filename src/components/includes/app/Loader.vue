<template>
  <div ref="lottie"></div>
</template>
<script>
import lottie from 'lottie-web';
export default {
    name: 'SpinningLoader',
    mounted() {
        this.animation = lottie.loadAnimation({
            container: this.$refs.lottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: require('@/assets/animations/loader.json')
        });
    },
    methods: {
        playAnimation() {
            this.animation.play();
        },
        stopAnimation() {
            this.animation.stop();
        }
    }
}
</script>

<style>

</style>