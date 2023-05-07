<template>
    <parent-dash v-if="is_parent" />
    <admins-dash v-else/>
</template>
<script>
import ParentDash from './parents/ParentDash.vue'
import { mapGetters } from 'vuex';
import AdminsDash from './AdminsDash.vue';
export default {
  name: 'DashboardHome',
  components: { ParentDash, AdminsDash },
  computed: mapGetters(['is_super', 'is_parent'])
}
</script>
<style lang="scss" scoped>

</style>
