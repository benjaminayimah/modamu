<template>
    <div v-if="forms.active" class="modal-container jc-c ai-c">
        <backdrop :index="100" />
        <div id="main_modal" class="modal">
            <div class="modal-top flx jc-sb ai-c">
                <h3 id="modal_title"></h3>
                <button @click="$store.commit('closeModal')" class="br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body overflow-y-scroll scroll-hidden">
                <div id="modal_content" class="modal-content">
                    <lottie-loader v-if="forms.loader" />
                </div>
            </div>
            <div class="modal-footer" id="modal_footer"></div>
        </div>
    </div>
    <add-kids-modal v-if="forms.kids" />
    <profile-edit-modal v-else-if="forms.editProfile" />
    <change-pass-modal v-else-if="forms.changePass"/>
    <add-to-gallery v-else-if="forms.addtoGallery" />
    <verify-code-modal v-else-if="forms.verifyCode" />
    <add-village-form v-else-if="forms.addVillage" />
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';
import Backdrop from '../includes/Backdrop.vue';
import LottieLoader from '../includes/LottieLoader.vue';
const VerifyCodeModal = defineAsyncComponent(() => import(/* webpackChunkName: VerifyCodeModal */ '@/components/layouts/VerifyCodeModal.vue'));
const AddKidsModal = defineAsyncComponent(() => import(/* webpackChunkName: AddKidsModal */ './AddKidsModal.vue'));
const AddToGallery = defineAsyncComponent(() => import(/* webpackChunkName: AddToGallery */ './AddToGalleryModal.vue'));
const ChangePassModal = defineAsyncComponent(() => import(/* webpackChunkName: ChangePassModal */ './ChangePassModal.vue'));
const ProfileEditModal = defineAsyncComponent(() => import(/* webpackChunkName: ProfileEditModal */ './ProfileEditModal.vue'));
const AddVillageForm = defineAsyncComponent(() => import(/* webpackChunkName: ProfileEditModal */ '../../views/app/admin/AddVillageForm.vue'));
export default {
    components: { AddKidsModal, ProfileEditModal, ChangePassModal, AddToGallery, VerifyCodeModal, AddVillageForm, Backdrop, LottieLoader },
    name: 'MainModal',
    computed: {
        ...mapState({
            forms: (state) => state.forms,
        })
    }
}
</script>

<style lang="scss" scoped>
.modal-container{
  position: fixed;
  inset: 0;
  // pointer-events: none !important;
  display: flex;
  z-index: 100;
}
.modal{
  max-height: 90vh;
  width: 560px;
  border-radius: 24px;
  overflow-y: hidden;
  background-color: #fff;
  z-index: 110;
}
.modal-top{
    border-bottom: 1px solid var(--bg-color);
    padding: 6px 28px;
    button {
        height: 48px;
        width: 48px;
        padding: unset;
        background-color: transparent;
        margin-right: -16px;
        &:hover {
            path{
                fill: var(--ft-dark);
            }
        }
    }
}
.modal-body{
    padding: 32px 28px 50px 28px;
    max-height: calc(100dvh - 250px);
}
.modal-footer{
    padding: 16px 28px 28px 28px;
    box-shadow: rgba(23, 23, 23, 0.1) 0px 0px 8px;
}
@media screen and (max-width: 590px){
    .modal{
        width: 430px;
    }
}
@media screen and (max-width: 430px){
    .modal{
        height: 100dvh;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
    }
    .modal-body{
        max-height: calc(100dvh - 155px);
        height: 100%;
    }
    
}
</style>