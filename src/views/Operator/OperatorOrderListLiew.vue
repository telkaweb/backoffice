<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>لیست سفارش‌های اپراتور</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="filters.service_type"
              :items="[
                { text: 'همه', value: null },
                { text: 'شارژ', value: 'charge' },
                { text: 'بسته اینترنتی', value: 'internet' }
              ]"
              label="نوع سرویس"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="filters.status"
              :items="[
                { text: 'همه', value: null },
                { text: 'در انتظار', value: 'pending' },
                { text: 'در حال پردازش', value: 'processing' },
                { text: 'موفق', value: 'successful' },
                { text: 'ناموفق', value: 'failed' }
              ]"
              label="وضعیت سفارش"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="filters.tracking_number"
              label="شماره پیگیری"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <v-btn color="primary" class="mx-2" @click="getOrders">اعمال فیلتر</v-btn>
            <v-btn color="grey" @click="resetFilters">ریست</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="orders.data"
        :items-per-page="orders.per_page"
        :server-items-length="orders.total"
        :loading="loading"
        class="elevation-1"
        :options.sync="options"
      >

        <template v-slot:[`item.service_type`]="{ item }">
          <span>
            {{ item.service_type === 'charge' ? 'شارژ موبایل' : 'بسته اینترنتی' }}
          </span>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          <span>{{ formatAmount(item) }}</span>
        </template>

        <template v-slot:[`item.payment_method`]="{ item }">
          <span>
            {{ item.input_data.payment_method === 'wallet' ? 'کیف پول' : 'درگاه اینترنتی' }}
          </span>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="statusColor(item.status)"
            dark
            small
          >
            {{ statusText(item.status) }}
          </v-chip>
        </template>

        <template v-slot:[`item.created_at`]="{ item }">
          <span class="ltr-cell">
            {{ new Date(item.created_at).toLocaleString('fa-IR') }}
          </span>
        </template>

        <template v-slot:[`item.user`]="{ item }">
          <span>
            {{ item.user?.full_name && item.user.full_name.trim() !== '' ? item.user.full_name : 'نامشخص' }}
            ({{ item.user?.mobile || '-' }})
          </span>
        </template>

        <template v-slot:[`item.service_mobile`]="{ item }">
          <span>{{ item.input_data.mobile }}</span>
        </template>

        <template v-slot:[`item.operator`]="{ item }">
          <span>{{ formatOperator(item) }}</span>
        </template>

        <template v-slot:[`item.req_num`]="{ item }">
          <span>{{ item.req_num }}</span>
        </template>

        <template v-slot:[`item.provider_service`]="{ item }">
          <span>{{ item.provider_service?.title || '-' }}</span>
        </template>

        <template v-slot:[`item.operation`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                type="button"
                fab
                x-small
                color="primary"
                class="white--text mx-1"
                elevation="0"
                v-bind="attrs"
                v-on="on"
                @click="viewDetails(item.unique_key)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>جزئیات</span>
          </v-tooltip>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "OperatorOrdersView",
  data() {
    return {
      loading: true,
      orders: { current_page: 1 },
      options: {},
      filters: {
        service_type: null,
        status: null,
        tracking_number: null,
      },
      headers: [
        { text: 'ردیف', value: 'row_number', align: 'center', sortable: false },
        { text: 'نوع سرویس', value: 'service_type', align: 'center' },
        { text: 'اپراتور', value: 'operator', align: 'center' },
        { text: 'نام سرویس', value: 'provider_service', align: 'center' },
        { text: 'مبلغ (تومان)', value: 'amount', align: 'center' },
        { text: 'کاربر(خریدار)', value: 'user', align: 'center' },
        { text: 'گیرنده سرویس', value: 'service_mobile', align: 'center' },
        { text: 'روش پرداخت', value: 'payment_method', align: 'center' },
        { text: 'شماره پیگیری', value: 'req_num', align: 'center' },
        { text: 'تاریخ انجام', value: 'created_at', align: 'center' },
        { text: 'وضعیت', value: 'status', align: 'center' },
        { text: 'عملیات', value: 'operation', align: 'center', sortable: false }, 
      ]
    }
  },
  watch: {
    options: {
      handler() { this.getOrders() },
      deep: true
    }
  },
  methods: {
    viewDetails(orderKey) {
      this.$router.push(`/operator/order/${orderKey}/details`)
    },
    formatOperator(item) {
      let op = null
      if (item.service_type === 'internet') {
        op = item.provider_service?.operator || null
      } else {
        op = item.input_data?.operator || null
      }
      if (!op) return '-'
      switch (op.toLowerCase()) {
        case 'mtn': return 'ایرانسل'
        case 'mci': return 'همراه اول'
        case 'rtl': return 'رایتل'
        default: return op
      }
    },
    formatAmount(item) {
      if (item.service_type === 'internet') {
        if (item.provider_service?.sale_price) {
          return Number(item.provider_service.sale_price).toLocaleString('fa-IR') + ' تومان'
        }
        return '-'
      }
      if (item.service_type === 'charge') {
        if (item.input_data?.amount) {
          return Number(item.input_data.amount).toLocaleString('fa-IR') + ' تومان'
        }
        return '-'
      }
      return '-'
    },
    statusText(status) {
      switch (status) {
        case 'pending': return 'در انتظار'
        case 'processing': return 'در حال پردازش'
        case 'successful': return 'موفق'
        case 'failed': return 'ناموفق'
        default: return '-'
      }
    },
    statusColor(status) {
      switch (status) {
        case 'pending': return 'grey'
        case 'processing': return 'info'
        case 'successful': return 'green'
        case 'failed': return 'red'
        default: return 'grey'
      }
    },
    getOrders() {
      let url = window.urlBuilder(this.orders, 'v3/admin/operator/order/list', this.options, this.headers)
      const body = {
        service_type: this.filters.service_type || '',
        status: this.filters.status || '',
        tracking_number: this.filters.tracking_number || ''
      }

      window.axios.post(url, body).then(res => {
        this.orders = res.data.data
        this.orders.data = (this.orders.data || []).map((it, idx) => ({
          ...it,
          row_number: (this.orders.from || 1) + idx
        }))
        this.loading = false
      })
    },
    resetFilters() {
      this.filters = { service_type: null, status: null, tracking_number: null }
      this.getOrders()
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style scoped>
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
