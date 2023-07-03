<template>
    <div class="modal-container jc-c ai-c">
        <backdrop :index="200" :opacity="0.5" />
        <div class="modal overflow-y-scroll scroll-hidden relative">
            <button @click="$store.commit('closeDeleteModal')" class="br-50 close-btn absolute">
                <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                    <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                </svg>
            </button>
            <div class="flx column ai-c pd-32 gap-24">
                <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 17.5 21">
                    <path d="M-3568.023-836.575a6.145,6.145,0,0,1-1.2-2.411c-.266-.878-.493-1.9-.78-3.2l-.152-.686c-.69-3.1-.346-5.1,1.082-6.3a6.375,6.375,0,0,1,2.894-1.23,22.93,22.93,0,0,1,4.43-.345,22.933,22.933,0,0,1,4.431.345,6.39,6.39,0,0,1,2.894,1.23c1.427,1.2,1.771,3.2,1.082,6.3l-.151.684c-.287,1.3-.514,2.326-.78,3.2a6.145,6.145,0,0,1-1.2,2.411c-1.031,1.148-2.731,1.575-6.273,1.575S-3566.992-835.427-3568.023-836.575Zm2.189-12.115a4.815,4.815,0,0,0-2.116.857c-1.145.958-.832,3.072-.5,4.578q.08.355.152.686c.279,1.264.5,2.262.745,3.075a4.667,4.667,0,0,0,.829,1.75c.463.517,1.387.995,4.971.995s4.508-.478,4.971-.995a4.672,4.672,0,0,0,.828-1.75c.247-.815.467-1.812.746-3.074q.073-.332.152-.687c.7-3.146.051-4.119-.5-4.578a4.82,4.82,0,0,0-2.116-.857,21.307,21.307,0,0,0-4.085-.31A21.3,21.3,0,0,0-3565.834-848.69Zm6.709,8.44v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.874.874,0,0,1-3559.125-840.25Zm-3.5,0v-5.25a.876.876,0,0,1,.875-.876.876.876,0,0,1,.876.876v5.25a.875.875,0,0,1-.876.875A.875.875,0,0,1-3562.625-840.25Zm-3.517,0v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.875.875,0,0,1-3566.142-840.25Zm11.816-10.625a14.576,14.576,0,0,0-7.424-1.625c-3.911,0-6.362.943-7.4,1.611a.876.876,0,0,1-1.21-.264.875.875,0,0,1,.264-1.209,14.509,14.509,0,0,1,6.6-1.827v-.937a.875.875,0,0,1,.875-.875h1.751a.875.875,0,0,1,.875.875v.937a14.935,14.935,0,0,1,6.576,1.814.874.874,0,0,1,.3,1.2.875.875,0,0,1-.75.424A.869.869,0,0,1-3554.326-850.875Z" transform="translate(3570.5 856)" fill="#e01818"/>
                </svg>
                <div class="delete-info text-center">
                    <h3>Delete {{ deleteModal.type }}</h3>
                    <span>Are you sure you want to delete this user?</span>
                </div>
                <div class="w-80">
                    <button @click="$store.commit('doDelete', 'sub-admin')" class="btn-md w-100 button-delete gap-8" :class="{ 'delete-disabled' : deleteModal.deleting }" :disabled="deleteModal.deleting ? true : false">
                        <spinner v-if="deleteModal.deleting" v-bind:size="20" v-bind:white="true" />
                        {{ deleteModal.deleting ? 'Deleting... ' : 'Delete'}}
                    </button>
                    <button class="btn-md w-100 cancel-btn" @click="$store.commit('closeDeleteModal')">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Backdrop from "../Backdrop.vue"
import Spinner from '../Spinner.vue';
export default {
    name: 'DeleteModal',
    components: { Backdrop, Spinner },
    computed: {
        ...mapState({
            deleteModal: (state) => state.deleteModal
        })
    }
}
</script>

<style lang="scss" scoped>
.modal{
    max-height: 90vh;
    width: 400px;
    z-index: 201;
}
.del-icon-wrap{
    background-color: #ffe6e6;
}
button.close-btn {
    height: 48px;
    width: 48px;
    padding: unset;
    background-color: transparent;
    inset: 5px 5px auto auto;
    &:hover {
        path{
            fill: var(--ft-dark);
        }
    }
}
.cancel-btn{
    margin-top: 8px;
    background-color: transparent;
    &:hover {
        text-decoration: underline;
    }
    &:active {
        box-shadow: 0 0 0 0.2rem rgba(39, 40, 45, 0.2);
    //   background-color: $primary-light;
    }
}
.delete-disabled{
    background-color: #efa1a1;
}
</style>