<template>
    <div class="grid col-2 gap-32">
        <dash-message-card />
        <dash-notification-card />
    </div>
</template>
<script>
import DashMessageCard from './DashMessageCard.vue';
import DashNotificationCard from './DashNotificationCard.vue';
export default {
    components: { DashNotificationCard, DashMessageCard },
    name: 'DashMessageAndNotifications',
    
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