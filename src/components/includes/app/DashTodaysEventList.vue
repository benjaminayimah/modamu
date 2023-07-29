<template>
    <router-link :to="{ name: 'DetailedEvent',  params: {id: event.id, name: event.event_name }}" class="bg-white ai-c br-16 pd-8 flx jc-sb">
        <div class="flx gap-8">
            <profile-avatar :id="event.user_id" :image="computedImage.image" />
            <div class="flx column jc-c gap-4">
                <h5 class="wrap-text wrap-line-1">{{ event.event_name }}</h5>
                <div class="gray fs-08 wrap-text wrap-line-1">{{ event.name  }}</div>
            </div>
        </div>
        <div></div>
        <div class="count-info fs-08 centered fw-700 text-ellipsis capitalize" :class="computeStatus">{{ computeStatus }}</div>
    </router-link>
</template>

<script>
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'DashTodaysEventList',
    props: ['event'],
    computed: {
        ...mapState({
            images: (state) => state.images,
        }),
        computedImage() {
            return this.images.find(image => image.event_id == this.event.id) || null
        },
        computeStatus() {
            const currentDateTime = new Date()
            const startDate = new Date(this.event.date+'T'+this.event.start_time)
            const endDate = new Date(this.event.date+'T'+this.event.end_time)
            if (currentDateTime > startDate &&  currentDateTime < endDate)
            return 'ongoing'
            else if (currentDateTime < startDate)
            return 'upcoming'
            else
            return 'past'
        }
    }
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