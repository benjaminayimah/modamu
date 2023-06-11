<template>
    <section class="flx gap-32 dashboard-main">
        <div class="left flx column gap-32 admin-wl-sec">
            <div class="flx column gap-40 wl-sec">
                <h1 class="wrap-text wrap-line-2">Good day <span class="capitalize">{{ computedFirstName(getUser.name) }},</span></h1>
                <div>Keep up to date with everything that happens, stay updated and informed of every event, village and events.</div>
                <router-link v-if="is_village" to="/notifications" class="button-secondary a-button a-btn btn-lg">View all events</router-link>
            </div>
            <dash-notification-card />
        </div>
        <div class="right flx column flx-grow-1 gap-32">
            <div class="top-right flx column gap-16">
                <h4>Status reports</h4>
                <div class="grid col-4 gap-32 reports overflow-x-scroll scroll-hidden scroll-snap">
                    <status-card-type-1 :data="statusCard1" />
                    <status-card-type-1 :data="statusCard2" />
                    <status-card-type-2 :data="statusCard3"/>
                    <status-card-type-2 :data="statusCard4" :color="true"/>
                </div>
            </div>
            <div class="flx-grow-1 flx column gap-24">
                <div class="flx column gap-16" v-if="is_village">
                    <div class="flx gap-16">
                        <h4>New requests</h4>
                        <span>{{ wait_lists.length }}</span>
                    </div>
                    <div class="grid col-3 gap-32 top-events overflow-x-scroll scroll-hidden scroll-snap">
                        <div v-if="!wait_lists.length" class="centered bg-white br-16 pd-16">
                            No new request
                        </div>
                        <dash-waiting-list v-for="waitinglist in wait_lists.slice(0, 3)" :key="waitinglist.id" :waitinglist="waitinglist"/>
                    </div>
                </div>
                <div class="flx-grow-1 flx column gap-16" v-if="is_village">
                    <div class="flx gap-16 event-tab">
                        <router-link :to="{ name: 'AdminDashboard'}" class="flx gap-8 ai-c">
                            <div class="wrap-text wrap-line-1">Ongoing events</div>
                            <span class="br-16">{{ getOngoingEvents.length }}</span>
                        </router-link>
                        <router-link :to="{ name: 'AdminDashUpcomingEvent'}" class="flx gap-8 ai-c">
                            <div class="wrap-text wrap-line-1">Upcoming events</div>                          
                            <span class="br-16">{{ getUpcomingEvents.length }}</span>
                        </router-link>
                        <router-link :to="{ name: 'AdminDashPastEvent'}" class="flx gap-8 ai-c">
                            <div class="wrap-text wrap-line-1">Past events</div>
                            <span class="br-16">{{ getPastEvents.length }}</span>
                        </router-link>
                    </div>
                    <div id="grid_table" class="bg-white br-16 pd-16 flx-grow-1">
                        <router-view></router-view>
                    </div>
                </div>
                <div v-else class="flx-grow-1 flx column bg-white br-24 pd-24">
                    <div class="flx jc-sb ai-c">
                        <div>Villages</div>
                        <button @click="$store.commit('goToVillagePage')" class="button-outline rounded-outl btn-sm">Add new</button>
                    </div>
                    <admin-dash-villages />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import userNameMixin from '@/mixins/userNameMixin';
import { mapGetters, mapState } from 'vuex';
import DashNotificationCard from '@/components/layouts/DashNotificationCard.vue'
import StatusCardType1 from '@/components/includes/app/StatusCardType1.vue';
import StatusCardType2 from '@/components/includes/app/StatusCardType2.vue';
import DashWaitingList from '@/components/includes/app/DashWaitingList.vue';
import AdminDashVillages from '@/components/layouts/AdminDashVillages.vue';
export default {
  components: { DashNotificationCard, StatusCardType1, StatusCardType2, DashWaitingList, AdminDashVillages },
    name: 'AdminsDash',
    mixins: [userNameMixin],
    computed: {
        ...mapGetters(['getOngoingEvents', 'getUpcomingEvents', 'getPastEvents', 'getUser', 'getTodaysEvents', 'is_village', 'is_admin']),
        ...mapState({
            notifications: (state) => state.notifications,
            events: (state) => state.events,
            villages: (state) => state.villages,
            parents: (state) => state.parents,
            user: (state) => state.user,
            bookings: (state) => state.bookings,
            attendees: (state) => state.attendees,
            wait_lists: (state) => state.wait_lists,

        }),
        statusCard1() {
            let data = {
                array: this.bookings,
                title: 'Parents registered to events',
                parent: true
            }
            if(this.user.access_level == '0') {
                data.title = 'Transactions by villages'
                data.array = []
                this.bookings.forEach(element => {
                    const obj = { id: element.village_id, image: element.image }
                    data.array.push(obj)
                });
            }
            return data
        },
        statusCard2() {
            const data = {
                array: this.attendees,
                title: 'Kids registered to events',
                parent: false
            }
            return data
        },
        statusCard3() {
            const data = {
                count: this.bookings.length,
                title: 'Booking',
                subTitle: 'Total bookings'
            }
            if(this.user.access_level == '1') {
                data.count = this.getUpcomingEvents.length
                data.title = 'Events'
                data.subTitle = 'Upcoming events this week'
            }
            return data
        },
        statusCard4() {
            let data = {
                count: this.villages.length,
                title: 'Villages',
                subTitle: 'Registered villages'
            }
            if(this.user.access_level == '1') {
                data.count = this.getPastEvents.length
                data.title = 'Events'
                data.subTitle = 'Total events held'
            }
            return data
        }
    },
}
</script>
<style lang="scss" scoped>
section {
    padding: 32px 0;
    height: calc(100vh - 108px);
}
.left{
    flex-basis: 20%;
}
.top-right{
    flex-basis: 25%;
}
.top-evt {
  height: 60px;
}
h1 {
  font-size: 3.4rem;
}
.button-secondary{
    width: 70%;
    min-width: 160px;
}
.event-tab{
    a {
        height: 50px;
    }
}
#event_table{
    padding: 12px 24px;
}
.top-events{
    height: 64px;
}
.reports > *{
    min-width: 200px;
    height: 170px;
}
</style>