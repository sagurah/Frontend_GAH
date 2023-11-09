<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title class="font-weight-bold">List Data Tarif</v-card-title>
        <v-card-subtitle>
          Pada halaman ini anda dapat melihat maupun merubah data tarif yang tersedia.
        </v-card-subtitle>
        <v-card-text>
          <v-btn color="indigo" class="mb-5" @click="tambahItem()">Tambah Data</v-btn>
          <v-text-field variant="outlined" v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line hide-details class="bg-indigo-lighten-5"></v-text-field>
          <v-data-table v-if="listTarif && listTarif.length" :search="search" :items-per-page="5" :headers="headers" :items="listTarif" class="elevation-2 bg-indigo-lighten-5"
            :item-key="listTarif.ID_TARIF">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon="mdi-pencil-outline" color="yellow-darken-1" class="mr-2" @click="editItem(item)" density="comfortable"></v-btn>
              <v-btn icon="mdi-trash-can-outline" color="red-darken-1" @click="deleteItem(item)" density="comfortable"></v-btn>
            </template>
          </v-data-table>
          <v-data-table v-else :search="search" :items-per-page="5" :headers="headers" :items="listTarif" class="elevation-2 bg-indigo-lighten-5"></v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogTambah" width="600" height="auto">
        <v-card>
          <v-card-title>Tambah Data Baru</v-card-title>
          <v-card-subtitle>
            Inputkan data tarif yang baru disini.
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Total Tarif" v-model="formTarif.TOTAL_TARIF"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select label="Nomor Kamar" v-model="formTarif.ID_KAMAR" :items="idKamarOption" item-title="JENIS_KAMAR" item-value="ID_KAMAR"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select label="Jenis Season" v-model="formTarif.ID_SEASON" :items="idSeasonOption" item-title="JENIS_SEASON" item-value="ID_SEASON"></v-select>
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
          <v-card-title>Delete Tarif</v-card-title>
          <v-card-subtitle>Tekan OK untuk meghapus tarif yang dipilih.</v-card-subtitle>
          <v-card-actions>
            <v-btn block variant="tonal" color="red-lighten-3" @click="saveDeleteItem()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" width="600" height="auto">
        <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-subtitle>Inputkan data tarif baru disini.</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Total Tarif" v-model="formTarif.TOTAL_TARIF"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select label="Jenis Kamar" v-model="formTarif.ID_KAMAR" :items="idKamarOption" item-title="JENIS_KAMAR" item-value="ID_KAMAR"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select label="Jenis Season" v-model="formTarif.ID_SEASON" :items="idSeasonOption" item-title="JENIS_SEASON" item-value="ID_SEASON"></v-select>
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

      <v-snackbar v-model="snackbarValue.show" :color="snackbarValue.color">{{ snackbarValue.text }}</v-snackbar>

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
      listTarif: ref([]),
      idSeasonOption: ref([{}]),
      idKamarOption: ref([{}]),
      formTarif: ref({
        TOTAL_TARIF: null,
        ID_KAMAR: null,
        ID_SEASON: null
      }),
      snackbarValue: ref({
        show: false,
        text: '',
        color: ''
      }),
      spliceIdTarif: '',
      deleteIdTarif: '',
      indexIdTarif: '',
      editIdTarif: '',
      headers: [
        {
          title: 'ID Tarif',
          align: 'start',
          sortable: true,
          value: 'ID_TARIF',
          class: 'font-weight-bold'
        },
        { title: 'Total Tarif', value: 'TOTAL_TARIF' },
        { title: 'ID Kamar', value: 'ID_KAMAR' },
        { title: 'ID Season', value: 'ID_SEASON' },
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
        const response = await axios.post(`http://localhost:4000/api/v1/tarif/addTarif`, this.formTarif, {
          headers: {
            Authorization: this.token
          }
        })
        const newTarif = response.data.data
        this.listTarif.push(newTarif)
      } catch (error) {
        this.snackbarValue.show = true
        this.snackbarValue.color = 'error',
        this.snackbarValue.text = 'Data tarif gagal ditambahkan'
        console.log(error)
      }
      this.dialogTambah = false
      this.resetForm()
    },
    editItem(item) {
      this.indexIdTarif = this.listTarif.indexOf(item)
      this.editIdTarif = this.listTarif[this.indexIdTarif].ID_TARIF
      this.formTarif = item
      this.dialogEdit = true
    },
    async saveEditItem() {
      this.listTarif.splice(this.indexIdTarif, 1)
      try {
        const response = await axios.put(`http://localhost:4000/api/v1/tarif/updateTarif/${this.editIdTarif}`, this.formTarif, {
          headers: {
            Authorization: this.token
          }
        })
        const newTarif = response.data.data
        this.listTarif.push(newTarif)[this.indexIdTarif]
      } catch (err) {
        console.log(err)
      }
      this.dialogEdit = false
      this.resetForm()
    },
    deleteItem(item) {
      this.spliceIdTarif = this.listTarif.indexOf(item)
      this.deleteIdTarif = this.listTarif[this.spliceIdTarif].ID_TARIF
      this.dialogDelete = true
    },
    async saveDeleteItem() {
      this.listTarif.splice(this.spliceIdTarif, 1)
      await axios.delete(`http://localhost:4000/api/v1/tarif/deleteTarif/${this.deleteIdTarif}`, {
        headers: {
          Authorization: this.token
        }
      })
      this.dialogDelete = false
    },
    resetForm() {
      this.formTarif = {
        TOTAL_TARIF: null,
        ID_KAMAR: null,
        ID_SEASON: null
      }
    }
  },
  computed: {
    formattedIdKamarOptions() {
      return this.idKamarOption.map(item => ({
        ...item,
        label: `${item.NO_KAMAR} - ${item.JENIS_KAMAR}`
      }))
    }
  },
  async created() {
    this.token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    try {
      const result = await axios.get(`http://localhost:4000/api/v1/tarif/getAllTarif`, {
        headers: {
          Authorization: this.token
        }
      })

      const resultIdSeason = await axios.get('http://localhost:4000/api/v1/season/getAllSeason', {
        headers: {
          Authorization: this.token
        }
      })

      const resultIdKamar = await axios.get('http://localhost:4000/api/v1/kamar/getAllKamar', {
        headers: {
          Authorization: this.token
        }
      })

      this.idSeasonOption = resultIdSeason.data.data
      this.idKamarOption = resultIdKamar.data.data
      this.listTarif = result.data.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>