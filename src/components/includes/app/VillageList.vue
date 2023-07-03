<template>
    <a href="#" @click.prevent="doClick" class="bg-white br-16 gap-24 flx relative" :class="[computeSelected, { 'viewing' : viewEdit.viewing }, { 'hover' : !checkAllocated && !viewEdit.viewing}, { 'no-hover' : (viewEdit.viewing || checkAllocated )}]">
        <button @click="removeAllocated" v-if="viewEdit.viewing" class="remove absolute br-32 fs-09 a-btn" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
            Remove
        </button>
        <span v-if="viewEdit.edit && checkAllocated" class="absolute allocated br-32 fs-08">Already allocated</span>
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
            <span v-if="!select" class="ft-primary">
                <div v-if="!viewEdit.viewing" class="flx gap-4 ai-c">
                    Details
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14">
                        <path d="M-3431.993-710.293a1,1,0,0,1,0-1.415L-3426.7-717l-5.293-5.293a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-.708.292A1,1,0,0,1-3431.993-710.293Zm-6.084-1.916a.714.714,0,0,1,0-1.01L-3434.3-717l-3.781-3.781a.714.714,0,0,1,0-1.01.715.715,0,0,1,1.011,0l4.286,4.286a.715.715,0,0,1,0,1.01l-4.286,4.286a.714.714,0,0,1-.506.21A.713.713,0,0,1-3438.077-712.209Z" transform="translate(3438.286 724)" fill="#87a5ff"/>
                    </svg>
                </div>
            </span>
            <button v-else-if="!checkAllocated">
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 18.788 14.586">
                    <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)" fill="#fff"/>
                </svg>
            </button>
        </span>
    </a>
</template>

<script>
import { deleteApi } from '@/api'
import { mapState } from 'vuex'
export default {
    name: 'VillageList',
    props: ['village', 'select', 'selections', 'allocated'],
    computed: {
        ...mapState({
            viewEdit: (state) => state.subAdminStore,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            villages: (state) => state.villages,

        }),
        computeSelected() {
            if(this.select) {
                const i = this.selections.find(id => id === this.village.id)
                if(i)
                return 'selected'
                else
                return 'not-selected'
            }
            else
            return 'null'
        },
        checkAllocated() {
            if(this.allocated) {
                let i = this.allocated.find(x => x.village_id == this.village.id)
                if(i) {
                    return true
                }else {
                    return false
                }
            }
            return '' 
        }
    },
    data() {
        return {
            creating: false
        }
    },
    methods: {
        doClick() {
            if (!this.select) {
                if(!this.viewEdit.viewing) {
                    this.$router.push({ name: 'DetailedVillage', params: { name: this.village.name, id: this.village.id, filter: 'all' }})
                }
            } else {
                if(!this.checkAllocated)
                this.$emit('do-selection', this.village.id)
            }
        },
        async removeAllocated() {
            this.creating = true
            try {
                const res = await deleteApi(this.hostname + '/api/remove-village-allocation/'+ this.village.id +'?token='+this.token)
                this.$store.commit('removeFromVillageAllocation', res.data)
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
button:not(.remove) {
    height: 30px;
    width: 30px;
    &:hover {
        border: 1px solid var(--primary-color) !important;
    }
}
.not-selected{
    button {
        background-color: transparent;
        border: 1px solid #b4b7be;
        &:hover {
            border-color: var(--primary-color) ;
        }
    }
}
.selected{
    border-color: var(--primary-color);
    button {
        background-color: var(--primary-color);
    }
}
.viewing{
    width: 100%;
}
.remove {
    padding: 10px 12px;
    inset: 10px 10px auto auto;
    color: var(--error);
    background-color: #ffecec;
    cursor: pointer;
    &:hover {
        background-color: var(--error);
        color: var(--ft-white);
    }
}
.hover {
    &:hover {
        border-color: var(--primary-color);
        box-shadow: rgba(15, 41, 77, 0.08) 0px 8px 16px 0px;
    }
}
.no-hover{
    cursor: default;
}
.allocated{
    padding: 3px 8px;
    inset: 10px 10px auto auto;
    color: var(--success-green);
    background-color: #e4f7f0;
}
</style>