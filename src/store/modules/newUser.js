export default {
    state: {
        newUser: { active: false, completed: false, state: null, id: '', kids: [], data: { heading: '', subHeading: '', footer: '', progress: 0 }, token: null },
    },
    mutations: {
        setNewUser(state, payload) {
            const data = { status: payload, kids: []}
            localStorage.setItem('newUser', JSON.stringify(data))
            this.commit('resetNewUser')
        },
        resetNewUser(state) {
            let user = JSON.parse(localStorage.getItem('newUser'))
            state.newUser.state = user.status.state
            state.newUser.data.heading = user.status.heading
            state.newUser.data.subHeading = user.status.sub_heading
            state.newUser.data.footer = user.status.footer
            state.newUser.data.progress = user.status.progress
            state.newUser.token = user.status.remember_token
            state.newUser.id = user.status.id
            state.newUser.kids = user.kids
            state.newUser.active = true
        },
        updateNewUser(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newUser'));
            stored.status.state = payload.state;
            stored.status.heading = payload.heading;
            stored.status.sub_heading = payload.sub_heading;
            stored.status.footer = payload.footer;
            stored.status.progress = payload.progress;
            localStorage.setItem('newUser', JSON.stringify(stored));
            state.newUser.state = payload.state
            state.newUser.data.heading = payload.heading
            state.newUser.data.subHeading = payload.sub_heading
            state.newUser.data.footer = payload.footer
            state.newUser.data.progress = payload.progress
        },
        setNewKid(state, payload) {
            state.newUser.kids.push(payload)
        },
        newUserCompleted(state, payload) {
            state.newUser.completed = true
            state.newUser.data.progress = 100
            state.newUser.data.heading = 'All complete'
            state.newUser.data.subHeading = 'Let\' now take you to your dashboard'
            state.newUser.data.footer = 'Proceed to dashboard'
            localStorage.setItem('auth', payload)
            localStorage.removeItem('newUser')
        }
    },
    getters: {
        getNewUser: (state) => state.newUser,
    },
}