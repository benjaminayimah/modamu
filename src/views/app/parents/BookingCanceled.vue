<template>
    <div class="flx jc-c">
        <div class="main-content-card completed-card flx column ai-c gap-32">
            <payment-canceled-anime />
            <div class="flx column ai-c gap-24">
                <h2>Payment is canceled</h2>
                <div class="text-center comp-text">
                    Your payment was canceled and your event has not been booked.
                </div>
                <router-link to="/" class="button-primary w-100 a-button a-btn btn-lg">Go home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api';
import { mapState } from 'vuex';
import PaymentCanceledAnime from '@/components/includes/PaymentCanceledAnime.vue'

export default {
    name: 'BookingCanceld',
    components: { PaymentCanceledAnime },
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    methods: {
        async cancelBooking() {
            try {
                await postApi(this.hostname + '/api/cancel-booking?token='+this.token, {session_id: this.$route.params.session_id})
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }

        }
    },
    mounted() {
        this.cancelBooking()
    }
}
</script>

<style lang="scss" scoped>
.lottie-animation-container{
    margin-bottom: -32px;
}
</style>