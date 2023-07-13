import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/app/Home.vue'


import Dashboard from '@/views/app/Dashboard.vue'
import Welcome from '@/views/web/WelcomeView.vue'
import SignIn from '@/views/web/SignIn.vue'
import SignUp from '@/views/web/SignUp.vue'
import SignUpProgress from '@/views/web/WelcomeSignUp.vue'
import SignUpParentDetails from '@/views/web/SignUpParentDetails.vue'
import SignUpKids from '@/views/web/SignUpKids.vue'
import ForgotPassword from '@/views/web/ForgotPassword.vue'
import ResetPassword from '@/views/web/ResetPassword.vue'
import Profile from '@/views/app/Profile.vue'
import KidsProfile from '@/components/layouts/ProfileViewKidDetail.vue'
import AddEventPage from '@/views/app/village/AddEventPage.vue'
import EventEdit from '@/views/app/village/EventEdit.vue'
import Events from '@/views/app/Events.vue'
import OngoingEvents from '@/views/app/EventsOngoing.vue'
import UpcomingEvents from '@/views/app/EventsUpcoming.vue'
import PastEvents from '@/views/app/EventsPast.vue'
import DetailedEvent from '@/views/app/DetailedEvent.vue'
import Attendee from '@/views/app/village/AttendeeProfile.vue'
import ViewParentProfile from '@/views/app/village/ViewParentProfile.vue'
import Villages from '@/views/app/admin/Villages.vue'
import DetailedVillage from '@/views/app/admin/VillageDetails.vue'
import Transactions from '@/views/app/admin/Transactions.vue'
import Parents from '@/views/app/admin/Parents.vue'
import WaitList from '@/views/app/WaitList.vue'
import Message from '@/views/app/Message.vue'
import MessageDetail from '@/views/app/MessageDetails.vue'
import Notification from '@/views/app/Notification.vue'
// import Payment from '@/views/app/parents/Payment.vue'
// import AllPayments from '@/views/app/parents/AllPayments.vue'
// import SelectPayment from '@/views/app/parents/SelectPayment.vue'
// import AddPayment from '@/views/app/parents/AddPayment.vue'
import EventsNear from '@/views/app/parents/EventsNear.vue'
import BookingSelectKids from '@/views/app/parents/BookingSelectKids.vue'
import BookingSuccess from '@/views/app/parents/BookingSuccess.vue'
import BookingCanceled from '@/views/app/parents/BookingCanceled.vue'
import RegisteredEvents from '@/views/app/parents/RegisteredEvents.vue'
import TrackEvent from '@/views/app/parents/TrackEvent.vue'
import AdminDashOngoingTab from '@/components/layouts/AdminDashOngoingTab.vue'
import AdminDashUpcomingTab from '@/components/layouts/AdminDashUpcomingTab.vue'
import AdminDashPastTab from '@/components/layouts/AdminDashPastTab.vue'
import ParentVerifyCode from '@/views/app/parents/ParentVerifyCode.vue'
import VillageVerifyCode from '@/views/app/village/VillageVerifyCode.vue'
// import AddVillagePage from '@/views/app/admin/AddVillagePage.vue'
import SubAdmins from '@/views/app/admin/SubAdmins.vue'
import SubAdminViewOne from '@/views/app/admin/SubAdminViewOne.vue'
import SubAdminViewTwo from '@/views/app/admin/SubAdminViewTwo.vue'








import VerifyAccount from '@/views/web/VerifyAccount.vue'
import Web404View from '@/views/web/Web404View.vue'



const routes = [
  {
    path: '/home',
    component: Home,
    meta: {requiresAuth: true },
    children: [
      { path: '/', component: Dashboard,
      children: [
        { path: '/', name: 'AdminDashboard', component: AdminDashOngoingTab},
        { path: '/upcoming-events', name: 'AdminDashUpcomingEvent', component: AdminDashUpcomingTab},
        { path: '/past-events', name: 'AdminDashPastEvent', component: AdminDashPastTab}

      ]},
      { path: '/profile', component: Profile, 
      children: [
        { path: '/profile/:name/:id', name: 'KidsProfile', component: KidsProfile }
      ]},
      { path: '/add-new-event', name: 'AddEventPage', component: AddEventPage},
      { path: '/edit-event/:id/:name/', name: 'EventEdit', component: EventEdit},
      { path: '/events/:name', component: Events,
      children: [
        { path: '/events/:name', name: 'OngoingEvents', component: OngoingEvents },
        { path: '/events/:name/all', name: 'UpcomingEvents', component: UpcomingEvents },
        { path: '/events/:name/past', name: 'PastEvents', component: PastEvents },
      ]
      },
      { path: '/event/:id/:name', name: 'DetailedEvent', component: DetailedEvent },
      { path: '/event/attendee/:id/:name', name: 'Attendee', component: Attendee },
      { path: '/parent/:parent_id/:parent', name: 'ViewParentProfile', component: ViewParentProfile },
      { path: '/village/:name/:id/:filter', name: 'DetailedVillage', component: DetailedVillage },
      { path: '/transactions', name: 'Transactions', component: Transactions },
      // { path: '/add-new-village', name: 'AddVillagePage', component: AddVillagePage},
      { path: '/waitlists', name: 'WaitList', component: WaitList },
      { path: '/messages', component: Message,
        children: [
          { path: '/messages/:to/:name', name: 'MessageDetail', component: MessageDetail },
        ]
      },
      { path: '/notifications', name: 'Notification', component: Notification },
      // { path: '/', name: 'Payment', component: Payment,
      // children: [
      //   { path: '/payments', name: 'AllPayments', component: AllPayments},
      //   { path: '/select-payment', name: 'SelectPayment', component: SelectPayment},
      //   { path: '/add-payment/:name', name: 'AddPayment', component: AddPayment},
      //   ]
      // },
      { path: '/events-near-you', name: 'EventsNear', component: EventsNear},
      { path: '/booking-event/:event_id/:village/:event_name/:event_price', name: 'BookingSelectKids', component: BookingSelectKids},
      { path: '/booking-event/success/:session_id', name: 'BookingSuccess', component: BookingSuccess },
      { path: '/booking-event/canceled/:session_id', name: 'BookingCanceled', component: BookingCanceled },
      { path: '/registered-events', name: 'RegisteredEvents', component: RegisteredEvents},
      { path: '/track-event/:id/:name', name: 'TrackEvent', component: TrackEvent},
      { path: '/verify-code-and-checkout', name: 'ParentVerifyCode', component: ParentVerifyCode},
      { path: '/code-verification', name: 'VillageVerifyCode', component: VillageVerifyCode},

      //super
      { path: '/parents', name: 'Parents', component: Parents },
      { path: '/sub-admins', component: SubAdmins,
      children: [
          { path: '/sub-admins', name: 'SubAdminViewOne', component: SubAdminViewOne },
          { path: '/sub-admins/village-personnels', name: 'SubAdminViewTwo', component: SubAdminViewTwo }
        ]
      },
      { path: '/villages', name: 'Villages', component: Villages },


    

















    ]
  },
  { 
    path: '/signin', component: Welcome,
    meta: {requiresVisitor: true},
    children: [
      { path: '/signin', name: 'SignIn', component: SignIn},
      { path: '/signup', name: 'SignUp', component: SignUp},
      { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword},
      { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword},
    ],
  },
  {
    path: '/signup/u/details', component: SignUpProgress,
    children: [
      { path: '/signup/u/details', name: 'SignUpParentDetails', component: SignUpParentDetails },
      { path: '/signup/u/kids', name: 'SignUpKids', component: SignUpKids }
    ]
  },
  { path: '/new-account-verification/:token', name: 'VerifyAccount', component: VerifyAccount},
  { path: '/:pathMatch(.*)*', name: 'not-found', component: Web404View },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.auth) {
      next({
        name: 'SignIn',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.auth) {
      next({
        name: 'AdminDashboard'
      })
    } else{
      next()
    }
  }else if (to.matched.some(record => record.meta.requiresNewUser)) {
    if (!store.getters.newUser) {
      next({
        name: 'SignIn'
      })
    } else{
      next()
    }
  }
  else {
    next()
  }
})
export default router
