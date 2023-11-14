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
            class="elevation-2 bg-indigo-lighten-5" :item-key="listReservasi.ID_RESERVASI" hover>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-eye-outline" color="indigo-darken-2" class="mr-2" @click="seeDetail(item)"
                density="comfortable"></v-btn>
              <v-btn icon="mdi-download" color="indigo-darken-2" class="mr-2" density="comfortable"
                @click="toPdf(item)"></v-btn>
              <v-btn icon="mdi-cancel" color="red-darken-2" density="comfortable"
                @click="confirmationDialog = true, reservationToCancel = item"
                v-if="item.STATUS === 'Sudah Bayar' || item.STATUS === 'Belum Bayar'"></v-btn>
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
            <div id="pdf">
              <v-card variant="outlined" class="py-5 px-5">
                <div class="text-center">
                  <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/logo.png?alt=media&token=c134b6af-1e0d-434e-b381-dcd077196515&_gl=1*a58tki*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5NzUyMjg4Ni4yNC4xLjE2OTc1MjI5MzYuMTAuMC4w"></v-img>
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
                <div class="text-start mt-4" v-if="bookingDetails.pegawai">
                  <p>ID Booking: <b>{{ bookingDetails.NO_RESERVASI }}</b></p>
                  <p>Nama: <b>{{ bookingDetails.pegawai.NAMA_PEGAWAI }}</b></p>
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
                <div class="text-right mt-3 mb-3">
                  <p>Sub Total: <b>{{ formattedPrice }}</b></p>
                </div>
                <div class="text-end mt-4" v-if="bookingDetails.invoice && bookingDetails.invoice.length > 0">
                  <p>Tax: <b>Rp{{ bookingDetails.invoice[0].TAX }}</b></p>
                  <p>TOTAL: <b>Rp{{ bookingDetails.TOTAL_BAYAR }}</b></p>
                  <p class="mt-4">Jaminan: <b>Rp{{ bookingDetails.invoice[0].JAMINAN }}</b></p>
                  <p>Deposit: <b>Rp{{ bookingDetails.invoice[0].DEPOSIT }}</b></p>
                  <p>Cash: <b>Rp{{ bookingDetails.invoice[0].SISA_KEKURANGAN }}</b></p>
                </div>
                <v-divider thickness="3" class="mt-4 mb-2"></v-divider>
                <p class="text-center">Thank You for Your Visit!</p>
                <v-divider thickness="3" class="mt-2 mb-2"></v-divider>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="confirmationDialog" max-width="600">
        <v-card color="indigo-darken-2">
          <v-card-title class="font-weight-bold">Konfirmasi Pembatalan</v-card-title>
          <v-card-subtitle>Apakah anda yakin untuk membatalkan reservasi ini?</v-card-subtitle>
          <v-card-text>
            Pengembalian Dana: <b>{{ refundAmount }}</b>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn @click="confirmationDialog = false" block>No</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="red-lighten-2" @click="batalkanReservasi(reservationToCancel)" block
                  variant="tonal">Yes</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbarVal.show" :color="snackbarVal.color">{{ snackbarVal.text }}</v-snackbar>

    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      confirmationDialog: false,
      reservationToCancel: ref(),
      search: '',
      token: '',
      snackbarVal: ref({
        show: false,
        text: '',
        color: ''
      }),
      listReservasi: ref([]),
      bookingDetails: ref([]),
      formUser: {
        username: '',
        role: ''
      },
      headers: [
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
        { title: 'Total Bayar', value: 'TOTAL_BAYAR' },
        { title: 'Status', value: 'STATUS' },
        { title: 'Action', value: 'actions' }
      ],
      dialogDetailReservasi: false,
      dialogPembatalanReservasi: false
    }
  },
  methods: {
    toPdf(item) {
      this.seeDetail(item)
      const opt = {
        margin: 1,
        filename: `Invoice - ${this.bookingDetails.NO_RESERVASI}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }

      const element = document.getElementById('pdf').innerHTML
      console.log(element)

      html2pdf(element, opt)
    },
    async seeDetail(item) {
      this.dialogDetailReservasi = true

      const bookingDetails = await axios.get(`http://localhost:4000/api/v1/detailReservasi/${item.ID_RESERVASI}`, {
        headers: {
          Authorization: this.token
        }
      })
      this.bookingDetails = bookingDetails.data.data
    },

    getStatus(val) {
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
    },
    formatDate(val) {
      const formattedDate = val.split('T')[0]

      return formattedDate
    },
    async batalkanReservasi(item) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/transaksi/cancelTransaksi/${item.ID_RESERVASI}`, {
          headers: {
            Authorization: this.token
          }
        })
        this.snackbarVal.show = true
        this.snackbarVal.text = 'Berhasil membatalkan reservasi'
        this.snackbarVal.color = 'green'

        this.confirmationDialog = false
      } catch (error) {
        this.snackbarVal.show = true
        this.snackbarVal.text = `Gagal membatalkan reservasi: ${error.response.data.message}`
        this.snackbarVal.color = 'red'
      }
    }
  },
  computed: {
    refundAmount() {
      const tglCheckin = new Date(this.reservationToCancel.TGL_CHECKIN)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const dayDiff = Math.floor((tglCheckin - today) / (1000 * 60 * 60 * 24))

      if (dayDiff >= 7) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(this.reservationToCancel.TOTAL_BAYAR)
      } else {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(0)
      }
    },
    totalHargaKamar() {
      let sum = 0
      if (this.bookingDetails) {
        if (this.bookingDetails.detail_reservasi_kamar) {
          this.bookingDetails.detail_reservasi_kamar.forEach((item) => {
            sum += item.TOTAL_HARGA_KAMAR;
          });
        }
      }

      return sum
    },
    totalHargaFasilitas() {
      let sum = 0
      if (this.bookingDetails.detail_reservasi_fasilitas) {
        this.bookingDetails.detail_reservasi_fasilitas.forEach((item) => {
          sum += item.TOTAL_HARGA_FASILITAS;
        });
      }

      return sum
    },
    formattedPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.totalHargaKamar + this.totalHargaFasilitas)
    }
  },
  async created() {
    this.token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    try {
      const result = await axios.get(`http://localhost:4000/api/v1/riwayatReservasi/${currentUser.ID_AKUN}`, {
        headers: {
          Authorization: this.token
        },
      })

      const formattedData = result.data.data.map(item => {
        return {
          ...item,
          STATUS: this.getStatus(item.STATUS)
        }
      })

      this.listReservasi = formattedData
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