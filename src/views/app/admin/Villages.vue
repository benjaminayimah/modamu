<template>
    <section id="villages" class="section-main" v-if="is_super || is_sublevel_villages || is_sublevel2">
        <div class="title-row flx gap-50 ai-c jc-sb">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Villages</h1>
                <span class="count-info" :class="villages.length ? 'count-primary' : 'count-secondary'">{{ villages.length }}</span>
                <div class="input-wrapper">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </i>
                    <input class="form-control" v-model="search" type="search" data-type="icon" placeholder="Search village...">
                </div>
            </div>
            <button v-if="is_super || is_sublevel_villages" @click="$store.commit('openModal', 'add-village')" class="button-primary gap-4 btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.132 15.132">
                    <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#fff"/>
                </svg>
                Add village
            </button>
        </div>
        <div v-if="!villages.length" class="bg-white pd-24 br-16 centered">
            <div>There are no villages</div>
        </div>
        <div v-else-if="computedItem.length" class="grid village-grid gap-16 grid-col-4">
            <village-list v-for="village in computedItem" :key="village.id" :village="village" />
        </div>
        <div v-else><strong>No search result for:</strong> <i>{{ search }}</i></div>
    </section>
    <access-denied v-else />
</template>
<script>
import usersLevelMixin from '@/mixins/usersLevelMixin';
import VillageList from '@/components/includes/app/VillageList.vue';
import { mapState } from 'vuex';
import AccessDenied from '@/components/includes/app/AccessDenied.vue';
export default {
    components: { VillageList, AccessDenied },
    name: 'VillagesPage',
    mixins: [usersLevelMixin],
    computed: {
        ...mapState({
            villages: (state) => state.villages
        }),
        computedItem() {
            if(this.search !=='')
            return this.villages.filter(item => {
                return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase()) || item.address.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
            })
            else
            return this.villages
        }
    },
    data() {
        return {
            search: ''
        }
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.village-grid{
    a{
        padding: 24px;
    }
}
</style>