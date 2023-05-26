<template>
    <div class="flx jc-c">
        <div class="main-content-card completed-card">
            <div v-if="!completed && !error" class="flx column ai-c gap-24">
                <lottie-loader />
                <div class="flx column ai-c gap-16">
                    <h3>Payment successful</h3>
                    <div class="text-center comp-text">Finalizing your booking, please wait...</div>
                </div>
            </div>
            <div v-else-if="completed">
                <completed-anime />
                <div class="flx column ai-c gap-24">
                    <h2>Successful!</h2>
                    <div class="text-center comp-text">
                        Thank you for booking this event. Monitor your response and track your kids by clicking on the 'Track event' button bellow.
                    </div>
                    <button @click="goToEvent" class="button-primary w-100">Track event</button>
                </div>
            </div>
            <div v-else-if="error" class="flx column ai-c gap-16">
                <h3 class="ft-error">An error has occured</h3>
                An unknown error has occured. Please reach out to support. Thank you.
            </div>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import LottieLoader from '@/components/includes/LottieLoader.vue'
import CompletedAnime from '@/components/includes/CompletedAnime.vue'
export default {
    components: { LottieLoader, CompletedAnime },
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
        })
    },
    data() {
        return {
            completed: false,
            error: false
        }
    },
    methods: {
        async placeBooking() {
            try {
                const res = await postApi(this.hostname + '/api/complete-booking?token='+this.token, {session_id: this.$route.params.session_id})
                console.log(res.data)
                if(res.data) {
                    this.completed = true
                }
            } catch (error) {
                console.error(error)
                this.error = true
            }
        },
        goToEvent() {
            this.$router.push({name: 'RegisteredEvents'})
        },
    },
    mounted() {
        this.placeBooking()
    }
}
</script>

<style>

</style>