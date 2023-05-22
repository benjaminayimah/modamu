<template>
    <div class="chat br-24 column flx jc-sb flx-grow-1">
        <div class="chat-top chat-padd br-16 jc-sb ai-c flx">
            <div class="flx gap-4 ai-c">
                <a v-if="back" href="#" @click.prevent="$router.go(-1)"  class="centered br-50 back">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                        <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </a>
                <button @click="$emit('open-details')" class="flx gap-8 ai-c br-32 bg-transparent">
                    <profile-avatar :image="image" :id="to"/>
                    <strong class="wrap-text wrap-line-1">{{ name }}</strong>
                </button>
            </div>
            <a v-if="back" href="#" @click.prevent=""  class="centered br-50 more">
                <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 5.501 21.604">
                    <path id="menu" d="M-3377.717-559.421a2.753,2.753,0,0,1,2.75-2.749,2.753,2.753,0,0,1,2.75,2.749,2.754,2.754,0,0,1-2.75,2.75A2.754,2.754,0,0,1-3377.717-559.421Zm1,0a1.752,1.752,0,0,0,1.75,1.751,1.752,1.752,0,0,0,1.75-1.751,1.751,1.751,0,0,0-1.75-1.75A1.751,1.751,0,0,0-3376.716-559.421Zm-1-8.051a2.754,2.754,0,0,1,2.75-2.75,2.754,2.754,0,0,1,2.75,2.75,2.753,2.753,0,0,1-2.75,2.75A2.753,2.753,0,0,1-3377.717-567.473Zm1,0a1.751,1.751,0,0,0,1.75,1.75,1.751,1.751,0,0,0,1.75-1.75,1.752,1.752,0,0,0-1.75-1.75A1.752,1.752,0,0,0-3376.716-567.473Zm-1-8.051a2.754,2.754,0,0,1,2.75-2.75,2.754,2.754,0,0,1,2.75,2.75,2.753,2.753,0,0,1-2.75,2.75A2.753,2.753,0,0,1-3377.717-575.524Zm1,0a1.751,1.751,0,0,0,1.75,1.75,1.751,1.751,0,0,0,1.75-1.75,1.752,1.752,0,0,0-1.75-1.75A1.752,1.752,0,0,0-3376.716-575.524Z" transform="translate(3377.717 578.274)"/>
                </svg>
            </a>
        </div>
        <div class="chat-body chat-padd flx-grow-1 overflow-y-scroll scroll-hidden">
            <div v-if="!chats.length" class="centered">
                No messages yet 
            </div>
            <chat-body :chats="chats" v-else />
        </div>
        <div class="chat-footer chat-padd bg-white br-16">
            <form @submit.prevent="doSubmit" class="flx ai-c gap-16">
                <div class="chat-input-wrapper flx-grow-1">
                    <input v-model="form.chat" type="text" class="form-control" data-color="dark" placeholder="Type a message">
                    <i></i>
                </div>
                <button class="send-btn br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 30.002 30">
                        <path d="M30.707,1.293a1,1,0,0,0-1.013-.245l-28,9a1,1,0,0,0-.2,1.816L11.4,17.643,21,11l-6.643,9.6,5.779,9.9A1,1,0,0,0,21,31a.976.976,0,0,0,.108-.006,1,1,0,0,0,.844-.688l9-28a1,1,0,0,0-.245-1.013Z" transform="translate(-0.998 -1)" fill="#0173FF"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api';
import { mapState } from 'vuex';
import ProfileAvatar from '../includes/app/ProfileAvatar.vue';
import ChatBody from './ChatBody.vue';
export default {
  components: { ProfileAvatar, ChatBody },
    name: 'ChatInterface',
    props: ['chats', 'name', 'image', 'message_id', 'to', 'back'],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form: {
                chat: '',
                message_id: '',
                to: ''
            }
        }
    },
    methods: {
        async doSubmit() {
            try {
                const res = await postApi(this.hostname + '/api/send-chat?token='+ this.token,
                { chat: this.form.chat, message_id: this.message_id, to: this.to })
                if(this.form.message_id == 0) {
                    this.$store.commit('setMessages', res.data.messages)
                    this.form.message_id = res.data.message.id
                }else {
                    this.$store.commit('updateMessages', res.data.message)
                }
                this.$emit('add-to-chat', res.data.chat)
                this.form.chat = ''
            } catch (error) {
                console.error(error)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
//chat
.chat{
    padding: 8px;
    background-color: var(--input-hover);
}
.chat-footer{
    .form-control {
        height: 48px;
        padding: 0 20px;
    }
    button {
        background-color: unset;
        padding: unset;
    }
}

.chat-padd{
    padding: 8px;
}
.chat-top{
    --img-height: 50px;
    background-color: rgb(178 203 243);
    .bg-img{
        height: var(--img-height);
        width: var(--img-height);
    }
}
.bg-transparent{
    padding: 4px 32px 4px 4px;
    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.04);

    }

}
.back{
    margin-left: -8px;
}
.more {
    margin-right: -8px;
}
a, .send-btn{
    height: var(--img-height);
    width: var(--img-height);
    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.04);
    }
}
.send-btn{
    height: 48px;
    width: 48px;
}
</style>