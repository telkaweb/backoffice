<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش شعبه بانک
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/bank/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="bank.label" label="نام شعبه بانک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="bank.code" label="کد شعبه بانک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="bank.state_id"
                            :items="states"
                            item-text="label"
                            label="استان را انتخاب کنید" item-value="id" @change="getCities"></v-autocomplete>
          </v-col>

          <v-col cols="3" v-if="bank.state_id">
            <v-autocomplete color="black" v-model="bank.city_id"
                            :items="cities"
                            item-text="label"
                            label="شهر را انتخاب کنید" item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="bank.rate" type="number" label="رتبه شعبه بانک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="bank.priority" type="number" label="اولویت نمایش شعبه بانک" color="black">
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select color="black" v-model="bank.status"
                      :items="[{label:'فعال',value:1},{label:'غیر فعال',value:0}]"
                      item-text="label"
                      label="وضعیت شعبه بانک را انتخاب کنید" item-value="value"></v-select>
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
  name: "BankEditView",
  data() {
    return {
      loading: true,
      states:[],
      cities:[],
      bank: {
        label: null,
        code: null,
        state_id: null,
        city_id: null,
        rate: null,
        priority: null,
        status: null,
      },
    }
  },
  mounted() {
    this.getEntity()
    this.getStates()
  },
  methods: {
    getCities() {
      window.axios.get('v1/admin/city/state/index/' + this.bank.state_id).then((res) => {
        this.cities = res.data.data
      })
    },
    getStates() {
      window.axios.get('v1/admin/state/index?per_page=100').then((res) => {
        this.states = res.data.data.data
        this.getCities()
      })
    },
    getEntity() {
      window.axios.get('v1/admin/bank/get/' + this.$route.params.id).then((res) => {
        this.bank = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/bank/update/' + this.$route.params.id, {
        label: this.bank.label,
        code: this.bank.code,
        state_id: this.bank.state_id,
        city_id: this.bank.city_id,
        rate: this.bank.rate,
        priority: this.bank.priority,
        status: this.bank.status,
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

<style scoped>
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