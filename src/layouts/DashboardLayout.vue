<template>
  <div>
    <v-navigation-drawer class="fullheight" width="256" v-model="drawer" absolute temporary color="indigo">
      <v-list>
        <v-list-item>
          <v-list-item-title class="font-weight-bold">Grand Atma Hotel</v-list-item-title>
          <v-list-item-subtitle>Solusi Penginapan Anda!</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" class="srollable-list">
        <v-list-subheader color="grey-lighten-1">Main Menu</v-list-subheader>
        <v-list-item variant="tonal" prepend-icon="mdi-home" link @click="movePage('/dashboard')">Home</v-list-item>
      </v-list>

      <v-list density="compact" class="srollable-list">
        <v-list-subheader color="grey-lighten-1">{{ role }} Menu</v-list-subheader>
        <v-list-item v-for="item in listMenu" variant="tonal" :prepend-icon="item.icon" link @click="movePage(`${item.path}`)">{{ item.title }}</v-list-item>
      </v-list>

      <v-list density="compact" class="scrollable-list">
        <v-list-subheader color="grey-lighten-1">Account Menu</v-list-subheader>
        <v-list-item variant="tonal" prepend-icon="mdi-account" link @click="movePage('/dashboard/profile')">Profile</v-list-item>
        <v-list-item variant="tonal" prepend-icon="mdi-history" link @click="movePage('/dashboard/riwayat')">Riwayat Transaksi</v-list-item>
      </v-list>
      
      <v-divider></v-divider>

      <v-list density="compact" class="scrollable-list">
        <v-list-item prepend-icon="mdi-logout" link @click="dialogLogout = true" class="bg-red-darken-2 mt-2">Logout</v-list-item>
      </v-list>

      <v-dialog v-model="dialogLogout" width="auto" height="auto">
        <v-card color="indigo">
          <v-card-title>Confirm Logout</v-card-title>
          <v-card-subtitle>Ingin mengakhiri sesi saat ini? tekan OK untuk logout.</v-card-subtitle>
          <v-card-actions>
            <v-btn variant="tonal" color="red-lighten-3" block @click="logout()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-navigation-drawer>
    <v-app-bar color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = true" color="white"></v-app-bar-nav-icon>
    </v-app-bar>
    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.fullheight {
  min-height: 100vh !important;
}

.scrollable-list {
  overflow-y: auto;
  max-height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      dialogLogout: false,
      menuAdmin: [
        { title: 'Data Kamar', path: '/dashboard/admin/data-kamar', icon: 'mdi-bed' }
      ],
      menuSM: [
        { title: 'Data Season', path: '/dashboard/sm/data-season', icon: 'mdi-calendar' },
        { title: 'Data Fasilitas', path: '/dashboard/sm/data-fasilitas', icon: 'mdi-home' },
        { title: 'Data Tarif', path: '/dashboard/sm/data-tarif', icon: 'mdi-currency-usd' },
        { title: 'Data Customer', path: '/dashboard/sm/data-customer', icon: 'mdi-account-multiple' },
        { title: 'Reservasi', path: '/dashboard/reservasi', icon: 'mdi-calendar' }
      ],
      menuFO: [
        { title: 'Penginapan', path: '/dashboard/fo/pelayanan-penginapan', icon: 'mdi-bed' }
      ],
      menuCustomer: [
        { title: 'Reservasi', path: '/dashboard/reservasi', icon: 'mdi-calendar' }
      ],
      menuOwnerGM: [
        { title: 'Laporan', path: '/dashboard/owner/laporan', icon: 'mdi-file-chart' }
      ],
      idRole: null,
      role: '',
      listMenu: []
    }
  },
  methods: {
    movePage(path) {
      this.$router.push(path)
    },
    logout() {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      localStorage.removeItem('resumePemesanan')
      this.$router.push('/login')
    }
  },
  created() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.idRole = currentUser.ID_ROLE

    if(this.idRole === 1) {
      this.role = 'Admin'
      this.listMenu = this.menuAdmin
    } else if(this.idRole === 2) {
      this.role = 'SM'
      this.listMenu = this.menuSM
    } else if(this.idRole === 3) {
      this.role = 'FO'
      this.listMenu = this.menuFO
    } else if(this.idRole === 4) {
      this.role = 'Customer'
      this.listMenu = this.menuCustomer
    } else if(this.idRole === 5) {
      this.role = 'Owner & GM'
      this.listMenu = this.menuOwnerGM
    } else {
      this.role = 'Unknown'
      this.listMenu = []
    }

  }
}
</script>