<template>
  <router-view/>
  <modal-onboarding v-if="onboardModal" />
  <modal />
  <session-exp v-if="sessionExp" />
  <village-allocation-modal v-if="villageAllocation" />
  <access-control-modal v-if="adminAccess" />
  <delete-modal v-if="deleteModal" />
</template>
<script>
import DeleteModal from './components/includes/app/DeleteModal.vue'
import Modal from './components/layouts/Modal.vue'
import { mapState } from 'vuex'
import ModalOnboarding from './components/layouts/ModalOnboarding.vue'
import SessionExp from './components/layouts/SessionExp.vue'
import VillageAllocationModal from './views/app/admin/VillageAllocationModal.vue'
import AccessControlModal from './views/app/admin/AccessControlModal.vue'
export default {
  components: { Modal, ModalOnboarding, SessionExp, VillageAllocationModal, AccessControlModal, DeleteModal },
  computed: {
    ...mapState({
      onboardModal: (state) => state.onboardModal,
      sessionExp: (state) => state.sessionExp,
      villageAllocation: (state) => state.subAdminStore.villageAccess,
      adminAccess: (state) => state.subAdminStore.adminAccess,
      deleteModal: (state) => state.deleteModal.active
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
