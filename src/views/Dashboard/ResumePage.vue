<template>
  <div>
    <v-main>
      <div class="remainingPaymentTime text-center bg-indigo shadow-lg">Remaining Payment Time: </div>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-row class="px-5 py-7" v-if="dataProfile">
        <v-col cols="12" md="8">
          <h3>Data Kontak & Tamu</h3>
          <v-row class="mt-1">
            <v-col cols="12" md="6">
              <p class="font-weight-regular">Nama Lengkap:</p>
              <p class="font-weight-bold">{{ dataProfile.customer[0].NAMA_CUSTOMER }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <p class="font-weight-reguler">Email:</p>
              <p class="font-weight-bold">{{ dataProfile.customer[0].EMAIL }}</p>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col cols="12" md="6">
              <p class="font-weight-regular">Nomor Telepon:</p>
              <p class="font-weight-bold">{{ dataProfile.customer[0].NO_TELP }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <p class="font-weight-reguler">Alamat:</p>
              <p class="font-weight-bold">{{ dataProfile.customer[0].ALAMAT }}</p>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <h3>Fasilitas Tambahan</h3>
          <v-card class="mb-2" color="indigo-lighten-1" v-if="dataResume.fasilitas.length" v-for="(item, i) in dataResume.fasilitas">
            <v-card-text>
              <div>
                <v-row>
                  <v-col cols="12" md="6">
                    <p class="text-start font-weight-bold">{{ item.detailFasilitas.NAMA_FASILITAS }} x 1</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="text-end font-weight-bold">{{ formattedPrice(item.detailFasilitas.HARGA) }}</p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
          <p class="mt-2 font-weight-light" v-else>Tidak ada fasilitas tambahan.</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="elevation-4">
            <v-card-title class="font-weight-bold">Ringkasan</v-card-title>
            <v-card-text>
              <v-row class="mt-0">
                <v-col cols="12" md="6">
                  <p class="text-start">ID Transaksi: </p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-end">{{ dataResume.reservasi.NO_RESERVASI }}</p>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="12" md="6">
                  <p class="text-start">Check In: </p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-end">{{ dataResume.reservasi.TGL_CHECKIN }}</p>
                </v-col>
              </v-row>
              <v-row class="mt-0 pt-0">
                <v-col cols="12" md="6">
                  <p class="text-start">Check Out: </p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-end">{{ dataResume.reservasi.TGL_CHECKOUT }}</p>
                </v-col>
              </v-row>
              <v-row class="mt-0 pt-0">
                <v-col cols="12" md="6">
                  <p class="text-start">Jumlah Tamu: </p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-end">{{ dataResume.reservasi.JML_DEWASA }} Dewasa & {{ dataResume.reservasi.JML_ANAK }}
                    Anak</p>
                </v-col>
              </v-row>
            </v-card-text>
            <div class="px-5">
              <v-divider></v-divider>
            </div>
            <v-card-title>Rincian Kamar</v-card-title>
            <v-card class="mx-2 mb-2" color="indigo-lighten-1">
              <v-card-text>
                <div v-for="(item, i) in dataResume.kamar">
                  <v-row>
                    <v-col cols="12" md="6">
                      <p class="text-start font-weight-bold">{{ item.detailKamar.kamar.JENIS_KAMAR }} x 1</p>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p class="text-end font-weight-bold">{{ formattedPrice(item.detailKamar.TOTAL_TARIF) }}</p>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
            <div class="px-5 mt-4">
              <v-divider></v-divider>
            </div>
            <v-card-text class="mb-0">
              <v-row>
                <v-col cols="12" md="6">
                  <p class="text-start font-weight-medium">Total Pembayaran:</p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-end font-weight-bold" v-if="currentUser.ID_ROLE === 4">{{ formattedPrice(dataResume.reservasi.TOTAL_BAYAR) }}</p>
                  <p class="text-end font-weight-bold" v-if="currentUser.ID_ROLE === 2">{{ formattedPrice(dataResume.reservasi.TOTAL_BAYAR * 0.5)}}</p>
                  <p class="text-end font-weight-thin" v-if="currentUser.ID_ROLE === 2">50% sebagai uang jaminan.</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text class="px-5 mx-7 mt-2 text-center">
              <v-icon icon="mdi-account-credit-card" size="60" color="success"></v-icon>
              <p class="font-weight-medium">Pembayaran dapat dilakukan ke rekening BCA:</p>
              <p class="font-weight-bold">5105029341</p>
              <p class="font-weight-bold">Grand Atma Hotel</p>
            </v-card-text>
            <v-card-text class="px-5 mx-7 mt-0 text-center">
              <v-file-input variant="outlined" label="File Bukti Pembayaran" prepend-icon=""
                prepend-inner-icon="mdi-attachment" v-model="inputBuktiBayar"></v-file-input>
              <v-btn color="indigo-darken-2" :disabled="isButtonDisabled" @click="finishReservation">Lanjutkan Pembayaran</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" color="green">Berhasil</v-snackbar>
    </v-main>
  </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';

const inputBuktiBayar = ref(null)
const snackbar = ref(false)
const dataResume = ref()
const dataCurrentUser = ref()
const dataProfile = ref()
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const token = localStorage.getItem('token')

const breadcrumbs = [
  {
    title: 'Reservasi',
    disabled: false,
    href: '/dashboard/reservasi',
  },
  {
    title: 'Resume Pemesanan',
    disabled: false,
    href: '/dashboard/reservasi/resume',
  },
]

const finishReservation = async () => {
  localStorage.removeItem('resumePemesanan')

  try {
    const response = await axios.put(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/transaksi/finishTransaksi`, {
      idReservasi: dataResume.value.reservasi.ID_RESERVASI,
    }, {
      headers: {
        'Authorization': token
      }
    })

    snackbar.value = true
  } catch (error) {
    console.log(error)
  }

  setTimeout(() => {
    router.push('/dashboard')
  }, 3000);
}

const isButtonDisabled = computed(() => inputBuktiBayar.value === null || inputBuktiBayar.value === '')

const getProfile = async () => {
  try {
    const response = await axios.get(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/profile/${dataCurrentUser.value.ID_AKUN}`, {
      headers: {
        'Authorization': token
      }
    })
    dataProfile.value = response.data.data

    snackbar.value = true
  } catch (error) {
    console.log(error)
  }
}

const formattedPrice = (item) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(item);
}

onMounted(() => {
  dataResume.value = JSON.parse(localStorage.getItem('resumePemesanan'))
  dataCurrentUser.value = JSON.parse(localStorage.getItem('currentUser'))

  getProfile()
})
</script>

<style scoped>
.remainingPaymentTime {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  border-radius: 5%;
  z-index: 2000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>