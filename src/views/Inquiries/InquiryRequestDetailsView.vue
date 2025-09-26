<template>
  <div v-if="!loading">
    <v-card class="pa-4">
      <v-card-title>
        جزئیات استعلام
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon> بازگشت
        </v-btn>
      </v-card-title>

      <v-alert
        :type="inquiry.status === 'successful' ? 'success' : 'error'"
        dense
        class="my-4"
      >
        وضعیت استعلام: {{ statusText(inquiry.status) }}
      </v-alert>

      <v-container fluid>
        <v-row v-if="inquiry">
          <v-col cols="12"><h3>اطلاعات کلی</h3></v-col>
          <v-col cols="6" md="4" v-if="inquiry.req_num">شماره پیگیری: {{ inquiry.req_num }}</v-col>
          <v-col cols="6" md="4">نوع سرویس: استعلام</v-col>
          <v-col cols="6" md="4">تاریخ: {{ formatDate(inquiry.created_at) }}</v-col>
        </v-row>

        <v-divider v-if="inquiry.user" class="my-3"></v-divider>
        <v-row v-if="inquiry.user">
          <v-col cols="12"><h3>کاربر</h3></v-col>
          <v-col cols="6" md="4">نام: {{ inquiry.user.full_name?.trim() || 'نامشخص' }}</v-col>
          <v-col cols="6" md="4">موبایل: {{ inquiry.user.mobile }}</v-col>
        </v-row>

        <v-divider v-if="inquiry.input_data" class="my-3"></v-divider>
        <v-row v-if="inquiry.input_data">
          <v-col cols="12"><h3>اطلاعات ورودی کاربر</h3></v-col>
          <v-col cols="6" md="4" v-if="inquiry.input_data.card">کارت: {{ inquiry.input_data.card }}</v-col>
          <v-col cols="6" md="4" v-if="inquiry.input_data.iban">شبا: {{ inquiry.input_data.iban }}</v-col>
          <v-col cols="6" md="4" v-if="inquiry.input_data.deposit">حساب: {{ inquiry.input_data.deposit }}</v-col>
          <v-col cols="6" md="4" v-if="inquiry.input_data.bankCode">کد بانک: {{ inquiry.input_data.bankCode }}</v-col>
        </v-row>

        <v-divider v-if="inquiry.provider_response" class="my-3"></v-divider>
        <v-row v-if="inquiry.provider_response">
          <v-col cols="12"><h3>پاسخ سازمان مربوطه</h3></v-col>
          <v-col cols="12">
            <v-card
              class="pa-3"
              outlined
              :color="isProviderSuccess(inquiry.provider_response) ? 'green lighten-4' : 'red lighten-4'"
            >
              <div v-if="inquiry.provider_response.success !== undefined">
                <div>نتیجه: {{ inquiry.provider_response.success ? 'موفق' : 'ناموفق' }}</div>
                <div v-if="inquiry.provider_response.iban">شبا: {{ inquiry.provider_response.iban }}</div>
                <div v-if="inquiry.provider_response.bankName">بانک: {{ inquiry.provider_response.bankName }}</div>
                <div v-if="inquiry.provider_response.deposit">حساب: {{ inquiry.provider_response.deposit }}</div>
                <div v-if="inquiry.provider_response.card">کارت: {{ inquiry.provider_response.card }}</div>
                <div v-if="inquiry.provider_response.depositOwners">
                  صاحب حساب:
                  <span v-if="Array.isArray(inquiry.provider_response.depositOwners)">
                    {{ inquiry.provider_response.depositOwners.map(o => o.firstName + ' ' + o.lastName).join('، ') }}
                  </span>
                  <span v-else>{{ inquiry.provider_response.depositOwners }}</span>
                </div>
                <div v-if="inquiry.provider_response.errorMessage">خطا: {{ inquiry.provider_response.errorMessage }}</div>
              </div>

              <div v-else-if="inquiry.provider_response.meta">
                <div>کد: {{ inquiry.provider_response.meta.code }}</div>
                <div v-if="inquiry.provider_response.meta.errorMessage">
                  خطا: {{ inquiry.provider_response.meta.errorMessage }}
                </div>
                <ul v-if="inquiry.provider_response.meta.errors">
                  <li v-for="(err, idx) in inquiry.provider_response.meta.errors" :key="idx">
                    {{ err.message }}
                  </li>
                </ul>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-divider v-if="inquiry.transaction" class="my-3"></v-divider>
        <v-row v-if="inquiry.transaction">
          <v-col cols="12"><h3>تراکنش اصلی</h3></v-col>
          <v-col cols="6" md="4">مبلغ سرویس: {{ formatPrice(inquiry.transaction.amount) }}</v-col>
          <v-col cols="6" md="4">توضیحات: {{ inquiry.transaction.description || '-' }}</v-col>
          <v-col cols="6" md="4">وضعیت: {{ statusText(inquiry.transaction.status) }}</v-col>
        </v-row>

        <v-divider v-if="inquiry.transaction?.child_transactions?.length" class="my-3"></v-divider>
        <v-row v-if="inquiry.transaction?.child_transactions?.length">
          <v-col cols="12"><h3>تراکنش‌های مرتبط</h3></v-col>
          <v-col
            v-for="child in inquiry.transaction.child_transactions"
            :key="child.unique_key"
            cols="12"
          >
            <v-card class="pa-3 mb-3" :color="child.status === 'success' ? 'green lighten-4' : 'red lighten-4'">
              <div>نوع: {{ transactionTypeText(child.type) }}</div>
              <div>مبلغ: {{ formatPrice(child.amount) }}</div>
              <div>توضیحات: {{ child.description || '-' }}</div>
              <div>وضعیت: {{ statusText(child.status) }}</div>
              <div v-if="child.charity_fund">
                صندوق: {{ child.charity_fund.name }}
                <span v-if="child.charity_fund.is_selected_for_profit === 1" class="green--text">(پیش‌فرض)</span>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-divider v-if="inquiry.provider_service" class="my-3"></v-divider>
        <v-row v-if="inquiry.provider_service">
          <v-col cols="12"><h3>جزئیات سرویس</h3></v-col>
          <v-col cols="6" md="4">عنوان: {{ inquiry.provider_service.title }}</v-col>
          <v-col cols="6" md="4" v-if="inquiry.provider_service.sale_price">
            هزینه: {{ formatPrice(inquiry.provider_service.sale_price) }}
          </v-col>
        </v-row>

        <v-divider v-if="inquiry.provider" class="my-3"></v-divider>
        <v-row v-if="inquiry.provider">
          <v-col cols="12"><h3>سرویس دهنده</h3></v-col>
          <v-col cols="6" md="4">نام: {{ inquiry.provider.name }}</v-col>
          <v-col cols="6" md="4">نوع: {{ inquiry.provider.type }}</v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "KycInquiryDetails",
  data() {
    return {
      loading: true,
      inquiry: null
    }
  },
  methods: {
    isProviderSuccess(resp) {
      if (resp.success !== undefined) {
        return resp.success === true
      }
      if (resp.meta !== undefined) {
        return resp.meta.isSuccess === true
      }
      return false
    },
    transactionTypeText(type) {
      switch (type) {
        case 'donation': return 'سود تخصیص‌یافته'
        case 'deposit': return 'تراکنش عملیاتی (واریز)'
        case 'withdraw': return 'برداشت'
        case 'purchase': return 'خرید'
        default: return '-'
      }
    },
    formatPrice(value) {
      if (!value) return '-'
      return Number(value).toLocaleString('fa-IR') + ' تومان'
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString('fa-IR') : '-'
    },
    statusText(status) {
      switch (status) {
        case 'pending': return 'در انتظار'
        case 'processing': return 'در حال پردازش'
        case 'successful':
        case 'success': return 'موفق'
        case 'failed': return 'ناموفق'
        default: return '-'
      }
    },
    getDetails() {
      const id = this.$route.params.id
      window.axios.get(`/v3/admin/kyc/inquiry/${id}/details`).then(res => {
        this.inquiry = res.data.data
        this.loading = false
      })
    }
  },
  mounted() {
    this.getDetails()
  }
}
</script>

<style scoped>
h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
