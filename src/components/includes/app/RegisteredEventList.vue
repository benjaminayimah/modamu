<template>
    <div class="grid-item-outline br-24 bg-white ">
        <div class="grid gap-8 col-2 mb-16">
            <div class="flx gap-16 column">
                <div class="row">
                    <span>Event name</span>
                    <div><strong>{{ event.event_name }}</strong></div>
                </div>
                <div class="row">
                    <span>Event date</span>
                    <div><strong>{{ format_date(event.date) }}</strong></div>
                </div>
                <div class="row">
                    <span>Starts</span>
                    <div><strong>{{ format_time(event.start_time) }}</strong></div>
                </div>
            </div>
            <div class="flx gap-16 column">
                <div class="row">
                    <span>Event address</span>
                    <div><strong>{{ event.address }}</strong></div>
                </div>
                <div class="row">
                    <span>Ends</span>
                    <div><strong>{{ format_time(event.end_time) }}</strong></div>
                </div>
            </div>
        </div>
        <div class="flx jc-sb">
            <div class="flx gap-8 ai-c">
                <i class="br-50" :class="computedStatus"></i>
                <span class="capitalize">{{ computedStatus }}</span>
            </div>
            <button @click="trackEvent" class="button-primary btn-sm" :class="{ 'button-disabled' : !event.accepted }" :disabled="!event.accepted ? true : false">Track</button>
        </div>
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime';
export default {
    name: 'RegisteredEventsList',
    props: ['event'],
    mixins: [formatDateTime],
    computed: {
        computedStatus() {
            let status
            if(!this.event.accepted && this.event.kids_status == 0) {
                status = 'pending'
            }else if(this.event.accepted && this.event.kids_status == 0) {
                status = 'accepted'
            }else if(this.event.kids_status < 3) {
                status = 'at event'
            }else if(this.event.kids_status == 3) {
                status = 'ended'
            }
            return status
        }
    },
    methods: {
        trackEvent() {
            this.$router.push({ name: 'TrackEvent', params: { id: this.event.id, name: this.event.event_name}})
        }
    }
}
</script>

<style lang="scss" scoped>
.button-primary{
    height: 40px;
}
span, strong {
    font-size: 0.95rem;
    
}
.row{
    display: flex;
    flex-direction: column;
    gap: 4px;
}
i{
    height: 8px;
    width: 8px;
}
.accepted, .event {
    background-color: var(--primary-color);
}
.pending {
    background-color: var(--warning);
}
.ended {
    background-color: var(--error);
}
</style>