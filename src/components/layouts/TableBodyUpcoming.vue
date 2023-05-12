<template>
<div class="grid table-body">
        <div class="grid-item table-head" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
            <h4 class="table-cell">Event name</h4>
            <h4 class="table-cell">Event date</h4>
            <h4 class="table-cell">Event time</h4>
            <h4 class="table-cell">Registered kids</h4>
        </div>
        <div v-if="!events.length" class="bg-white pd-24 br-16 centered">
            <div>There are no upcominng events</div>
        </div>
        <event-row-2 v-for="event in events" :key="event.id" :event="event" :dashboard="dashboard" />
    </div>
</template>

<script>
import EventRow2 from '../includes/app/EventRow2.vue'
export default {
    components: { EventRow2 },
    name: 'TableBodyUpcoming',
    props: ['events', 'dashboard']
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