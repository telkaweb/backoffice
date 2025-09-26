<template>
  <div v-if="!loading">
    <v-card class="pa-4">
      <v-card-title>
        جزئیات سفارش
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon> بازگشت
        </v-btn>
      </v-card-title>

      <v-alert
        :type="order.status === 'successful' ? 'success' : 'error'"
        dense
        class="my-4"
      >
        وضعیت سفارش: {{ statusText(order.status) }}
      </v-alert>

      <v-container fluid>
        <v-row v-if="order">
          <v-col cols="12"><h3>اطلاعات کلی</h3></v-col>
          <v-col cols="6" md="4" v-if="order.req_num">شماره پیگیری: {{ order.req_num }}</v-col>
          <v-col cols="6" md="4">نوع سرویس: {{ serviceTypeText(order.service_type) }}</v-col>
          <v-col cols="6" md="4">روش پرداخت: {{ paymentText(order.input_data?.payment_method) }}</v-col>
          <v-col cols="6" md="4">گیرنده سرویس: {{ order.input_data?.mobile || '-' }}</v-col>
          <v-col cols="6" md="4">تاریخ: {{ formatDate(order.created_at) }}</v-col>
        </v-row>

        <v-divider v-if="order.user" class="my-3"></v-divider>
        <v-row v-if="order.user">
          <v-col cols="12"><h3>کاربر</h3></v-col>
          <v-col cols="6" md="4">نام: {{ order.user.full_name?.trim() || 'نامشخص' }}</v-col>
          <v-col cols="6" md="4">موبایل: {{ order.user.mobile }}</v-col>
        </v-row>

        <v-divider v-if="order.transaction" class="my-3"></v-divider>
        <v-row v-if="order.transaction">
          <v-col cols="12"><h3>تراکنش اصلی</h3></v-col>
          <v-col cols="6" md="4">مبلغ: {{ formatPrice(order.transaction.amount) }}</v-col>
          <v-col cols="6" md="4">توضیحات: {{ order.transaction.description || '-' }}</v-col>
          <v-col cols="6" md="4">وضعیت: {{ statusText(order.transaction.status) }}</v-col>
          <v-col cols="6" md="4">روش پرداخت: {{ paymentText(order.transaction.payment_method) }}</v-col>
          <v-col cols="6" md="4" v-if="order.transaction.ref_id">کد مرجع: {{ order.transaction.ref_id }}</v-col>
          <v-col cols="6" md="4" v-if="order.transaction.gateway">
            درگاه پرداخت: {{ order.transaction.gateway.name }}
          </v-col>
        </v-row>

        <v-divider v-if="order.transaction?.child_transactions?.length" class="my-3"></v-divider>
        <v-row v-if="order.transaction?.child_transactions?.length">
          <v-col cols="12"><h3>تراکنش‌های مرتبط</h3></v-col>
          <v-col
            v-for="child in order.transaction.child_transactions"
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

        <v-divider v-if="order.provider_service" class="my-3"></v-divider>
        <v-row v-if="order.provider_service">
          <v-col cols="12"><h3>جزئیات بسته اینترنتی</h3></v-col>
          <v-col cols="6" md="4">عنوان: {{ order.provider_service.title }}</v-col>
          <v-col cols="6" md="4">قیمت اصلی: {{ formatPrice(order.provider_service.provider_price) }}</v-col>
          <v-col cols="6" md="4">قیمت فروش: {{ formatPrice(order.provider_service.sale_price) }}</v-col>
          <v-col cols="6" md="4">اپراتور: {{ operatorText(order.provider_service.operator) }}</v-col>
        </v-row>

        <v-divider v-if="order.provider" class="my-3"></v-divider>
        <v-row v-if="order.provider">
          <v-col cols="12"><h3>سرویس دهنده</h3></v-col>
          <v-col cols="6" md="4">نام: {{ order.provider.name }}</v-col>
          <v-col cols="6" md="4">نوع: {{ order.provider.type }}</v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "OperatorOrderDetails",
  data() {
    return {
      loading: true,
      order: null
    }
  },
  methods: {
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
    paymentText(method) {
      if (method === 'wallet') return 'کیف پول'
      if (method === 'gateway') return 'درگاه اینترنتی'
      return '-'
    },
    serviceTypeText(type) {
      if (type === 'charge') return 'شارژ موبایل'
      if (type === 'internet') return 'بسته اینترنتی'
      return '-'
    },
    operatorText(op) {
      switch (op) {
        case 'mtn': return 'ایرانسل'
        case 'mci': return 'همراه اول'
        case 'rtl': return 'رایتل'
        default: return '-'
      }
    },
    getOrderDetails() {
      const id = this.$route.params.id
      window.axios.get(`/v3/admin/operator/order/${id}/details`).then(res => {
        this.order = res.data.data
        this.loading = false
      })
    }
  },
  mounted() {
    this.getOrderDetails()
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
