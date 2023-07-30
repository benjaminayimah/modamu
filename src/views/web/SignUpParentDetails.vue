<template>
    <form @submit.prevent="" class="flx column gap-28 flx-grow-1">
      <div class="form-row column">
        <label for="phone">Phone number*</label>
        <div class="input-wrapper">
          <input v-model="form.phone_number" @input="formatPhoneNumber" class="form-control" type="tel" name="phone" id="phone" data-color="light" placeholder="Eg. 222-333-4444">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.phone_number">
            {{ validation.errors.phone_number[0] }}
        </span>
      </div>
      <div class="form-row column">
        <label for="emergencyPhone">Emergency number</label>
        <div class="input-wrapper">
          <input v-model="form.emergency_number" @input="formatEmergencyNumber" class="form-control" type="tel" name="emergencyPhone" id="emergencyPhone" data-color="light" placeholder="222-333-5555">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.emergency_number">
            {{ validation.errors.emergency_number[0] }}
        </span>
      </div>
      <div class="form-row column">
        <label for="relationship">Relationship*</label>
        <div class="input-wrapper">
            <select v-model="form.relationship" name="relationship" id="relationship" class="form-control" data-color="light">
                <option value="" selected>Select relationship</option>
                <option v-for="role in getRole" :key="role.id" :value="role.name">{{ role.name }}</option>
            </select>
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.relationship">
            {{ validation.errors.relationship[0] }}
        </span>
      </div>
      <div class="form-row column">
        <label for="ocupation">Occupation</label>
        <div class="input-wrapper">
          <input v-model="form.ocupation" class="form-control" type="text" name="ocupation" id="ocupation" data-color="light" placeholder="What's your occupation">
        </div>
      </div>
    <button class="button-primary w-100 btn-lg gap-8" @click="submitSignUp" :class="{ 'button-disabled' : creating }" :disabled="creating ? true : false">
      <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
        <span>{{ creating ? 'Please wait...' : 'Next'}}</span>
    </button>      
    </form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import phoneNumberMixin from '@/mixins/phoneNumberMixin';
import inputValMixin from '@/mixins/inputValMixin';
import Spinner from '@/components/includes/Spinner.vue';
export default {
  components: { Spinner },
    name: 'ParentDetails',
    mixins: [inputValMixin, phoneNumberMixin],
    computed: mapGetters(['getRole', 'getHostname']),
  data () {
    return {
      form: {
        phone_number: '',
        emergency_number: '',
        relationship: '',
        ocupation: '',
      },
      creating: false,
      token: JSON.parse(localStorage.getItem('newUser')).status.remember_token || null,
    }
  },
  methods: {
    submitSignUp() {
        this.creating = true
        axios.post(this.getHostname+'/api/parent-details?token=' + this.token, this.form)
        .then((res) => {
          this.signupSuccess(res)
        }).catch((e) => {
          this.creating = false
          if(e.response.status == 422){
            this.validation.error = true
            this.validation.errors = e.response.data.errors
          }
        })
      },
      async signupSuccess(res) {
        this.creating = false
        this.clearErrs()
        await this.$store.commit('updateNewUser', res.data)
        this.$router.push({ name: 'SignUpKids' })

      }
  }
}
</script>

<style>

</style>