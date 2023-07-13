<template>
    <section class="section-main">
        <div class="title-row">
            <h1 class="title mb-24">Verify & checkout</h1>
            <div class="flx ai-c gap-16">
                <h4>Registered kids</h4>
                <span class="count-info" :class="computedAttendees.length ? 'count-primary' : 'count-secondary'">{{ computedAttendees.length }}</span>
            </div>
        </div>
        <div v-if="!computedAttendees.length" class="bg-white br-16 pd-32 flx column jc-c ai-c empty-state-container">
            <empty-state-lottie />
            <h1 class="mb-16">You have no child in any event</h1>
            <div class="mb-8 gray">All kids that are registered for an active event would show up here.</div>
            <a href="#" @click.prevent="$store.commit('goToEvents')" class="getting-started flx ai-c gap-8 fw-600">Explore nearby events</a>
        </div>
        <div v-else class="body-container">
            <div class="grid col-2 gap-70">
                <parent-checkout-list v-for="attendee in computedAttendees" :key="attendee.id" :attendee="attendee" @check-in="checkIn" :creating="creating" />
            </div>
        </div>
    </section>
</template>
<script>
import { getApi } from '@/api';
import { mapState } from 'vuex';
import ParentCheckoutList from '@/components/includes/app/ParentCheckoutList.vue';
import EmptyStateLottie from '@/components/includes/EmptyStateLottie.vue';
export default {
    components: { ParentCheckoutList, EmptyStateLottie },
    name: 'ParentVerifyCode',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            attendees: (state) => state.attendees
        }),
        computedAttendees() {
            return this.attendees.filter(item => item.status != '3')
        }
    },
    data() {
        return {
            creating: '',
        }
    },
    methods: {
        async fetchAttendees() {
            try {
                const res = await getApi(this.hostname+'/api/parent-fetch-attendees?token='+this.token)
                this.$store.commit('setAttendees', res.data)
                this.$store.commit('stopLoader')
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        checkIn(payload) {
            this.creating = payload
            this.$store.dispatch('checkInAttendee', payload)
            .then((res) => {
                this.creating = ''
                if(res.data) {
                    this.$store.commit('updateAttendees', res.data)
                }
            }).catch((e) => {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            })
        }
    },
    mounted() {
        this.$store.commit('startLoader')
        this.fetchAttendees()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.body-container{
    width: 600px;
}
.empty-state-container{
    height: calc(100dvh - 275px);
}
</style>