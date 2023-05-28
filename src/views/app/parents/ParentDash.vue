<template>
    <section class="flx column gap-16 dashboard-main">
      <div class="top-row grid gap-32">
        <div class="wl-sec flx column gap-40">
          <h1 class="wrap-text wrap-line-2">Good day {{ computedFirstName(user.name) }},</h1>
          <div>At modamu we bring the fun to your kids easily so browse through our events catalogue close to you and begin the fun.</div>
          <button @click="goToEvents" class="button-secondary">See events close to you</button>
        </div>
        <div class="flx column gap-24 top-row-col-2">
          <div class="grid col-2 gap-24">
            <div class="stats-card bg-white pd-20 br-24">
              <div class="mb-24 flx ai-c jc-sb">
                  Your kids
                  <router-link to="/profile" class="gray fs-09 see-all">See all</router-link>
              </div>
              <div v-if="!kids.length">
                <button class="add-kid br-50 pd-0">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 20 20">
                      <path d="M-3266.055-837.995a1.029,1.029,0,0,1-1.021-1.034l.048-7.944-7.944-.048a1.028,1.028,0,0,1-1.022-1.034,1.028,1.028,0,0,1,1.034-1.021l7.944.048.048-7.944a1.028,1.028,0,0,1,1.034-1.021,1.027,1.027,0,0,1,1.021,1.034l-.048,7.944,7.945.048a1.029,1.029,0,0,1,1.021,1.034,1.028,1.028,0,0,1-1.034,1.022l-7.944-.048-.048,7.944a1.03,1.03,0,0,1-1.03,1.022Z" transform="translate(3275.994 857.994)" fill="#000"/>
                  </svg>
                </button>
              </div>
              <div v-else class="stack-cards flx">
                  <profile-avatar v-for="kid in kids.slice(0, 4)" :key="kid.id" :id="kid.user_id" :image="kid.photo" />
                  <span v-if="kids.length > 4" class="centered count bg-img br-24">+{{ kids.length - 4 }}</span>
              </div>
            </div>
            <div class="pd-20 ft-white stats-card bg-dark br-24 column flx jc-sb">
              <div class="flx gap-8 ai-c">
                <i class="br-50 i-pin centered flx-shrink-0"></i>
                Upcoming events
              </div>
              <div class="flx ai-c jc-sb">
                <div class="fw-700 fs-2r">{{ getUpcomingEvents.length }}</div>
                <span class="uppercase ft-light fs-08">this week</span>
              </div>
            </div>
          </div>
          <div class="flx column flx-grow-1 gap-16">
              <h4>Today's top events</h4>
              <!-- <div class="flx-grow-1 bg-white centered br-24 pd-20" v-if="!events.length">No event found</div> -->
              <div class="flx flx-grow-1 column jc-sb gap-16">
                <dash-todays-event-list v-for="event in getTodaysEvents.slice(0, 3)" :key="event.id" :event="event" />
                <a href="#" v-if="getTodaysEvents.length < 3" class="flx-grow-1 bg-white br-16 centered pd-16">Explore events</a>
              </div>
            </div>
        </div>
        <dash-msg-and-noti />
      </div>
      <div class="flx column flx-grow-1 gap-16">
        <h4>Upcoming events</h4>
        <div class="gap-32 flx bottom-row flx-grow-1 overflow-x-scroll scroll-hidden scroll-snap">
          <dash-event-list class="event-list" v-for="event in events.slice(0, 10)" :key="event.id"  :event="event"/>
          <div class="explore-banner bg-white br-24 centered pd-16">
            Explore more
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import userNameMixin from '../../../mixins/userNameMixin';
import DashEventList from '../../../components/includes/app/DashEventList.vue';
import DashTodaysEventList from '@/components/includes/app/DashTodaysEventList.vue';
import DashMsgAndNoti from '@/components/layouts/DashMsgAndNoti.vue';
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue';
export default {
    components: { DashEventList, DashTodaysEventList, DashMsgAndNoti, ProfileAvatar },
    name: 'ParentDash',
    mixins: [userNameMixin],
    computed: {
      ...mapGetters(['getUpcomingEvents', 'getOngoingEvents', 'getTodaysEvents']),
      ...mapState({
        events: (state) => state.events,
        user: (state) => state.user,
        kids: (state) => state.kids
    })
  },
  methods: {
    goToEvents() {
      this.$router.push({ name: 'EventsNear' })
    }
  }
}
</script>
<style lang="scss" scoped>
section {
  padding: 32px 0;
  height: calc(100vh - 108px);
}
.top-row {
  grid-template-columns: .5fr .8fr 1fr;
}
h1 {
  font-size: 3.4rem;
}
.stats-card {
  height: 150px;
  min-width: 170px;
}
.i-pin::before {
  background-color: #fff;
}

.bottom-row, .explore-banner{
  .event-list{
    min-width: 230px;
    min-height: 230px;
  }
}
.button-secondary{
    width: 85%;
    min-width: 200px;
}
button.add-kid {
  height: 48px;
  width: 48px;
}
.stack-cards {
    --height: 48px;
    .bg-img{
        height: var(--height);
        width: var(--height);
        border: 2px solid var(--bg-white);
    }
}
</style>