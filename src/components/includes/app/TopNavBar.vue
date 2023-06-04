<template>
    <nav class="sticky-top" id="top_nav">
        <div class="flx jc-sb ai-c nav-wrapper">
            <div class="flx">
                <button @click.prevent="$store.commit('toggleMenu')" aria-expanded="false" aria-controls="menus" v-if="device == 'mobile'" id="mobile_menu_toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17">
                        <path d="M-3700.5-596a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h19a1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5Zm0-7a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h19a1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5Zm0-7a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h19a1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5Z" transform="translate(3702 613)" fill="#1c1c1c"/>
                    </svg>
                </button>
                <div v-else class="flx ai-c gap-8 text-ellipsis">
                    <h3>Hi, welcome</h3>
                    <span>Let's get you up to speed</span>
                </div>
            </div>
            <div class="flx gap-70">
                <div class="flx gap-50 ai-c">
                    <router-link :to="{ name: 'Notification' }" class="a-btn br-50 centered relative" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20.702">
                            <path d="M-3319.3-809.554a.9.9,0,0,1-.075-1.271.9.9,0,0,1,1.271-.075,3.643,3.643,0,0,0,4.2,0,.9.9,0,0,1,1.271.075.9.9,0,0,1-.075,1.271,5,5,0,0,1-3.3,1.13A5,5,0,0,1-3319.3-809.554Zm-3.48-3.4a2.824,2.824,0,0,1-2.221-2.861,3,3,0,0,1,1.445-2.355c.758-.638,1.487-1.251,1.256-2.408-.448-3.78,2.388-7.168,5.4-7.6,0-.016,0-.031,0-.047a.9.9,0,0,1,.9-.9.9.9,0,0,1,.9.9c0,.015,0,.031,0,.047,3.013.434,5.848,3.822,5.4,7.6-.231,1.158.49,1.765,1.245,2.4a3.056,3.056,0,0,1,1.455,2.362,2.858,2.858,0,0,1-2.222,2.861,20.709,20.709,0,0,1-6.778.925A20.712,20.712,0,0,1-3322.779-812.952Zm3.494-11.819a5.311,5.311,0,0,0-1.234,3.927,3.562,3.562,0,0,1-.5,2.6,6.151,6.151,0,0,1-1.292,1.381l-.026.022c-.865.728-.869.828-.867,1.007v.024a1.015,1.015,0,0,0,.194.706,1.648,1.648,0,0,0,.778.441l.046.015.04.014,0,0,.051.017c.052.018.139.047.264.083.247.073.635.176,1.156.281a23.82,23.82,0,0,0,4.669.427,23.812,23.812,0,0,0,4.668-.427c.521-.105.909-.208,1.156-.281.123-.036.211-.065.264-.083l.05-.017,0,0,.039-.014.046-.015a1.621,1.621,0,0,0,.772-.449,1.017,1.017,0,0,0,.2-.7c0-.21-.028-.321-.88-1.04l-.025-.022a6.134,6.134,0,0,1-1.287-1.379,3.563,3.563,0,0,1-.489-2.59,5.311,5.311,0,0,0-1.234-3.927,4.175,4.175,0,0,0-3.032-1.656h-.506A4.171,4.171,0,0,0-3319.285-824.771Z" transform="translate(3325 829.126)"/>
                        </svg>
                        <i v-if="computedNotifications" class="bg-primary br-50"></i>
                    </router-link>
                    <router-link to="/profile" class="flx gap-16 ai-c u-a">
                        <span class="text-ellipsis">{{ computedFirstName(user.name) }}</span>
                        <div class="bg-img br-50" :style="user.image ? { backgroundImage: 'url('+hostname+'/storage/'+user.id+'/'+user.image+')'} : { backgroundImage: 'url('+defaultImage+')'}"></div>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapState } from 'vuex';
import userNameMixin from '../../../mixins/userNameMixin';
export default {
    name: 'TopNavBar',
    mixins: [userNameMixin],
    computed: {
        ...mapState({
            user: (state) => state.user,
            device: (state) => state.device,
            hostname: (state) => state.hostname,
            notifications: (state) => state.notifications,
            defaultImage: (state) => state.data.defaultImage
        }),
        computedNotifications() {
            const noti = this.notifications.find(item => !item.read)
            if(noti)
            return true
            else return false
        }
    }
}
</script>
<style lang="scss" scoped>
nav {
    container-type: inline-size;
    background-color: var(--bg-color);
    top: 0;
    padding: 32px 0 16px 0;
    z-index: 90;
}
.nav-wrapper{
    height: 60px;
}
.bg-img{
    width: 52px;
    height: 52px;
    transition: 0.3s ease;
    border: 1.5px solid var(--bg-color);
}
.a-btn {
    background-color: rgba($color: #ffffff, $alpha: .4);
    height: 52px;
    width: 52px;
    &:hover {
        background-color: var(--input-hover);
    }
    i{
        position: absolute;
        height: 8px;
        width: 8px;
        top: 16px;
        right: 17px;
    }
}

.u-a {
    background-color: transparent;
    span {
        max-width: 110px;
    }
    &:hover {
        .bg-img {
            border-color: var(--primary-color);
        }
    }
    &:active {
        .bg-img{
            transform: scale(0.98);      
        }
    }   

}
button {
    padding: 16px;
    background-color: transparent;
    &:active {   
        background-color: var(--input-hover);
    }
}
@container (inline-size <= 548px) {
    span {
        display: none
    }
    .gap-50{
        gap: 30px
    }
}
</style>