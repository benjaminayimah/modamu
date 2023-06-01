<template>
    <router-link :to="{ name: 'DetailedVillage', params: { name: village.name, id: village.id }}" class="bg-white br-16 flx">
        <div class="flx column gap-8 flx-grow-1">
            <div>
                <label class="gray mb-4">Village name</label>
                <div class="wrap-text wrap-line-1"><strong>{{ village.name }}</strong></div>
            </div>
            <div>
                <label class="gray mb-4">Address</label>
                <div class="wrap-text wrap-line-1"><strong>{{ village.address }}</strong></div>
            </div>
        </div>
        <span class="flx ai-c">
            <span class="flx gap-4 ai-c ft-primary">
                Details
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14">
                    <path d="M-3431.993-710.293a1,1,0,0,1,0-1.415L-3426.7-717l-5.293-5.293a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-.708.292A1,1,0,0,1-3431.993-710.293Zm-6.084-1.916a.714.714,0,0,1,0-1.01L-3434.3-717l-3.781-3.781a.714.714,0,0,1,0-1.01.715.715,0,0,1,1.011,0l4.286,4.286a.715.715,0,0,1,0,1.01l-4.286,4.286a.714.714,0,0,1-.506.21A.713.713,0,0,1-3438.077-712.209Z" transform="translate(3438.286 724)" fill="#87a5ff"/>
                </svg>
            </span>
        </span>
    </router-link>
</template>

<script>
export default {
    name: 'VillageList',
    props: ['village']
}
</script>

<style lang="scss" scoped>

</style>