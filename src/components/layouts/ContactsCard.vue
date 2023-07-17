<template>
    <transition name="slide-horizontal">
        <div v-if="active" class="contact-wrapper absolute">
            <div class="modal-top flx ai-c">
                <button class="br-50" @click="$emit('select-contact')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 18.243 13.501">
                        <path d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H25.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z" transform="translate(-7.882 -11.252)" fill="#6f7689"/>
                    </svg>
                </button>
                <h4 class="wrap-text wrap-line-1">Select recipients</h4>
            </div>
            <div class="contact-body overflow-y-scroll scroll-hidden relative">
                <div v-if="!is_parent" class="flx jc-c">
                    <ul class="flx br-16 gap-4 mt-8 tab">
                        <li><a :class="{'active' : tab == 'parents'}" @click.prevent="toggleTab('parents')"  href="#">Parents</a></li>
                        <li v-if="is_admin"><a :class="{'active' : tab == 'villages'}" @click.prevent="toggleTab('villages')" href="#">Villages</a></li>
                    </ul>
                </div>
                <div class="input-wrapper">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </i>
                    <input class="form-control" v-model="search" type="search" placeholder="Search recipients">
                </div>
                <div class="flx jc-sb mt-16 s-all">
                    <label for="select_btn" class="flx gap-8" :class="{ 'selected' : allSelected && selections.length  }">
                        <button @click="selectAll" id="select_btn" class="select-btn transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)" fill="#fff"/>
                            </svg>
                        </button>
                        <strong>Select all</strong>
                    </label>
                    <div class="flx gap-4">
                        <strong>{{ selections.length }}</strong>
                        <span>selected</span>
                    </div>
                </div>
                <div v-if="!computedUsers.length && !search" class="bg-white mt-24 pd-24 br-16 centered">
                    There are no users
                </div>
                <ul v-else-if="computedUsers.length" class="user-list flx column gap-4">
                    <contact-list v-for="user in computedUsers" :key="user.id" :user="user" />
                </ul>
                <div v-else class="mt-16"><strong>No search result for:</strong> <i>{{ search }}</i></div>
            </div>
            <div class="modal-bottom sticky flx jc-c">
                <button @click="$emit('select-contact')" class="btn-sm button-outline s-a">Done</button>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import usersLevelMixin from '@/mixins/usersLevelMixin';
import ContactList from '../includes/app/ContactList.vue';
export default {
    components: { ContactList },
    name: 'ContactsCard',
    mixins: [usersLevelMixin],
    props: ['active'],
    computed: {
        ...mapState({
            parents: (state) => state.parents,
            villages: (state) => state.villages,
            selections: (state) => state.contactSelections
        }),
        computedUsers() {
            let newArr = this.parents
            let tab = this.tab
            if(tab === 'villages') {
                newArr = this.villages
            }
            if(this.search !=='') {
                return newArr.filter(item => {
                    return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                })
            }else {
                return newArr.sort((a, b) => a.name.localeCompare(b.name)) 
            }
        }
    },
    data() {
        return {
            tab: 'parents',
            search: '',
            allSelected: false
        }
    },
    methods: {
        toggleTab(tab) {
            this.tab = tab
        },
        selectAll() {
            if(!this.allSelected) {
                this.computedUsers.forEach(element => {
                    this.$store.commit('selectRecipient', element)
                });
                this.allSelected = true
            }else {
                this.$store.commit('unSelectAllRecipients')
                this.allSelected = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-wrapper {
    height: 100%;
    width: 100%;
    z-index: 30;
    background-color: #fff;
    background-color: rgb(248, 250, 255);
    transform: translateX(0);
}
.modal-top {
    button {
        margin: 0 0 0 -16px;
    }
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
}
ul.tab{
    background-color: transparent;
    a:hover {
        background-color: var(--bg-color);
    }
}
.input-wrapper{
    flex: 1 1;
    input {
        padding: 8px 12px 8px 45px;
    }
}
ul.user-list {
    margin: 0 -14px;
}
.contact-body {
    padding: 0 24px 20rem 24px;
    height: calc(100dvh - 200px);
}
label {
    cursor: pointer;
}

.s-all {
    padding: 10px 0;
}
button.select-btn{
    padding: 0;
    height: 22px;
    width: 22px;
    border: 1px solid #b4b7be;
    &:hover {
        border-color: var(--primary-color);
    }
}
.selected {
    button {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
    }
}
.bottom{
    bottom: 20px;
}

//slide horizontal
.slide-horizontal-enter-active,
.slide-horizontal-leave-active {
    transition: all 0.3s ease-out;
}
.slide-horizontal-enter-from,
.slide-horizontal-leave-to {
    transform: translateX(-500px);
}
</style>