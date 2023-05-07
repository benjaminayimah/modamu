<template>
        <div id="overlay"></div>
</template>
<script>
export default {
    name: 'BackdropOverlay'
}
</script>
<style lang="scss" scoped>
#overlay{
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}
</style>