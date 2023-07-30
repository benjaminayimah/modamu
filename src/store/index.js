import axios from 'axios'
import { createStore } from 'vuex'
import data from './modules/data'
import newUser from './modules/newUser'
import dropdown from './modules/dropdown'
import { deleteApi, getApi, postApi } from '@/api'
import router from '@/router'

export default createStore({
  state: {
    // hostname: 'http://localhost:8000',
    // appHostname: 'http://localhost:8080',
    hostname: 'https://modamu-api.rancroftdev.com',
    appHostname: 'https://main.d7v940lfxffcb.amplifyapp.com',
    token: localStorage.getItem('auth') || null,
    current_location: '',
    menu: false,
    device: null,
    loader: false,
    windowWidth: '',
    windowHeight: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    sigining: false,
    addModal: false,
    onboardModal: false,
    sessionExp: false,
    subAdminStore: { adminAccess: false, villageAccess: false, viewing: false, edit: false, user: ''},
    subAdminSignUpCompleted: false,
    creating: false,
    forms: { active: false, loader: true, kids: false, editProfile: false, changePass: false, otherPass: false, otherProfile: false, addtoGallery: false, verifyCode: false, addVillage: false, sub_admin: false, id: '', user: '' },
    deleteModal: { active: false, deleting: false, id: '', type: '' },
    alert: { status: { show: false, success: false, danger: false,  info: false }, title: '', body: '' },
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
    parents: [],
    hobbies: [],
    illnesses: [],
    allergies: [],
    msgParentDetails: false,
    sub_admins: [],
    village_allocation_access: [],
    admin_access: [],
    messageTab: 'recent',
    contactOnly: false,
    loadingChats: false,
    bulkMessage: false,
    contactSelections: []
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
    showOnboardingModal(state) {
      state.onboardModal = true
    },
    closeOnboardingModal(state) {
      localStorage.setItem('tempOnboarding', true)
      state.onboardModal = false
    },
    async openModal(state, payload) {
      state.forms.loader = true
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
      }else if(payload == 'update-kid') {
        state.forms.kids = true
      }else if(payload == 'sub-admin') {
        state.subAdminSignUpCompleted ? state.subAdminSignUpCompleted = false : ''
        state.forms.sub_admin = true
      }
    },
    closeModal(state) {
      state.forms.active = false
      document.body.classList.remove('fixed-body')
      for (let i in state.forms)
      state.forms[i] = false
      if(state.forms.user) {
        state.forms.user = ''
      }
    },
    stopFormLoader(state) {
      state.forms.loader = false
    },
    startLoadingChats(state) {
      state.loadingChats = true
    },
    stopLoadingChats(state) {
      state.loadingChats = false
    },
    setUpdateKid(state, payload) {
      state.forms.user = payload
      this.commit('openModal', 'update-kid')
    },
    setAddAdmin(state, payload) {
      state.forms.user = payload
      this.commit('openModal', 'sub-admin')
    },
    async resetTheirPass(state, payload) {
      state.forms.id = payload
      await this.commit('setOtherPass')
      this.commit('openModal', 'change-pass')
    },
    setOtherPass(state) {
      state.forms.otherPass = true
    },
    async updateTheirInfo(state, payload) {
      state.forms.user = payload
      await this.commit('setOtherProfile')
      this.commit('openModal', 'edit-profile')
    },
    setOtherProfile(state) {
      state.forms.otherProfile = true
    },
    startSpinner(state) {
      state.creating = true
    },
    stopSpinner(state) {
      state.creating = false
    },
    setTempID(state, payload) {
      state.forms.id = payload
    },
    setTempUser(state, payload) {
      state.forms.user = payload
    },
    setRead(state, payload) {
      const i =  state.messages.findIndex(x => x.message.id == payload) 
      if(i > -1)
      state.messages[i].unread = 0
    },
    activateModal(state) {
      state.forms.active = true
      // const modal = document.querySelector('#main_modal')
      // modal.showModal()
    },
    goToEvents() {
      router.push({ name: 'EventsNear' })
    },
    doMsgParentDetails(state) {
      state.msgParentDetails = !state.msgParentDetails
    },
    closeMsgParentDetails(state) {
      state.msgParentDetails = false
    },
    setMessageTab(state, payload) {
      state.messageTab = payload
      if(payload !== 'recent') {
          state.contactOnly = true
      }else {
          state.contactOnly = false
      }
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
    startSigning(state) {
      router.push({ name: 'SignUpParentDetails'})
      state.sigining = true
    },
    stopSigning(state) {
      state.sigining = false
    },
    setUser(state, payload) {
      state.user = payload.user
      state.events = payload.events
      state.images = payload.images
      state.attendees = payload.attendees
      state.kids = payload.kids,
      state.villages = payload.villages,
      state.bookings = payload.bookings,
      state.parents = payload.parents,
      state.wait_lists = payload.waitlist
      state.messages = payload.messages
      state.notifications = payload.notifications
      state.hobbies = payload.hobbies
      state.illnesses = payload.illnesses
      state.allergies = payload.allergies
      if(!state.events_near.events.length) {
        this.commit('setNearbyEventToEvents')
      }
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
    setNotifications(state, payload) {
      state.notifications = payload
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
    async viewAllocatedVillage(state, payload) {
      state.subAdminStore.viewing = true
      await this.commit('setSubAdminStore', payload)
      state.subAdminStore.villageAccess = true
    },
    toggleVillageAllocationMode(state) {
      state.subAdminStore.viewing = !state.subAdminStore.viewing
      state.subAdminStore.edit = !state.subAdminStore.edit
    },
    openAllocateVillage(state, payload) {
      state.subAdminStore.villageAccess = true
      this.commit('setSubAdminStore', payload)
    },
    closeAllocateVillage(state) {
      state.subAdminStore.villageAccess = false
      state.subAdminStore.edit = false
      state.subAdminStore.viewing = false
      document.body.classList.remove('fixed-body')
      this.commit('clearSubAdminStore')
    },
    async addPermissions(state, payload) {
      await this.commit('setSubAdminStore', payload)
      state.subAdminStore.adminAccess = true
    },
    async updatePermissions(state, payload) {
      let user = payload
      const check = state.admin_access.find(data => data.user_id == payload.id)
      if(check) {
        user = check
      }
      state.subAdminStore.edit = true
      await this.commit('setSubAdminStore', user)
      state.subAdminStore.adminAccess = true
    },
    closeAdminControl(state) {
      state.subAdminStore.adminAccess = false
      state.subAdminStore.edit = false
      document.body.classList.remove('fixed-body')
      this.commit('clearSubAdminStore')
    },
    setSubAdminStore(state, payload) {
      state.subAdminStore.user = payload
      document.body.classList.add('fixed-body')
    },
    clearSubAdminStore(state) {
      state.subAdminStore.user = ''
      if(state.forms.sub_admin) {
        state.subAdminSignUpCompleted = true
      }
    },
    upadateEvents(state, payload) {
      state.events.push(payload.event)
      state.images.push(payload.image)
    },
    updateVillage(state, payload) {
      state.villages.push(payload)
    },
    setSubAdmins(state, payload) {
      state.sub_admins = payload.sub_admins
      state.admin_access = payload.admin_access
      this.commit('updateVillageAllocationAccess', payload.village_access)
    },
    deleteSubAdmin(state, payload) {
      const i = state.sub_admins.findIndex(x => x.id == payload)
      state.sub_admins.splice(i, 1);
    },
    updateVillageAllocationAccess(state, payload) {
      state.village_allocation_access = payload
    },
    addAdminAccess(state, payload) {
      state.admin_access.push(payload)
    },
    updateAdminAccess(state, payload) {
      const i = state.admin_access.findIndex(x => x.id === payload.id)
      if(i > -1) {
        state.admin_access.splice(i, 1, payload)
      }else {
        this.commit('addAdminAccess', payload)
      }
    },
    removeFromVillageAllocation(state, payload) {
      const i = state.village_allocation_access.findIndex(x => x.id == payload)
      state.village_allocation_access.splice(i, 1);
    },
    updateEvent(state, payload) {
      const i = state.events.findIndex(x => x.id == payload.id)
      state.events.splice(i, 1, payload)
    },
    addToKids(state, payload) {
      state.kids.push(payload.kid)
      state.hobbies = payload.hobbies
      state.illnesses = payload.illnesses
      state.allergies = payload.allergies
    },
    updateKids(state, payload) {
      const i = state.kids.findIndex(x => x.id == payload.kid.id)
      state.kids.splice(i, 1, payload.kid)
      state.hobbies = payload.hobbies
      state.illnesses = payload.illnesses
      state.allergies = payload.allergies
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
    setNearbyEventToEvents(state) {
      let events = []
      state.events.forEach(element => {
        events.push({ event: element})
      });
      state.events_near.events = events
      state.events_near.images = state.images
    },
    setWaitlist(state, payload) {
      state.wait_lists = payload
    },
    setAttendees(state, payload) {
      state.attendees = payload
    },
    addToSubAdmin(state, payload) {
      state.sub_admins.push(payload)
    },
    updateSubAdminInfo(state, payload) {
      const i = state.sub_admins.findIndex(x => x.id == payload.id)
      state.sub_admins.splice(i, 1, payload)
    },
    updateAttendees(state, payload) {
      const i = state.attendees.findIndex(x => x.id == payload.id)
      state.attendees.splice(i, 1, payload)
    },
    deleteAttendees(state, payload) {
      state.attendees =  state.attendees.filter(item => item.id != payload)
    },
    deleteNotification(state, payload) {
      state.notifications =  state.notifications.filter(item => item.id != payload)
    },
    deleteRegistered(state, payload) {
      state.registered_events =  state.registered_events.filter(item => item.id != payload)
      router.go(-1)
    },
    setExpSession(state) {
      state.sessionExp = true
    },
    unsetExpSession(state) {
      state.sessionExp = false
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
    goToVillagePage() {
      router.push({ name: 'AddVillagePage'})
    },
    openBulkMessage(state) {
      state.bulkMessage = true
    },
    closeBulkMessage(state) {
      state.bulkMessage = false
      state.contactSelections = []
    },
    selectRecipient(state, payload) {
      const i = state.contactSelections.findIndex(x => x.id === payload.id)
      if(i > -1) {
        state.contactSelections.splice(i, 1);
      }else {
        state.contactSelections.push(payload)
      }
    },
    unSelectAllRecipients(state) {
      state.contactSelections = []
    },
    //village set all events
    setEvents(state, payload) {
      state.events = payload.events
      state.images = payload.images
      state.attendees = payload.attendees
    },
    setImages(state, payload) {
      state.images = payload
    },

    //set delete
    setDeleteModal(state, payload) {
      document.body.classList.add('fixed-body')
      state.deleteModal.active = true
      state.deleteModal.id = payload.id
      state.deleteModal.type = payload.type  
    },
    closeDeleteModal(state) {
      for (let i in state.deleteModal) {
        state.deleteModal[i] = false
      }
      document.body.classList.remove('fixed-body')
    },
    doDelete(state) {
      state.deleteModal.deleting = true
      const id = state.deleteModal.id
      const type = state.deleteModal.type
      if(type === 'admin'){
        this.dispatch('deleteSubAdmin', id)
      }
      else{
        // const newPayload = {
        //     id: 'danger',
        //     body: 'Error deleting item try again'
        // }
        // this.commit('showAlert', newPayload)
        this.commit('closeDeleteModal')
        console.log('errr')

      }
    },
    showAlert(state, payload) {
      this.commit('dismisAlert')
      if(payload.id === 'success'){
          state.alert.title = payload.title
          state.alert.body = payload.body
          state.alert.status.success = true
          state.alert.status.show = true
          setTimeout(() => {
            this.commit('dismisAlert')
          }, 3000);
      }else if(payload.id === 'danger'){
        state.alert.title = payload.title
        state.alert.body = payload.body
        state.alert.status.danger = true
        state.alert.status.show = true
      }   
    },
    dismisAlert(state) {
        for (let i in state.alert.status) {
          state.alert.status[i] = false
        }
        state.alert.body = ''
        state.alert.title = ''
    },



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
          if(e.response.status == 400 || e.response.status == 404) {
            state.commit('destroyToken')
          }
        }      
    },
    async signIn(state, payload) {  
        return await axios.post(this.getters.getHostname+'/api/sign-in', payload) 
    },
    async logoutAuth(state){
        state.commit('startLoader')
        try {
          axios.delete(this.getters.getHostname+'/api/logout?token='+this.getters.getToken)
          state.commit('destroyToken')
        } catch (error) {
          state.commit('destroyToken')
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
        .catch(e => {
          if(e.response.status == 400) {
              state.commit('setExpSession')
          }
        });
    },
    async doPreloadTemp(state, payload) {
      return await postApi(this.getters.getHostname+'/api/set-temp-update?token=' + this.getters.getToken, {image: payload})
    },
    async checkInAttendee(state, payload) {  
      return await postApi(this.getters.getHostname+'/api/check-in-kid?token='+this.getters.getToken, { id: payload })    
    },
    async fetchMessages(state) {
        state.commit('startLoader')
        try {
            const res = await getApi(this.getters.getHostname+'/api/fetch-messages?token='+this.getters.getToken);
            state.commit('setMessages', res.data)
            state.commit('stopLoader')
        } catch (e) {
          if(e.response.status == 400) {
            state.commit('setExpSession')
          }
        }
      },
      async fetchNotifications(state, payload) {
        try {
            const res = await postApi(this.getters.getHostname+'/api/notifications?token='+this.getters.getToken, {read: payload});
            state.commit('setNotifications', res.data)
        } catch (e) {
          if(e.response.status == 400) {
              state.commit('setExpSession')
          }
        }
      },
      async deleteThisNotification(state, payload) {
        state.commit('startLoader')
        try {
            const res = await deleteApi(this.getters.getHostname+'/api/notifications/'+payload+'?token='+this.getters.getToken);
            state.commit('deleteNotification', res.data)
            state.commit('stopLoader')
        } catch (e) {
          if(e.response.status == 400) {
              state.commit('setExpSession')
          }
        }
      },
      async deleteAttendee(state, payload) {
        state.commit('startLoader')
        try {
            const res = await deleteApi(this.getters.getHostname+'/api/bookings/'+payload+'?token='+this.getters.getToken);
            state.commit('deleteAttendees', res.data)
            state.commit('stopLoader')
        } catch (e) {
          if(e.response.status == 400) {
              state.commit('setExpSession')
          }
        }
      },
      async deleteRegistered(state, payload) {
        state.commit('startLoader')
        try {
            const res = await deleteApi(this.getters.getHostname+'/api/delete-registered-finish-event/'+payload+'?token='+this.getters.getToken);
            state.commit('deleteRegistered', res.data)
            state.commit('stopLoader')
        } catch (e) {
          if(e.response.status == 400) {
              state.commit('setExpSession')
          }
        }
      },
    //   async fetchChats(state, payload) {
    //     state.commit('startLoader')
    //     // payload.to ? router.push({ name: 'MessageDetail', params: { id: payload.id, name: payload.name, to: payload.to }, replace: true}): ''
    //     try {
    //         const res = await postApi(this.getters.getHostname + '/api/fetch-this-chats/'+ payload.id +'?token='+this.getters.getToken)
    //         state.commit('setChats', res.data)
    //         state.commit('stopLoader')
    //     } catch (e) {
    //       if(e.response.status == 400) {
    //           state.commit('setExpSession')
    //       }
    //     }
    // },
    async deleteSubAdmin(state, payload) {
      try {
        const res = await deleteApi(this.getters.getHostname+'/api/sub-admin/'+payload+'?token='+this.getters.getToken);
        state.commit('deleteSubAdmin', res.data.id)
        state.commit('closeDeleteModal')
      } catch (e) {
        console.log(e.response)
        if(e.response.status == 400) {
            state.commit('setExpSession')
        }
      }
    }
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
      return state.user.access_level == 0 && !state.user.sub_admin ? true : false
    },
    is_subadmin(state) {
      return state.user.access_level == 0 && state.user.sub_admin ? true : false
    },
    is_village(state) {
      return state.user.access_level == 1 ? true : false
    },
    is_parent(state) {
      return state.user.access_level == 2 ? true : false
    },
    is_sublevel2(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '2' ? true : false
    },
    is_sublevel1(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' ? true : false
    },
    is_sublevel_events(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.events ? true : false
    },
    is_sublevel_villages(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.villages ? true : false
    },
    is_sublevel_parents(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.parents ? true : false
    },
    is_sublevel_kids(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.kids ? true : false
    },
    is_sublevel_messages(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.messages ? true : false
    },
    is_sublevel_notifications(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.notifications ? true : false
    },
    is_sublevel_bookings(state) {
      return state.user.access_level == 0 && state.user.sub_admin && state.user.sub_level == '1' && state.user.bookings ? true : false
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
    getMessageTotalCount(state) {
      const msgs = state.messages
      let count = 0
      msgs.forEach(element => {
        count = Number(element.unread + count)
      });
      return count
    },
    getSubAdmins(state) {
      return state.sub_admins.filter(data => data.sub_level == 1)
    },
    getVillagePersonnels(state) {
      return state.sub_admins.filter(data => data.sub_level == 2)
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
    newUser,
    dropdown
  }
})
