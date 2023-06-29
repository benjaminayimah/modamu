<template>
    <section id="messages" class="flx gap-8 section-main">
        <div class="message-left h-100">
            <div class="title-row">
                <div class="flx jc-sb ai-c gap-8">
                    <div v-if="!searchToggle" class="flx gap-8 ai-c">
                        <h1 class="title">Messages</h1>
                        <span class="count-info" :class="messages.length ? 'count-primary' : 'count-secondary'">{{ messages.length }}</span>
                    </div>
                    <div v-else class="input-wrapper">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                                <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                            </svg>
                        </i>
                        <input class="form-control" v-model="search" type="search" ref="searchInput" placeholder="Search message...">
                    </div>
                    <button @click="toggleSearch" class="toggle-btn br-50">
                        <svg v-if="searchToggle" xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                            <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#000"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div v-if="!messages.length" class="bg-white mt-24 pd-24 br-16 centered">
                No Messages
            </div>
            <div v-else-if="computedItem.length" class="flx column gap-16 message-body">
                <message-lists v-for="data in computedItem" :key="data.message.id" :data="data"/>
            </div>
            <div v-else class="mt-16"><strong>No search result for:</strong> <i>{{ search }}</i></div>
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
    computed: {
        ...mapState({
            messages: (state) => state.messages
        }),
        computedItem() {
            if(this.search !=='')
            return this.messages.filter(item => {
                return item.sender.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase()) || item.message.preview.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
            })
            else
            return this.messages
        }
    },
    data () {
        return {
            searchToggle: false,
            search: ''
        }
    },
    methods: {
        toggleSearch() {
            this.searchToggle = !this.searchToggle
            this.$nextTick(function () {
                if(this.searchToggle) {
                    this.$refs.searchInput.focus()
                }
            })
        }
    },
    mounted () {
        this.$store.dispatch('fetchMessages')
    }
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

button.toggle-btn{
    height: 45px;
    width: 45px;
    padding: 0;
    background-color: rgba(224, 225, 237, 0.4);
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
.input-wrapper{
    flex: 1 1;
    input {
        padding: 8px 12px 8px 45px;
    }
}
</style>