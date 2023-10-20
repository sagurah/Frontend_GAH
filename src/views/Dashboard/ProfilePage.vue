<template>
  <div>
    <v-main>
      <v-card elevation="3" v-if="formUser.role === 'Customer'">
        <v-card-title class="font-weight-bold">Customer Profile Page</v-card-title>
        <v-card-subtitle>Pada halaman ini anda dapat melihat data profile dan mengubah profile.</v-card-subtitle>
        <v-card-text>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account" label="Username" v-model="formUser.username"
            readonly></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-key" label="Password" type="password"
            v-model="formUser.password" readonly></v-text-field>
          <v-text-field variant="outlined" prepend-inner-icon="mdi-account-multiple-outline" label="Role"
            v-model="formUser.role" readonly></v-text-field>
          <v-btn color="indigo" class="mb-2" @click="editData()">{{ isReadOnly ? 'Edit Data' : 'Save Data' }}</v-btn>
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
      formUserCustomer: {

      },
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
    resetForm() {
      this.formUser.oldPassword = ''
      this.formUser.newPassword = ''
    },
    refreshPage() {
      location.reload()
    }
  },
  created() {
    this.token = localStorage.getItem('token')
    const idRole = JSON.parse(localStorage.getItem('currentUser')).ID_ROLE
    this.formUser.username = JSON.parse(localStorage.getItem('currentUser')).USERNAME

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