export default {
    state: {
        role: [
            {id: 1, name: 'father'},
            {id: 2, name: 'mother'},
            {id: 3, name: 'guardian'}
        ],
        gender: [
            {id: 1, name: 'male'},
            {id: 2, name: 'female'},
            {id: 3, name: 'prefer not to say'}
        ],
        defaultImage: require('@/assets/images/default-avatar.png'),
        banner1: require('@/assets/images/modamu_banner.png'),
        image: require('@/assets/images/welcome_banner.jpg'),
    },
    mutations: {
        setTempData(state, payload) {
            state.tempData.active = true
            state.tempData.data = payload.data
            state.tempData.array.push(payload.array)
        },
        clearTempData(state) {
            state.tempData = false
            state.tempData.data = ''
            state.tempData.array = []
        }
    },
    getters: {
        getRole: (state) => state.role,
        getGender: (state) => state.gender,
        getDefaultImage: (state) => state.defaultImage,
        getImage: (state) => state.image,
        getBanner1: (state) => state.banner1

    },
}