<template>
    <section>
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
        <div class="flx gap-50 select-kids-body">
            <div class="select-kids-container flx column gap-32">
                <booking-select-kids-list v-for="kid in kids" :key="kid.id" :kid="kid" :selected="selected" @emmitSelect="doSelection"/>
            </div>
            <div class="payment-calc flx-end column flx">
                <div class="payment-calc-container flx gap-16 column br-24 bg-white">
                    <div class="flx jc-sb ai-c">
                        <h4>Amount to be paid</h4>
                        <span class="price br-24">Price per child $100</span>
                    </div>
                    <div class="flx jc-sb total-row br-16">
                        <label for="total"><strong>${{ event.amount * selected.length }}</strong></label>
                        <span id="total">Total amount</span>
                    </div>
                    <button class="button-primary w-100">Make payment</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import BookingSelectKidsList from '../../../components/includes/app/BookingSelectKidsList.vue';
export default {
  components: { BookingSelectKidsList },
    name: 'BookingSelectKids',
    computed: {
        ...mapState({
            kids: (state) => state.kids,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
        })
    },
    data() {
        return {
            selected: [],
            error: false,
            event: {
                amount: 100
            }
        }
    },
    methods: {
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
            // this.selected ? this.$router.push({ name: 'AddPayment', params: { name: this.selected.name }}) : this.errorMsg()
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
    height: calc(100vh - 248px);
}
.select-kids-container{
    height: 100%;
    flex-basis: 300px;
    padding: 20px 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
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
</style>