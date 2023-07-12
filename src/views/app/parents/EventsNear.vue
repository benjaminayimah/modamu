<template>
    <section class="section-main">
        <div class="title-row flx gap-24 ai-c">
            <div class="flx gap-8">
                <div class="secondary-input-wrapper input-wrapper" id="search_radius_wrapper">
                    <label for="searchRadiusInput">Search radius(km)</label>
                    <input id="searchRadiusInput" v-model="form.radius" autocomplete="off" data-state="location" @input="isFocusedIn('search_radius_wrapper')" @focusin="isFocusedIn('search_radius_wrapper')" @focusout="isFocusedOut('search_radius_wrapper', 'searchRadiusInput')" type="number" placeholder="" class="form-control">
                </div>
                <div class="secondary-input-wrapper input-wrapper" :class="{'show-err' : noInput}" id="location_search_wrapper">
                    <label for="locationSearchInput">Enter your preferred location</label>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </i>
                    <input id="locationSearchInput" v-model="inputVal" ref="address" autocomplete="off" data-state="location" data-type="icon" @input="isFocusedIn('location_search_wrapper')" @focusin="isFocusedIn('location_search_wrapper')" @focusout="isFocusedOut('location_search_wrapper', 'locationSearchInput')" type="search" name="location" placeholder="" class="form-control">
                </div>
                <button @click="doManualSearch(form.latitude, form.longitude)" class="button-primary btn-lg gap-8 location-submit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                        <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#fff"/>
                    </svg>
                    Search
                </button>
            </div>
            <span class="gray">Or</span>
            <button @click="fetchNearByEvents" class="button-secondary gap-8 btn-lg fw-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#fff"/>
                </svg>
                Use current location
            </button>
        </div>
        <div class="mb-24 danger" v-if="noInput">Please type in a location and then select from the dropdown list</div>
        <div v-if="load" class="empty-state flx column jc-c ai-c gap-16">
            <location-beacon />
            <span>Scanning for events in...</span>
            <span class="ft-primary flx ai-c gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#0173ff"/>
                </svg>
                {{ computedLocationName }}
            </span>
        </div>
        <div v-if="events_near.events.length && !load">
            <div class="flx gap-16">
                <div v-if="locationAfterSearch">
                    Showing events in...
                    <span class="ft-primary flx ai-c gap-8">
                        <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 20.101 19.821">
                            <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#0173ff"/>
                        </svg>
                        {{ locationAfterSearch }}
                    </span>
                </div>
                <div v-else>
                    Check out some upcoming events
                </div>
            </div>
            <div class="results">
                <div class="grid gap-32 fs-09">
                    <events-near-me-lists v-for="event in events_near.events" :key="event.id" :event="event" :images="events_near.images" />
                </div>
            </div>
        </div>
        <div v-if="!events_near.events.length && !load" class="not-found flx column jc-c ai-c gap-16">
            <not-found-lottie />
            <span><strong>Sorry,</strong> there were no events found</span>
        </div>
    </section>
</template>
<script>
import autoCompleMixin from '@/mixins/autoCompleMixin';
import inputValMixin from '@/mixins/inputValMixin';
import axios from 'axios';
import { mapState } from 'vuex';
import EventsNearMeLists from '../../../components/includes/app/EventsNearMeLists.vue';
import LocationBeacon from '@/components/includes/LocationBeacon.vue';
import NotFoundLottie from '@/components/includes/NotFoundLottie.vue';
export default {
    components: { EventsNearMeLists, LocationBeacon, NotFoundLottie },
    name: 'EventsNear',
    mixins: [inputValMixin, autoCompleMixin],
    computed: {
        ...mapState({
            events_near: (state) => state.events_near,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            current_location: (state) => state.current_location,
        }),
        computedLocationName() {
            if(this.manual) {
                return this.form.address
            }else {
                return this.current_location
            }
        }
    },
    data() {
        return {
            load: false,
            form: {
                radius: 10,
                latitude: null,
                longitude: null,
            },
            manual: true,
            noInput: false,
            locationAfterSearch: '',
            inputVal: ''
        }
    },
    methods: {
        doManualSearch(userLat, userLng) {
            this.noInput ? this.noInput = false : ''
            if(!this.inputVal == '') {
                if(this.form.latitude && this.form.longitude) {
                    this.searchEvents(userLat, userLng)
                    this.manual = true
                }else{
                    this.showError()
                }
            }else {
                this.showError()
            }
        },
        showError() {
            this.noInput = true
            this.isFocusedIn('location_search_wrapper')
        },
        clearErr() {

            this.noInput ? this.noInput = false : ''
        },
        fetchNearByEvents: function() {
            this.manual = false
            this.loaderOn()
            const vm = this
            const vms = this.$store
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const userLat = position.coords.latitude
                    const userLng = position.coords.longitude
                    vms.dispatch('getCucrrentLocation', { lat: userLat, lng: userLng})
                    setTimeout(() => {
                        vm.searchEvents(userLat, userLng)
                    }, 1000);
                })
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
        searchEvents: function(userLat, userLng) {
            this.loaderOn()
            axios.post(this.hostname+'/api/get-nearby-events?token='+this.token, {lat: userLat, lng: userLng, rad: this.form.radius})
            .then((res) => {
                this.$store.commit('addNearByEvent', res.data)
                if(this.manual) {
                    this.locationAfterSearch = this.form.address
                    this.inputVal = this.form.address
                    this.isFocusedIn('location_search_wrapper')
                }else {
                    this.locationAfterSearch = this.current_location
                }
                this.clearErr()
                this.loaderOff()
            }).catch((e) => {
                this.loaderOff()
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            })
        },
        loaderOn() {
            this.load = true
        },
        loaderOff() {
            this.load = false
        }
    },
    mounted() {
        this.$store.commit('setNearbyEventToEvents')
    }

}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.empty-state, .not-found{
    height: 60vh;
}
.results{
    padding: 40px 0 32px 0;
}
.grid {
    grid-template-columns: repeat(4, 1fr);
}
.current-location{
    background-color: var(--bg-white);
    padding: 10px 14px;
    span {
        font-size: 12px;
    }
}
.btn-lg{
    padding: 8px 16px;
}
.lc-name{
    max-width: 200px;
}

//input
.secondary-input-wrapper{
  position: relative;
  label {
      position: absolute;
      font-weight: 500;
      cursor: text;
      transition: 0.2s all;
      margin: 0;
      color: var(--gray);
      top: 18px;
      font-size: 16px;
  }
  
}
#location_search_wrapper{
    min-width: 320px;
    label {
      left: 46px;
    }
    input{
      padding-left: 44px !important;
  }
}
#search_radius_wrapper{
    input {
        padding: 16px;
        width: 135px;
    }
    label {
      left: 16px;
    }
}
.input-is-focused{
  label {
      transform: translateY(-12px);
      color: var(--primary-color);
      font-size: 12px;
  }
}
.is-iddle{
  label{
      color: var(--gray);
      font-size: 12px;
      transform: translateY(-12px);
  }
}
.show-err{
    input {
        border-color: var(--error);
    }
    label {
        color: var(--error) !important;
    }
}
.location-submit {
    padding-left: 25px;
    padding-right: 25px;
}
</style>