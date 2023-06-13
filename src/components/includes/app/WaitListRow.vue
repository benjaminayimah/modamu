<template>
    <router-link :to="{ name: 'Attendee', params: { id: attendee.id, name: attendee.kid_name } }" class="grid-item table-row">
        <div class="table-cell flx ai-c gap-8">
            <profile-avatar :id="attendee.user_id" :image="attendee.photo"/>
            <span class="wrap-text wrap-line-1 capitalize">{{ attendee.kid_name }}</span>
        </div>
        <div class="table-cell flx ai-c">
            <span class="wrap-text wrap-line-1">{{ calculateAge(attendee.dob) }}</span>
        </div>
        <div class="table-cell flx jc-sb ai-c">
            <span class="gender-pill capitalize" :data-type="attendee.gender">{{ computedGender }}</span>
            <span class="ft-primary pd-0-20 see-details">
                View profile
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 5.715 10">
                    <path d="M1.533,10a.715.715,0,0,1-.505-1.22L4.808,5,1.028,1.22A.715.715,0,1,1,2.038.21L6.324,4.495a.715.715,0,0,1,0,1.011L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.818 0)" fill="#87a5ff"/>
                </svg>
            </span>
        </div>
        <div>
            <button @click.prevent="doAccept" class="button-primary gap-8">
                <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 19.724 15.104">
                    <path d="M30.054,13.974l-1.612-1.658a.347.347,0,0,0-.256-.11h0a.333.333,0,0,0-.256.11L16.754,23.573l-4.067-4.067a.354.354,0,0,0-.513,0l-1.63,1.63a.365.365,0,0,0,0,.522l5.129,5.129a1.622,1.622,0,0,0,1.072.522,1.7,1.7,0,0,0,1.062-.5h.009L30.063,14.5A.392.392,0,0,0,30.054,13.974Z" transform="translate(-10.434 -12.206)" fill="#fff"/>
                </svg>
                <spinner v-if="submitting" v-bind:size="20" v-bind:white="true" />
                <span class="text">{{ submitting ? 'Processing...' : 'Accept'}}</span>
            </button>
        </div>
    </router-link>
</template>
<script>
import { mapState } from 'vuex'
import { postApi } from '@/api'
import formatDateTime from '@/mixins/formatDateTime'
import ProfileAvatar from './ProfileAvatar.vue'
import Spinner from '../Spinner.vue'
export default {
    components: { ProfileAvatar, Spinner },
    name: 'WaitListRow',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            device: (state) => state.device
        }),
        computedGender() {
            if(this.device == 'mobile')
            return this.attendee.gender.charAt(0)
            else
            return this.attendee.gender
        }
    },
    props: ['attendee'],
    mixins: [formatDateTime],
    data() {
        return {
            submitting: false,
        }
    },
    methods: {
        async doAccept() {
            this.startSpinner()
            try {
                const res = await postApi(this.hostname+'/api/accept-this-attendee?token='+this.token, { id: this.attendee.id});
                this.$store.commit('updateWaitlist', res.data)
                this.stopSpinner()
            } catch (error) {
                console.error(error);
                this.stopSpinner()
            }
        },
        startSpinner() {
            this.submitting = true
        },
        stopSpinner() {
            this.submitting = false
        }
    }
}
</script>
<style lang="scss" scoped>
$radius: 30px;
.table-row{
    .table-cell {
        background-color: var(--bg-white);
        &:first-child{
            border-top-left-radius: $radius;
            border-bottom-left-radius: $radius;
        }
        &:nth-child(3){
            border-top-right-radius: $radius;
            border-bottom-right-radius: $radius;
        }
    }
}
.bg-img{
    height: 42px;
    width: 42px;
}
a{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .see-details, .text{
        display: none
    }
    .table-row{
        button {
            margin-left: 8px
        }
    }

}
</style>