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
                <h1 class="title">Select kids</h1>
                <span class="gray">Select kids you want to attend this event</span>
            </div>
        </div>
        <div v-if="completed" class="flx jc-c">
            <div class="main-content-card completed-card flx column ai-c">
                <completed-anime />
                <div class="flx column ai-c gap-24">
                    <h2>{{ successTitle }}</h2>
                    <div class="text-center comp-text">
                        {{ successMsg }}
                    </div>
                    <button @click="goToEvent" class="button-primary w-100">Track event</button>
                </div>
            </div>
        </div>
        <div v-else class="flx gap-50 select-kids-body row-column">
            <div class="select-kids-container flx column gap-32 scroll-snap overflow-y-scroll scroll-hidden">
                <booking-select-kids-list v-for="kid in kids" :key="kid.id" :kid="kid" :selected="selected" @emmitSelect="doSelection"/>
            </div>
            <div class="payment-calc flx-end column flx">
                <div class="payment-calc-container flx gap-16 column br-24 bg-white">
                    <span v-if="error" class="input-error">Make a selection first</span>
                    <div class="flx jc-sb ai-c">
                        <h4>Amount to be paid</h4>
                        <span class="price br-24">Price per child ${{ $route.params.event_price }}</span>
                    </div>
                    <div class="flx jc-sb total-row br-16">
                        <label for="total"><strong>${{ $route.params.event_price * selected.length }}</strong></label>
                        <span id="total">Total amount</span>
                    </div>
                    <button @click="makePayment" class="button-primary w-100">
                        Make payment
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import BookingSelectKidsList from '../../../components/includes/app/BookingSelectKidsList.vue';
import CompletedAnime from '@/components/includes/CompletedAnime.vue';
export default {
  components: { BookingSelectKidsList, CompletedAnime },
    name: 'BookingSelectKids',
    computed: {
        ...mapState({
            kids: (state) => state.kids,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            appHostname: (state) => state.appHostname
        })
    },
    data() {
        return {
            selected: [],
            error: false,
            completed: false,
            successTitle: '',
            successMsg: ''
        }
    },
    methods: {
        makePayment() {
            this.clrError ? this.clrError() : ''
            const url = this.appHostname + this.$router.currentRoute.value.path
            console.log(url)
            if(this.checkSelection()){
                axios.post(this.hostname + '/api/make-payment?token='+this.token, { event_name: 'New event', amount: this.selected.length * this.$route.params.event_price, url: url})
                .then((res) => {
                    console.log(res)
                    // this.completed = true
                    location.href = res.data
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        doSelection(payload) {
            this.clrError ? this.clrError() : ''
            const exists = this.selected.filter(id => id == payload)
            if (exists.length) {
                this.selected = this.selected.filter(id => id != payload)
            }else {
                this.selected.push(payload)
            }
        },
        submitSelected() {
            this.clrError ? this.clrError() : ''
            if(this.checkSelection()){
                axios.post(this.hostname + '/api/place-booking?token='+this.token, { selection: this.selected, village: this.$route.params.village, event_id: this.$route.params.event_id} )
                .then((res) => {
                    this.successTitle = res.data.title
                    this.successMsg = res.data.msg
                    this.completed = true
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        },

        checkSelection() {
            if(!this.selected.length) {
                this.errorMsg()
            }else
            return true
        },
        errorMsg() {
            this.error = true
        },
        clrError() {
            this.error = false
        },
        async fetchKids() {
            try {
                const res = await axios.post(this.hostname + '/api/fetch-kids?token=' + this.token)
                this.$store.commit('setKids', res.data.kids)
            } catch (error) {
                console.error('Error:', error);
            }
        },
        goToEvent() {
            this.$router.push({name: 'RegisteredEvents'})
        }
    },
    created() {
        this.fetchKids()
    },

}
</script>

<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}

.select-kids-body{
    height: calc(100vh - 268px);
}
.select-kids-container{
    height: 100%;
    flex-basis: 300px;
    padding: 20px 0;
}
.payment-calc{
    width: 600px;
}
.payment-calc-container{
    padding: 32px;
}
.total-row {
    padding: 20px 24px;
    background-color: var(--light-gray);
    label {
        font-size: 1.2rem;
    }
}
.input-error{
    font-size: 1rem;
}

</style>