<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت کارت هدیه جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/voucher/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="voucher.title" label="عنوان کارت هدیه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select :items="voucherTypes" item-text="text" item-value="value" v-model="voucher.type"
                      label="نوع کارت هدیه" color="black">
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" v-model="voucher.amount" label="مبلغ هدیه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="voucher.code" label="کد کارت هدیه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-switch :true-value="1" :false-value="0" v-model="voucher.restrict" label="کارت هدیه فقط برای کاربران تعریف شده قابل استفاده باشد ؟" color="black">
            </v-switch>
          </v-col>
          <v-col cols="12">
            انتخاب کاربران
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="4">
                <v-autocomplete :items="states" item-text="label" item-value="id" v-model="selectedStateId" label="استان را انتخاب کنید."
                                @change="getUsers"
                                color="black">
                </v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-autocomplete color="black" v-model="selectedBankId"
                                @change="getUsers"
                                :items="banks"
                                item-text="label"
                                label="شعبه بانک را انتخاب کنید" item-value="id"></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-autocomplete chips deletable-chips :items="users" item-text="full_name" item-value="id" v-model="voucher.user_ids" label="کاربران" multiple color="black">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "VoucherCreateView",
  data() {
    return {
      states: [],
      users: [],
      banks: [],
      selectedBankId: null,
      selectedStateId: null,
      loading: false,
      coverDialog: false,
      voucherTypes: [
        {text: 'کارت عمومی', value: 'general'},
        {text: 'کارت آموزش', value: 'education'},
        {text: 'کارت گردشگری', value: 'tourism'},
        {text: 'کارت سلامت و ورزش', value: 'health'},
        {text: 'کارت سرگرمی', value: 'entertainment'},
      ],
      voucher: {
        title: null,
        type: null,
        amount: null,
        code: null,
        restrict:null
      },
    }
  },
  mounted() {
    this.getBanks()
    this.getStates()
    this.getUsers()
  },
  methods: {
    getStates() {
      window.axios.get('admin/state/index?per_page=100').then((res) => {
        this.states = res.data.data.data
      })
    },
    getBanks() {
      window.axios.get('admin/bank/index?per_page=1000').then((res) => {
        this.banks = res.data.data.data
      })
    },
    getUsers() {
      let url = "/admin/user/index?per_page=1000";
      if (this.selectedBankId) {
        url = url + '&bank_id=' + this.selectedBankId
      }
      if (this.selectedStateId) {
        url = url + '&state_id=' + this.selectedStateId
      }
      window.axios.get(url).then((res) => {
        this.users = res.data.data.data
      })
    },
    create() {
      window.axios.post('admin/voucher/create/', this.voucher).then((res) => {
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