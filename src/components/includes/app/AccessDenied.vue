<template>
    <section class="flx centered">
        <div class="text-center centered gap-16">
            <div>
                <h2 class="danger">Access denied!</h2>
                <div>It looks like you cannot access this page</div>
                <div>Contact your administrator.</div>
            </div>
            <a class="flx gap-8 ai-c a-button button-primary btn-sm" href="#" @click.prevent="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 8.414 14.828">
                    <path d="M7,1,1,7l6,6" transform="translate(0 0.414)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                Go back
            </a>
        </div>
    </section>
</template>
<script>
export default {
    name: 'AccessDenied'
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 148px);
}
.btn-sm {
    padding: 8px 32px;
}
</style>