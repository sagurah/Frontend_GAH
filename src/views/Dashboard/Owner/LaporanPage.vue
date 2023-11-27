<template>
  <div>
    <v-main>
      <v-card>
        <v-card-title class="font-weight-bold">Laporan Tahunan</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat laporan pendapatan yang tersedia.</v-card-subtitle>
        <div class="py-3 px-4">
          <v-divider></v-divider>
        </div>
        <v-card-text>
          <v-card color="indigo-lighten-4" class="pa-5">
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-3" elevation="4">
                  <v-card variant="outlined" class="py-5 px-5" v-if="dataLaporanCustomerBaru" id="laporan-customer-baru">
                    <v-img src="https://i.ibb.co/dbTn7nD/logo.jpg"></v-img>
                    <div class="text-center mt-4 mb-4">
                      <p>Jl. P. Mangkubumi No.18, Yogyakarta 55233</p>
                    </div>
                    <v-divider thickness="2"></v-divider>
                    <div class="text-center mt-4 mb-4">
                      <h2>LAPORAN CUSTOMER BARU</h2>
                    </div>
                    <div class="text-start mb-2">
                      <p>Tahun: {{ dataLaporanCustomerBaru.tahun }}</p>
                    </div>
                    <v-table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Bulan</th>
                          <th>Jumlah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in dataLaporanCustomerBaru.dataLaporan">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.bulan }}</td>
                          <td>{{ item.jumlah_customer }}</td>
                        </tr>
                        <tr>
                          <td class="text-right" colspan="5">Total Customer Baru: <b>{{
                            dataLaporanCustomerBaru.total_customer_baru }} customer</b></td>
                        </tr>
                      </tbody>
                    </v-table>
                    <div class="mt-4 pt-4">
                      <p>Dicetak pada tanggal <b>{{ dataLaporanCustomerBaru.tanggal_cetak }}</b></p>
                    </div>
                  </v-card>
                  <v-container>
                    <v-btn variant="elevated" color="indigo" block @click="cetakPdf('laporan-customer-baru')">Cetak PDF</v-btn>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3" elevation="4">
                  <v-card variant="outlined" class="px-3 py-3" v-if="dataLaporanPendapatan" id="laporan-pendapatan">
                    <v-img src="https://i.ibb.co/dbTn7nD/logo.jpg"></v-img>
                    <div class="text-center mt-4 mb-4">
                      <p>Jl. P. Mangkubumi No.18, Yogyakarta 55233</p>
                      <p>Telp. (0274) 487711</p>
                    </div>
                    <v-divider thickness="2"></v-divider>
                    <div class="text-center mt-4 mb-4">
                      <h2>LAPORAN PENDAPATAN</h2>
                    </div>
                    <div class="text-start mb-2">
                      <p>Tahun: {{ dataLaporanPendapatan.tahun }}</p>
                    </div>
                    <v-table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Bulan</th>
                          <th>Grup</th>
                          <th>Personal</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in dataLaporanPendapatan.dataLaporan">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.bulan }}</td>
                          <td>{{ item.pendapatan_grup }}</td>
                          <td>{{ item.pendapatan_personal }}</td>
                          <td>{{ item.pendapatan_per_bulan }}</td>
                        </tr>
                        <tr>
                          <td class="text-right" colspan="5">Total Pendapatan: <b>
                              {{ Intl.NumberFormat('id-ID', {
                                currency: 'IDR', style: 'currency'
                              }).format(dataLaporanPendapatan.total_pendapatan) }}</b></td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-btn block class="mt-2" variant="tonal" @click="createChartPendapatan" color="indigo" href="#grafik">Lihat
                          Grafik</v-btn>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn block class="mt-2" variant="elevated" @click="cetakPdf('laporan-pendapatan')" color="indigo">Cetak
                          PDF</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3" elevation="4">
                  <v-card variant="outlined" class="px-3 py-3" v-if="dataLaporanTamu" id="laporan-tamu">
                    <v-img src="https://i.ibb.co/dbTn7nD/logo.jpg"></v-img>
                    <div class="text-center mt-4 mb-4">
                      <p>Jl. P. Mangkubumi No.18, Yogyakarta 55233</p>
                      <p>Telp. (0274) 487711</p>
                    </div>
                    <v-divider thickness="2"></v-divider>
                    <div class="text-center mt-4 mb-4">
                      <h2>LAPORAN TAMU</h2>
                    </div>
                    <div class="text-start mb-2">
                      <p>Tahun: {{ dataLaporanTamu.tahun }}</p>
                    </div>
                    <v-table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Jenis Kamar</th>
                          <th>Grup</th>
                          <th>Personal</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in dataLaporanTamu.dataLaporan">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.jenis_kamar }}</td>
                          <td>{{ item.Group }}</td>
                          <td>{{ item.Personal }}</td>
                          <td>{{ item.Total }}</td>
                        </tr>
                        <tr>
                          <td class="text-right" colspan="5">Total Tamu: <b>{{ dataLaporanTamu.total_tamu }} tamu</b></td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-btn block class="mt-2" variant="tonal" @click="createChartTamu" color="indigo" href="#grafik">Lihat
                          Grafik</v-btn>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn block class="mt-2" variant="elevated" @click="cetakPdf('laporan-tamu')" color="indigo">Cetak
                          PDF</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3" elevation="4">
                  <v-card variant="outlined" class="px-3 py-3" v-if="dataTop5Customer" id="laporan-top-5">
                    <div class="text-center">
                      <v-img src="https://i.ibb.co/dbTn7nD/logo.jpg"></v-img>
                      <div class="text-center mt-4 mb-4">
                        <p>Jl. P. Mangkubumi No.18, Yogyakarta 55233</p>
                        <p>Telp. (0274) 487711</p>
                      </div>
                      <v-divider thickness="2"></v-divider>
                      <div class="text-center mt-4 mb-4">
                        <h2>LAPORAN TOP 5 CUSTOMER</h2>
                      </div>
                      <div class="text-start mb-2">
                        <p>Tahun: {{ new Date().getFullYear() }}</p>
                      </div>
                      <v-table>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Customer</th>
                            <th>Jumlah Reservasi</th>
                            <th>Total Pembayaran</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in dataTop5Customer.dataLaporan">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama_customer }}</td>
                            <td>{{ item.jumlah_reservasi }}</td>
                            <td>{{ item.total_pembayaran }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                      <p class="mt-5">Dicetak pada tanggal: <b>{{ dataTop5Customer.tanggal_cetak }}</b></p>
                    </div>
                  </v-card>
                  <v-container>
                    <v-btn block variant="elevated" color="indigo" @click="cetakPdf('laporan-top-5')">Cetak PDF</v-btn>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4" thickness="2"></v-divider>
            <div id="grafik">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card>
                    <v-card-title>Grafik Pendapatan</v-card-title>
                    <v-card-text>
                      <canvas id="chart-pendapatan"></canvas>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card>
                    <v-card-title>Grafik Tamu</v-card-title>
                    <v-card-text>
                      <canvas id="chart-tamu"></canvas>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-card-text>
      </v-card>

      <v-snackbar v-model="snackbarCetakPdf" color="warning">Sedang mencetak pdf...</v-snackbar>

    </v-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const snackbarCetakPdf = ref(false)

const dataLaporanCustomerBaru = ref()
const dataLaporanPendapatan = ref({
  dataLaporan: [],
  tanggal_cetak: '',
  tahun: 0,
  total_pendapatan_grup: 0,
  total_pendapatan_personal: 0,
  total_pendapatan: 0
})
const dataLaporanTamu = ref()
const dataTop5Customer = ref()

const token = localStorage.getItem('token')

const getDataLaporanCustomerBaru = async () => {
  try {
    const response = await axios.get('https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/laporan/laporanCustomerBaru', {
      headers: {
        Authorization: token
      }
    })

    dataLaporanCustomerBaru.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const getDataLaporanPendapatan = async () => {
  try {
    const response = await axios.get('https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/laporan/laporanPendapatan', {
      headers: {
        Authorization: token
      }
    })

    dataLaporanPendapatan.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const getDataLaporanTamu = async () => {
  try {
    const response = await axios.get('https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/laporan/laporanTamu', {
      headers: {
        Authorization: token
      }
    })

    dataLaporanTamu.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const getTop5Customer = async () => {
  try {
    const response = await axios.get('https://grandatma-api-8af872fa0845.herokuapp.com/api/v1/laporan/laporanTop5', {
      headers: {
        Authorization: token
      }
    })

    dataTop5Customer.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const cetakPdf = (item) => {
  const doc = new jsPDF()

  setTimeout(() => {
    const element = document.querySelector(`#${item}`)

    if (element) {
      html2canvas(element, { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        doc.addImage(imgData, 'PNG', 0, 0, 180, 280)
        doc.save(`Laporan.pdf`)
      })
    }
  }, 3000);

  snackbarCetakPdf.value = true
}

const createChartPendapatan = () => {
  
  const context = document.querySelector('#chart-pendapatan')

  new Chart(context, {
    type: 'bar',
    data: {
      labels: dataLaporanPendapatan.value.dataLaporan.map(item => item.bulan),
      datasets: [
        {
          label: 'Pendapatan Grup',
          data: dataLaporanPendapatan.value.dataLaporan.map(item => item.pendapatan_grup),
        },
        {
          label: 'Pendapatan Personal',
          data: dataLaporanPendapatan.value.dataLaporan.map(item => item.pendapatan_personal),
        },
        {
          label: 'Total Pendapatan',
          data: dataLaporanPendapatan.value.dataLaporan.map(item => item.pendapatan_per_bulan),
        }
      ]
    },
  })
}

const createChartTamu = () => {
  const context = document.querySelector('#chart-tamu')

  new Chart(context, {
    type: 'bar',
    data: {
      labels: dataLaporanTamu.value.dataLaporan.map(item => item.jenis_kamar),
      datasets: [
        {
          label: 'Tamu Grup',
          data: dataLaporanTamu.value.dataLaporan.map(item => item.Group),
        },
        {
          label: 'Tamu Personal',
          data: dataLaporanTamu.value.dataLaporan.map(item => item.Personal),
        },
        {
          label: 'Total Tamu',
          data: dataLaporanTamu.value.dataLaporan.map(item => item.Total),
        }
      ]
    },
  })
}

onMounted(() => {
  getDataLaporanCustomerBaru()
  getDataLaporanPendapatan()
  getDataLaporanTamu()
  getTop5Customer()
})
</script>

<style>
* {
  scroll-behavior: smooth;
}
</style>