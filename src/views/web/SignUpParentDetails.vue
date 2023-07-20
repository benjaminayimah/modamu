<template>
    <form @submit.prevent="" class="flx column gap-28 flx-grow-1">
      <div class="form-row column">
        <label for="phone">Phone number*</label>
        <div class="input-wrapper">
          <input v-model="form.phone" @input="formatPhoneNumber" class="form-control" type="tel" name="phone" id="phone" data-color="light" placeholder="Eg. 222-333-4444">
        </div>
        <span class="input-error" v-if="validation.error && validation.errors.phone">
            {{ validation.errors.phone[0] }}
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
    <button class="button-primary w-100 btn-lg" @click="submitSignUp">Next</button>      
    </form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import inputValMixin from '@/mixins/inputValMixin';
export default {
    name: 'ParentDetails',
    mixins: [inputValMixin],
    computed: mapGetters(['getRole', 'getHostname']),
  data () {
    return {
      form: {
        phone: '',
        emergency_number: '',
        relationship: '',
        ocupation: '',
      },
      token: JSON.parse(localStorage.getItem('newUser')).status.remember_token || null
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

      },
      formatPhoneNumber() {
      // Remove all non-numeric characters from the input
      const numericPhoneNumber = this.form.phone.replace(/\D/g, "");
      if (numericPhoneNumber.length > 3) {
        // Introduce the first dash after the first three digits
        const firstPart = numericPhoneNumber.slice(0, 3);
        const restPart = numericPhoneNumber.slice(3);

        // Check if the restPart has a length greater than 3 to introduce the second dash
        if (restPart.length > 3) {
          const secondPart = restPart.slice(0, 3);
          const thirdPart = restPart.slice(3);

          this.form.phone = `${firstPart}-${secondPart}-${thirdPart}`;
        } else {
          this.form.phone = `${firstPart}-${restPart}`;
        }
      } else {
        // If the length is less than or equal to 3, don't introduce dashes
        this.form.phone = numericPhoneNumber;
      }
    },
    formatEmergencyNumber() {
      // Remove all non-numeric characters from the input
      const numericPhoneNumber = this.form.emergency_number.replace(/\D/g, "");
      if (numericPhoneNumber.length > 3) {
        // Introduce the first dash after the first three digits
        const firstPart = numericPhoneNumber.slice(0, 3);
        const restPart = numericPhoneNumber.slice(3);

        // Check if the restPart has a length greater than 3 to introduce the second dash
        if (restPart.length > 3) {
          const secondPart = restPart.slice(0, 3);
          const thirdPart = restPart.slice(3);

          this.form.emergency_number = `${firstPart}-${secondPart}-${thirdPart}`;
        } else {
          this.form.emergency_number = `${firstPart}-${restPart}`;
        }
      } else {
        // If the length is less than or equal to 3, don't introduce dashes
        this.form.emergency_number = numericPhoneNumber;
      }
    },
  }
}
</script>

<style>

</style>