<template>
<div>
    <div class="br-24 bg-white pd-24 mb-16 top-content centered">
        <div class="flx column ai-c gap-8">
            <profile-avatar :image="kid.photo" :id="kid.user_id"/>
            <div class="flx column ai-c">
                <div class="text-ellipsis">{{ kid.name }}</div>
                <div class="flx gap-4 gray age"><span>{{ calculateAge(kid.dob) }}</span><span>years old</span></div>
            </div>
            <div class="text-center" v-if="kid.security_code">
                <div class="code fw-600">{{ kid.security_code }}</div>
                <span class="gray fs-08">({{ computedFirstName(kid.name) }}'s checkout code)</span>
            </div>
        </div>
    </div>
    <button v-if="kid.status != '3'" @click.prevent="doChecking" class="button-primary w-100 gap-8" :class="{ 'check-out' : kid.status == '2'}">
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 21.873 21.874">
            <path d="M-3304.661-753.554a7.255,7.255,0,0,1-3.337-1.3c-1.5-1.192-2.091-3.155-2.091-7s.586-5.812,2.091-7a7.235,7.235,0,0,1,3.337-1.3l.047-.008a5.439,5.439,0,0,1,1.619-3.514,5.485,5.485,0,0,1,3.842-1.385,5.485,5.485,0,0,1,3.842,1.385,5.434,5.434,0,0,1,1.619,3.514l.048.008a7.237,7.237,0,0,1,3.337,1.3c1.5,1.192,2.091,3.154,2.091,7s-.586,5.811-2.091,7a7.256,7.256,0,0,1-3.337,1.3,32.8,32.8,0,0,1-5.508.35A32.808,32.808,0,0,1-3304.661-753.554Zm.316-14.821a5.652,5.652,0,0,0-2.522.94c-.994.787-1.4,2.4-1.4,5.574s.406,4.786,1.4,5.574a5.653,5.653,0,0,0,2.522.939,31.06,31.06,0,0,0,5.193.323,31.059,31.059,0,0,0,5.192-.323,5.653,5.653,0,0,0,2.522-.939c.994-.787,1.4-2.4,1.4-5.574s-.406-4.787-1.4-5.574a5.652,5.652,0,0,0-2.522-.94,31.17,31.17,0,0,0-5.192-.322A31.171,31.171,0,0,0-3304.345-768.375Zm2.6-3.988a3.489,3.489,0,0,0-1,1.96c1.01-.079,2.19-.117,3.593-.117s2.581.038,3.591.117a3.482,3.482,0,0,0-1-1.96,3.655,3.655,0,0,0-2.595-.892A3.657,3.657,0,0,0-3301.747-772.363Zm1.683,13.691V-760.5h-1.823a.912.912,0,0,1-.912-.912.912.912,0,0,1,.912-.911h1.823v-1.822a.911.911,0,0,1,.912-.911.911.911,0,0,1,.912.911v1.822h1.823a.911.911,0,0,1,.911.911.912.912,0,0,1-.911.912h-1.823v1.824a.912.912,0,0,1-.912.912A.912.912,0,0,1-3300.064-758.672Z" transform="translate(3310.088 775.077)" fill="#fff"/>
        </svg>
        {{ kid.status == '0' ? 'Check in' : 'Check out' }}
    </button>
    <button v-else @click.prevent="" class="button-primary button-disabled w-100" disabled="true">
        Picked up
    </button>
</div>
</template>

<script>
import userNameMixin from '@/mixins/userNameMixin'
import formatDateTime from '@/mixins/formatDateTime'
import ProfileAvatar from './ProfileAvatar.vue'
export default {
  components: { ProfileAvatar },
    name: 'ParentCheckoutList',
    props: ['kid'],
    mixins: [formatDateTime, userNameMixin],
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
</style>