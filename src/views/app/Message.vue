<template>
    <section id="messages" class="flx gap-8 section-main" v-if="is_parent || is_village || is_super || is_sublevel_messages || is_sublevel2">
        <div class="message-left h-100 relative">
            <div class="fixed flx jc-c float">
                <button v-if="!is_parent" @click="$store.commit('openBulkMessage')" class="flx bg-white gap-8 btn-lg ft-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.098 20.097">
                        <path d="M-3315.641-785.841a4.226,4.226,0,0,1-.738-.968l-.116-.184a3.734,3.734,0,0,0-1.024-1.151,3.54,3.54,0,0,0-2.038-.523,4.409,4.409,0,0,1-2.31-.554,3.656,3.656,0,0,1-1.406-1.575,12.965,12.965,0,0,1-.89-5.686c0-3.971.539-6,1.921-7.225a6.266,6.266,0,0,1,3.066-1.346,26.849,26.849,0,0,1,5.061-.361,27.6,27.6,0,0,1,5.062.349,6.243,6.243,0,0,1,3.066,1.326c1.383,1.219,1.922,3.254,1.922,7.258,0,2.737-.275,4.5-.89,5.722a3.594,3.594,0,0,1-1.407,1.553,4.482,4.482,0,0,1-2.309.541,3.542,3.542,0,0,0-2.038.523,3.736,3.736,0,0,0-1.024,1.152l-.115.183a4.254,4.254,0,0,1-.738.968,2.153,2.153,0,0,1-1.527.523A2.152,2.152,0,0,1-3315.641-785.841Zm-3.209-17.57a4.779,4.779,0,0,0-2.279.955c-.965.859-1.359,2.588-1.359,5.973a11.771,11.771,0,0,0,.713,4.937,2.014,2.014,0,0,0,.766.885,2.843,2.843,0,0,0,1.453.319,5.142,5.142,0,0,1,2.977.812,5.271,5.271,0,0,1,1.5,1.639c.042.068.082.13.119.19a3.158,3.158,0,0,0,.44.614c.037.033.105.1.409.1s.372-.062.409-.1a3.206,3.206,0,0,0,.439-.614l.12-.19a5.258,5.258,0,0,1,1.5-1.639,5.144,5.144,0,0,1,2.978-.812,2.919,2.919,0,0,0,1.465-.313,1.952,1.952,0,0,0,.755-.859,11.841,11.841,0,0,0,.71-4.968c0-3.416-.392-5.153-1.354-6a4.765,4.765,0,0,0-2.274-.938,26.122,26.122,0,0,0-4.746-.319A25.328,25.328,0,0,0-3318.85-803.411Zm.549,9.719a.837.837,0,0,1-.837-.838.837.837,0,0,1,.837-.837h8.375a.837.837,0,0,1,.837.837.838.838,0,0,1-.837.838Zm5.025-3.35a.838.838,0,0,1-.838-.838.838.838,0,0,1,.838-.837h3.35a.838.838,0,0,1,.837.837.838.838,0,0,1-.837.838Z" transform="translate(3324.163 805.415)" fill="#0173ff"/>
                    </svg>
                    <span>Send bulk email</span>
                </button>
            </div>
            <transition name="slide-vertical">
                <bulk-message v-if="bulkMessage" />
            </transition>
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
            <nav v-if="!is_parent" class="flx">
                <ul class="flx br-16 mt-8 tab">
                    <li><a :class="{'active' : messageTab == 'recent'}" @click.prevent="toggleDisplay('recent')" href="#">Recent</a></li>
                    <li v-if="is_admin"><a :class="{'active' : messageTab == 'villages'}" @click.prevent="toggleDisplay('villages')" href="#">Villages</a></li>
                    <li v-if="!is_sublevel2"><a :class="{'active' : messageTab == 'parents'}" @click.prevent="toggleDisplay('parents')"  href="#">Parents</a></li>
                </ul>
            </nav>
            <div v-if="!messages.length && !computedItem.length && !search" class="bg-white mt-24 pd-24 br-16 centered">
                No Messages
            </div>
            <div v-else-if="computedItem.length" class="flx column gap-8 message-body">
                <message-lists v-for="data in computedItem" :key="data.id" :data="data" :contactOnly="contactOnly"/>
            </div>
            <div v-else class="mt-16"><strong>No search result for:</strong> <i>{{ search }}</i></div>
        </div>
        <div class="message-right h-100 flx-grow-1">
            <router-view></router-view>
        </div>
    </section>
    <access-denied v-else />
</template>
<script>
import usersLevelMixin from '@/mixins/usersLevelMixin';
import { mapState } from 'vuex';
import MessageLists from '../../components/includes/app/MessageLists.vue'
import BulkMessage from '@/components/layouts/BulkMessage.vue';
import AccessDenied from '@/components/includes/app/AccessDenied.vue';
export default {
    components: { MessageLists, BulkMessage, AccessDenied },
    mixins: [usersLevelMixin],
    name: 'MessagePage',
    computed: {
        ...mapState({
            messages: (state) => state.messages,
            villages: (state) => state.villages,
            parents: (state) => state.parents,
            messageTab: (state) => state.messageTab,
            bulkMessage: (state) => state.bulkMessage,
            contactOnly: (state) => state.contactOnly
        }),
        computedItem() {
            let newArr = this.messages
            let tab = this.messageTab
            if(tab === 'parents') {
                newArr = this.parents
            }else if(tab === 'villages') {
                newArr = this.villages
            }
            if(this.search !=='') {
                return newArr.filter(item => {
                    if(!this.contactOnly)
                    return item.sender.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase()) || item.message.preview.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                    else
                    return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                })
            }else {
                if(tab === 'parents' || tab === 'villages')
                return newArr.sort((a, b) => a.name.localeCompare(b.name)) 
                else
                return newArr.sort((a, b) => new Date(b.message.updated_at) - new Date(a.message.updated_at))
            }
        }
    },
    data () {
        return {
            searchToggle: false,
            search: '',
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
        },
        toggleDisplay(tab) {
            this.$store.commit('setMessageTab', tab)
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
    height: calc(100vh - 189px);
}

.message-left{
    width: 350px;
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
    padding: 24px 0 20rem 0;
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
.float {
    bottom: 30px;
    z-index: 20;
    width: inherit;
    button {
        box-shadow: 0 1px 15px 0 rgba(14, 20, 44, 0.12);
    }
}
@media screen and (max-width: 500px){
    nav {
        justify-content: center;
    }
    
}



//slide vertical
.slide-vertical-enter-active,
.slide-vertical-leave-active {
    transition: all 0.3s ease-in-out;
}
.slide-vertical-enter-from,
.slide-vertical-leave-to {
    height: 0;
    bottom: 0;
}
</style>