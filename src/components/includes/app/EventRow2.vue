<template>
    <router-link :to="{ name: 'DetailedEvent', params: { id: event.id, name: event.event_name}}" class="table-row grid-item row-hover " :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
        <div class="table-cell flx gap-8 ai-c">
            <profile-avatar :id="event.user_id" :image="computedImage.image"/>
            <span class="wrap-text wrap-line-1">{{ event.event_name }}</span>
        </div>
        <div class="table-cell flx gap-8 ai-c">
            <div class="wrap-text wrap-line-1">{{ format_date(event.date) }}</div>
        </div>
        <div class="table-cell flx gap-8 ai-c">
            <div class="wrap-text wrap-line-1">{{ event.start_time }}</div>
        </div>
        <div class="table-cell flx jc-sb ai-c attendees-cell" v-if="!device">
            <div class="h-100 flx ai-c stack-cards">
                <span class="wrap-text wrap-line-1" v-if="!computedAttendees.length">No Attendees</span>
                <profile-avatar v-else v-for="kid in computedAttendees.slice(0, 5)" :key="kid.id" :id="kid.user_id" :image="kid.photo" />
                <span v-if="computedAttendees.length > 5" class="counter centered bg-img">+{{ computedAttendees.length - 5 }}</span>
            </div>
            <span v-if="!dashboard" class="ft-primary pd-0-20 see-details">
                See details
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 6.01 10.592">
                    <path d="M1.533.715,5.819,5,1.533,9.286" transform="translate(-0.523 0.295)" fill="none" stroke="#87a5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.429"/>
                </svg>
            </span>
        </div>
    </router-link>
</template>
<script>
import formatDateTime from '../../../mixins/formatDateTime';
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
  components: { ProfileAvatar },
    name: 'EventRow2',
    props: ['event', 'dashboard', 'device'],
    mixins: [ formatDateTime ],
    computed: {
        ...mapState({
            images: (state) => state.images,
            attendees: (state) => state.attendees,
            computedImage() {
                return this.images.filter(data => data.event_id == this.event.id)[0]
            },
            computedAttendees() {
                return this.attendees.filter(data => data.event_id == this.event.id)
            },
        })
    },
    methods: {
        duration(start, end) {
            const time1 = new Date(start).toLocaleTimeString();
            const time2 = new Date(end).toLocaleTimeString(); // or any other time string
            const time1InMillis = new Date(`2000-01-01T${time1}`).getTime();
            const time2InMillis = new Date(`2000-01-01T${time2}`).getTime();
            const diffInMillis = Math.abs(time1InMillis - time2InMillis);
            const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
            return diffInHours
        }
    }
}
</script>
<style lang="scss" scoped>
.bg-img {
    height: 40px;
    width: 40px;
    border: 1px solid #fff;

}
a{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .see-details{
        display: none
    }

}
</style>