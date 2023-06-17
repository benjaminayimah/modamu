<template>
        <div class="kids-profile-view flx-grow-1 main-content-card">
            <div class="mb-24 flx jc-sb">
                <a href="#" @click.prevent="goBack"  class="flx gap-16 ai-c">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                        <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    Back
                </a>
                <a href="#" @click.prevent="$store.commit('setUpdateKid', computeThisKid)" class="flx ft-primary gap-8 ai-c">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.919" height="16.166" viewBox="0 0 16.919 16.166">
                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#0173ff"/>
                    </svg>
                    <span>Edit this child</span>
                </a>
            </div>
            <div class="kid-body overflow-y-scroll scroll-hidden">
                <profile-kid-body-content :kid="computeThisKid" />
            </div>
        </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import ProfileKidBodyContent from './ProfileKidBodyContent.vue';
export default {
    components: { ProfileKidBodyContent },
    name: 'KidsProfileView',
    computed: {
        ...mapGetters(['getKids']),
        ...mapState({
            device: (state) => state.device
        }),
        computeThisKid() {
            return this.getKids.length ? this.getKids.find(kid => kid.id == this.$route.params.id) : ''
        }
    },
    methods: {
        goBack() {
            this.$router.push('/profile')
        }
    },
    mounted() {
        this.device == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>
<style lang="sss" scoped>
</style>