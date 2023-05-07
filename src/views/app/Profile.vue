<template>
    <section class="flx gap-50">
        <profile-left />
        <profile-right v-if="is_parent" />
    </section>
</template>
<script>
import usersLevelMixin from '../../mixins/usersLevelMixin';
import ProfileLeft from '../../components/layouts/ProfileLeft.vue'
import ProfileRight from '../../components/layouts/ProfileRight.vue'
export default {
  components: { ProfileLeft, ProfileRight },
    name: 'ProfilePage',
    mixins: [ usersLevelMixin ]
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
</style>
