export default {
    methods: {
        sort_newest(array) {
            return array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
    }
}