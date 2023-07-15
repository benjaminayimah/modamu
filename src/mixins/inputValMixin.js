export default {
    data() {
        return {
            validation: {
                error: false,
                errors: '',
            },
            userError: {
                error: false,
                message: ''
            },
        }
    },
    methods: {
        clearErrs() {
            if (this.validation.error === true || this.userError.error)
            this.validation.error = false
            this.validation.errors = ''
            this.userError.error = false
        },
        errorResponse(e) {
            if (e.response.status == 401) {
                this.userError.error = true
                this.userError.message = 'Invalid email or password. Please try again or try resetting your password.'
                this.form.password = ''
            }
            if(e.response.status == 422){
                this.validation.error = true
                this.validation.errors = e.response.data.errors
            }
            if (e.response.status == 503) {
                this.userError.error = true
                this.userError.message = 'Our system is currently down for upgrade. Please try again later. Sorry for the inconvenience.'
            }
        },
        $_(x) {
            return document.getElementById(x)
        },
        isFocusedIn(id) {
            this.$_(id).classList.remove('is-filled')
            this.$_(id).classList.remove('is-iddle')
            this.$_(id).classList.add('input-is-focused')
        },
        isFocusedOut(id, input) {
            if(this.checkInputHasValue(input)) {
                this.$_(id).classList.add('is-iddle')
            }
            this.$_(id).classList.remove('input-is-focused')
        },
        checkInputHasValue(input){
            if(this.$_(input).value !== '')
            return true
            else
            return false
        },
        checkThisInputOnload(id,input) {
          if(this.checkInputHasValue(input)) {
                this.isFocusedIn(id)
            }
        }
    },
    mounted () {
        if(this.form && this.form.radius && this.form.radius != '') {
            this.isFocusedOut('search_radius_wrapper', 'searchRadiusInput')
        }
    }
}