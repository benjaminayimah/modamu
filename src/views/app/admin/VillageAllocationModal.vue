<template>
    <div class="modal-container jc-c ai-c">
        <backdrop :index="300" :opacity="0.5" />
        <div class="modal">
            <div class="modal-top flx jc-sb ai-c sticky">
                <div>
                    <h3>Allocate villages</h3>
                    <div>Allocate villages to this user</div>
                </div>
                <button @click="$store.commit('closeAllocateVillage')" class="br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                    </svg>
                </button>
            </div>
            <div>
                {{ allocate.user }}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Backdrop from '@/components/includes/Backdrop.vue'
export default {
    components: { Backdrop },
    name: 'VillageAllocation',
    computed: {
        ...mapState({
            allocate: (state) => state.village_allocation
        })
    },
    data() {
        return {
            creating: false,
        }
    },
    methods: {
        
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.modal{
  max-height: 90vh;
  width: 60vw;
  border-radius: 24px;
  background-color: #fff;
  z-index: 301;
  padding: 40px;
}
</style>