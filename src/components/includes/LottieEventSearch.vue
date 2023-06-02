<template>
    <Vue3Lottie class="svg" :animationData="animationData" :loop="false" :height="140"  />
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/search-event-lottie.json';

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
<style lang="scss" scoped>
@media screen and (max-width: 500px){
    .svg {
        height: 120px;
        width: 120px;
    }
}
</style>