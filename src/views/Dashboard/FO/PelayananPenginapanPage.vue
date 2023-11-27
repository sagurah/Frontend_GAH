<template>
  <div>
    <v-main>
      <v-card elevation="3">
        <v-card-title class="font-weight-bold">Pelayanan Penginapan</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melakukan transaksi check-in dan check-out sekaligus beberapa aksi
          reservasi</v-card-subtitle>
        <v-card-text>
          <v-tabs v-model="tab" bg-color="indigo-lighten-1" align-tabs="center" stacked>
            <v-tab value="1">
              <v-icon>mdi-bag-checked</v-icon>
              Semua
            </v-tab>
            <v-tab value="2">
              <v-icon>mdi-bag-carry-on</v-icon>
              Ready Check-in
            </v-tab>
            <v-tab value="3">
              <v-icon>mdi-bag-carry-on-off</v-icon>
              Ready Check-out
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="1">
              <v-text-field v-model="searchReservasi" prepend-inner-icon="mdi-magnify"
                label="P101020-1" class="bg-indigo-lighten-5" single-line hide-details density="compact">
              </v-text-field>
              <v-data-table class="elevation-2 bg-indigo-lighten-5" :items-per-page="5" :headers="headers"
                :items="listReservasi" hover :search="searchReservasi">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon="mdi-download" color="indigo-darken-2" density="comfortable" @click="cetakPdf(item)" v-if="item.STATUS === 'Sudah Check Out (Lunas)'"></v-btn>
                </template>
              </v-data-table>
            </v-window-item>
            <v-window-item value="2">
              <v-text-field v-model="searchReservasi" prepend-inner-icon="mdi-magnify"
                label="P101020-1" class="bg-indigo-lighten-5" single-line hide-details density="compact">
              </v-text-field>
              <v-data-table class="elevation-2 bg-indigo-lighten-5" :items-per-page="5" :headers="headers"
                :items="listReservasiCheckIn" hover :search="searchReservasi">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon="mdi-bag-carry-on" color="indigo-darken-2" class="" density="comfortable" @click="checkIn(item)"></v-btn>
                </template>
              </v-data-table>
            </v-window-item>
            <v-window-item value="3">
              <v-text-field v-model="searchReservasi" prepend-inner-icon="mdi-magnify"
                label="P101020-1" class="bg-indigo-lighten-5" single-line hide-details density="compact">
              </v-text-field>
              <v-data-table class="elevation-2 bg-indigo-lighten-5" :items-per-page="5" :headers="headers"
                :items="listReservasiCheckOut" hover :search="searchReservasi">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon="mdi-bag-carry-on-off" color="indigo-darken-2" density="comfortable" v-if="item.JENIS_CUSTOMER === 'Personal'" @click="checkoutPersonal(item)"></v-btn>
                  <v-btn icon="mdi-bag-carry-on-off" color="indigo-darken-2" density="comfortable" v-if="item.JENIS_CUSTOMER === 'Group'" @click="checkoutGroup(item)"></v-btn>
                  <v-btn icon="mdi-plus" color="indigo-darken-2" class="ml-2" density="comfortable" @click="openDialogFasilitas(item)"></v-btn>
                </template>
              </v-data-table>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogFasilitas" width="600" height="auto">
        <v-card>
          <v-card-title class="font-weight-bold">List Fasilitas Tersedia</v-card-title>
          <v-card-subtitle>Pada pop up ini anda bisa menambahkan fasilitas</v-card-subtitle>
          <v-card-text>
            <div v-for="(item, i) in listFasilitas" class="mb-3">
              <v-card color="indigo-darken-2">
                <v-card-title>{{ item.NAMA_FASILITAS }}</v-card-title>
                <v-card-subtitle>{{ item.SATUAN }} - {{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(item.HARGA) }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="indigo-lighten-5" variant="tonal" block @click="addFasilitas(item)">Tambah</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDetailReservasi" width="600" height="auto" scrollable>
        <v-card>
          <v-card-title class="font-weight-bold">Detail Reservasi</v-card-title>
          <v-card-subtitle>Pada halaman ini anda bisa melihat detail reservasi yang anda pilih.</v-card-subtitle>
          <v-card-text>
            <div id="pdf">
              <v-card variant="outlined" class="py-5 px-5">
                <div class="text-center">
                  <v-img
                    src="https://i.ibb.co/dbTn7nD/logo.jpg"></v-img>
                </div>
                <div class="text-center mt-4">
                  <p>Jl. P. Mangkubumi No.18, Yogyakarta 55233</p>
                </div>
                <br>
                <v-divider thickness="3"></v-divider>
                <div class="text-center">
                  <h3 class="font-weight-bold">INVOICE</h3>
                </div>
                <v-divider thickness="3"></v-divider>
                <div class="text-end mt-4">
                  <p>Tgl. Reservasi: <b>{{ bookingDetails.TGL_RESERVASI }}</b></p>
                </div>
                <div class="text-end" v-if="bookingDetails.pegawai">
                  <p>ID Invoice: <b>{{ bookingDetails.invoice[0].NO_INVOICE }}</b></p>
                  <p>Nama FO: <b>{{ bookingDetails.pegawai.NAMA_PEGAWAI }}</b></p>
                </div>
                <div class="text-start mt-4" v-if="bookingDetails.customer">
                  <p>ID Booking: <b>{{ bookingDetails.NO_RESERVASI }}</b></p>
                  <p>Nama: <b>{{ bookingDetails.customer.NAMA_CUSTOMER }}</b></p>
                  <p>Alamat: <b>{{ bookingDetails.customer.ALAMAT }}</b></p>
                </div>
                <v-divider thickness="3" class="mt-3"></v-divider>
                <div class="text-center">
                  <h3 class="font-weight-bold">DETAIL</h3>
                </div>
                <v-divider thickness="3" class="mb-3"></v-divider>
                <div class="text-start">
                  <p>Check In: <b>{{ bookingDetails.TGL_CHECKIN }}</b></p>
                  <p>Check Out: <b>{{ bookingDetails.TGL_CHECKOUT }}</b></p>
                  <p>Dewasa: <b>{{ bookingDetails.JML_DEWASA }}</b></p>
                  <p>Anak: <b>{{ bookingDetails.JML_ANAK }}</b></p>
                </div>
                <v-divider thickness="3" class="mt-3"></v-divider>
                <div class="text-center">
                  <h3 class="font-weight-bold">KAMAR</h3>
                </div>
                <v-divider thickness="3" class="mb-3"></v-divider>
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">No Kamar</th>
                      <th class="text-left">Bed</th>
                      <th class="text-left">Jumlah</th>
                      <th class="text-left">Harga</th>
                      <th class="text-left">Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(kamarItem, index) in bookingDetails.detail_reservasi_kamar">
                      <td>{{ kamarItem.tarif.kamar.NO_KAMAR }}</td>
                      <td>{{ kamarItem.tarif.kamar.JENIS_KAMAR }}</td>
                      <td>{{ kamarItem.tarif.kamar.JENIS_BED }}</td>
                      <td>Rp{{ kamarItem.tarif.TOTAL_TARIF }}</td>
                      <td>Rp{{ kamarItem.TOTAL_HARGA_KAMAR }}</td>
                    </tr>
                    <tr>
                      <td colspan="5" class="text-right"><b>Rp{{ totalHargaKamar }}</b></td>
                    </tr>
                  </tbody>
                </v-table>
                <v-divider thickness="3" class="mt-3"></v-divider>
                <div class="text-center">
                  <h3 class="font-weight-bold">FASILITAS</h3>
                </div>
                <v-divider thickness="3" class="mb-3"></v-divider>
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Fasilitas</th>
                      <th class="text-left">Jumlah</th>
                      <th class="text-left">Harga</th>
                      <th class="text-left">Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(fasilitasItem, index) in bookingDetails.detail_reservasi_fasilitas">
                      <td>{{ fasilitasItem.fasilitas_tambahan.NAMA_FASILITAS }}</td>
                      <td>{{ fasilitasItem.JUMLAH }}</td>
                      <td>Rp{{ fasilitasItem.fasilitas_tambahan.HARGA }}</td>
                      <td>Rp{{ fasilitasItem.TOTAL_HARGA_FASILITAS }}</td>
                    </tr>
                    <tr>
                      <td colspan="4" class="text-right"><b>Rp{{ totalHargaFasilitas }}</b></td>
                    </tr>
                  </tbody>
                </v-table>
                <div class="text-right mt-3 mb-3" v-if="bookingDetails.invoice && bookingDetails.invoice.length <= 0">
                  <p>Sub Total: <b>{{ formattedPrice }}</b></p>
                </div>
                <div class="text-end mt-4" v-if="bookingDetails.invoice && bookingDetails.invoice.length > 0">
                  <p>Tax: <b>Rp{{ bookingDetails.invoice[0].TAX }}</b></p>
                  <p>TOTAL: <b>Rp{{ bookingDetails.TOTAL_BAYAR }}</b></p>
                  <p class="mt-4">Jaminan: <b>Rp{{ bookingDetails.invoice[0].JAMINAN }}</b></p>
                  <p>Deposit: <b>Rp{{ bookingDetails.invoice[0].DEPOSIT }}</b></p>
                  <p class="mt-4" v-if="parseFloat(bookingDetails.invoice[0].SISA_KEKURANGAN) > 0">Cash Kembalian: <b>{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(bookingDetails.invoice[0].SISA_KEKURANGAN) }}</b></p>
                  <p class="mt-4" v-if="parseFloat(bookingDetails.invoice[0].SISA_KEKURANGAN) < 0">Cash Kekurangan: <b>{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(bookingDetails.invoice[0].SISA_KEKURANGAN) }}</b></p>
                </div>
                <v-divider thickness="3" class="mt-4 mb-2"></v-divider>
                <p class="text-center">Thank You for Your Visit!</p>
                <v-divider thickness="3" class="mt-2 mb-2"></v-divider>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbarVal.show" :color="snackbarVal.color">{{ snackbarVal.text }}</v-snackbar>

    </v-main>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const token = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

const snackbarVal = ref({
  show: false,
  text: '',
  color: ''
})

const dialogDetailReservasi = ref(false)
const dialogFasilitas = ref(false)
let idReservasi = ref()

const tab = ref()
const searchReservasi = ref('')
const listFasilitas = ref([])
const listReservasi = ref([])
const listReservasiCheckIn = ref([])
const listReservasiCheckOut = ref([])
const bookingDetails = ref([])

const headers = [
  {
    title: 'ID Booking',
    align: 'start',
    sortable: true,
    value: 'NO_RESERVASI',
    class: 'font-weight-bold'
  },
  { title: 'Tanggal Reservasi', value: 'TGL_RESERVASI' },
  { title: 'Tanggal Check In', value: 'TGL_CHECKIN' },
  { title: 'Tanggal Check Out', value: 'TGL_CHECKOUT' },
  { title: 'Status', value: 'STATUS' },
  { title: 'Nama Customer', value: 'customer.NAMA_CUSTOMER' },
  { title: 'Actions', value: 'actions' }
]

const getStatus = (val) => {
  switch (val) {
    case 0:
      return 'Belum Bayar'
    case 1:
      return 'Sudah Bayar'
    case 2:
      return 'Sudah Check In'
    case 3:
      return 'Sudah Check Out (Lunas)'
  }
}

const openDialogFasilitas = (item) => {
  getFasilitas()
  idReservasi.value = item.ID_RESERVASI

  dialogFasilitas.value = true
}

const openDialogDetailReservasi = async (item) => {
  dialogDetailReservasi.value = true

  const response = await axios.get(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/detailReservasi/${item.ID_RESERVASI}`, {
    headers: {
      Authorization: token
    }
  })
  bookingDetails.value = response.data.data
}

const cetakPdf = (item) => {
  openDialogDetailReservasi(item)

  setTimeout(() => {
    const element = document.getElementById('pdf')
    if (element) {
      html2canvas(element, { useCORS: true }).then(canvas => {
        const pdf = new jsPDF()
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 280)
        pdf.save(`Invoice - ${item.NO_RESERVASI}.pdf`)
      })
    }
  }, 3000)

  snackbarVal.value = {
    show: true,
    text: 'Sedang mengunduh pdf',
    color: 'info'
  }
}

const addFasilitas = async (item) => {
  try {
    await axios.put(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fo/addFasilitas/${idReservasi.value}`, {
      idFasilitas: item.ID_FASILITAS
    }, {
      headers: {
        Authorization: token
      }
    })

    snackbarVal.value = {
      show: true,
      text: 'Berhasil menambahkan fasilitas',
      color: 'success'
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal menambahkan fasilitas',
      color: 'error'
    }
  }
}

const totalHargaFasilitas = computed(() => {
  let sum = 0
  if (bookingDetails.value.detail_reservasi_fasilitas) {
    bookingDetails.value.detail_reservasi_fasilitas.forEach((item) => {
      sum += item.TOTAL_HARGA_FASILITAS;
    });
  }
  return sum
})

const totalHargaKamar = computed(() => {
  let sum = 0
  if (bookingDetails.value.detail_reservasi_kamar) {
    bookingDetails.value.detail_reservasi_kamar.forEach((item) => {
      sum += item.TOTAL_HARGA_KAMAR;
    });
  }
  return sum
})

const formatDate = (val) => {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

  const date = new Date(val)
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const getReservasi = async () => {
  try {
    const response = await axios.get(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/riwayatReservasi/`, {
      headers: {
        Authorization: token
      }
    })

    const formattedData = response.data.data.map((item) => {
      return {
        ...item,
        STATUS: getStatus(item.STATUS),
        TGL_RESERVASI: formatDate(item.TGL_RESERVASI),
        TGL_CHECKIN: formatDate(item.TGL_CHECKIN),
        TGL_CHECKOUT: formatDate(item.TGL_CHECKOUT)
      }
    })

    listReservasi.value = formattedData
    listReservasiCheckIn.value = listReservasi.value.filter((item) => item.STATUS === 'Sudah Bayar' && item.TGL_CHECKIN === formatDate(new Date()))
    listReservasiCheckOut.value = listReservasi.value.filter((item) => item.STATUS === 'Sudah Check In')

    snackbarVal.value = {
      show: true,
      text: 'Berhasil mendapatkan data reservasi',
      color: 'success'
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal mendapatkan data reservasi',
      color: 'error'
    }
  }
}

const getFasilitas = async () => {
  try {
    const response = await axios.get('https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fasilitasTambahan/getAllFasilitasTambahan', {
      headers: {
        Authorization: token
      }
    })

    listFasilitas.value = response.data.data

    snackbarVal.value = {
      show: true,
      text: 'Berhasil mendapatkan data fasilitas',
      color: 'success'
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal mendapatkan data fasilitas',
      color: 'error'
    }
  }
}

const checkIn = async (item) => {
  try {
    if (item.customer.JENIS_CUSTOMER === 'Personal') {
      const response = await axios.post(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fo/checkin`, {
        totalHarga: item.TOTAL_BAYAR,
        idFO: currentUser.ID_AKUN,
        idReservasi: item.ID_RESERVASI
      }, {
        headers: {
          Authorization: token
        }
      })
      
      snackbarVal.value = {
        show: true,
        text: 'Berhasil melakukan check-in',
        color: 'success'
      }
    } else if (item.customer.JENIS_CUSTOMER === 'Group') {
      const response = await axios.post(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fo/checkinGroup`, {
        totalHarga: item.TOTAL_BAYAR,
        idFO: currentUser.ID_AKUN,
        idReservasi: item.ID_RESERVASI
      }, {
        headers: {
          Authorization: token
        }
      })

      snackbarVal.value = {
        show: true,
        text: 'Berhasil melakukan check-in',
        color: 'success'
      }
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal melakukan check-in',
      color: 'error'
    }
  }
}

const checkoutPersonal = async (item) => {
  try {
    const response = await axios.put(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fo/checkout/${item.ID_RESERVASI}`, {
      // Null
    }, {
      headers: {
        Authorization: token
      }
    })

    snackbarVal.value = {
      show: true,
      text: 'Berhasil melakukan check-out',
      color: 'success'
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal melakukan check-out',
      color: 'error'
    }
  }
}

const checkoutGroup = async (item) => {
  try {
    const response = await axios.put(`https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/fo/checkoutGroup/${item.ID_RESERVASI}`, {
    }, {
      headers: {
        Authorization: token
      }
    })

    snackbarVal.value = {
      show: true,
      text: 'Berhasil melakukan check-out',
      color: 'success'
    }
  } catch (error) {
    snackbarVal.value = {
      show: true,
      text: 'Gagal melakukan check-out',
      color: 'error'
    }
  }
}

onMounted(() => {
  getReservasi()
})
</script>