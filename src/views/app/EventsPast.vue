<template>
    <div class="mb-24">
        <h3 class="mb-8">Past events</h3>
        <div class="gray">View and track all past events here.</div>
    </div>
    <table-body-past :events="getPastEvents" />
</template>
<script>
import { mapGetters } from 'vuex';
import TableBodyPast from '../../components/layouts/TableBodyPast.vue';
export default {
  components: { TableBodyPast },
    name: 'PastEvents',
    computed: {
        ...mapGetters(['getPastEvents'])
    }
}
</script>
