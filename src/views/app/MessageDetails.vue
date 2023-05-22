<template>
    <div class="flx right-container">
        <chat-interface :back="true" :chats="chats" :name="$route.params.name" :image="image" :message_id="$route.params.id" :to="$route.params.to" @open-details="doOpenParent" @add-to-chat="addToChat" />
        <message-detail-parent-view v-if="openDetails" :parent="user" @close="doClose"/>
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
            user: (state) => state.user,
            device: (state) => state.device,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
    },
    data() {
        return {
            openDetails: false,
            chats: [],
            image: ''
        }
    },
    methods: {
        doClose() {
            this.openDetails = false
        },
        doOpenParent() {
            this.openDetails = true
        },
        addToChat(payload) {
            this.chats.push(payload)
        },
        async fetchChats() {
            try {
                const res = await postApi(this.hostname + '/api/fetch-this-chats/'+ this.$route.params.id +'?token='+this.token)
                this.chats = res.data.chats
                this.image = res.data.image
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.fetchChats()
        this.device == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>
<style lang="scss" scoped>

.right-container{
    height: calc(100vh - 133px);

}

</style>