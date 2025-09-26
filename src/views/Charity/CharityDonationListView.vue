<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        لیست واریزی‌ها
      </v-card-title>
      <v-card-text>
        <v-col cols="12" class="text-left">
          <v-btn width="200px" class="main-button" @click="$router.push('/charity/index')">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

        <v-data-table
          hover
          id="donations-table"
          class="table c-table rounded-t-lg number-font"
          :options.sync="options"
          :headers="headers.filter(h => h.show)"
          :items="donations.data"
          :items-per-page="donations.per_page"
          :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
          :server-items-length="donations.total"
          :fixed-header="true"
          item-value="index"
          :loading="loading"
        >

          <template v-slot:[`item.charity_name`]="{ item }">
            <span>{{ item.charity_name }}</span>
          </template>

          <template v-slot:[`item.amount`]="{ item }">
            <span>{{ formatPrice(item.amount) }}</span>
          </template>

          <template v-slot:[`item.donation_type`]="{ item }">
            <v-chip :color="item.service_requests.length ? 'info' : 'success'" small dark>
              <span v-if="!item.service_requests.length">مستقیم</span>
              <span v-else>
                خرید خدمات - 
                <span v-if="item.service_requests[0].service_type === 'charge'">شارژ موبایل</span>
                <span v-else-if="item.service_requests[0].service_type === 'internet'">بسته اینترنتی</span>
                <span v-else-if="item.service_requests[0].service_type === 'inquiry'">استعلام</span>
                <span v-else>نامشخص</span>
              </span>
            </v-chip>
          </template>

          <template v-slot:[`item.payment_method`]="{ item }">
            <span v-if="!item.service_requests.length">-</span>
            <span v-else>
              {{ item.service_requests[0].input_data.payment_method === 'wallet' ? 'کیف پول' : 'درگاه اینترنتی' }}
            </span>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status === 'success' ? 'success' : 'error'" small dark>
              {{ item.status === 'success' ? 'موفق' : 'ناموفق' }}
            </v-chip>
          </template>

          <template v-slot:[`item.created_at_fa`]="{ item }">
            <span class="ltr-cell">{{ item.created_at_fa }}</span>
          </template>

          <template v-slot:[`item.user_info`]="{ item }">
            <span>
              {{ item.user?.full_name && item.user.full_name.trim() !== '' ? item.user.full_name : 'نامشخص' }}
              ({{ item.user?.mobile || '-' }})
            </span>
          </template>

          <template v-slot:[`item.operation`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn type="button" fab x-small color="primary"
                       v-bind="attrs" v-on="on" class="white--text mx-1"
                       @click="details(item.unique_key)" elevation="0">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>جزئیات</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CharityDonationsView",
  data() {
    return {
      loading: true,
      donations: { current_page: 1 },
      headers: [
        { text: 'ردیف', value: 'row_number', align: 'center', width: '5%', show: true, sortable: false },
        { text: 'صندوق', value: 'charity_name', align: 'center', width: '20%', show: true, sortable: false },
        { text: 'مبلغ کمک (تومان)', value: 'amount', align: 'center', width: '10%', show: true, sortable: true },
        { text: 'توضیحات', value: 'description', align: 'center', width: '20%', show: true, sortable: false },
        { text: 'نوع واریزی', value: 'donation_type', align: 'center', width: '15%', show: true, sortable: false },
        { text: 'روش پرداخت', value: 'payment_method', align: 'center', width: '10%', show: true, sortable: false },
        { text: 'وضعیت', value: 'status', align: 'center', width: '8%', show: true, sortable: true },
        { text: 'کاربر', value: 'user_info', align: 'center', width: '15%', show: true, sortable: false },
        { text: 'تاریخ', value: 'created_at_fa', align: 'center', width: '15%', show: true, sortable: true },
        { text: 'عملیات', value: 'operation', align: 'center', width: '8%', show: true, sortable: false },
      ],
      options: {}
    }
  },
  watch: {
    options: {
      handler() { this.getDonations() },
      deep: true
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) return '-'
      const num = Number(value)
      return num.toLocaleString('fa-IR') + ' تومان'
    },
    getDonations() {
      const id = this.$route.params.id
      let url = window.urlBuilder(this.donations, `v3/admin/charity/${id}/donation`, this.options, this.headers)

      window.axios.get(url).then(res => {
        this.donations = res.data.data
        this.donations.data = (this.donations.data || []).map((it, idx) => ({
          ...it,
          row_number: (this.donations.from || 1) + idx,
          charity_name: it.charity_fund?.name || '-',
          created_at_fa: it.created_at ? new Date(it.created_at).toLocaleString('fa-IR') : '-'
        }))
        this.loading = false
      })
    },
    details(donationKey) {
      this.$router.push(`/charity/donations/${donationKey}/details`)
    }
  },
  mounted() {
    this.getDonations()
  }
}
</script>

<style scoped>
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
