<template>
    <section class="section-main">
        <div class="title-row flx gap-24 ai-c">
            <a class="flx gap-8 ai-c" href="#" @click.prevent="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                Back
            </a>
            <h3 class="title">
                Parent's profile
            </h3>
        </div>
        <div class="flx gap-50 row-column">
            <div class="main-content-card account-card relative flx column gap-24">
                <profile-body-content :user="parent" :village="true" />
            </div>
            <div v-if="device != 'mobile'" class="right flx-grow-1 mt--32">
                <div class="right-row flx ai-c jc-sb mb-16">
                    <div class="flx gap-8 ai-c">
                        <h4>Registered kids</h4><span class="counter-pill">{{ kids.length }}</span>
                    </div>
                </div>
                <div class="flx gap-50 kids overflow-y-scroll scroll-hidden">
                    <div class="kids-column flx column gap-16">
                        <div class="pd-32 centered bg-white br-16" v-if="!kids.length">No kid registered</div>
                        <kids-list v-else :noClick="true" v-for="kid in kids" :key="kid.id" :kid="kid" :id="kid.user_id" />
                    </div>
                </div>
            </div>
            <chat-interface v-if="device != 'mobile'" :chats="chats" :to="parent.id" :name="parent.name" :image="parent.image" :message_id="message_id" @add-to-chat="addToChat" />
            <router-link v-else :to="{ name: 'MessageDetail', params: { to: this.$route.params.parent_id, name: this.$route.params.parent }, replace: true}" class="bg-white gap-8 a-btn a-button ft-primary h-55 mb-32">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.098 20.097">
                    <path d="M-3315.641-785.841a4.226,4.226,0,0,1-.738-.968l-.116-.184a3.734,3.734,0,0,0-1.024-1.151,3.54,3.54,0,0,0-2.038-.523,4.409,4.409,0,0,1-2.31-.554,3.656,3.656,0,0,1-1.406-1.575,12.965,12.965,0,0,1-.89-5.686c0-3.971.539-6,1.921-7.225a6.266,6.266,0,0,1,3.066-1.346,26.849,26.849,0,0,1,5.061-.361,27.6,27.6,0,0,1,5.062.349,6.243,6.243,0,0,1,3.066,1.326c1.383,1.219,1.922,3.254,1.922,7.258,0,2.737-.275,4.5-.89,5.722a3.594,3.594,0,0,1-1.407,1.553,4.482,4.482,0,0,1-2.309.541,3.542,3.542,0,0,0-2.038.523,3.736,3.736,0,0,0-1.024,1.152l-.115.183a4.254,4.254,0,0,1-.738.968,2.153,2.153,0,0,1-1.527.523A2.152,2.152,0,0,1-3315.641-785.841Zm-3.209-17.57a4.779,4.779,0,0,0-2.279.955c-.965.859-1.359,2.588-1.359,5.973a11.771,11.771,0,0,0,.713,4.937,2.014,2.014,0,0,0,.766.885,2.843,2.843,0,0,0,1.453.319,5.142,5.142,0,0,1,2.977.812,5.271,5.271,0,0,1,1.5,1.639c.042.068.082.13.119.19a3.158,3.158,0,0,0,.44.614c.037.033.105.1.409.1s.372-.062.409-.1a3.206,3.206,0,0,0,.439-.614l.12-.19a5.258,5.258,0,0,1,1.5-1.639,5.144,5.144,0,0,1,2.978-.812,2.919,2.919,0,0,0,1.465-.313,1.952,1.952,0,0,0,.755-.859,11.841,11.841,0,0,0,.71-4.968c0-3.416-.392-5.153-1.354-6a4.765,4.765,0,0,0-2.274-.938,26.122,26.122,0,0,0-4.746-.319A25.328,25.328,0,0,0-3318.85-803.411Zm.549,9.719a.837.837,0,0,1-.837-.838.837.837,0,0,1,.837-.837h8.375a.837.837,0,0,1,.837.837.838.838,0,0,1-.837.838Zm5.025-3.35a.838.838,0,0,1-.838-.838.838.838,0,0,1,.838-.837h3.35a.838.838,0,0,1,.837.837.838.838,0,0,1-.837.838Z" transform="translate(3324.163 805.415)" fill="#0173ff"/>
                </svg>
                Send a message
            </router-link>
        </div>
    </section>
</template>
<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import ProfileBodyContent from '@/components/layouts/ProfileBodyContent.vue'
import KidsList from '../../../components/includes/app/KidsList.vue'
import usersLevelMixin from '../../../mixins/usersLevelMixin'
import ChatInterface from '@/components/layouts/ChatInterface.vue'

export default {
  components: { KidsList, ProfileBodyContent, ChatInterface },
    name: 'ViewParentProfile',
    mixins: [ usersLevelMixin ],
    computed: {
        ...mapState({
            token: (state) => state.token,
            messages: (state) => state.messages,
            device: (state) => state.device,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            parent: '',
            kids: [],
            chats: [],
            message_id: ''
        }
    },
    methods: {
        async fetchThisParent() {
            try {
                const res = await postApi(this.hostname+'/api/fetch-this-parent?token='+ this.token, { parent: this.$route.params.parent_id })
                this.parent = res.data.parent
                this.kids = res.data.kids
                this.chats = res.data.chats
                this.message_id = res.data.message_id
                this.$store.commit('stopLoader')
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        addToChat(payload) {
            this.chats.push(payload)
        }
    },
    mounted() {
        this.$store.commit('startLoader')
        this.fetchThisParent()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.account-card{
    width: 35%;
    min-width: 460px;
}

.kids-column{
    width: 100%;
}
.bg-img {
    height: 120px;
    width: 120px;
}
button.del-btn {
    height: 54px;
    color: var(--error);
    background-color: transparent;
    &:hover {
        background-color: rgba(234, 21, 21, 0.1);
    }
}
.edit-btn{
    right: calc($profileSecPadding - 6px);
    top: calc($profileSecPadding - 6px);
    padding: 12px;
}
li {
    width: 100%;
}
.chat, .kids{
    height: calc(100vh - 200px);
}

</style>