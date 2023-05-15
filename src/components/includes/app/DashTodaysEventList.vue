<template>
    <router-link :to="{ name: 'DetailedEvent',  params: {id: event.event.id, name: event.event.name }}" class="bg-white ai-c br-16 pd-8 flx jc-sb">
        <div class="flx gap-8">
            <profile-avatar :id="event.event.user_id" :image="computedImage.image" />
            <div class="flx column jc-c gap-4">
                <h5 class="wrap-text wrap-line-1">{{ event.event.name }}</h5>
                <div class="gray fs-08 wrap-text wrap-line-1">{{ event.village  }}</div>
            </div>
        </div>
        <div></div>
        <div class="count-info fs-08 centered fw-700 text-ellipsis">In progress</div>
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
            return this.images.find(image => image.event_id == this.event.event.id) || null
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
    background-color: rgba($color: #59E9AD, $alpha: .3);
    height: 32px;
}
a {
    transition: var(--input-btn-transition);
    &:hover {
        background-color: var(--input-hover);

    }
}
</style>