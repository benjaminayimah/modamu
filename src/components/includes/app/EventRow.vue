<template>
    <router-link :to="{ name: 'DetailedEvent', params: { id: event.id, name: event.event_name}}" class="table-row grid-item row-hover" :class="dashboard ? 'grid-col-dash' : 'grid-col-notdash'">
        <div class="table-cell gap-8">
            <profile-avatar :id="event.user_id" :image="computedImage"/>
            <span class="wrap-text wrap-line-1">{{ event.event_name }}</span>
        </div>
        <div class="table-cell gap-8"><span>{{ duration(event.start_time, event.end_time) }}</span><span>hours</span></div>
        <div class="table-cell jc-sb">
            <div class="flx ai-c stack-cards">
                <span class="wrap-text wrap-line-1" v-if="!computedAttendees.length">No Attendees</span>
                <profile-avatar v-else v-for="kid in computedAttendees.slice(0, 5)" :key="kid.id" :id="kid.user_id" :image="kid.photo" />
                <span v-if="computedAttendees.length > 5" class="counter bg-img centered">+{{ computedAttendees.length - 5 }}</span>
            </div>
            <span v-if="!dashboard" class="ft-primary pd-0-20 see-details">
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
            attendees: (state) => state.attendees,
            computedImage() {
                const image =  this.images.length ? this.images.filter(data => data.event_id == this.event.id)[0] : ''
                if(image)
                return image.image
                else
                return null
            },
            computedAttendees() {
                return this.attendees.length ? this.attendees.filter(data => data.event_id == this.event.id) : ''
            }
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