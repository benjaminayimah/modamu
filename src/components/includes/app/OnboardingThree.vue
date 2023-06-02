<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>Drop off your kid(s) at the village</h2>
            </div>
            <div class="flx-1">
                <lottie-drop-off-kids />
            </div>
    </teleport>
    <teleport to="#onboarding_body_content">
        <p>Drop off your kid(s) at the village while you get to do whatever you want. Take the day off or catch up with forgotten projects.</p>
    </teleport>
</template>
    
<script>
import LottieDropOffKids from '../LottieDropOffKids.vue'
export default {
  components: { LottieDropOffKids },
    name: 'OnboardingThree'
}
</script>

<style lang="scss" scoped>
p{
    color: #3E3A3A;
    margin: 0;
    span {
        font-weight: 600;
    }
}
</style>