<template>
    <transition name="fade">
        <backdrop v-if="addModal" />
    </transition>
    <transition name="fade">
        <section v-if="addModal" class="modal-section">
            <div id="modal" class="relative" >
                <div class="modal-top relative">
                    <button @click="$store.commit('closeModal')" class="br-50">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                            <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="modal_content" class="modal-content"></div>
                </div>
            </div>
        </section>
    </transition>
    <add-kids-modal v-if="forms.kids" />
    <profile-edit-modal v-else-if="forms.editProfile" />
    <change-pass-modal v-else-if="forms.changePass"/>
    <add-to-gallery v-else-if="forms.addtoGallery" />
    <verify-code-modal v-else-if="forms.verifyCode" />
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';
import Backdrop from '@/components/includes/Backdrop.vue'
const VerifyCodeModal = defineAsyncComponent(() => import(/* webpackChunkName: VerifyCodeModal */ '@/views/app/village/VerifyCodeModal.vue'));
const AddKidsModal = defineAsyncComponent(() => import(/* webpackChunkName: AddKidsModal */ './AddKidsModal.vue'));
const AddToGallery = defineAsyncComponent(() => import(/* webpackChunkName: AddToGallery */ './AddToGallery.vue'));
const ChangePassModal = defineAsyncComponent(() => import(/* webpackChunkName: ChangePassModal */ './ChangePassModal.vue'));
const ProfileEditModal = defineAsyncComponent(() => import(/* webpackChunkName: ProfileEditModal */ './ProfileEditModal.vue'));


export default {
    components: { AddKidsModal, Backdrop, ProfileEditModal, ChangePassModal, AddToGallery, VerifyCodeModal },
    name: 'NewModal',
    computed: {
        ...mapState({
            forms: (state) => state.forms,
            windowHeight: (state) => state.windowHeight,
            addModal: (state) => state.addModal
        }),
        computedHeight() {
            return this.windowHeight
        }
    } 
}
</script>
<style lang="scss" scoped>
section{
    position: fixed;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 101;
    padding: 40px 0;
    width: 500px;
}
@media screen and (max-width: 590px){
    section{
        width: 430px;
    }
    .modal-content{
        padding: 32px 0 40px 0 !important;

    }
}
@media screen and (max-width: 430px){
    section{
        width: 100%;
        height: 100%;
        padding: 0;
    }
    .modal-body{
        padding: 0 !important;
        height: inherit;
    }
    #modal{
        height: 100%;
        border-radius: 0 !important;
    }
    button {
        top: 10px !important;
    }
}
#modal{
    background-color: #fff;
    width: inherit;
    border-radius: 24px;
    padding: 0 32px;
    overflow-y: auto;
    max-height: calc(v-bind(computedHeight) - 80px);
    min-height: calc(v-bind(computedHeight) + 200px);
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
}
.modal-top{
    button {
        height: 48px;
        width: 48px;
        padding: unset;
        background-color: transparent;
        position: fixed;
        right: 10px;
        top: 48px;
        &:hover {
            path{
                fill: var(--ft-dark);
            }
        }
    }
}
.modal-body{
    padding: 40px 0;
    height: inherit;
}
.modal-content{
    padding: 32px;
}
</style>