<template>
  <div class="main-margin" v-if="!loading">
    <v-card class="main-padding" color="white">
      <v-card-title>
        ویرایش مشخصات
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/')">
              <v-icon class="main-icon">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="admin.name" label="نام" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="admin.mobile" label="شماره همراه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="admin.email" type="email" label="ایمیل" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="admin.password" label="رمز عبور" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="admin.national_code" label="کد ملی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="admin.state_id"
                            :items="states"
                            item-text="label"
                            label="استان را انتخاب کنید" item-value="id" @change="getCities"></v-autocomplete>
          </v-col>

          <v-col cols="3" v-if="admin.state_id">
            <v-autocomplete color="black" v-model="admin.city_id"
                            :items="cities"
                            item-text="label"
                            label="شهر را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


export default {
  name: "UpdateProfileView",
  data() {
    return {
      loading: true,
      states: [],
      cities: [],
      admin: {
        name: null,
        state_id: null,
        city_id: null,
        mobile: null,
        national_code: null,
        email: null,
        password: null,
      },
    }
  },
  mounted() {
    this.getStates()
    this.getEntity()
  },
  methods: {
    getCities() {
      window.axios.get('admin/city/state/index/' + this.admin.state_id).then((res) => {
        this.cities = res.data.data
      })
    },
    getStates() {
      window.axios.get('admin/state/index?per_page=100').then((res) => {
        this.states = res.data.data.data
      })
    },
    getEntity() {
      window.axios.get('admin/auth/profile/').then((res) => {
        this.admin = res.data.data
        this.loading = false
        this.getCities()
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/auth/profile/update/', {
        name: this.admin.name,
        state_id: this.admin.state_id,
        city_id: this.admin.city_id,
        mobile: this.admin.mobile,
        national_code: this.admin.national_code,
        email: this.admin.email,
        password: this.admin.password,
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
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

<style>
.main-margin {
  margin: 2vh 6vw 2vh 2vw;
}

.main-padding {
  padding: 1vh 2vw;
}

.text-dialog-title {
  font-size: 18px;
  font-weight: 800;
}

.letter-spacing-normal {
  letter-spacing: normal;
}
</style>