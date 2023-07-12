<template>
    <teleport to="#modal_title">
        {{ auth && (!forms == null || !forms == false) ? 'Edit this child' : 'Add your child' }}
    </teleport>
    <teleport to="#modal_content">
        <div>
            <div class="flx ai-c column gap-16 mb-24">
                <avatar :status="status" :hostname="getHostname" :id="id" @deleteTemp="deltmp"/>
                <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
                <button @click.prevent="uploadClick('avatar_img')" class="button-outline rounded-outl gap-8 btn-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 28 28">
                        <path d="M-3279.885-497.309a8.8,8.8,0,0,1-4.272-1.81c-1.926-1.663-2.677-4.44-2.677-9.9,0-3.357,0-6.254.656-8.382a4.95,4.95,0,0,1,1.559-2.511,4.667,4.667,0,0,1,3.035-.917,3.69,3.69,0,0,0,2.462-.625,2.116,2.116,0,0,0,.6-1.375c.013-.088.023-.164.032-.23.024-.178.046-.332.084-.5a1.685,1.685,0,0,1,.266-.64l.012-.016a1.206,1.206,0,0,1,.243-.241,1.5,1.5,0,0,1,.368-.2,3.359,3.359,0,0,1,1.183-.172h7a3.359,3.359,0,0,1,1.182.172,1.5,1.5,0,0,1,.366.2,1.192,1.192,0,0,1,.246.244l.009.012a1.672,1.672,0,0,1,.268.643c.038.17.059.322.084.5v0c.01.068.02.144.032.232a2.113,2.113,0,0,0,.6,1.374,3.684,3.684,0,0,0,2.46.625,4.616,4.616,0,0,1,3.035.935,5.05,5.05,0,0,1,1.559,2.542c.656,2.143.656,5.011.656,8.332,0,5.418-.75,8.183-2.677,9.859a8.816,8.816,0,0,1-4.272,1.838,38.156,38.156,0,0,1-7.051.493A39.3,39.3,0,0,1-3279.885-497.309Zm3.673-25.187a4.391,4.391,0,0,1-1.355,2.777,5.722,5.722,0,0,1-4.017,1.219,2.486,2.486,0,0,0-1.576.4,2.793,2.793,0,0,0-.787,1.379c-.553,1.79-.553,4.658-.553,7.692,0,4.636.541,6.994,1.868,8.14a6.723,6.723,0,0,0,3.179,1.283,37.235,37.235,0,0,0,6.619.436,36.138,36.138,0,0,0,6.608-.45,6.757,6.757,0,0,0,3.183-1.307c1.332-1.16,1.876-3.506,1.876-8.1,0-3,0-5.84-.554-7.649a2.9,2.9,0,0,0-.8-1.417,2.429,2.429,0,0,0-1.562-.41,5.722,5.722,0,0,1-4.017-1.219,4.389,4.389,0,0,1-1.354-2.777s0,0,0,0h-6.756Zm-2.455,12.83a5.84,5.84,0,0,1,5.833-5.834,5.841,5.841,0,0,1,5.834,5.834,5.84,5.84,0,0,1-5.834,5.833A5.839,5.839,0,0,1-3278.667-509.666Zm2.334,0a3.5,3.5,0,0,0,3.5,3.5,3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-3.5-3.5A3.5,3.5,0,0,0-3276.333-509.666ZM-3267-515.5a1.167,1.167,0,0,1,1.167-1.166,1.167,1.167,0,0,1,1.167,1.166,1.167,1.167,0,0,1-1.167,1.167A1.167,1.167,0,0,1-3267-515.5Z" transform="translate(3286.833 524.833)"/>
                    </svg>
                    Tap to add photo
                </button>
            </div>
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="name">Child's name*</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" class="form-control" type="text" name="name" id="name" data-color="dark" placeholder="Your child's full name">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="gender">Gender*</label>
                    <div class="input-wrapper">
                        <select v-model="form.gender" name="gender" id="gender" class="form-control" data-color="dark">
                            <option value="" selected>Select gender</option>
                            <option v-for="gender in getGender" :key="gender.id" :value="gender.name">{{ gender.name }}</option>
                        </select>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.gender">
                        {{ validation.errors.gender[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="dob">Date of birth*</label>
                    <div class="input-wrapper">
                        <input v-model="form.dob" class="form-control" type="date" name="dob" id="dob" data-color="dark" placeholder="Your child's full name">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.dob">
                        {{ validation.errors.dob[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="name">Height (cm)</label>
                    <div class="input-wrapper">
                        <input v-model="form.height" class="form-control" type="number" name="height" id="height" data-color="dark" placeholder="eg. 100">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.height">
                        {{ validation.errors.height[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="about">About your child</label>
                    <div class="input-wrapper">
                        <textarea v-model="form.about" class="form-control" name="about" id="about" rows="3" data-color="dark" placeholder="Tell us a bit about your child"></textarea>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.about">
                        {{ validation.errors.about[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="hobby" class="flx column gap-6">
                        Hobbies
                        <div id="hobby_wrapper" class="bd-dashed pd-16 flx-wrap br-16 flx text-center gap-4 bg-white form-list-holder">
                            <li v-for="i in form.hobbies" :key="i.name" class="flx gap-8 br-8 ai-c form-list-item">
                                <span>{{ i.name }}</span>
                                <a @click.prevent="remFromList(i.name, 'hobby')" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="9" viewBox="0 0 14.647 14.683">
                                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                                    </svg>
                                </a>
                            </li>
                            <li class="flx-1 flx ai-c">
                                <input v-model="hobby" autocomplete="off" @keyup.enter="addToList(hobby, 'hobby')" @focusin="focusIn('hobby_wrapper')" @focusout="focusOut('hobby_wrapper')" class="flx-1" id="hobby" data-type="list" type="text" :placeholder="form.hobbies.length ? 'Press `Enter` after each' : 'Add up to 10 hobbies. Press `Enter` after each'">
                                <i v-if="hobby && form.hobbies.length < 10" class="centered" @click="addToList(hobby, 'hobby')">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 29.25 29.25">
                                        <path d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm6.363,15.75H19.125v5.238a1.125,1.125,0,0,1-2.25,0V19.125H11.637a1.125,1.125,0,0,1,0-2.25h5.238V11.637a1.125,1.125,0,0,1,2.25,0v5.238h5.238a1.125,1.125,0,0,1,0,2.25Z" transform="translate(-3.375 -3.375)" fill="#0173FF"/>
                                    </svg>
                                </i>
                            </li>
                        </div>
                    </label>
                </div>
                <div class="form-row column">
                    <label for="illness" class="flx column gap-6">
                        illnesses
                        <div id="illness_wrapper" class="bd-dashed pd-16 flx-wrap br-16 flx text-center gap-4 bg-white form-list-holder">
                            <li v-for="i in form.illnesses" :key="i.name" class="flx gap-8 br-8 ai-c form-list-item">
                                <span>{{ i.name }}</span>
                                <a @click.prevent="remFromList(i.name, 'illness')" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="9" viewBox="0 0 14.647 14.683">
                                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                                    </svg>
                                </a>
                            </li>
                            <li class="flx-1 flx ai-c">
                                <input v-model="illness" autocomplete="off" @keyup.enter="addToList(illness, 'illness')" @focusin="focusIn('illness_wrapper')" @focusout="focusOut('illness_wrapper')" class="flx-1" id="illness" data-type="list" type="text" :placeholder="form.illnesses.length ? 'Press `Enter` after each' : 'Enter illnesses. Press `Enter` after each'">
                                <i v-if="illness && form.illnesses.length < 10" class="centered" @click="addToList(illness, 'illness')">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 29.25 29.25">
                                        <path d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm6.363,15.75H19.125v5.238a1.125,1.125,0,0,1-2.25,0V19.125H11.637a1.125,1.125,0,0,1,0-2.25h5.238V11.637a1.125,1.125,0,0,1,2.25,0v5.238h5.238a1.125,1.125,0,0,1,0,2.25Z" transform="translate(-3.375 -3.375)" fill="#0173FF"/>
                                    </svg>
                                </i>
                            </li>
                        </div>
                    </label>
                </div>
                <div class="form-row column">
                    <label for="allergy" class="flx column gap-6">
                        Allergies
                        <div id="allergy_wrapper" class="bd-dashed pd-16 flx-wrap br-16 flx text-center gap-4 bg-white form-list-holder">
                            <li v-for="i in form.allergies" :key="i.name" class="flx gap-8 br-8 ai-c form-list-item">
                                <span>{{ i.name }}</span>
                                <a @click.prevent="remFromList(i.name, 'allergy')" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="9" viewBox="0 0 14.647 14.683">
                                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                                    </svg>
                                </a>
                            </li>
                            <li class="flx-1 flx ai-c">
                                <input v-model="allergy" autocomplete="off" @keyup.enter="addToList(allergy, 'allergy')" @focusin="focusIn('allergy_wrapper')" @focusout="focusOut('allergy_wrapper')" class="flx-1" id="allergy" data-type="list" type="text" :placeholder="form.allergies.length ? 'Press `Enter` after each' : 'Enter allergies. Press `Enter` after each'">
                                <i v-if="allergy && form.allergies.length < 10" class="centered" @click="addToList(allergy, 'allergy')">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 29.25 29.25">
                                        <path d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm6.363,15.75H19.125v5.238a1.125,1.125,0,0,1-2.25,0V19.125H11.637a1.125,1.125,0,0,1,0-2.25h5.238V11.637a1.125,1.125,0,0,1,2.25,0v5.238h5.238a1.125,1.125,0,0,1,0,2.25Z" transform="translate(-3.375 -3.375)" fill="#0173FF"/>
                                    </svg>
                                </i>
                            </li>
                        </div>
                    </label>
                </div>
                <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img"> 
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button v-if="auth && forms" @click="doUpdate(forms.id)" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Updating...' : 'Submit update'}}</span>
        </button> 
        <button v-else @click="doSubmit" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Adding...' : 'Add'}}</span>
        </button> 
    </teleport>
</template>
<script>
import { postApi, deleteApi, putApi } from '@/api';
import { mapGetters, mapState } from 'vuex';
import validationMixin from '../../mixins/validationMixin'
import tempImageUploadMixin from '../../mixins/tempImageUpload';
import Spinner from '../includes/Spinner';
import Avatar from '../includes/Avatar'
export default {
    components: { Avatar, Spinner },
    name: 'AddKidsForm',
    computed: {
        ...mapGetters(['getGender', 'getHostname', 'getDefaultImage', 'auth', 'getToken', 'getUser']),
        ...mapState({
            forms: (state) => state.forms.user,
            device: (state) => state.device,
            hobbies: (state) => state.hobbies,
            illnesses: (state) => state.illnesses,
            allergies: (state) => state.allergies
        }),
        token() {
            if(this.auth)
            return this.getToken
            else
            return JSON.parse(localStorage.getItem('newUser')).status.remember_token
        },
        id() {
            if(this.auth)
            return this.getUser.id
            else
            return JSON.parse(localStorage.getItem('newUser')).status.id 
        }
    },
    mixins: [ validationMixin, tempImageUploadMixin ],
    data() {
        return {
            form: {
                name: '',
                gender: '',
                dob: '',
                height: '',
                about: '',
                tempImage: null,
                hobbies: [],
                illnesses: [],
                allergies: []
            },
            hobby: '',
            illness: '',
            allergy: '',
            creating: false,
        }
    },
    methods: {
        deltmp() {
            this.startLoader()
            deleteApi(this.getHostname + "/api/del-temp-upload/" + this.id + '?token=' + this.token)
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
            postApi(this.getHostname+'/api/kid-details?token=' + this.token, this.form)
            .then((res) => {
                this.auth ? this.addToKids(res.data) : this.signupSuccess(res.data.kid)
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
        signupSuccess(res) {
            this.creating = false
            this.clearErrs()
            this.$store.commit('setNewKid', res)
            let stored = JSON.parse(localStorage.getItem('newUser'));
            stored.kids.push(res);
            localStorage.setItem('newUser', JSON.stringify(stored));
            this.$store.commit('closeModal')
        },
        async addToKids(payload) {
            await this.$store.commit('addToKids', payload)
            this.$store.commit('closeModal')
        },
        async updateKids(payload) {
            await this.$store.commit('updateKids', payload)
            this.$store.commit('closeModal')
        },
        async doUpdate(id) {
            this.creating = true
            try {
                const res = await putApi(this.getHostname+'/api/update-kid/'+id+'?token='+this.token, this.form)
                if(res.data) {
                    this.updateKids(res.data)
                }
            } catch (e) {
                this.creating = false
                if(e.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = e.response.data.errors
                }
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        async setUpdate() {
            this.startLoader()
            try {
                const res = await this.$store.dispatch('doPreloadTemp', this.forms.photo)
                this.stopLoader()
                this.setData(res.data.image)
            } catch (e) {
                this.stopLoader()
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
                
            }
        },
        setData(image) {
            this.afterTempUpload(image)
            this.form.name = this.forms.kid_name
            this.form.gender = this.forms.gender
            this.form.dob = this.forms.dob
            this.form.height = this.forms.height
            this.form.about = this.forms.about
            this.form.hobbies = this.hobbies.filter(item => item.kid_id == this.forms.id)
            this.form.illnesses = this.illnesses.filter(item => item.kid_id == this.forms.id)
            this.form.allergies = this.allergies.filter(item => item.kid_id == this.forms.id)
            this.$store.commit('stopFormLoader')
        },
        focusIn(e) {
            document.querySelector('#'+e).classList.add('list-focused')
        },
        focusOut(e) {
            document.querySelector('#'+e).classList.remove('list-focused')
        },
        addToList(payload, name) {
            let array = []
            if(name === 'hobby') {
                array = this.form.hobbies
            }else if(name === 'illness') {
                array = this.form.illnesses
            }else if(name === 'allergy') {
                array = this.form.allergies
            }
            if(array.length < 10 && !this.checkIfExistList(payload, array)) {
                const item = { id: null, name: payload }
                array.push(item)
                this.clearHobbyInput()
            }
        },
        checkIfExistList(payload, array) {
            if(payload) {
                const item = array.find(item => item.name.toLowerCase() == payload.toLowerCase())
                if(item)
                return true
                else
                return false
            }
            else
            return true
        },
        remFromList(payload, name) {
            if(name === 'hobby') {
                this.form.hobbies = this.form.hobbies.filter(item => item.name != payload)
            }else if(name === 'illness') {
                this.form.illnesses = this.form.illnesses.filter(item => item.name != payload)
            }else if(name === 'allergy') {
                this.form.allergies = this.form.allergies.filter(item => item.name != payload)
            }
        },
        clearHobbyInput() {
            this.hobby = ''
            this.illness = ''
            this.allergy = ''
        }
    },
    mounted() {
        this.forms != '' ? this.setUpdate() : this.$store.commit('stopFormLoader')
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
input[type=date] {
    line-height: 1.8 !important;
}
input[data-type=list] {
    border: none;
    background-color: transparent !important;
    &:focus {
        background-color: transparent !important;
    }
    &:visited {
        background-color: transparent !important;
    }
}
.form-list-item {
    padding: 4px 8px;
    text-transform: capitalize;
    background-color: var(--bg-dark);
    color: var(--ft-white);
    font-size: 0.8rem;
    font-weight: 600;
    a {
        &:hover {
            path {
                fill: var(--ft-white);
            }
        }
    }
    i {
        cursor: pointer;
        &:hover {
            path: {
                fill: var(--primary-dark);
            }
        }
    }
}
#illness_wrapper, #allergy_wrapper{
    .form-list-item {
        color: var(--ft-dark);
        a {
            &:hover {
                path {
                    fill: var(--ft-dark);
                }
            }
        }
    }
}
#illness_wrapper{
    .form-list-item {
        background-color: var(--illness);
    }
}
#allergy_wrapper{
    .form-list-item {
        background-color: var(--allergies);
    }
}
.form-list-holder {
    transition: var(--input-btn-transition);
    &:hover {
        border-color: var(--gray);
    }
}
.list-focused{
    border-color: var(--primary-color) !important;
}
</style>