<template>
    <teleport to="#modal_title">
        {{ user === 1 ? 'Add sub admin' : 'Village personnel' }}
    </teleport>
    <teleport to="#modal_content">
        <div>
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="name">Name</label>
                    <div class="input-wrapper">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.667 16">
                                <path d="M-481.667-345c-1.608,0-2.782-.043-3.694-.135a7.237,7.237,0,0,1-2.237-.5,2.118,2.118,0,0,1-1.106-1.018,3.8,3.8,0,0,1-.3-1.678,3.793,3.793,0,0,1,.3-1.679,2.117,2.117,0,0,1,1.105-1.017,7.239,7.239,0,0,1,2.237-.5c.912-.092,2.086-.135,3.694-.135s2.781.043,3.693.135a7.243,7.243,0,0,1,2.238.5,2.12,2.12,0,0,1,1.106,1.018,3.8,3.8,0,0,1,.3,1.678,3.8,3.8,0,0,1-.3,1.679,2.12,2.12,0,0,1-1.105,1.017,7.242,7.242,0,0,1-2.238.5C-478.885-345.043-480.059-345-481.667-345Zm0-5.333c-1.563,0-2.694.041-3.56.128a6.226,6.226,0,0,0-1.82.39.809.809,0,0,0-.458.388,2.684,2.684,0,0,0-.162,1.094,2.69,2.69,0,0,0,.162,1.094.809.809,0,0,0,.459.388,6.224,6.224,0,0,0,1.82.39c.866.087,2,.128,3.56.128s2.693-.041,3.559-.128a6.23,6.23,0,0,0,1.821-.39.811.811,0,0,0,.458-.388,2.7,2.7,0,0,0,.161-1.094,2.69,2.69,0,0,0-.161-1.093.811.811,0,0,0-.459-.389,6.232,6.232,0,0,0-1.821-.39C-478.973-350.293-480.1-350.333-481.667-350.333Zm0-2.667a4,4,0,0,1-4-4,4,4,0,0,1,4-4,4,4,0,0,1,4,4A4,4,0,0,1-481.667-353Zm0-6.666A2.67,2.67,0,0,0-484.333-357a2.67,2.67,0,0,0,2.667,2.667A2.67,2.67,0,0,0-479-357,2.67,2.67,0,0,0-481.667-359.666Z" transform="translate(489 361)"/>
                            </svg>
                        </i>
                        <input v-model="form.name" class="form-control" type="text" name="name" id="name" data-type="icon" data-color="dark" placeholder="Enter name">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
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
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.39 18.998">
                                    <path d="M-438.305-337.394A4.7,4.7,0,0,1-443-342.088v-3a4.7,4.7,0,0,1,3.583-4.561v-1.568a5.2,5.2,0,0,1,5.172-5.174,5.2,5.2,0,0,1,5.176,5.172v1.6a4.7,4.7,0,0,1,3.459,4.529v3a4.7,4.7,0,0,1-4.7,4.694Zm-3.3-7.7v3a3.309,3.309,0,0,0,3.3,3.3h8a3.309,3.309,0,0,0,3.306-3.3v-3a3.31,3.31,0,0,0-3.306-3.3h-8A3.309,3.309,0,0,0-441.61-345.089Zm11.151-4.694v-1.435A3.8,3.8,0,0,0-434.245-355a3.8,3.8,0,0,0-3.783,3.785v1.433Zm-6.541,6.7a2.7,2.7,0,0,1,2.7-2.7,2.7,2.7,0,0,1,2.695,2.7,2.7,2.7,0,0,1-2.695,2.695A2.7,2.7,0,0,1-437-343.088Zm1.39,0a1.307,1.307,0,0,0,1.305,1.3,1.307,1.307,0,0,0,1.3-1.3,1.307,1.307,0,0,0-1.3-1.3A1.306,1.306,0,0,0-435.61-343.088Z" transform="translate(443 356.392)"/>
                                </svg>
                            </i>
                            <input @input="checkCopied" v-model="form.password" class="form-control" :type="showPass ? 'text' : 'password'" name="password" id="password" data-type="icon" autocomplete="new-password" data-color="dark" placeholder="Enter a min of 6 characters">
                            <div class="gap-8 span-double-wrapper">
                                <span v-if="form.password" :class="{'copied' : copied}" @click="copyTextToClipboard(form.password)" class="double ai-c jc-c flx br-50 a-btn" title="Copy password">
                                    <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 23.625 29.25">
                                        <path  d="M20.813,3.375h-8.4A2.812,2.812,0,0,0,9.563,6.152v.6H9.035A2.812,2.812,0,0,0,6.188,9.527v20.25a2.872,2.872,0,0,0,2.848,2.848H23.66a2.812,2.812,0,0,0,2.777-2.848V29.25h.6A2.812,2.812,0,0,0,29.813,26.4V12.375Zm0,3.136,5.864,5.864H20.813Zm3.375,23.266a.568.568,0,0,1-.527.6H9.035a.626.626,0,0,1-.6-.6V9.527A.568.568,0,0,1,9.035,9h.527V26.965a2,2,0,0,0,2.285,2.285h12.34ZM27.563,26.4a.568.568,0,0,1-.527.6H12.41a.626.626,0,0,1-.6-.6V6.152a.568.568,0,0,1,.6-.527h6.152v9h9Z" transform="translate(-6.188 -3.375)"/>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="19.724" height="12" viewBox="0 0 19.724 15.104">
                                        <path d="M30.054,13.974l-1.612-1.658a.347.347,0,0,0-.256-.11h0a.333.333,0,0,0-.256.11L16.754,23.573l-4.067-4.067a.354.354,0,0,0-.513,0l-1.63,1.63a.365.365,0,0,0,0,.522l5.129,5.129a1.622,1.622,0,0,0,1.072.522,1.7,1.7,0,0,0,1.062-.5h.009L30.063,14.5A.392.392,0,0,0,30.054,13.974Z" transform="translate(-10.434 -12.206)" fill="#0173ff"/>
                                    </svg>
                                </span>
                                <span class="hide-show-pass br-50 double ai-c jc-c flx a-btn" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                        <g transform="translate(1.182 1.182)">
                                            <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                            <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="flx gap-16">
                            <a @click.prevent="generatePass(10)" href="#" class="getting-started">Or auto-generate a password</a>
                            <i>{{ form.password }}</i>
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.password">
                            {{ validation.errors.password[0] }}
                        </span>
                    </div>
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button @click="submitSignUp" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Creating account...' : 'Create'}}</span>
        </button>
    </teleport>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import inputValMixin from '@/mixins/inputValMixin'
import passwordToggleMixin from '@/mixins/passwordToggle'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Spinner },
    name: 'AddSubAdminForm',
    mixins: [passwordToggleMixin, inputValMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            user: (state) => state.forms.user,
            token: (state) => state.token
        })
    },
    data () {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                user:''
            },
            creating: false,
            completed: false,
        }
    },
    methods: {
        submitSignUp() {
            this.creating = true
            axios.post(this.hostname+'/api/add-sub-admin?token='+this.token, this.form)
            .then((res) => {
                this.signupSuccess(res.data)
            }).catch((e) => {
                this.creating = false
                this.errorResponse(e)
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            })
        },
        async signupSuccess(res) {
            this.$store.commit('addToSubAdmin', res)
            console.log(res)
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.form.user = this.user
    }
}
</script>

<style lang="scss" scoped>

</style>