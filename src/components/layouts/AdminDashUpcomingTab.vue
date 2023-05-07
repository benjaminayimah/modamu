<template>
    <table-body-upcoming :events="getUpcomingEvents" :dashboard="true" />
</template>

<script>
import { mapGetters } from 'vuex';
import TableBodyUpcoming from './TableBodyUpcoming.vue';
export default {
  components: { TableBodyUpcoming },
    name: 'AdminDashUpcomingTab',
    computed: mapGetters(['getUpcomingEvents'])
}
</script>