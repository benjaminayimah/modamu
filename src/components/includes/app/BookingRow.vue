<template>
    <div class="table-row grid-item grid-col-transactions">
       <div class="table-cell gap-8">
            <profile-avatar :id="booking.village_id" :image="booking.image"/>
            <router-link :to="{ name: 'DetailedVillage', params: { name: booking.name, id: booking.village_id, filter: 'all' }}" class="wrap-text wrap-line-1 capitalize">
                {{ booking.name }}
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                    <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                </svg>
            </router-link>
        </div>
       <div class="table-cell">
            <router-link :to="{ name: 'DetailedEvent', params: { id: booking.event_id, name: booking.event_name}}" class="wrap-text wrap-line-1">
                {{ booking.event_name }}
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                    <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                </svg>
            </router-link>
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
a{
    &:hover {
        text-decoration: underline ;
        color: var(--primary-color);
        path {
            fill: var(--primary-color);
        }
    }
    svg {
        margin-left: 4px;
    }
}
</style>