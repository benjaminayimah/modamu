<template>
    <div class="grid table-body">
        <div class="grid-item table-head" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
            <h4 class="table-cell wrap-text wrap-line-1">Event name</h4>
            <h4 class="table-cell wrap-text wrap-line-1">Event date</h4>
            <h4 class="table-cell wrap-text wrap-line-1">Event time</h4>
            <h4 v-if="!computedDevice" class="table-cell wrap-text wrap-line-1 attendees-cell">Registered kids</h4>
        </div>
        <div v-if="!events.length" class="bg-white pd-24 br-16 centered">
            <div>There are no past events</div>
        </div>
        <event-row-2 v-for="event in computedEvents" :key="event.id" :event="event" :dashboard="dashboard" :device="computedDevice" />
        <div class="text-center gray" v-if="dashboard && events.length > 3"><router-link class="see-all" :to="{ name: 'PastEvents', params: { name: 'past-events'} }">See more</router-link></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import EventRow2 from '../includes/app/EventRow2.vue'
export default {
    components: { EventRow2 },
    name: 'TableBodyPast',
    props: ['events', 'dashboard'],
    computed: {
        ...mapState({
            device: (state) => state.device
        }),
        computedEvents() {
            if(this.dashboard == true)
            return this.events.slice(0, 3)
            else
            return this.events
        },
        computedDevice() {
            if(this.device == 'mobile')
            return true
            else
            return false
        }
    }
}
</script>

<style lang="scss" scoped>
.grid-col-notdash{
    grid-template-columns: 1.1fr .8fr 1fr 1.5fr;
}
.grid-col-dash {
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

</style>