<template>
  <div>
    <v-main>
      <v-card elevation="5">
        <v-card-title>
          Selamat Datang di <span class="font-weight-bold text-indigo">Dashboard</span> Grand Atma Hotel
        </v-card-title>
        <v-card-subtitle class="mb-3">
          Hai! <span class="font-weight-bold text-indigo">{{ username }}</span> anda login sebagai, <span class="font-weight-bold text-indigo">{{ role }}</span>
        </v-card-subtitle>
      </v-card>
    </v-main>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      role: '',
      username: ''
    }
  },
  created() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const idRole = currentUser.ID_ROLE
    this.username = currentUser.USERNAME
    if(idRole === 1) {
      this.role = 'Admin'
    } else if(idRole === 2) {
      this.role = 'SM'
    } else if(idRole === 3) {
      this.role = 'FO'
    } else if(idRole === 4) {
      this.role = 'Customer'
    } else if(idRole === 5) {
      this.role = 'Owner & GM'
    } else {
      this.role = 'Unknown'
    }
  }
}
</script>