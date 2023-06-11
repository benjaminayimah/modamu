<template>
<div class="flx jc-c">
    <div  class="paginationa-controls flx gap-16 ai-c mt-24">
        <button class="br-50" @click="$emit('previous')" :disabled="currentPage === 1" :class="currentPage !== 1 ? 'activate' : 'disabled'">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8 14">
                <path d="M7,14a1,1,0,0,1-.707-.293l-6-6a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,7.707,1.707L2.414,7l5.293,5.293A1,1,0,0,1,7,14Z"/>
            </svg>
        </button>
        <span class="fs-09">{{ currentPage }} / {{ totalPages }}</span>
        <button class="br-50" @click="$emit('next')" :disabled="currentPage === totalPages" :class="currentPage !== totalPages ? 'activate' : 'disabled'">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8 14">
                <path d="M1,14a1,1,0,0,0,.707-.293l6-6a1,1,0,0,0,0-1.414l-6-6A1,1,0,0,0,.293,1.707L5.586,7,.293,12.293A1,1,0,0,0,1,14Z"/>
            </svg>
        </button>
    </div>
</div>
</template>

<script>
export default {
    name: 'PaginationControls',
    props: ['currentPage', 'totalPages']
}
</script>

<style lang="scss" scoped>
button {
    height: 30px;
    width: 30px;
    &.activate:hover{
        background-color: var(--primary-color);
        path {
            fill: var(--ft-white);
        }
    }
}

.disabled{
    cursor: not-allowed;
    path {
        fill: var(--text-light);
    }
}
</style>