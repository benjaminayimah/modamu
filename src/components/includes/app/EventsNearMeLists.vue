<template>
        <div class="grid-item-outline br-24 bg-white">
            <div class="flx jc-sb mb-16">
                <div>
                    <div class="name mb-4"><strong>{{ event.event.name }}</strong></div>
                    <div class="address">{{ event.event.address }}</div>
                </div>
                <button @click.prevent="goToEvent" class="button-primary">View details</button>
            </div>
            <div class="mb-16">
                {{ event.event.description }}
            </div>
            <div class="bg-img relative br-16 mb-16" :style="computedImage ? { backgroundImage: 'url('+hostname+'/storage/'+event.event.user_id+'/'+computedImage.image+')'} : ''">
                <span class="status-pill br-32 capitalize" :class="computedStatus">{{ computedStatus }}</span>
            </div>
            <div class="flx jc-sb">
                <div class="flx ai-c gap-4">
                    <i class="br-50"></i>
                    <span class="text-ellipsis">{{ format_distance(event.distance) }}</span>
                    away
                </div>
                <!-- <div class="relative stack-row flx w-100">
                    <profile-avatar class="attendees" v-for="kid in kids.slice(0, 3)" :key="kid.id" :image="kid.photo" :id="user.id"/>
                    <div class="counter bg-white flx ai-c text-ellipsis" v-if="kids.length > 3">+{{ kids.length - 3 }} In attendance</div>
                </div> -->
            </div>
        </div>
</template>
<script>
import { mapState } from 'vuex';
import formatDateTime from '../../../mixins/formatDateTime';
// import ProfileAvatar from './ProfileAvatar.vue';
export default {
//   components: { ProfileAvatar },
    name: 'EventsNearMeList',
    mixins: [formatDateTime],
    props: ['event', 'images'],
    computed: {
        ...mapState({
            kids: (state) => state.kids,
            user: (state) => state.user,
            hostname: (state) => state.hostname,
        }),
        computedImage() {
            const image = this.images.find(image => image.event_id == this.event.event.id) || false
            return image
        },
        computedStatus() {
            const currentDateTime = new Date()
            const startDate = new Date(this.event.event.date+'T'+this.event.event.start_time)
            const endDate = new Date(this.event.event.date+'T'+this.event.event.end_time)
            if(currentDateTime > startDate && currentDateTime < endDate)
            return 'ongoing'
            else if(currentDateTime < startDate)
            return 'upcoming'
            return 'past'
        }
    },
    methods: {
        goToEvent() {
            this.$router.push({ name: 'DetailedEvent',  params: {id: this.event.event.id, name: this.event.event.name }})
        }
    }
}
</script>
<style lang="scss" scoped>
$height: 30px;
button.button-primary{
    height: 40px;
    padding: 4px 12px;
    border-radius: 12px;
}
.bg-img{
    height: 160px;
}
i{
    height: 8px;
    width: 8px;
    background-color: var(--success);
}
.stack-row{
    height: $height;
}
.attendees{
        height: $height;
        width: $height;
        position: absolute;
        border: 2px solid #fff;
    }
.attendees{
    &:nth-child(1) {
        background-color: #de1a1a;
        transform: translateX(10px);
    }
    &:nth-child(2) {
        background-color: #1c1fe2;
        transform: translateX(20px);
    }
    &:nth-child(3) {
        background-color: #cc0fe0;
        transform: translateX(30px);

    }
}
.counter {
    height: $height;
    padding: 4px 0 4px 8px;
    transform: translateX(40px);
    border-radius: 20px;
}
.status-pill{
    padding: 8px 14px;
    color: #fff;
    position: absolute;
    left: 10px;
    bottom: 10px;
}
.ongoing {
    background-color: #09cc1d;
}
.upcoming {
    background-color: #0a8f17;
}
.past {
    background-color: var(--warning);
}
</style>