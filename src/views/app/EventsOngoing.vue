<template>
    <div class="mb-24">
        <h3 class="mb-8">Ongoing events</h3>
        <div class="gray">View and track all on going events here.</div>
    </div>
    <table-body-ongoing :events="getOngoingEvents" />
</template>
<script>
import { mapGetters } from 'vuex';
import TableBodyOngoing from '../../components/layouts/TableBodyOngoing.vue';
export default {
    components: { TableBodyOngoing },
    name: 'OngoingEvents',
    computed: {
        ...mapGetters(['getOngoingEvents'])
    }
}
</script>