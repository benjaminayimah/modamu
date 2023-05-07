<template>
  <main class="home" :class="getDevice">
    <main-nav v-if="getDevice != 'mobile'" />
    <top-nav-bar />
    <router-view />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import MainNav from '../../components/includes/app/MainNav.vue'
import TopNavBar from '../../components/includes/app/TopNavBar.vue';
export default {
  components: { MainNav, TopNavBar },
  name: 'HomePage',
  computed: mapGetters(['getDevice']),
  mounted() {
    this.$store.dispatch('computeCoordinates')
  }
}
</script>
<style lang="scss" scoped>
main {
  position: relative;
  margin-left: calc(var(--nav-width) + var(--dash-padding)*2 + var(--aside-padding)*2);
  padding: 0 7%;
}
</style>
