<template>
  <section class="wc-section">
    <div class="wc-title">
      <h1 class="fs-2r">Sign up</h1>
      <span>Create an account to get start get access to our full features.</span>
    </div>
    <form @submit.prevent="submitSignUp">
      <div v-if="userError.error" class="invalid-credentials response-message">
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
          <input v-model="form.email" class="form-control" type="email" name="email" id="email" data-type="icon" data-color="light" placeholder="Enter your email address">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.email">
            {{ validation.errors.email[0] }}
        </span>
      </div>
      <div class="form-row column">
        <label for="name">Full name</label>
        <div class="input-wrapper">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.667 16">
              <path d="M-481.667-345c-1.608,0-2.782-.043-3.694-.135a7.237,7.237,0,0,1-2.237-.5,2.118,2.118,0,0,1-1.106-1.018,3.8,3.8,0,0,1-.3-1.678,3.793,3.793,0,0,1,.3-1.679,2.117,2.117,0,0,1,1.105-1.017,7.239,7.239,0,0,1,2.237-.5c.912-.092,2.086-.135,3.694-.135s2.781.043,3.693.135a7.243,7.243,0,0,1,2.238.5,2.12,2.12,0,0,1,1.106,1.018,3.8,3.8,0,0,1,.3,1.678,3.8,3.8,0,0,1-.3,1.679,2.12,2.12,0,0,1-1.105,1.017,7.242,7.242,0,0,1-2.238.5C-478.885-345.043-480.059-345-481.667-345Zm0-5.333c-1.563,0-2.694.041-3.56.128a6.226,6.226,0,0,0-1.82.39.809.809,0,0,0-.458.388,2.684,2.684,0,0,0-.162,1.094,2.69,2.69,0,0,0,.162,1.094.809.809,0,0,0,.459.388,6.224,6.224,0,0,0,1.82.39c.866.087,2,.128,3.56.128s2.693-.041,3.559-.128a6.23,6.23,0,0,0,1.821-.39.811.811,0,0,0,.458-.388,2.7,2.7,0,0,0,.161-1.094,2.69,2.69,0,0,0-.161-1.093.811.811,0,0,0-.459-.389,6.232,6.232,0,0,0-1.821-.39C-478.973-350.293-480.1-350.333-481.667-350.333Zm0-2.667a4,4,0,0,1-4-4,4,4,0,0,1,4-4,4,4,0,0,1,4,4A4,4,0,0,1-481.667-353Zm0-6.666A2.67,2.67,0,0,0-484.333-357a2.67,2.67,0,0,0,2.667,2.667A2.67,2.67,0,0,0-479-357,2.67,2.67,0,0,0-481.667-359.666Z" transform="translate(489 361)"/>
            </svg>
          </i>
          <input v-model="form.name" class="form-control" type="text" name="name" id="name" data-type="icon" data-color="light" placeholder="Your full name">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.name">
            {{ validation.errors.name[0] }}
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
          <input v-model="form.password" autocomplete="new-password" class="form-control" :type="showPass ? 'text' : 'password'" name="password" id="password" data-type="icon" data-color="light" placeholder="Enter a min of 6 characters">
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
        <div class="mt-8 progress-wrapper" v-if="form.password" :class="passwordStrengthClass">
          <div class="progress-bar mb-8 gap-8 flx">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="fs-09">Password strength: <strong class="capitalize">{{ passwordStrengthClass }}</strong></div>
        </div>
      </div>
      <button class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
        <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
        <span>{{ creating ? 'Signing up...' : 'Sign up'}}</span>
      </button>
    </form>
    <div class="flx gap-4 jc-c fw-700 acc-footer">
      <div>Already have an account?</div>
      <router-link :to="{ name: 'SignIn' }">Login</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import passwordToggleMixin from '@/mixins/passwordToggle'
import Spinner from '@/components/includes/Spinner.vue'
import inputValMixin from '@/mixins/inputValMixin'
export default {
  components: { Spinner },
  mixins: [passwordToggleMixin, inputValMixin],
  name: 'SignUp',
  computed: {
    ...mapGetters(['getHostname']),
    passwordStrength() {
      let strength = 0;
      if (this.form.password.length >= 6) {
        strength += 1;
      }
      if (this.form.password.length >= 10) {
        strength += 1;
      }
      if (this.form.password.length >= 14) {
        strength += 2;
      }
      if (/[A-Z]/.test(this.form.password) && /[a-z]/.test(this.form.password)) {
        strength += 1;
      }
      if (/\d/.test(this.form.password)) {
        strength += 1;
      }
      if (/[\W_]/.test(this.form.password)) {
        strength += 1;
      }
      return strength;
    },
    passwordStrengthClass() {
      if (this.passwordStrength < 3) {
        return 'weak';
      } else if (this.passwordStrength < 5) {
        return 'medium';
      } else {
        return 'strong';
      }
    },
  },
  data () {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        },
        creating: false,
      }
    },
    methods: {
      submitSignUp() {
        this.creating = true
        axios.post(this.getHostname+'/api/sign-up', this.form)
        .then((res) => {
          this.signupSuccess(res.data)
        }).catch((e) => {
          this.creating = false
          this.errorResponse(e)
        })
      },
      async signupSuccess(payload) {
        localStorage.removeItem('tempOnboarding')
        await this.$store.commit('setNewUser', payload)
        const newUser = localStorage.getItem('newUser')
        if (newUser) {
          this.$router.push({ name: 'SignUpParentDetails' })
        }
      }
    }
}
</script>
<style lang="scss" scoped>
.progress-wrapper{
  --weak: #dae0e6;
  --medium: #dae0e6;
  --strong: #dae0e6;
}
.progress-bar{
  width: 100%;
  height: 3px;
  div {
    height: inherit;
    border-radius: 3px;
    flex: 1;
    &:first-child {
      background-color: var(--weak);
    }
    &:nth-child(2) {
      background-color: var(--medium);
    }
    &:nth-child(3) {
      background-color: var(--strong);
    }
    
  }
}
.weak{
  --weak: #fc1d12;
  strong{
    color: var(--weak);
  }
}
.medium{
  --weak: #fc1d12;
  --medium: #f0b708;
  strong{
    color: var(--medium);
  }
}
.strong{
  --weak: #fc1d12;
  --medium: #f0b708;
  --strong: #03b109;
  strong{
    color: var(--strong);
  }
}

</style>