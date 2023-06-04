<template>
    <section class="section-main">
        <div class="title-row">
            <h1 class="title mb-24">Verify & checkout</h1>
            <div class="flx ai-c gap-16">
                <h4>Registered kids</h4>
                <span class="count-info" :class="attendees.length ? 'count-primary' : 'count-secondary'">{{ attendees.length }}</span>
            </div>
        </div>
        <div v-if="!attendees.length" class="centered bg-white br-16 pd-32" >
            <h4 class="mb-16">No Kid is Registered</h4>
            <div>Your registered kids would appear here.</div>
        </div>
        <div v-else class="body-container">
            <div class="grid col-2 gap-70">
                <parent-checkout-list v-for="attendee in attendees" :key="attendee.id" :attendee="attendee" @check-in="checkIn" :creating="creating" />
            </div>
        </div>
    </section>
</template>
<script>
import { getApi } from '@/api';
import { mapState } from 'vuex';
import ParentCheckoutList from '@/components/includes/app/ParentCheckoutList.vue';
export default {
    components: { ParentCheckoutList },
    name: 'ParentVerifyCode',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            attendees: (state) => state.attendees
        })
    },
    data() {
        return {
            creating: ''
        }
    },
    methods: {
        async fetchAttendees() {
            try {
                const res = await getApi(this.hostname+'/api/parent-fetch-attendees?token='+this.token);
                this.$store.commit('setAttendees', res.data)
                this.$store.commit('stopLoader')
            } catch (error) {
                console.error(error);
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
            }).catch((err) => {
                console.log(err.response.data)
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

</style>