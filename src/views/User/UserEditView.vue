<template>
  <div class="main-margin" v-if="!loading">
    <v-card class="main-padding" color="white">
      <v-card-title>
        ویرایش کاربر
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/user/index')">
              <v-icon class="main-icon">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.first_name" label="نام کوچک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.last_name" label="نام فامیلی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.mobile" label="شماره همراه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.email" type="email" label="ایمیل" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.balance" type="number" label="موجودی اولیه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <vue-persian-datetime-picker color="black" v-model="user.birth_date"
                                         type="date"
                                         custom-input="#birth_date"
                                         auto-submit></vue-persian-datetime-picker>
            <v-text-field label="تاریخ تولد" v-model="user.birth_date" id="birth_date"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.password" label="رمز عبور کاربر" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.national_code" label="کد ملی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select color="black" v-model="user.status"
                      :items="[{label:'فعال',value:1},{label:'غیر فعال',value:0}]"
                      item-text="label"
                      label="وضعیت کاربر انتخاب کنید" item-value="value"></v-select>
          </v-col>

          <v-col cols="3">
            <v-select color="black" v-model="user.level"
                      :items="[{label:'طلایی',value:'gold'},{label:'نقره ای',value:'silver'},{label:'برنز',value:'bronze'}]"
                      item-text="label"
                      label="سطح کاربر انتخاب کنید" item-value="value"></v-select>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="user.bank_id"
                            :items="banks"
                            item-text="label"
                            label="شعبه بانک را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="user.state_id"
                            :items="states"
                            item-text="label"
                            label="استان را انتخاب کنید" item-value="id" @change="getCities"></v-autocomplete>
          </v-col>
          <v-col cols="3" v-if="user.state_id">
            <v-autocomplete color="black" v-model="user.city_id"
                            :items="cities"
                            item-text="label"
                            label="شهر را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="user.address" label="آدرس کامل کاربر" color="black">
            </v-text-field>
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

import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  name: "UserEditView",
  components: {VuePersianDatetimePicker},

  data() {
    return {
      states: [],
      banks: [],
      cities: [],
      loading: true,
      user: {
        first_name: null,
        last_name: null,
        national_code: null,
        email: null,
        mobile: null,
        balance: null,
        birth_date: null,
        bank_id: null,
        password: null,
        state_id: null,
        city_id: null,
        address: null,
        level: null,
        status: null,
      },
    }
  },
  mounted() {
    this.getEntity()
    this.getStates()
    this.getBanks()
  },
  methods: {
    getBanks() {
      window.axios.get('v1/admin/bank/index?per_page=1000').then((res) => {
        this.banks = res.data.data.data
      })
    },
    getCities() {
      window.axios.get('v1/admin/city/state/index/' + this.user.state_id).then((res) => {
        this.cities = res.data.data
      })
    },
    getStates() {
      window.axios.get('v1/admin/state/index?per_page=100').then((res) => {
        this.states = res.data.data.data
      })
    },
    getEntity() {
      window.axios.get('v1/admin/user/get/' + this.$route.params.id).then((res) => {
        this.user = res.data.data
        this.user.birth_date = this.user.birth_date_fa
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/user/update/' + this.$route.params.id, {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        national_code: this.user.national_code,
        email: this.user.email,
        mobile: this.user.mobile,
        balance: this.user.balance,
        birth_date: this.user.birth_date,
        bank_id: this.user.bank_id,
        password: this.user.password,
        state_id: this.user.state_id,
        city_id: this.user.city_id,
        address: this.user.address,
        level: this.user.level,
        status: this.user.status
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