<template>
  <section class="wc-section">
    <div v-if="!completed">
      <div class="wc-title">
        <h1 class="fs-2r">Register Village</h1>
        <span>Add a new modamu village to begin sharing and adding fun to kids.</span>
      </div>
      <form @submit.prevent="submitSignUp">
        <div class="form-row column">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.455 16">
                <path d="M4.332,15.676A5.36,5.36,0,0,1,1.669,14.47C.468,13.37,0,11.556,0,8A13.03,13.03,0,0,1,.7,2.909,4.612,4.612,0,0,1,.936,2.45l.013-.022A4,4,0,0,1,3.083.679l0,0L3.132.661,3.153.652l.03-.011L3.21.631,3.236.622l.029-.01L3.319.593A17.369,17.369,0,0,1,8.727,0a22.583,22.583,0,0,1,4.4.324,5.368,5.368,0,0,1,2.663,1.205c1.2,1.1,1.669,2.915,1.669,6.471s-.468,5.369-1.669,6.47a5.36,5.36,0,0,1-2.663,1.206,22.583,22.583,0,0,1-4.4.324A22.583,22.583,0,0,1,4.332,15.676ZM1.454,8c0,3.055.347,4.619,1.2,5.4a4.075,4.075,0,0,0,1.971.853,21.326,21.326,0,0,0,4.1.294,21.326,21.326,0,0,0,4.1-.294A4.079,4.079,0,0,0,14.8,13.4c.851-.779,1.2-2.344,1.2-5.4a15.014,15.014,0,0,0-.373-3.921c-.4.4-.922.886-1.512,1.374A14.777,14.777,0,0,1,11.54,7.2,6.261,6.261,0,0,1,8.727,8H8.722a6.262,6.262,0,0,1-2.814-.794,14.784,14.784,0,0,1-2.584-1.75c-.585-.483-1.1-.966-1.5-1.361A15.027,15.027,0,0,0,1.454,8ZM3.79,1.969a2.982,2.982,0,0,0-1.27.765,22.111,22.111,0,0,0,1.73,1.6,13.338,13.338,0,0,0,2.324,1.58,4.87,4.87,0,0,0,2.148.632,4.856,4.856,0,0,0,2.149-.635,13.233,13.233,0,0,0,2.318-1.579,21.932,21.932,0,0,0,1.736-1.61l-.062-.064h0l-.016-.016,0,0-.015-.014,0,0L14.8,2.6a4.075,4.075,0,0,0-1.971-.853,21.326,21.326,0,0,0-4.1-.294A16.18,16.18,0,0,0,3.79,1.969Z"/>
              </svg>
            </i>
            <input v-model="form.email" class="form-control" type="email" name="email" id="email" data-type="icon" data-color="light" placeholder="Enter email">
          </div>
          <span class="input-error" v-if="validation.error && validation.errors.email">
              {{ validation.errors.email[0] }}
          </span>
        </div>
        <div class="form-row column">
          <label for="name">Village name</label>
          <div class="input-wrapper">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.667 16">
                <path d="M-481.667-345c-1.608,0-2.782-.043-3.694-.135a7.237,7.237,0,0,1-2.237-.5,2.118,2.118,0,0,1-1.106-1.018,3.8,3.8,0,0,1-.3-1.678,3.793,3.793,0,0,1,.3-1.679,2.117,2.117,0,0,1,1.105-1.017,7.239,7.239,0,0,1,2.237-.5c.912-.092,2.086-.135,3.694-.135s2.781.043,3.693.135a7.243,7.243,0,0,1,2.238.5,2.12,2.12,0,0,1,1.106,1.018,3.8,3.8,0,0,1,.3,1.678,3.8,3.8,0,0,1-.3,1.679,2.12,2.12,0,0,1-1.105,1.017,7.242,7.242,0,0,1-2.238.5C-478.885-345.043-480.059-345-481.667-345Zm0-5.333c-1.563,0-2.694.041-3.56.128a6.226,6.226,0,0,0-1.82.39.809.809,0,0,0-.458.388,2.684,2.684,0,0,0-.162,1.094,2.69,2.69,0,0,0,.162,1.094.809.809,0,0,0,.459.388,6.224,6.224,0,0,0,1.82.39c.866.087,2,.128,3.56.128s2.693-.041,3.559-.128a6.23,6.23,0,0,0,1.821-.39.811.811,0,0,0,.458-.388,2.7,2.7,0,0,0,.161-1.094,2.69,2.69,0,0,0-.161-1.093.811.811,0,0,0-.459-.389,6.232,6.232,0,0,0-1.821-.39C-478.973-350.293-480.1-350.333-481.667-350.333Zm0-2.667a4,4,0,0,1-4-4,4,4,0,0,1,4-4,4,4,0,0,1,4,4A4,4,0,0,1-481.667-353Zm0-6.666A2.67,2.67,0,0,0-484.333-357a2.67,2.67,0,0,0,2.667,2.667A2.67,2.67,0,0,0-479-357,2.67,2.67,0,0,0-481.667-359.666Z" transform="translate(489 361)"/>
              </svg>
            </i>
            <input v-model="form.village_name" class="form-control" type="text" name="name" id="name" data-type="icon" data-color="light" placeholder="Enter your village name">
          </div>
          <span class="input-error" v-if="validation.error && validation.errors.village_name">
              {{ validation.errors.village_name[0] }}
          </span>
        </div>
        <div class="form-col">
            <label for="address">Location of villlage</label>
            <div class="input-wrapper">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 20.101 19.821">
                        <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)"/>
                    </svg>
                </i>
                <input autocomplete="off" class="form-control" type="search" data-color="light" data-type="icon" ref="address" placeholder="Start typing, then pick from the dropdown list">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.address">
                {{ validation.errors.address[0] }}
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
            <input v-model="form.password" class="form-control" :type="showPass ? 'text' : 'password'" name="password" id="password" data-type="icon" autocomplete="new-password" data-color="light" placeholder="Enter a min of characters">
            <span class="hide-show-pass br-50 s-btn" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
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
        </div>
        <button class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
          <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
          <span>{{ creating ? 'Registring account...' : 'Register'}}</span>
        </button>
      </form>
      <div class="flx gap-4 jc-c fw-700 acc-footer">
        <div>Already have an account?</div>
        <router-link :to="{ name: 'SignIn' }">Login</router-link>
      </div>
    </div>
    <div v-else class="completed text-center">
      <div class="flx ai-c column">
          <completed-anime />
          <div class="flx ai-c column gap-32">
            <h1>Welcome on board!!!</h1>
            <div class="text-center">Your sign up is completed successfully. You can now proceed to your dashbard.</div>
            <button class="button-primary w-100 btn-lg" @click="goToDashboard">Go to Dashboard</button>
          </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import passwordToggleMixin from '../../mixins/passwordToggle';
import inputValMixin from '../../mixins/inputValMixin';
import Spinner from '../../components/includes/Spinner.vue'
import autoCompleMixin from '../../mixins/autoCompleMixin';
import CompletedAnime from '@/components/includes/CompletedAnime.vue';
export default {
  components: { Spinner, CompletedAnime },
  name: 'SignUpVillage',
  mixins: [ passwordToggleMixin, inputValMixin, autoCompleMixin],
  computed: mapGetters(['getHostname']),
  data () {
    return {
      form: {
        email: '',
        village_name: '',
        password: '',
        address: '',
        latitude: null,
        longitude: null,
      },
      creating: false,
      completed: false,
      payload: ''
    }
  },
  methods: {
    submitSignUp() {
        this.creating = true
        axios.post(this.getHostname+'/api/register-village', this.form)
        .then((res) => {
          this.signupSuccess(res)
        }).catch((e) => {
          this.creating = false
          if(e.response.status == 422){
            this.validation.error = true
            this.validation.errors = e.response.data.errors
          }
          if(e.response.status == 400) {
            this.$store.commit('setExpSession')
          }
        })
      },
      async signupSuccess(res) {
        this.creating = false
        this.completed = true
        this.payload = res.data.token
      },
      async goToDashboard () {
        await this.$store.commit('signInSuccess', this.payload)
        this.$router.push({ name: 'AdminDashboard'})
      }
  }
}
</script>
<style lang="scss" scoped>
.completed{
  padding: 0 10%;
  h1 {
    font-size: 2rem;
  }
}
</style>
