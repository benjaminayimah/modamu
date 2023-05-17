import axios from 'axios'
import { createStore } from 'vuex'
// import router from '@/router'
import data from './modules/data'
import newUser from './modules/newUser'
// import window from './modules/window'

export default createStore({
  state: {
    // hostname: 'http://localhost:8000',
    hostname: 'https://modamu-api.rancroftdev.com',
    token: localStorage.getItem('auth') || null,
    current_location: '',
    menu: false,
    device: null,
    loader: false,
    windowWidth: '',
    windowHeight: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    addModal: false,
    forms: { kids: false, editProfile: false, changePass: false, addtoGallery: false, verifyCode: false, id: '', user: {} },
    kids: [],
    events: [],
    images: [],
    messages: [
      {id: 1, name: 'Lorem ipsum'},
      {id: 2, name: 'Ipsum lorem'},
      {id: 3, name: 'Lorem ipsum'},
      {id: 4, name: 'Ipsum lorem'},
      {id: 5, name: 'Lorem ipsum'},
      {id: 6, name: 'Lorem ipsum'},
      {id: 7, name: 'Lorem ipsum'},
      {id: 8, name: 'Lorem ipsum'},
      {id: 9, name: 'Lorem ipsum'},
      {id: 10, name: 'Lorem ipsum'},
      {id: 11, name: 'Lorem ipsum'},
      {id: 12, name: 'Lorem ipsum'},


    ],
    villages: [],
    wait_lists: [],
    notifications: [
      {id: 1, name: 'Lorem ipsum'},
      {id: 2, name: 'Ipsum lorem'},
      {id: 3, name: 'Lorem ipsum'},
      {id: 4, name: 'Lorem ipsum'},
      {id: 5, name: 'Ipsum lorem'},
      {id: 6, name: 'Lorem ipsum'},
    ],
    payments: [],
    payment_methods: [
      {id: 1, name: 'Debit/Credit card'},
      {id: 2, name: 'Google pay'},
      {id: 3, name: 'Apple pay'},
    ],
    events_near: { events: [], images: []},
    registered_events: [],
    attendees: []
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
      }
    },
    setTempID(state, payload) {
      state.forms.id = payload
    },
    setTempUser(state, payload) {
      state.forms.user = payload
    },
    activateModal(state) {
      state.addModal = true
    },
    closeModal(state) {
      state.addModal = false
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
      state.wait_lists = state.wait_lists.filter(data => data.id != payload.attendee && data.event_id == payload.event)
    },
    setKids(state, payload) {
      state.kids = payload
    },
    upadateEvents(state, payload) {
      state.events.push(payload.event)
      state.images.push(payload.image)
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
      const i = state.attendees.findIndex(x => x.id === payload.id)
      state.attendees.splice(i, 1, payload)
    },
    startLoader(state) {
      state.loader = true
    },
    stopLoader(state) {
      state.loader = false
    },
    toggleMenu(state) {
      state.menu = !state.menu
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
          // console.log(res.data)
          // state.commit('unSetLoader')

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
      // state.commit('setLoader') 
        axios.delete(this.getters.getHostname+'/api/logout?token='+this.getters.getToken)
        .then(()=> {
          state.commit('destroyToken')
        })
    },
    computeCoordinates() {
      if (navigator.geolocation) {
        const vm = this
        navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          vm.dispatch('getCucrrentLocation', { lat: lat, lng: lng})
        }, function(error) {
          console.log(`Error getting location: ${error.message}`)
        });
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
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
    async fetchWaitList() {
      return await axios.get(this.getters.getHostname+'/api/bookings?token='+ this.getters.getToken)    
    },
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
        const startDate = new Date(element.event.date+'T'+element.event.start_time)
        const endDate = new Date(element.event.date+'T'+element.event.end_time)
        if (currentDateTime > startDate && currentDateTime < endDate) {
          newEvent.push(element.event)
        }
        
      })
      return newEvent
    },
    getUpcomingEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date()
      events.forEach(element => {
        const startDate = new Date(element.event.date+'T'+element.event.start_time)
        if (currentDateTime < startDate) {
          newEvent.push(element.event)
        }
      })
      return newEvent
    },
    getPastEvents(state) {
      const events = state.events
      let newEvent = []
      const currentDateTime = new Date()
      events.forEach(element => {
        const endDate = new Date(element.event.date+'T'+element.event.end_time)
        if (currentDateTime > endDate) {
          newEvent.push(element.event)
        }
      })
      return newEvent
    },
    getDevice: (state) => state.device,
    getWindowWidth: (state) => state.windowWidth,
    getWindowHeight: (state) => state.windowHeight,
    getKids: (state) => state.kids,
    getMenu: (state) => state.menu
  },
  modules: {
    data,
    newUser
  }
})
