<template>
    <table-body-past :events="getPastEvents" :dashboard="true" />
</template>

<script>
import { mapGetters } from 'vuex';
import TableBodyPast from './TableBodyPast.vue';
export default {
  components: { TableBodyPast },
    name: 'AdminDashPastTab',
    computed: mapGetters(['getPastEvents'])
}
</script>
