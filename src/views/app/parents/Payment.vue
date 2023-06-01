<template>
    <section class="section-main">
        <div class="title-row">
            <h1 class="title">Payments</h1>
            <span class="gray">Add and track your payment method</span>
        </div>
        <button @click="$store.commit('showModal')" class="open-modal">modal</button>
        <router-view></router-view>
    </section>
</template>
<script>
export default {
    name: 'PaymentView',
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
</style>