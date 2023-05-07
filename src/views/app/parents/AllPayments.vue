<template>
    <div class="empty-state flx jc-c ai-c" v-if="!payments.length">
        <div class="text-center br-24 flx jc-c ai-c gap-24 column bg-white">
            <div>No payment method added yet</div>
            <router-link :to="{ name: 'SelectPayment' }" class="button-primary a-button">Add  new  payment system</router-link>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'AllPayments',
    computed: {
       ...mapState({
        payments: (state) => state.payments
       })
    }
}
</script>
<style lang="scss" scoped>
.empty-state{
    height: 60vh;
    .text-center{
        width: 400px;
        padding: 40px;
    }
}

</style>