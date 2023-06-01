<template>
    <section class="pd-32 flx jc-c">
        <div class="wrapper">
            <div v-if="submitting">
                <lottie-loader />
                <div>Please wait...</div>
            </div>
            <div v-else>
                <div class="response-message mb-32" :class="response.status =='success' ? 'success-response' : 'invalid-credentials'">
                    <span>{{ response.message }}</span>
                </div>
                <button v-if="response.status =='success'" @click="$router.push({name: 'AdminDashboard'})" class="button-primary w-100 gap-8 btn-lg">Proceed to dashboard</button>
                <button v-else @click="verifyAccount" class="button-primary w-100 btn-lg">Try again</button>
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
    name: 'VerifyAccount',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data () {
        return {
            response: { status: '', message: ''},
            submitting: false
        }
    },
    methods: {
        async verifyAccount() {
            this.submitting = true
            try {
                const res = await postApi(this.hostname + '/api/verify-user-account', {token: this.$route.params.token})
                if(res.data) {
                    this.results(res.data)
                }
            } catch (err) {
                this.results(err.response.data)
            }
        },
        results(data) {
            console.log(data)
            this.response.status = data.status
            this.response.message = data.msg
            this.submitting = false
        }
    },
    mounted() {
        this.verifyAccount()
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    max-width: 500px;
}
</style>