<template>
    <div class="bg-img br-50" :style="image ? { backgroundImage: 'url('+getHostname+'/storage/'+id+'/'+image+')'} : { backgroundImage: 'url('+getDefaultImage+')'} "></div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'ProfileAvatar',
    props: ['image', 'id'],
    computed: {
        ...mapGetters(['getHostname', 'getDefaultImage']),
    }
}
</script>
<style lang="scss" scoped>
</style>