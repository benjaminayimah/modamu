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
        }
    }
}