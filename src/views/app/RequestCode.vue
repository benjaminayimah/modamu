<!-- <template>
    <section class="section-main">
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Waiting list</h1>
                <span class="count-info count-primary">230</span>
            </div>
            <div class="input-wrapper">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                        <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"/>
                    </svg>
                </i>
                <input class="form-control" type="text" data-type="icon" data-color="light" placeholder="Search villages...">
            </div>
        </div>
        <div class="table">
            <div class="grid gap-8 table-body">
                <div class="grid-item table-head">
                    <h4 class="table-cell">Child name </h4>
                    <h4 class="table-cell">Age</h4>
                    <h4 class="table-cell">Gender</h4>
                    <div></div>
                </div>
                <request-list-row v-for="waitlist in wait_lists" :key="waitlist.id" :kid="waitlist" :event="'event'"/>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import RequestListRow from '../../components/includes/app/RequestListRow.vue'
export default {
    components: { RequestListRow },
    name: 'RequestCode',
    computed: {
        ...mapState({
            wait_lists: (state) => state.wait_lists
        })
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.table{
    width: 90%;
}
.grid-item{
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr .9fr;
    place-content: center;
    height: 55px;
    &:first-child{
        background-color: transparent;
    }
}


.bg-img {
    height: 40px;
    width: 40px;
}

</style> -->