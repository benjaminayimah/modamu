import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['is_super', 'is_subadmin', 'is_village', 'is_parent', 'is_admin']),
        computedAcc() {
            let type = ''
            if(this.is_super)
            type = 'Admin'
            else if(this.is_subadmin)
            type = 'Sub admin'
            else if(this.is_parent)
            type = this.user.relationship
            else if(this.is_village)
            type = 'Village'
            return type
        }
    },

}