<!-- <template>
    <div class="grid col-2 gap-32">
        <div class="pd-20 bg-white br-24" id="dash_message">
            <div class="mb-24 flx ai-c jc-sb">
                Messages
                <router-link to="/messages" class="gray fs-09 see-all wrap-text wrap-line-1">See all{{ messages.length > computedMsgSlice ? '('+messages.length+')' : ''  }}</router-link>
            </div>
            <div class="flx-grow-1 centered" v-if="!messages.length">No new messages</div>
            <div v-else class="m--10">
                <message-lists class="mb-8" v-for="data in messages.slice(0, computedMsgSlice)" :key="data.message.id" :data="data"/>
            </div>
        </div>
        <dash-notification-card />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import MessageLists from '../includes/app/MessageLists.vue'
import DashNotificationCard from './DashNotificationCard.vue';
export default {
    components: { MessageLists, DashNotificationCard },
    name: 'DashMessageAndNotifications',
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
<style lang="scss" scoped>
.tablet {
    .mb-8, .mb-4{
        margin-bottom: 0;
    }
    .col-2{
        grid-template-columns: 1fr;
    }
}
</style> -->