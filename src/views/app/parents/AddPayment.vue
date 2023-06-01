<template>
    <section class="flx jc-c ai-c">
        <div class="main-content-card">
            <router-link :to="{ name: 'SelectPayment'}" class="flx gap-8 ai-c mb-24">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14">
                    <path d="M7,14a1,1,0,0,1-.707-.293l-6-6a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,7.707,1.707L2.414,7l5.293,5.293A1,1,0,0,1,7,14Z"/>
                </svg>
                Back
            </router-link>
            <h4>Add new payment</h4>
            <span class="gray">{{ $route.params.name }}</span>
            <form action="" class="flx column gap-16">
                <div class="form-row column">
                    <label for="card_name">Name on card</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" class="form-control" autocomplete="off" type="text" name="card_name" id="card_name" data-color="dark" placeholder="Eg. John Doe">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="card_number">Card number</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" autocomplete="off" class="form-control" type="text" id="card_number" name="card_number" data-color="dark" placeholder="1111-2222-3333-4444">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.number">
                        {{ validation.errors.number[0] }}
                    </span>
                </div>
                <div class="grid col-2 gap-16">
                    <div class="form-col">
                        <label for="cvv">CVV</label>
                        <div class="input-wrapper">
                            <input v-model="form.event_name" autocomplete="off" class="form-control" type="text" name="cvv" id="cvv" data-color="dark" placeholder="123">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.cvv">
                            {{ validation.errors.cvv[0] }}
                        </span>
                    </div>
                    <div class="form-col">
                        <label for="expiry_date">Expiry date</label>
                        <div class="input-wrapper">
                            <input autocomplete="off" v-model="form.address" class="form-control" type="text" name="expiry_date" id="expiry_date" data-color="dark" placeholder="01/23">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.expiry_date">
                            {{ validation.errors.expiry_date[0] }}
                        </span>
                    </div>
                </div>
                <div class="flx column">
                    <button class="button-primary btn-lg">Add card</button>
                </div>
            </form>
        </div>
    </section>
</template>
<script>
import inputValMixin from '../../../mixins/inputValMixin';
export default {
    name: 'AddPayment',
    mixins: [inputValMixin],
    data () {
        return {
            form: {
                card_name: '',
                card_number: '',
                cvv: '',
                expiry_date: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.main-content-card{
    width: 450px;
}
h4 {
    margin-bottom: 4px;
}
form {
    margin-top: 40px;
}
a {
    &:hover {
        color: var(--primary-color);
        path {
            fill: var(--primary-color);
        }
    }
}
</style>