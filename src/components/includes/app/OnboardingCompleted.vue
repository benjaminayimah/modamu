<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>Done!</h2>
            </div>
            <div class="flx-1">
                <lottie-onboard-completed />
            </div>
    </teleport>
</template>
    
<script>
import LottieOnboardCompleted from '../LottieOnboardCompleted.vue'
export default {
  components: { LottieOnboardCompleted },
    name: 'OnboardingCompleted'
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