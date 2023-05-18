<template>
      <Vue3Lottie :animationData="animationData" :height="40" :width="40" />
</template>
  
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/loader-blue.json';
  
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
  