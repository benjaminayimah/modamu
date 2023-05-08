<template>
    <section>
        <div class="title-row">
            <div class="flx gap-16 ai-c mb-24">
                <h1 class="title">Track events</h1>
                <span class="count-info count-secondary">{{ registered_events.length }}</span>
            </div>
            <div>Events your kids are billed to attend.</div>
        </div>
        <div class="grid col-4 gap-32">
            <registered-event-list v-for="event in registered_events" :key="event.id" :event="event" />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import RegisteredEventList from '../../../components/includes/app/RegisteredEventList.vue';
export default {
  components: { RegisteredEventList },
    name: 'RegisteredEvents',
    computed: {
        ...mapState({
            registered_events: (state) => state.registered_events,
            // token: (state) => state.token,
            // hostname: (state) => state.hostname
        })
    }
}
</script>

<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
</style>