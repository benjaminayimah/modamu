<template>
<div class="grid table-body">
    <div class="grid-item table-head" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
        <h4 class="table-cell wrap-text wrap-line-1">Event name</h4>
        <h4 class="table-cell wrap-text wrap-line-1">Duration</h4>
        <h4 class="table-cell wrap-text wrap-line-1">Kids in attendance</h4>
    </div>
    <div v-if="!events.length" class="bg-white pd-24 br-16 centered">
        <div>There are no ongoing events</div>
    </div>
    <event-row v-for="event in computedEvents" :key="event.id" :event="event" :dashboard="dashboard"/>
    <div class="text-center gray" v-if="dashboard && events.length > 3"><router-link class="see-all" :to="{ name: 'OngoingEvents', params: { name: 'ongoing-events'} }">See more</router-link></div>
</div>
</template>
<script>
import EventRow from '../includes/app/EventRow.vue'
export default {
    components: { EventRow },
    name: 'TableBodyOngoing',
    props: ['events', 'dashboard'],
    computed: {
        computedEvents() {
            if(this.dashboard)
            return this.events.slice(0, 3)
            else
            return this.events
        }
    }
}
</script>

<style lang="scss" scoped>
.grid-col-notdash{
    grid-template-columns: 1.1fr .8fr 1.5fr;
}
.grid-col-dash {
    grid-template-columns: 1fr 1fr 1fr;
}
</style>