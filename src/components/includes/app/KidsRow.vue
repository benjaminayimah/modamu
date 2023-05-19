<template>
    <router-link :to="{ name: 'Attendee', params: { id: attendee.id, name: attendee.kid_name } }" class="flx jc-sb">
        <div class="flx ai-c gap-8">
            <profile-avatar :id="attendee.user_id" :image="attendee.photo" />
            <div>
                <div>{{ attendee.kid_name }}</div>
                <span class="gray fs-09">{{ calculateAge(attendee.dob)}} years</span>
            </div>
        </div>
        <span class="flx gap-8 ai-c fs-09">
            <span>View profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                <path d="M1,1,7,7,1,13" transform="translate(0.414 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </span>
    </router-link>
</template>
<script>
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue'
export default {
  components: { ProfileAvatar },
    name: 'KidsRow',
    props: ['attendee'],
    mixins: [formatDateTime]
}
</script>
<style lang="scss" scoped>
a{
    padding: 12px 8px;
    transition: 0.3s ease background-color;
    border-radius: 8px;
    margin: 0 -8px 0 -8px;
    // border-bottom: 1px solid var(--bg-color);
    &:hover {
        background-color: #F9F9F9;
    }
}
.bg-img {
    height: 50px;
    width: 50px;
}
</style>