<template>
    <teleport to="#onboarding_top_row">
        <div class="flx-1 flx column gap-8">
                <h2>We’re happy to have you on board,</h2>
                <h1 class="capitalize">{{ computedFirstName(user.name) }}</h1>
            </div>
            <div class="flx-1">
                <lottie-welcome />
            </div>
    </teleport>
    <teleport to="#onboarding_body_content">
        <p class="mb-16"><span class="ft-dark">Our purpose is clear:</span> to offer affordable and top-notch childcare precisely when you need it. Picture this: every Saturday evening for 4 hours, we watch your kids while you <span class="ft-dark">Unwind,</span> <span class="ft-dark">Relax,</span> and <span class="ft-dark">Recharge.</span></p>
        <p>Modamu is easy to use, let’s walk you through it.</p>
    </teleport>
</template>

<script>
import { mapState } from 'vuex';
import userNameMixin from '@/mixins/userNameMixin';
import LottieWelcome from '../LottieWelcome.vue';
export default {
    components: { LottieWelcome },
    computed: {
        ...mapState({
            user: (state) => state.user
        })
    },
    name: 'OnboardingWelcome',
    mixins: [userNameMixin],
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