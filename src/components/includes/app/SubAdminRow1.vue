<template>
    <a href="#" @click.prevent="" class="table-row grid-item grid-col-subadmins">
        <div class="table-cell gap-8">
            <profile-avatar :id="user.id" :image="user.image"/>
            <span class="wrap-text wrap-line-1 capitalize">{{ user.name }}</span>
        </div>
        <div class="table-cell flx gap-32 cell-hover-show">
            <span class="wrap-text wrap-line-1">{{ user.email }}</span>
            <span @click="copyTextToClipboard(user.email)" class="hidden centered br-50 s-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 23.625 29.25">
                    <path  d="M20.813,3.375h-8.4A2.812,2.812,0,0,0,9.563,6.152v.6H9.035A2.812,2.812,0,0,0,6.188,9.527v20.25a2.872,2.872,0,0,0,2.848,2.848H23.66a2.812,2.812,0,0,0,2.777-2.848V29.25h.6A2.812,2.812,0,0,0,29.813,26.4V12.375Zm0,3.136,5.864,5.864H20.813Zm3.375,23.266a.568.568,0,0,1-.527.6H9.035a.626.626,0,0,1-.6-.6V9.527A.568.568,0,0,1,9.035,9h.527V26.965a2,2,0,0,0,2.285,2.285h12.34ZM27.563,26.4a.568.568,0,0,1-.527.6H12.41a.626.626,0,0,1-.6-.6V6.152a.568.568,0,0,1,.6-.527h6.152v9h9Z" transform="translate(-6.188 -3.375)" fill="#535559"/>
                </svg>
            </span>
        </div>
        <div class="table-cell">
            <div v-if="computedUser">
                <span v-if="computedAccess.status === 'all'" class="flx gap-8 ai-c">
                    <strong class="success">Full</strong>
                    Access
                    <button @click.prevent="$store.commit('updatePermissions', user)" class="t-pill-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.919 16.166">
                            <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#0173ff"/>
                        </svg>
                    </button>
                </span>
                <span v-else-if="computedAccess.status === '0'" class="flx gap-8 ai-c">
                    <strong class="danger">0</strong>
                    Access
                    <button @click.prevent="$store.commit('updatePermissions', user)" class="t-pill-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.919 16.166">
                            <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#0173ff"/>
                        </svg>
                    </button>
                </span>
                <div v-else class="flx gap-4">
                    <span v-if="computedAccess.access.villages" class="access br-32 flx ai-c" title="Villages">
                        <span class="uppercase">v</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <span v-if="computedAccess.access.events" class="access br-32 flx ai-c">
                        <span class="uppercase" title="Events">e</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <span v-if="computedAccess.access.parents" class="access br-32 flx ai-c" title="Parents">
                        <span class="uppercase">p</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <span v-if="computedAccess.access.kids" class="access br-32 flx ai-c" title="Kids">
                        <span class="uppercase">k</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <!-- <span v-if="computedAccess.access.notifications" class="access br-32 flx ai-c" title="Notifications">
                        <span class="uppercase">n</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span> -->
                    <span v-if="computedAccess.access.messages" class="access br-32 flx ai-c" title="Messages">
                        <span class="uppercase">m</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <span v-if="computedAccess.access.bookings" class="access br-32 flx ai-c" title="Bookings">
                        <span class="uppercase">b</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                    <button @click.prevent="$store.commit('updatePermissions', user)" class="t-pill-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.919 16.166">
                            <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#0173ff"/>
                        </svg>
                    </button>
                </div>
            </div>
            <span v-else class="flx gap-8 ai-c">
                <strong class="danger">0</strong>
                Access
                <button @click.prevent="$store.commit('updatePermissions', user)" class="t-pill-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.919 16.166">
                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#0173ff"/>
                    </svg>
                </button>
            </span>
        </div>
        <div class="table-cell jc-sb">
            <div class="flx ai-c row-actions h-100" @click.prevent="">
                <button @click="$store.commit('updateTheirInfo', user)" class="t-pill-btn">Edit info</button>
                <button @click="$store.commit('resetTheirPass', user.id)" class="wrap-text wrap-line-1 t-pill-btn">Reset password</button>
                <button @click="$store.commit('setDeleteModal', {id: user.id, type: 'admin'})" class="delete t-pill-btn">Delete</button>
            </div>
        </div>
    </a>
</template>

<script>
import copyToClipboardMixin from '@/mixins/copyToClipboard';
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
    components: { ProfileAvatar },
    name: 'SubAdminRow1',
    props: ['user'],
    mixins: [copyToClipboardMixin],
    computed: {
        ...mapState({
            admin_access: (state) => state.admin_access
        }),
        computedUser() {
            if(this.admin_access.length) {
                const user = this.admin_access.find(data => data.user_id == this.user.id)
                if(user)
                return user
                else
                return false
            }
            else
            return false
        },
        computedAccess() {
            let data = {
                status: '',
                access: this.computedUser
            }
            if(this.computedUser.villages && this.computedUser.events && this.computedUser.parents && this.computedUser.kids && this.computedUser.notifications && this.computedUser.messages && this.computedUser.bookings) {
                data.status = 'all'
            }else if(!this.computedUser.villages && !this.computedUser.events && !this.computedUser.parents && !this.computedUser.kids && !this.computedUser.notifications && !this.computedUser.messages && !this.computedUser.bookings) {
                data.status = '0'
            }
            return data
        }

    }
}
</script>

<style lang="scss" scoped>
a {
    cursor: default;
}
.bg-img{
    height: 42px;
    width: 42px;
}
.access {
    background-color: #fff;
    border: 1px solid var(--bg-dark);
    padding: 0 8px;
    gap: 2px;
}
.uppercase{
    font-size: 0.8rem;
    font-weight: 600;
}
.success {
    color: #03b109;
}
.danger {
    color: #fc1d12;;
}

// a{
//     container-type: inline-size
// }
// @container( inline-size <= 720px) {
//     .see-details{
//         display: none
//     }

// }
</style>