<template>
    <Vue3Lottie :animationData="animationData" :height="80"  />
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/welcome-lottie.json';

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