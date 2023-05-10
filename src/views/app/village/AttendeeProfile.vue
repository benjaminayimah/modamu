<template>
    <section>
        <div class="title-row flx gap-24 ai-c">
            <a class="flx gap-8 ai-c" href="#" @click.prevent="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                Back
            </a>
            <h3 class="title">
                Kid's profile
            </h3>
        </div>
        <div class="flx gap-50">
            <div class="main-content-card kid-profile flx column gap-24">
                <profile-kid-body-content :kid="thisKid"/>
            </div>
            <div class="flx-grow-1">
                <div class="main-content-card parent-profile flx column gap-24">
                    <div class="centered gap-16">
                        <profile-avatar :id="parent.id" :image="parent.image"/>
                        <h4>{{ parent.name }}</h4>
                        <span class="acc-type br-32">father</span>
                        <div v-if="parent.phone" class="flx jc-sb br-16 w-100 info-row ai-c">
                            <div class="flx gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 19 19">
                                    <path d="M14.562,19a5.619,5.619,0,0,1-2.279-.554A20.584,20.584,0,0,1,6.944,14.8c-.613-.549-1.853-1.76-2.252-2.217A22.3,22.3,0,0,1,.566,6.694,5.392,5.392,0,0,1,0,4.423,3.337,3.337,0,0,1,.61,2.46,7.015,7.015,0,0,1,1.834,1.12,3.82,3.82,0,0,1,4.366,0l.058,0A2.513,2.513,0,0,1,5.9.753c.305.3,2.107,2.323,2.3,3.216A2.706,2.706,0,0,1,7.75,5.955l-.018.032c-.064.111-.142.229-.225.354a4.21,4.21,0,0,0-.412.719A9.394,9.394,0,0,0,8.332,9.146a14.234,14.234,0,0,0,2.049,1.987,8.462,8.462,0,0,0,1.508.855,4.088,4.088,0,0,0,.761-.425c.115-.075.223-.146.325-.206l.039-.022a3.067,3.067,0,0,1,1.532-.5,2.268,2.268,0,0,1,.466.049,11.923,11.923,0,0,1,3.222,2.246A2.388,2.388,0,0,1,19,14.648l0,.028c.073,1.749-1.964,3.392-2.457,3.708A3.326,3.326,0,0,1,14.562,19ZM4.283,1.584c-.816.008-2.075,1.3-2.327,1.708l-.021.036-.022.03a1.76,1.76,0,0,0-.331,1.065,3.857,3.857,0,0,0,.422,1.612l.014.031a21.031,21.031,0,0,0,3.844,5.457l.016.018C6.2,11.9,7.385,13.074,8,13.625a18.64,18.64,0,0,0,4.892,3.36l.029.012a4.087,4.087,0,0,0,1.641.419,1.75,1.75,0,0,0,1.069-.329l.028-.02.029-.018c.44-.266,1.744-1.5,1.728-2.293a.952.952,0,0,0-.3-.5l-.005-.005a13.458,13.458,0,0,0-2.436-1.815.67.67,0,0,0-.128-.013,1.691,1.691,0,0,0-.757.293l-.021.012c-.067.039-.16.1-.251.16a3.279,3.279,0,0,1-1.662.692,1.3,1.3,0,0,1-.443-.076l-.033-.013a9.964,9.964,0,0,1-1.908-1.063A15.6,15.6,0,0,1,7.108,10.15l-.018-.023a10.917,10.917,0,0,1-1.5-2.568L5.58,7.538C5.3,6.8,5.814,6.03,6.186,5.468c.069-.1.134-.2.174-.272l.014-.025c.207-.364.332-.6.281-.859A13.423,13.423,0,0,0,4.8,1.89,1.045,1.045,0,0,0,4.283,1.584Z" transform="translate(0 0)" fill="#212135"/>
                                </svg>
                                <label>Phone number</label>
                            </div>
                            <span>{{ parent.phone }}</span>
                        </div>
                        <div class="flx jc-sb br-16 w-100 info-row ai-c">
                            <div class="flx gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 19.001 19">
                                    <path d="M-3404.717-700.554a20.176,20.176,0,0,1-5.339-3.641c-.635-.568-1.853-1.762-2.246-2.21l0,0-.008-.009,0,0v0a22.592,22.592,0,0,1-4.123-5.89,5.4,5.4,0,0,1-.566-2.272,3.345,3.345,0,0,1,.609-1.961,4.583,4.583,0,0,1,.439-.566,8.23,8.23,0,0,1,.81-.8,3.932,3.932,0,0,1,2.508-1.1h.029l.029,0a2.539,2.539,0,0,1,1.479.748l0,0a16.284,16.284,0,0,1,1.261,1.478c.229.3.451.6.627.881.088.138.171.276.238.408a1.88,1.88,0,0,1,.169.448,2.662,2.662,0,0,1-.427,1.94l-.025.044-.018.031c-.064.112-.146.235-.218.343l-.007.012a5.121,5.121,0,0,0-.363.6,1.062,1.062,0,0,0-.048.118,9.434,9.434,0,0,0,1.236,2.083,14.171,14.171,0,0,0,2.048,1.987,8.443,8.443,0,0,0,1.507.854,1.085,1.085,0,0,0,.141-.056,5.25,5.25,0,0,0,.621-.369l.011-.006c.1-.066.213-.14.315-.2l.005,0,.033-.018.041-.024a2.719,2.719,0,0,1,1.955-.423,1.868,1.868,0,0,1,.444.165c.131.065.269.145.407.23.276.173.585.39.884.613a15.653,15.653,0,0,1,1.489,1.238l0,0,0,.005,0,0a2.406,2.406,0,0,1,.763,1.514l0,.014v.014a3.768,3.768,0,0,1-1.068,2.452,7.2,7.2,0,0,1-1.391,1.257,3.311,3.311,0,0,1-1.969.614A5.64,5.64,0,0,1-3404.717-700.554Zm-10.344-15.123-.024.034a1.764,1.764,0,0,0-.33,1.065,3.854,3.854,0,0,0,.422,1.612l.007.015.006.015a21.057,21.057,0,0,0,3.844,5.458l.008.009.008.009c.314.362,1.5,1.528,2.12,2.084a18.693,18.693,0,0,0,4.892,3.361l.015.005.014.006c1.3.588,2.148.5,2.71.091l.028-.02.029-.018a5.715,5.715,0,0,0,1.04-.954,2.344,2.344,0,0,0,.688-1.339.877.877,0,0,0-.3-.5l0-.005a14.522,14.522,0,0,0-1.312-1.085c-.28-.209-.551-.4-.775-.538-.114-.07-.206-.122-.276-.158-.043-.022-.068-.031-.075-.034-.251-.049-.457.041-.884.281l-.022.012c-.061.036-.139.087-.25.16l-.018.012a6.568,6.568,0,0,1-.806.469,1.7,1.7,0,0,1-1.282.135l-.017-.005-.016-.007a9.89,9.89,0,0,1-1.908-1.064,15.481,15.481,0,0,1-2.362-2.277l-.009-.011-.009-.012a10.984,10.984,0,0,1-1.5-2.568l0-.011,0-.011a1.654,1.654,0,0,1,.13-1.264,6.4,6.4,0,0,1,.464-.788l.013-.019c.081-.122.136-.206.174-.272l.014-.024c.245-.429.328-.625.281-.858,0-.007-.012-.031-.033-.072-.036-.069-.089-.161-.16-.274-.143-.224-.338-.493-.55-.77a15.425,15.425,0,0,0-1.109-1.307,1.019,1.019,0,0,0-.52-.307,2.565,2.565,0,0,0-1.4.721,6.666,6.666,0,0,0-.65.64c-.085.1-.154.18-.2.246s-.065.088-.07.1,0,0,0,0Zm9.908,8.673h0Zm-11.262-9.495.044-.069-.02.029C-3416.4-716.525-3416.408-716.511-3416.415-716.5Zm4.107,10.085.006.007Zm0,0,0,0Zm12.728-3.876a7.123,7.123,0,0,0-1.945-5.18,7.123,7.123,0,0,0-5.179-1.946.791.791,0,0,1-.792-.791.792.792,0,0,1,.792-.792,8.668,8.668,0,0,1,6.3,2.409,8.668,8.668,0,0,1,2.409,6.3.792.792,0,0,1-.792.792A.792.792,0,0,1-3399.583-710.292Zm-3.166,0a3.787,3.787,0,0,0-3.958-3.958.792.792,0,0,1-.792-.792.791.791,0,0,1,.792-.791,5.36,5.36,0,0,1,5.541,5.541.792.792,0,0,1-.792.792A.792.792,0,0,1-3402.75-710.292Z" transform="translate(3417 719)" fill="#212135"/>
                                </svg>
                                <label>Emergency number</label>
                            </div>
                            <span>{{ parent.emergency_number }}</span>
                        </div>
                        <a href="#" @click.prevent="goToProfile" class="button-primary gap-8 w-100 a-button a-btn">
                            Parents profile
                            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 5.714 10">
                                <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.819 -0.001)" fill="#fff"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="flx column gap-16 flx-grow-1 mt--32">
                <div class="flx flx-end gap-8 ai-c"><span>Registered with</span><span class="count-info count-primary">{{ otherKids.length }}</span></div>
                <div class="bg-white centered pd-32 br-16" v-if="!otherKids.length">Registered alone</div>
                <kids-list v-for="kid in otherKids" :key="kid.id" :kid="kid" :id="kid.user_id" :noClick="true"/>
            </div>
        </div>
    </section>
</template>
<script>
import ProfileKidBodyContent from '@/components/layouts/ProfileKidBodyContent.vue'
import KidsList from '../../../components/includes/app/KidsList.vue'
import ProfileAvatar from '../../../components/includes/app/ProfileAvatar.vue'
export default {
    components: { ProfileAvatar, KidsList, ProfileKidBodyContent },
    name: 'AttendeeProfile',
    data() {
        return {
            thisKid: '',
            otherKids: [],
            parent: '',
            event: ''
        }
    },
    methods: {
        fetchThisKidAndParent() {
            this.$store.dispatch('fetchThisKidAndParent', {kid: this.$route.params.id, parent: this.$route.params.parent, event: this.$route.params.event})
            .then((res) => {
                this.thisKid = res.data.kid
                this.parent = res.data.parent
                this.event = res.data.event
                this.otherKids = res.data.otherkids
            }).catch((err) => {
                console.log(err.response.data)
            })
        },
        goToProfile() {
            this.$router.push({ name: 'ViewParentProfile', params: { event: this.event.id, parent_id: this.parent.id, kid: this.thisKid.name, parent: this.parent.name } })
        }
    },
    mounted() {
        this.fetchThisKidAndParent()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.kid-profile{
    width: 35%;
    min-width: 460px;
}
.parent-profile{
    min-width: 360px;
}
.bg-img {
    height: 120px;
    width: 120px;
}

</style>