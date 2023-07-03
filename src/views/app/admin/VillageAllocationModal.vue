<template>
    <div class="modal-container jc-c ai-c">
        <backdrop :index="300" :opacity="0.5" />
        <div class="modal overflow-y-scroll scroll-hidden flx column relative" :class="subAdminStore.viewing ? 'viewing-mode' : 'add-mode'">
            <div class="modal-top grid col-3 jc-sb ai-c sticky">
                <div>
                    <h3>{{ !subAdminStore.viewing ? 'Allocate villages' : 'Allocated villages'  }}</h3>
                </div>
                <div class="input-wrapper">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                            <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                        </svg>
                    </i>
                    <input class="form-control" v-model="search" type="search" data-type="icon" placeholder="Search village...">
                </div>
                <div class="flx jc-fe">
                    <button @click="$store.commit('closeAllocateVillage')" class="br-50">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                            <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div class="mb-16">
                    <div v-if="!subAdminStore.viewing">
                        Village personnels will only have a read-write permission to selected villages.
                        <p>
                            Select the villages this user can have access to.
                        </p>
                    </div>
                    <div v-else>
                        Villages this user is permitted to access:
                    </div>
                </div>
                <lottie-loader v-if="forms.loader" />
                <div v-if="!villages.length" class="bg-white pd-24 br-16 centered">
                    <div>There are no villages</div>
                </div>
                <div v-else-if="computedItem.length" class="flx flx-wrap gap-24">
                    <village-list class="pd-24" v-for="village in computedItem" 
                        :key="village.id" :village="village" 
                        :select="computedSelect" @do-selection="doSelection" 
                        :selections="form.selections" 
                        :allocated="computeForAllocated"
                    />
                </div>
                <div v-else-if="!computedViewingMode.length" class="flx column jc-c ai-c empty">
                    <h3 class="mb-4">No village allocated</h3>
                    <div class="mb-16">No village has been allocated to this user</div>
                    <button class="button-primary btn-md" @click.prevent="$store.commit('toggleVillageAllocationMode')">Allocate village</button>
                </div>
                <div v-else><strong>No search result for:</strong> <i>{{ search }}</i></div>
            </div>
            <div v-if="computedItem.length" class="modal-bottom sticky flx jc-sb ai-c">
                <div class="flx gap-24 ai-c">
                    <div v-if="!subAdminStore.viewing" class="flx gap-8">
                        <button v-if="!subAdminStore.edit" @click="selectAll" class="btn-sm button-outline s-a">Select all</button>
                        <button v-if="form.selections.length" @click="clearAll" class="btn-sm button-outline c-a">Clear all</button>
                    </div>
                    <button v-else @click="$store.commit('toggleVillageAllocationMode')" class="btn-sm button-outline s-a">Add more</button>
                    <div v-if="!subAdminStore.viewing" class="flx gap-4 ft-primary"><strong>{{ form.selections.length }}</strong>villages selected</div>
                </div>
                <div class="flx gap-16 ai-c">
                    <button v-if="subAdminStore.edit" @click="$store.commit('toggleVillageAllocationMode')" class="btn-sm button-outline gap-8 s-a">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 8 14">
                            <path d="M1,14a1,1,0,0,0,.707-.293l6-6a1,1,0,0,0,0-1.414l-6-6A1,1,0,1,0,.293,1.707L5.586,7,.293,12.293A1,1,0,0,0,1,14Z" transform="translate(8 14) rotate(180)" fill="#0173ff"/>
                        </svg>
                        Back
                    </button>
                    <button v-if="!subAdminStore.viewing" @click="doSubmit" class="button-primary gap-8 btn-md" :class="{ 'button-disabled' : !computedCheck || creating }" :disabled="!computedCheck || creating ? true : false">
                        <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                        <span>{{ creating ? 'Submiting...' : 'Submit'}}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { postApi } from '@/api';
import { mapState } from 'vuex';
import VillageList from '@/components/includes/app/VillageList.vue';
import LottieLoader from '@/components/includes/LottieLoader.vue';
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue';
export default {
    components: { Backdrop, LottieLoader, VillageList, Spinner },
    name: 'VillageAllocation',
    computed: {
        ...mapState({
            subAdminStore: (state) => state.subAdminStore,
            forms: (state) => state.forms,
            villages: (state) => state.villages,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            allocatedVillages: (state) => state.village_allocation_access
        }),
        computedItem() {
            if(this.search !=='')
            return this.computedViewingMode.filter(item => {
                return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase()) || item.address.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
            })
            else
            return this.computedViewingMode
        },
        computedCheck() {
            if(this.form.selections.length)
            return true
            else
            return false
        },
        computedSelect() {
            if(this.subAdminStore.viewing)
            return false
            else
            return true
        },
        computedViewingMode() {
            let villages = this.villages
            if(this.subAdminStore.viewing) {
                villages = this.allocatedVillages.filter(data => data.user_id == this.subAdminStore.user.id)
            }
            return villages
        },
        computeForAllocated() {
            if(this.subAdminStore.edit)
            return this.allocatedVillages.filter(data => data.user_id == this.subAdminStore.user.id)
            else
            return ''
        }
    },
    data() {
        return {
            search: '',
            form: {
                user: '',
                selections: []
            },
            creating: false,
            selectedAll: false
        }
    },
    methods: {
        doSelection(id) {
            const i = this.form.selections.find(data => data === id)
            if (i) {
                this.form.selections = this.form.selections.filter(x => x !== i)
            } else {
                this.form.selections.push(id)
            }
        },
        clearAll() {
            this.form.selections = []
        },
        selectAll() {
            if(!this.selectedAll) {
                    this.villages.forEach(element => {
                    this.form.selections.push(element.id)
                });
                this.selectedAll = true
            }else {
                this.clearAll()
                this.selectedAll = false
            }
        },
        async doSubmit() {
            if(this.form.selections.length) {
                this.creating = true
                try {
                    const res = await postApi(this.hostname+'/api/allocate-village?token='+this.token, this.form)
                    this.successResponse(res.data)
                } catch (e) {
                    this.creating = false
                    if(e.response.status == 400) {
                        this.$store.commit('setExpSession')
                    }
                }
            }
        },
        successResponse(res) {
            this.$store.commit('updateVillageAllocationAccess', res)
            this.$store.commit('closeAllocateVillage')
            this.creating = false
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.form.user = this.subAdminStore.user.id
    }
}
</script>

<style lang="scss" scoped>
.add-mode{
    height: 90vh;
    width: 60vw;
}
.viewing-mode {
    max-height: 90vh;
    // min-height: 60vh;
    width: 560px;
}
.empty{
    min-height: 50vh;
}
.modal{
    z-index: 301;
}
a {
    border: 1px solid #eee;
    transition: var(--input-btn-transition);
    flex: 1 1 auto;
}
input[type=search] {
    height: 43px !important;
    padding-left: 40px !important;
    background-color: #ebeef5 !important;
    &:hover {
        background-color: var(--input-hover) !important;
    }
}
.input-wrapper i{
    left: 16px !important;
}
</style>