<template>
    <dialog id="main_modal" class="modal">
        <div class="modal-top flx jc-sb ai-c">
            <h3 id="modal_title">Modal title</h3>
            <button @click="$store.commit('hideModal')" class="br-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                    <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <div id="modal_content" class="modal-content">
                <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="name">Name</label>
                    <div class="input-wrapper">
                        <input  class="form-control" type="text" name="name" id="name" data-color="dark">
                    </div>
                    
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input  class="form-control" type="email" name="email" data-color="dark">
                    </div>
                    
                </div>
                <div class="form-row column">
                    <label for="phone">Phone number</label>
                    <div class="input-wrapper">
                        <input class="form-control" type="tel" name="phone_number" data-color="dark">
                    </div>
                </div>
                <div class="form-row column">
                    <label for="phone">Phone number</label>
                    <div class="input-wrapper">
                        <input class="form-control" type="tel" name="phone_number" data-color="dark">
                    </div>
                </div>
                
                <div v-if="is_parent" class="form-row column">
                    <label for="emergency_number">Emergency number</label>
                    <div class="input-wrapper">
                        <input  class="form-control" type="tel" name="emergency_number" data-color="dark">
                    </div>
                </div>
                <div v-if="is_parent" class="form-row column">
                    <label for="ocupation">Occupation</label>
                    <div class="input-wrapper">
                        <input class="form-control" type="text" name="ocupation" data-color="dark">
                    </div>
                </div>
                <!-- <div class="form-row column">
                    <label for="address">Address</label>
                    <div class="input-wrapper">
                        <input v-model="form.address" class="form-control" type="text" name="address" data-color="dark">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.address">
                        {{ validation.errors.address[0] }}
                    </span>
                </div> -->
                <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img">
                <button @click="doSubmit" class="button-primary w-100 gap-8" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                    <span>{{ creating ? 'Submitting...' : 'Submit update'}}</span>
                </button>  
            </form>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: 'MainModal',
    data() {
        return {
            form: {
                name: '',
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
dialog {
    width: 500px;
    border: 0;
    border-radius: 24px;
    padding: 16px 32px;
}
.modal::backdrop {
    background-color: rgba($color: #000000, $alpha: 0.5);
}
.modal-top{
    border-bottom: 1px solid var(--bg-color);
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
    padding: 32px 0;
}

@media screen and (max-width: 590px){
    dialog{
        width: 430px;
    }
    
}
@media screen and (max-width: 430px){
    dialog{
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
}
</style>