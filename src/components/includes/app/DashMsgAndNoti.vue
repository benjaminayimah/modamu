<template>
    <div class="grid col-2 gap-32">
        <div class="pd-20 bg-white br-24">
            <div class="mb-24 flx ai-c jc-sb">
                Messages
                <a href="" class="gray fs-09 see-all">See all (10)</a>
            </div>
            <div class="m--10">
                <message-lists class="mb-8" v-for="message in messages.slice(0, computedMsgSlice)" :key="message.id" :message="message"/>
            </div>
        </div>
        <div class="pd-20 bg-white br-24">
            <div class="mb-24 flx ai-c jc-sb">
                Notifications
                <a class="gray fs-09 see-all">See all (10)</a>
            </div>
            <div class="m--8">
                <notification-list class="pd-8 br-16 mb-4" v-for="notification in notifications.slice(0, computedNotiSlice)" :key="notification.id" :notification="notification" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import MessageLists from './MessageLists.vue'
import NotificationList from './NotificationList.vue'
export default {
    components: { MessageLists, NotificationList },
    name: 'DashMessageAndNotifications',
    computed: {
        ...mapState({
            messages: (state) => state.messages,
            notifications: (state) => state.notifications,
            device: (state) => state.device,
            computedMsgSlice() {
                if(this.device == 'tablet')
                return 2
                else
                return 4
            },
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
<style lang="scss" scoped>
.tablet {
    .mb-8, .mb-4{
        margin-bottom: 0;
    }
    .col-2{
        grid-template-columns: 1fr;
    }
}
</style>