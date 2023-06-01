<template>
  <main class="home" :class="device">
    <div v-if="loader" class="loader-container">
      <lottie-loader />
    </div>
    <main-nav/>
    <top-nav-bar />
    <router-view />
  </main>
</template>

<script>
import LottieLoader from '@/components/includes/LottieLoader.vue';
import { mapState } from 'vuex';
import MainNav from '../../components/includes/app/MainNav.vue'
import TopNavBar from '../../components/includes/app/TopNavBar.vue';
export default {
  components: { MainNav, TopNavBar, LottieLoader },
  name: 'HomePage',
  computed: {
    ...mapState({
      device: (state) => state.device,
      loader: (state) => state.loader
    })
  }
}
</script>
<style lang="scss" scoped>
main {
  position: relative;
  margin-left: calc(var(--nav-width) + var(--dash-padding)*2 + var(--aside-padding));
  padding: 0 7%;
}
.lottie {
  position: fixed;
  top: 48vh;
  left: 50vw;
}

.loader-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
