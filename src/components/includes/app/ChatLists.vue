<template>
    <article class="flx column">
        <div v-if="computeMyChat" class="flx jc-fe">
            <div class="chat-bubble host">
                <span class="fs-09">{{ chat.chat }}</span>
                <span class="fs-07 flx ai-c jc-fe gap-8">
                    <span>{{ time }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 26.59 13.41">
                        <g id="check" transform="translate(-4529 -2657)">
                            <path id="read" d="M9,16.17,4.83,12,3.41,13.41,9,19,21,7,19.59,5.59Z" transform="translate(4525.59 2651.41)" fill="#fff"/>
                            <path id="delivered" d="M9,16.17,7.728,14.917l-1.42,1.41L9,19,21,7,19.59,5.59Z" transform="translate(4534.59 2651.41)" fill="#fff"/>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
        <div v-else class="flx">
            <div class="chat-bubble guest">
                <span class="fs-09">{{ chat.chat }}</span>
                <span class="fs-07 flx jc-fe ai-c gap-8">
                    <span>{{ time }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 0 26.59 13.41">
                        <g id="check" transform="translate(-4529 -2657)">
                            <path id="read" d="M9,16.17,4.83,12,3.41,13.41,9,19,21,7,19.59,5.59Z" transform="translate(4525.59 2651.41)" fill="#fff"/>
                            <path id="delivered" d="M9,16.17,7.728,14.917l-1.42,1.41L9,19,21,7,19.59,5.59Z" transform="translate(4534.59 2651.41)" fill="#fff"/>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ChatLists',
    props: ['chat'],
    computed: {
        ...mapState({
            user: (state) => state.user
        }),
        computeMyChat() {
            if(this.chat.user_id == this.user.id)
            return true
            else
            return false
        },
        time() {
            let me = this.chat.created_at
            return new Date(me).toLocaleTimeString()
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-bubble{
    padding: 8px 12px;
    border-radius: 24px;
    max-width: 65%;
    color: var(--ft-white);
    margin-bottom: 4px;
}
.guest{
    border-bottom-left-radius: 0;
    color: var(--ft-dark);
    border: 1px #fff solid;
    background-color: #F0F5FF;
    path {
        fill: var(--ft-dark)
    }
}
.host {
    border-bottom-right-radius: 0;
    background: linear-gradient(266.81deg, #0173FF 2.53%, #70b0ff 99.07%);

}
</style>