<template>
    <li class="bg-white br-24">
        <router-link class="a-btn" :class="{ 'no-hover' : noClick }" :to="!noClick ? { name: 'KidsProfile', params: { id: kid.id, name: kid.kid_name } }: ''">
            <div class="flx column ai-c gap-8">
                <profile-avatar :image="kid.photo" :id="kid.user_id"/>
                <div class="flx column ai-c">
                    <div class="name text-ellipsis capitalize">{{ kid.kid_name }}</div>
                    <div class="flx gap-4 gray age"><span>{{ calculateAge(kid.dob) }}</span></div>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'KidsList',
    props: ['kid', 'noClick'],
    mixins: [formatDateTime]
}
</script>
<style lang="scss" scoped>
li {
    width: 80%;
    min-width: 160px;
}
.no-hover{
    background-color: transparent !important;
    cursor: default;
    &:active {
        transform: unset;
    }
}
a:not(.no-hover) {
    &:hover {
        background-color: var(--input-hover);
    }
}
a{
    padding: 20px;
    display: block;
    border-radius: inherit;
    border: 1px solid var(--bg-color);
    transition: .06s linear !important;
}
.bg-img{
    height: 80px;
    width: 80px;
}
.age{
    margin-top: 3px;
    font-size: 0.9rem;
}
.router-link-exact-active:not(.no-hover){
    background-color: #fff !important;
    border-color: var(--primary-color);
}
</style>