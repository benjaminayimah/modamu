import axios from 'axios'
import { createStore } from 'vuex'
// import router from '@/router'
import data from './modules/data'
import newUser from './modules/newUser'
// import window from './modules/window'

export default createStore({
  state: {
    // hostname: 'http://localhost:8000',
    hostname: 'http://18.169.170.75',
    token: localStorage.getItem('auth') || null,
    current_location: '',
    device: null,
    windowWidth: '',
    windowHeight: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    addModal: false,
    forms: {kids: false, editProfile: false, changePass: false, addtoGallery: false, id: ''},
    kids: [],
    events: [],
    images: [],
    messages: [],
    villages: [],
    wait_lists: [],
    notificaions: [],
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
      if(winWidth < 500){
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
      }
    },
    setTempID(state, payload) {
      state.forms.id = payload
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
      state.registered_events = payload.registered

      this.commit('updateLocalStorage', payload.user)
    },
    updateUser(state, payload) {
      state.user = payload
      this.commit('updateLocalStorage', payload)
    },
    updateLocalStorage(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload));
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

  },
  actions: {
    async getAuthUser(state) {  
        try {
          const res = await axios.post(this.getters.getHostname+'/api/auth-user?token='+this.getters.getToken)
          state.commit('setUser', res.data)
          // console.log(res.data)
          // state.commit('unSetLoader')

        } catch (e) {
          // state.commit('unSetLoader')
          // const newPayload = {
          //   id: 'danger',
          //   body: 'Error loading store! Please check your internet connection'
          // }
          // state.commit('showAlert', newPayload)
          // state.commit('destroyToken') 
        }      
    },
    async fetchThisEvent(state, payload) {  
      return await axios.post(this.getters.getHostname+'/api/fetch-this-event/'+payload +'?token='+ this.getters.getToken)    
    },
    async fetchThisRegisteredEvent(state, payload) {  
      return await axios.get(this.getters.getHostname+'/api/fetch-this-registered-event/'+payload+ '/?token='+ this.getters.getToken)    
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
          console.log(`Error getting location: ${error.message}`);
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    },
    getCucrrentLocation(state, payload) {
      const apiKey = 'AIzaSyBhfD_dScS-ENmuXtQAxTCxtOYadquTric'; // Your Google Cloud Platform API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lng}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const address = data.results[0].formatted_address;
          state.commit('setCurrentLocation', address)
        })
        .catch(error => {
          console.log(error); // Handle any errors that occurred
        });
    }
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
    getDevice: (state) => state.device,
    getWindowWidth: (state) => state.windowWidth,
    getWindowHeight: (state) => state.windowHeight,
    getModal: (state) => state.addModal,
    getForms: (state) => state.forms,
    getKids: (state) => state.kids,
    

  },
  modules: {
    data,
    newUser
  }
})
