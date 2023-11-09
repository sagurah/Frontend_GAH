<template>
  <div>
    <v-main class="mx-3 my-3">
      <v-section>
        <v-container>
          <v-row no-gutters class="mt-5 pt-5">
            <v-col class="pa-4 ma-4">
              <div>
                <h1 class="text-h2 font-weight-bold mb-5">Temukan Tempat Menginap Terbaik Disini!</h1>
                <span class="text-h6 font-weight-regular">Cari Penginapan Ideal: Dapatkan Kenyamanan Terbaik. Pesan Hotel
                  Impian Anda, Buat Kenangan, dan Santailah Bersama Kami.</span>
              </div>
              <div class="mt-5 pt-5">
                <v-card class="px-5 py-3" color="indigo" variant="flat" elevation="3">
                  <v-card-title>Temukan Ketersediaan Kamar</v-card-title>
                  <v-card-item>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field label="Tanggal Check-in" v-model="checkInDate" type="date" outlined></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field label="Tanggal Check-out" v-model="checkOutDate" type="date"
                          outlined></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-item>
                  <v-card-actions>
                    <v-btn block prepend-icon="mdi-magnify" color="white" variant="outlined" class="text-h6"
                      @click="cariKamar()">Cari
                      Kamar</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
            <v-col class="pt-4 pl-4 pr-4 mt-4 my-4 mb-4">
              <v-row>
                <v-col cols="4">
                  <v-card height="600" class="stacked-cards" style="">
                    <div class="image-container">
                      <img :src="images.img1" alt="Image 1" />
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="8">
                  <v-card height="400" class="stacked-cards" style="right: 25px;">
                    <div class="image-container">
                      <img :src="images.img2" alt="Image 1" />
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-card height="300" class="stacked-cards" style="left: 60%; bottom: 100%;">
                    <div class="image-container">
                      <img :src="images.img3" alt="Image 1" />
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card height="300" class="stacked-cards" style="bottom: 150%;">
                    <div class="image-container">
                      <img :src="images.img4" alt="Image 1" />
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mb-4 pb-4">
            <v-col cols="12">
              <h2 class="text-center text-indigo">Informasi Hotel</h2>
            </v-col>
            <v-col v-for="(item, index) in dataInfo" :key="index" cols="6">
              <v-card class="stacked-cards" height="" width="auto">
                <div class="image-container">
                  <img :src="item.image" alt="Image" />
                </div>
                <v-card-text>
                  <h2>{{ item.title }}</h2>
                  <p>Kapasitas {{ item.kapasitas }} | Luas {{ item.luas }}</p>
                  <p>{{ item.rincian }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-section>
    </v-main>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.random-pos {
  position: relative;
  top: 0;
  left: 0;
  transition: all 0.5s ease-in-out;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      checkInDate: null,
      checkOutDate: null,
      availableRooms: [],
      images: {
        img1: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        img2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        img3: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        img4: 'https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      dataInfo: [
        {
          'image': 'https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/86e685af18659ee9ecca35c465603812.jpg?alt=media&token=e7fa9f98-0fa6-42ed-8c01-17dace7ee8e5&_gl=1*awj09g*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5ODc5MjA4Ny4yOC4xLjE2OTg3OTI5OTYuNTQuMC4w',
          'title': 'Superior',
          'kapasitas': '2 orang',
          'luas': '22 meter persegi',
          'rincian': 'AC Air minum kemasan gratis, Brankas dalam kamar (ukuran laptop), Fasilitas membuat kopi/teh, Jubah mandi, Layanan kamar (24 jam), Meja tulis, Minibar, Pembersihan kamar harian, Pengering rambut, Peralatan mandi gratis, Sandal, Telepon, Tempat tidur ekstra (biaya tambahan), Tempat tidur premium, Tirai kedap-cahaya, TV kabel, TV LCD, Wi-Fi gratis'
        },
        {
          'image': 'https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/24trending-shophotels1-superJumbo.jpg?alt=media&token=19fb3ed5-a545-4527-9e5f-37dc858ea536&_gl=1*1x45muv*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5ODc5MjA4Ny4yOC4xLjE2OTg3OTIyMTEuMTIuMC4w',
          'title': 'Double Deluxe',
          'kapasitas': '2 orang',
          'luas': '24 meter persegi',
          'rincian': 'AC Air minum kemasan gratis, Brankas dalam kamar (ukuran laptop), Fasilitas membuat kopi/teh, Jubah mandi, Layanan kamar (24 jam), Meja tulis, Minibar, Pembersihan kamar harian, Pengering rambut, Peralatan mandi gratis, Sandal, Telepon, Tempat tidur ekstra (biaya tambahan), Tempat tidur premium, Tirai kedap-cahaya, TV kabel, TV LCD, Wi-Fi gratis'
        },
        {
          'image': 'https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/download.jpg?alt=media&token=e8c3c278-15d5-4932-b762-e4ceec929233&_gl=1*mssyo1*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5ODc5MjA4Ny4yOC4xLjE2OTg3OTIyMjguNjAuMC4w',
          'title': 'Executive Deluxe',
          'kapasitas': '2 orang',
          'luas': '36 meter persegi',
          'rincian': 'AC Air minum kemasan gratis, Brankas dalam kamar (ukuran laptop), Fasilitas membuat kopi/teh, Jubah mandi, Layanan kamar (24 jam), Meja tulis, Minibar, Pembersihan kamar harian, Pengering rambut, Peralatan mandi gratis, Sandal, Telepon, Tempat tidur ekstra (biaya tambahan), Tempat tidur premium, Tirai kedap-cahaya, TV kabel, TV LCD, Wi-Fi gratis'
        },
        {
          'image': 'https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/hero-presidential-suite_wide.jpg?alt=media&token=4e800ce3-3eb0-4aeb-8607-b24a7b03b5af&_gl=1*foka36*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5ODc5MjA4Ny4yOC4xLjE2OTg3OTIyMzkuNDkuMC4w',
          'title': 'Junior Suite',
          'kapasitas': '2 orang',
          'luas': '46 meter persegi',
          'rincian': 'AC Air minum kemasan gratis, Brankas dalam kamar (ukuran laptop), Fasilitas membuat kopi/teh, Jubah mandi, Layanan kamar (24 jam), Meja tulis, Minibar, Pembersihan kamar harian, Pengering rambut, Peralatan mandi gratis, Sandal, Telepon, Tempat tidur ekstra (biaya tambahan), Tempat tidur premium, Tirai kedap-cahaya, TV kabel, TV LCD, Wi-Fi gratis'
        }
      ]
    }
  },
  methods: {
    cariKamar() {
      axios.get(`http://localhost:4000/api/v1/tarif/getAllTarif`)
        .then(res => {
          this.availableRooms.push(res.data.data)
        })
    },

    movePage(path) {
      this.$router.push(path)
    }
  }
}

</script>
