<template>
  <div>
    <v-main>
      <v-card elevation="5" v-if="formUser.role === 'Customer' || 'SM'">
        <v-card-title class="font-weight-bold">Riwayat Transaksi</v-card-title>
        <v-card-subtitle>
          Pada halaman ini anda dapat melihat riwayat transaksi yang pernah anda lakukan.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
            hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table :search="search" :items-per-page="5" :headers="headers" :items="listReservasi"
            class="elevation-2 bg-indigo-lighten-5" :item-key="listReservasi.ID_RESERVASI">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-eye-outline" color="indigo-darken-2" class="mr-2" @click="seeDetail(item)"
                density="comfortable"></v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card elevation="5" v-else>
        <v-card-title class="font-weight-bold">Riwayat Transaksi</v-card-title>
        <v-card-subtitle>
          Anda tidak memiliki riwayat transaksi.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
            hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table :search="search" :items-per-page="5" :headers="headers" :items="listReservasi"
            class="elevation-2 bg-indigo-lighten-5" :item-key="listReservasi.ID_RESERVASI">
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialogDetailReservasi" width="600" height="auto" scrollable>
        <v-card>
          <v-card-title class="font-weight-bold">Detail Reservasi</v-card-title>
          <v-card-subtitle>Pada halaman ini anda bisa melihat detail reservasi yang anda pilih.</v-card-subtitle>
          <v-card-text>
            <v-card class="bg-indigo-lighten-1 mb-2">
              <v-card-title>Reservasi</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field readonly label="Tanggal Reservasi"
                      v-model="bookingDetails.TGL_RESERVASI"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field readonly label="Tanggal Check In" v-model="bookingDetails.TGL_CHECKIN"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field readonly label="Tanggal Check Out" v-model="bookingDetails.TGL_CHECKOUT"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field readonly label="Jumlah Dewasa" v-model="bookingDetails.JML_DEWASA"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field readonly label="Jumlah Anak" v-model="bookingDetails.JML_ANAK"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field readonly label="Total Bayar" v-model="bookingDetails.TOTAL_BAYAR"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-card class="bg-indigo-lighten-1 mt-2 mb-2">
              <v-card-title>Detail Kamar</v-card-title>
              <v-card-text>
                <v-card class="bg-indigo-lighten-2 mb-2" v-for="(kamarItem, index) in bookingDetails.detail_reservasi_kamar" :key="kamarItem.ID_DETAIL_RESERVASI_KAMAR">
                  <v-card-title class="text-body-1">Detail Kamar - {{ index + 1 }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field readonly variant="outlined" label="Jumlah" v-model="kamarItem.JUMLAH"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field readonly variant="outlined" label="Total Harga Kamar" v-model="kamarItem.TOTAL_HARGA_KAMAR"></v-text-field>
                      </v-col>
                    </v-row> 
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-card class="bg-indigo-lighten-1 mt-2 mb-2">
              <v-card-title>Detail Fasilitas</v-card-title>
              <v-card-text>
                <v-card class="bg-indigo-lighten-2 mb-2" v-for="(fasilitasItem, index) in bookingDetails.detail_reservasi_fasilitas" :key="fasilitasItem.ID_DETAIL_RESERVASI_FASILITAS">
                  <v-card-title class="text-body-1">Detail Fasilitas - {{ index + 1 }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field readonly variant="outlined" label="Jumlah" v-model="fasilitasItem.JUMLAH"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field readonly variant="outlined" label="Total Harga Fasilitas" v-model="fasilitasItem.TOTAL_HARGA_FASILITAS"></v-text-field>
                      </v-col>
                    </v-row> 
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>

      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      search: '',
      token: '',
      listReservasi: ref([]),
      bookingDetails: ref([{}]),
      formUser: {
        username: '',
        role: ''
      },
      headers: [
        {
          title: 'ID Reservasi',
          align: 'start',
          sortable: true,
          value: 'ID_RESERVASI',
          class: 'font-weight-bold'
        },
        { title: 'Tanggal Reservasi', value: 'TGL_RESERVASI' },
        { title: 'Tanggal Check In', value: 'TGL_CHECKIN' },
        { title: 'Tanggal Check Out', value: 'TGL_CHECKOUT' },
        { title: 'Total Bayar', value: 'TOTAL_BAYAR' },
        { title: 'Action', value: 'actions' }
      ],
      dialogDetailReservasi: false
    }
  },
  methods: {
    async seeDetail(item) {
      this.dialogDetailReservasi = true

      const bookingDetails = await axios.get(`http://localhost:4000/api/v1/riwayatReservasi/${item.ID_RESERVASI}`, {
        headers: {
          Authorization: this.token
        }
      })

      this.bookingDetails = bookingDetails.data.data
    }
  },
  async created() {
    this.token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    try {
      const config = {
        headers: {
          Authorization: this.token
        },
        body: currentUser
      }

      const result = await axios.get(`http://localhost:4000/api/v1/riwayatReservasi`, config)

      this.listReservasi = result.data.data
    } catch (err) {
      console.log(err)
    }

    const idRole = currentUser.ID_ROLE
    this.formUser.username = currentUser.USERNAME

    if (idRole === 1) {
      this.formUser.role = 'Admin'
    } else if (idRole === 2) {
      this.formUser.role = 'SM'
    } else if (idRole === 3) {
      this.formUser.role = 'FO'
    } else if (idRole === 4) {
      this.formUser.role = 'Customer'
    } else if (idRole === 5) {
      this.formUser.role = 'Owner & GM'
    } else {
      this.formUser.role = 'Unknown'
    }

  }
}
</script>