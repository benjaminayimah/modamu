<template>
    <parent-dash v-if="is_parent" />
    <admins-dash v-else/>
</template>
<script>
import { defineAsyncComponent } from 'vue';
const ParentDash = defineAsyncComponent(() => import(/* webpackChunkName: Backdrop */ './parents/ParentDash.vue'));
const AdminsDash = defineAsyncComponent(() => import(/* webpackChunkName: Backdrop */ './AdminsDash.vue'));
import { mapGetters } from 'vuex';
export default {
  name: 'DashboardHome',
  components: { ParentDash, AdminsDash },
  computed: mapGetters(['is_super', 'is_parent'])
}
</script>
<style lang="scss" scoped>

</style>
