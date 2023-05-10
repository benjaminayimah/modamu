<template>
  <welcome-banner v-if="getWindowWidth >= 990"  v-bind:img="getImage" v-bind:window="getWindowWidth"/>
  <section class="wc-section">
    <div class="wc-title">
      <h1 class="fs-2r">Login</h1>
      <span>Enter your credentials to login.</span>
    </div>
    <form @submit.prevent="submitSignin">
      <div v-if="userError.error" class="invalid-credentials">
        <span>{{ userError.message }}</span>
      </div>
      <div class="form-row column">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.455 16">
              <path d="M4.332,15.676A5.36,5.36,0,0,1,1.669,14.47C.468,13.37,0,11.556,0,8A13.03,13.03,0,0,1,.7,2.909,4.612,4.612,0,0,1,.936,2.45l.013-.022A4,4,0,0,1,3.083.679l0,0L3.132.661,3.153.652l.03-.011L3.21.631,3.236.622l.029-.01L3.319.593A17.369,17.369,0,0,1,8.727,0a22.583,22.583,0,0,1,4.4.324,5.368,5.368,0,0,1,2.663,1.205c1.2,1.1,1.669,2.915,1.669,6.471s-.468,5.369-1.669,6.47a5.36,5.36,0,0,1-2.663,1.206,22.583,22.583,0,0,1-4.4.324A22.583,22.583,0,0,1,4.332,15.676ZM1.454,8c0,3.055.347,4.619,1.2,5.4a4.075,4.075,0,0,0,1.971.853,21.326,21.326,0,0,0,4.1.294,21.326,21.326,0,0,0,4.1-.294A4.079,4.079,0,0,0,14.8,13.4c.851-.779,1.2-2.344,1.2-5.4a15.014,15.014,0,0,0-.373-3.921c-.4.4-.922.886-1.512,1.374A14.777,14.777,0,0,1,11.54,7.2,6.261,6.261,0,0,1,8.727,8H8.722a6.262,6.262,0,0,1-2.814-.794,14.784,14.784,0,0,1-2.584-1.75c-.585-.483-1.1-.966-1.5-1.361A15.027,15.027,0,0,0,1.454,8ZM3.79,1.969a2.982,2.982,0,0,0-1.27.765,22.111,22.111,0,0,0,1.73,1.6,13.338,13.338,0,0,0,2.324,1.58,4.87,4.87,0,0,0,2.148.632,4.856,4.856,0,0,0,2.149-.635,13.233,13.233,0,0,0,2.318-1.579,21.932,21.932,0,0,0,1.736-1.61l-.062-.064h0l-.016-.016,0,0-.015-.014,0,0L14.8,2.6a4.075,4.075,0,0,0-1.971-.853,21.326,21.326,0,0,0-4.1-.294A16.18,16.18,0,0,0,3.79,1.969Z"/>
            </svg>
          </i>
          <input v-model="form.email" class="form-control" type="email" name="email" id="email" data-type="icon" data-color="light" placeholder="Enter your email">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.email">
            {{ validation.errors.email[0] }}
        </span>
      </div>
      <div class="form-row column">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.39 18.998">
              <path d="M-438.305-337.394A4.7,4.7,0,0,1-443-342.088v-3a4.7,4.7,0,0,1,3.583-4.561v-1.568a5.2,5.2,0,0,1,5.172-5.174,5.2,5.2,0,0,1,5.176,5.172v1.6a4.7,4.7,0,0,1,3.459,4.529v3a4.7,4.7,0,0,1-4.7,4.694Zm-3.3-7.7v3a3.309,3.309,0,0,0,3.3,3.3h8a3.309,3.309,0,0,0,3.306-3.3v-3a3.31,3.31,0,0,0-3.306-3.3h-8A3.309,3.309,0,0,0-441.61-345.089Zm11.151-4.694v-1.435A3.8,3.8,0,0,0-434.245-355a3.8,3.8,0,0,0-3.783,3.785v1.433Zm-6.541,6.7a2.7,2.7,0,0,1,2.7-2.7,2.7,2.7,0,0,1,2.695,2.7,2.7,2.7,0,0,1-2.695,2.695A2.7,2.7,0,0,1-437-343.088Zm1.39,0a1.307,1.307,0,0,0,1.305,1.3,1.307,1.307,0,0,0,1.3-1.3,1.307,1.307,0,0,0-1.3-1.3A1.306,1.306,0,0,0-435.61-343.088Z" transform="translate(443 356.392)"/>
            </svg>
          </i>
          <input v-model="form.password" autocomplete="off" class="form-control" :type="showPass ? 'text' : 'password'" name="password" id="password" data-type="icon" data-color="light" placeholder="Enter password">
          <span class="hide-show-pass br-50" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
              <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                  <g transform="translate(1.182 1.182)">
                      <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                      <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                  </g>
              </svg>
          </span>
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.password">
            {{ validation.errors.password[0] }}
        </span>
        <div class="forgot-pass">
          <router-link :to="{ name: 'ForgotPassword'}" class="">Forgot your password?</router-link>
        </div>
      </div>
      <button class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
        <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
        <span>{{ creating ? 'Signing in...' : 'Sign in'}}</span>
      </button>
      <!-- <div class="or"><div><span>Or</span></div></div>
      <button class="button-outline w-100 gap-8">
        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 31.341 32.021">
          <g id="Google__G__Logo" transform="translate(26.754 -39.239)">
            <path d="M.576,52.268a18.55,18.55,0,0,0-.254-3.029H-14.754v6.017h8.632a7.433,7.433,0,0,1-3.2,4.777v4h5.15A15.654,15.654,0,0,0,.576,52.268Z" transform="translate(4.011 3.342)" fill="#4285f4"/>
            <path d="M-11.174,66.484A15.251,15.251,0,0,0-.594,62.6l-5.15-4a9.659,9.659,0,0,1-5.43,1.548,9.562,9.562,0,0,1-8.979-6.618h-5.31v4.123A15.987,15.987,0,0,0-11.174,66.484Z" transform="translate(0.431 4.776)" fill="#34a853"/>
            <path d="M-19.723,56.093a9.291,9.291,0,0,1-.507-3.055,9.652,9.652,0,0,1,.507-3.055V45.859h-5.31a15.825,15.825,0,0,0-1.721,7.178,15.825,15.825,0,0,0,1.721,7.178Z" transform="translate(0 2.213)" fill="#fbbc05"/>
            <path d="M-11.174,45.577a8.687,8.687,0,0,1,6.137,2.4l4.563-4.563a15.308,15.308,0,0,0-10.7-4.176,15.987,15.987,0,0,0-14.29,8.833l5.31,4.123A9.562,9.562,0,0,1-11.174,45.577Z" transform="translate(0.431)" fill="#ea4335"/>
          </g>
        </svg>
        Continue with Google
      </button> -->
    </form>
    <div class="flx column gap-4 ai-c acc-footer">
      <div class="text-center fw-700 ">
        <span>Don't have an account? </span>
        <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
      </div>
      <p>
        <span>Do you own a village? </span><router-link :to="{ name: 'SignUpVillage' }">Register your village</router-link>
      </p>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import inputValMixin from '../../mixins/inputValMixin'
import WelcomeBanner from '../../components/includes/web/WelcomeBanner.vue';
import Spinner from '../../components/includes/Spinner.vue';
import passwordToggleMixin from '../../mixins/passwordToggle';
export default {
  components: { WelcomeBanner, Spinner },
  name: 'SignIn',
  mixins: [inputValMixin, passwordToggleMixin],
  computed: mapGetters(['getImage', 'getWindowWidth', 'getHostname']),
  data () {
    return {
      form: {
        name: '',
        email: '',
      },
      userError: {
        error: false,
        message: ''
      },
      creating: false,
    }
  },
  methods: {
    submitSignin() {
      this.creating = true
      this.validation.error || this.userError.error ? this.clearErrs() : ''
      axios.post(this.getHostname+'/api/sign-in', this.form)
      .then((res) => {
          this.signinSuccess(res)
        }).catch((e) => {
          this.creating = false
          if (e.response.status == 401) {
            this.userError.error = true
            this.userError.message = 'Invalid email or password. Please try again or try resetting your password.'
            this.form.password = ''
          }
          if(e.response.status == 422){
            this.validation.error = true
            this.validation.errors = e.response.data.errors
          }
        })
    },
    async signinSuccess(res) {
      this.creating = false
      await this.$store.commit('signInSuccess', res.data.token)
      this.$router.push({ name: 'AdminDashboard'})

    }
  }
}
</script>
<style lang="scss" scoped>

</style>