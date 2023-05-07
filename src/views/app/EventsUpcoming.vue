<template>
    <div class="mb-24">
        <h3 class="mb-8">Upcoming events</h3>
        <div class="gray">View and track all upcoming events here.</div>
    </div>
    <table-body-upcoming :events="getUpcomingEvents" />
</template>
<script>
import { mapGetters } from 'vuex';
import TableBodyUpcoming from '../../components/layouts/TableBodyUpcoming.vue';
export default {
    components: { TableBodyUpcoming },
    name: 'UpcomingEvents',
    computed: {
        ...mapGetters(['getUpcomingEvents'])
    }
}
</script>