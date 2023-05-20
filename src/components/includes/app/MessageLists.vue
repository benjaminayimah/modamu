<template>
    <li>
        <router-link :to="{ name: 'MessageDetail', params: { id: message.id, name: message.name }}" href="" class="flx gap-8 bg-white br-16 relative" :class="{ 'new-chat' : message.unread_count > 0}">
            <profile-avatar :id="null" :image="null" />
            <div class="flx column gap-8 ms flx-grow-1">
                <div class="flx jc-sb">
                    <label class="wrap-text wrap-line-1">{{ message.name }}</label>
                    <span class="gray fs-08">{{ message.updated_at }}</span>
                </div>
                <div class="flx jc-sb">
                    <span class="fs-09 wrap-text wrap-line-1 gray highlight">{{ message.preview }}</span>
                    <span v-if="message.unread_count > 0" class="count-info count-primary centered fs-08">{{ message.unread_count }}</span>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
  components: { ProfileAvatar },
    name: 'MessageLists',
    props: ['message']
}
</script>
<style lang="scss" scoped>

.bg-img {
    height: 48px;
    width: 48px;
}
.highlight{
    flex: 1 1;
}
.count-info{
    height: 19px;
    width: 28px;
    padding: 0;
    margin-top: -4px;
}
a {
    padding: 10px;
    border: 1px solid transparent;
    transition: var(--input-btn-transition);
    &:hover {
        background-color: rgba(224, 225, 237, 0.4);
    }
}
.new-chat {
    background-color: rgba(1, 115, 255, 0.1) !important;
    label, .highlight {
        color: var(--ft-dark);
    }
}
.router-link-exact-active{
    border-color: var(--primary-color);
}

</style>