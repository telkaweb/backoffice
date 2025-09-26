<template>
  <div>
    <global-snack-bar></global-snack-bar>
    <v-row>
      <v-col cols="6" class="thumb-container">
        <img class="background-image-login" src="@/assets/login-logo.png" alt="background">
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4" class="px-16 text-center">
        <v-card elevation="0" class="card-login">
          <v-card-title>
            <v-row>
              <v-col>
                مدیریت وی لاین
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field color="#001a33" label=" ایمیل خود را وارد کنید."
                              v-model="credentials.email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="password" color="#001a33" label="رمز عبور خود را وارد کنید."
                              v-model="credentials.password"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn block class="main-btn-login" elevation="0" rounded color="primary" @click="login()">ورود
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import GlobalSnackBar from "@/components/Notification/GlobalSnackBar";

export default {
  name: "LoginView",
  components: {GlobalSnackBar},
  data() {
    return {
      credentials: {
        email: null,
        password: null,
      }
    }
  },
  mounted() {

  },
  methods: {
    async login() {
      await window.axios.post('v1/admin/auth/login', {
        email: this.credentials.email,
        password: this.credentials.password
      }).then((res) => {
        this.$store.state.user = res.data.data.user
        this.$store.state.auth = true
        this.$cookies.set('token', 'Bearer ' + res.data.data.token)
        this.$router.go(0)
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    async loginSeller() {
      await window.axios.post('v1/admin/seller/auth/login', {
        email: this.credentials.email,
        password: this.credentials.password
      }).then((res) => {
        this.$store.state.user = res.data.data.user
        this.$store.state.auth = true
        this.$cookies.set('token', 'Bearer ' + res.data.data.token)
        this.$router.go(0)
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
  }
}
</script>

<style scoped>
.thumb-container {
  background-color: rgba(255, 0, 0, 0.7);
  height: 100vh !important;
}

.background-image-login {
  display: table;
  margin: 37vh auto auto;
}

.card-login {
  margin-top: 30vh;;
}

.secondary-btn-login {
  background-color: #413b3b !important;
  color: whitesmoke;
}
</style>