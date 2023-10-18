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
            <v-col class="pa-4 ma-4">
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
      }
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
