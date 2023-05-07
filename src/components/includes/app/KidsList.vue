<template>
    <li class="bg-white br-24">
        <router-link class="a-btn" :class="{ 'no-hover' : noClick }" :to="!noClick ? { name: 'KidsProfile', params: { id: kid.id, name:kid.name} }: ''">
            <div class="flx column ai-c gap-8">
                <profile-avatar :image="kid.photo" :id="id"/>
                <div class="flx column ai-c">
                    <div class="name text-ellipsis">{{ kid.name }}</div>
                    <div class="flx gap-4 gray age"><span>{{ computeAge(kid.dob) }}</span><span>years old</span></div>
                </div>
            </div>
        </router-link>
    </li>
</template>
<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'KidsList',
    props: ['kid', 'id', 'noClick'],
    methods: {
        computeAge(date) {
            const currentDate = new Date();
            const dob = new Date(date)
            const birthYear = dob.getFullYear();
            const birthMonth = dob.getMonth();
            const birthDay = dob.getDate();

            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();

            let age = currentYear - birthYear;

            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
                age--;
            }
            return age;
        }
    }
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
    border: 1px solid transparent;
    transition: 0.2s ease;
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
    background-color: rgba(1, 115, 255, 0.1) !important;
    border-color: var(--primary-color);
}
</style>