<template>
    <vue-lottie :options="lottieOptions" :width="180" :height="180" />
</template>
<script>
import VueLottie from 'vue-lottie';
import animationData from '../../assets/lottie/beacon.json';

export default {
  components: {
    VueLottie,
  },
  data() {
    return {
      lottieOptions: {
        animationData: animationData,
        loop: true,
        autoplay: true,
      },
    };
  },
};
</script>
