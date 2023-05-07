<template>
    <router-link :to="{ name: 'DetailedEvent', params: { id: event.id, name: event.name}}" class="table-row grid-item" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
        <div class="table-cell flx gap-8 ai-c">
            <profile-avatar :id="user.id" :image="computedImage.image"/>
            <span>{{ event.name }}</span>
        </div>
        <div class="table-cell flx gap-8 ai-c"><span>{{ duration(event.start_time, event.end_time) }}</span><span>hours</span></div>
        <div class="table-cell flx jc-sb ai-c">
            <div class="relative h-100">
                <span v-if="!computedAttendees.length">No Attendees yet</span>
                <div v-for="kid in computedAttendees.slice(0, 5)" :key="kid.id" class="bg-img attendees br-50"></div>
                <span v-if="computedAttendees.length > 5" class="counter flx">+{{ computedAttendees.length - 5 }}</span>
            </div>
            <span v-if="!dashboard" class="ft-primary pd-0-20">
                See details
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 5.715 10">
                    <path d="M1.533,10a.715.715,0,0,1-.505-1.22L4.808,5,1.028,1.22A.715.715,0,1,1,2.038.21L6.324,4.495a.715.715,0,0,1,0,1.011L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.818 0)" fill="#87a5ff"/>
                </svg>
            </span>
        </div>
    </router-link>
</template>
<script>
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
    components: { ProfileAvatar },
    name: 'EventRow',
    props: ['event', 'dashboard'],
    computed: {
        ...mapState({
            images: (state) => state.images,
            user: (state) => state.user,
            attendees: (state) => state.attendees,
            computedImage() {
                return this.images.length ? this.images.filter(data => data.event_id == this.event.id)[0] : ''
            },
            computedAttendees() {
                return this.attendees.length ? this.attendees.filter(data => data.event_id == this.event.id) : ''
            },
        })
    },
    methods: {
        duration(start, end) {
            var startDate = new Date(this.event.date+'T'+start );
            var endDate = new Date(this.event.date+'T'+end);
            // Calculate the duration between the two dates in milliseconds
            var durationMs = endDate.getTime() - startDate.getTime();
            // Convert the duration to hours, rounding down to the nearest integer
            var durationHours = Math.floor(durationMs / (1000 * 60 * 60));
            return durationHours
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
.attendees{
    width: 40px;
    border: 1px solid #fff;
    background-color: #444;
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
}
.attendees{
    &:nth-child(2) {
        background-color: #de1a1a;
        transform: translateX(15px);
    }
    &:nth-child(3) {
        background-color: #1c1fe2;
        transform: translateX(30px);
    }
    &:nth-child(4) {
        background-color: #cc0fe0;
        transform: translateX(45px);

    }
    &:nth-child(5) {
        background-color: #e7ca10;
        transform: translateX(60px);
    }
}
</style>