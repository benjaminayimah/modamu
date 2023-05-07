<template>
    <section id="welcome_main" :style="{ minHeight: getWindowHeight+'px' }">
        <router-view />
    </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'WelcomeView',
    computed: {
        ...mapGetters(['getDevice', 'getWindowWidth', 'getWindowHeight']),
    } 
}
</script>
<style lang="scss" scoped>
section {
    padding: 32px;
}
</style>