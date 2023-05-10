<template>
        <div class="kids-profile-view flx-grow-1 main-content-card">
            <div class="mb-24 flx jc-sb">
                <a href="#" @click.prevent="goBack"  class="flx gap-16 ai-c">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                        <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    Back
                </a>
                <a class="flx ft-primary gap-8" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 15.938 15.96">
                        <g transform="translate(-0.031 -0.519)">
                            <path d="M7,6.318,2.346,1.878l5.7.847a3.719,3.719,0,0,1,2.837,2.146l1.683,3.951-2.005,2L8.316,13.034l-3.929-1.67A3.716,3.716,0,0,1,2.238,8.53L1.386,2.805l4.7,4.478A.667.667,0,0,0,7,6.318Zm.933,8L3.859,12.588l-.012-.005h0A5.049,5.049,0,0,1,.919,8.726L.054,2.917A2.086,2.086,0,0,1,2.43.543l5.814.864A5.052,5.052,0,0,1,12.1,4.331l.006.012h0l1.863,4.372A.7.7,0,0,1,14,8.787l.374.367.032.031a12.709,12.709,0,0,1,1.075,1.135,2.006,2.006,0,0,1,.489,1.249,2.006,2.006,0,0,1-.489,1.249A12.714,12.714,0,0,1,14.4,13.955l-.032.031-.947.93-.031.031A12.739,12.739,0,0,1,12.238,16a2.058,2.058,0,0,1-1.255.476A2.058,2.058,0,0,1,9.728,16a12.748,12.748,0,0,1-1.156-1.056l-.031-.031-.586-.576Zm1.456-.438.084.082a12.2,12.2,0,0,0,1.053.971.762.762,0,0,0,.456.21.762.762,0,0,0,.456-.21,12.2,12.2,0,0,0,1.053-.971l.947-.93A12.155,12.155,0,0,0,14.427,12c.187-.241.209-.355.209-.431s-.022-.19-.209-.431a12.14,12.14,0,0,0-.988-1.033l-.119-.117L11.5,11.774Z" fill="#0173ff" fill-rule="evenodd"/>
                            <path d="M1.408,0A1.406,1.406,0,1,1,0,1.406,1.407,1.407,0,0,1,1.408,0Z" transform="matrix(1, -0.016, 0.016, 1, 4.924, 5.201)" fill="#0173ff"/>
                        </g>
                    </svg>
                    <span>Edit this child</span>
                </a>
            </div>
            <div>
                <profile-kid-body-content :kid="computeThisKid" />
            </div>
        </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ProfileKidBodyContent from './ProfileKidBodyContent.vue';
export default {
    components: { ProfileKidBodyContent },
    name: 'KidsProfileView',
    computed: {
        ...mapGetters(['getUser', 'getKids']),
        computeThisKid() {
            return this.getKids.length ? this.getKids.find(kid => kid.id == this.$route.params.id) : ''
        }
    },
    data() {
        return {
            kid: ''
        }
    },
    methods: {
        goBack() {
            this.$router.push('/profile')
        }
    }
}
</script>
<style lang="sss" scoped>
</style>