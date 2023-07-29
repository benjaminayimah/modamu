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
        <div v-if="!getVillagePersonnels.length" class="bg-white pd-24 br-16 centered gap-8">
            <div>There are no village personnels</div>
            <button @click.prevent="$store.commit('setAddAdmin', 2)" class="btn-sm button-primary gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 32 30">
                    <path d="M-3194-639v-6.5a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v6.5h-8a1,1,0,0,1-1-1v-14.558l12-9.6,12,9.6V-640a1,1,0,0,1-1,1Zm-6-15.5v4a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-4a.5.5,0,0,0-.5-.5h-5A.5.5,0,0,0-3200-654.5Zm-12.782-.876a1,1,0,0,1,.157-1.406l4.625-3.7V-665.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2.619l7.375-5.9a1,1,0,0,1,1.249,0l15,12h0a1,1,0,0,1,.156,1.406,1,1,0,0,1-1.406.156L-3197-666.72l-14.375,11.5A1,1,0,0,1-3212-655,1,1,0,0,1-3212.781-655.375Z" transform="translate(3213 669)" fill="#fff"/>
                </svg>
                Add new
            </button>
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
#grid_table {
    overflow-x: auto;
}
</style>