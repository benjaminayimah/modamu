<template>
    <section class="section-main">
        <div class="title-row">
            <div class="flx gap-16 ai-c mb-24">
                <h1 class="title">Track events</h1>
                <span class="count-info" :class="registered_events.length ? 'count-primary' : 'count-secondary'">{{ registered_events.length }}</span>
            </div>
            <div>Events your kids are billed to attend.</div>
        </div>
        <div class="bg-white br-16 pd-32 flx column jc-c ai-c empty-state-container" v-if="!registered_events.length">
            <empty-state-lottie />
            <h1 class="mb-16">No events yet</h1>
            <div>Your booked events would appear here.</div>
        </div>
        <div v-else  class="grid col-4 gap-32">
            <registered-event-list v-for="event in registered_events" :key="event.id" :event="event" />
        </div>
    </section>
</template>

<script>
import { getApi } from '@/api';
import { mapState } from 'vuex';
import RegisteredEventList from '../../../components/includes/app/RegisteredEventList.vue';
import EmptyStateLottie from '@/components/includes/EmptyStateLottie.vue';
export default {
  components: { RegisteredEventList, EmptyStateLottie },
    name: 'RegisteredEvents',
    computed: {
        ...mapState({
            registered_events: (state) => state.registered_events,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        })
    },
    methods: {
        async fetchRegisteredEvents() {
            try {
                const res = await getApi(this.hostname+'/api/parent-fetch-registered-event?token='+this.token);
                this.$store.commit('setRegisteredEvents', res.data)
                this.$store.commit('stopLoader')
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.$store.commit('startLoader')
        this.fetchRegisteredEvents()
    }
}
</script>

<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.empty-state-container{
    height: calc(100dvh - 260px);
}
</style>