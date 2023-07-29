<template>
    <div id="grid_table">
        <div class="grid table-body">
            <div class="grid-item table-head grid-col-subadmins">
                <h4 class="table-cell wrap-text wrap-line-1">Name</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Email</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Permissions</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Actions</h4>
            </div>
            <sub-admin-row-1 v-for="user in getSubAdmins" :key="user.id" :user="user"/>
        </div>
        <div v-if="!getSubAdmins.length" class="bg-white pd-24 br-16 gap-8 centered">
            <div>There are no sub admins</div>
            <button @click.prevent="$store.commit('setAddAdmin', 1)" class="btn-sm button-primary gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 45 36">
                    <path d="M43.755,19.062l-8.1-3.164a2.179,2.179,0,0,0-1.561,0l-8.1,3.164a1.9,1.9,0,0,0-1.245,1.751c0,7.847,4.83,13.275,9.345,15.04a2.181,2.181,0,0,0,1.561,0C39.263,34.446,45,29.566,45,20.813A1.9,1.9,0,0,0,43.755,19.062Zm-8.88,13.451v-13.3l6.715,2.623a12.577,12.577,0,0,1-6.715,10.673ZM15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.75,2.813a3.994,3.994,0,0,1,.077-.506c-.176-.007-.345-.056-.527-.056H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75a3.46,3.46,0,0,0,1.35-.281A18.891,18.891,0,0,1,22.5,20.813Z" fill="#fff"/>
                </svg>
                Add new
            </button>
        </div>
    </div>
</template>

<script>
import SubAdminRow1 from '@/components/includes/app/SubAdminRow1.vue';
import { mapGetters } from 'vuex';
export default {
    components: { SubAdminRow1 },
    name: 'SubAdminViewOne',
    computed: {
        ...mapGetters(['getSubAdmins'])
    }
}
</script>

<style lang="scss" scoped>
.grid-col-subadmins{
    grid-template-columns: 1fr 1fr 1.3fr 1.3fr;
}
#grid_table {
    overflow-x: auto;
}
</style>