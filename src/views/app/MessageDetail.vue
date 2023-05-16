<template>
    <div class="flx right-container">
        <div class="chat br-24 column flx jc-sb flx-grow-1">
            <div class="chat-top chat-padd br-16 ai-c jc-sb flx">
                <div class="flx gap-4">
                    <a href="#" @click.prevent="$router.go(-1)"  class="centered br-50 back">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8.414 14.828">
                            <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                    </a>
                    <button @click="doOpenParent" class="flx gap-8 ai-c br-32 bg-transparent">
                        <profile-avatar :image="null" :id="null"/>
                        <strong class="wrap-text wrap-line-1">Parent name</strong>
                    </button>
                </div>
                <a href="#" @click.prevent=""  class="centered br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 5.501 21.604">
                        <path id="menu" d="M-3377.717-559.421a2.753,2.753,0,0,1,2.75-2.749,2.753,2.753,0,0,1,2.75,2.749,2.754,2.754,0,0,1-2.75,2.75A2.754,2.754,0,0,1-3377.717-559.421Zm1,0a1.752,1.752,0,0,0,1.75,1.751,1.752,1.752,0,0,0,1.75-1.751,1.751,1.751,0,0,0-1.75-1.75A1.751,1.751,0,0,0-3376.716-559.421Zm-1-8.051a2.754,2.754,0,0,1,2.75-2.75,2.754,2.754,0,0,1,2.75,2.75,2.753,2.753,0,0,1-2.75,2.75A2.753,2.753,0,0,1-3377.717-567.473Zm1,0a1.751,1.751,0,0,0,1.75,1.75,1.751,1.751,0,0,0,1.75-1.75,1.752,1.752,0,0,0-1.75-1.75A1.752,1.752,0,0,0-3376.716-567.473Zm-1-8.051a2.754,2.754,0,0,1,2.75-2.75,2.754,2.754,0,0,1,2.75,2.75,2.753,2.753,0,0,1-2.75,2.75A2.753,2.753,0,0,1-3377.717-575.524Zm1,0a1.751,1.751,0,0,0,1.75,1.75,1.751,1.751,0,0,0,1.75-1.75,1.752,1.752,0,0,0-1.75-1.75A1.752,1.752,0,0,0-3376.716-575.524Z" transform="translate(3377.717 578.274)"/>
                    </svg>
                </a>
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
        <message-detail-parent-view v-if="openDetails" :parent="getUser" @close="doClose"/>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapState } from 'vuex';
import ProfileAvatar from '../../components/includes/app/ProfileAvatar.vue'
const MessageDetailParentView = defineAsyncComponent(() => import(/* webpackChunkName: MessageDetailKidsView */'./MessageDetailParentView.vue'));
export default {
  components: { ProfileAvatar, MessageDetailParentView },
    name: 'MessageDetail',
    computed: {
        ...mapGetters(['getUser']),
        ...mapState({
            messages: (state) => state.messages,
            device: (state) => state.device
        }),
    },
    data() {
        return {
            openDetails: false
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
.chat-input-wrapper{
    padding: 0 16px
}
.chat-padd{
    padding: 16px;
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
a{
    height: var(--img-height);
    width: var(--img-height);
    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.04);

    }
}
</style>