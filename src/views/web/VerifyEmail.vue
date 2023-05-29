<template>
    <section class="pd-32 flx jc-c">
        <div class="wrapper">
            <div v-if="submitting">
                <lottie-loader />
                <div>Please wait...</div>
            </div>
            <div v-else>
                <div class="invalid-credentials response-message mb-32">
                    <span>Sorry we couldn't verify your email with the submitted credentials. Click the button below to try again. If the issue persists, please contact support.</span>
                </div>
                <button class="button-primary w-100">Try again</button>
            </div>
        </div>
    </section>
</template>

<script>
import LottieLoader from '@/components/includes/LottieLoader.vue'
export default {
  components: { LottieLoader },
    name: 'VerifyEmail',
    data () {
        return {
            response: { status: '', message: ''},
            submitting: false
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    max-width: 500px;
}
</style>