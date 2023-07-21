<template>
    <teleport to="#modal_title">
        {{ !forms.otherProfile ? 'Edit profile' : 'Edit user\'s info' }}
        
    </teleport>
    <teleport to="#modal_content">
        <div>
            <div v-if="!forms.otherProfile" class="flx ai-c column gap-16 mb-24">
                <avatar :status="status" :hostname="getHostname" :id="getUser.id" @deleteTemp="deltmp" />
                <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
                <button @click.prevent="uploadClick('avatar_img')" class="button-outline rounded-outl gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 28 28">
                        <path d="M-3279.885-497.309a8.8,8.8,0,0,1-4.272-1.81c-1.926-1.663-2.677-4.44-2.677-9.9,0-3.357,0-6.254.656-8.382a4.95,4.95,0,0,1,1.559-2.511,4.667,4.667,0,0,1,3.035-.917,3.69,3.69,0,0,0,2.462-.625,2.116,2.116,0,0,0,.6-1.375c.013-.088.023-.164.032-.23.024-.178.046-.332.084-.5a1.685,1.685,0,0,1,.266-.64l.012-.016a1.206,1.206,0,0,1,.243-.241,1.5,1.5,0,0,1,.368-.2,3.359,3.359,0,0,1,1.183-.172h7a3.359,3.359,0,0,1,1.182.172,1.5,1.5,0,0,1,.366.2,1.192,1.192,0,0,1,.246.244l.009.012a1.672,1.672,0,0,1,.268.643c.038.17.059.322.084.5v0c.01.068.02.144.032.232a2.113,2.113,0,0,0,.6,1.374,3.684,3.684,0,0,0,2.46.625,4.616,4.616,0,0,1,3.035.935,5.05,5.05,0,0,1,1.559,2.542c.656,2.143.656,5.011.656,8.332,0,5.418-.75,8.183-2.677,9.859a8.816,8.816,0,0,1-4.272,1.838,38.156,38.156,0,0,1-7.051.493A39.3,39.3,0,0,1-3279.885-497.309Zm3.673-25.187a4.391,4.391,0,0,1-1.355,2.777,5.722,5.722,0,0,1-4.017,1.219,2.486,2.486,0,0,0-1.576.4,2.793,2.793,0,0,0-.787,1.379c-.553,1.79-.553,4.658-.553,7.692,0,4.636.541,6.994,1.868,8.14a6.723,6.723,0,0,0,3.179,1.283,37.235,37.235,0,0,0,6.619.436,36.138,36.138,0,0,0,6.608-.45,6.757,6.757,0,0,0,3.183-1.307c1.332-1.16,1.876-3.506,1.876-8.1,0-3,0-5.84-.554-7.649a2.9,2.9,0,0,0-.8-1.417,2.429,2.429,0,0,0-1.562-.41,5.722,5.722,0,0,1-4.017-1.219,4.389,4.389,0,0,1-1.354-2.777s0,0,0,0h-6.756Zm-2.455,12.83a5.84,5.84,0,0,1,5.833-5.834,5.841,5.841,0,0,1,5.834,5.834,5.84,5.84,0,0,1-5.834,5.833A5.839,5.839,0,0,1-3278.667-509.666Zm2.334,0a3.5,3.5,0,0,0,3.5,3.5,3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-3.5-3.5A3.5,3.5,0,0,0-3276.333-509.666ZM-3267-515.5a1.167,1.167,0,0,1,1.167-1.166,1.167,1.167,0,0,1,1.167,1.166,1.167,1.167,0,0,1-1.167,1.167A1.167,1.167,0,0,1-3267-515.5Z" transform="translate(3286.833 524.833)"/>
                    </svg>
                    Tap to update photo
                </button>
            </div>
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="name">Name</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" class="form-control" type="text" name="name" id="name" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input v-model="form.email" class="form-control" type="email" name="email" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.email">
                        {{ validation.errors.email[0] }}
                    </span>
                </div>
                <div v-if="!forms.otherProfile" class="form-row column">
                    <label for="phone">Phone number</label>
                    <div class="input-wrapper">
                        <input v-model="form.phone_number" @input="formatPhoneNumber" class="form-control" type="tel" name="phone_number" data-color="dark" placeholder="Eg. 222-333-4444">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.phone_number">
                        {{ validation.errors.phone_number[0] }}
                    </span>
                </div>
                <div v-if="is_parent" class="form-row column">
                    <label for="emergency_number">Emergency number</label>
                    <div class="input-wrapper">
                        <input v-model="form.emergency_number" @input="formatEmergencyNumber" class="form-control" type="tel" name="emergency_number" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.emergency_number">
                        {{ validation.errors.emergency_number[0] }}
                    </span>
                </div>
                <div v-if="is_parent" class="form-row column">
                    <label for="ocupation">Occupation</label>
                    <div class="input-wrapper">
                        <input v-model="form.ocupation" class="form-control" type="text" name="ocupation" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.ocupation">
                        {{ validation.errors.ocupation[0] }}
                    </span>
                </div>
                <!-- <div class="form-row column">
                    <label for="address">Address</label>
                    <div class="input-wrapper">
                        <input v-model="form.address" class="form-control" type="text" name="address" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.address">
                        {{ validation.errors.address[0] }}
                    </span>
                </div> -->
                <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img">
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button @click="doSubmit" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Submitting...' : 'Submit update'}}</span>
        </button>  
    </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex';
import phoneNumberMixin from '@/mixins/phoneNumberMixin';
import validationMixin from '../../mixins/validationMixin'
import tempImageUploadMixin from '../../mixins/tempImageUpload';
import Spinner from '../includes/Spinner'
import Avatar from '../includes/Avatar'
import usersLevelMixin from '../../mixins/usersLevelMixin';
export default {
    components: { Avatar, Spinner },
    name: 'ProfileEditModal',
    mixins: [ validationMixin, usersLevelMixin, tempImageUploadMixin, phoneNumberMixin],
    computed: {
        ...mapGetters(['getHostname', 'getDefaultImage', 'getUser']),
        ...mapState({
            token: (state) => state.token,
            forms: (state) => state.forms
        })
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: '',
                emergency_number: '',
                ocupation: '',
                // address: '',
                tempImage: null,
            },
            creating: false,
        }
    },
    methods: {
        preloadForEdit() {
            this.startLoader()
            this.$store.dispatch('doPreloadTemp', this.getUser.image)
            .then((res) => {
                this.stopLoader()
                this.setData(res.data.image)
            }).catch((e) => {
                this.stopLoader()
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            })
        },
        preloadForOtherUser() {
            this.form.name = this.forms.user.name
            this.form.email = this.forms.user.email
            this.$store.commit('stopFormLoader')
        },
        checkIfisset() {
            if(!this.getUser.image) {
                const image = null
                this.setData(image)
            }else {
                this.preloadForEdit()
            }
        },
        setData(image) {
            this.afterTempUpload(image)
            this.form.name = this.getUser.name
            this.form.email = this.getUser.email
            this.form.phone_number = this.getUser.phone
            this.form.emergency_number = this.getUser.emergency_number
            this.form.ocupation = this.getUser.ocupation
            this.form.address = this.getUser.address
            this.$store.commit('stopFormLoader')
        },
        deltmp() {
            this.startLoader()
            axios.delete(this.getHostname + "/api/del-temp-upload/" + this.getUser.id)
            .then(() => {
                this.afterDeletion()
            }).catch((e) => {
                this.stopLoader()
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            });
        },
        doSubmit() {
            this.creating = true
            let id = this.getUser.id 
            if(this.forms.otherProfile) {
                id = this.forms.user.id
            }
            axios.put(this.getHostname+'/api/sign-in/' + id + '?token=' + this.token, this.form)
            .then((res) => {
                this.updateSuccess(res.data)
            }).catch((e) => {
                this.creating = false
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            })
        },
        async updateSuccess(res) {
            if (this.forms.otherProfile) {
                await this.$store.commit('updateSubAdminInfo', res)
            } else {
                await this.$store.commit('updateUser', res)
            }
            this.$store.commit('closeModal')
        },
        resetForm() {
            this.clrOldfile()
            this.status.tempImage = null
            this.form.name = '',
            this.form.gender = '0',
            this.form.dob = '',
            this.form.height = '',
            this.form.about = '',
            this.form.tempImage = null
        }
    },
    mounted() {
        !this.forms.otherProfile ? this.preloadForEdit() : this.preloadForOtherUser()
    },
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