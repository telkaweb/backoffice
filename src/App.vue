<template>
  <v-app>
    <v-main class="main-background" v-if="!loading && isAuth">
      <navbar v-if="$route.path !== '/login'"></navbar>
      <global-snack-bar class="snackbar-text"></global-snack-bar>
      <router-view/>
    </v-main>
    <router-view v-else/>
  </v-app>
</template>
<script>
import GlobalSnackBar from "@/components/Notification/GlobalSnackBar";
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: 'App',
  components: {Navbar, GlobalSnackBar},
  data: () => ({
    loading: true,
    currencyLoading: true,
    refreshLoading: false,
    isAuth: false,
    fileDialog: false,
    file: null,
    menuTopBar: true,
  }),
  async beforeMount() {
    await this.getProfile()
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.file).then(() => {
        this.openSnackbar('کپی شد.', '#15C15D')
      }, () => {
      });
    },
    openFileManager() {
      this.fileDialog = true
    },
    logout() {
      window.axios.get('v1/admin/auth/logout').then(() => {
        this.$cookies.remove('token')
        this.$router.go(0)
      })
    },
    async getProfile() {
      if (this.$store.state.user) {
        this.$store.state.user = null
      }
      await window.axios.get('v1/admin/auth/profile').then((res) => {
        this.$store.state.user = res.data.data
        this.$store.state.auth = true
        this.isAuth = true
        this.$store.state.loading = false
        this.loading = false
        if (this.$route.path === '/login') {
          this.$router.push('/')
        }
      }).catch(() => {
        if (this.$route.path !== '/login')
          this.$router.push('/login')
        this.loading = false
      })
    }
  }
};
</script>
<style>
@font-face {
  font-family: Dana;
  src: url("../src/assets/fonts/dana/Dana-FaNum-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: Dana;
  src: url("../src/assets/fonts/dana/Dana-FaNum-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: Dana;
  src: url("../src/assets/fonts/dana/Dana-FaNum-DemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: Dana;
  src: url("../src/assets/fonts/dana/Dana-FaNum-ExtraBold.ttf") format("truetype");
  font-weight: 800;
  font-style: normal;
}

* {
  font-family: Dana, sans-serif !important;
}


.main-background {
  background-size: cover;
}
.card-show {
  padding-top: 3vh;
  background-color: rgba(65, 59, 59, 0.02) !important;
  border-radius: 10px;
  border-color:  rgba(255, 0, 0, 0.7);
  border-style: solid !important;
  box-shadow: 4px 6px 0px 0px rgba(255, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(236, 185, 31, 0.12) !important;
}
.persian-button {
  letter-spacing: normal !important;
}

.top-bar {
  height: 8vh !important;
  background-color: #f7f8fa;
  //border-style: solid;
  //border-color: #FFD700;
  box-shadow: 0px 5px 10px 10px rgba(255, 215, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(236, 185, 31, 0.12) !important;
}

.hand-on-hover {
  cursor: pointer;
}

.main-text-color {
  color: #413b3b;
}

.error-button {
  color: white !important;
  letter-spacing: normal !important;
  background-color: #f13131 !important;
}

.error-button:hover {
  background-color: #FFD700 !important;
  color: #413b3b !important;
}


.main-icon{
  color:white!important;
}
.main-icon:hover{
  color: #413b3b!important;
}
.main-button{
  letter-spacing: normal!important;
  background-color: #413b3b!important;
}
.main-button:hover{
  letter-spacing: normal!important;
  background-color: #00bcd4 !important;
}
</style>