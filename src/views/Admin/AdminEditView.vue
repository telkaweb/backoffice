<template>
  <div class="main-margin" v-if="!loading">
    <v-card class="main-padding" color="white">
      <v-card-title>
        ویرایش مدیر
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/admin/index')">
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
            <v-autocomplete color="black" v-model="admin.role_id"
                            :items="roles"
                            item-text="label"
                            label="نقش را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="admin.bank_id"
                            :items="banks"
                            item-text="label"
                            label="شعبه بانک را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>

          <v-col cols="3">
            <v-autocomplete color="black" v-model="admin.bank_ids" multiple
                            v-if="admin.role_id == 3 || admin.role_id == 4 || admin.role_id == 5 || admin.role_id == 6"
                            :items="banks"
                            item-text="label"
                            label="شعبه های تحت نظارت مدیر را انتخاب کنید" item-value="id"></v-autocomplete>
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
          <v-col cols="3">
            <v-select color="black" v-model="admin.status"
                      :items="[{label:'فعال',value:1},{label:'غیر فعال',value:0}]"
                      item-text="label"
                      label="وضعیت مدیر انتخاب کنید" item-value="value"></v-select>
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
  name: "AdminEditView",
  data() {
    return {
      loading: true,
      states: [],
      banks: [],
      roles: [],
      cities: [],
      admin: {
        name: null,
        bank_id: null,
        state_id: null,
        city_id: null,
        mobile: null,
        national_code: null,
        status: null,
        email: null,
        role_id: null,
        password: null,
        bank_ids: []
      },
    }
  },
  mounted() {
    this.getStates()
    this.getBanks()
    this.getRoles()
    this.getEntity()
  },
  methods: {
    getRoles() {
      window.axios.get('v1/admin/role/index?per_page=1000').then((res) => {
        this.roles = res.data.data.data
      })
    },
    getBanks() {
      window.axios.get('v1/admin/bank/index?per_page=1000').then((res) => {
        this.banks = res.data.data.data
      })
    },
    getCities() {
      window.axios.get('v1/admin/city/state/index/' + this.admin.state_id).then((res) => {
        this.cities = res.data.data
      })
    },
    getStates() {
      window.axios.get('v1/admin/state/index?per_page=100').then((res) => {
        this.states = res.data.data.data
      })
    },
    getEntity() {
      window.axios.get('v1/admin/admin/get/' + this.$route.params.id).then((res) => {
        this.admin = res.data.data
        this.admin.bank_ids = [];
        if (this.admin.banks.length) {
          this.admin.banks.forEach((bank) => {
            this.admin.bank_ids.push(bank.id)
          })
        }
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/admin/update/' + this.$route.params.id, {
        name: this.admin.name,
        bank_id: this.admin.bank_id,
        state_id: this.admin.state_id,
        city_id: this.admin.city_id,
        mobile: this.admin.mobile,
        national_code: this.admin.national_code,
        status: this.admin.status,
        email: this.admin.email,
        role_id: this.admin.role_id,
        password: this.admin.password,
        bank_ids: this.admin.bank_ids.length ? this.admin.bank_ids : null
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