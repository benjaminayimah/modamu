<template>
    <section v-if="getNewUser.active" class="sign-up-progress">
      <div class="flx column gap-32 flx-grow-1 wrap">
        <div class="flx column gap-16 title">
          <h1 class="fs-2r">{{ getNewUser.data.heading }}</h1>
          <div class="gray">{{ getNewUser.data.subHeading }}</div>
        </div>
        <div class="flx column gap-16">
          <div class="progress-bar"></div>
          <div class="flx jc-sb">
            <div class="footer flx gap-8 ai-c fw-600"><span class="br-50"></span>{{ getNewUser.data.footer }}</div>
            <div class="fw-600">{{ getNewUser.data.progress }}% Complete</div>
          </div>
        </div>
      </div>
    </section>
    <section class="wc-section" :class="[{'color-me' : getNewUser.active && getNewUser.state == 3 }, { 'pd-me' : getWindowWidth < 990 && getNewUser.state == 2} ]">
      <parent-sign-up-form v-if="!getNewUser.active" />
      <parent-details-form v-else-if="getNewUser.active && getNewUser.state == 2"/>
      <trigger-add-kids-form v-else-if="getNewUser.active && getNewUser.state == 3" v-bind:newUser="getNewUser" />
    </section>
</template>
<script>
import { mapGetters } from 'vuex';
import TriggerAddKidsForm from '../../components/layouts/TriggerAddKidsForm.vue';
import ParentDetailsForm from '../../components/layouts/ParentDetailsForm.vue';
import ParentSignUpForm from '../../components/layouts/ParentSignUpForm.vue';
export default {
  components: { ParentSignUpForm, ParentDetailsForm, TriggerAddKidsForm },
  name: 'SignUp',
  computed: {
    ...mapGetters(['getNewUser']),
    computedProgressWidth() {
      return this.getNewUser.data.progress + '%'
    }
  },
  created() {
    this.checkNewUser()
  },
  methods: {
    checkNewUser() {
      JSON.parse(localStorage.getItem('newUser')) ? this.$store.commit('resetNewUser') : ''
    }
  }

}
</script>
<style lang="scss" scoped>
h1 {
  color: var(--primary-color);
}
.footer{
  span {
    height: 8px;
    width: 8px;
    background-color: var(--primary-color);
  }
}
svg{
  width: 100%;
}
.color-me{
  background-color: var(--bg-white);
  justify-content: center;
  gap: 90px;
  padding: 40px;
  margin: 0 15%;
}
@media screen and (max-width: 1280px){
  .color-me{
    margin: 0 5%;
  }
}
@media screen and (max-width: 640px){
  .color-me{
    margin: 0;
  }
}
.pd-me{
  padding: 40px 0;
  justify-content: space-between;
  
}
.title{
  max-width: 60%;
}
.progress-bar{
  width: 100%;
  height: 10px;
  position: relative;
  overflow-x: hidden;
  border-radius: 3px;
  background-color: #E5FFF2;
  &::after {
    content: '';
    background-color: #2ECE8B;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: v-bind(computedProgressWidth);
    border-radius: inherit;
    transition: width .5s ease;
    // transform: translate(20%, -98%);
  }
}
</style>