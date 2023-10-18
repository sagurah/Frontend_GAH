<template>
  <div>
    <v-main class="w-100 h-100">
      <v-container class="my-5 py-5">
        <v-img class="mx-auto my-6" max-width="228" src="https://firebasestorage.googleapis.com/v0/b/capstone-cdb77.appspot.com/o/logo.png?alt=media&token=c134b6af-1e0d-434e-b381-dcd077196515&_gl=1*a58tki*_ga*MjEyODU5OTQ5MC4xNjg1OTc4NjE0*_ga_CW55HF8NVT*MTY5NzUyMjg4Ni4yNC4xLjE2OTc1MjI5MzYuMTAuMC4w"></v-img>
        <v-card width="500" class="mx-auto my-auto pa-3" elevation="8" rounded="lg">
          <v-card-title>
            <span class="font-weight-bold">Register Page</span>
          </v-card-title>
          <v-card-subtitle>
            <span style="text-wrap: wrap;">Selamat Datang di Grand Atma Hotel, mari buat akun anda untuk memulai pemesanan!</span>
          </v-card-subtitle>
          <v-card-text>
            <v-text-field label="Username" variant="outlined" v-model="userCredentials.username" prepend-inner-icon="mdi-account"></v-text-field>
            <v-text-field label="Password" variant="outlined" v-model="userCredentials.password" type="password" prepend-inner-icon="mdi-key"></v-text-field>
            <v-text-field label="Confirm Password" variant="outlined" v-model="userCredentials.confirmPassword" type="password" prepend-inner-icon="mdi-key"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="indigo" variant="flat" @click="register()">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbarAttr.show" :color="snackbarAttr.color" timeout="3000">{{ snackbarAttr.text }}</v-snackbar>
  </div>
</template>

<style>

</style>

<script>
import background from '@/assets/asset-login-register.svg'
import { ref } from 'vue';
import axios from 'axios'

export default {
  data() {
    return {
      background,
      userCredentials: ref({
        username: '',
        password: '',
        confirmPassword: '',
      }),
      snackbarAttr: ref({
        show: false,
        text: '',
        color: ''
      })
    }
  },

  methods: {
    async register() {
      if(this.userCredentials.password !== this.userCredentials.confirmPassword) {
        this.showSnackbar('Password tidak sesuai', 'error')

        this.resetForm()
        return
      }

      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/register', this.userCredentials, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(response)
        this.showSnackbar('Register Berhasil', 'success')
      } catch (error) {
        this.showSnackbar(`Register Gagal`, 'error')
      }

      this.resetForm()
    },

    showSnackbar(text, color) {
      this.snackbarAttr.show = true
      this.snackbarAttr.text = text
      this.snackbarAttr.color = color
    },

    resetForm() {
      this.userCredentials.username = ''
      this.userCredentials.password = ''
      this.userCredentials.confirmPassword = ''
    }
  }
}

</script>