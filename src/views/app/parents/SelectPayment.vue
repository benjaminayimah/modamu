<template>
    <section class="flx jc-c ai-c">
        <div class="main-content-card">
            <h4 class="mb-32">Select payment method</h4>
            <div class="flx column gap-16">
                <span v-if="error" class="input-error">Make a selection first</span>
                <payment-choice v-for="payment in payment_methods"  :key="payment.id" :payment="payment" :selected="selected" @emmitSelect="doSelection" />
                <button class="button-primary btn-lg" @click="submitSelected">Select</button>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import PaymentChoice from '../../../components/includes/app/PaymentChoice.vue';
export default {
  components: { PaymentChoice },
    name: 'SelectPayment',
    computed: {
        ...mapState({
            payment_methods: (state) => state.payment_methods
        })
    },
    data () {
        return {
            selected: '',
            error: false
        }
    },
    methods: {
        doSelection(payload) {
            this.clrError ? this.clrError() : ''
            this.selected = payload
        },
        submitSelected() {
            this.selected ? this.$router.push({ name: 'AddPayment', params: { name: this.selected.name }}) : this.errorMsg()
        },
        errorMsg() {
            this.error = true
        },
        clrError() {
            this.error = false
        }
    }

}
</script>
<style lang="scss" scoped>
.main-content-card{
    width: 450px;
}
.input-error{
    font-size: 1rem;
}

</style>