<template>
    <li>
        <a @click.prevent="$store.commit('selectRecipient', user)" href="#" class="flx gap-16 ai-c bg-white br-16" :class="computeSelected">
            <button id="select_btn" class="select-btn transparent">
                <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 18.788 14.586">
                    <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)" fill="#fff"/>
                </svg>
            </button>
            <profile-avatar :id="user.id" :image="user.image" />
            <span class="wrap-text wrap-line-1 name">{{ user.name }}</span>
        </a>
    </li>
</template>

<script>
import { mapState } from 'vuex';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
    components: { ProfileAvatar },
    name: 'ContactList',
    props: ['user'],
    computed: {
        ...mapState({
            selections: (state) => state.contactSelections
        }),
        computeSelected() {
            if(this.selections) {
                const i = this.selections.find(x => x.id === this.user.id)
                if(i)
                return 'selected'
                else
                return 'not-selected'
            }
            else
            return 'null'
        },

    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 14px;
    &:hover {
        background-color: var(--bg-color);
        button {
            border-color: var(--primary-color);
        }
    }
}
.bg-img {
    height: 50px;
    width: 50px;
}

button.select-btn{
    padding: 0;
    height: 22px;
    width: 22px;
}
.not-selected{
    button {
        border: 1px solid #b4b7be;
    }
}
.selected{
    border-color: var(--primary-color);
    button {
        background-color: var(--primary-color);
    }
}
</style>