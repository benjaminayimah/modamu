<template>
    <div class="flx-grow-1 pd-20 br-24 flx jc-sb column" :class="color ? 'bg-primary ft-white' : 'bg-white'">
        <div>
            <div class="fw-700 fs-2r">{{ data.count }}</div>
            <span class="fs-09" :class="color ? 'ft-transparent' : 'gray'">{{ data.title }}</span>
        </div>
        <span>{{ data.subTitle }}</span>
    </div>
</template>

<script>
export default {
    name: 'StatusCardType2',
    props: ['data', 'color']
}
</script>

<style>

</style>