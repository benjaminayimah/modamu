<template>
    <div class="flx right-container">
        <chat-interface :back="true" :chats="chats" :name="$route.params.name" :image="image" :message_id="$route.params.id" :to="$route.params.to" @add-to-chat="addToChat" />
        <message-detail-parent-view v-if="msgParentDetails" :to_id="$route.params.to"/>
    </div>
</template>
<script>
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
            chats: (state) => state.chats,
            image: (state) => state.chatImage,
            msgParentDetails: (state) => state.msgParentDetails
        }),
    },
    data() {
        return {
            openDetails: false,
            // chats: [],
            // image: ''
        }
    },
    methods: {
        addToChat(payload) {
            this.chats.push(payload)
        }
    },
    mounted() {
        this.$store.dispatch('fetchChats', {id: this.$route.params.id, name: null, to: null})
        this.device == 'mobile' ? document.body.classList.add('fixed-body') : ''
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