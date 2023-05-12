<template>
    <transition name="fade">
        <backdrop v-if="addModal" />
    </transition>
    <transition name="fade">
        <section v-if="addModal">
            <div id="modal" class="relative" :style="{ maxHeight: windowHeight-80 +'px', minHeight: 200 + 'px' }">
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
import VerifyCodeModal from '@/views/app/village/VerifyCodeModal.vue';
import { mapState } from 'vuex';
import Backdrop from '../includes/Backdrop.vue';
import AddKidsModal from './AddKidsModal.vue';
import AddToGallery from './AddToGallery.vue';
import ChangePassModal from './ChangePassModal.vue';
import ProfileEditModal from './ProfileEditModal.vue';
export default {
    components: { AddKidsModal, Backdrop, ProfileEditModal, ChangePassModal, AddToGallery, VerifyCodeModal },
    name: 'NewModal',
    computed: {
        ...mapState({
            forms: (state) => state.forms,
            windowHeight: (state) => state.windowHeight,
            addModal: (state) => state.addModal

        })
    } 
}
</script>
<style lang="scss" scoped>
section{
    position: fixed;
    width: 500px;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 101;
    padding: 40px 0;
}
#modal{
    background-color: #fff;
    width: inherit;
    border-radius: 24px;
    padding: 0 32px;
    overflow-y: auto;
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