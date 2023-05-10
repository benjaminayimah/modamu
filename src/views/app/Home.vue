<template>
  <main class="home" :class="getDevice">
    <main-nav v-if="getDevice != 'mobile'" />
    <top-nav-bar />
    <router-view />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import MainNav from '../../components/includes/app/MainNav.vue'
import TopNavBar from '../../components/includes/app/TopNavBar.vue';
export default {
  components: { MainNav, TopNavBar },
  name: 'HomePage',
  computed: mapGetters(['getDevice']),
  methods: {
    // getCucrrentLocation(payload) {
    //   const apiKey = 'AIzaSyBhfD_dScS-ENmuXtQAxTCxtOYadquTric'; // Your Google Cloud Platform API key
    //   const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+payload.lat+','+payload.lng+'&key='+apiKey
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //       const address = data.results[0].formatted_address;
    //       this.$store.commit('setCurrentLocation', address)
    //     })
    //     .catch(error => {
    //       console.log(error); // Handle any errors that occurred
    //     });
    // },
  },
  mounted() {
    this.$store.dispatch('computeCoordinates')
    // if (navigator.geolocation) {
    //     const vm = this
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       const lat = position.coords.latitude;
    //       const lng = position.coords.longitude;
    //       vm.getCucrrentLocation({ lat: lat, lng: lng})
    //     }, function(error) {
    //       console.log(`Error getting location: ${error.message}`);
    //     });
    //   } else {
    //     console.log('Geolocation is not supported by this browser.');
    //   }
  }
}
</script>
<style lang="scss" scoped>
main {
  position: relative;
  margin-left: calc(var(--nav-width) + var(--dash-padding)*2 + var(--aside-padding)*2);
  padding: 0 7%;
}
</style>
