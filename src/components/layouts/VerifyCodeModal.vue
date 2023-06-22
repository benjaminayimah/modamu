<template>
    <teleport to="#modal_title">
        Verify {{ computedFirstName(attendee.kid_name) }}'s code
    </teleport>
    <teleport to="#modal_content">
        <div>
            <div class="modal-title flx column ai-c gap-8 mb-32">
                <div>Enter {{ computedFirstName(attendee.kid_name) }}'s checkout code to verify</div>
            </div>
            <div class="flx jc-c mb-32">
                <profile-avatar :id="attendee.user_id" :image="attendee.photo" />
            </div>
            <div v-if="userError.error" class="invalid-credentials response-message mb-24 text-center">
                <span>{{ userError.message }}</span>
            </div>
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="current_password" class="text-center">Checkout code</label>
                    <div class="input-wrapper">
                        <input v-model="form.code" autocomplete="off" class="form-control text-center" type="text" id="checkout_code" name="checkout_code" data-color="dark" placeholder="xxxxx">
                    </div>
                    <span class="input-error text-center" v-if="validation.error && validation.errors.checkout_code">
                        {{ validation.errors.checkout_code[0] }}
                    </span>
                </div> 
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button @click="checkOut" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            <span>{{ creating ? 'Verifying...' : 'Verify'}}</span>
        </button>
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
            attendee: (state) => state.forms.user,
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
                const res = await postApi(this.hostname+'/api/check-out-kid?token='+this.token, { id: this.attendee.id, checkout_code: this.form.code});
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
    },
    mounted() {
        this.$store.commit('stopFormLoader')
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