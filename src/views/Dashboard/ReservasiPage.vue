<template>
  <div>
    <v-main>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-card elevation="4">
        <v-card-title class="font-weight-bold">Reservasi</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melakukan reservasi.</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="date" label="Input Start Date" v-model="inputDate.startDate"
                :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field type="date" label="Input End Date" v-model="inputDate.endDate"
                :rules="[rules.required]"></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="indigo" @click="getKamarReady"
            :disabled="inputDate.startDate === '' || inputDate.endDate === ''">Temukan Kamar</v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-card-title class="font-weight-bold text-center mb-3">Kamar dan Fasilitas Tambahan</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" v-model="searchKamar" prepend-inner-icon="mdi-magnify" label="Search"
                  single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
                <v-data-table v-if="listKamar && listKamar.length" :headers="headersKamar" :search="searchKamar"
                  :items="listKamar" class="elevation-3 bg-indigo-lighten-5" items-per-page="5">
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon="mdi-plus" color="indigo-darken-2" @click="addToCart(item)" density="comfortable"></v-btn>
                  </template>
                </v-data-table>
                <v-data-table v-else class="elevation-3 bg-indigo-lighten-5"></v-data-table>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" v-model="searchFasilitas" prepend-inner-icon="mdi-magnify" label="Search"
                  single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
                <v-data-table v-if="listFasilitas && listFasilitas.length" :headers="headersFasilitas" :search="searchFasilitas"
                  :items="listFasilitas" class="elevation-3 bg-indigo-lighten-5" items-per-page="5">
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon="mdi-plus" color="indigo-darken-2" @click="addToCartFasilitas(item)"
                      density="comfortable"></v-btn>
                  </template>
                </v-data-table>
                <v-data-table v-else class="elevation-3 bg-indigo-lighten-5"></v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-text>
      </v-card>

      <v-btn class="btn-cart elevation-4" icon="mdi-cart" size="large" color="indigo" @click="dialogCart = true"></v-btn>

      <v-dialog v-model="dialogCart" height="auto" width="800" scrollable>
        <v-card>
          <v-card-title class="font-weight-bold">List Cart</v-card-title>
          <v-card-subtitle>Pada halaman ini anda bisa melihat kamar yang ada dikeranjang anda.</v-card-subtitle>
          <v-card-text>
            <v-card class="pa-3">
              <div class="py-3 my-3">
                <v-divider></v-divider>
              </div>
              <v-card color="indigo" class="mt-2" v-if="listKamarCart.length" v-for="(item, i) in listKamarCart">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-title class="font-weight-bold">Kamar [No.{{ item.NO_KAMAR }}]</v-card-title>
                      <v-card-subtitle>{{ item.JENIS_KAMAR }}</v-card-subtitle>
                      <v-card-subtitle>Rp{{ item.tarif[0].TOTAL_TARIF }} x {{ diffDays }} hari</v-card-subtitle>
                      <v-card-subtitle>{{ item.tarif[0].season.JENIS_SEASON }}</v-card-subtitle>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card-text class="text-end">
                        <v-btn icon="mdi-eye" class="elevation-4 mr-2" size="x-large" color="indigo-lighten-2"
                          @click="seeDetail(item)"></v-btn>
                        <v-btn icon="mdi-trash-can-outline" size="x-large" color="red-darken-2" class="elevation-4"
                          @click="removeItemKamar(item)"></v-btn>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <div class="py-3 my-3">
                <v-divider></v-divider>
              </div>
              <v-card color="blue-darken-2" class="mt-2" v-if="listFasilitasCart.length"
                v-for="(item, i) in listFasilitasCart">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-title class="font-weight-bold">Fasilitas [{{ item.NAMA_FASILITAS }}]</v-card-title>
                      <v-card-subtitle>{{ item.SATUAN }}</v-card-subtitle>
                      <v-card-subtitle>Rp{{ item.HARGA }}</v-card-subtitle>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card-text class="text-end">
                        <v-btn icon="mdi-trash-can-outline" size="x-large" color="red-darken-2" class="elevation-4"
                          @click="removeItemFasilitas(item)"></v-btn>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card v-else color="indigo-darken-3">
                <v-card-text>No data available.</v-card-text>
              </v-card>
              <div class="py-3 my-3">
                <v-divider></v-divider>
              </div>
            </v-card>
          </v-card-text>
          <v-card-title>
            <v-btn block color="indigo-darken-3" @click="openDialogDataPemesan">Lanjut</v-btn>
          </v-card-title>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDataPemesanCustomer" scrollable height="auto" width="800">
        <v-card>
          <v-card-title class="font-weight-bold">Data Pemesan</v-card-title>
          <v-card-subtitle>Disini anda dapat melihat data pribadi anda untuk pemesanan</v-card-subtitle>
          <v-card-text>
            <v-row v-if="dataProfile">
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Nama" v-model="dataProfile.customer[0].NAMA_CUSTOMER" readonly></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Nomor Telepon" v-model="dataProfile.customer[0].NO_TELP" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <v-select variant="outlined" :items="listCustomer" label="Select Customer" item-value="ID_CUSTOMER" item-title="NAMA_CUSTOMER" v-model="selectedCustomer"></v-select>
              </v-col>
            </v-row>
            <div class="mb-4">
              <v-divider></v-divider>
            </div>
            <v-row>
              <v-col cols="12">
                <v-text-field variant="outlined" label="Total Bayar" v-model="formattedPrice"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field variant="outlined" label="Tanggal Check In" v-model="inputDate.startDate" readonly></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Tanggal Reservasi" v-model="today" readonly></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field variant="outlined" label="Tanggal Check Out" v-model="inputDate.endDate" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Jumlah Dewasa" v-model="dataPemesanan.jumlahDewasa" :rules="[rules.required]" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined" label="Jumlah Anak" v-model="dataPemesanan.jumlahAnak" :rules="[rules.required]" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-subtitle>
            *Check in pada tanggal {{ inputDate.startDate }} pukul 14.00 dan check out pada tanggal {{ inputDate.endDate }} pukul 12.00
          </v-card-subtitle>
          <v-card-title class="text-center">
            <v-row>
              <v-col cols="12" md="3">
                <v-btn block color="warning" @click="dialogDataPemesanCustomer = false">Kembali</v-btn>
              </v-col>
              <v-col cols="12" md="9">
                <v-btn block :disabled="dataPemesanan.jumlahAnak === '' || dataPemesanan.jumlahDewasa === ''" color="indigo-darken-2" @click="checkout" v-if="currentUser.ID_ROLE === 4">Checkout</v-btn>
                <v-btn block :disabled="dataPemesanan.jumlahAnak === '' || dataPemesanan.jumlahDewasa === ''" color="indigo-darken-2" @click="checkoutSM" v-if="currentUser.ID_ROLE === 2">Checkout</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogKamar" height="auto" width="800" scrollable>
        <v-card>
          <v-card-title class="font-weight-bold">Detail</v-card-title>
          <v-card-subtitle>Pada halaman ini anda bisa melihat detail kamar yang ada dikeranjang anda.</v-card-subtitle>
          <v-card-text>
            <v-card color="indigo-lighten-1 mb-3 pa-2" v-for="(item, i) in listKamarCart">
              <v-card-title>Kamar {{ item.JENIS_KAMAR }} - No [{{ item.NO_KAMAR }}]</v-card-title>
              <v-card-text>
                <v-table class="elevation-5">
                  <thead>
                    <tr>
                      <th class="text-left">Jenis Bed</th>
                      <th class="text-left">Kapasitas (orang)</th>
                      <th class="text-left">Luas Kamar (meter)</th>
                      <th class="text-left">Fasilitas</th>
                      <th class="text-left">Total Tarif Kamar</th>
                    </tr>
                    <tr>
                      <td>{{ item.JENIS_BED }}</td>
                      <td>{{ item.KAPASITAS }}</td>
                      <td>{{ item.LUAS_KAMAR }}</td>
                      <td>{{ item.FASILITAS }}</td>
                      <td>{{ item.tarif[0].TOTAL_TARIF }} x {{ diffDays }}</td>
                    </tr>
                  </thead>
                </v-table>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-btn block color="indigo-darken-2" @click="dialogKamar = false; dialogCart = true">Kembali</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbarValue.show" :color="snackbarValue.color">{{ snackbarValue.text }}</v-snackbar>
    </v-main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import router from '@/router';

const today = new Date().toISOString().substring(0, 10)

const resumePemesanan = ref()

const breadcrumbs = [
  {
    title: 'Reservasi',
    disabled: false,
    href: '/dashboard/reservasi'
  },
  {
    title: 'Resume Pemesanan',
    disabled: false,
    href: '/dashboard/reservasi/resume'
  }
]
const currentUser = ref()
const dataProfile = ref()
const dataPemesanan = ref({
  jumlahAnak: '',
  jumlahDewasa: '',
})

const listCustomer = ref([])
const listKamar = ref([])
const listFasilitas = ref([])
const listKamarCart = ref([])
const listFasilitasCart = ref([])
const token = localStorage.getItem('token')
const selectedCustomer = ref()

const snackbarValue = ref({
  show: false,
  text: '',
  color: ''
})
const searchKamar = ref('')
const searchFasilitas = ref('')
const dialogCart = ref(false)
const dialogKamar = ref(false)
const dialogDataPemesanCustomer = ref(false)
const inputDate = ref({
  startDate: '',
  endDate: ''
})

const rules = ref({
  required: value => !!value || 'Field is required.'
})

const headersKamar = [
  { title: 'No. Kamar', value: 'NO_KAMAR' },
  { title: 'Jenis Kamar', value: 'JENIS_KAMAR' },
  { title: 'Harga', value: 'tarif[0].TOTAL_TARIF' },
  { title: 'Season', value: 'tarif[0].season.JENIS_SEASON' },
  { title: 'Actions', value: 'actions' }
]

const headersFasilitas = [
  { title: 'Nama Fasilitas', value: 'NAMA_FASILITAS' },
  { title: 'Satuan', value: 'SATUAN' },
  { title: 'Harga', value: 'HARGA' },
  { title: 'Actions', value: 'actions' }
]

const getKamarReady = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/transaksi/getKamarReady?startDate=${inputDate.value.startDate}&endDate=${inputDate.value.endDate}`, {
      headers: {
        'Authorization': token
      }
    })

    listKamar.value = response.data.data.map(item => {
      item.tarif[0].TOTAL_TARIF = countTotalPrice(item);
      return item;
    });

    snackbarValue.value = {
      show: true,
      text: 'Data kamar available berhasil diambil...',
      color: 'success'
    }
  } catch (error) {
    snackbarValue.value = {
      show: true,
      text: `Data kamar available gagal diambil`,
      color: 'error'
    }
  }
}

const addToCartFasilitas = (item) => {
  const isItemInCart = listFasilitasCart.value.some(cartItem => cartItem.NAMA_FASILITAS === item.NAMA_FASILITAS)

  if (isItemInCart) {
    snackbarValue.value = {
      show: true,
      text: 'Item is already in cart',
      color: 'warning'
    }
  } else {
    listFasilitasCart.value.push(item)
    snackbarValue.value = {
      show: true,
      text: 'Item added to cart',
      color: 'success'
    }
  }
}

const addToCart = (item) => {
  const isItemInCart = listKamarCart.value.some(cartItem => cartItem.NO_KAMAR === item.NO_KAMAR)
  if (isItemInCart) {
    snackbarValue.value = {
      show: true,
      text: 'Item is already in cart',
      color: 'warning'
    }
  } else {
    listKamarCart.value.push(item)
    snackbarValue.value = {
      show: true,
      text: 'Item added to cart',
      color: 'success'
    }
  }
}

const removeItemKamar = (item) => {
  const index = listKamarCart.value.indexOf(item)
  listKamarCart.value.splice(index, 1)
}

const removeItemFasilitas = (item) => {
  const index = listFasilitasCart.value.indexOf(item)
  listFasilitasCart.value.splice(index, 1)
}

const seeDetail = () => {
  if (listKamarCart.value.length) {
    dialogCart.value = false
    dialogKamar.value = true
  } else {
    snackbarValue.value = {
      show: true,
      text: 'Cart is empty',
      color: 'warning'
    }
  }
}

const openDialogDataPemesan = () => {
  if (listKamarCart.value.length) {
    dialogDataPemesanCustomer.value = true
  } else {
    snackbarValue.value = {
      show: true,
      text: 'Anda belum memesan kamar',
      color: 'warning'
    }
  }
}

const countTotalPrice = (item) => {
  const baseTarif = item.tarif[0].TOTAL_TARIF;
  const basePercentage = item.tarif[0].season.HARGA;
  let finalPrice = baseTarif;

  if (item.tarif[0].season.JENIS_SEASON === 'High Season') {
    finalPrice = baseTarif + (baseTarif * (basePercentage / 100));
  } else if (item.tarif[0].season.JENIS_SEASON === 'Promo Season') {
    finalPrice = baseTarif - (baseTarif * (basePercentage / 100));
  }

  return finalPrice;
}

const countTotalPriceToPay = computed(() => {
  return countTotalHargaKamar.value + countTotalHargaFasilitas.value;
})

const countTotalHargaKamar = computed(() => {
  let totalPrice = 0;

  listKamarCart.value.forEach(item => {
    totalPrice += item.tarif[0].TOTAL_TARIF;
  });

  return totalPrice;
})

const countTotalHargaFasilitas = computed(() => {
  let totalPrice = 0;

  listFasilitasCart.value.forEach(item => {
    totalPrice += item.HARGA;
  });

  return totalPrice;

})

const diffDays = computed(() => {
  const difference = new Date(inputDate.value.endDate) - new Date(inputDate.value.startDate);

  return difference * 1 / (1000 * 60 * 60 * 24)
})

const formattedPrice = computed(() => {
  const calculated = (countTotalHargaKamar.value * diffDays.value) + countTotalHargaFasilitas.value;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(calculated);
})

const checkoutSM = async () => {
  try {
    const kamarTarifIds = listKamarCart.value.map(item => item.tarif[0].ID_TARIF)
    const fasilitasIds = listFasilitasCart.value.map(item => item.ID_FASILITAS)
    const kamarTarifHarga = listKamarCart.value.map(item => item.tarif[0].TOTAL_TARIF)
    const fasilitasHarga = listFasilitasCart.value.map(item => item.HARGA)
    
    const response = await axios.post('http://localhost:4000/api/v1/transaksi/addTransaksiSM', {
      tglReservasi: today,
      tglCheckin: inputDate.value.startDate,
      tglCheckout: inputDate.value.endDate,
      jmlDewasa: dataPemesanan.value.jumlahDewasa,
      jmlAnak: dataPemesanan.value.jumlahAnak,
      totalBayar: (countTotalHargaKamar.value * diffDays.value) + countTotalHargaFasilitas.value,
      idCustomer: selectedCustomer.value,
      hargaKamar: kamarTarifHarga,
      hargaFasilitas: fasilitasHarga,
      kamarTarifIds,
      fasilitasIds
    }, {
      headers: {
        'Authorization': token
      }
    })

    resumePemesanan.value = response.data.data

    localStorage.setItem('resumePemesanan', JSON.stringify(resumePemesanan.value))

    dialogCart.value = false
    dialogDataPemesanCustomer.value = false

    listKamarCart.value = []
    listFasilitas.value = []

    setTimeout(() => {
      router.push('/dashboard/reservasi/resume')
    }, 3000);

    snackbarValue.value = {
      show: true,
      text: 'Checkout berhasil, anda akan dialihkan ke halaman resume pemesanan.',
      color: 'success'
    }
  } catch (error) {
    console.log(response.data)
    console.log(error)
    console.log(error.message)
    snackbarValue.value = {
      show: true,
      text: `Checkout gagal, pastikan data yang anda inputkan sudah sesuai. `,
      color: 'error'
    }
  }
}

const checkout = async () => {
  try {
    const kamarTarifIds = listKamarCart.value.map(item => item.tarif[0].ID_TARIF)
    const fasilitasIds = listFasilitasCart.value.map(item => item.ID_FASILITAS)
    const kamarTarifHarga = listKamarCart.value.map(item => item.tarif[0].TOTAL_TARIF)
    const fasilitasHarga = listFasilitasCart.value.map(item => item.HARGA)
    
    const response = await axios.post('http://localhost:4000/api/v1/transaksi/addTransaksiCustomer', {
      tglReservasi: today,
      tglCheckin: inputDate.value.startDate,
      tglCheckout: inputDate.value.endDate,
      jmlDewasa: dataPemesanan.value.jumlahDewasa,
      jmlAnak: dataPemesanan.value.jumlahAnak,
      totalBayar: (countTotalHargaKamar.value * diffDays.value) + countTotalHargaFasilitas.value,
      idAkun: currentUser.value.ID_AKUN,
      hargaKamar: kamarTarifHarga,
      hargaFasilitas: fasilitasHarga,
      kamarTarifIds,
      fasilitasIds
    }, {
      headers: {
        'Authorization': token
      }
    })

    resumePemesanan.value = response.data.data

    localStorage.setItem('resumePemesanan', JSON.stringify(resumePemesanan.value))

    dialogCart.value = false
    dialogDataPemesanCustomer.value = false

    listKamarCart.value = []
    listFasilitas.value = []

    setTimeout(() => {
      router.push('/dashboard/reservasi/resume')
    }, 3000);

    snackbarValue.value = {
      show: true,
      text: 'Checkout berhasil, anda akan dialihkan ke halaman resume pemesanan.',
      color: 'success'
    }
  } catch (error) {
    console.log(response.data)
    console.log(error)
    console.log(error.message)
    snackbarValue.value = {
      show: true,
      text: `Checkout gagal, pastikan data yang anda inputkan sudah sesuai. `,
      color: 'error'
    }
  }
}

const getDataFasilitas = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/fasilitasTambahan/getAllFasilitasTambahan', {
      headers: {
        'Authorization': token
      }
    })

    listFasilitas.value = response.data.data
  } catch (error) {
    snackbarValue.value = {
      show: true,
      text: 'Data fasilitas gagal diambil...',
      color: 'error'
    }
  }
}

const getProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/profile/${currentUser.value.ID_AKUN}`, {
      headers: {
        'Authorization': token
      }
    })

    dataProfile.value = response.data.data
  } catch (error) {
    snackbarValue.value = {
      show: true,
      text: 'Data profile gagal diambil...',
      color: 'error'
    }
  }
}

const getCustomer = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/customerGroup/${currentUser.value.ID_AKUN}`, {
      headers: {
        'Authorization': token
      }
    })

    listCustomer.value = response.data.data
    snackbarValue.value = {
      show: true,
      text: 'Data customer berhasil diambil...',
      color: 'success'
    }

    console.log(listCustomer.value)
  } catch (error) {
    snackbarValue.value = {
      show: true,
      text: 'Data customer gagal diambil...',
      color: 'error'
    }
  }
}

onMounted(() => {
  getDataFasilitas()
  currentUser.value = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUser.value.ID_ROLE === 4) {
    getProfile()
  } else if(currentUser.value.ID_ROLE === 2) {
    getCustomer()
  }

})

</script>

<style>
.btn-cart {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>