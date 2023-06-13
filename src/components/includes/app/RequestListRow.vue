<template>
    <router-link :to="{ name: 'Attendee', params: { id: attendee.id,  name: attendee.kid_name } }" class="grid-item table-row">
        <div class="table-cell flx ai-c gap-8">
            <profile-avatar :id="attendee.user_id" :image="attendee.photo" />
            <span class="wrap-text wrap-line-1 capitalize">{{ attendee.kid_name }}</span>
        </div>
        <div class="table-cell flx ai-c">
            <span class="wrap-text wrap-line-1">{{ calculateAge(attendee.dob )}}</span>
        </div>
        <div class="table-cell flx jc-sb ai-c">
            <span class="gender-pill capitalize" :data-type="attendee.gender">{{ computedGender }}</span>
        </div>
        <div class="flx jc-c">
            <button v-if="attendee.status != '3'" @click.prevent="doChecking" class="button-primary gap-8" :class="[{ 'check-out' : attendee.status == '2'}, { 'button-disabled' : computeCreating }]" :disabled="computeCreating ? true : false">
                <svg v-if="attendee.status == '0' && !computeCreating" xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 33 33">
                    <path d="M-3409.581-878.351a16.444,16.444,0,0,1-5.244-3.535,16.442,16.442,0,0,1-3.535-5.244,16.387,16.387,0,0,1-1.3-6.423,16.386,16.386,0,0,1,1.3-6.422,16.433,16.433,0,0,1,3.535-5.244,16.446,16.446,0,0,1,5.244-3.536,16.406,16.406,0,0,1,6.423-1.3,16.41,16.41,0,0,1,6.423,1.3,16.44,16.44,0,0,1,5.243,3.536,16.435,16.435,0,0,1,3.536,5.244,16.4,16.4,0,0,1,1.3,6.422,16.4,16.4,0,0,1-1.3,6.423,16.445,16.445,0,0,1-3.536,5.244,16.437,16.437,0,0,1-5.243,3.535,16.394,16.394,0,0,1-6.423,1.3A16.391,16.391,0,0,1-3409.581-878.351ZM-3412.7-903.1a13.412,13.412,0,0,0-3.954,9.545,13.412,13.412,0,0,0,3.954,9.546,13.412,13.412,0,0,0,9.546,3.954,13.411,13.411,0,0,0,9.545-3.954,13.413,13.413,0,0,0,3.955-9.546,13.413,13.413,0,0,0-3.955-9.545,13.412,13.412,0,0,0-9.545-3.955A13.413,13.413,0,0,0-3412.7-903.1Zm8.485,16.606a1.5,1.5,0,0,1,0-2.121l3.439-3.439h-8.378a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h8.379l-3.44-3.44a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l6,6,.008.008.01.011.016.017.009.009.018.02,0,0a1.489,1.489,0,0,1,.257.407l0,.006.01.025.006.016.006.016.008.023,0,.009.009.027,0,.006.009.03v0l.01.033h0c.006.022.011.045.017.068v0l.006.031v.005c0,.009,0,.019.005.028l0,.009,0,.024,0,.022v.011a1.5,1.5,0,0,1-.427,1.251l-6,6a1.494,1.494,0,0,1-1.06.44A1.5,1.5,0,0,1-3404.219-886.494Z" transform="translate(3419.658 910.054)" fill="#fff"/>
                </svg>
                <svg v-else-if="attendee.status == '2' && !computeCreating" xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 33.004 33.004">
                    <path d="M-3396.735-878.351a16.443,16.443,0,0,0,5.244-3.535,16.446,16.446,0,0,0,3.535-5.244,16.382,16.382,0,0,0,1.3-6.423,16.381,16.381,0,0,0-1.3-6.422,16.422,16.422,0,0,0-3.535-5.244,16.446,16.446,0,0,0-5.244-3.536,16.409,16.409,0,0,0-6.423-1.3,16.411,16.411,0,0,0-6.423,1.3,16.44,16.44,0,0,0-5.243,3.536,16.437,16.437,0,0,0-3.535,5.244,16.394,16.394,0,0,0-1.3,6.422,16.4,16.4,0,0,0,1.3,6.423,16.453,16.453,0,0,0,3.536,5.244,16.442,16.442,0,0,0,5.243,3.535,16.392,16.392,0,0,0,6.423,1.3A16.391,16.391,0,0,0-3396.735-878.351Zm3.119-24.749a13.411,13.411,0,0,1,3.954,9.545,13.412,13.412,0,0,1-3.954,9.546,13.411,13.411,0,0,1-9.546,3.954,13.412,13.412,0,0,1-9.545-3.954,13.411,13.411,0,0,1-3.955-9.546,13.412,13.412,0,0,1,3.955-9.545,13.413,13.413,0,0,1,9.545-3.955,13.413,13.413,0,0,1,9.545,3.955Zm-8.485,16.606a1.5,1.5,0,0,0,0-2.121l-3.439-3.439h8.378a1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5h-8.379l3.44-3.44a1.5,1.5,0,0,0,0-2.121,1.5,1.5,0,0,0-2.121,0l-6,6-.008.008-.01.011-.016.017-.009.009-.018.02h0a1.494,1.494,0,0,0-.257.407v.006l-.01.025-.006.016-.006.016-.008.023v.009l-.009.027v.006l-.009.03h0l-.01.033h0c-.006.022-.011.045-.017.068h0l-.006.031v.005a.057.057,0,0,1,0,.028v.066a1.5,1.5,0,0,0,.427,1.251l6,6a1.494,1.494,0,0,0,1.06.44,1.5,1.5,0,0,0,1.043-.431Z" transform="translate(3419.66 910.055)" fill="#fff"/>
                </svg>
                <spinner v-else-if="computeCreating" v-bind:size="20" v-bind:white="true" />
                <span class="text">
                    {{ attendee.status == '0' ? 'Drop off' : 'Pick up' }}
                </span>
            </button>
            <button v-else @click.prevent="" class="button-primary button-disabled gap-8" disabled="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 19.724 15.104">
                    <path d="M30.054,13.974l-1.612-1.658a.347.347,0,0,0-.256-.11h0a.333.333,0,0,0-.256.11L16.754,23.573l-4.067-4.067a.354.354,0,0,0-.513,0l-1.63,1.63a.365.365,0,0,0,0,.522l5.129,5.129a1.622,1.622,0,0,0,1.072.522,1.7,1.7,0,0,0,1.062-.5h.009L30.063,14.5A.392.392,0,0,0,30.054,13.974Z" transform="translate(-10.434 -12.206)" fill="#fff"/>
                </svg>
                <span class="text">Picked up</span>
            </button>
        </div>
    </router-link>
</template>
<script>
import { mapState } from 'vuex';
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue'
import Spinner from '../Spinner.vue';
export default {
    components: { ProfileAvatar, Spinner },
    name: 'RequestListRow',
    mixins: [formatDateTime],
    props: ['attendee', 'creating'],
    computed: {
        ...mapState ({
            device: (state) => state.device,
        }),
        computedGender() {
            if(this.device == 'mobile')
            return this.attendee.gender.charAt(0)
            else
            return this.attendee.gender
        },
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
.bg-img {
    height: 42px;
    width: 42px;
}
a{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .text{
        display: none
    }
    .table-row{
        button {
            margin-left: 8px
        }
    }

}
</style>