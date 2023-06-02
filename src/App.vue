<template>
  <router-view/>
  <modal />
  <modal-onboarding />
</template>
<script>

import Modal from './components/layouts/Modal.vue'
import ModalOnboarding from './components/layouts/ModalOnboarding.vue'
export default {
  components: { Modal, ModalOnboarding },
  name: 'App',
  created() {
    this.$store.commit('computeWindow')
    window.addEventListener('resize', this.windowSize)
    localStorage.getItem('auth') ? this.$store.dispatch('getAuthUser') : ''
  },
  methods: {
    windowSize() {
      setTimeout(()=> {
        this.$store.commit('computeWindow')
      }, 100)
    }
  }
}
</script>

<style lang="scss">
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
