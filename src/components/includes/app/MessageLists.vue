<template>
    <li>
        <router-link :to="{ name: 'MessageDetail', params: { id: message.id, name: message.name}}" href="" class="flx gap-8 bg-white br-16 row-hover relative">
            <profile-avatar :id="null" :image="null" />
            <div class="flx column gap-8 ms">
                <div class="flx jc-sb">
                    <label class="wrap-text wrap-line-1">{{ message.name }}</label>
                    <span class="gray fs-08">02:40pm</span>
                </div>
                <div class="flx jc-sb">
                    <span class="fs-09 wrap-text wrap-line-1 gray highlight">Hi there, i would love to enquire about i would love to enquire about</span>
                    <span class="count-info count-primary centered fs-08">20</span>
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
}
.router-link-exact-active{
    background-color: rgba(1, 115, 255, 0.1);
    border-color: var(--primary-color);
}

</style>