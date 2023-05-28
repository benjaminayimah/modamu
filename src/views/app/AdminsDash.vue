<template>
    <section class="flx gap-32 dashboard-main">
        <div class="left flx column gap-32 admin-wl-sec">
            <div class="flx column gap-40 wl-sec">
                <h1 class="wrap-text wrap-line-2">Good day {{ computedFirstName(getUser.name) }}</h1>
                <div>Keep up to date with everything that happens, stay updated and informed of every event, village and events.</div>
                <router-link to="/notifications" class="button-secondary a-button a-btn">View all events</router-link>
            </div>
            <dash-notification-card />
        </div>
        <div class="right flx column flx-grow-1 gap-32">
            <div class="top-right flx column gap-16">
                <h4>Status reports</h4>
                <div class="grid col-4 gap-32 reports overflow-x-scroll scroll-hidden scroll-snap">
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
                        <div class="stack-cards">
                            <profile-avatar v-for="parent in registered_parents" :key="parent.id" :id="null" :image="null" />
                            <div class="fw-700 bg-img counter br-24">+2,450</div>
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
                        <div class="stack-cards">
                            <profile-avatar v-for="parent in registered_parents" :key="parent.id" :id="null" :image="null" />
                            <div class="fw-700 bg-img counter br-24">+450</div>
                        </div>
                    </div>
                    <div class="flx-grow-1 bg-white pd-20 br-24 flx jc-sb column">
                        <div class="fw-700 fs-2r">{{ events.length }}</div>
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
                        <span>{{ getTodaysEvents.length }}</span>
                    </div>
                    <div class="grid col-3 gap-32 top-events overflow-x-scroll scroll-hidden scroll-snap">
                        <dash-todays-event-list v-for="event in getTodaysEvents.slice(0, 3)" :key="event.id" :event="event" />
                        <div v-if="getTodaysEvents.length < 3" class="centered bg-white br-16 pd-16">
                            <router-link :to="{ name: 'AddEventPage' }" class="a-btn flx gap-8 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 20 20">
                                    <path d="M-3266.055-837.995a1.029,1.029,0,0,1-1.021-1.034l.048-7.944-7.944-.048a1.028,1.028,0,0,1-1.022-1.034,1.028,1.028,0,0,1,1.034-1.021l7.944.048.048-7.944a1.028,1.028,0,0,1,1.034-1.021,1.027,1.027,0,0,1,1.021,1.034l-.048,7.944,7.945.048a1.029,1.029,0,0,1,1.021,1.034,1.028,1.028,0,0,1-1.034,1.022l-7.944-.048-.048,7.944a1.03,1.03,0,0,1-1.03,1.022Z" transform="translate(3275.994 857.994)" fill="#000"/>
                                </svg>
                                Add new
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="flx-grow-1 flx column gap-16">
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
import DashTodaysEventList from '@/components/includes/app/DashTodaysEventList.vue';
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue';
import DashNotificationCard from '@/components/layouts/DashNotificationCard.vue'
export default {
  components: { DashTodaysEventList, ProfileAvatar, DashNotificationCard },
    name: 'AdminsDash',
    mixins: [userNameMixin],
    computed: {
        ...mapGetters(['getOngoingEvents', 'getUpcomingEvents', 'getPastEvents', 'getUser', 'getTodaysEvents']),
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
.top-events{
    height: 64px;
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
    }
    .counter{
        background-color: var(--bg-dark);
        padding: 14px;
    }
}
</style>