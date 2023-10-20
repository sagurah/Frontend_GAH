<template>
  <div>
    <v-main>
      <v-card elevation="5" v-if="formUser.role === 'Customer' || 'SM'">
        <v-card-title class="font-weight-bold">Riwayat Transaksi</v-card-title>
        <v-card-subtitle>
          Pada halaman ini anda dapat melihat riwayat transaksi yang pernah anda lakukan.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table :search="search" :items-per-page="5" :headers="headers" :items="listReservasi" class="elevation-2 bg-indigo-lighten-5"
            :item-key="listReservasi.ID_RESERVASI">
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card elevation="5" v-else>
        <v-card-title class="font-weight-bold">Riwayat Transaksi</v-card-title>
        <v-card-subtitle>
          Anda tidak memiliki riwayat transaksi.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table :search="search" :items-per-page="5" :headers="headers" :items="listReservasi" class="elevation-2 bg-indigo-lighten-5"
            :item-key="listReservasi.ID_RESERVASI">
          </v-data-table>
        </v-card-text>
      </v-card>
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
        { title: 'Jenis Kamar', value: 'TGL_CHECKIN' },
        { title: 'Jenis Bed', value: 'TGL_CHECKOUT' },
        { title: 'Kapasitas(orang)', value: 'TOTAL_BAYAR' },
        { title: 'Action', value: 'action' }
      ],
    }
  },
  methods: {
    
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