<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>لیست استعلام‌ها</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="4" md="3">
            <v-text-field
              v-model="filters.tracking_code"
              label="کد پیگیری"
              clearable
            />
          </v-col>

          <v-col cols="4" md="3">
            <v-select
              v-model="filters.status"
              :items="statusItems"
              label="وضعیت"
              clearable
            />
          </v-col>

          <v-col cols="4" md="3" class="d-flex align-center">
            <v-btn color="primary" class="mx-2" @click="getInquiries">اعمال فیلتر</v-btn>
            <v-btn color="grey" @click="resetFilters">ریست</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        id="kyc-inquiries-table"
        class="table c-table rounded-t-lg number-font"
        :headers="headers"
        :items="inquiries.data"
        :items-per-page="inquiries.per_page"
        :server-items-length="inquiries.total"
        :fixed-header="true"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
        :options.sync="options"
        item-value="index"
        hover
      >
        <template v-slot:[`item.provider_service`]="{ item }">
          <span>{{ item.provider_service?.title || '-' }}</span>
        </template>

        <template v-slot:[`item.req_num`]="{ item }">
          <span>{{ item.req_num || '-' }}</span>
        </template>

        <template v-slot:[`item.input_summary`]="{ item }">
          <span>{{ summarizeInput(item) }}</span>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="statusColor(item.status)" small dark>{{ statusText(item.status) }}</v-chip>
        </template>

        <template v-slot:[`item.response_message`]="{ item }">
          <span>{{ item.response_message || '-' }}</span>
        </template>

        <template v-slot:[`item.user_info`]="{ item }">
          <span>
            {{ item.user?.full_name && item.user.full_name.trim() !== '' ? item.user.full_name : 'نامشخص' }}
            ({{ item.user?.mobile || '-' }})
          </span>
        </template>

        <template v-slot:[`item.created_at_fa`]="{ item }">
          <span class="ltr-cell">{{ item.created_at_fa }}</span>
        </template>

        <template v-slot:[`item.operation`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs" v-on="on"
                type="button" fab x-small color="primary"
                class="white--text mx-1"
                @click="details(item.unique_key)"
                elevation="0"
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
  name: 'KycInquiryListView',
  data() {
    return {
      loading: true,
      inquiries: { current_page: 1 },
      options: {},
      filters: {
        tracking_code: null,
        status: null
      },
      statusItems: [
        { text: 'همه', value: null },
        { text: 'در انتظار', value: 'pending' },
        { text: 'در حال پردازش', value: 'processing' },
        { text: 'موفق', value: 'successful' },
        { text: 'ناموفق', value: 'failed' }
      ],
      headers: [
        { text: 'ردیف', value: 'row_number', align: 'center', sortable: false, width: '6%' },
        { text: 'کد پیگیری', value: 'req_num', align: 'center', sortable: false, width: '14%' },
        { text: 'عنوان سرویس', value: 'provider_service', align: 'center', sortable: false, width: '18%' },
        { text: 'کاربر', value: 'user_info', align: 'center', sortable: false, width: '16%' },
        { text: 'ورودی استعلام', value: 'input_summary', align: 'center', sortable: false, width: '20%' },
        { text: 'پیام پاسخ', value: 'response_message', align: 'center', sortable: false, width: '14%' },
        { text: 'وضعیت', value: 'status', align: 'center', sortable: true, width: '8%' },
        { text: 'تاریخ', value: 'created_at_fa', align: 'center', sortable: true, width: '12%' },
        { text: 'عملیات', value: 'operation', align: 'center', sortable: false, width: '8%' },
      ]
    }
  },
  watch: {
    options: {
      handler() { this.getInquiries() },
      deep: true
    }
  },
  methods: {
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
    summarizeInput(item) {
      const input = item.input_data || {}
      if (input.card) return `کارت: ${input.card}`
      if (input.iban) return `شبا: ${input.iban}`
      if (input.deposit || input.bankCode) {
        const bank = input.bankCode ? `بانک: ${input.bankCode}` : ''
        const dep = input.deposit ? `حساب: ${input.deposit}` : ''
        return [bank, dep].filter(Boolean).join(' - ') || '-'
      }
      if (input.service_key) return `کلید سرویس: ${input.service_key}`
      return '-'
    },
    getInquiries() {
      let url = window.urlBuilder(this.inquiries, 'v3/admin/kyc/inquiry/list', this.options, this.headers)

      const body = {
        tracking_number: this.filters.tracking_code || '',
        status: this.filters.status || ''
      }

      window.axios.post(url, body).then(res => {
        this.inquiries = res.data.data
        this.inquiries.data = (this.inquiries.data || []).map((it, idx) => ({
          ...it,
          row_number: (this.inquiries.from || 1) + idx,
          created_at_fa: it.created_at ? new Date(it.created_at).toLocaleString('fa-IR') : '-'
        }))
        this.loading = false
      })
    },
    resetFilters() {
      this.filters = { tracking_code: null, status: null }
      this.getInquiries()
    },
    details(uniqueKey) {
      this.$router.push(`/inquiries/request/${uniqueKey}/details`)
    }
  },
  mounted() {
    this.getInquiries()
  }
}
</script>

<style scoped>
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
