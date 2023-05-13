<template>
    <section>
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-8 column">
                <h1 class="title">Events close to you</h1>
            </div>
            <div class="input-wrapper">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                        <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                    </svg>
                </i>
                <input class="form-control" type="text" data-type="icon" data-color="light" placeholder="Search events...">
            </div>
        </div>
        <div v-if="events_near.events.length" class="flx gap-16">
            All events close to you
            <span class="ft-primary flx ai-c gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#0173ff"/>
                </svg>
                {{ current_location }}
            </span>
        </div>
        <div class="empty-state flx column jc-c ai-c gap-16" v-if="!events_near.events.length">
            <svg xmlns="http://www.w3.org/2000/svg" width="268" height="268" viewBox="0 0 268 268">
                <circle cx="134" cy="134" r="134" fill="#d7e5ff"/>
                <circle cx="94.781" cy="94.781" r="94.781" transform="translate(39.219 39.218)" fill="#cadcff"/>
                <circle cx="30.068" cy="30.068" r="30.068" transform="translate(103.932 103.932)" fill="#0173ff"/>
            </svg>
            <span>Scanning for events close to you...</span>
            <span class="ft-primary flx ai-c gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#0173ff"/>
                </svg>
                {{ current_location }}
            </span>
        </div>
        <div class="results">
            <div class="grid gap-32 fs-09">
                <events-near-me-lists v-for="event in events_near.events" :key="event.id" :event="event" :images="events_near.images" />
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import EventsNearMeLists from '../../../components/includes/app/EventsNearMeLists.vue';
export default {
    components: { EventsNearMeLists },
    name: 'EventsNear',
    computed: {
        ...mapState({
            events_near: (state) => state.events_near,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            current_location: (state) => state.current_location,
        })
    },
    methods: {
        fetchNearByEvents: function() {
            const vm = this
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const userLat = position.coords.latitude
                    const userLng = position.coords.longitude
                    vm.searchEvents(userLat, userLng)
                })
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
        searchEvents: function(userLat, userLng) {
            axios.post(this.hostname+'/api/get-nearby-events?token='+this.token, {lat: userLat, lng: userLng})
            .then((res) => {
                this.$store.commit('addNearByEvent', res.data)
            }).catch((err) => {
                if(err.error == 'Token expired!') {
                    this.$store.commit('destroyToken')
                }
                console.log(err.response.data)
            })
        },
        // getDistance: function(lat1, lng1, lat2, lng2) {
        //     const R = 6371e3; // Radius of the earth in meters
        //     const φ1 = lat1 * Math.PI / 180; // Convert degrees to radians
        //     const φ2 = lat2 * Math.PI / 180;
        //     const Δφ = (lat2 - lat1) * Math.PI / 180;
        //     const Δλ = (lng2 - lng1) * Math.PI / 180;
        //     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        //                 Math.cos(φ1) * Math.cos(φ2) *
        //                 Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //     const d = R * c; // Distance in meters
        //     return d;
        // }
    },
    mounted() {
        this.fetchNearByEvents()
    }

}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.empty-state{
    height: 60vh;
}
.results{
    padding: 40px 0 32px 0;
}
.grid {
    grid-template-columns: repeat(4, 1fr);
}
</style>