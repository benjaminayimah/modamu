<template>
    <div class="table-row grid-item grid-col-transactions">
       <div class="table-cell gap-8">
            <profile-avatar :id="booking.village_id" :image="booking.image"/>
            <span class="wrap-text wrap-line-1">{{ booking.name }}</span>
        </div>
       <div class="table-cell">
            <span class="wrap-text wrap-line-1">{{ booking.event_name }}</span>
       </div>
       <div class="table-cell">
        <span class="wrap-text wrap-line-1">{{ format_date_short(booking.created_at) }}</span>
       </div>
       <div class="table-cell fw-600">${{ booking.amount_per_child }}</div> 
       <div class="table-cell">{{ booking.number_of_kids }}</div>
       <div class="table-cell"><div class="price br-24">${{ booking.total_amount }}</div></div>
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
  components: { ProfileAvatar },
    name: 'BookingRow',
    props: ['booking'],
    mixins: [formatDateTime]
}
</script>

<style lang="scss" scoped>
.bg-img {
    height: 42px;
    width: 42px;
}
</style>