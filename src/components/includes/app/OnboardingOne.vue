<template>
<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>Search for nearby events</h2>
            </div>
            <div class="flx-1">
                <lottie-event-search />
            </div>
    </teleport>
    <teleport to="#onboarding_body_content">
        <p class="mb-16">Find a Modamu village by simply scanning for events near you.</p>
        <p><span class="ft-dark">Note</span>  that you would need to allow the app to access your location in order to have optimum experience. Your location data will not be used for anything else apart from finding events near you.</p>
    </teleport>
</template>
</template>

<script>
import LottieEventSearch from '../LottieEventSearch.vue'
export default {
  components: { LottieEventSearch },
    name: 'OnboardingOne'
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