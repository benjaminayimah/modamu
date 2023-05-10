export default {
    data() {
        return {
            validation: {
                error: false,
                errors: '',
            }
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