<template>
    <section class="section-main" v-if="is_super">
        <div class="title-row flx gap-50 ai-c jc-sb">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Sub Admins</h1>
            </div>
            <ul class="dropdown-toggle">
                <add-admin-dropdown :id="'add_admins_toggle'" />
            </ul>
        </div>
        <div class="empty-state flx jc-c ai-c" v-if="!sub_admins.length">
            <div class="pd-32 br-16 bg-white add-container">
                <div class="text-center">Select what you would like to add</div>
                <ul class="mt-32 column flx gap-8">
                    <li class="a-btn">
                        <a href="#" @click.prevent="$store.commit('setAddAdmin', 1)" class="flx gap-16 br-16">
                            <i class="bg-white br-50 centered">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 45 36">
                                    <path d="M43.755,19.062l-8.1-3.164a2.179,2.179,0,0,0-1.561,0l-8.1,3.164a1.9,1.9,0,0,0-1.245,1.751c0,7.847,4.83,13.275,9.345,15.04a2.181,2.181,0,0,0,1.561,0C39.263,34.446,45,29.566,45,20.813A1.9,1.9,0,0,0,43.755,19.062Zm-8.88,13.451v-13.3l6.715,2.623a12.577,12.577,0,0,1-6.715,10.673ZM15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.75,2.813a3.994,3.994,0,0,1,.077-.506c-.176-.007-.345-.056-.527-.056H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75a3.46,3.46,0,0,0,1.35-.281A18.891,18.891,0,0,1,22.5,20.813Z"/>
                                </svg>
                            </i>
                            <div class="column flx jc-c">
                                <h4>Sub admin</h4>
                                <span class="gray">Add sub admins to manage this account</span>
                            </div>
                        </a>
                    </li>
                    <li class="a-btn">
                        <a href="#" @click.prevent="$store.commit('setAddAdmin', 2)" class="flx gap-16 br-16">
                            <i class="bg-white br-50 centered flx-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 32 30">
                                <path d="M-3194-639v-6.5a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v6.5h-8a1,1,0,0,1-1-1v-14.558l12-9.6,12,9.6V-640a1,1,0,0,1-1,1Zm-6-15.5v4a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-4a.5.5,0,0,0-.5-.5h-5A.5.5,0,0,0-3200-654.5Zm-12.782-.876a1,1,0,0,1,.157-1.406l4.625-3.7V-665.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2.619l7.375-5.9a1,1,0,0,1,1.249,0l15,12h0a1,1,0,0,1,.156,1.406,1,1,0,0,1-1.406.156L-3197-666.72l-14.375,11.5A1,1,0,0,1-3212-655,1,1,0,0,1-3212.781-655.375Z" transform="translate(3213 669)" fill="#212121"/>
                            </svg>
                            </i>
                            <div class="column flx jc-c">
                                <h4>Allocate village personnel</h4>
                                <span class="gray">Add sub admins to manage specific villages</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <div>
                <nav class="flx">
                    <ul class="flx br-32">
                        <li>
                            <router-link :to="{ name: 'SubAdminViewOne' }" class="flx gap-8 ai-c">
                                Sub admins
                                <span class="br-16">{{ getSubAdmins.length }}</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'SubAdminViewTwo' }" class="flx gap-8 ai-c">
                                Village personnels
                                <span class="br-16">{{ getVillagePersonnels.length }}</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <router-view></router-view>
        </div>
    </section>
    <access-denied v-else />
</template>
<script>
import usersLevelMixin from '@/mixins/usersLevelMixin';
import { getApi } from '@/api';
import { mapState, mapGetters } from 'vuex';
import AddAdminDropdown from '@/components/includes/dropdowns/AddAdminDropdown.vue'
import AccessDenied from '@/components/includes/app/AccessDenied.vue';
export default {
    components: { AddAdminDropdown, AccessDenied },
    name: 'SubAdmins',
    mixins: [usersLevelMixin],
    computed: {
        ...mapGetters(['getSubAdmins', 'getVillagePersonnels']),
        ...mapState({
            sub_admins: (state) => state.sub_admins,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
        async fetchSubAdmins() {
            try {
                const res = await getApi(this.hostname+'/api/sub-admin?token='+this.token)
                this.$store.commit('setSubAdmins', res.data)
                this.$store.commit('stopLoader')
            } catch (e) {
                if(e.response.status == 400) {
                    this.$store.commit('setExpSession')
                }
            }
        }
    },
    mounted() {
        this.$store.commit('startLoader')
        this.fetchSubAdmins()
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.empty-state{
    height: 60vh;
    a {
        padding: 16px 20px;
        background-color: #F4F4F4;
        transition: var(--input-btn-transition);
        &:hover {
            background-color: var(--input-hover);
        }
    }
    i {
        height: 55px;
        width: 55px;
    }
}
.add-container{
    width: 500px;
    container-type: inline-size
}
@container( inline-size <= 500px) {
    width: 100%
}
nav{
    ul {
        padding: 20px;
        background-color: #e2e7f2;
    }
    a {
        padding: 16px 20px;
        border-radius: 24px;
        span {
            background-color: #aaabb0;
            padding: 3px 8px;
            font-size: 0.8rem;
            color: var(--ft-white);
            height: 25px;
            min-width: 25px;
        }
    }
}
.router-link-exact-active{
    background-color: #000;
    color: var(--ft-white);
    font-weight: 600;
    span {
        color: var(--ft-dark);
        background-color: var(--bg-white);
    }
}

</style>