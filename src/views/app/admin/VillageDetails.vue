<template>
    <section class="section-main">
        <div class="title-row flx gap-24 ai-c">
            <a class="flx gap-8 ai-c" href="#" @click.prevent="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                Back
            </a>
            <h3 class="title">
                Village details
            </h3>
        </div>
        <div class="flx gap-40 row-column">
            <div class="main-content-card relative flx column gap-24">
                <profile-body-content :user="computedVillage" :admin="true" />
            </div>
            <div class="main-content-card flx-grow-1">
                <div class="flx gap-8 ai-c">
                    <h4>Events</h4><span class="counter-pill">{{ events.length }}</span>
                </div>
                <div class="centered h-100" v-if="submitting">
                    <lottie-loader />
                </div>
                <div class="centered h-100" v-if="!events.length">
                    No events by this village
                </div>
                <div v-else id="grid_table" >
                    <div class="grid table-body">
                        <div class="grid-item table-head grid-col-notdash">
                            <h4 class="table-cell wrap-text wrap-line-1">Event name</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Event date</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Event time</h4>
                        </div>
                        <event-row-2 v-for="event in events" :key="event.id" :event="event" :dashboard="false" :nokids="true" />
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import ProfileBodyContent from '@/components/layouts/ProfileBodyContent.vue'
import LottieLoader from '@/components/includes/LottieLoader.vue'
import EventRow2 from '@/components/includes/app/EventRow2.vue'
export default {
    components: { ProfileBodyContent, LottieLoader, EventRow2 },
    name: 'VillageDetails',
    computed: {
        ...mapState({
            villages: (state) => state.villages,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            device: (state) => state.device
        }),
        computedVillage() {
            if(this.villages.length)
            return this.villages.find(data => data.id == this.$route.params.id)
            else
            return ''
        }
    },
    data() {
        return {
            events: [],
            images: [],
            submitting: true
        }
    },
    methods: {
        async FetchThisVillageEvent() {
            try {
                const res = await postApi(this.hostname + '/api/fetch-this-village-events/'+ this.$route.params.id+'?token='+this.token)
                if(res.data) {
                    this.$store.commit('setImages', res.data.images)
                    this.events = res.data.events
                    this.submitting = false
                }
            } catch (error) {
                console.error(error)
                this.submitting = false
            }
        }
    },
    mounted() {
        this.FetchThisVillageEvent()
    }
}
</script>

<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.main-content-card{
    width: 35%;
    min-width: 460px;
}
.grid-col-notdash{
    grid-template-columns: 1.2fr .8fr .6fr .6fr;
}
</style>