<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title class="font-weight-bold">List Data Season</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat maupun merubah data season yang tersedia</v-card-subtitle>
        <v-card-text>
          <v-btn color="indigo" class="mb-5" @click="tambahItem()">Tambah Data</v-btn>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
            hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table v-if="listSeason && listSeason.length" :search="search" :items-per-page="5" :headers="headers" :items="listSeason"
            class="elevation-2 bg-indigo-lighten-5" :item-key="listSeason.ID_SEASON">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-pencil-outline" color="yellow-darken-1" class="mr-2" @click="editItem(item)" density="comfortable"></v-btn>
              <v-btn icon="mdi-trash-can-outline" color="red-darken-1" @click="deleteItem(item)" density="comfortable"></v-btn>
            </template>
          </v-data-table>
          <v-data-table v-else :search="search" :items-per-page="5" :headers="headers" :items="listSeason" class="elevation-2 bg-indigo-lighten-5"></v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogTambah" width="600" height="auto">
        <v-card>
          <v-card-title>Tambah Data Baru</v-card-title>
          <v-card-subtitle>
            Inputkan data season yang baru disini.
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Jenis Season" v-model="formSeason.JENIS_SEASON"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Tanggal Mulai" v-model="formSeason.TGL_MULAI" type="date"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Tanggal Selesai" v-model="formSeason.TGL_AKHIR" type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Harga(pengali)" v-model="formSeason.HARGA"></v-text-field>
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
          <v-card-title>Delete Season</v-card-title>
          <v-card-subtitle>Tekan OK untuk meghapus season yang dipilih.</v-card-subtitle>
          <v-card-actions>
            <v-btn block variant="tonal" color="red-lighten-3" @click="saveDeleteItem()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" width="600" height="auto">
        <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-subtitle>Inputkan data season baru disini.</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Jenis Season" v-model="formSeason.JENIS_SEASON"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Tanggal Mulai" v-model="formSeason.TGL_MULAI" type="date"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Tanggal Selesai" v-model="formSeason.TGL_AKHIR" type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Harga(pengali)" v-model="formSeason.HARGA"></v-text-field>
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
      listSeason: ref([]),
      formSeason: ref({
        JENIS_SEASON: '',
        TGL_MULAI: null,
        TGL_AKHIR: null,
        HARGA: null
      }),
      spliceIdSeason: '',
      deleteIdSeason: '',
      indexIdSeason: '',
      editIdSeason: '',
      headers: [
        {
          title: 'ID Season',
          align: 'start',
          sortable: true,
          value: 'ID_SEASON',
          class: 'font-weight-bold'
        },
        { title: 'Jenis Season', value: 'JENIS_SEASON' },
        { title: 'Tanggal Mulai', value: 'TGL_MULAI' },
        { title: 'Tanggal Selesai', value: 'TGL_AKHIR' },
        { title: 'Harga(pengali)', value: 'HARGA' },
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
        const response = await axios.post('http://localhost:4000/api/v1/season/addSeason', this.formSeason, {
          headers: {
            Authorization: this.token
          }
        })
        const newSeason = response.data.data
        this.listSeason.push(newSeason)
      } catch (error) {
        console.log(error)
      }
      this.dialogTambah = false,
      this.resetForm()
    },
    editItem(item) {
      this.indexIdSeason = this.listSeason.indexOf(item)
      this.editIdSeason = this.listSeason[this.indexIdSeason].ID_SEASON
      this.formSeason = item
      this.dialogEdit = true
    },
    async saveEditItem() {
      this.listSeason.splice(this.indexIdSeason, 1)
      try {
        const response = await axios.put(`http://localhost:4000/api/v1/season/updateSeason/${this.editIdSeason}`, this.formSeason, {
          headers: {
            Authorization: this.token
          }
        })
        const newSeason = response.data.data
        this.listSeason.push(newSeason)[this.indexIdSeason]
      } catch (err) {
        console.log(err)
      }
      this.dialogEdit = false
      this.resetForm()
    },
    deleteItem(item) {
      this.spliceIdSeason = this.listSeason.indexOf(item)
      this.deleteIdSeason = this.listSeason[this.spliceIdSeason].ID_SEASON
      this.dialogDelete = true
    },
    async saveDeleteItem() {
      this.listSeason.splice(this.spliceIdSeason, 1)
      await axios.delete(`http://localhost:4000/api/v1/season/deleteSeason/${this.deleteIdSeason}`, {
        headers: {
          Authorization: this.token
        }
      })
      this.dialogDelete = false
    },
    resetForm() {
      this.formSeason = {
        JENIS_SEASON: '',
        TGL_MULAI: null,
        TGL_AKHIR: null,
        HARGA: null
      }
    },
    openMenu() {
      this.menuDatePicker = true
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/season/getAllSeason`, {
        headers: {
          Authorization: this.token
        }
      })

      this.listSeason = response.data.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>