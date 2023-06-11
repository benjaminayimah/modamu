<template>
    <div class="flx-grow-1 bg-dark pd-20 br-24 flx column gap-8 ft-white">
        <div class="fw-700 w-90">{{ data.title }}</div>
        <div class="fs-08 flx jc-sb ai-c">
            <span>{{ computedStats }} from last week</span>
            <i v-if="computedStats == 'Up'" class="status-indicator status-increase centered br-50 flx-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 9.265 13.299">
                    <path d="M1.389,4.834,5,1.223m0,0V12.778M5,1.223,8.611,4.834" transform="translate(-0.367 -0.201)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.444"/>
                </svg>
            </i>
            <i v-else class="status-indicator status-decrease centered br-50 flx-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 9.265 13.299">
                    <path d="M1.389,4.834,5,1.223m0,0V12.778M5,1.223,8.611,4.834" transform="translate(9.632 13.5) rotate(180)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.444"/>
                </svg>
            </i>
        </div>
        <div class="empty-card fw-700 fs-2r" v-if="!data.array.length">
            <span>0</span>
        </div>
        <div v-else class="stack-cards">
            <profile-avatar v-for="item in data.array.slice(0, 3)" :key="item.id" :id="data.parent ? item.id : item.user_id" :image="data.parent ? item.image : item.photo" />
            <div v-if="data.array.length > 3" class="fw-700 bg-img counter centered br-24">+{{ data.array.length - 3 }}</div>
        </div>
    </div>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'StatusCardType1',
    props: ['data'],
    computed: {
        computedStats() {
            if(this.data.array.length)
            return 'Up'
            else
            return 'Down'
        }
    }
}
</script>

<style lang="scss" scoped>
.stack-cards {
    --height: 48px;
    height: var(--height);
    .bg-img{
        height: var(--height);
        width: var(--height);
        border: 2px solid var(--bg-dark);
    }
    .counter{
        background-color: var(--bg-dark);
    }
}
</style>