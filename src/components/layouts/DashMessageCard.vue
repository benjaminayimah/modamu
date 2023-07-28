<template>
    <div class="pd-20 flx-grow-1 bg-white br-24" id="dash_message">
        <div class="mb-24 flx ai-c jc-sb">
            Messages
            <router-link to="/messages" class="gray fs-09 see-all wrap-text wrap-line-1">See all{{ messages.length > computedMsgSlice ? '('+messages.length+')' : ''  }}</router-link>
        </div>
        <div class="flx-grow-1 centered" v-if="!messages.length">No new messages</div>
        <div v-else class="m--10">
            <div v-if="is_parent || is_village || is_super || is_sublevel_messages">
                <message-lists class="mb-8" v-for="data in messages.slice(0, computedMsgSlice)" :key="data.message.id" :data="data"/>
            </div>
            <div v-else class="flx-grow-1 centered">
                You don't have access to view this content
            </div>
        </div>
    </div>
</template>

<script>
import usersLevelMixin from '@/mixins/usersLevelMixin';
import { mapState } from 'vuex';
import MessageLists from '../includes/app/MessageLists.vue'
export default {
    components: { MessageLists },
    name: 'DashMessageCard',
    mixins: [usersLevelMixin],
    computed: {
        ...mapState({
            messages: (state) => state.messages,
            device: (state) => state.device,
            computedMsgSlice() {
                if(this.device == 'tablet')
                return 2
                else
                return 4
            }
        })
    }
}
</script>

<style>

</style>