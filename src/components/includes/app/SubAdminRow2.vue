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
        <div class="table-cell gap-16">
            {{ computedAllocations }}
            <div class="row-actions flx">
                <button @click.prevent="$store.commit('viewAllocatedVillage', user)" v-if="!computedAllocations == 0" class="t-pill-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="9" viewBox="0 0 16.049 9.751">
                        <path d="M-480.724-372.965a14.569,14.569,0,0,1-2.951-2.568,1.152,1.152,0,0,1,0-1.541,14.541,14.541,0,0,1,2.951-2.568,8.794,8.794,0,0,1,4.778-1.537,8.794,8.794,0,0,1,4.778,1.537,14.566,14.566,0,0,1,2.951,2.568,1.154,1.154,0,0,1,0,1.541,14.594,14.594,0,0,1-2.951,2.568,8.794,8.794,0,0,1-4.778,1.537A8.794,8.794,0,0,1-480.724-372.965ZM-482.5-376.3c1.055,1.158,3.546,3.482,6.549,3.482s5.495-2.324,6.549-3.482c-1.055-1.158-3.547-3.482-6.549-3.482S-481.441-377.462-482.5-376.3Zm4.46,0a2.092,2.092,0,0,1,2.09-2.089,2.091,2.091,0,0,1,2.089,2.089,2.092,2.092,0,0,1-2.089,2.09A2.093,2.093,0,0,1-478.036-376.3Zm1.393,0a.7.7,0,0,0,.7.7.7.7,0,0,0,.7-.7.7.7,0,0,0-.7-.7A.7.7,0,0,0-476.643-376.3Z" transform="translate(483.971 381.179)" fill="#0173ff"/>
                    </svg>
                </button>
                <button v-else @click.prevent="$store.commit('openAllocateVillage', user)" class="t-pill-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 15.132 15.132">
                        <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#0173FF"/>
                    </svg>
                </button>
            </div>
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
    name: 'SubAdminRow2',
    props: ['user'],
    mixins: [copyToClipboardMixin],
    computed: {
        ...mapState({
            allocations: (state) => state.village_allocation_access
        }),
        computedAllocations() {
            if(this.allocations.length) {
                return this.allocations.filter(data => data.user_id == this.user.id).length
            }
            else
            return 0
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
// a{
//     container-type: inline-size
// }
// @container( inline-size <= 720px) {
//     .see-details{
//         display: none
//     }

// }
</style>