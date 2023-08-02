<template>
    <li :id="id" class="a-btn">
        <a href="#" class="trigger" @click.prevent="doToggle(id)">
            Export...
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
                <path d="M1,14a1,1,0,0,0,.707-.293l6-6a1,1,0,0,0,0-1.414l-6-6A1,1,0,0,0,.293,1.707L5.586,7,.293,12.293A1,1,0,0,0,1,14Z" transform="translate(14) rotate(90)"/>
            </svg>
        </a>
    </li>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click.prevent="closeDropdown(id)" :index="100" :opacity="0" />
        <transition name="drop-fade" mode="out-in">
            <div class="dropdown" v-if="toggleMenu" :style="{ left: dynamicFloatingDiv.left-80+'px', top: dynamicFloatingDiv.top+38 + 'px'}">
                <ul>
                    <li class="a-btn">
                        <a href="#" class="gap-8" @click.prevent="doExport">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 23.625 29.25">
                                <path d="M20.813,3.375h-8.4A2.812,2.812,0,0,0,9.563,6.152v.6H9.035A2.812,2.812,0,0,0,6.188,9.527v20.25a2.872,2.872,0,0,0,2.848,2.848H23.66a2.812,2.812,0,0,0,2.777-2.848V29.25h.6A2.812,2.812,0,0,0,29.813,26.4V12.375Zm0,3.136,5.864,5.864H20.813Zm3.375,23.266a.568.568,0,0,1-.527.6H9.035a.626.626,0,0,1-.6-.6V9.527A.568.568,0,0,1,9.035,9h.527V26.965a2,2,0,0,0,2.285,2.285h12.34ZM27.563,26.4a.568.568,0,0,1-.527.6H12.41a.626.626,0,0,1-.6-.6V6.152a.568.568,0,0,1,.6-.527h6.152v9h9Z" transform="translate(-6.188 -3.375)"/>
                            </svg>
                            <span>Export to PDF</span>
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
    </teleport>
</template>
<script>
import { mapState } from 'vuex'
import Backdrop from '../Backdrop.vue'
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
export default {
    inheritAttrs: false,
    components: { Backdrop },
    name: 'SortDropdown',
    mixins: [dropdownToggleMixin],
    props: ['id'],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
        })
    },
    methods: {
        doExport() {
            this.closeDropdown(this.id)
            this.$emit('do-export')
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