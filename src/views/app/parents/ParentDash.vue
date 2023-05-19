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
                  <a href="" class="gray fs-09 see-all">See all</a>
              </div>
              <div class="stack-cards relative">
                  <profile-avatar v-for="kid in kids" :key="kid.id" :id="null" :image="null" class="absolute" />
                  <span class="fw-700 counter br-24">+2</span>
              </div>
            </div>
            <div class="pd-20 ft-white stats-card bg-dark br-24 column flx jc-sb">
              <div class="flx gap-8 ai-c">
                <i class="br-50 i-pin centered flx-shrink-0"></i>
                Upcoming events
              </div>
              <div class="flx ai-c jc-sb">
                <div class="fw-700 fs-2r">234</div>
                <span class="uppercase ft-light fs-08">this week</span>
              </div>
            </div>
          </div>
          <div class="flx column flx-grow-1 gap-16">
              <h4>Today's top events</h4>
              <div class="flx-grow-1 bg-white centered br-24" v-if="!events.length">No event found</div>
              <div class="flx flx-grow-1 column jc-sb gap-16" v-else>
                <dash-todays-event-list v-for="event in events.slice(0, 3)" :key="event.id" :event="event" />
              </div>
            </div>
        </div>
        <dash-msg-and-noti />
      </div>
      <div class="flx column flx-grow-1 gap-16">
        <h4>Ongoing events</h4>
        <div v-if="!events.length" class="centered h-100 flx-grow-1 bg-white br-24 pd-20">
          <div class="flx ai-c column gap-8">
            <h4>No ongoing events</h4>
            <div>Ongoing events would appear here</div>
          </div>
        </div>
        <div v-else class="gap-32 flx bottom-row flx-grow-1 overflow-x-scroll scroll-hidden scroll-snap">
          <dash-event-list class="event-list" v-for="event in events.slice(0, 10)" :key="event.id"  :event="event"/>
        </div>
      </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import userNameMixin from '../../../mixins/userNameMixin';
import DashEventList from '../../../components/includes/app/DashEventList.vue';
import DashTodaysEventList from '@/components/includes/app/DashTodaysEventList.vue';
import DashMsgAndNoti from '@/components/includes/app/DashMsgAndNoti.vue';
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue';
export default {
    components: { DashEventList, DashTodaysEventList, DashMsgAndNoti, ProfileAvatar },
    name: 'ParentDash',
    mixins: [userNameMixin],
    computed: {
      ...mapState({
        events: (state) => state.events,
        user: (state) => state.user,
    })
  },
  data() {
    return {
      kids: [
          {id: 1},
          {id: 2},
          {id: 3}
      ]
    }
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

.bottom-row{
  .event-list{
    min-width: 230px;
    min-height: 230px;
  }
}
.button-secondary{
    width: 85%;
    min-width: 200px;
}
.stack-cards {
    --height: 48px;
    height: var(--height);
    .bg-img{
        height: var(--height);
        width: var(--height);
        border: 2px solid var(--bg-white);
        &:nth-child(2) {
            transform: translateX(30px);
        }
        &:nth-child(3) {
            transform: translateX(60px);
        }
    }
    .counter{
        transform: translateX(90px);
        background-color: var(--bg-white);
        display: inline-block;
        padding: 15px;
    }
}
</style>