<template>
    <li :id="id" class="a-btn flx">
        <a href="#" class="trigger fw-600" @click.prevent="doToggle(id)">
            Add Admin
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
                <path d="M1,14a1,1,0,0,0,.707-.293l6-6a1,1,0,0,0,0-1.414l-6-6A1,1,0,0,0,.293,1.707L5.586,7,.293,12.293A1,1,0,0,0,1,14Z" transform="translate(14) rotate(90)"/>
            </svg>
        </a>
    </li>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click.prevent="closeDropdown(id)" :index="100" :opacity="0" />
        <transition name="drop-fade" mode="out-in">
            <div class="dropdown" v-if="toggleMenu" :style="{ left: dynamicFloatingDiv.left-55+'px', top: dynamicFloatingDiv.top+45 + 'px'}">
                <ul>
                    <li class="a-btn">
                        <a href="#" class="gap-8" @click.prevent="doAdd(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 45 36">
                                <path d="M43.755,19.062l-8.1-3.164a2.179,2.179,0,0,0-1.561,0l-8.1,3.164a1.9,1.9,0,0,0-1.245,1.751c0,7.847,4.83,13.275,9.345,15.04a2.181,2.181,0,0,0,1.561,0C39.263,34.446,45,29.566,45,20.813A1.9,1.9,0,0,0,43.755,19.062Zm-8.88,13.451v-13.3l6.715,2.623a12.577,12.577,0,0,1-6.715,10.673ZM15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.75,2.813a3.994,3.994,0,0,1,.077-.506c-.176-.007-.345-.056-.527-.056H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75a3.46,3.46,0,0,0,1.35-.281A18.891,18.891,0,0,1,22.5,20.813Z"/>
                            </svg>
                            <span>Sub Admin</span>
                        </a>
                    </li>
                    <li class="a-btn">
                        <a href="#" class="gap-8" @click.prevent="doAdd(2)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 32 30">
                                <path d="M-3194-639v-6.5a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v6.5h-8a1,1,0,0,1-1-1v-14.558l12-9.6,12,9.6V-640a1,1,0,0,1-1,1Zm-6-15.5v4a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-4a.5.5,0,0,0-.5-.5h-5A.5.5,0,0,0-3200-654.5Zm-12.782-.876a1,1,0,0,1,.157-1.406l4.625-3.7V-665.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2.619l7.375-5.9a1,1,0,0,1,1.249,0l15,12h0a1,1,0,0,1,.156,1.406,1,1,0,0,1-1.406.156L-3197-666.72l-14.375,11.5A1,1,0,0,1-3212-655,1,1,0,0,1-3212.781-655.375Z" transform="translate(3213 669)" fill="#212121"/>
                            </svg>
                            <span>Village personnel</span>
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
    components: { Backdrop },
    name: 'AddAdminDropdown',
    mixins: [dropdownToggleMixin],
    props: ['id'],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
        })
    },
    methods: {
        doAdd(payload) {
            this.closeDropdown(this.id)
            this.$store.commit('setAddAdmin', payload)
        }
    }
}
</script>
<style lang="scss" scoped>
.trigger {
    background-color: var(--primary-color);
    color: var(--ft-white);
    path {
        fill: var(--ft-white);
    }
    &:hover {
        background-color: var(--primary-dark);
    }
}
</style>