import axios from 'axios'
import { createStore } from 'vuex'
import data from './modules/data'
import newUser from './modules/newUser'
import { deleteApi, getApi, postApi } from '@/api'
import router from '@/router'

export default createStore({
  state: {
    // hostname: 'http://localhost:8000',
    // appHostname: 'http://localhost:8080',
    hostname: 'https://modamu-api.rancroftdev.com',
    appHostname: 'https://staging.d3u9u5xg4yg53c.amplifyapp.com',
    token: localStorage.getItem('auth') || null,
    current_location: '',
    menu: false,
    device: null,
    loader: false,
    windowWidth: '',
    windowHeight: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    addModal: false,
    onboardModal: false,
    mainModal: false,
    forms: { kids: false, editProfile: false, changePass: false, addtoGallery: false, verifyCode: false, addVillage: false, id: '', user: {} },
    kids: [],
    events: [],
    images: [],
    messages: [],
    villages: [],
    wait_lists: [],
    notifications: [],
    payments: [],
    payment_methods: [
      {id: 1, name: 'Debit/Credit card'},
      {id: 2, name: 'Google pay'},
      {id: 3, name: 'Apple pay'},
    ],
    events_near: { events: [], images: []},
    registered_events: [],
    attendees: [],
    bookings: [],
    parents: []
  },
  mutations: {
    computeWindow(state) {
      let appWidth = 1344
      let winWidth = window.innerWidth
      state.windowHeight = window.innerHeight
      state.windowWidth = winWidth
      if(winWidth < 600){
        state.device = 'mobile'
      }else if(winWidth > appWidth){
        state.device = 'desktop'
      }else{
        state.device = 'tablet'
      }
    },
    async showOnboardingModal() {
      await this.commit('activateOnboardModal')
      const modal = document.querySelector('#onboarding_modal')
      modal.showModal()
    },
    activateOnboardModal(state) {
      state.onboardModal = true
    },
    closeOnboardingModal(state) {
      const modal = document.querySelector('#onboarding_modal')
      modal.close()
      localStorage.setItem('tempOnboarding', true)
      state.onboardModal = false
    },
    async openModal(state, payload) {
      await this.commit('activateModal')
      document.body.classList.add('fixed-body')
      if(payload == 'kids') {
        state.forms.kids = true
      }else if(payload == 'edit-profile') {
        state.forms.editProfile = true
      }else if(payload == 'change-pass') {
        state.forms.changePass = true
      }else if(payload == 'add-to-gallery') {
        state.forms.addtoGallery = true
      }else if(payload == 'verify-code') {
        state.forms.verifyCode = true
      }else if(payload == 'add-village') {
        state.forms.addVillage = true
      }
    },
    setTempID(state, payload) {
      state.forms.id = payload
    },
    setTempUser(state, payload) {
      state.forms.user = payload
    },
    activateModal() {
      const modal = document.querySelector('#main_modal')
      modal.showModal()
    },
    closeModal(state) {
      const modal = document.querySelector('#main_modal')
      modal.close()
      document.body.classList.remove('fixed-body')
      for (let i in state.forms)
      state.forms[i] = false
    },
    //signin
    async signInSuccess(state, payload) {
      await this.commit('setAuthToken', payload)
      localStorage.setItem('auth', payload)
      this.dispatch('getAuthUser')
    },
    //set auth
    setAuthToken(state, payload){
      state.token = payload;
    },
    setUser(state, payload) {
      state.user = payload.user
      state.events = payload.events
      state.images = payload.images
      state.attendees = payload.attendees
      state.kids = payload.kids,
      state.villages = payload.villages,
      state.bookings = payload.bookings,
      state.parents = payload.parents

      this.commit('updateLocalStorage', payload.user)
    },
    setRegisteredEvents(state, payload) {
      state.registered_events = payload
    },
    updateUser(state, payload) {
      state.user = payload
      this.commit('updateLocalStorage', payload)
    },
    updateLocalStorage(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload));
    },
    updateWaitlist(state, payload) {
      state.wait_lists = state.wait_lists.filter(data => data.id != payload.id )
    },
    setMessages(state, payload) {
      state.messages = payload
    },
    updateMessages(state, payload) {
      if (state.messages.length) {
        const i = state.messages.findIndex(x => x.message.id == payload.id)
        state.messages[i].message = payload
      }
    },
    setKids(state, payload) {
      state.kids = payload
    },
    upadateEvents(state, payload) {
      state.events.push(payload.event)
      state.images.push(payload.image)
    },
    updateVillage(state, payload) {
      state.villages.push(payload)
    },
    addToKids(state, payload) {
      state.kids.push(payload)
    },
    destroyToken(){
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      location.reload()
    },
    setCurrentLocation(state, payload) {
      state.current_location = payload
    },
    addNearByEvent(state, payload) {
      state.events_near = payload
    },
    setWaitlist(state, payload) {
      state.wait_lists = payload
    },
    setAttendees(state, payload) {
      state.attendees = payload
    },
    updateAttendees(state, payload) {
      const i = state.attendees.findIndex(x => x.id == payload.id)
      state.attendees.splice(i, 1, payload)
    },
    deleteAttendees(state, payload) {
      state.attendees =  state.attendees.filter(item => item.id != payload)
    },
    deleteRegistered(state, payload) {
      state.registered_events =  state.registered_events.filter(item => item.id != payload)
      router.go(-1)
    },
    startLoader(state) {
      state.loader = true
    },
    stopLoader(state) {
      state.loader = false
    },
    toggleMenu(state) {
      state.menu = !state.menu
    },

    //village set all events
    setEvents(state, payload) {
      state.events = payload.events
      state.images = payload.images
      state.attendees = payload.attendees
    },
    setImages(state, payload) {
      state.images = payload
    }
    // toggleMenu() {
    //   const menu = document.querySelector('#menus')
    //   const backdrop = document.querySelector('.backdrop')
    //   const button = document.querySelector('#mobile_menu_toggle')
    //   menu.classList.toggle('expanded')
    //   backdrop.classList.toggle('expanded')
    //   const expanded = menu.getAttribute('aria-expanded') === 'true' || false;
    //   menu.setAttribute('aria-expanded', !expanded)
    //   button.setAttribute('aria-expanded', !expanded)
    // }

  },
  actions: {
    async getAuthUser(state) {  
        try {
          const res = await axios.get(this.getters.getHostname+'/api/auth-user?token='+this.getters.getToken)
          state.commit('setUser', res.data)
          state.commit('stopLoader')

        } catch (e) {
          // state.commit('unSetLoader')
          // const newPayload = {
          //   id: 'danger',
          //   body: 'Error loading store! Please check your internet connection'
          // }
          // state.commit('showAlert', newPayload)
          state.commit('destroyToken') 
        }      
    },
    
    logoutAuth(state){
        state.commit('startLoader') 
        axios.delete(this.getters.getHostname+'/api/logout?token='+this.getters.getToken)
        .then(()=> {
          state.commit('destroyToken')
        })
    },
    getCucrrentLocation(state, payload) {
      const apiKey = 'AIzaSyBhfD_dScS-ENmuXtQAxTCxtOYadquTric' // Your Google Cloud Platform API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lng}&key=${apiKey}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const address = data.results[0].formatted_address
          state.commit('setCurrentLocation', address)
        })
        .catch(error => {
          console.log(error); // Handle any errors that occurred
        });
    },
    async checkInAttendee(state, payload) {
      try {
          const res = await postApi(this.getters.getHostname+'/api/check-in-kid?token='+this.getters.getToken, { id: payload });
          state.commit('updateAttendees', res.data)
      } catch (error) {
          console.error(error);
      }
    },
    async fetchMessages(state) {
        state.commit('startLoader')
        try {
            const res = await getApi(this.getters.getHostname+'/api/fetch-messages?token='+this.getters.getToken);
            state.commit('setMessages', res.data)
            state.commit('stopLoader')
        } catch (error) {
            console.error(error)
        }
      },
      async deleteAttendee(state, payload) {
        state.commit('startLoader')
        try {
            const res = await deleteApi(this.getters.getHostname+'/api/bookings/'+payload+'?token='+this.getters.getToken);
            state.commit('deleteAttendees', res.data)
            state.commit('stopLoader')
        } catch (error) {
            console.error(error);
        }
      },
      async deleteRegistered(state, payload) {
        state.commit('startLoader')
        try {
            const res = await deleteApi(this.getters.getHostname+'/api/delete-registered-finish-event/'+payload+'?token='+this.getters.getToken);
            state.commit('deleteRegistered', res.data)
            state.commit('stopLoader')
        } catch (error) {
            console.error(error);
        }
      },

      
    // async fetchWaitList() {
    //   return await axios.get(this.getters.getHostname+'/api/bookings?token='+ this.getters.getToken)    
    // },
    // async doFetchKids(url) {
    //   try {
    //     const data =  await axios.post(url+'?token='+this.getters.getToken)
    //     return data
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // },
    
    
    
  },
  getters: {
    getHostname: (state) => state.hostname,
    getToken: (state) => state.token,
    auth(state){
      return state.token !== null
    },
    getUser(state) {
      return state.user
    },
    is_admin(state) {
      return state.user.access_level == 0 ? true : false
    },
    is_super(state) {
      return state.user.access_level == 0 && !state.user.sub_level ? true : false
    },
    is_subadmin(state) {
      return state.user.access_level == 0 && state.user.sub_level ? true : false
    },
    is_village(state) {
      return state.user.access_level == 1 ? true : false
    },
    is_parent(state) {
      return state.user.access_level == 2 ? true : false
    },
    getOngoingEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date()
      events.forEach(element => {
        const startDate = new Date(element.date+'T'+element.start_time)
        const endDate = new Date(element.date+'T'+element.end_time)
        if (currentDateTime > startDate && currentDateTime < endDate) {
          newEvent.push(element)
        }
        
      })
      return newEvent
    },
    getUpcomingEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date()
      events.forEach(element => {
        const startDate = new Date(element.date+'T'+element.start_time)
        if (currentDateTime < startDate) {
          newEvent.push(element)
        }
      })
      return newEvent
    },
    getPastEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date()
      events.forEach(element => {
        const endDate = new Date(element.date+'T'+element.end_time)
        if (currentDateTime > endDate) {
          newEvent.push(element)
        }
      })
      return newEvent
    },
    getTodaysEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date().toLocaleDateString()
      events.forEach(element => {
        const startDate = new Date(element.date).toLocaleDateString()
        if (currentDateTime == startDate) {
          newEvent.push(element)
        }
      })
      return newEvent
    },
    getDevice: (state) => state.device,
    getWindowWidth: (state) => state.windowWidth,
    getWindowHeight: (state) => state.windowHeight,
    getKids: (state) => state.kids,
    getMenu: (state) => state.menu,
    newUser(){
      return localStorage.getItem('newUser') !== null
    },
  },
  modules: {
    data,
    newUser
  }
})
