<template>
    <router-link :to="{ name: 'DetailedEvent',  params: {id: event.id, name: event.event_name }}" class="flx column br-32">
        <div class="bg-img relative br-24" :style="computedImage ? { backgroundImage: 'url('+hostname+'/storage/'+event.user_id+'/'+computedImage.image+')'} : ''">
            <div class="overlay absolute w-100 flx jc-sb ai-c gap-4">
                <span class="event-status br-24 fs-08 capitalize" :class="computeStatus">{{ computeStatus }}</span>
                <div class="flx ai-c gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flx-shrink-0" height="16" viewBox="0 0 20.101 19.821">
                        <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#fff"/>
                    </svg>
                    <span class="ft-white fs-08 wrap-text wrap-line-1">{{ event.address }}</span>
                </div>
            </div>
        </div>
        <div>
            <h4 class="wrap-text wrap-line-1">{{ event.event_name }}</h4>
            <span class="gray fs-09 wrap-text wrap-line-1">{{ event.name }}</span>
        </div>
    </router-link>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'DashEventList',
    props: ['event'],
    computed: {
        ...mapState({
            images: (state) => state.images,
            hostname: (state) => state.hostname
        }),
        computedImage() {
            return this.images.find(image => image.event_id == this.event.id) || null
        },
        computeStatus() {
            const currentDateTime = new Date()
            const startDate = new Date(this.event.date+'T'+this.event.start_time)
            if (currentDateTime < startDate)
            return 'upcoming'
            else
            return 'ongoing'
        }
    }
}
</script>

<style lang="scss" scoped>
a{
    padding: 12px;
    transition: 0.2s ease background-color;
    &:hover {
        background-color: #e5eaf7;
    }
}
.bg-img{
  flex-basis: 80%;
  background-color: var(--bg-white);
}
.overlay{
    padding: 12px;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgb(0, 0, 0));
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;

}
</style>