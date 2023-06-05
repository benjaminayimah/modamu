<template>
    <section class="section-main">
        <div class="title-row">
            <h1 class="title">Add new village</h1>
        </div>
        <div class="flx jc-c">
            <div v-if="completed" class="main-content-card completed-card flx column ai-c">
                <completed-anime />
                <div class="flx column gap-24 ai-c">
                    <h2>Successful</h2>
                    <div class="text-center comp-text">
                        A new village has been added successfully.
                    </div>
                    <a href="#" @click="goBack" class="button-primary a-button a-btn w-100 btn-lg">Go back</a>
                </div>
            </div>
            <div v-else class="main-content-card add-event-card">
                <div class="flx ai-c column gap-16 mb-24">
                    <avatar :status="status" :hostname="hostname" :id="user.id" @deleteTemp="deltmp"/>
                    <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
                    <button @click.prevent="uploadClick('avatar_img')" class="button-outline rounded-outl gap-8 btn-md">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 28 28">
                            <path d="M-3279.885-497.309a8.8,8.8,0,0,1-4.272-1.81c-1.926-1.663-2.677-4.44-2.677-9.9,0-3.357,0-6.254.656-8.382a4.95,4.95,0,0,1,1.559-2.511,4.667,4.667,0,0,1,3.035-.917,3.69,3.69,0,0,0,2.462-.625,2.116,2.116,0,0,0,.6-1.375c.013-.088.023-.164.032-.23.024-.178.046-.332.084-.5a1.685,1.685,0,0,1,.266-.64l.012-.016a1.206,1.206,0,0,1,.243-.241,1.5,1.5,0,0,1,.368-.2,3.359,3.359,0,0,1,1.183-.172h7a3.359,3.359,0,0,1,1.182.172,1.5,1.5,0,0,1,.366.2,1.192,1.192,0,0,1,.246.244l.009.012a1.672,1.672,0,0,1,.268.643c.038.17.059.322.084.5v0c.01.068.02.144.032.232a2.113,2.113,0,0,0,.6,1.374,3.684,3.684,0,0,0,2.46.625,4.616,4.616,0,0,1,3.035.935,5.05,5.05,0,0,1,1.559,2.542c.656,2.143.656,5.011.656,8.332,0,5.418-.75,8.183-2.677,9.859a8.816,8.816,0,0,1-4.272,1.838,38.156,38.156,0,0,1-7.051.493A39.3,39.3,0,0,1-3279.885-497.309Zm3.673-25.187a4.391,4.391,0,0,1-1.355,2.777,5.722,5.722,0,0,1-4.017,1.219,2.486,2.486,0,0,0-1.576.4,2.793,2.793,0,0,0-.787,1.379c-.553,1.79-.553,4.658-.553,7.692,0,4.636.541,6.994,1.868,8.14a6.723,6.723,0,0,0,3.179,1.283,37.235,37.235,0,0,0,6.619.436,36.138,36.138,0,0,0,6.608-.45,6.757,6.757,0,0,0,3.183-1.307c1.332-1.16,1.876-3.506,1.876-8.1,0-3,0-5.84-.554-7.649a2.9,2.9,0,0,0-.8-1.417,2.429,2.429,0,0,0-1.562-.41,5.722,5.722,0,0,1-4.017-1.219,4.389,4.389,0,0,1-1.354-2.777s0,0,0,0h-6.756Zm-2.455,12.83a5.84,5.84,0,0,1,5.833-5.834,5.841,5.841,0,0,1,5.834,5.834,5.84,5.84,0,0,1-5.834,5.833A5.839,5.839,0,0,1-3278.667-509.666Zm2.334,0a3.5,3.5,0,0,0,3.5,3.5,3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-3.5-3.5A3.5,3.5,0,0,0-3276.333-509.666ZM-3267-515.5a1.167,1.167,0,0,1,1.167-1.166,1.167,1.167,0,0,1,1.167,1.166,1.167,1.167,0,0,1-1.167,1.167A1.167,1.167,0,0,1-3267-515.5Z" transform="translate(3286.833 524.833)"/>
                        </svg>
                        Tap to add photo
                    </button>
                </div>
                <form @submit.prevent="submitSignUp" class="flx column gap-24">
                    <div class="form-row column">
                        <label for="name">Village name</label>
                        <div class="input-wrapper">
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.667 16">
                                <path d="M-481.667-345c-1.608,0-2.782-.043-3.694-.135a7.237,7.237,0,0,1-2.237-.5,2.118,2.118,0,0,1-1.106-1.018,3.8,3.8,0,0,1-.3-1.678,3.793,3.793,0,0,1,.3-1.679,2.117,2.117,0,0,1,1.105-1.017,7.239,7.239,0,0,1,2.237-.5c.912-.092,2.086-.135,3.694-.135s2.781.043,3.693.135a7.243,7.243,0,0,1,2.238.5,2.12,2.12,0,0,1,1.106,1.018,3.8,3.8,0,0,1,.3,1.678,3.8,3.8,0,0,1-.3,1.679,2.12,2.12,0,0,1-1.105,1.017,7.242,7.242,0,0,1-2.238.5C-478.885-345.043-480.059-345-481.667-345Zm0-5.333c-1.563,0-2.694.041-3.56.128a6.226,6.226,0,0,0-1.82.39.809.809,0,0,0-.458.388,2.684,2.684,0,0,0-.162,1.094,2.69,2.69,0,0,0,.162,1.094.809.809,0,0,0,.459.388,6.224,6.224,0,0,0,1.82.39c.866.087,2,.128,3.56.128s2.693-.041,3.559-.128a6.23,6.23,0,0,0,1.821-.39.811.811,0,0,0,.458-.388,2.7,2.7,0,0,0,.161-1.094,2.69,2.69,0,0,0-.161-1.093.811.811,0,0,0-.459-.389,6.232,6.232,0,0,0-1.821-.39C-478.973-350.293-480.1-350.333-481.667-350.333Zm0-2.667a4,4,0,0,1-4-4,4,4,0,0,1,4-4,4,4,0,0,1,4,4A4,4,0,0,1-481.667-353Zm0-6.666A2.67,2.67,0,0,0-484.333-357a2.67,2.67,0,0,0,2.667,2.667A2.67,2.67,0,0,0-479-357,2.67,2.67,0,0,0-481.667-359.666Z" transform="translate(489 361)"/>
                            </svg>
                            </i>
                            <input v-model="form.village_name" class="form-control" type="text" name="name" id="name" data-type="icon" data-color="dark" placeholder="Enter village name">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.village_name">
                            {{ validation.errors.village_name[0] }}
                        </span>
                    </div>
                    <div class="form-col">
                        <label for="address">Location of villlage</label>
                        <div class="input-wrapper">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 20.101 19.821">
                                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)"/>
                                </svg>
                            </i>
                            <input autocomplete="off" data-state="location" class="form-control" type="search" data-color="dark" data-type="icon" ref="address" placeholder="Start typing, then pick from the dropdown list">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.address">
                            {{ validation.errors.address[0] }}
                        </span>
                    </div>
                    <div class="form-row column">
                        <label for="email">Email</label>
                        <div class="input-wrapper">
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.455 16">
                                <path d="M4.332,15.676A5.36,5.36,0,0,1,1.669,14.47C.468,13.37,0,11.556,0,8A13.03,13.03,0,0,1,.7,2.909,4.612,4.612,0,0,1,.936,2.45l.013-.022A4,4,0,0,1,3.083.679l0,0L3.132.661,3.153.652l.03-.011L3.21.631,3.236.622l.029-.01L3.319.593A17.369,17.369,0,0,1,8.727,0a22.583,22.583,0,0,1,4.4.324,5.368,5.368,0,0,1,2.663,1.205c1.2,1.1,1.669,2.915,1.669,6.471s-.468,5.369-1.669,6.47a5.36,5.36,0,0,1-2.663,1.206,22.583,22.583,0,0,1-4.4.324A22.583,22.583,0,0,1,4.332,15.676ZM1.454,8c0,3.055.347,4.619,1.2,5.4a4.075,4.075,0,0,0,1.971.853,21.326,21.326,0,0,0,4.1.294,21.326,21.326,0,0,0,4.1-.294A4.079,4.079,0,0,0,14.8,13.4c.851-.779,1.2-2.344,1.2-5.4a15.014,15.014,0,0,0-.373-3.921c-.4.4-.922.886-1.512,1.374A14.777,14.777,0,0,1,11.54,7.2,6.261,6.261,0,0,1,8.727,8H8.722a6.262,6.262,0,0,1-2.814-.794,14.784,14.784,0,0,1-2.584-1.75c-.585-.483-1.1-.966-1.5-1.361A15.027,15.027,0,0,0,1.454,8ZM3.79,1.969a2.982,2.982,0,0,0-1.27.765,22.111,22.111,0,0,0,1.73,1.6,13.338,13.338,0,0,0,2.324,1.58,4.87,4.87,0,0,0,2.148.632,4.856,4.856,0,0,0,2.149-.635,13.233,13.233,0,0,0,2.318-1.579,21.932,21.932,0,0,0,1.736-1.61l-.062-.064h0l-.016-.016,0,0-.015-.014,0,0L14.8,2.6a4.075,4.075,0,0,0-1.971-.853,21.326,21.326,0,0,0-4.1-.294A16.18,16.18,0,0,0,3.79,1.969Z"/>
                            </svg>
                            </i>
                            <input v-model="form.email" class="form-control" type="email" name="email" id="email" data-type="icon" data-color="dark" placeholder="Enter email">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.email">
                            {{ validation.errors.email[0] }}
                        </span>
                    </div>
                    <div class="form-row column">
                        <label for="email">Phone</label>
                        <div class="input-wrapper">
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.455 16">
                                <path d="M4.332,15.676A5.36,5.36,0,0,1,1.669,14.47C.468,13.37,0,11.556,0,8A13.03,13.03,0,0,1,.7,2.909,4.612,4.612,0,0,1,.936,2.45l.013-.022A4,4,0,0,1,3.083.679l0,0L3.132.661,3.153.652l.03-.011L3.21.631,3.236.622l.029-.01L3.319.593A17.369,17.369,0,0,1,8.727,0a22.583,22.583,0,0,1,4.4.324,5.368,5.368,0,0,1,2.663,1.205c1.2,1.1,1.669,2.915,1.669,6.471s-.468,5.369-1.669,6.47a5.36,5.36,0,0,1-2.663,1.206,22.583,22.583,0,0,1-4.4.324A22.583,22.583,0,0,1,4.332,15.676ZM1.454,8c0,3.055.347,4.619,1.2,5.4a4.075,4.075,0,0,0,1.971.853,21.326,21.326,0,0,0,4.1.294,21.326,21.326,0,0,0,4.1-.294A4.079,4.079,0,0,0,14.8,13.4c.851-.779,1.2-2.344,1.2-5.4a15.014,15.014,0,0,0-.373-3.921c-.4.4-.922.886-1.512,1.374A14.777,14.777,0,0,1,11.54,7.2,6.261,6.261,0,0,1,8.727,8H8.722a6.262,6.262,0,0,1-2.814-.794,14.784,14.784,0,0,1-2.584-1.75c-.585-.483-1.1-.966-1.5-1.361A15.027,15.027,0,0,0,1.454,8ZM3.79,1.969a2.982,2.982,0,0,0-1.27.765,22.111,22.111,0,0,0,1.73,1.6,13.338,13.338,0,0,0,2.324,1.58,4.87,4.87,0,0,0,2.148.632,4.856,4.856,0,0,0,2.149-.635,13.233,13.233,0,0,0,2.318-1.579,21.932,21.932,0,0,0,1.736-1.61l-.062-.064h0l-.016-.016,0,0-.015-.014,0,0L14.8,2.6a4.075,4.075,0,0,0-1.971-.853,21.326,21.326,0,0,0-4.1-.294A16.18,16.18,0,0,0,3.79,1.969Z"/>
                            </svg>
                            </i>
                            <input v-model="form.phone" class="form-control" type="tel" name="phone" id="phone" data-type="icon" data-color="dark" placeholder="222-333-4444">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.phone">
                            {{ validation.errors.phone[0] }}
                        </span>
                    </div>
                    <div class="form-row column">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.39 18.998">
                                <path d="M-438.305-337.394A4.7,4.7,0,0,1-443-342.088v-3a4.7,4.7,0,0,1,3.583-4.561v-1.568a5.2,5.2,0,0,1,5.172-5.174,5.2,5.2,0,0,1,5.176,5.172v1.6a4.7,4.7,0,0,1,3.459,4.529v3a4.7,4.7,0,0,1-4.7,4.694Zm-3.3-7.7v3a3.309,3.309,0,0,0,3.3,3.3h8a3.309,3.309,0,0,0,3.306-3.3v-3a3.31,3.31,0,0,0-3.306-3.3h-8A3.309,3.309,0,0,0-441.61-345.089Zm11.151-4.694v-1.435A3.8,3.8,0,0,0-434.245-355a3.8,3.8,0,0,0-3.783,3.785v1.433Zm-6.541,6.7a2.7,2.7,0,0,1,2.7-2.7,2.7,2.7,0,0,1,2.695,2.7,2.7,2.7,0,0,1-2.695,2.695A2.7,2.7,0,0,1-437-343.088Zm1.39,0a1.307,1.307,0,0,0,1.305,1.3,1.307,1.307,0,0,0,1.3-1.3,1.307,1.307,0,0,0-1.3-1.3A1.306,1.306,0,0,0-435.61-343.088Z" transform="translate(443 356.392)"/>
                            </svg>
                            </i>
                            <input v-model="form.password" class="form-control" :type="showPass ? 'text' : 'password'" name="password" id="password" data-type="icon" autocomplete="new-password" data-color="dark" placeholder="Enter a min of 6 digit password">
                            <span class="hide-show-pass br-50" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                    <g transform="translate(1.182 1.182)">
                                        <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                        <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.password">
                            {{ validation.errors.password[0] }}
                        </span>
                    </div>
                    <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img">
                    <button class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                        <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                        <span>{{ creating ? 'Creating account...' : 'Create'}}</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import inputValMixin from '@/mixins/inputValMixin'
import tempImageUploadMixin from '@/mixins/tempImageUpload'
import Spinner from '@/components/includes/Spinner.vue'
import passwordToggleMixin from '@/mixins/passwordToggle'
import autoCompleMixin from '@/mixins/autoCompleMixin'
import Avatar from '@/components/includes/Avatar.vue'
import CompletedAnime from '@/components/includes/CompletedAnime.vue'
export default {
    components: { Spinner, Avatar, CompletedAnime },
    name: 'AddVillagePage',
    mixins: [ inputValMixin, tempImageUploadMixin, passwordToggleMixin, autoCompleMixin ],
    computed: {
        ...mapGetters(['getHostname']),
        ...mapState({
            hostname: (state) => state.hostname,
            user: (state) => state.user,
            token: (state) => state.token
        })
    },
    data () {
        return {
            form: {
                email: '',
                phone: '',
                village_name: '',
                password: '',
                address: '',
                latitude: null,
                longitude: null,
                tempImage: null,
            },
            creating: false,
            completed: false,
            payload: ''
        }
    },
    methods: {
        submitSignUp() {
            this.creating = true
            axios.post(this.hostname+'/api/register-village?token='+this.token, this.form)
            .then((res) => {
                this.signupSuccess(res.data)
            }).catch((e) => {
                this.creating = false
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
            })
        },
        deltmp() {
            this.startLoader()
            axios.delete(this.hostname + "/api/del-temp-upload/" + this.user.id)
            .then(() => {
                this.afterDeletion()
            }).catch((err) => {
                this.stopLoader()
                console.log(err.response);
            });
        },
        async signupSuccess(res) {
            this.$store.commit('updateVillage', res)
            this.completed = true
        },
        goBack() {
            location.reload()
        }
    }
    

}
</script>

<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.add-event-card{
    width: 50%;
}

.input-error{
    font-size: 0.9rem;
}
</style>