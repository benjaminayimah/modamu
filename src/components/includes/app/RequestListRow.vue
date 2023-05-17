<template>
    <router-link :to="{ name: 'Attendee', params: { id: kid.id, event: kid.event_id, parent: kid.user_id, name: kid.name } }" class="grid-item table-row">
        <div class="table-cell flx ai-c gap-8">
            <profile-avatar :id="kid.user_id" :image="kid.photo" />
            <span class="wrap-text wrap-line-1">{{ kid.name }}</span>
        </div>
        <div class="table-cell flx ai-c">
            <span class="wrap-text wrap-line-1">{{ calculateAge(kid.dob )}} years</span>
        </div>
        <div class="table-cell flx jc-sb ai-c">
            <span class="gender-pill capitalize" :data-type="kid.gender">{{ computedGender }}</span>
        </div>
        <div class="flx jc-c">
            <button v-if="kid.status != '3'" @click.prevent="doChecking" class="button-primary gap-8" :class="{ 'check-out' : kid.status == '2'}">
                <svg v-if="kid.status == '0'" xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 33 33">
                    <path d="M-3409.581-878.351a16.444,16.444,0,0,1-5.244-3.535,16.442,16.442,0,0,1-3.535-5.244,16.387,16.387,0,0,1-1.3-6.423,16.386,16.386,0,0,1,1.3-6.422,16.433,16.433,0,0,1,3.535-5.244,16.446,16.446,0,0,1,5.244-3.536,16.406,16.406,0,0,1,6.423-1.3,16.41,16.41,0,0,1,6.423,1.3,16.44,16.44,0,0,1,5.243,3.536,16.435,16.435,0,0,1,3.536,5.244,16.4,16.4,0,0,1,1.3,6.422,16.4,16.4,0,0,1-1.3,6.423,16.445,16.445,0,0,1-3.536,5.244,16.437,16.437,0,0,1-5.243,3.535,16.394,16.394,0,0,1-6.423,1.3A16.391,16.391,0,0,1-3409.581-878.351ZM-3412.7-903.1a13.412,13.412,0,0,0-3.954,9.545,13.412,13.412,0,0,0,3.954,9.546,13.412,13.412,0,0,0,9.546,3.954,13.411,13.411,0,0,0,9.545-3.954,13.413,13.413,0,0,0,3.955-9.546,13.413,13.413,0,0,0-3.955-9.545,13.412,13.412,0,0,0-9.545-3.955A13.413,13.413,0,0,0-3412.7-903.1Zm8.485,16.606a1.5,1.5,0,0,1,0-2.121l3.439-3.439h-8.378a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h8.379l-3.44-3.44a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l6,6,.008.008.01.011.016.017.009.009.018.02,0,0a1.489,1.489,0,0,1,.257.407l0,.006.01.025.006.016.006.016.008.023,0,.009.009.027,0,.006.009.03v0l.01.033h0c.006.022.011.045.017.068v0l.006.031v.005c0,.009,0,.019.005.028l0,.009,0,.024,0,.022v.011a1.5,1.5,0,0,1-.427,1.251l-6,6a1.494,1.494,0,0,1-1.06.44A1.5,1.5,0,0,1-3404.219-886.494Z" transform="translate(3419.658 910.054)" fill="#fff"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 21.873 21.874">
                    <path d="M-3304.661-753.554a7.255,7.255,0,0,1-3.337-1.3c-1.5-1.192-2.091-3.155-2.091-7s.586-5.812,2.091-7a7.235,7.235,0,0,1,3.337-1.3l.047-.008a5.439,5.439,0,0,1,1.619-3.514,5.485,5.485,0,0,1,3.842-1.385,5.485,5.485,0,0,1,3.842,1.385,5.434,5.434,0,0,1,1.619,3.514l.048.008a7.237,7.237,0,0,1,3.337,1.3c1.5,1.192,2.091,3.154,2.091,7s-.586,5.811-2.091,7a7.256,7.256,0,0,1-3.337,1.3,32.8,32.8,0,0,1-5.508.35A32.808,32.808,0,0,1-3304.661-753.554Zm.316-14.821a5.652,5.652,0,0,0-2.522.94c-.994.787-1.4,2.4-1.4,5.574s.406,4.786,1.4,5.574a5.653,5.653,0,0,0,2.522.939,31.06,31.06,0,0,0,5.193.323,31.059,31.059,0,0,0,5.192-.323,5.653,5.653,0,0,0,2.522-.939c.994-.787,1.4-2.4,1.4-5.574s-.406-4.787-1.4-5.574a5.652,5.652,0,0,0-2.522-.94,31.17,31.17,0,0,0-5.192-.322A31.171,31.171,0,0,0-3304.345-768.375Zm2.6-3.988a3.489,3.489,0,0,0-1,1.96c1.01-.079,2.19-.117,3.593-.117s2.581.038,3.591.117a3.482,3.482,0,0,0-1-1.96,3.655,3.655,0,0,0-2.595-.892A3.657,3.657,0,0,0-3301.747-772.363Zm1.683,13.691V-760.5h-1.823a.912.912,0,0,1-.912-.912.912.912,0,0,1,.912-.911h1.823v-1.822a.911.911,0,0,1,.912-.911.911.911,0,0,1,.912.911v1.822h1.823a.911.911,0,0,1,.911.911.912.912,0,0,1-.911.912h-1.823v1.824a.912.912,0,0,1-.912.912A.912.912,0,0,1-3300.064-758.672Z" transform="translate(3310.088 775.077)" fill="#fff"/>
                </svg>
                <span class="text">
                    {{ kid.status == '0' ? 'Check in' : 'Check out' }}
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
export default {
    components: { ProfileAvatar },
    name: 'RequestListRow',
    mixins: [formatDateTime],
    props: ['kid'],
    computed: {
        ...mapState ({
            device: (state) => state.device
        }),
        computedGender() {
            if(this.device == 'mobile')
            return this.kid.gender.charAt(0)
            else
            return this.kid.gender
        }
    },
    methods: {
        doChecking() {
            const payload = { id: this.kid.id, event: this.kid.event_id}
            this.kid.status == '0' ? this.$emit('check-in', payload) : this.verifyCode()
        },
        async verifyCode(){
            await this.$store.commit('setTempUser', this.kid)
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