<template>
    <router-link :to="{ name: 'DetailedEvent',  params: {id: event.event.id, name: event.event.name }}" class="flx column gap-8">
        <div class="bg-img relative br-24" :style="computedImage ? { backgroundImage: 'url('+hostname+'/storage/'+event.event.user_id+'/'+computedImage.image+')'} : ''">
            <div class="overlay absolute w-100 flx jc-sb">
                <span class="price br-24 fs-08">Ongoing</span>
                <h4 class="ft-white">${{ event.event.amount }}</h4>
            </div>
        </div>
        <div>
            <h4 class="mb-4">{{ event.event.name }}</h4>
            <span class="gray fs-09">{{ event.village }}</span>
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
            return this.images.find(image => image.event_id == this.event.event.id) || null
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-img{
  flex-basis: 80%;
  background-color: var(--bg-white);
}
.price{
    color: unset;
    padding: 7px 12px;
}
.overlay{
    padding: 12px;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgb(0, 0, 0));
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;

}
</style>