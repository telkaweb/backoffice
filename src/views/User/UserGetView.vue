<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات کاربر
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/user/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    <v-card-text>ایمیل: {{ user.email }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>شماره همراه: {{ user.mobile }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>وضعیت کاربر: {{ user.status }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ثبت نام کاربر: {{ user.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>کد پستی کاربر: {{ user.postal_code }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>کد ملی کاربر: {{ user.national_code }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>استان کاربر: {{ user.state_name }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>شهر کاربر: {{ user.city_name }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text>آدرس کاربر: {{ user.address }}</v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog width="50%" v-model="chargeWalletDialog">
      <v-card class="secondary-card">
        <v-card-actions>
          <v-icon color="error" @click="chargeWalletDialog = false">mdi-close</v-icon>
        </v-card-actions>
        <v-card-title>
          شارژ کیف پول
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field color="black" v-model="reason" hint="پر کردن توضیحات الزامی است!"
                            label="توضیحاتی درباره شارژ کیف پول کاربر وارد کنید"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field color="black" v-model="value" type="number"
                            hint="بعد از زدن دکمه تایید قابل برگشت نمی باشد!"
                            label="مقدار مبلغ شارژ را به ریال وارد کنید"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn block class="main-button text-center mt-2" @click="chargeWallet">تایید</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog width="50%" v-model="decreaseWalletDialog">
      <v-card class="secondary-card">
        <v-card-actions>
          <v-icon color="error" @click="decreaseWalletDialog = false">mdi-close</v-icon>
        </v-card-actions>
        <v-card-title>
          برداشت از کیف پول
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field color="black" v-model="reason" hint="پر کردن توضیحات الزامی است!"
                            label="توضیحاتی درباره برداشت از  کیف پول کاربر وارد کنید"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field color="black" v-model="value" type="number"
                            hint="بعد از زدن دکمه تایید قابل برگشت نمی باشد!"
                            label="مقدار مبلغ برداشت از کیف پول را به ریال وارد کنید"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn block class="main-button text-center mt-2" @click="decreaseWallet">تایید</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="openFieldsDialog"
        width="468"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="openFieldsDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="6" v-for="header in headers" :key="header.id" class="text-right">
            {{ header.text }}
            <v-switch v-model="header.show" :false-value="false" :true-value="true"></v-switch>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


export default {
  name: "UserGetView",
  data() {
    return {
      openFieldsDialog: false,
      loading: true,
      user: {
        transactions:[]
      },
      chargeWalletDialog: false,
      decreaseWalletDialog: false,
      value: 0,
      reason: null,
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true},
        {text: 'مبلغ', value: 'amount', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نوع', value: 'type', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شناسه کیف پول', value: 'wallet_id', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'توضیحات', value: 'description', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شناسه کاربر', value: 'user_id', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'جزییات', value: 'details', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'روش', value: 'method', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'آتوریتی', value: 'authority', align: 'center', width: '10%', show: false, sortable: true},
        {text: 'شناسه رفرتس', value: 'refid', align: 'center', width: '10%', show: false, sortable: true},
        {text: 'توکن', value: 'token', align: 'center', width: '10%', show: false, sortable: true},
        {text: 'شهر کد', value: 'shahr_tracking_code', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شناسه تراکنش متصل', value: 'transaction_id', align: 'center', width: '10%', show: false, sortable: true},
        {text: 'نوع شارژ', value: 'charge_type', align: 'center', width: '10%', show: true, sortable: true},
        {
          text: 'لحظه تراکنش',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true
        },
      ],
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    formatNumber(value) {
      const numericValue = parseFloat(value);
      return numericValue.toLocaleString();
    },
    getEntity() {
      window.axios.get('v1/admin/user/get/' + this.$route.params.id).then((res) => {
        this.user = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    decreaseWallet() {
      this.decreaseWalletDialog = false
      window.axios.post('v1/admin/wallet/decrease/', {
        amount: this.value,
        user_id: this.$route.params.id,
        reason: this.reason
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
        this.getEntity()
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    chargeWallet() {
      this.chargeWalletDialog = false
      window.axios.post('v1/admin/wallet/deposit/', {
        amount: this.value,
        user_id: this.$route.params.id,
        reason: this.reason
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
        this.getEntity()
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    }
  }
}
</script>

<style>


.secondary-card {
  background-color: rgb(206, 202, 202) !important;
  border-radius: 10px;
  border-color: #FFD700 !important;
  border-style: solid !important;
  box-shadow: 6px 8px 0px 0px rgba(255, 215, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(236, 185, 31, 0.12) !important;
}
</style>