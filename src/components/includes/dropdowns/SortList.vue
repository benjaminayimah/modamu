<template>
    <li class="a-btn">
        <a href="#" class="jc-sb" @click="$emit('sort-item', list.sort)">
            <span>{{ list.name }}</span>
            <svg v-if="list.active" xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 18.788 14.586">
                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)" fill="#0173ff"/>
            </svg>
        </a>
    </li>
</template>
<script>
export default {
    name: 'SortList',
    props: ['list']
}
</script>