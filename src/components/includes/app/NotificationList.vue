<template>
    <a href="#" class="grid gap-8 bg-white" :class="notification.read ? 'read' : 'not-read'">
        <span class="relative flx ai-c"></span>
        <div class="wrap-text wrap-line-2">
            Your children have been accepted and taking off the waiting lists domamu vehicle has been sent to pick them up.
        </div>
    </a>
</template>
<script>
export default {
    name: 'NotificationList',
    props: ['notification']
}
</script>
<style lang="scss" scoped>
a{
    padding: 32px;
    max-width: 500px;
    transition: 0.2s ease;
    span {
        &::before {
            content: '';
            height: 10px;
            width: 10px;
            border-radius: 5px;
        }
    }
    &:hover {
        background-color: rgba(1, 115, 255, 0.1);
    }
}

.grid {
    grid-template-columns: 0.5fr 5fr;
}

.read{
    span {
        color: #999999;
        &::before {
            content: '';
            background-color: #E0E0E0;
        }
    }
}
.not-read {
    span {
        color: var(--ft-dark);
        &::before {
            content: '';
            background-color: var(--primary-color);
        }
    }
}
</style>