<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-5" elevation="5">
            <v-card-title class="text-center text-h2 text-error">404</v-card-title>
            <v-card-title class="text-center">Not Found</v-card-title>
            <v-card-text class="text-center">
              <p>Halaman yang anda cari tidak ditemukan.</p>
              <p>Kontak <a href="https://wa.me/6289512036464" target="_blank">Admin</a> untuk mendapatkan bantuan.</p>
            </v-card-text>
            <v-card-actions>
              <v-container class="d-flex justify-center align-center">
                <v-btn color="error" to="/" variant="tonal">Go to Home</v-btn>
                <v-btn color="indigo" to="/dashboard" variant="tonal">Go to Dashboard</v-btn>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Not Found'
}
</script>

<style scoped>
/* Add custom styles here */
</style>
