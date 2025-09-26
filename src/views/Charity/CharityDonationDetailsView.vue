<template>
  <div v-if="!loading">
    <v-card class="card-show pa-5" color="white">
      <v-card-title>
        جزئیات واریزی
      </v-card-title>
      <v-col cols="12" class="text-left">
        <v-btn width="200px" class="main-button" @click="$router.back()">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <v-divider></v-divider>

      <v-row class="mt-4">
        <v-col cols="12" md="6">
          <strong>مبلغ:</strong> {{ formatPrice(donation.amount) }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>توضیحات:</strong> {{ donation.description || '-' }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>وضعیت:</strong>
          <v-chip :color="donation.status === 'success' ? 'success' : 'error'" dark small>
            {{ donation.status === 'success' ? 'موفق' : 'ناموفق' }}
          </v-chip>
        </v-col>
        <v-col cols="12" md="6">
          <strong>تاریخ:</strong>
          <span class="ltr-cell">{{ formatDate(donation.created_at) }}</span>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12">
          <h3>کاربر</h3>
        </v-col>
        <v-col cols="12" md="6">
          <strong>نام:</strong>
          {{ donation.user?.full_name?.trim() ? donation.user.full_name : 'نامشخص' }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>موبایل:</strong> {{ donation.user?.mobile || '-' }}
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12">
          <h3>صندوق</h3>
        </v-col>
        <v-col cols="12" md="6">
          <strong>عنوان:</strong> {{ donation.charity_fund?.name }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>توضیحات:</strong> {{ donation.charity_fund?.description }}
        </v-col>
      </v-row>

      <v-divider v-if="donation.parent_transaction" class="my-4"></v-divider>

      <v-row v-if="donation.parent_transaction">
        <v-col cols="12">
          <h3>تراکنش اصلی</h3>
        </v-col>
        <v-col cols="12" md="4"><strong>مبلغ:</strong> {{ formatPrice(donation.parent_transaction.amount) }}</v-col>
        <v-col cols="12" md="4"><strong>توضیحات:</strong> {{ donation.parent_transaction.description }}</v-col>
        <v-col cols="12" md="4">
          <strong>وضعیت:</strong>
          <v-chip :color="donation.parent_transaction.status === 'success' ? 'success' : 'error'" small dark>
            {{ donation.parent_transaction.status === 'success' ? 'موفق' : 'ناموفق' }}
          </v-chip>
        </v-col>
      </v-row>

      <v-divider v-if="donation.service_requests && donation.service_requests.length" class="my-4"></v-divider>

      <v-row v-if="donation.service_requests && donation.service_requests.length">
        <v-col cols="12">
          <h3>خدمت</h3>
        </v-col>
        <v-col cols="12" md="4">
          <strong>نوع خدمت:</strong>
          <span v-if="donation.service_requests[0].service_type === 'charge'">شارژ موبایل</span>
          <span v-else-if="donation.service_requests[0].service_type === 'internet'">بسته اینترنتی</span>
          <span v-else-if="donation.service_requests[0].service_type === 'inquiry'">استعلام</span>
          <span v-else>نامشخص</span>
        </v-col>
        <v-col cols="12" md="4">
          <strong>شماره:</strong> {{ donation.service_requests[0].input_data.mobile || '-' }}
        </v-col>
        <v-col cols="12" md="4">
          <strong>روش پرداخت:</strong>
          <span v-if="donation.service_requests[0].input_data.payment_method === 'wallet'">کیف پول</span>
          <span v-else-if="donation.service_requests[0].input_data.payment_method === 'gateway'">درگاه اینترنتی</span>
          <span v-else>-</span>
        </v-col>

        <v-col cols="12" v-if="donation.service_requests[0].provider_service">
          <v-card class="pa-3 mt-2 grey lighten-4">
            <h4>{{ donation.service_requests[0].provider_service.title }}</h4>
            <p v-if="donation.service_requests[0].provider_service.data?.volume_display">
              <strong>حجم:</strong> {{ donation.service_requests[0].provider_service.data.volume_display }}
            </p>
            <p v-if="donation.service_requests[0].provider_service.data?.period">
              <strong>مدت:</strong> {{ donation.service_requests[0].provider_service.data.period }}
            </p>
            <p v-if="donation.service_requests[0].provider_service.data?.usage_time_range">
              <strong>زمان استفاده:</strong> {{ donation.service_requests[0].provider_service.data.usage_time_range }}
            </p>
            <p><strong>قیمت:</strong> {{ formatPrice(donation.service_requests[0].provider_service.sale_price) }}</p>
          </v-card>
        </v-col>
      </v-row>

      <v-divider v-if="donation.gateway" class="my-4"></v-divider>

      <v-row v-if="donation.gateway">
        <v-col cols="12">
          <h3>اطلاعات درگاه</h3>
        </v-col>
        <v-col cols="12" md="6"><strong>نام درگاه:</strong> {{ donation.gateway.name || '-' }}</v-col>
        <v-col cols="12" md="6"><strong>مرچنت:</strong> {{ donation.gateway.merchant || '-' }}</v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CharityDonationDetailsView",
  data() {
    return {
      loading: true,
      donation: {}
    }
  },
  methods: {
    getDetails() {
      const id = this.$route.params.id
      window.axios.get(`v3/admin/charity/donation/${id}/details`).then(res => {
        this.donation = res.data.data
        this.loading = false
      })
    },
    formatPrice(value) {
      if (!value) return '-'
      const num = Number(value)
      return num.toLocaleString('fa-IR') + ' تومان'
    },
    formatDate(val) {
      return val ? new Date(val).toLocaleString('fa-IR') : '-'
    }
  },
  mounted() {
    this.getDetails()
  }
}
</script>

<style scoped>
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
