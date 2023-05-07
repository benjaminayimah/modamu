<template>
    <table-body-ongoing :events="getOngoingEvents" :dashboard="true" />
</template>

<script>
import { mapGetters } from 'vuex';
import TableBodyOngoing from './TableBodyOngoing.vue';
export default {
  components: { TableBodyOngoing },
    name: 'AdminDashOngingTab',
    computed: mapGetters(['getOngoingEvents'])
}
</script>