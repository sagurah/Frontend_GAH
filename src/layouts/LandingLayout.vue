<template>
  <div>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="pl-5">
        <v-btn class="text-h5 font-weight-bold" style="color: white; background-color: #3F51B5; padding: 5px 10px;"
          @click="movePage('/')">
          <span>Grand Atma Hotel</span>
        </v-btn>
      </v-app-bar-title>
      <div class="pr-6">
        <v-btn class="text-h6 mx-2" variant="tonal" color="indigo" size="large" @click="movePage('/login')">Login</v-btn>
        <v-btn class="text-h6" color="indigo" variant="flat" size="large" @click="movePage('/register')">Register</v-btn>
      </div>
    </v-app-bar>
    <router-view></router-view>
    <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
      <div>
        <v-btn icon="mdi-facebook" variant="text"></v-btn>
        <v-btn icon="mdi-twitter" variant="text"></v-btn>
        <v-btn icon="mdi-instagram" variant="text"></v-btn>
      </div>
      <div class="pt-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod vitae risus tincidunt dictum.
        Nunc in sollicitudin arcu, eu sagittis tortor. Nulla facilisi. Quisque vitae lacus lorem. Cras ac fermentum neque,
        lacinia bibendum nibh. Curabitur convallis mi ut cursus semper. Vivamus dui massa, semper suscipit eros eu,
        hendrerit auctor quam. Aliquam vehicula, nibh vel aliquam tincidunt, purus lacus elementum mauris, semper
        imperdiet nisl augue vitae ligula. Cras quis commodo nunc, eget congue risus. Morbi molestie justo sodales urna
        aliquam, vel efficitur risus dapibus. Aliquam aliquet ornare eros a pharetra. Praesent sem augue, tempor sed
        egestas non, venenatis vitae erat. Praesent vitae consectetur massa, a sollicitudin enim.</div>
      <v-divider color="white" thickness="5"></v-divider>
      <div class="font-weight-bold">
        Copyright {{ new Date().getFullYear() }} - Grand Atma Hotel
      </div>
    </v-footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;
}
</style>

<script>
export default {
  name: 'LandingLayout',
  data() {
    return {

    }
  },
  methods: {
    movePage(path) {
      this.$router.push(path)
    }
  }
}

</script>