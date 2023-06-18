<template>
    <li>
        <a @click.prevent="fetchChats" href="#" class="flx gap-8 bg-white br-16 relative" :class="{ 'new-chat' : data.unread > 0}">
            <profile-avatar :id="data.sender.id" :image="data.sender.image" />
            <div class="flx column gap-4 ms flx-grow-1">
                <div class="flx jc-sb ai-c">
                    <label class="wrap-text wrap-line-1 fw-600 fs-09 capitalize">{{ data.sender.name }}</label>
                    <span class="gray fs-08 wrap-text wrap-line-1">{{ ago_time(data.message.updated_at) }}</span>
                </div>
                <div class="flx jc-sb">
                    <span class="fs-09 wrap-text wrap-line-1 gray highlight">{{ data.message.preview }}</span>
                    <span v-if="data.unread > 0" class="count-info count-primary centered fs-08">{{ data.unread }}</span>
                </div>
            </div>
        </a>
    </li>
</template>
<script>
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    mixins: [formatDateTime],
    name: 'MessageLists',
    props: ['data'],
    methods: {
        fetchChats() {
            this.$store.dispatch('fetchChats', {id: this.data.message.id, name: this.data.sender.name, to: this.data.sender.id})
            this.$store.commit('closeMsgParentDetails')
        }
    }
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
}
a {
    padding: 10px;
    border: 1px solid transparent;
    transition: var(--input-btn-transition);
    &:hover {
        background-color: rgba(1, 115, 255, 0.1) !important;
        // background-color: rgba(224, 225, 237, 0.4);
    }
}
.new-chat {
    label, .highlight {
        color: var(--ft-dark);
    }
}
.router-link-exact-active{
    border-color: var(--primary-color);
}

</style>