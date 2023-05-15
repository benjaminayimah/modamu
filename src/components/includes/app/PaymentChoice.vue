<template>
    <a @click.prevent="select" href="#" class="flx ai-c jc-sb br-32" :class="this.selected.id == payment.id ? 'selected' : ''">
        {{ payment.name }}
        <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 15.141 11.595">
            <path d="M25.5,13.563l-1.237-1.273a.266.266,0,0,0-.2-.084h0a.255.255,0,0,0-.2.084l-8.578,8.641L12.164,17.81a.272.272,0,0,0-.394,0l-1.252,1.252a.28.28,0,0,0,0,.4L14.456,23.4a1.245,1.245,0,0,0,.823.4,1.3,1.3,0,0,0,.816-.387H16.1l9.4-9.45A.3.3,0,0,0,25.5,13.563Z" transform="translate(-10.434 -12.206)"/>
        </svg>
    </a>
</template>
<script>
export default {
    name: 'PaymentChoice',
    props: ['payment', 'selected'],
    methods: {
        select() {
            this.$emit('emmitSelect', this.payment)
        }
    }
}
</script>
<style lang="scss" scoped>
a {
    background-color: #eeeff2;
    padding: 20px;
    border: 1px solid transparent;
    transition: var(--input-btn-transition);
    svg{
        visibility: hidden;
    }
    path {
        fill: #929295;
    }
   
    &:hover {
        // border: 1px solid var(--primary-color);
        background-color: rgb(1 115 255 / 10%);
        svg{
            visibility: visible;
        }
    }
}
.selected{
    background-color: rgb(1 115 255 / 10%);
    border: 1px solid var(--primary-color);
    path{
        fill: var(--primary-color);
    }
    svg {
        visibility: visible;
    }

}
</style>