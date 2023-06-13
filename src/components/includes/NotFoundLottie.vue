<template>
    <Vue3Lottie :animationData="animationData" :height="200" :width="200" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/not-found.json';

export default {
components: {
  Vue3Lottie,
},
data() {
  return {
      animationData
  };
},
};
</script>