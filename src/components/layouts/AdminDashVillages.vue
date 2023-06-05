<template>
    <div id="grid_table">
        <div class="grid table-body">
            <div class="grid-item table-head grid-col-dash">
                <div class="table-cell wrap-text wrap-line-1">Village name</div>
                <div class="table-cell wrap-text wrap-line-1">Address</div>
                <div class="table-cell wrap-text wrap-line-1">Phone</div>
                <div class="table-cell wrap-text wrap-line-1 date-cell">Created at</div>
            </div>
            <div v-if="!villages.length" class="bg-white pd-24 br-16 centered">
                <div>There are no villages</div>
            </div>
            <dash-admin-village-row v-for="village in villages.slice(0, 5)" :key="village.id" :village="village" />
            <div class="text-center gray" v-if="villages.length > 5"><router-link class="see-all" :to="{ name: 'Villages' }">See all({{ villages.length }})</router-link></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DashAdminVillageRow from '../includes/app/DashAdminVillageRow.vue'
export default {
    components: { DashAdminVillageRow },
    name: 'AdminDashVillages',
    computed: {
        ...mapState({
            villages: (state) => state.villages
        })
    },
}
</script>

<style lang="scss" scoped>
.grid-col-dash {
    grid-template-columns: 1fr 1fr .6fr .5fr;
}
.table-body {
    margin: 0 -8px;
}
.table-head{
    font-weight: 600;
    font-size: 15px;
}
.table-head{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .date-cell{
        display: none
    }

}
</style>