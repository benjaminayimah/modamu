<template>
  <router-view/>
  <modal-onboarding v-if="onboardModal" />
  <modal />
  <session-exp v-if="sessionExp" />
  <village-allocation-modal v-if="allocate" />
</template>
<script>

import Modal from './components/layouts/Modal.vue'
import { mapState } from 'vuex'
import ModalOnboarding from './components/layouts/ModalOnboarding.vue'
import SessionExp from './components/layouts/SessionExp.vue'
import VillageAllocationModal from './views/app/admin/VillageAllocationModal.vue'
export default {
  components: { Modal, ModalOnboarding, SessionExp, VillageAllocationModal },
  computed: {
    ...mapState({
      onboardModal: (state) => state.onboardModal,
      sessionExp: (state) => state.sessionExp,
      allocate: (state) => state.village_allocation.active
    })
  },
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
        let elem = document.querySelector('.this-will-change')
        if(elem){
          return this.$store.commit('setDynamicFloatingDiv', elem)
        }
      }, 100)
    }
  }
}
</script>

<style lang="scss">
*,
*:after,
*:before,
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
