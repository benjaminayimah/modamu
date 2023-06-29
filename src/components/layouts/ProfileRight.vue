<template>
<div class="right flx-grow-1">
    <div class="right-row flx ai-c jc-sb mb-24">
        <div class="flx gap-8 ai-c">
            <h4 class="text-ellipsis">Registered kids</h4><span class="counter-pill">{{ getKids.length }}</span>
        </div>
        <button @click="$store.commit('openModal', 'kids')" v-if="getKids.length" class="button-primary gap-4 btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.132 15.132">
                <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#fff"/>
            </svg>
            <span>Add more kids</span>
        </button>
    </div>
    <div class="flx gap-50">
        <div class="kids-column flx column gap-16">
            <div class="pd-32 text-center centered flx-grow-1 bg-white br-16" v-if="!getKids.length">
                <h3 class="mb-8">No kid added yet</h3>
                <div class="mb-24">Click the button bellow to add your kids.</div>
                <button @click="$store.commit('openModal', 'kids')" class="button-primary gap-4 btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.132 15.132">
                        <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#fff"/>
                    </svg>
                    <span>Add kids</span>
                </button>
            </div>
            <kids-list v-for="kid in getKids" :key="kid.id" :kid="kid"/>
        </div>
        <router-view></router-view>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import KidsList from '../includes/app/KidsList.vue';
export default {
  components: { KidsList },
    name: 'ProfileRight',
    computed: {
        ...mapGetters(['getKids', 'getToken', 'getHostname', 'getUser']),
    },
    mounted() {
        this.fetchKids()
    },
    methods: {
        async fetchKids() {
            try {
                const res = await axios.post(this.getHostname + '/api/fetch-kids?token=' + this.getToken)
                this.$store.commit('setKids', res.data.kids)
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.kids-column{
    flex-basis: 40%;
}
.button-primary{
    height: 50px;
}
.right-row{
    container-type: inline-size;
}
@container(inline-size <= 400px) {
    button {
        padding: 16px;
        span {
            display: none
        }
    }

}
</style>