<template>
<div>
    <div class="br-24 bg-white pd-24 mb-16 top-content centered">
        <div class="flx column ai-c gap-8">
            <profile-avatar :image="attendee.photo" :id="attendee.user_id"/>
            <div class="flx column ai-c">
                <div class="text-ellipsis capitalize">{{ attendee.kid_name }}</div>
                <div class="flx gap-4 gray age"><span>{{ calculateAge(attendee.dob) }}</span></div>
            </div>
            <div class="text-center" v-if="attendee.security_code">
                <div class="code fw-600">{{ attendee.security_code }}</div>
                <span class="gray fs-08 capitalize">({{ computedFirstName(attendee.kid_name) }}'s checkout code)</span>
            </div>
            <div class="text-center" v-else>
                <div>Awaiting drop off...</div>
                <span class="gray fs-08">A Pick-up code will be generated for your child upon drop off</span>
            </div>
        </div>
    </div>
    <div v-if="attendee.status == '3'" class="flx gap-8">
        <button @click.prevent="" class="button-primary button-disabled w-100 gap-8 btn-md" disabled="true">
            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 19.724 15.104">
                <path d="M30.054,13.974l-1.612-1.658a.347.347,0,0,0-.256-.11h0a.333.333,0,0,0-.256.11L16.754,23.573l-4.067-4.067a.354.354,0,0,0-.513,0l-1.63,1.63a.365.365,0,0,0,0,.522l5.129,5.129a1.622,1.622,0,0,0,1.072.522,1.7,1.7,0,0,0,1.062-.5h.009L30.063,14.5A.392.392,0,0,0,30.054,13.974Z" transform="translate(-10.434 -12.206)" fill="#fff"/>
            </svg>
            Picked up
        </button>
        <button @click="$store.dispatch('deleteAttendee', attendee.id)" class="del-btn btn-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.5 21">
                <path id="Path_44" data-name="Path 44" d="M-3568.023-836.575a6.145,6.145,0,0,1-1.2-2.411c-.266-.878-.493-1.9-.78-3.2l-.152-.686c-.69-3.1-.346-5.1,1.082-6.3a6.375,6.375,0,0,1,2.894-1.23,22.93,22.93,0,0,1,4.43-.345,22.933,22.933,0,0,1,4.431.345,6.39,6.39,0,0,1,2.894,1.23c1.427,1.2,1.771,3.2,1.082,6.3l-.151.684c-.287,1.3-.514,2.326-.78,3.2a6.145,6.145,0,0,1-1.2,2.411c-1.031,1.148-2.731,1.575-6.273,1.575S-3566.992-835.427-3568.023-836.575Zm2.189-12.115a4.815,4.815,0,0,0-2.116.857c-1.145.958-.832,3.072-.5,4.578q.08.355.152.686c.279,1.264.5,2.262.745,3.075a4.667,4.667,0,0,0,.829,1.75c.463.517,1.387.995,4.971.995s4.508-.478,4.971-.995a4.672,4.672,0,0,0,.828-1.75c.247-.815.467-1.812.746-3.074q.073-.332.152-.687c.7-3.146.051-4.119-.5-4.578a4.82,4.82,0,0,0-2.116-.857,21.307,21.307,0,0,0-4.085-.31A21.3,21.3,0,0,0-3565.834-848.69Zm6.709,8.44v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.874.874,0,0,1-3559.125-840.25Zm-3.5,0v-5.25a.876.876,0,0,1,.875-.876.876.876,0,0,1,.876.876v5.25a.875.875,0,0,1-.876.875A.875.875,0,0,1-3562.625-840.25Zm-3.517,0v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.875.875,0,0,1-3566.142-840.25Zm11.816-10.625a14.576,14.576,0,0,0-7.424-1.625c-3.911,0-6.362.943-7.4,1.611a.876.876,0,0,1-1.21-.264.875.875,0,0,1,.264-1.209,14.509,14.509,0,0,1,6.6-1.827v-.937a.875.875,0,0,1,.875-.875h1.751a.875.875,0,0,1,.875.875v.937a14.935,14.935,0,0,1,6.576,1.814.874.874,0,0,1,.3,1.2.875.875,0,0,1-.75.424A.869.869,0,0,1-3554.326-850.875Z" transform="translate(3570.5 856)" fill="#fff"/>
            </svg>
        </button>
    </div>
</div>
</template>

<script>
import userNameMixin from '@/mixins/userNameMixin'
import formatDateTime from '@/mixins/formatDateTime'
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'ParentCheckoutList',
    props: ['attendee', 'creating'],
    mixins: [formatDateTime, userNameMixin],
    computed: {
        computeCreating() {
            if(this.creating == this.attendee.id)
            return true
            else
            return false
        }
    },
    methods: {
        doChecking() {
            this.attendee.status == '0' ? this.$emit('check-in', this.attendee.id) : this.verifyCode()
        },
        async verifyCode(){
            await this.$store.commit('setTempUser', this.attendee)
            this.$store.commit('openModal', 'verify-code')
        },
    }
}
</script>

<style lang="scss" scoped>
.bg-img{
    height: 80px;
    width: 80px;
}
.code{
    font-size: 1.5rem;
    margin-top: 5px;
}
.age{
    margin-top: 3px;
    font-size: 0.9rem;
}
.top-content{
    min-height: 224px;
}
.del-btn{
    background-color: var(--warning);
}
</style>