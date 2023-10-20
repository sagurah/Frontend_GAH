<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title class="font-weight-bold">List Data Fasilitas Berbayar</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat maupun merubah data fasilitas berbayar yang tersedia</v-card-subtitle>
        <v-card-text>
          <v-btn color="indigo" class="mb-5" @click="tambahItem()">Tambah Data</v-btn>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
            hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table v-if="listFasilitas && listFasilitas.length" :search="search" :items-per-page="5" :headers="headers" :items="listFasilitas"
            class="elevation-2 bg-indigo-lighten-5" :item-key="listFasilitas.ID_FASILITAS">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-pencil-outline" color="yellow-darken-1" class="mr-2" @click="editItem(item)" density="comfortable"></v-btn>
              <v-btn icon="mdi-trash-can-outline" color="red-darken-1" @click="deleteItem(item)" density="comfortable"></v-btn>
            </template>
          </v-data-table>
          <v-data-table v-else :search="search" :items-per-page="5" :headers="headers" :items="listFasilitas" class="elevation-2 bg-indigo-lighten-5"></v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogTambah" width="600" height="auto">
        <v-card>
          <v-card-title>Tambah Data Baru</v-card-title>
          <v-card-subtitle>
            Inputkan data fasilitas berbayar yang baru disini.
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Fasilitas" v-model="formFasilitas.NAMA_FASILITAS"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Satuan Fasilitas" v-model="formFasilitas.SATUAN"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Harga Fasilitas" v-model="formFasilitas.HARGA"></v-text-field>
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

      <v-dialog v-model="dialogDelete" width="600" height="auto">
        <v-card color="indigo">
          <v-card-title>Delete Fasilitas Berbayar</v-card-title>
          <v-card-subtitle>Tekan OK untuk meghapus Fasilitas Berbayar yang dipilih.</v-card-subtitle>
          <v-card-actions>
            <v-btn block variant="tonal" color="red-lighten-3" @click="saveDeleteItem()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" width="600" height="auto">
        <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-subtitle>Inputkan data fasilitas berbayar baru disini.</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Fasilitas" v-model="formFasilitas.NAMA_FASILITAS"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Satuan Fasilitas" v-model="formFasilitas.SATUAN"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Harga Fasilitas" v-model="formFasilitas.HARGA"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="flat" color="indigo-darken-2" block @click="saveEditItem()">Simpan</v-btn>
          </v-card-actions>
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
      menuDatePicker: false,
      search: '',
      token: '',
      listFasilitas: ref([]),
      formFasilitas: ref({
        NAMA_FASILITAS: '',
        SATUAN: '',
        HARGA: null,
      }),
      spliceIdFasilitas: '',
      deleteIdFasilitas: '',
      indexIdFasilitas: '',
      editIdFasilitas: '',
      headers: [
        {
          title: 'ID Fasilitas',
          align: 'start',
          sortable: true,
          value: 'ID_FASILITAS',
          class: 'font-weight-bold'
        },
        { title: 'Nama Fasilitas', value: 'NAMA_FASILITAS' },
        { title: 'Satuan', value: 'SATUAN' },
        { title: 'Harga', value: 'HARGA' },
        { title: 'Actions', value: 'actions' },
      ],
      dialogTambah: false,
      dialogDelete: false,
      dialogEdit: false
    }
  },
  methods: {
    tambahItem() {
      this.dialogTambah = true
    },
    async saveTambahItem() {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/fasilitasTambahan/addFasilitasTambahan', this.formFasilitas, {
          headers: {
            Authorization: this.token
          }
        })
        const newFasilitas = response.data.data
        this.listFasilitas.push(newFasilitas)
      } catch (error) {
        console.log(error)
      }
      this.dialogTambah = false,
      this.resetForm()
    },
    editItem(item) {
      this.indexIdFasilitas = this.listFasilitas.indexOf(item)
      this.editIdFasilitas = this.listFasilitas[this.indexIdFasilitas].ID_FASILITAS
      this.formFasilitas = item
      this.dialogEdit = true
    },
    async saveEditItem() {
      this.listFasilitas.splice(this.indexIdFasilitas, 1)
      try {
        const response = await axios.put(`http://localhost:4000/api/v1/fasilitasTambahan/updateFasilitasTambahan/${this.editIdFasilitas}`, this.formFasilitas, {
          headers: {
            Authorization: this.token
          }
        })
        const newFasilitas = response.data.data
        this.listFasilitas.push(newFasilitas)[this.indexIdFasilitas]
      } catch (err) {
        console.log(err)
      }
      this.dialogEdit = false
      this.resetForm()
    },
    deleteItem(item) {
      this.spliceIdFasilitas = this.listFasilitas.indexOf(item)
      this.deleteIdFasilitas = this.listFasilitas[this.spliceIdFasilitas].ID_FASILITAS
      this.dialogDelete = true
    },
    async saveDeleteItem() {
      this.listFasilitas.splice(this.spliceIdFasilitas, 1)
      await axios.delete(`http://localhost:4000/api/v1/fasilitasTambahan/deleteFasilitasTambahan/${this.deleteIdFasilitas}`, {
        headers: {
          Authorization: this.token
        }
      })
      this.dialogDelete = false
    },
    resetForm() {
      this.formFasilitas = {
        NAMA_FASILITAS: '',
        SATUAN: '',
        HARGA: null,
      }
    },
  },
  async created() {
    this.token = localStorage.getItem('token')
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/fasilitasTambahan/getAllFasilitasTambahan`, {
        headers: {
          Authorization: this.token
        }
      })

      this.listFasilitas = response.data.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>