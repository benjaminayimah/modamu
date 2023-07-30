<template>
    <parent-dash v-if="is_parent" />
    <admins-dash v-else/>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import ParentDash from './parents/ParentDash.vue'
const AdminsDash = defineAsyncComponent(() => import(/* webpackChunkName: AdminsDash */ './AdminsDash.vue'));
import { mapGetters } from 'vuex';
export default {
  name: 'DashboardHome',
  components: { ParentDash, AdminsDash },
  computed: mapGetters(['is_parent']),
  mounted() {
    this.$store.commit('startLoader')
    this.$store.dispatch('fetchMessages')
    this.$store.dispatch('fetchNotifications', 0)
  }
}
</script>
<style lang="scss" scoped>

</style>
