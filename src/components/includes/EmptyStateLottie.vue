<template>
    <Vue3Lottie :animationData="animationData" :loop="false" :height="200" :width="200" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/empty-state.json';

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