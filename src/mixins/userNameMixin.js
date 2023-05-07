export default {
    computed: {
        computedName() {
            if(this.user.name)
            return this.user.name.split(' ')[0] 
            else
            return null
        }
    }
}