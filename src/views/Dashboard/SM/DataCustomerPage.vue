<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title class="font-weight-bold">List Data Customer</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat maupun merubah data customer yang tersedia</v-card-subtitle>
        <v-card-text>
          <v-btn color="indigo" class="mb-5" @click="tambahItem()">Tambah Data</v-btn>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
            hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table v-if="listCustomer && listCustomer.length" :search="search" :items-per-page="5" :headers="headers"
            :items="listCustomer" class="elevation-2 bg-indigo-lighten-5" :item-key="listCustomer.ID_CUSTOMER">
          </v-data-table>
          <v-data-table v-else :search="search" :items-per-page="5" :headers="headers" :items="listCustomer"
            class="elevation-2 bg-indigo-lighten-5"></v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogTambah" width="600" height="auto">
        <v-card>
          <v-card-title>Tambah Data Baru</v-card-title>
          <v-card-subtitle>
            Inputkan data customer yang baru disini.
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Customer" v-model="formCustomer.NAMA_CUSTOMER"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Institusi" v-model="formCustomer.NAMA_INSTITUSI"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Email" v-model="formCustomer.EMAIL"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="No. Telp" v-model="formCustomer.NO_TELP"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Alamat" v-model="formCustomer.ALAMAT"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="flat" color="indigo-darken-2" block @click="saveTambahItem()">Tambah</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbarValue.show" :color="snackbarValue.color" elevation="24">{{ snackbarValue.text }}</v-snackbar>

    </v-main>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

const search = ref('')
const listCustomer = ref([])
const token = ref(localStorage.getItem('token'))
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

const dialogTambah = ref(false)

const formCustomer = ref({
  NAMA_CUSTOMER: '',
  NAMA_INSTITUSI: '',
  ALAMAT: '',
  NO_TELP: '',
  EMAIL: '',
  ID_AKUN: currentUser.value.ID_AKUN
})

const snackbarValue = ref({
  show: false,
  text: '',
  color: '',
})

const headers = [
  { title: 'Nama Customer', value: 'NAMA_CUSTOMER' },
  { title: 'Jenis Customer', value: 'JENIS_CUSTOMER' },
  { title: 'Nama Institusi', value: 'NAMA_INSTITUSI' },
  { title: 'Alamat', value: 'ALAMAT' },
  { title: 'No. Telp', value: 'NO_TELP' },
  { title: 'Email', value: 'EMAIL' },
]

const getAllCustomer = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/customerGroup/${currentUser.value.ID_AKUN}`, {
      headers: {
        'Authorization': token.value
      }
    })

    listCustomer.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const tambahItem = () => {
  dialogTambah.value = true
}

const saveTambahItem = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/v1/customerGroup/addCustomerGroup', formCustomer.value, {
      headers: {
        'Authorization': token.value
      }
    })

    snackbarValue.value = {
      show: true,
      text: 'Data berhasil ditambahkan',
      color: 'green-darken-2'
    }

    listCustomer.value.push(response.data.data)
    dialogTambah.value = false
  } catch (error) {
    snackbarValue.value = {
      show: true,
      text: `Internal Error.
        Trace: ${error}`,
      color: 'red-darken-2'
    }

    console.log(error)
  }
}

onMounted(() => {
  getAllCustomer()
})

</script>