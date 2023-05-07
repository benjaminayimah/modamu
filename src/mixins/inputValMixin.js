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
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
        },
    }
}