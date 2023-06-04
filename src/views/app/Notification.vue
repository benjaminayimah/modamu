<template>
    <section class="section-main">
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Notifications</h1>
                <span class="count-info count-secondary">{{ notifications.length }}</span>
            </div>
        </div>
        <div v-if="!notifications.length" class="bg-white mt-24 pd-24 br-16 centered">
            No Notifications
        </div>
        <div class="flx gap-24 column">
            <notification-list class="br-24" v-for="notification in notifications" :key="notification.id" :notification="notification" />
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import NotificationList from '../../components/includes/app/NotificationList.vue';
export default {
  components: { NotificationList },
  name: 'NotificationPage',
  computed: mapState({
    notifications: (state) => state.notifications
  }),
  mounted() {
    this.$store.dispatch('fetchNotifications', 1)
  }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
</style>