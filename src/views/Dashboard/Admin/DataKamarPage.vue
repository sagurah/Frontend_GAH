<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title class="font-weight-bold">List Data Kamar</v-card-title>
        <v-card-subtitle>
          Pada halaman ini anda dapat melihat maupun merubah data kamar yang tersedia.
        </v-card-subtitle>
        <v-card-text>
          <v-btn color="indigo" class="mb-5" @click="tambahItem()">Tambah Data</v-btn>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table v-if="listKamar && listKamar.length" :search="search" :items-per-page="5" :headers="headers" :items="listKamar" class="elevation-2 bg-indigo-lighten-5"
            :item-key="listKamar.ID_KAMAR">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-pencil-outline" color="yellow-darken-1" class="mr-2" @click="editItem(item)" density="comfortable"></v-btn>
              <v-btn icon="mdi-trash-can-outline" color="red-darken-1" @click="deleteItem(item)" density="comfortable"></v-btn>
            </template>
          </v-data-table>
          <v-data-table v-else :search="search" :items-per-page="5" :headers="headers" :items="listKamar" class="elevation-2 bg-indigo-lighten-5"></v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogTambah" width="600" height="auto">
        <v-card>
          <v-card-title>Tambah Data Baru</v-card-title>
          <v-card-subtitle>
            Inputkan data kamar yang baru disini.
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nomor Kamar" v-model="formKamar.NO_KAMAR"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select v-model="formKamar.JENIS_KAMAR" :items="['Superior', 'Double Deluxe', 'Executive Deluxe', 'Junior Suite']" label="Jenis Kamar"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select v-model="formKamar.JENIS_BED" :items="['Double', 'King']" label="Jenis Bed"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Kapasitas" v-model="formKamar.KAPASITAS"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Luas Kamar" v-model="formKamar.LUAS_KAMAR"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Fasilitas" v-model="formKamar.FASILITAS"></v-text-field>
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
          <v-card-title>Delete Kamar</v-card-title>
          <v-card-subtitle>Tekan OK untuk meghapus kamar yang dipilih.</v-card-subtitle>
          <v-card-actions>
            <v-btn block variant="tonal" color="red-lighten-3" @click="saveDeleteItem()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" width="600" height="auto">
        <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-subtitle>Inputkan data kamar baru disini.</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nomor Kamar" v-model="formKamar.NO_KAMAR"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select v-model="formKamar.JENIS_KAMAR" :items="['Superior', 'Double Deluxe', 'Executive Deluxe', 'Junior Suite']" label="Jenis Kamar"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select v-model="formKamar.JENIS_BED" :items="['Double', 'King']" label="Jenis Bed"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Kapasitas" v-model="formKamar.KAPASITAS"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Luas Kamar" v-model="formKamar.LUAS_KAMAR"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Fasilitas" v-model="formKamar.FASILITAS"></v-text-field>
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
      search: '',
      token: '',
      listKamar: ref([]),
      formKamar: ref({
        NO_KAMAR: null,
        JENIS_KAMAR: '',
        JENIS_BED: '',
        KAPASITAS: null,
        LUAS_KAMAR: null,
        FASILITAS: ''
      }),
      spliceIdKamar: '',
      deleteIdKamar: '',
      indexIdKamar: '',
      editIdKamar: '',
      rules: [
        v => !!v || 'Tidak boleh kosong',
      ],
      headers: [
        {
          title: 'ID Kamar',
          align: 'start',
          sortable: true,
          value: 'ID_KAMAR',
          class: 'font-weight-bold'
        },
        { title: 'No. Kamar', value: 'NO_KAMAR' },
        { title: 'Jenis Kamar', value: 'JENIS_KAMAR' },
        { title: 'Jenis Bed', value: 'JENIS_BED' },
        { title: 'Kapasitas(orang)', value: 'KAPASITAS' },
        { title: 'Luas Kamar(meter)', value: 'LUAS_KAMAR' },
        { title: 'Fasilitas', value: 'FASILITAS' },
        { title: 'Actions', value: 'actions' }
      ],
      dialogTambah: false,
      dialogDelete: false,
      dialogEdit: false,
    }
  },
  methods: {
    tambahItem() {
      this.dialogTambah = true
      this.resetForm()
    },
    async saveTambahItem() {
      try {
        const response = await axios.post(`http://localhost:4000/api/v1/kamar/addKamar`, this.formKamar, {
          headers: {
            Authorization: this.token
          }
        })
        const newKamar = response.data.data
        this.listKamar.push(newKamar)
      } catch (error) {
        console.log(error)
      }
      this.dialogTambah = false
      this.resetForm()
    },
    editItem(item) {
      this.indexIdKamar = this.listKamar.indexOf(item)
      this.editIdKamar = this.listKamar[this.indexIdKamar].ID_KAMAR
      this.formKamar = item
      this.dialogEdit = true
    },
    async saveEditItem() {
      this.listKamar.splice(this.indexIdKamar, 1)
      try {
        const response = await axios.put(`http://localhost:4000/api/v1/kamar/updateKamar/${this.editIdKamar}`, this.formKamar, {
          headers: {
            Authorization: this.token
          }
        })
        const newKamar = response.data.data
        this.listKamar.push(newKamar)[this.indexIdKamar]
      } catch (err) {
        console.log(err)
      }
      this.dialogEdit = false
      this.resetForm()
    },
    deleteItem(item) {
      this.spliceIdKamar = this.listKamar.indexOf(item)
      this.deleteIdKamar = this.listKamar[this.spliceIdKamar].ID_KAMAR
      this.dialogDelete = true
    },
    async saveDeleteItem() {
      this.listKamar.splice(this.spliceIdKamar, 1)
      await axios.delete(`http://localhost:4000/api/v1/kamar/deleteKamar/${this.deleteIdKamar}`, {
        headers: {
          Authorization: this.token
        }
      })
      this.dialogDelete = false
    },
    resetForm() {
      this.formKamar.NO_KAMAR = null
      this.formKamar.JENIS_KAMAR = ''
      this.formKamar.JENIS_BED = ''
      this.formKamar.KAPASITAS = null
      this.formKamar.LUAS_KAMAR = null
      this.formKamar.FASILITAS = ''
    }
  },
  async created() {
    this.token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    try {
      const result = await axios.get(`http://localhost:4000/api/v1/kamar/getAllKamar`, {
        headers: {
          Authorization: this.token
        }
      })

      this.listKamar = result.data.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>