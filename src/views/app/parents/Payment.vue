<template>
    <section class="section-main">
        <div class="title-row">
            <h1 class="title">Payments</h1>
            <span class="gray">Add and track your payment method</span>
        </div>
        <button @click="$store.commit('showModal')" class="open-modal">modal</button>
        <router-view></router-view>
        <modal />
    </section>
</template>
<script>
import Modal from '@/components/layouts/Modal.vue'
export default {
    name: 'PaymentView',
    components: { Modal }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
</style>