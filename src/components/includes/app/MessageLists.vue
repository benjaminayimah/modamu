<template>
    <li>
        <router-link :to="{ name: 'MessageDetail', params: { id: message.id, name: message.name}}" href="" class="flx gap-8 bg-white br-16 row-hover ">
            <profile-avatar :id="null" :image="null" />
            <div class="flx column gap-8 ms">
                <label class="wrap-text wrap-line-1">{{ message.name }}</label>
                <span class="fs-09 wrap-text wrap-line-1 gray">Hi there , i would love to enquire about</span>
            </div>
            <div class="flx column gap-4 ai-fe jc-c">
                <span class="gray fs-08">02:40pm</span>
                <span class="count-info count-primary centered fs-08">20</span>
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
.count-info{
    height: 28px;
    width: 28px;
    padding: 0;
}
a {
    padding: 10px;
    border: 1px solid transparent;
    transition: var(--input-btn-transition);
}
.ms {
    width: calc(100% - 122px);
}
.router-link-exact-active{
    background-color: rgba(1, 115, 255, 0.1);
    border-color: var(--primary-color);
}

</style>