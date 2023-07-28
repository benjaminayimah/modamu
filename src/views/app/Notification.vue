<template>
    <section class="section-main" v-if="!is_admin">
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Notifications</h1>
                <span class="count-info count-secondary">{{ notifications.length }}</span>
            </div>
        </div>
        <div v-if="!notifications.length" class="bg-white br-16 pd-32 flx column jc-c ai-c empty-state-container">
            <empty-state-lottie />
            <h1 class="mb-16">No Notifications</h1>
            <div class="gray">All your notifications will appear here.</div>
        </div>
        <div class="flx gap-24 column">
            <notification-list class="br-24" v-for="notification in notifications" :key="notification.id" :notification="notification" />
        </div>
    </section>
</template>
<script>
import usersLevelMixin from '@/mixins/usersLevelMixin';
import EmptyStateLottie from '@/components/includes/EmptyStateLottie.vue';
import { mapState } from 'vuex';
import NotificationList from '../../components/includes/app/NotificationList.vue';
export default {
  components: { NotificationList, EmptyStateLottie },
  name: 'NotificationPage',
  mixins: [usersLevelMixin],
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
.empty-state-container{
    height: calc(100dvh - 220px);
}
</style>