<template>
<div class="grid table-body">
        <div class="grid-item table-head" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
            <h4 class="table-cell">Event name</h4>
            <h4 class="table-cell">Duration</h4>
            <h4 class="table-cell">Kids in attendance</h4>
        </div>
        <div v-if="!events.length">
            <div class="flx column ai-c gap-24">
                <h4>There are no ongoing events</h4>
            </div>
        </div>
        <event-row v-for="event in events" :key="event.id" :event="event" :dashboard="dashboard"/>
    </div>
</template>
<script>
import EventRow from '../includes/app/EventRow.vue'
export default {
  components: { EventRow },
    name: 'TableBodyOngoing',
    props: ['events', 'dashboard']
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