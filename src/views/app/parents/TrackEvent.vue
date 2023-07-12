<template>
    <section class="section-main">
        <div class="title-row">
            <router-link to="" @click.prevent="$router.go(-1)" class="flx ai-c gap-8 mb-16 ft-primary">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#0173FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                Back
            </router-link>
            <div>
                <h1 class="title">Track kids</h1>
                <span class="gray">Keep updates on your kids</span>
            </div>
        </div>
        <div class="pd-24 bd-dashed br-16 text-center">
                <div>{{ computedStatus }}</div>
                <div v-if="booking.kids_status == 0">
                    <span>Ready? </span><router-link :to="{ name: 'ParentVerifyCode' }">Drop them off</router-link>
                </div>
        </div>
        <div class="flx gap-16 column mt-32">
            <div class="track-event-list flx column gap-24 bg-white br-24">
                <div v-if="attendees.length > 0" class="gray fs-09">Your kids in this event</div>
                <div v-else class="fs-09">Your kids have been picked-up and deleted</div>
                <div class="stack-cards">
                    <!-- <button class="del-btn btn-sm" v-if="attendees.length == 0" @click="$store.dispatch('deleteRegistered', booking.id)">Delete this card</button> -->
                    <profile-avatar class="attendees" v-for="kid in attendees.slice(0, 5)" :key="kid.id" :id="kid.user_id" :image="kid.photo" />
                    <span v-if="attendees.length > 5" class="counter bg-img flx jc-c">+{{ attendees.length - 5 }}</span>
                </div>
                <div class="flx jc-sb gap-8">
                    <div>
                        <div class="gray mb-8 fs-09">Event name</div>
                        <div><strong>{{ event.event_name }}</strong></div>
                    </div>
                    <div>
                        <div class="gray mb-8 fs-09">Address</div>
                        <div><strong>{{ event.address }}</strong></div>
                    </div>
                    <div>
                        <div class="gray mb-8 fs-09">Starts</div>
                        <div><strong>{{ format_time(event.start_time) }}</strong></div>
                    </div>
                    <div>
                        <div class="gray mb-8 fs-09">Ends</div>
                        <div><strong>{{ format_time(event.end_time) }}</strong></div>
                    </div>
                </div>
            </div>
            <div>Track</div>
            <div>
                <h4 class="mb-16">Session progress</h4>
                <div class="flx gap-24">
                    <div class="session" :class="{ 'active' : booking.kids_status != '0'}">
                        <i class="centered br-50 mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 18.213 13.126">
                                <path d="M-1975.554,13.126a2.5,2.5,0,0,1-2.5-2.5,2.583,2.583,0,0,1,.013-.265h-5.027a2.622,2.622,0,0,1,.013.265,2.5,2.5,0,0,1-2.5,2.5,2.5,2.5,0,0,1-2.5-2.5,2.593,2.593,0,0,1,.014-.265h-1.232v-3.7h3.705V4.775H-1990v-1.4h5.432v-1.7H-1990V0h12.632V1.453h2.526a.849.849,0,0,1,.747.446l2.2,4.075a.852.852,0,0,1,.054.689h.012v3.7h-1.245a2.6,2.6,0,0,1,.014.265A2.5,2.5,0,0,1-1975.554,13.126Zm0-3.5a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0-1975.555,9.625Zm-10,0a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0-1985.555,9.625Zm8.35-6.473V5.528h3.142l-1.285-2.375Z" transform="translate(1990)" fill="#D6E0F7"/>
                            </svg>
                        </i>
                        <span>Dropped off</span>
                    </div>
                    <div class="session" :class="{ 'active' : booking.kids_status == '2' || booking.kids_status == '3'}">
                        <i class="br-50 centered mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.144 16">
                                <path d="M-1986.572,16A3.432,3.432,0,0,1-1990,12.572v-8h17.144v8A3.433,3.433,0,0,1-1976.286,16Zm5.144-4.147,2.107,1.5a.329.329,0,0,0,.178.065.256.256,0,0,0,.159-.07.286.286,0,0,0,.1-.321l-.829-2.409,2.142-1.536.051-.045a.3.3,0,0,0,.093-.191.3.3,0,0,0-.3-.285h-2.627l-.8-2.382a.281.281,0,0,0-.271-.189.283.283,0,0,0-.271.189l-.8,2.382h-2.645a.286.286,0,0,0-.286.285.171.171,0,0,0,.006.048.272.272,0,0,0,.119.2l2.159,1.522-.829,2.409a.284.284,0,0,0,.1.321.266.266,0,0,0,.16.07.352.352,0,0,0,.179-.065l2.106-1.5h0ZM-1990,3.428A3.428,3.428,0,0,1-1986.572,0h10.286a3.429,3.429,0,0,1,3.429,3.428Z" transform="translate(1990)" fill="#D6E0F7"/>
                            </svg>
                        </i>
                        <span>In event</span>
                    </div>
                    <div class="session" :class="{ 'active' : booking.kids_status == '3'}">
                        <i class="br-50 centered mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 19.724 15.104">
                                <path d="M30.054,13.974l-1.612-1.658a.347.347,0,0,0-.256-.11h0a.333.333,0,0,0-.256.11L16.754,23.573l-4.067-4.067a.354.354,0,0,0-.513,0l-1.63,1.63a.365.365,0,0,0,0,.522l5.129,5.129a1.622,1.622,0,0,0,1.072.522,1.7,1.7,0,0,0,1.062-.5h.009L30.063,14.5A.392.392,0,0,0,30.054,13.974Z" transform="translate(-10.434 -12.206)" fill="#d6e0f7"/>
                            </svg>
                        </i>
                        <span class="text-ellipsis">Picked up</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import formatDateTime from '@/mixins/formatDateTime'
import { getApi } from '@/api'
import { mapState } from 'vuex'
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'TrackEvent',
    mixins: [formatDateTime],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
        computedStatus() {
            let status
            if(this.booking.kids_status == 0) {
                status = 'Your kid(s) have not been dropped off at this event yet.'
            }else if(this.booking.kids_status == 3) {
                status = 'Your kids have been picked up from this village.'
            }else {
                status = 'Your kids have been dropped off at the event village. Use the unique code generated when you\'re ready to pick them up. This can be found under the \'Verify code\' menu.'
            }
            return status
        }
    },
    data () {
        return {
            attendees: [],
            booking: '',
            event: ''
        }
    },
    methods: {
        async fetchThisRegisteredEvent() {
            try {
                const res = await getApi(this.hostname+'/api/fetch-this-registered-event/'+this.$route.params.id + '?token='+this.token)
                this.attendees = res.data.attendees
                this.booking = res.data.booking
                this.event = res.data.event
                this.$store.commit('stopLoader')
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        }
    },
    mounted() {
        this.$store.commit('startLoader')
        this.fetchThisRegisteredEvent()
    }
}
</script>

<style lang="scss" scoped>
$height: 60px;
section {
    padding: $profileSecPadding 0;
}
.track-event-list{
    width: 600px;
    padding: 24px;
}
.bd-dashed{
    width: 600px;
    a {
        color: var(--primary-color);
        &:hover {
            text-decoration: underline;
        }
    }
}
.bg-img {
    height: $height;
    width: $height;
}
.attendees{
    border: 1px solid #fff;
}
.counter{
    background-color: #fff;
    height: $height;
    width: $height;
    display: flex;
    align-items: center;
    border-radius: 60px;
    border: 1px solid var(--bg-color);
}


.session{
    display: flex;
    flex-direction: column;
    i {
        height: 50px;
        width: 50px;
        background-color: #8da9ea;
    }
}
.active{
    i {
        background-color: var(--primary-color) !important;
    }
    path {
        fill: #fff;
    }
    &::after {
        border-color: var(--primary-color) !important;
    }
}
.session:first-child::after, .session:nth-child(2):after {
    content: '';
    width: 180px;
    top: -50px;
    margin-left: 72px;
    display: inline-block;
    position: relative;
    border-bottom: 1px dashed #b0c4f3
}
</style>