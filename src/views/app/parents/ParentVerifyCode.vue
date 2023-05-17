<template>
    <section>
        <div class="title-row">
            <h1 class="title mb-24">Verify & checkout</h1>
            <div class="flx ai-c gap-16">
                <h4>Registered kids</h4>
                <span class="count-info count-primary">{{ attendees.length }}</span>
            </div>
        </div>
        <div v-if="!attendees.length" class="centered bg-white br-16 pd-32" >
            <h4 class="mb-16">No Kid is Registered</h4>
            <div>Your registered kids would appear here.</div>
        </div>
        <div v-else class="body-container">
            <div class="grid col-2 gap-70">
                <parent-checkout-list v-for="kid in attendees" :key="kid.id" :kid="kid" @check-in="checkIn" />
            </div>
        </div>
    </section>
</template>
<script>
import { postApi, getApi } from '@/api';
import { mapState } from 'vuex';
import ParentCheckoutList from '@/components/includes/app/ParentCheckoutList.vue';
export default {
    components: { ParentCheckoutList },
    name: 'ParentVerifyCode',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            attendees: (state) => state.attendees
        })
    },
    methods: {
        async fetchAttendees() {
            try {
                const res = await getApi(this.hostname+'/api/parent-fetch-attendees?token='+this.token);
                this.$store.commit('setAttendees', res.data.attendees)
            } catch (error) {
                console.error(error);
            }
        },
        async checkIn(payload) {
            try {
                const res = await postApi(this.hostname+'/api/check-in-kid?token='+this.token, payload)
                this.$store.commit('updateAttendees', res.data)
            } catch (error) {
                console.error(error);
            }
        }
    },
    created() {
        this.fetchAttendees()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.body-container{
    width: 600px;
}

</style>