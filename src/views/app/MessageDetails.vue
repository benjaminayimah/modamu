<template>
    <div class="flx right-container">
        <chat-interface :back="true" :chats="chats" :name="$route.params.name" :image="image" :message_id="message_id" :to="$route.params.to" @add-to-chat="addToChat" />
        <message-detail-parent-view v-if="msgParentDetails" :to_id="$route.params.to"/>
    </div>
</template>
<script>
import { postApi } from '@/api';
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';
import ChatInterface from '@/components/layouts/ChatInterface.vue';
const MessageDetailParentView = defineAsyncComponent(() => import(/* webpackChunkName: MessageDetailKidsView */'./MessageDetailParentView.vue'));
export default {
    components: { MessageDetailParentView, ChatInterface },
    name: 'MessageDetails',
    computed: {
        ...mapState({
            device: (state) => state.device,
            // chats: (state) => state.chats,
            // image: (state) => state.chatImage,
            msgParentDetails: (state) => state.msgParentDetails,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
    },
    watch: {
        '$route.params.to'(newValue) {
            this.fetchThisChats(newValue);
        }
    },
    data() {
        return {
            routeParam: null,
            openDetails: false,
            chats: [],
            image: '',
            message_id: ''
        }
    },
    methods: {
        addToChat(payload) {
            this.chats.push(payload)
        },
        async fetchThisChats() {
            try {
                const res = await postApi(this.hostname + '/api/fetch-this-chats/' + this.$route.params.to + '?token='+ this.token)
                this.chats = res.data.chats
                this.image = res.data.image
                this.message_id = res.data.id
                this.$store.commit('setRead', res.data.id)
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        }
    },
    mounted() {
        this.fetchThisChats()
        this.device == 'mobile' ? document.body.classList.add('fixed-body') : ''
        this.routeParam = this.$route.params.to
    },
    unmounted() {
        this.device == 'mobile' ? document.body.classList.remove('fixed-body') : ''
    }
}

</script>
<style lang="scss" scoped>

.right-container{
    height: calc(100vh - 133px);

}

</style>