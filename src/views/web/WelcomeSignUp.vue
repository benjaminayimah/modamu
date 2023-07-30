<template>
    <div class="w-100 flx ai-c jc-c vh-100 pd-32">
        <div v-if="!sigining" class="flx ai-cflx-grow-1 signup-progress-container gap-50">
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
        <div v-else class="signin-progress centered">
            <div class="text-center ">
                <svg xmlns="http://www.w3.org/2000/svg" height="5" viewBox="0 0 205 5">
                    <g transform="translate(-830.5 -590)">
                        <line x2="200" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="5"/>
                        <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#0073ff" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
                <span>Almost there...</span>
            </div>
        </div>
    </div>
  </template>
  <script>
  import { mapGetters, mapState } from 'vuex';
  export default {
    name: 'WelcomeSignUp',
    computed: {
      ...mapGetters(['getNewUser', 'getWindowWidth']),
      ...mapState({
        sigining: (state) => state.sigining
      }),
      computedProgressWidth() {
        return this.getNewUser.data.progress + '%'
      }
    },
    watch: {
        sigining(newSigining) {
            this.startProgress(newSigining)
        },
    },
    data () {
        return {
            progressFill: 1,
        }
    },
    methods: {
        checkNewUser() {
            JSON.parse(localStorage.getItem('newUser')) ? this.$store.commit('resetNewUser') : ''
        },
        startProgress(payload) {
            if(payload) {
                let interval = setInterval(() => {
                    if(this.progressFill < 200 ) {
                        this.progressFill++
                    }
                    if(this.progressFill === 200) {
                        clearInterval(interval);
                        this.$router.push({ name: 'AdminDashboard'})
                    }
                }, 20)
            }
        },
    },
    created() {
        this.checkNewUser()
    }
}

</script>
<style lang="scss" scoped>
section {
    padding: 0 5vw;
}
h1 {
    color: var(--primary-color);
    font-size: clamp(1.1rem, 1vw + 1rem, 2rem);
    line-height: 1.3;
    
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
.signup-progress-container{
    width: 80vw;
    height: 100%;
}
.title{
    max-width: 60%;
}
.flx-1{
    display: flex;
    align-items: center;
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
.signin-progress {
    height: 100dvh;
}
@media screen and (max-width: 1120px){
    .signup-progress-container {
        section {
            padding: 2vw;
        }
    }
}
@media screen and (max-width: 989px){
    .vh-100{
        height: unset;
    }
    .signup-progress-container {
        padding: 0;
        width: 60vw;
        .wrap{
            flex-direction: column-reverse;
            gap: 16px;
        }
        .title{
            max-width: 100%;
        }
        section {
            padding: 0;
        }
    }
    .signup-progress-container {
        flex-direction: column;
    }
   
}
@media screen and (max-width: 640px){
    .signup-progress-container{
        width: 100vw;
    }
}

</style>