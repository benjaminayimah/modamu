<template>
    <teleport to="#modal_content">
        <div>
            <div class="modal-title flx column ai-c gap-8 mb-32">
                <h3 id="modal_title">Verify {{ computedFirstName(kid.name) }}'s code</h3>
                <div>Enter {{ computedFirstName(kid.name) }}'s checkout code to verify</div>
            </div>
            <div class="flx jc-c mb-32">
                <profile-avatar :id="kid.user_id" :image="kid.photo" />
            </div>
            <div v-if="userError.error" class="invalid-credentials mb-24 text-center">
                <span>{{ userError.message }}</span>
            </div>
            <form @submit.prevent="submitCode" class="flx column gap-24">
                <div class="form-row column">
                    <label for="current_password" class="text-center">Checkout code</label>
                    <div class="input-wrapper">
                        <input v-model="form.code" autocomplete="off" class="form-control text-center" type="text" id="checkout_code" name="checkout_code" data-color="dark" placeholder="xxxxx">
                    </div>
                    <span class="input-error text-center" v-if="validation.error && validation.errors.checkout_code">
                        {{ validation.errors.checkout_code[0] }}
                    </span>
                </div>
                <button @click="checkOut" class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                    <span>{{ creating ? 'Verifying...' : 'Verify'}}</span>
                </button> 
            </form>
        </div>
    </teleport>
</template>
<script>
import { postApi } from '@/api'
import userNameMixin from '@/mixins/userNameMixin'
import Spinner from '@/components/includes/Spinner.vue'
import inputValMixin from '@/mixins/inputValMixin'
import { mapState } from 'vuex'
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue'
export default {
    components: { Spinner, ProfileAvatar },
    name: 'VerifyCodeModal',
    mixins: [inputValMixin, userNameMixin],
    computed: {
        ...mapState({
            kid: (state) => state.forms.user,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            form: {
                code: ''
            },
            creating: false
        }
    },
    methods: {
        async checkOut() {
            this.validation.error || this.userError.error ? this.clearErrs() : ''
            this.creating = true
            try {
                const res = await postApi(this.hostname+'/api/check-out-kid?token='+this.token, { id: this.kid.id, event: this.kid.event_id, checkout_code: this.form.code});
                this.creating = false
                if(!res.data.error) {
                    this.$store.commit('updateAttendees', res.data)
                    this.$store.commit('closeModal')
                }
                if(res.data.error) {
                    this.userError.error = true
                    this.userError.message = res.data.msg
                }
            } catch (error) {
                this.creating = false
                if(error.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = error.response.data.errors
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.input-error{
    font-size: 0.9rem;
}
.bg-img {
    height: 100px;
    width: 100px;
}
.form-control {
    font-size: 1.3rem !important;
}
</style>