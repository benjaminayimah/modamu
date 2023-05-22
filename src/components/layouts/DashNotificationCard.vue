<template>
    <div class="pd-20 flx-grow-1 bg-white br-24" id="dash_notification">
        <div class="mb-24 flx ai-c jc-sb">
            Notifications
            <router-link :to="{ name: 'Notification' }" class="gray fs-09 see-all wrap-text wrap-line-1">See all{{ notifications.length > computedNotiSlice ? '('+notifications.length+')' : ''  }}</router-link>
        </div>
        <div class="flx-grow-1 centered" v-if="!notifications.length">No new notification</div>
        <div v-else class="m--8">
            <notification-list class="pd-8 br-16 mb-4" v-for="notification in notifications.slice(0, computedNotiSlice)" :key="notification.id" :notification="notification" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationList from '../includes/app/NotificationList.vue'
export default {
    components: { NotificationList },
    name: 'DashNotificationCard',
    computed: {
        ...mapState({
            notifications: (state) => state.notifications,
            device: (state) => state.device,
            computedNotiSlice() {
                if(this.device == 'tablet')
                return 2
                else
                return 5
            }
        })
    }
}
</script>

<style>

</style>