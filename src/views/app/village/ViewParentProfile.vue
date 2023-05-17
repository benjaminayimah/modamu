<template>
    <section>
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
                <div class="flx gap-50">
                    <div class="kids-column flx column gap-16">
                        <div v-if="!kids.length">Not found</div>
                        <kids-list v-else :noClick="true" v-for="kid in kids" :key="kid.id" :kid="kid" :id="kid.user_id"/>
                    </div>
                </div>
            </div>
            <div v-if="device != 'mobile'" class="chat br-24 column flx jc-sb flx-grow-1">
                <div class="chat-top chat-padd bg-white br-16">
                    <div class="flx gap-16 ai-c">
                        <profile-avatar :image="parent.image" :id="parent.id"/>
                        <strong>{{ parent.name }}</strong>
                    </div>
                </div>
                <div class="chat-body chat-padd flx-grow-1">
                    <div v-if="!messages.length" class="centered">
                        No messages yet 
                    </div>
                    <div v-else>

                    </div>
                </div>
                <div class="chat-footer flx chat-padd bg-white ai-c br-16">
                    <button class="">
                        <svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 0 13.374 24.089">
                            <path d="M14.106,23.733a6.484,6.484,0,0,1-4.742-1.927,6.362,6.362,0,0,1-1.945-4.7V4.462a4.618,4.618,0,0,1,1.429-3.4A4.705,4.705,0,0,1,12.282-.355,4.705,4.705,0,0,1,15.717,1.06a4.618,4.618,0,0,1,1.429,3.4V15.9a2.893,2.893,0,0,1-.881,2.138,3.1,3.1,0,0,1-4.316,0,2.894,2.894,0,0,1-.881-2.138V4.462H12.89V15.9a1.157,1.157,0,0,0,.35.858,1.255,1.255,0,0,0,1.733,0,1.159,1.159,0,0,0,.349-.858V4.462a2.894,2.894,0,0,0-.882-2.138,2.949,2.949,0,0,0-2.158-.873,2.949,2.949,0,0,0-2.158.873,2.894,2.894,0,0,0-.881,2.138V17.109a4.618,4.618,0,0,0,1.429,3.4,4.875,4.875,0,0,0,6.869,0,4.617,4.617,0,0,0,1.429-3.4V4.462h1.824V17.109a6.362,6.362,0,0,1-1.945,4.7A6.484,6.484,0,0,1,14.106,23.733Z" transform="translate(-7.419 0.355)" fill="#0173ff"/>
                        </svg>
                    </button>
                    <div class="chat-input-wrapper flx-grow-1">
                        <input type="text" class="form-control" data-color="dark">
                        <i></i>
                    </div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="23.256" viewBox="0 0 23.256 23.256">
                            <path d="M-3281.062-501.973a7.305,7.305,0,0,1-3.548-1.5c-1.6-1.381-2.223-3.687-2.223-8.226a25.925,25.925,0,0,1,.545-6.962,4.111,4.111,0,0,1,1.295-2.086,3.877,3.877,0,0,1,2.521-.762,3.064,3.064,0,0,0,2.044-.519,1.757,1.757,0,0,0,.5-1.142l.027-.191c.02-.148.038-.276.069-.419a1.4,1.4,0,0,1,.221-.531l.01-.013a1.008,1.008,0,0,1,.2-.2,1.246,1.246,0,0,1,.306-.163,2.787,2.787,0,0,1,.982-.143h5.814a2.79,2.79,0,0,1,.981.143,1.258,1.258,0,0,1,.3.162.99.99,0,0,1,.2.2l.007.01a1.391,1.391,0,0,1,.223.534c.032.141.049.268.07.414v0c.008.057.016.12.026.193a1.758,1.758,0,0,0,.5,1.141,3.06,3.06,0,0,0,2.043.519,3.836,3.836,0,0,1,2.521.777,4.2,4.2,0,0,1,1.294,2.112,25.762,25.762,0,0,1,.545,6.92c0,4.5-.624,6.8-2.223,8.189a7.322,7.322,0,0,1-3.548,1.526,31.693,31.693,0,0,1-5.856.41A32.64,32.64,0,0,1-3281.062-501.973Zm3.051-20.92a3.648,3.648,0,0,1-1.126,2.307,4.752,4.752,0,0,1-3.336,1.013,2.064,2.064,0,0,0-1.309.336,2.32,2.32,0,0,0-.654,1.145,25.464,25.464,0,0,0-.459,6.389c0,3.85.449,5.809,1.552,6.76a5.583,5.583,0,0,0,2.64,1.065,30.929,30.929,0,0,0,5.5.362,30.016,30.016,0,0,0,5.488-.374,5.61,5.61,0,0,0,2.644-1.085c1.106-.964,1.558-2.912,1.558-6.728a25.252,25.252,0,0,0-.46-6.353,2.409,2.409,0,0,0-.666-1.177,2.017,2.017,0,0,0-1.3-.341,4.752,4.752,0,0,1-3.336-1.013,3.645,3.645,0,0,1-1.125-2.307s0,0,0,0h-5.611Zm-2.039,10.656a4.85,4.85,0,0,1,4.844-4.845,4.851,4.851,0,0,1,4.846,4.845,4.851,4.851,0,0,1-4.846,4.845A4.85,4.85,0,0,1-3280.05-512.236Zm1.938,0a2.91,2.91,0,0,0,2.906,2.907,2.91,2.91,0,0,0,2.907-2.907,2.91,2.91,0,0,0-2.907-2.907A2.91,2.91,0,0,0-3278.112-512.236Zm7.752-4.846a.969.969,0,0,1,.969-.969.969.969,0,0,1,.969.969.969.969,0,0,1-.969.969A.969.969,0,0,1-3270.36-517.082Z" transform="translate(3286.833 524.833)" fill="#0173ff"/>
                        </svg>
                    </button>
                </div>
            </div>
            <button v-else class="bg-white gap-8 ft-primary h-55 mb-32">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.098 20.097">
                    <path d="M-3315.641-785.841a4.226,4.226,0,0,1-.738-.968l-.116-.184a3.734,3.734,0,0,0-1.024-1.151,3.54,3.54,0,0,0-2.038-.523,4.409,4.409,0,0,1-2.31-.554,3.656,3.656,0,0,1-1.406-1.575,12.965,12.965,0,0,1-.89-5.686c0-3.971.539-6,1.921-7.225a6.266,6.266,0,0,1,3.066-1.346,26.849,26.849,0,0,1,5.061-.361,27.6,27.6,0,0,1,5.062.349,6.243,6.243,0,0,1,3.066,1.326c1.383,1.219,1.922,3.254,1.922,7.258,0,2.737-.275,4.5-.89,5.722a3.594,3.594,0,0,1-1.407,1.553,4.482,4.482,0,0,1-2.309.541,3.542,3.542,0,0,0-2.038.523,3.736,3.736,0,0,0-1.024,1.152l-.115.183a4.254,4.254,0,0,1-.738.968,2.153,2.153,0,0,1-1.527.523A2.152,2.152,0,0,1-3315.641-785.841Zm-3.209-17.57a4.779,4.779,0,0,0-2.279.955c-.965.859-1.359,2.588-1.359,5.973a11.771,11.771,0,0,0,.713,4.937,2.014,2.014,0,0,0,.766.885,2.843,2.843,0,0,0,1.453.319,5.142,5.142,0,0,1,2.977.812,5.271,5.271,0,0,1,1.5,1.639c.042.068.082.13.119.19a3.158,3.158,0,0,0,.44.614c.037.033.105.1.409.1s.372-.062.409-.1a3.206,3.206,0,0,0,.439-.614l.12-.19a5.258,5.258,0,0,1,1.5-1.639,5.144,5.144,0,0,1,2.978-.812,2.919,2.919,0,0,0,1.465-.313,1.952,1.952,0,0,0,.755-.859,11.841,11.841,0,0,0,.71-4.968c0-3.416-.392-5.153-1.354-6a4.765,4.765,0,0,0-2.274-.938,26.122,26.122,0,0,0-4.746-.319A25.328,25.328,0,0,0-3318.85-803.411Zm.549,9.719a.837.837,0,0,1-.837-.838.837.837,0,0,1,.837-.837h8.375a.837.837,0,0,1,.837.837.838.838,0,0,1-.837.838Zm5.025-3.35a.838.838,0,0,1-.838-.838.838.838,0,0,1,.838-.837h3.35a.838.838,0,0,1,.837.837.838.838,0,0,1-.837.838Z" transform="translate(3324.163 805.415)" fill="#0173ff"/>
                </svg>
                Send a message
            </button>
        </div>
    </section>
</template>
<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import ProfileBodyContent from '@/components/layouts/ProfileBodyContent.vue'
import KidsList from '../../../components/includes/app/KidsList.vue'
import ProfileAvatar from '../../../components/includes/app/ProfileAvatar.vue'
import usersLevelMixin from '../../../mixins/usersLevelMixin'

export default {
  components: { ProfileAvatar, KidsList, ProfileBodyContent },
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
            kids: []
        }
    },
    methods: {
        async fetchThisParent() {
            try {
                const res = await postApi(this.hostname+'/api/fetch-this-parent?token='+ this.token, { parent: this.$route.params.parent_id, event: this.$route.params.event })
                this.parent = res.data.parent
                this.kids = res.data.kids
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
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
.chat{
    background-color: #F1F7FF;
    height: calc(100vh - 200px);
    width: 35%;
    min-width: 460px;
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
.chat-input-wrapper{
    padding: 0 16px
}
.chat-padd{
    padding: 16px 24px;
}
.chat-top{
    .bg-img{
        height: 56px;
        width: 56px;
    }
}
.chat-top{
    background-color: rgba(255, 255, 255, 0.3);
}

</style>