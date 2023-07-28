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
        <div v-if="!getSubAdmins.length" class="bg-white pd-24 br-16 centered">
            <div>There are no sub admins</div>
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