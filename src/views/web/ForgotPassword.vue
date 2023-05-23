<template>
  <section class="wc-section">
      <div class="wc-title">
        <h1 class="fs-2r">{{ emailSent ? 'Check your email' : 'Forgot password' }}</h1>
        <span v-if="!emailSent">Enter your email to continue</span>
      </div>
      <form v-if="!emailSent" @submit.prevent="doSubmit">
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
            <input v-model="form.email" autocomplete="off" class="form-control" type="email" name="email" id="email" data-type="icon" data-color="light" placeholder="Enter your email">
          </div>
          <span class="input-error" v-if="validation.error && validation.errors.email">
              {{ validation.errors.email[0] }}
          </span>
        </div>
        <button class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
          <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
          <span>{{ creating ? 'Please wait...' : 'Continue'}}</span>
        </button>
      </form>
      <div v-else class="email-sent">
          <p>An email has been sent to <strong>{{ form.email }}</strong>, open the mail and follow the link to reset your password.</p>
          <p><span>Haven't received the email?</span><a href="#" @click.prevent="toggleBack">Resend it</a></p>
      </div>
      <div v-if="!emailSent" class="flx column gap-4 ai-c acc-footer">
        <p>
          <router-link :to="{ name: 'SignIn' }">Back to Sign in</router-link>
        </p>
      </div>
  </section>
</template>

<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import inputValMixin from '@/mixins/inputValMixin'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Spinner },
    name: 'ForgotPassword',
    mixins: [inputValMixin],
    computed: {
      ...mapState({
        hostname: (state) => state.hostname
      })
    },
    data () {
      return {
        form: {
          email: '',
        },
        emailSent: false,
        userError: {
          error: false,
          message: ''
        },
        creating: false,
      }
    },
    methods: {
    async doSubmit() {
      this.validation.error || this.userError.error ? this.clearErrs() : ''
      this.creating = true
      try {
        const res = await postApi(this.hostname + '/api/forgot-password', this.form)
        console.log(res.data)
        res.data.email ? this.emailSent = true : ''
        this.creating = false
      } catch (error) {
        this.creating = false
        if(error.response.status == 422){
          this.validation.error = true
          this.validation.errors = error.response.data.errors
        }
        if (error.response.status == 404) {
            this.userError.error = true
            this.userError.message = error.response.data.email+' does not exist in our system.'
        }
      }
    },
    toggleBack () {
      this.emailSent = !this.emailSent
    }
  }
}
</script>

<style lang="scss" scoped>
</style>