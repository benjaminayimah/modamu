<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>Book event</h2>
            </div>
            <div class="flx-1">
                <lottie-book-event />
            </div>
    </teleport>
    <teleport to="#onboarding_body_content">
        <p>Book your preferred event by choosing the event, choose the specific child to attend, make payment and done.</p>
    </teleport>
</template>
    
<script>
import LottieBookEvent from '../LottieBookEvent.vue'
export default {
    components: { LottieBookEvent },
    name: 'OnboardingTwo'
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