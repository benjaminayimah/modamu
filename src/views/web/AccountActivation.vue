<template>
    <section class="wc-section">
        <div v-if="sending" class="text-center">
            <lottie-loader />
            <div class="mt-24">Please wait...</div>
        </div>
        <div v-if="successful">
            <div class="mb-32 success-response response-message">
                Your account has been verified successfully.
            </div>
            <p>
                <button @click="$router.push({name: 'AdminDashboard'})" class="button-primary w-100 gap-8 btn-lg">Proceed to dashboard</button>
            </p>
        </div>
        <div v-else>
            <div v-if="!sending">
                <div class="invalid-credentials response-message mb-32">
                    <span>There was an error during verification. Try again by clicking the button below.</span>
                </div>
                <button @click="verifyAccount" class="button-primary w-100 gap-8 btn-lg">Verify account</button>
            </div>
        </div>
    </section>
</template>

<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import LottieLoader from '@/components/includes/LottieLoader.vue'
export default {
    components: { LottieLoader },
    name: 'AccountActivation',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            successful: false,
            error: false,
            sending: true
        }
    },
    methods: {
        async verifyAccount() {
            this.sending = true
            try {
                const res = await postApi(this.hostname + '/api/verify-account', {token: this.$route.params.token})
                if(res.data) {
                    this.sending = false
                    this.successful = true
                }
            } catch (error) {
                console.error(error)
                this.error = true
                this.sending = false
            }
        }
    },
    mounted() {
        this.verifyAccount()
    }
}
</script>

<style lang="scss" scoped>

</style>