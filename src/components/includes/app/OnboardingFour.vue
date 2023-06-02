<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>Receive unique pickup code.</h2>
            </div>
            <div class="flx-1">
                <lottie-onboard-number />
            </div>
    </teleport>
    <teleport to="#onboarding_body_content">
        <p>Unique pickup code is issued against each child upon drop-off. The code is use for verification during pickup of your child. You can find this code at the ‘Verify code’ menu.</p>
    </teleport>
</template>
    
<script>
import LottieOnboardNumber from '../LottieOnboardNumber.vue'
export default {
    components: { LottieOnboardNumber },
    name: 'OnboardingFour'
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