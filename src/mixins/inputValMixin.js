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
    }
}