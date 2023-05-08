import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/app/Home.vue'


import Dashboard from '@/views/app/Dashboard.vue'
import Welcome from '@/views/web/WelcomeView.vue'
import SignIn from '@/views/web/SignIn.vue'
import SignUp from '@/views/web/SignUp.vue'
import SignUpVillage from '@/views/web/SignUpVillage.vue'
import ForgotPassword from '@/views/web/ForgotPassword.vue'
import Profile from '@/views/app/Profile.vue'
import KidsProfile from '@/components/layouts/ProfileViewKids.vue'
import AddEventPage from '@/views/app/village/AddEventPage.vue'
import Events from '@/views/app/Events.vue'
import OngoingEvents from '@/views/app/EventsOngoing.vue'
import UpcomingEvents from '@/views/app/EventsUpcoming.vue'
import PastEvents from '@/views/app/EventsPast.vue'
import DetailedEvent from '@/views/app/DetailedEvent.vue'
import Attendee from '@/views/app/village/AttendeeProfile.vue'
import ViewParentProfile from '@/views/app/village/ViewParentProfile.vue'
import Villages from '@/views/app/Villages.vue'
import WaitList from '@/views/app/WaitList.vue'
import RequestCode from '@/views/app/RequestCode.vue'
import Message from '@/views/app/Message.vue'
import MessageDetail from '@/views/app/MessageDetail.vue'
import Notification from '@/views/app/Notification.vue'
import Payment from '@/views/app/parents/Payment.vue'
import AllPayments from '@/views/app/parents/AllPayments.vue'
import SelectPayment from '@/views/app/parents/SelectPayment.vue'
import AddPayment from '@/views/app/parents/AddPayment.vue'
import EventsNear from '@/views/app/parents/EventsNear.vue'
import BookingSelectKids from '@/views/app/parents/BookingSelectKids.vue'
import RegisteredEvents from '@/views/app/parents/RegisteredEvents.vue'
import TrackEvent from '@/views/app/parents/TrackEvent.vue'
import AdminDashOngoingTab from '@/components/layouts/AdminDashOngoingTab.vue'
import AdminDashUpcomingTab from '@/components/layouts/AdminDashUpcomingTab.vue'
import AdminDashPastTab from '@/components/layouts/AdminDashPastTab.vue'












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
      { path: '/events/:name', component: Events,
      children: [
        { path: '/events/:name', name: 'OngoingEvents', component: OngoingEvents },
        { path: '/events/:name/all', name: 'UpcomingEvents', component: UpcomingEvents },
        { path: '/events/:name/past', name: 'PastEvents', component: PastEvents },
      ]
      },
      { path: '/event/:id/:name', name: 'DetailedEvent', component: DetailedEvent },
      { path: '/event/attendee/:id/:name/:event', name: 'Attendee', component: Attendee },
      { path: '/parent', name: 'ViewParentProfile', component: ViewParentProfile },
      { path: '/villages', name: 'Villages', component: Villages },
      { path: '/waitlists', name: 'WaitList', component: WaitList },
      { path: '/request-code', name: 'RequestCode', component: RequestCode},
      { path: '/messages', component: Message,
      children: [
        { path: '/messages/:name/:id', name: 'MessageDetail', component: MessageDetail },
      ]
      },
      { path: '/notifications', name: 'Notification', component: Notification },
      { path: '/', name: 'Payment', component: Payment,
      children: [
        { path: '/payments', name: 'AllPayments', component: AllPayments},
        { path: '/select-payment', name: 'SelectPayment', component: SelectPayment},
        { path: '/add-payment/:name', name: 'AddPayment', component: AddPayment},
        ]
      },
      { path: '/events-near-you', name: 'EventsNear', component: EventsNear},
      { path: '/booking-event/:event_id/:event_name/:event_price', name: 'BookingSelectKids', component: BookingSelectKids},
      { path: '/registered-events', name: 'RegisteredEvents', component: RegisteredEvents},
      { path: '/track-event/:id/:name', name: 'TrackEvent', component: TrackEvent},













    ]
  },
  { 
    path: '/signin', component: Welcome,
    meta: {requiresVisitor: true},
    children: [
      { path: '/signin', name: 'SignIn', component: SignIn},
      { path: '/signup', name: 'SignUp', component: SignUp},
      { path: '/signup-village', name: 'SignUpVillage', component: SignUpVillage},
      { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword},
      { path: '/:pathMatch(.*)*', name: 'not-found', component: Web404View },
    ],
  },
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
  } else {
    next()
  }
})

export default router
