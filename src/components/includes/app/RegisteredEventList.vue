<template>
    <div class="grid-item-outline br-24 bg-white ">
        <div class="grid gap-8 col-2 mb-16">
            <div class="flx gap-16 column">
                <div class="row">
                    <span>Event name</span>
                    <div><strong>Name of Event</strong></div>
                </div>
                <div class="row">
                    <span>Event date</span>
                    <div><strong>24th June</strong></div>
                </div>
                <div class="row">
                    <span>Starts</span>
                    <div><strong>1pm</strong></div>
                </div>
            </div>
            <div class="flx gap-16 column">
                <div class="row">
                    <span>Event address</span>
                    <div><strong>No. 7 lagoon street</strong></div>
                </div>
                <div class="row">
                    <span>Ends</span>
                    <div><strong>4pm</strong></div>
                </div>
            </div>
        </div>
        <div class="flx jc-sb">
            <div class="flx gap-8 ai-c">
                <i class="br-50 accepted"></i>
                <span>Accepted</span>
            </div>
            <button @click="trackEvent" class="button-primary">Track</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisteredEventsList',
    props: ['event'],
    methods: {
        trackEvent() {
            this.$router.push({ name: 'TrackEvent', params: { name: this.event.name}})
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
.accepted {
    background-color: var(--primary-color);
}
.pending {
    background-color: var(--warning);
}
</style>