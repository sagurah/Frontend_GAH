<template>
  <div>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="pl-5">
        <v-btn class="text-h5 font-weight-bold" style="color: white; background-color: #3F51B5; padding: 5px 10px;"
          @click="movePage('/')">
          <span>Grand Atma Hotel</span>
        </v-btn>
      </v-app-bar-title>
      <div class="pr-6">
        <v-btn class="text-h6 mx-2" variant="tonal" color="indigo" size="large" @click="movePage('/login')">Login</v-btn>
        <v-btn class="text-h6" color="indigo" variant="flat" size="large" @click="movePage('/register')">Register</v-btn>
      </div>
    </v-app-bar>
    <router-view></router-view>
    <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
      <div>
        <v-btn icon="mdi-facebook" variant="text"></v-btn>
        <v-btn icon="mdi-twitter" variant="text"></v-btn>
        <v-btn icon="mdi-instagram" variant="text"></v-btn>
      </div>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="6" class="text-justify align-center justify-center d-flex">
          Grand Atma adalah sebuah hotel mewah yang terletak di Jalan Babarsari, sebuah lokasi strategis di kota yang
          menawarkan kenyamanan dan kemewahan bagi para tamunya. Dengan kombinasi yang sempurna antara desain modern dan
          fasilitas yang lengkap, hotel ini menjadi pilihan ideal bagi wisatawan yang menginginkan pengalaman menginap
          yang istimewa.
          <br>
          <br>
          Lokasi hotel di Jalan Babarsari memudahkan akses ke berbagai tempat menarik di kota ini, termasuk tempat belanja, tempat wisata, dan pusat bisnis. Anda dapat dengan mudah menjelajahi keindahan Yogyakarta dan sekitarnya, serta kembali ke kenyamanan hotel yang luar biasa ini.
        </v-col>
        <v-col cols="12" md="6">
          <p style="color: white; background-color: #3F51B5; padding: 5px 5px;">Temukan kami di map!</p>
          <div ref="mapContainer" style="height: 200px"></div>
        </v-col>
      </v-row>
      <v-divider color="white" thickness="5"></v-divider>
      <div class="font-weight-bold mt-3">
        Copyright {{ new Date().getFullYear() }} - Grand Atma Hotel
      </div>
    </v-footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import router from '@/router';

const lang = ref(0)
const lng = ref(0)
const map = ref()
const mapContainer = ref()

onMounted(() => {
  // get User Location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lang.value = position.coords.latitude
      lng.value = position.coords.longitude
    })
  }

  map.value = L.map(mapContainer.value).setView([-7.780621, 110.414404], 15)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value);

  const locationMarker = L.marker([-7.780621, 110.414404]).addTo(map.value);
  locationMarker.bindPopup('Grand Atma Hotel').openPopup()
})

const movePage = path => {
  router.push(path)
}

</script>