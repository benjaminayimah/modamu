<template>
<div class="right flx-grow-1">
    <div class="right-row flx ai-c jc-sb mb-16">
        <div class="flx gap-8 ai-c">
            <h4 class="text-ellipsis">Registered kids</h4><span class="counter-pill">{{ getKids.length }}</span>
        </div>
        <button class="button-primary gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20 20">
                <path d="M-3266.055-837.995a1.029,1.029,0,0,1-1.021-1.034l.048-7.944-7.944-.048a1.028,1.028,0,0,1-1.022-1.034,1.028,1.028,0,0,1,1.034-1.021l7.944.048.048-7.944a1.028,1.028,0,0,1,1.034-1.021,1.027,1.027,0,0,1,1.021,1.034l-.048,7.944,7.945.048a1.029,1.029,0,0,1,1.021,1.034,1.028,1.028,0,0,1-1.034,1.022l-7.944-.048-.048,7.944a1.03,1.03,0,0,1-1.03,1.022Z" transform="translate(3275.994 857.994)" fill="#fff"/>
            </svg>
            <span>Add more kids</span>
        </button>
    </div>
    <div class="flx gap-50">
        <div class="kids-column flx column gap-16">
            <div v-if="!getKids.length">Not found</div>
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
            } catch (error) {
                console.error('Error:', error);
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