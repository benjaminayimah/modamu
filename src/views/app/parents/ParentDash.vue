<template>
    <section class="flx column gap-16">
      <div class="top-row flx gap-32">
        <div class="wl-sec flx column gap-40">
          <h1>Good day {{ computedFirstName(user.name) }},</h1>
          <div>At modamu we bring the fun to your kids easily so browse through our events catalogue close to you and begin the fun.</div>
          <button @click="goToEvents" class="button-secondary">See events close to you</button>
        </div>
        <div class="flx column flx-grow-1 gap-24 top-row-col-2">
          <div class="grid col-2 gap-24">
            <div class="flx-grow-1 stats-card bg-white pd-20 br-24">
              <div>Your kids</div>
            </div>
            <div class="flx-grow-1 pd-20 ft-white stats-card bg-dark br-24 column flx jc-sb">
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
        <div class="grid flx-grow-1 col-2 gap-32">
          <div class="flx-grow-1 pd-20 bg-white br-24">
            <div>Messages</div>
          </div>
          <div class="flx-grow-1 pd-20 bg-white br-24">
            <div>Notifications</div>
          </div>
        </div>
      </div>
      <div class="flx column flx-grow-1 gap-16">
        <h4>Ongoing events</h4>
        <div v-if="!events.length" class="centered h-100 flx-grow-1 bg-white br-24 pd-20">
          <div class="flx ai-c column gap-8">
            <h4>No ongoing events</h4>
            <div>Ongoing events would appear here</div>
          </div>
        </div>
        <div v-else class="gap-32 grid bottom-row flx-grow-1">
          <dash-event-list v-for="event in events.slice(0, 5)" :key="event.id"  :event="event"/>
        </div>
      </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import userNameMixin from '../../../mixins/userNameMixin';
import DashEventList from '../../../components/includes/app/DashEventList.vue';
import DashTodaysEventList from '@/components/includes/app/DashTodaysEventList.vue';
export default {
  components: { DashEventList, DashTodaysEventList },
    name: 'ParentDash',
    mixins: [userNameMixin],
    computed: {
      ...mapState({
        events: (state) => state.events,
        user: (state) => state.user,
      })
    },
    data () {
    return {
      topEvts: [
        {id: 1},
        {id: 2},
        {id: 3},
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
.top-row{
   flex-basis: 60%; 
}
.wl-sec{
  flex-basis: 20%;
}
h1 {
  font-size: 3.4rem;
}
.stats-card {
  height: 150px;
}
.top-row-col-2{
  max-width: 470px;
}
.i-pin::before {
  background-color: #fff;
}
.bottom-row{
  grid-template-columns: repeat(5, 1fr);
}
.button-secondary{
    width: 85%;
    min-width: 200px;
}
</style>