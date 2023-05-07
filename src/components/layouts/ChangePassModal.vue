<template>
    <teleport to="#modal_content">
        <div>
            <div class="modal-title flx column ai-c gap-8 mb-32">
                <h3 id="modal_title">Change your password</h3>
            </div>
            <form @submit.prevent="submitPass" class="flx column gap-24">
                <div class="form-row column">
                    <label for="current_password">Current password</label>
                    <div class="input-wrapper">
                        <input v-model="form.current_password" autocomplete="off" class="form-control" type="password" id="current_password" name="password_confirmation" data-color="dark" placeholder="Provide your current password">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.current_password">
                        {{ validation.errors.current_password[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="password">New password</label>
                    <div class="input-wrapper">
                        <input v-model="form.new_password" autocomplete="off" class="form-control" type="password" id="new_password" name="password" data-color="dark" placeholder="Enter a new password">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.new_password">
                        {{ validation.errors.new_password[0] }}
                    </span>
                </div>
                <button @click="doSubmit" class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                    <span>{{ creating ? 'Submitting...' : 'Submit password'}}</span>
                </button>  
            </form>
        </div>
    </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import validationMixin from '../../mixins/validationMixin'
import Spinner from '../includes/Spinner';
export default {
  components: { Spinner },
    name: 'ChangePassModal',
    computed: mapGetters(['getHostname', 'getDefaultImage', 'getToken']),
    mixins: [ validationMixin ],
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
            axios.post(this.getHostname + "/api/change-password?token=" + this.getToken, this.form)
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