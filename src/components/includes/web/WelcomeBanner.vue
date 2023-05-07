<template>
    <section v-if="window >= 990" class="intro-banner">
        <div class="bg-img" :style="{ backgroundImage: 'url('+img+')'}"></div>
        <div class="overlay"></div>
        <div id="logo" class="flx jc-c ai-c br-50">
            <span></span>
        </div>
        <div id="captions" class="flx column jc-c gap-32">
            <h1>Let us take care of your kids while you sit back at home and relax</h1>
            <div>Here at modamu we commit to providing you with an escape  to take care of you while we take care of your kids by keeping them engaged with events</div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'WelcomeBanner',
    props: ['img', 'window']
}
</script>
<style lang="scss" scoped>
section{
    position: relative;
    border-radius: var(--radius-24);
}
.overlay, .bg-img, #captions {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    height: 100%;
    width: 100%;
    }
    .overlay{
        z-index: 2;
        background-color: rgba($color: #000000, $alpha: 0.5);
    }
    #captions{
        color: var(--ft-white);
        z-index: 10;
        padding: 10%;
        h1{
            font-size: 2rem;
        }
    }
    #logo{
    
        height: 32px;
        width: 32px;
        position: absolute;
        background-color: rgba($color: #ffffff, $alpha: .2);
        left: 10%;
        top: 40px;
        z-index: 10;
        span{
        height: 14px;
        width: 14px;
        background-color: var(--primary-color);
        border-radius: inherit;
    }
}
</style>
