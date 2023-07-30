<template>
  <section class="centered">
    <div class="text-center">
      <not-found-lottie />
      <h1 class="mb-8">Page not found</h1>
      <div class="mb-24">The page you're looking for does not exist</div>
      <div class="flx gap-8 ai-c">
        <router-link to="/" class="a-button a-btn btn-sm button-secondary">Back home</router-link>
        <a href="https://modamuvillage.com" class="a-button a-btn btn-sm button-outline">About Modamu</a>
      </div>
    </div>
  </section>
</template>
<script>
import NotFoundLottie from '@/components/includes/NotFoundLottie.vue'
export default {
  components: { NotFoundLottie },
  name: 'Web404View'
}
</script>
<style lang="scss" scoped>
section {
  height: 100dvh;
}
.button-outline{

}
</style>
  