<template>
    <div class="w-100 flx ai-c jc-c vh-100">
        <div class="flx ai-cflx-grow-1 signup-progres-container gap-50">
            <section v-if="getNewUser.active" class="sign-up-progress flx-1">
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
            <section class="flx-1">
                <router-view />
            </section>
        </div>
    </div>
  </template>
  <script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'WelcomeSignUp',
    computed: {
      ...mapGetters(['getNewUser', 'getWindowWidth']),
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
.signup-progres-container{
    width: 80vw;
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