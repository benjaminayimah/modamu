<template>
    <Vue3Lottie class="svg" :animationData="animationData" :loop="false" :height="150" />
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/dropoff-kids.json';

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
.svg {
    border-radius: 50%;
    height: 150px;
    width: 150px;
}
@media screen and (max-width: 500px){
    .svg {
        height: 100px;
        width: 100px;
    }
}

</style>