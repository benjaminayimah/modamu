<template>
    <chat-lists v-for="chat in chats" :key="chat.id" :chat="chat"/>
</template>

<script>
import ChatLists from '../includes/app/ChatLists.vue'
export default {
  components: { ChatLists },
    name: 'ChatBody',
    props: ['chats'],
}
</script>
