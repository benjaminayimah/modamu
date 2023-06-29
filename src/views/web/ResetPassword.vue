<template>
  <section class="wc-section">
      <div class="wc-title">
        <completed-anime class="anime" v-if="successful" />
        <h1 class="fs-2r">{{ successful ? 'Successful!' : 'Almost there!' }}</h1>
        <span v-if="!successful">Enter your new password</span>
      </div>
      <form v-if="!successful"  @submit.prevent="doSubmit">
        <div v-if="userError.error" class="invalid-credentials response-message">
          <span>{{ userError.message }}</span>
        </div>
        <div class="form-row column">
            <label for="new_password">New password</label>
            <div class="input-wrapper">
                <input v-model="form.password" autocomplete="new-password" class="form-control" type="password" id="password" name="password" data-color="light" placeholder="Enter a new password">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.password">
                {{ validation.errors.password[0] }}
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
        <button class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
          <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
          <span>{{ creating ? 'Please wait...' : 'Continue'}}</span>
        </button>
      </form>
        <div v-else class="email-sent">
            <p>The password for the account <strong>{{ email }}</strong>, has been changed.</p>
            <p><span>You can now sign into your modamu account with your new password. </span><router-link :to="{ name: 'SignIn' }" >Sign in now</router-link></p>
        </div>
      <div v-if="!successful" class="flx column gap-4 ai-c acc-footer">
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
import CompletedAnime from '@/components/includes/CompletedAnime.vue';
export default {
    components: { Spinner, CompletedAnime },
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
                password: '',
                password_confirmation: '',
                token: ''
            },
            userError: {
                error: false,
                message: ''
            },
            email: '',
            creating: false,
            successful: false
        }
    },
    methods: {
        async doSubmit() {
            this.validation.error || this.userError.error ? this.clearErrs() : ''
            this.creating = true
            try {
                const res = await postApi(this.hostname + '/api/do-reset-password', this.form)
                if(res.data) {
                    this.email = res.data
                    this.successful = true
                }
                this.creating = false
            } catch (e) {
                this.creating = false
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
                if (e.response.status == 401) {
                    this.userError.error = true
                    this.userError.message = e.response.data.message
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
.anime{
    margin: 0;
}
</style>