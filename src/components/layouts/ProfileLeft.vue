<template>
<div>
    <div class="title-row">
        <h1 class="title">Your profile</h1>
    </div>
    <div class="main-content-card relative flx column gap-24">
        <profile-body-content :user="user" :owner="true" />
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
import ProfileBodyContent from './ProfileBodyContent.vue';
export default {
  components: { ProfileBodyContent },
    name: 'ProfileLeft',
    computed: {
        ...mapState({
            user: (state) => state.user,
        })
    }
}
</script>
<style lang="scss" scoped>
.main-content-card{
    width: 35%;
    min-width: 460px;
}

</style>