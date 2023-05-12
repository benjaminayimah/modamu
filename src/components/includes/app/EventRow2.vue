<template>
    <router-link :to="{ name: 'DetailedEvent', params: { id: event.id, name: event.name}}" class="table-row grid-item" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
        <div class="table-cell flx gap-8 ai-c">
            <profile-avatar :id="user.id" :image="computedImage.image"/>
            <span>{{ event.name }}</span>
        </div>
        <div class="table-cell flx gap-8 ai-c">{{ format_date(event.date) }}</div>
        <div class="table-cell flx gap-8 ai-c">{{ format_time(event.start_time) }}</div>
        <div class="table-cell flx jc-sb ai-c">
            <div class="relative h-100 flx ai-c">
                <span v-if="!computedAttendees.length">No Attendees yet</span>
                <profile-avatar v-else class="attendees" v-for="kid in computedAttendees.slice(0, 5)" :key="kid.id" :id="kid.user_id" :image="kid.photo" />
                <span v-if="computedAttendees.length > 5" class="counter flx">+{{ computedAttendees.length - 5 }}</span>
            </div>
            <span v-if="!dashboard" class="ft-primary pd-0-20">
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
    props: ['event', 'dashboard'],
    mixins: [ formatDateTime ],
    computed: {
        ...mapState({
            images: (state) => state.images,
            user: (state) => state.user,
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
a {
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
}
.bg-img {
    height: 40px;
    width: 40px;
}

.counter{
    background-color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 32px;
    transform: translateX(75px);
}
.attendees, .counter{
    position: absolute;
    background-color: var(--bg-color);
}
.attendees{
    width: 40px;
    border: 1px solid #fff;
    &:nth-child(2) {
        transform: translateX(15px);
    }
    &:nth-child(3) {
        transform: translateX(30px);
    }
    &:nth-child(4) {
        transform: translateX(45px);

    }
    &:nth-child(5) {
        transform: translateX(60px);
    }
}
</style>