<template>
    <div id="grid_table">
        
        <div class="grid table-body">
            <div class="grid-item table-head grid-col-subadmins">
                <h4 class="table-cell wrap-text wrap-line-1">Name</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Email</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Allocated villages</h4>
                <h4 class="table-cell wrap-text wrap-line-1">Actions</h4>
            </div>
            <sub-admin-row-2 v-for="user in getVillagePersonnels" :key="user.id" :user="user"/>
        </div>
        <div v-if="!getVillagePersonnels.length" class="bg-white pd-24 br-16 centered">
            <div>There are no village personnels</div>
        </div>
    </div>
</template>

<script>
import SubAdminRow2 from '@/components/includes/app/SubAdminRow2.vue';
import { mapGetters } from 'vuex';
export default {
    components: { SubAdminRow2 },
    name: 'SubAdminViewTwo',
    computed: {
        ...mapGetters(['getVillagePersonnels'])
    }
}
</script>

<style lang="scss" scoped>
.grid-col-subadmins{
    grid-template-columns: 1fr 1.2fr .8fr 1fr;
}
</style>