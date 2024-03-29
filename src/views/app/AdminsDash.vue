<template>
    <section class="flx gap-32 dashboard-main">
        <div class="left flx column gap-32 admin-wl-sec">
            <div class="flx column gap-40 wl-sec">
                <h1 class="wrap-text wrap-line-2 greeting">{{ getGreetingMessage() }} <span class="capitalize">{{ computedFirstName(getUser.name) }},</span></h1>
                <div>Keep up to date with everything that happens, stay updated and informed of every event, village and events.</div>
                <router-link v-if="is_village" :to="{ name: 'OngoingEvents', params: { name: 'ongoing-events'} }" class="button-secondary a-button a-btn btn-lg">View all events</router-link>
            </div>
            <dash-notification-card v-if="is_village" />
            <dash-message-card v-else />
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
                    <div v-if="!wait_lists.length" class="centered bg-white br-16 pd-16">
                        No new request
                    </div>
                    <div v-else class="grid col-3 gap-32 top-events overflow-x-scroll scroll-hidden scroll-snap">
                        <dash-waiting-list v-for="waitinglist in wait_lists.slice(0, 3)" :key="waitinglist.id" :waitinglist="waitinglist"/>
                    </div>
                </div>
                <div class="flx-grow-1 flx" v-if="is_village">
                    <div class="flx-grow-1 flx column gap-16" v-if="eventStatus">
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
                    <div v-else class="flx empty-wrapper flx-grow-1">
                        <router-link :to="{ name: 'AddEventPage' }" class="br-24 flx jc-sb ai-c flx-grow-1 bg-img-banner" :style="{ backgroundImage: 'url('+getBanner1+')'}">
                            <div class="caption flx column gap-16">
                                <div class="ft-white">
                                    <h2 class="mb-8">We’re happy to have you on board</h2>
                                    <span class="block">Your have no event. Begin by creating a new event</span>
                                </div>
                                <a href="#" class="explore-btn fw-600 br-24 fs-09 bg-white w-fc">Create new event</a>
                            </div>
                            <div class="banner-logo ai-fe flx h-100">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 213.709 52.869">
                                    <path d="M-1804.539-2417.073a5.438,5.438,0,0,1-3.708-3.01,9.007,9.007,0,0,1-.149-7.457,5.535,5.535,0,0,1,3.127-3.081,8.032,8.032,0,0,1,6.613.033,3.9,3.9,0,0,1,1.824,1.563,2.873,2.873,0,0,1,.343,1.048,1.126,1.126,0,0,1-.686,1.22,1.4,1.4,0,0,1-1.631-.2,5.735,5.735,0,0,1-.559-.671,2.693,2.693,0,0,0-2.022-1.1,6.592,6.592,0,0,0-1.186,0,3.235,3.235,0,0,0-2.779,1.951,6.658,6.658,0,0,0-.122,5.349,3.707,3.707,0,0,0,5.808,1.336,2.879,2.879,0,0,0,.966-1.992h-1.842a3.437,3.437,0,0,1-.683-.042,1.111,1.111,0,0,1-.947-1.264,1.05,1.05,0,0,1,1.138-1.075q2.064-.027,4.125,0a1.025,1.025,0,0,1,1.145,1.123c.03,1.79.022,3.585.008,5.375a1,1,0,0,1-.836,1.026,1.072,1.072,0,0,1-1.291-.623c-.13-.294-.205-.616-.325-.981-.171.156-.309.276-.439.4a4.7,4.7,0,0,1-3.223,1.309c-.166,0-.333.007-.5.007A8.188,8.188,0,0,1-1804.539-2417.073Zm29.032.235c-.083,0-.168,0-.25,0a1.6,1.6,0,0,1-1.7-1.835c-.012-1.913,0-3.827,0-5.741v-4.528a3.726,3.726,0,0,1,.063-.761,1.4,1.4,0,0,1,1.268-1.219,3.872,3.872,0,0,1,.624-.033c2.395,0,4.793-.008,7.188,0a3.361,3.361,0,0,1,.984.131,1.046,1.046,0,0,1,.728,1.134,1.057,1.057,0,0,1-.709,1.148,3.033,3.033,0,0,1-.917.131c-1.772.012-3.544.008-5.312.008h-.709l0,0v3.051h5.077a5.741,5.741,0,0,1,.623.019,1.088,1.088,0,0,1,1.082,1.223,1.078,1.078,0,0,1-1.119,1.183c-.519.033-1.041.015-1.563.015h-3.439c-.205,0-.407.018-.653.03v3.451h.7c1.791,0,3.585,0,5.376,0a3.528,3.528,0,0,1,.925.115,1.066,1.066,0,0,1,.787,1.216,1.048,1.048,0,0,1-.8,1.142,3.674,3.674,0,0,1-.925.112q-1.829.005-3.657,0Zm-61.936-.254a1.31,1.31,0,0,1-.664-1.373,5.766,5.766,0,0,1,.291-1.018q2-5.288,4.021-10.571a1.462,1.462,0,0,1,1.657-1.131h.626a1.618,1.618,0,0,1,1.821,1.283c.418,1.134.82,2.272,1.234,3.409.821,2.272,1.649,4.543,2.466,6.815a6.912,6.912,0,0,1,.332,1.137,1.353,1.353,0,0,1-1.019,1.571,1.464,1.464,0,0,1-1.832-.779c-.246-.619-.444-1.257-.668-1.884-.048-.134-.112-.265-.19-.455l-.007-.007h-4.734a.43.43,0,0,0-.447.347c-.209.612-.421,1.22-.645,1.828a1.53,1.53,0,0,1-1.441,1.041A1.656,1.656,0,0,1-1837.443-2417.092Zm5.517-10.53c-.589,1.741-1.179,3.484-1.791,5.286h3.656c-.578-1.805-1.13-3.562-1.734-5.3C-1831.84-2427.634-1831.881-2427.626-1831.926-2427.622Zm-106.012,9.2q-1.818-5.085-3.632-10.172a6.971,6.971,0,0,1-.243-.776,1.342,1.342,0,0,1,.8-1.69,1.6,1.6,0,0,1,2.1.683,5.822,5.822,0,0,1,.35.932q1.226,4.034,2.443,8.068c.078.258.168.507.306.91.127-.351.212-.552.28-.76q1.3-4.108,2.592-8.218a6.176,6.176,0,0,1,.381-.988,1.44,1.44,0,0,1,1.88-.65,1.293,1.293,0,0,1,.9,1.57,3.748,3.748,0,0,1-.2.72c-1.3,3.559-2.623,7.11-3.913,10.672a1.652,1.652,0,0,1-1.693,1.2h-.293C-1937.14-2416.92-1937.494-2417.186-1937.938-2418.424Zm25.28.131a3.7,3.7,0,0,1-.019-.5v-10.493c0-.122,0-.25,0-.373a1.5,1.5,0,0,1,1.615-1.529,1.475,1.475,0,0,1,1.54,1.6c.012,1.854,0,3.7,0,5.558v5.121c0,.168,0,.332,0,.5a1.454,1.454,0,0,1-1.451,1.489c-.042,0-.084,0-.125,0A1.466,1.466,0,0,1-1912.658-2418.293Zm50.477,1.167a3.771,3.771,0,0,1-.68-.075,1.354,1.354,0,0,1-1.152-1.16,4.151,4.151,0,0,1-.059-.805q-.007-5.087,0-10.176v-.187a1.5,1.5,0,0,1,1.6-1.659,1.474,1.474,0,0,1,1.536,1.656c.008,2.976,0,5.953,0,8.93v.821h1.429c1.227,0,2.458-.007,3.686,0a3.34,3.34,0,0,1,.861.1,1.236,1.236,0,0,1,.944,1.179,1.222,1.222,0,0,1-.877,1.231,2.805,2.805,0,0,1-.859.138q-1.452.007-2.9.007Q-1860.416-2417.119-1862.181-2417.125Zm-27.152,0a3.827,3.827,0,0,1-.679-.075,1.347,1.347,0,0,1-1.146-1.164,4.94,4.94,0,0,1-.063-.806q-.005-5.091,0-10.179c0-.123,0-.25.007-.374a1.479,1.479,0,0,1,1.6-1.465,1.447,1.447,0,0,1,1.526,1.54c.011,3.018,0,6.035,0,9.053v.813h.734c1.436,0,2.873-.007,4.312,0a3.518,3.518,0,0,1,.925.108,1.221,1.221,0,0,1,.94,1.179,1.205,1.205,0,0,1-.877,1.227,2.77,2.77,0,0,1-.854.139q-1.453.007-2.905.007Q-1887.568-2417.119-1889.333-2417.125Zm1.254-2.656h0Zm10.086-22.493c-3.518-1.75-7.013-3.552-10.512-5.338-.779-.4-.91-.84-.507-1.638q5-9.831,9.993-19.661a1.157,1.157,0,0,1,1.779-.567c3.364,1.738,6.759,3.428,10.124,5.166a11.865,11.865,0,0,1,6.6,9.392,2.136,2.136,0,0,1,.022.3v1.033c.123,4.308-2.827,10.418-8.982,12.093a12.589,12.589,0,0,1-3.325.462A11.554,11.554,0,0,1-1877.993-2442.274Zm11.664-15.458c-.291.142-.123.481-.086.739a9.919,9.919,0,0,1-5.341,10.377,2.6,2.6,0,0,0-.482.283.267.267,0,0,0-.026.433,2.435,2.435,0,0,0,2.32.527,5.479,5.479,0,0,0,.779-.393,10.035,10.035,0,0,0,5.009-8.53h0c-.038-.5-.075-.918-.1-1.332a2.006,2.006,0,0,0-1.4-1.944,2.181,2.181,0,0,0-.575-.181A.234.234,0,0,0-1866.329-2457.733Zm103.739,16.57a12.183,12.183,0,0,1-11.28-10.709,32.394,32.394,0,0,1-.112-3.242v-.026q-.011-.127-.011-.257v-9.624a2.9,2.9,0,0,1,2.9-2.9,2.9,2.9,0,0,1,2.9,2.9v9.624c0,.092,0,.184-.013.273,0,.653,0,1.306.009,1.958a6.436,6.436,0,0,0,4.8,6.147,6.453,6.453,0,0,0,8.114-6.166c.019-1.4,0-2.79,0-4.189,0-.139,0-.277.014-.414v-7.232a2.9,2.9,0,0,1,2.9-2.9,2.9,2.9,0,0,1,2.9,2.9v10.083a2.963,2.963,0,0,1-.016.3c-.017.908-.005,1.822-.107,2.722a12.209,12.209,0,0,1-12.16,10.779Q-1762.165-2441.134-1762.59-2441.163Zm-37.126-.325a4.546,4.546,0,0,1-3.943-4.517c.041-4.126.011-8.251.011-12.377a4.059,4.059,0,0,0-.011-.563.716.716,0,0,0-.713-.656.723.723,0,0,0-.757.675,4.707,4.707,0,0,0-.007.563c0,4.1-.007,8.21,0,12.313a4.414,4.414,0,0,1-1.134,3.089,4.481,4.481,0,0,1-4.849,1.242,4.531,4.531,0,0,1-3-4.145v-.186c0-4.6-.018-9.21.008-13.812a9.259,9.259,0,0,1,2-5.741,9.682,9.682,0,0,1,12.526-2.458,1,1,0,0,0,1.171.011,9.656,9.656,0,0,1,14.358,6.5,10.083,10.083,0,0,1,.172,1.861c.018,2.231.007,4.458.007,6.689l-.007,0c0,2.354.033,4.712-.012,7.065a4.306,4.306,0,0,1-2.805,4.141,4.452,4.452,0,0,1-6.161-3.98c-.022-.813-.008-1.626-.008-2.44v-10.187a4.389,4.389,0,0,0-.007-.5.726.726,0,0,0-.742-.694.721.721,0,0,0-.731.7,5.578,5.578,0,0,0-.008.563v12.19a4.694,4.694,0,0,1-.365,2.01,4.611,4.611,0,0,1-4.273,2.694A5.331,5.331,0,0,1-1799.716-2441.488Zm-52.278.038a5.162,5.162,0,0,1-.672-.064,1.732,1.732,0,0,1-1.242-2.67c.526-.951,1.093-1.884,1.637-2.824q5.865-10.055,11.724-20.113c.332-.567.668-1.13,1-1.7a1.833,1.833,0,0,1,2.193-.772,1.91,1.91,0,0,1,1.022.929c.515.866,1.019,1.735,1.522,2.6q6.311,10.827,12.623,21.658a2.029,2.029,0,0,1,.279,1.757,1.492,1.492,0,0,1-1.048,1.033,3.857,3.857,0,0,1-1.03.153q-6.35.018-12.7,0c-.175,0-.35-.025-.581-.04v-7.461h4.39a12.949,12.949,0,0,0-1.246-1.429c-.414-.459-.84-.9-1.261-1.354-.4-.437-.847-.977-1.306-1.478a.9.9,0,0,1,.318,0,1.119,1.119,0,0,0,.164.015c.516,0,1.032,0,1.549,0h1.163c.2,0,.391-.019.75-.041l-5.181-4.909c-1.719,1.63-3.39,3.212-5.065,4.8.018.045.037.089.056.134h3.413c.011.022.066.012.12,0s.1-.021.115,0c-1.186,1.354-2.641,2.753-3.823,4.107.019.045.038.086.056.13h4.245v7.494c-.186.015-.362.045-.541.045Zm-59.411-.008a13.956,13.956,0,0,1-13.861-14,13.967,13.967,0,0,1,13.947-13.918,13.972,13.972,0,0,1,13.958,13.973,13.962,13.962,0,0,1-14.029,13.943Zm.347-4.923a8.861,8.861,0,0,0,8.624-7.793h-17.781A8.912,8.912,0,0,0-1911.057-2446.381Zm73.771,4.882h.015v.013Zm-111.345-.082a4.452,4.452,0,0,1-3.894-3.145,6.074,6.074,0,0,1-.2-1.664c-.015-4.416-.007-8.836-.007-13.253a4.048,4.048,0,0,0-.015-.562.713.713,0,0,0-.682-.619.717.717,0,0,0-.761.6,3.864,3.864,0,0,0-.022.623q0,6.564-.007,13.13a6.806,6.806,0,0,1-.116,1.492,4.5,4.5,0,0,1-4.4,3.406,4.525,4.525,0,0,1-4.343-3.484,5.3,5.3,0,0,1-.07-1.056c0-4.625.044-9.255-.019-13.88a9.537,9.537,0,0,1,6.375-8.922,9.578,9.578,0,0,1,8.143.734c.179.1.362.206.586.332l-.008.008a9.731,9.731,0,0,1,3.73-1.489,9.626,9.626,0,0,1,11.362,9.426c-.007,4.626.012,9.251-.007,13.881a4.471,4.471,0,0,1-4.592,4.453,4.485,4.485,0,0,1-4.375-4.293c-.015-.25-.008-.5-.008-.75v-13a3.422,3.422,0,0,0-.022-.623.7.7,0,0,0-.712-.581.7.7,0,0,0-.709.581,3.868,3.868,0,0,0-.022.623v13.253a4.926,4.926,0,0,1-.522,2.414,4.6,4.6,0,0,1-4.164,2.392Q-1948.371-2441.557-1948.631-2441.58Z" transform="translate(1963.173 2469.697)" fill="#fff"/>
                                </svg>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-else class="flx-grow-1 flx column bg-white br-24 pd-24">
                    <div class="flx jc-sb ai-c">
                        <div>Villages</div>
                        <button v-if="is_super || is_sublevel_villages" @click="$store.commit('openModal', 'add-village')" class="button-outline rounded-outl btn-sm">Add new</button>
                    </div>
                    <admin-dash-villages v-if="is_super || is_sublevel_villages || is_sublevel2" />
                    <div v-else class="centered flx-grow-1">
                        <div>You don't have access to view this content</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import greetingMessage from '@/mixins/greetingMessage';
import usersLevelMixin from '@/mixins/usersLevelMixin';
import userNameMixin from '@/mixins/userNameMixin';
import { mapGetters, mapState } from 'vuex';
import DashNotificationCard from '@/components/layouts/DashNotificationCard.vue'
import StatusCardType1 from '@/components/includes/app/StatusCardType1.vue';
import StatusCardType2 from '@/components/includes/app/StatusCardType2.vue';
import DashWaitingList from '@/components/includes/app/DashWaitingList.vue';
import AdminDashVillages from '@/components/layouts/AdminDashVillages.vue';
import DashMessageCard from '@/components/layouts/DashMessageCard.vue';
export default {
    components: { DashNotificationCard, StatusCardType1, StatusCardType2, DashWaitingList, AdminDashVillages, DashMessageCard },
    name: 'AdminsDash',
    mixins: [userNameMixin, usersLevelMixin, greetingMessage],
    computed: {
        ...mapGetters(['getOngoingEvents', 'getUpcomingEvents', 'getPastEvents', 'getUser', 'getTodaysEvents', 'is_village', 'is_admin', 'getBanner1']),
        ...mapState({
            notifications: (state) => state.notifications,
            villages: (state) => state.villages,
            parents: (state) => state.parents,
            user: (state) => state.user,
            bookings: (state) => state.bookings,
            attendees: (state) => state.attendees,
            wait_lists: (state) => state.wait_lists,
        }),
        eventStatus() {
            if(this.getOngoingEvents.length || this.getUpcomingEvents.length || this.getPastEvents.length)
            return true
            else
            return false
        },
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
.empty-wrapper{
  container-type: inline-size;
}
.bg-img-banner{
  h2 {
    width: 70%
  }
  span {
    width: 80%;
  }
}
@container(inline-size <= 600px) {
  .bg-img-banner{
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 16px;
    position: relative;
      &::after{
      content: '';
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .caption, .banner-logo {
      z-index: 2;
    }
    h2, span {
        width: 100% !important
    }
  }
  
  
}
</style>