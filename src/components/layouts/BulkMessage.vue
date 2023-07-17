<template>
    <div class="fixed br-16 bg-white bulk-email-wrapper" id="bulk_message">
        <contacts-card  @select-contact="selectContact" :active="contactList" />
        <div class="bulk-inner flx column h-100">
            <div class="modal-top flx jc-sb ai-c br-16">
                <h4>Send bulk email notification</h4>
                <button @click="$store.commit('closeBulkMessage')" class="br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                    </svg>
                </button>
            </div>
            <div class="body flx-grow-1 flx column jc-sb">
                <div class="flx column gap-16">
                    <div class="flx jc-c">
                        <button v-if="!selections.length" @click="selectContact" class="gap-4 bg-white fs-09 btn-sm ft-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.132 15.132">
                                <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#0173ff"/>
                            </svg>
                            Recipients
                        </button>
                        <div v-else class="stack-cards ai-c">
                            <profile-avatar v-for="item in selections.slice(0, 6)" :key="item.id" :id="item.id" :image="item.image" />
                            <div v-if="selections.length > 6" class="fw-700 bg-img counter bg-white centered br-32">+{{ selections.length - 6 }} Recipients</div>
                            <button @click="selectContact" title="Add recipients" class="br-50 edit-btn bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.132 15.132">
                                    <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#0173ff"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="secondary-input-wrapper input-wrapper" id="email_subject">
                            <label for="subjectInput">Subject</label>
                            <input v-model="subject" id="subjectInput" autocomplete="off" @input="isFocusedIn('email_subject')" @focusin="isFocusedIn('email_subject')" @focusout="isFocusedOut('email_subject', 'subjectInput')" type="text" placeholder="" class="form-control">
                        </div>
                        <div class="secondary-input-wrapper input-wrapper" id="email_message">
                            <label for="messageInput">Message</label>
                            <textarea v-model="message" name="message" id="messageInput" class="w-100 br-0" @input="isFocusedIn('email_message')" @focusin="isFocusedIn('email_message')" @focusout="isFocusedOut('email_message', 'messageInput')"></textarea>
                        </div>
                    </div>
                </div>
                <div class="flx jc-fe ai-c gap-16">
                    <div class="danger">{{ error }}</div>
                    <button @click="doSubmit" class="button-primary btn-sm gap-8" :disabled="submitting ? true : false">
                        {{ submitting ? 'Sending' : 'Send'}}
                        <spinner v-if="submitting" v-bind:size="20" v-bind:white="true" />
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="20.122" viewBox="0 0 20.786 20.122">
                            <path d="M14.044,20.569a2.508,2.508,0,0,1-2.085-1.294,4.853,4.853,0,0,1-.5-1.046l-2.1-5.245-6.511-2.6a2.085,2.085,0,0,1-1.4-2.114A2.289,2.289,0,0,1,3.26,6.148L18.17.7a3.372,3.372,0,0,1,3.265.395,2.877,2.877,0,0,1,.553,3.183L16.552,18.345a2.84,2.84,0,0,1-2.486,2.224ZM11.3,12.455l2.025,5.062a.8.8,0,0,1,.028.08c.135.428.488.974.689.972.243,0,.508-.511.591-.8a.782.782,0,0,1,.033-.1L20.126,3.551l.006-.016c.055-.145.21-.732-.031-.947-.285-.255-1.007-.1-1.223-.014l-.016.006L3.887,8.048a.657.657,0,0,1-.129.038c-.044.013-.309.1-.312.226a.3.3,0,0,0,.029.168l.069.025,6.344,2.538,3.46-3.46A1,1,0,0,1,14.763,9Z" transform="translate(-1.446 -0.447)" fill="#fff"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api';
import ProfileAvatar from '@/components/includes/app/ProfileAvatar.vue';
import { mapState } from 'vuex';
import inputValMixin from '@/mixins/inputValMixin';
import ContactsCard from './ContactsCard.vue';
import Spinner from '../includes/Spinner.vue';
export default {
    components: { ContactsCard, ProfileAvatar, Spinner },
    name: 'BulkMessage',
    mixins: [inputValMixin],
    computed: {
        ...mapState({
            selections: (state) => state.contactSelections,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            subject: '',
            message: '',
            contactList: false,
            submitting: false,
            error: ''
        }
    },
    methods: {
        selectContact() {
            this.contactList = !this.contactList
        },
        async doSubmit() {
            if(!this.runChecks()) {
                return false
            }
            this.clearError()
            this.submitting = true
            try {
                const res = await postApi(this.hostname +'/api/send-bulk-message?token='+ this.token, { subject: this.subject, message: this.message, recipients: this.selections })
                this.subject = ''
                this.message = ''
                this.$store.commit('closeBulkMessage')
                this.submitting = false
                console.log(res.data)
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
                if(e.response.status == 500) {
                    this.showError(e.response.data)
                }
                this.submitting = false
            }
        },
        runChecks() {
            if(!this.selections.length) {
                this.showError('Select recipients')
            }else if(!this.subject) {
                this.showError('Enter subject')
                return false
            }else if(!this.message) {
                this.showError('Enter message')
            }
            else
            return true
        },
        showError(msg) {
            this.error = msg
        },
        clearError() {
            this.error = ''
        }
    }
    
}
</script>

<style lang="scss" scoped>
.bulk-email-wrapper{
    box-shadow: 0 1px 15px 0 rgba(78, 78, 78, 0.1);
    height: calc(100vh - 140px);
    bottom: 12px;
    z-index: 20;
    overflow: hidden;
    width: 450px;
}
.body{
    padding: 12px 20px 28px 20px;
}
.input-wrapper{
    input {
        border-radius: 0;
        border-bottom: 1px solid var(--light-gray);
        padding: 28px 0 16px 0;
    }
}
.btn-sm {
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

}
textarea {
    height: calc(100dvh - 430px);
    padding: 28px 0;
    resize: none;
}
label {
    background-color: #fff;
}

.stack-cards {
    --height: 58px;
    height: var(--height);
    .bg-img{
        height: var(--height);
        width: var(--height);
        border: 2px solid var(--bg-white);
    }
    .counter {
        width: unset;
    }
    .edit-btn{
        height: 50px;
        width: 50px;
        margin-left: 20px;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    }
}


</style>