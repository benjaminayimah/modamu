<template>
    <section id="villages">
        <div class="title-row flx gap-50 ai-c">
            <div class="flx gap-16 ai-c">
                <h1 class="title">Villages</h1>
                <span class="count-info count-secondary">230</span>
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
        <div class="grid village-grid gap-16 grid-col-4">
            <a v-for="village in villages" :key="village.id" href="" class="bg-white br-16 flx">
                <div class="flx column gap-8 flx-grow-1">
                    <div>
                        <label class="gray mb-4">Village name</label>
                        <div><strong>Name of Village</strong></div>
                    </div>
                    <div>
                        <label class="gray mb-4">Address</label>
                        <div><strong>34 Polo avenue</strong></div>
                    </div>
                </div>
                <span class="flx ai-c">
                    <span class="flx gap-4 ai-c ft-primary">
                        View event
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14">
                            <path d="M-3431.993-710.293a1,1,0,0,1,0-1.415L-3426.7-717l-5.293-5.293a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-.708.292A1,1,0,0,1-3431.993-710.293Zm-6.084-1.916a.714.714,0,0,1,0-1.01L-3434.3-717l-3.781-3.781a.714.714,0,0,1,0-1.01.715.715,0,0,1,1.011,0l4.286,4.286a.715.715,0,0,1,0,1.01l-4.286,4.286a.714.714,0,0,1-.506.21A.713.713,0,0,1-3438.077-712.209Z" transform="translate(3438.286 724)" fill="#87a5ff"/>
                        </svg>
                    </span>
                </span>
            </a>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'VillagesPage',
    computed: {
        ...mapState({
            villages: (state) => state.villages
        })
    }
}
</script>
<style lang="scss" scoped>
section {
    padding: $profileSecPadding 0;
}
.village-grid{
    a{
        padding: 24px;
    }
}
</style>