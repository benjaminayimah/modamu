<template>
    <article v-for="chat in chats" :key="chat.id" class="flx column">
        <div v-if="chat.state == '1'" class="flx">
            <div class="chat-bubble guest">
                <span class="fs-09">{{ chat.chat }}</span>
                <span class="fs-08 flx flx-end">12:00</span>
            </div>
        </div>
        <div v-else class="flx flx-end">
            <div class="chat-bubble host">
                <span class="fs-09">{{ chat.chat }}</span>
                <span class="fs-08 flx flx-end">09: 30</span>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'ChatBody',
    props: ['chats']
}
</script>

<style lang="scss" scoped>
.chat-bubble{
    padding: 20px;
    border-radius: 24px;
    max-width: 65%;
    color: var(--ft-white);
    margin-bottom: 4px;
}
.guest{
    background-color: #646773;
    border-bottom-left-radius: 0;
}
.host {
    background-color: #0966d7;
    border-bottom-right-radius: 0;
}
</style>