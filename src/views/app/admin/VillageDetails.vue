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
                <div>
                    <div class="flx gap-8 ai-c">
                        <h4 class="capitalize">{{ computedEvents.filter + 's' }}</h4><span class="counter-pill">{{ computedEvents.events.length }}</span>
                    </div>
                    <div v-if="events.length" class="flx gap-8 mt-16 mb-16">
                        <router-link replace v-for="tab in tabs" :key="tab.id" :to="{ name: 'DetailedVillage', params: { name: $route.params.name, id: $route.params.id, filter: tab.url }}" :class="{ 'active-pill' : tab.url == $route.params.filter}" class="flx gap-8 ai-c btn-pill fs-09">
                            {{ tab.name }}
                        </router-link>
                    </div>
                </div>
                <div class="centered h-100" v-if="submitting">
                    <lottie-loader />
                </div>
                <div class="centered h-100" v-if="!computedEvents.events.length">
                    No {{ computedEvents.filter }}
                </div>
                <div v-else id="grid_table" >
                    <div class="grid table-body">
                        <div class="grid-item table-head grid-col-notdash">
                            <h4 class="table-cell wrap-text wrap-line-1">Event name</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Event date</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Event time</h4>
                        </div>
                        <event-row-2 v-for="event in displayedItems" :key="event.id" :event="event" :dashboard="false" :nokids="true" />
                    </div>
                    <pagination-controls v-if="totalItems > 10" :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" />
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
import PaginationControls from '@/components/includes/app/PaginationControls.vue'
export default {
    components: { ProfileBodyContent, LottieLoader, EventRow2, PaginationControls },
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
        },
        computedEvents() {
            const events = this.events
            let filter = this.$route.params.filter
            const currentDateTime = new Date()
            let result = {
                events: [],
                filter: 'event'
            }
            if(filter == 'all') {
                result.events = events
                result.filter = 'event'
                return result
            }else if(filter == 'ongoing') {
                result.events =  events.filter(event => currentDateTime > new Date(event.date+'T'+event.start_time) && currentDateTime < new Date(event.date+'T'+event.end_time))
                result.filter = 'ongoing event'
                return result
            }else if (filter == 'upcoming') {
                result.events =  events.filter(event => currentDateTime < new Date(event.date+'T'+event.start_time))
                result.filter = 'upcoming event'
                return result
            }
            else if (filter == 'past') {
                result.events =  events.filter(event => currentDateTime > new Date(event.date+'T'+event.end_time))
                result.filter = 'past event'
                return result
            }
            else
            return result
        },
        totalItems() {
            return this.computedEvents.events.length
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.computedEvents.events.slice(startIndex, endIndex);
        }
    },
    data() {
        return {
            events: [],
            images: [],
            submitting: true,
            tabs: [
                { id: 1, name: 'all events', url: 'all'},
                { id: 2, name: 'ongoing', url: 'ongoing'},
                { id: 3, name: 'upcoming', url: 'upcoming'},
                { id: 4, name: 'past', url: 'past'}
            ],
            currentPage: 1,
            itemsPerPage: 10,
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
            } catch (e) {
                this.submitting = false
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
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
// .ongoing-e {
//     border-color: #09cc1d !important;
// }
// .upcoming-e {
//     border-color: #0a8f17 !important;
// }
// .past-e {
//     border-color: var(--warning) !important;
// }
</style>