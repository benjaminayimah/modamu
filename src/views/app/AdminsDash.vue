<template>
    <section class="flx gap-32 dashboard-main">
        <div class="left flx column gap-32 admin-wl-sec">
            <div class="flx column gap-40 wl-sec">
                <h1 class="wrap-text wrap-line-2">Good day {{ computedFirstName(getUser.name) }}</h1>
                <div>Keep up to date with everything that happens, stay updated and informed of every event, village and events.</div>
                <button class="button-secondary">View all events</button>
            </div>
            <div class="flx-grow-1 pd-20 br-24 bg-white">
                <div class="mb-24 flx ai-c jc-sb">
                    Notifications
                    <a class="gray fs-09 see-all wrap-text wrap-line-1">See all(10)</a>
                </div>
                <div class="m--8">
                    <notification-list class="pd-8 br-16 mb-4" v-for="notification in notifications.slice(0, 3)" :key="notification.id" :notification="notification" />
                </div>
            </div>
        </div>
        <div class="right flx column flx-grow-1 gap-32">
            <div class="top-right flx column gap-16">
                <h4>Status reports</h4>
                <div class="grid col-4 gap-32 reports overflow-x-scroll-hidden h-scroll">
                    <div class="flx-grow-1 bg-dark pd-20 br-24 flx column gap-8 ft-white">
                        <div class="fw-700 w-90">Parents registered to events</div>
                        <div class="fs-08 flx jc-sb ai-c">
                            <span>Up 20% from last week</span>
                            <i class="status-indicator status-increase centered br-50 flx-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 9.265 13.299">
                                    <path d="M1.389,4.834,5,1.223m0,0V12.778M5,1.223,8.611,4.834" transform="translate(-0.367 -0.201)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.444"/>
                                </svg>
                            </i>
                        </div>
                        <div class="stack-cards relative">
                            <div v-for="parent in registered_parents" :key="parent.id" class="bg-img br-50 absolute"></div>
                            <span class="fw-700 counter br-24">+2,450</span>
                        </div>
                    </div>
                    <div class="flx-grow-1 bg-dark pd-20 br-24 flx column jc-sb ft-white">
                        <div class="fw-700 w-90">Kids registered to events</div>
                        <div class="fs-08 flx jc-sb ai-c">
                            <span>Down 20% from last week</span>
                            <i class="status-indicator status-decrease centered br-50 flx-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 9.265 13.299">
                                    <path d="M1.389,4.834,5,1.223m0,0V12.778M5,1.223,8.611,4.834" transform="translate(9.632 13.5) rotate(180)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.444"/>
                                </svg>
                            </i>
                        </div>
                        <div class="stack-cards relative">
                            <div v-for="parent in registered_parents" :key="parent.id" class="bg-img br-50 absolute"></div>
                            <span class="fw-700 counter br-24">+450</span>
                        </div>
                    </div>
                    <div class="flx-grow-1 bg-white pd-20 br-24 flx jc-sb column">
                        <div class="fw-700 fs-2r">234</div>
                        <span>Events coming up this week</span>
                    </div>
                    <div class="flx-grow-1 bg-primary ft-white pd-20 br-24 flx jc-sb column">
                        <div>
                            <div class="fw-700 fs-2r">234</div>
                            <span class="fs-09 ft-transparent">Villages</span>
                        </div>
                        <div>Registered villages</div>
                    </div>
                </div>
            </div>
            <div class="flx-grow-1 flx column gap-32">
                <div class="flx column gap-16">
                    <div class="flx gap-16">
                        <h4>Today's top events</h4>
                        <span>23</span>
                    </div>
                    <div class="flx-grow-1 bg-white centered br-16 top-evt" v-if="!events.length">No event found</div>
                    <div class="grid col-3 gap-32" v-else>
                        <dash-todays-event-list v-for="event in events.slice(0, 3)" :key="event.id" :event="event" />
                    </div>
                </div>
                <div class="flx-grow-1 flx column gap-16">
                    <div class="flx gap-16 event-tab">
                        <router-link :to="{ name: 'AdminDashboard'}" class="flx gap-8 ai-c active">
                            Ongoing events
                            <span class="br-16">{{ getOngoingEvents.length }}</span>
                        </router-link>
                        <router-link :to="{ name: 'AdminDashUpcomingEvent'}" class="flx gap-8 ai-c">
                            Upcoming events
                            <span class="br-16">{{ getUpcomingEvents.length }}</span>
                        </router-link>
                        <router-link :to="{ name: 'AdminDashPastEvent'}" class="flx gap-8 ai-c">
                            Past events
                            <span class="br-16">{{ getPastEvents.length }}</span>
                        </router-link>
                    </div>
                    <div id="event_table" class="bg-white br-16 flx-grow-1">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import userNameMixin from '@/mixins/userNameMixin';
import { mapGetters, mapState } from 'vuex';
import NotificationList from '@/components/includes/app/NotificationList.vue';
import DashTodaysEventList from '@/components/includes/app/DashTodaysEventList.vue';
export default {
  components: { DashTodaysEventList, NotificationList },
    name: 'AdminsDash',
    mixins: [userNameMixin],
    computed: {
        ...mapGetters(['getOngoingEvents', 'getUpcomingEvents', 'getPastEvents', 'getUser']),
        ...mapState({
            notifications: (state) => state.notifications,
            events: (state) => state.events,
        })
    },
    data() {
        return {
            me: [],
            registered_parents: [
                {id: 1},
                {id: 2},
                {id: 3}
            ]
        }
    }
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
.reports > *{
    min-width: 200px;
    height: 170px;
}
.stack-cards {
    --height: 48px;
    height: var(--height);
    .bg-img{
        height: var(--height);
        width: var(--height);
        border: 2px solid var(--bg-dark);
        background-color: var(--bg-color);
        &:nth-child(2) {
            transform: translateX(30px);
        }
        &:nth-child(3) {
            transform: translateX(60px);
        }
    }
    .counter{
        transform: translateX(90px);
        background-color: var(--bg-dark);
        display: inline-block;
        padding: 15px;
    }
}
</style>