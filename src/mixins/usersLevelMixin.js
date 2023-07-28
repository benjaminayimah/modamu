import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['is_super', 'is_subadmin', 'is_village', 'is_parent', 'is_admin', 'is_sublevel2', 'is_sublevel_villages', 'is_sublevel_events', 'is_sublevel_parents', 'is_sublevel_kids', 'is_sublevel_messages', 'is_sublevel_notifications', 'is_sublevel_bookings']),
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