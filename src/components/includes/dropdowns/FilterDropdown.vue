<template>
    <li :id="id" class="a-btn">
        <a href="#" class="trigger" @click.prevent="doToggle(id)">
            Filter by
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
                <path d="M1,14a1,1,0,0,0,.707-.293l6-6a1,1,0,0,0,0-1.414l-6-6A1,1,0,0,0,.293,1.707L5.586,7,.293,12.293A1,1,0,0,0,1,14Z" transform="translate(14) rotate(90)"/>
            </svg>
        </a>
    </li>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click.prevent="closeDropdown(id)" :index="100" :opacity="0" />
        <transition name="drop-fade" mode="out-in">
            <div class="dropdown" v-if="toggleMenu" :style="{ left: dynamicFloatingDiv.left-85+'px', top: dynamicFloatingDiv.top+38 + 'px'}">
                <ul>
                    <filter-list v-for="list in filterList" :key="list.id" :list="list" @filter-item="doFilter"  />
                </ul>
            </div>
        </transition>
    </teleport>
</template>
<script>
import { mapState } from 'vuex'
import Backdrop from '../Backdrop.vue'
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import FilterList from './FilterList.vue'
export default {
    inheritAttrs: false,
    components: { Backdrop, FilterList },
    name: 'FilterDropdown',
    mixins: [dropdownToggleMixin],
    props: ['id'],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
            filterList: (state) => state.data.filterList
        })
    },
    methods: {
        doFilter(payload) {
            this.$store.commit('parentFilter', payload)
            this.$emit('filterItem', payload)
            this.closeDropdown(this.id)
        }
    }
}
</script>
<style lang="scss" scoped>
.trigger {
    background-color: var(--bg-white);
    &:hover {
        background-color: #d8dde8;
    }
}
</style>