<template>
  <div>
    <v-main>
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
          <v-card class="mx-2 mb-2" color="indigo-lighten-1" v-if="dataResume.fasilitas.length">
              <v-card-text>
                <div v-for="(item, i) in dataResume.fasilitas">
                  <v-row>
                    <v-col cols="12" md="6">
                      <p class="text-start font-weight-bold">{{ item.NAMA_FASILITAS }} x 1</p>
                    </v-col>
                    <v-col cols="12" md="6">
                      <p class="text-end font-weight-bold">{{ formattedPrice(item.HARGA_FASILITAS) }}</p>
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
                  <p class="text-end font-weight-bold">{{ formattedPrice(dataResume.reservasi.TOTAL_BAYAR) }}</p>
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
              <v-file-input variant="outlined" label="File Bukti Pembayaran" prepend-icon="" prepend-inner-icon="mdi-attachment" v-model="inputBuktiBayar"></v-file-input>
              <v-btn color="indigo-darken-2" :disabled="isButtonDisabled">Lanjutkan Pembayaran</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';

const inputBuktiBayar = ref(null)

const dataResume = ref()
const dataCurrentUser = ref()
const dataProfile = ref()
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

const isButtonDisabled = computed(() => inputBuktiBayar.value === null || inputBuktiBayar.value === '')

const getProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/profile/${dataCurrentUser.value.ID_AKUN}`, {
      headers: {
        'Authorization': token
      }
    })
    dataProfile.value = response.data.data
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