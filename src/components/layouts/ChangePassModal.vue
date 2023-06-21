<template>
    <teleport to="#modal_title">
        {{ !superAdmin ? 'Change your password' : 'Reset village password' }}
    </teleport>
    <teleport to="#modal_content">
        <div>
            <form @submit.prevent="" class="flx column gap-24">
                <div v-if="!superAdmin" class="form-row column">
                    <label for="current_password">Current password</label>
                    <div class="input-wrapper">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.39 18.998">
                                <path d="M-438.305-337.394A4.7,4.7,0,0,1-443-342.088v-3a4.7,4.7,0,0,1,3.583-4.561v-1.568a5.2,5.2,0,0,1,5.172-5.174,5.2,5.2,0,0,1,5.176,5.172v1.6a4.7,4.7,0,0,1,3.459,4.529v3a4.7,4.7,0,0,1-4.7,4.694Zm-3.3-7.7v3a3.309,3.309,0,0,0,3.3,3.3h8a3.309,3.309,0,0,0,3.306-3.3v-3a3.31,3.31,0,0,0-3.306-3.3h-8A3.309,3.309,0,0,0-441.61-345.089Zm11.151-4.694v-1.435A3.8,3.8,0,0,0-434.245-355a3.8,3.8,0,0,0-3.783,3.785v1.433Zm-6.541,6.7a2.7,2.7,0,0,1,2.7-2.7,2.7,2.7,0,0,1,2.695,2.7,2.7,2.7,0,0,1-2.695,2.695A2.7,2.7,0,0,1-437-343.088Zm1.39,0a1.307,1.307,0,0,0,1.305,1.3,1.307,1.307,0,0,0,1.3-1.3,1.307,1.307,0,0,0-1.3-1.3A1.306,1.306,0,0,0-435.61-343.088Z" transform="translate(443 356.392)"/>
                            </svg>
                        </i>
                        <input v-model="form.current_password" data-type="icon" :type="showPass ? 'text' : 'password'" autocomplete="new-password" class="form-control" id="current_password" name="password_confirmation" data-color="dark" placeholder="Provide your current password">
                        <span class="hide-show-pass br-50 ai-c jc-c flx a-btn" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                <g transform="translate(1.182 1.182)">
                                    <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                    <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.current_password">
                        {{ validation.errors.current_password[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="password">New password</label>
                    <div class="input-wrapper">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.39 18.998">
                                <path d="M-438.305-337.394A4.7,4.7,0,0,1-443-342.088v-3a4.7,4.7,0,0,1,3.583-4.561v-1.568a5.2,5.2,0,0,1,5.172-5.174,5.2,5.2,0,0,1,5.176,5.172v1.6a4.7,4.7,0,0,1,3.459,4.529v3a4.7,4.7,0,0,1-4.7,4.694Zm-3.3-7.7v3a3.309,3.309,0,0,0,3.3,3.3h8a3.309,3.309,0,0,0,3.306-3.3v-3a3.31,3.31,0,0,0-3.306-3.3h-8A3.309,3.309,0,0,0-441.61-345.089Zm11.151-4.694v-1.435A3.8,3.8,0,0,0-434.245-355a3.8,3.8,0,0,0-3.783,3.785v1.433Zm-6.541,6.7a2.7,2.7,0,0,1,2.7-2.7,2.7,2.7,0,0,1,2.695,2.7,2.7,2.7,0,0,1-2.695,2.695A2.7,2.7,0,0,1-437-343.088Zm1.39,0a1.307,1.307,0,0,0,1.305,1.3,1.307,1.307,0,0,0,1.3-1.3,1.307,1.307,0,0,0-1.3-1.3A1.306,1.306,0,0,0-435.61-343.088Z" transform="translate(443 356.392)"/>
                            </svg>
                        </i>
                        <input @input="checkCopied" v-model="form.new_password" :type="showPass ? 'text' : 'password'" autocomplete="new-password" class="form-control" id="new_password" name="password" data-color="dark" data-type="icon" placeholder="Enter a new password">
                        <div v-if="superAdmin" class="gap-8 span-double-wrapper">
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
                        <span v-else class="hide-show-pass br-50 ai-c jc-c flx a-btn" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                <g transform="translate(1.182 1.182)">
                                    <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                    <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div v-if="superAdmin" class="flx gap-16">
                        <a @click.prevent="generatePass(8)" href="#" class="getting-started">Or auto-generate a password</a>
                        <i>{{ form.new_password }}</i>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.new_password">
                        {{ validation.errors.new_password[0] }}
                    </span>
                </div>
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button @click="submitPass" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Submitting...' : 'Submit password'}}</span>
        </button>  
    </teleport>
</template>
<script>
import axios from 'axios'
import passwordToggleMixin from '@/mixins/passwordToggle';
import { mapGetters, mapState } from 'vuex';
import validationMixin from '../../mixins/validationMixin'
import Spinner from '../includes/Spinner'
export default {
    components: { Spinner },
    name: 'ChangePassModal',
    computed: {
        ...mapGetters(['getHostname', 'getDefaultImage', 'getToken']),
        ...mapState({
            forms: (state) => state.forms
        }),
        superAdmin() {
            if(this.forms.otherPass)
            return true
            else
            return false
        }
    },
    mixins: [ validationMixin, passwordToggleMixin ],
    data() {
        return {
            form: {
                current_password: '',
                new_password: ''
            },
            creating: false,
        }
    },
    methods: {
        submitPass() {
            this.startSubmit()
            let url = ''
            if(this.superAdmin) {
                url = axios.post(this.getHostname + '/api/change-other-password/' + this.forms.id + '?token=' + this.getToken, this.form)
            }else {
                url = axios.post(this.getHostname + "/api/change-password?token=" + this.getToken, this.form)
            }
            url
            .then(() => {
                this.endSubmit()
                this.$store.commit('closeModal')
            }).catch((e) => {
                console.log(e.response)
                this.endSubmit()
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
            });
        },
        startSubmit() {
            this.creating = true
        },
        endSubmit() {
            this.creating = false
        }
    }
}
</script>
<style lang="scss" scoped>
.input-error{
    font-size: 0.9rem;
}
button.button-outline{
    height: 46px;
    padding: 8px 17px;
}
</style>