<template>
    <div class="modal-container jc-c ai-c">
        <backdrop :index="300" :opacity="0.5" />
        <div class="modal overflow-y-scroll scroll-hidden flx column relative">
            <div class="modal-top flx jc-sb ai-c sticky">
                <h3>{{ !subAdminStore.edit ? 'Assign permissions' : 'Update permissions' }}</h3>
                <button @click="$store.commit('closeAdminControl')" class="br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="mb-16">
                    Sub administrators will only have a read-write permission to selected featues.
                    <p>
                        Select the featues this sub admin can have access to.
                    </p>
                </div>
                <lottie-loader v-if="forms.loader" />
                <div class="mb-16">
                    <button class="btn-sm button-outline s-a" @click="selectAll">Select all</button>
                </div>
                <div class="flx flx-1 flx-wrap gap-24">
                    <access-control-list v-for="access in adminAccess" :key="access.id" :access="access" @do-check="doCheck"/>
                </div>
            </div>
            <div class="modal-bottom sticky flx jc-sb ai-c">
                <button v-if="!subAdminStore.edit" @click="doSubmit" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                    <span>{{ creating ? 'Submiting...' : 'Finish up'}}</span>
                </button>
                <button v-else @click="doSubmit" class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                    <span>{{ creating ? 'Submiting...' : 'Submit update'}}</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { postApi } from '@/api';
import { mapState } from 'vuex';
import LottieLoader from '@/components/includes/LottieLoader.vue';
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue';
import AccessControlList from '@/components/includes/app/AccessControlList.vue';
export default {
    components: { Backdrop, LottieLoader, Spinner, AccessControlList },
    name: 'AccessControlModal',
    computed: {
        ...mapState({
            subAdminStore: (state) => state.subAdminStore,
            forms: (state) => state.forms,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
        }), 
        computedAccess() {
            return { 
                user_id: this.form.user,
                villages: this.adminAccess[0].status,
                events: this.adminAccess[1].status,
                parents: this.adminAccess[2].status,
                kids: this.adminAccess[3].status,
                // notifications: this.adminAccess[4].status,
                messages: this.adminAccess[4].status,
                bookings: this.adminAccess[5].status
            }
        }
    },
    data() {
        return {
            search: '',
            form: {
                user: '',
            },
            adminAccess: [
                {id: 1, name: 'villages', abbr:'v', status: false},
                {id: 2, name: 'events', abbr:'e', status: false},
                {id: 3, name: 'parents', abbr:'p', status: false},
                {id: 4, name: 'kids', abbr:'k', status: false},
                // {id: 5, name: 'notifications', abbr:'n', status: false},
                {id: 5, name: 'messages', abbr:'m', status: false},
                {id: 6, name: 'bookings', abbr:'b', status: false}
            ],
            creating: false,
            allAccess: false
        }
    },
    methods: {
        doCheck(id) {
            const i = this.adminAccess.findIndex(data => data.id === id)
            this.adminAccess[i].status = !this.adminAccess[i].status
        },
        selectAll() {
            if(!this.allAccess) {
                this.adminAccess.forEach(element => {
                    element.status = true
                });
                this.allAccess = true
            }else {
                this.adminAccess.forEach(element => {
                    element.status = false
                });
                this.allAccess = false
            }
        },
        async doSubmit() {
            this.creating = true
            try {
                const res = await postApi(this.hostname+'/api/access-control-update?token='+this.token, this.computedAccess )
                this.updateResponse(res.data)
            } catch (e) {
                this.creating = false
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        },
        successResponse(res) {
            this.$store.commit('addAdminAccess', res)
            this.$store.commit('closeAdminControl')
            this.creating = false
        },
        // async doUpdate() {
        //     this.creating = true
        //     try {
        //         const res = await postApi(this.hostname+'/api/access-control-update?token='+this.token, this.computedAccess )
        //         this.updateResponse(res.data)
        //     } catch (e) {
        //         this.creating = false
        //         if(e.response.status == 400) {
        //             this.$store.commit('setExpSession')
        //         }
        //     }
        // },
        updateResponse(res) {
            this.$store.commit('updateAdminAccess', res)
            this.$store.commit('closeAdminControl')
            this.creating = false
            console.log(res)
        },
        setEdit() {
            if(this.subAdminStore.user.user_id) {
                this.form.user = this.subAdminStore.user.user_id
                this.adminAccess[0].status = this.subAdminStore.user.villages
                this.adminAccess[1].status = this.subAdminStore.user.events
                this.adminAccess[2].status = this.subAdminStore.user.parents
                this.adminAccess[3].status = this.subAdminStore.user.kids
                // this.adminAccess[4].status = this.subAdminStore.user.notifications
                this.adminAccess[4].status = this.subAdminStore.user.messages
                this.adminAccess[5].status = this.subAdminStore.user.bookings
            }else {
                this.form.user = this.subAdminStore.user.id
            }
        },
        setNew() {
            this.form.user = this.subAdminStore.user.id
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.subAdminStore.edit ? this.setEdit() : this.setNew()
    }
}
</script>

<style lang="scss" scoped>
.modal{
    max-height: 90vh;
    width: 560px;
    z-index: 301;
}
a {
    border: 1px solid #eee;
    transition: var(--input-btn-transition);
    &:hover {
        border-color: var(--primary-color);
        box-shadow: rgba(15, 41, 77, 0.08) 0px 8px 16px 0px;
    }
}

</style>