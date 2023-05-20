<template>
    <div class="flx right-container">
        <chat-interface :chats="chats" :name="$route.params.name" @open-details="doOpenParent" />
        <message-detail-parent-view v-if="openDetails" :parent="user" @close="doClose"/>
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
            user: (state) => state.user,
            device: (state) => state.device
        }),
    },
    data() {
        return {
            openDetails: false,
            chats: [
                { id: 1, chat: 'Hi there, i would love to enquire about i would love to enquire about the type of service you provide at Modamu village.', state: 1},
                { id: 2, chat: 'Please also, you can reach out to me on 222 555 437. Thnak you, Chao!', state: 1},
                { id: 3, chat: 'Hello John, Our purpose is clear: to offer affordable and top-notch childcare precisely when you need it.', state: 0 },
                { id: 4, chat: 'Picture this: every Saturday evening for 4 hours, we watch your kids while you unwind, relax, and recharge.', state: 0 },
                { id: 5, chat: 'Wow! Thanks so much, it\'s all clear now. I will definately wish to be part of this. I will sign up very soon. Thanks.', state: 1 },
                { id: 6, chat: 'You\'re most welcome, John. See you soon! Chao!', state: 0 },
            ]
        }
    },
    methods: {
        doClose() {
            this.openDetails = false
        },
        doOpenParent() {
            this.openDetails = true
        }
    },
    mounted() {
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