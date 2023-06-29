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
        filterList: [
            { id: 1, name: 'All', filter: 'all', active: true },
            { id: 2, name: 'Fathers', filter: 'father', active: false },
            { id: 3, name: 'Mothers', filter: 'mother', active: false },
            { id: 4, name: 'Guardians', filter: 'guardian', active: false }
        ],
        sortList: [
            { id: 1, name: 'Newest first', sort: 'newest', active: true },
            { id: 2, name: 'Oldest first', sort: 'oldest', active: false },
            { id: 3, name: 'Sort A-Z', sort: 'a-z', active: false },
            { id: 4, name: 'Sort Z-A', sort: 'z-a', active: false }
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
        },
        parentFilter(state, payload) {
            state.filterList.forEach(element => {
                element.active = false
            });
            let i = state.filterList.findIndex(x => x.filter === payload)
            state.filterList[i].active = true
        },
        parentSort(state, payload) {
            state.sortList.forEach(element => {
                element.active = false
            });
            let i = state.sortList.findIndex(x => x.sort === payload)
            state.sortList[i].active = true
        },
        resetParentFilter(state) {
            state.filterList.forEach(element => {
                element.active = false
            });
            state.sortList.forEach(element => {
                element.active = false
            });
            state.filterList[0].active = true
            state.sortList[0].active = true

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