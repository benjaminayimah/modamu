<template>
    <router-link :to="{ name: 'Attendee', params: { id: kid.id, event: kid.event_id, parent: kid.user_id, name: kid.name } }" class="grid-item table-row">
        <div class="table-cell flx ai-c gap-8">
            <profile-avatar :id="kid.user_id" :image="kid.photo"/>
            <span>{{ kid.name }}</span>
        </div>
        <div class="table-cell flx ai-c">{{ calculateAge(kid.dob) }} years</div>
        <div class="table-cell flx jc-sb ai-c">
            <span class="gender-pill capitalize" :data-type="kid.gender">{{ kid.gender }}</span>
            <span class="ft-primary pd-0-20">
                View profile
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 5.715 10">
                    <path d="M1.533,10a.715.715,0,0,1-.505-1.22L4.808,5,1.028,1.22A.715.715,0,1,1,2.038.21L6.324,4.495a.715.715,0,0,1,0,1.011L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.818 0)" fill="#87a5ff"/>
                </svg>
            </span>
        </div>
        <div>
            <button @click.prevent="doAccept" class="button-primary gap-8">
                <spinner v-if="submitting" v-bind:size="20" v-bind:white="true" />
                 <span>{{ submitting ? 'Processing...' : 'Accept'}}</span>
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
            token: (state) => state.token
        })
    },
    props: ['kid'],
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
                const res = await postApi(this.hostname+'/api/accept-this-attendee?token='+this.token, { kid: this.kid.id, event: this.kid.event_id});
                console.log(res.data)
                this.$store.commit('updateWaitlist', res.data.attendee)
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

</style>