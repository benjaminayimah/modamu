<template>
    <router-link :to="{ name: 'DetailedVillage', params: { name: village.name, id: village.id, filter: 'all' }}" class="table-row grid-item row-hover grid-col-dash">
        <div class="table-cell gap-8">
            <profile-avatar :id="village.id" :image="village.image"/>
            <span class="wrap-text wrap-line-1 capitalize">{{ village.name }}</span>
        </div>
        <div class="table-cell gap-8">
            <div class="wrap-text wrap-line-1">{{ village.address }}</div>
        </div>
        <div class="table-cell gap-8">
            <div class="wrap-text wrap-line-1">{{ village.phone }}</div>
        </div>
        <div class="table-cell jc-sb date-cell">
            <span class="wrap-text wrap-line-1">{{ format_date(village.created_at) }}</span>
        </div>
    </router-link>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'DashAdminVillageRow',
    props: ['village'],
    mixins: [formatDateTime]
}
</script>

<style lang="scss" scoped>
.grid-col-dash {
    grid-template-columns: 1fr 1fr .6fr .5fr;
}
.bg-img {
    height: 40px;
    width: 40px;
}
a{
    container-type: inline-size
}
@container( inline-size <= 720px) {
    .date-cell{
        display: none
    }

}

</style>