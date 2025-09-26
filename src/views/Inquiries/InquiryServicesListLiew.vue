<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>
        لیست سرویس‌های استعلام
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="services.data"
        :items-per-page="services.per_page"
        :server-items-length="services.total"
        :loading="loading"
        class="elevation-1"
        :options.sync="options"
        @click:row="goToUpdate"
      >
        <template v-slot:[`item.description`]="{ item }">
          <span class="desc-cell">{{ item.description || '-' }}</span>
        </template>

        <template v-slot:[`item.provider_price`]="{ item }">
          <span>{{ formatPrice(item.provider_price) }}</span>
        </template>

        <template v-slot:[`item.sale_price`]="{ item }">
          <span>{{ formatPrice(item.sale_price) }}</span>
        </template>

        <template v-slot:[`item.commission`]="{ item }">
          <span>{{ formatCommission(item.commission) }}</span>
        </template>

        <template v-slot:[`item.updated_at`]="{ item }">
          <span>{{ formatDate(item.updated_at) }}</span>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "KycServiceList",
  data() {
    return {
      loading: true,
      services: { current_page: 1 },
      options: {},
      headers: [
        { text: 'عنوان سرویس', value: 'title', align: 'center' },
        { text: 'توضیحات', value: 'description', align: 'center' },
        { text: 'مبلغ نماینده (تومان)', value: 'provider_price', align: 'center' },
        { text: 'مبلغ فروش (تومان)', value: 'sale_price', align: 'center' },
        { text: 'کارمزد (%)', value: 'commission', align: 'center' },
        { text: 'آخرین بروزرسانی', value: 'updated_at', align: 'center' }
      ]
    }
  },
  watch: {
    options: {
      handler() {
        this.getServices()
      },
      deep: true
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) return '-'
      return Number(value).toLocaleString('fa-IR') + ' تومان'
    },
    formatCommission(value) {
      if (!value) return '-'
      return Number(value).toLocaleString('fa-IR') + ' %'
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString('fa-IR') : '-'
    },
    getServices(page = 1) {
      let url = `/v3/admin/kyc/service/list?page=${page}`
      window.axios.get(url).then(res => {
        this.services = res.data.data
        this.services.data = (this.services.data || []).map((it, idx) => ({
          ...it,
          row_number: (this.services.from || 1) + idx
        }))
        this.loading = false
      })
    },
    goToUpdate(item) {
      this.$router.push(`/inquiries/service/${item.unique_key}/edit`)
    }
  },
  mounted() {
    this.getServices()
  }
}
</script>
<style scoped>
.desc-cell {
  max-width: 400px; 
  white-space: normal;
  word-wrap: break-word; 
  display: inline-block;
}
</style>
