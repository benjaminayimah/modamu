import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['is_super', 'is_subadmin', 'is_village', 'is_parent']),
        computedAcc() {
            let type = ''
            if(this.is_super)
            type = 'Admin'
            else if(this.is_subadmin)
            type = 'Sub admin'
            else if(this.is_parent)
            type = this.getUser.relationship
            else if(this.is_village)
            type = 'Village'
            return type
        }
    },

}