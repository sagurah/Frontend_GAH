<template>
  <div>
    <v-main>
      <v-card elevation="3" v-if="formUser.role === 'Customer'">
        <v-card-title class="font-weight-bold">Customer Profile Page</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat data profile dan mengubah profile.</v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account" label="Username" v-model="formUser.username"
            readonly=""></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-key" label="Password Lama" type="password"
            v-model="formUser.oldPassword" :readonly="isReadOnly"></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-key" label="Password Baru" type="password"
            v-model="formUser.newPassword" :readonly="isReadOnly"></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account-multiple-outline" label="Role"
            v-model="formUser.role" readonly></v-text-field>
          <v-btn color="indigo" class="mr-2" @click="editData()">{{ isReadOnly ? 'Edit Data' : 'Save Data' }}</v-btn>
          <v-btn color="error" @click="isReadOnly = true">Cancel</v-btn>
          <v-container class="px-8 py-5">
            <v-card class="mb-3 mt-3 bg-indigo-lighten-1" elevation="3">
              <v-card-title class="text-body-1">Detail Profil</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Jenis Customer" readonly
                      v-model="formUserCustomer.JENIS_CUSTOMER"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Customer" :readonly="isReadOnly"
                      v-model="formUserCustomer.NAMA_CUSTOMER"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Nama Institusi" :readonly="isReadOnly"
                      v-model="formUserCustomer.NAMA_INSTITUSI"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field label="Nomor Telepon" :readonly="isReadOnly"
                      v-model="formUserCustomer.NO_TELP"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Email" :readonly="isReadOnly"
                      v-model="formUserCustomer.EMAIL"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Alamat" :readonly="isReadOnly"
                      v-model="formUserCustomer.ALAMAT"></v-text-field>
                  </v-col>
                </v-row>
                <v-btn color="white" variant="tonal" class="mr-2" @click="editDataCustomer()">{{ isReadOnly ? 'Edit Data'
                  : 'Save Data' }}</v-btn>
                <v-btn color="error" @click="isReadOnly = true">Cancel</v-btn>
              </v-card-text>
            </v-card>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card elevation="3" v-else>
        <v-card-title class="font-weight-bold">Pegawai Profile Page</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat data profile dan mengubah profile.</v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account" label="Username" v-model="formUser.username"
            readonly=""></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-key" label="Password Lama" type="password"
            v-model="formUser.oldPassword" :readonly="isReadOnly"></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-key" label="Password Baru" type="password"
            v-model="formUser.newPassword" :readonly="isReadOnly"></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account-multiple-outline" label="Role"
            v-model="formUser.role" readonly></v-text-field>
          <v-btn color="indigo" class="mr-2" @click="editData()">{{ isReadOnly ? 'Edit Data' : 'Save Data' }}</v-btn>
          <v-btn color="error" @click="isReadOnly = true">Cancel</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  data() {
    return {
      token: '',
      formUser: {
        username: '',
        oldPassword: '',
        newPassword: '',
        role: ''
      },
      formUserCustomer: ref({
        JENIS_CUSTOMER: '',
        NAMA_CUSTOMER: '',
        NAMA_INSTITUSI: '',
        NO_TELP: '',
        EMAIL: '',
        ALAMAT: ''
      }),
      isReadOnly: true,
    }
  },
  methods: {
    async editData() {
      if (this.isReadOnly) {
        this.isReadOnly = false
      } else {
        this.isReadOnly = true
        try {
          await axios.put(`http://localhost:4000/api/v1/profile/editAkun`, this.formUser, {
            headers: {
              Authorization: this.token
            }
          })

          this.resetForm()
          location.reload()
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editDataCustomer() {
      if (this.isReadOnly) {
        this.isReadOnly = false
      } else {
        this.isReadOnly = true
        try {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'))

          const config = {
            headers: {
              Authorization: this.token
            },
            body: currentUser
          }

          await axios.put(`http://localhost:4000/api/v1/profile/editProfile`, this.formUserCustomer, config)

          this.resetForm()
          location.reload()
        } catch (error) {
          console.log(error)
        }
      }
    },
    resetForm() {
      this.formUser.oldPassword = ''
      this.formUser.newPassword = ''
    },
    refreshPage() {
      location.reload()
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    const idRole = JSON.parse(localStorage.getItem('currentUser')).ID_ROLE
    this.formUser.username = JSON.parse(localStorage.getItem('currentUser')).USERNAME

    let config = {
      headers: {
        Authorization: this.token
      },

      body: {
        USERNAME: this.formUser.username
      }
    }

    const response = await axios.get('http://localhost:4000/api/v1/profile', config)
    this.formUserCustomer = response.data.data.customer[0]

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