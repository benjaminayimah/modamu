<template>
  <section class="wc-section">
      <div class="wc-title">
        <h1 class="fs-2r">Almost done!</h1>
        <span>Enter your new password</span>
      </div>
      <form  @submit.prevent="doSubmit">
        <div v-if="userError.error" class="invalid-credentials">
          <span>{{ userError.message }}</span>
        </div>
        <div class="form-row column">
            <label for="new_password">New password</label>
            <div class="input-wrapper">
                <input v-model="form.new_password" autocomplete="new-password" class="form-control" type="password" id="new_password" name="new_password" data-color="light" placeholder="Enter a new password">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.new_password">
                {{ validation.errors.new_password[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="confirm_password">Confirm password</label>
            <div class="input-wrapper">
                <input v-model="form.password_confirmation" autocomplete="new-password" class="form-control" type="password" id="confirm_password" name="confirm_password" data-color="light" placeholder="Confirm password">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.password_confirmation">
                {{ validation.errors.password_confirmation[0] }}
            </span>
        </div>
        <button class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
          <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
          <span>{{ creating ? 'Please wait...' : 'Continue'}}</span>
        </button>
      </form>
      <div class="flx column gap-4 ai-c acc-footer">
        <p>
          <router-link :to="{ name: 'SignIn' }">Back to Sign in</router-link>
        </p>
      </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { postApi } from '@/api';
import inputValMixin from '@/mixins/inputValMixin';
import Spinner from '@/components/includes/Spinner.vue';
export default {
    components: { Spinner },
    name: 'ResetPassword',
    mixins: [inputValMixin],
    computed: {
      ...mapState({
        hostname: (state) => state.hostname
      })
    },
    data() {
        return {
            form: {
                new_password: '',
                password_confirmation: '',
                token: ''
            },
            userError: {
                error: false,
                message: ''
            },
            creating: false
        }
    },
    methods: {
        async doSubmit() {
            this.validation.error || this.userError.error ? this.clearErrs() : ''
            this.creating = true
            try {
                const res = await postApi(this.hostname + '/api/do-reset-password', this.form)
                console.log(res.data)
                this.creating = false
            } catch (error) {
                this.creating = false
                if(error.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = error.response.data.errors
                }
                if (error.response.status == 401) {
                    this.userError.error = true
                    this.userError.message = error.response.data.message
                }
            }
        }
    },
    mounted() {
        this.form.token = this.$route.params.token
    }

}
</script>

<style lang="scss" scoped>

</style>