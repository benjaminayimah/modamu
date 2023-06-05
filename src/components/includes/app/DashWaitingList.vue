<template>
    <router-link :to="{ name: 'WaitList' }" class="bg-white ai-c br-16 pd-8 flx jc-sb">
        <div class="flx gap-8">
            <profile-avatar :id="waitinglist.user_id" :image="waitinglist.photo" />
            <div class="flx column jc-c gap-4">
                <h5 class="wrap-text wrap-line-1">{{ waitinglist.kid_name }}</h5>
                <div class="gray fs-08 wrap-text wrap-line-1">{{ calculateAge(waitinglist.dob) }} years</div>
            </div>
        </div>
        <div></div>
        <div class="gender-pill capitalize" :data-type="waitinglist.gender">{{ waitinglist.gender }}</div>
    </router-link>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
import formatDateTime from '@/mixins/formatDateTime'
export default {
    components: { ProfileAvatar },
    name: 'DashWaitingtList',
    props: ['waitinglist'],
    mixins: [formatDateTime]
   
}
</script>

<style lang="scss" scoped>
.bg-img {
    height: 48px;
    width: 48px;
}
h5 {
    margin: 0;
}
.count-info{
    height: 32px;
}
a {
    transition: var(--input-btn-transition);
    &:hover {
        background-color: var(--input-hover);

    }
}
</style>