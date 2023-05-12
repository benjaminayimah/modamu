<template>
    <section id="messages" class="flx gap-8">
        <div class="message-left h-100">
            <div class="title-row flx jc-sb">
                <div class="flx gap-8 ai-c">
                    <h1 class="title">Messages</h1>
                    <span class="count-info count-primary">{{ messages.length }}</span>
                </div>
                <button class="toggle-btn br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                        <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                    </svg>
                </button>
            </div>
            <div v-if="!messages.length" class="bg-white mt-24 pd-24 br-16 centered">
                    No Messages
            </div>
            <div v-else class="flx column gap-16 message-body">
                <message-lists v-for="message in messages" :key="message.id" :message="message"/>
            </div>
        </div>
        <div class="message-right h-100 flx-grow-1">
            <router-view></router-view>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import MessageLists from '../../components/includes/app/MessageLists.vue'
export default {
  components: { MessageLists },
    name: 'MessagePage',
    computed: mapState({
        messages: (state) => state.messages
    })
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
    height: calc(100vh - 133px);
}

.message-left{
    width: 350px;
    // height: calc(100vh - 149px);
    // border-right: 1px solid #e3e5ef;
    padding-right: 16px;
}
.message-right{
    // background-color: #fff;
}
button.toggle-btn{
    height: 45px;
    width: 45px;
    padding: 0;
    background-color: transparent;
    &:hover {
        background-color: var(--input-hover);
    }
}
.title-row{
    margin-bottom: 0;
}
.message-body {
    padding: 24px 0;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
}
</style>