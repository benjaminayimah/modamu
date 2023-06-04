<template>
    <router-link :to="{ name: 'Notification' }" class="flx column gap-8 bg-white" :class="{ 'no-hover' : !dashboard }">
        <div class="flx gap-16">
            <span v-if="!notification.read" class="relative flx ai-c"></span>
            <div :class="dashboard ? 'wrap-text wrap-line-2' : ''">
                {{ notification.content }}
            </div>
        </div>
        <div v-if="!dashboard" class="flx jc-sb ai-c">
            <span class="fs-09 gray">{{ ago_time(notification.created_at) }}</span>
            <button @click="$store.dispatch('deleteThisNotification', notification.id)" class="btn-sm">Delete</button>
        </div>
    </router-link>
</template>
<script>
import formatDateTime from '@/mixins/formatDateTime';
export default {
    name: 'NotificationList',
    props: ['notification', 'dashboard'],
    mixins: [formatDateTime]
}
</script>
<style lang="scss" scoped>
.no-hover{
    background-color: transparent;
    cursor: default;
    &:active {
        transform: unset;
    }
}
a:not(.no-hover) {
    transition: var(--input-btn-transition);
    &:hover {
        background-color: rgba(1, 115, 255, 0.08);
    }
}
a{
    padding: 32px;
    max-width: 500px;
    transition: var(--input-btn-transition);
    span {
        &::before {
            content: '';
            height: 10px;
            width: 10px;
            border-radius: 5px;
        }
    }
}

.grid {
    grid-template-columns: 0.5fr 5fr;
}

span {
        color: var(--ft-dark);
        &::before {
            content: '';
            background-color: var(--primary-color);
        }
    }
</style>