<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>لیست محصولات اپراتور</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="filters.operator"
              :items="[
                { text: 'همه', value: null },
                { text: 'ایرانسل', value: 'mtn' },
                { text: 'همراه اول', value: 'mci' },
                { text: 'رایتل', value: 'rtl' }
              ]"
              label="اپراتور"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="filters.duration"
              :items="[
                { text: 'همه', value: null },
                { text: 'روزانه', value: 'daily' },
                { text: 'هفتگی', value: 'weekly' },
                { text: 'ماهانه', value: 'monthly' },
                { text: 'سالانه', value: 'yearly' }
              ]"
              label="بازه زمانی"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="filters.sim_type"
              :items="[
                { text: 'همه', value: null },
                { text: 'اعتباری', value: 'prepaid' },
                { text: 'دائمی', value: 'permanent' },
                { text: 'TD-LTE', value: 'tdlte' }
              ]"
              label="نوع سیم‌کارت"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="filters.order"
              :items="[
                { text: 'پیشفرض', value: null },
                { text: 'ارزان‌ترین', value: 'price_asc' },
                { text: 'گران‌ترین', value: 'price_desc' }
              ]"
              label="مرتب‌سازی"
              clearable
            ></v-select>
          </v-col>

          <v-col cols="12" class="d-flex align-center">
            <v-btn color="primary" class="mx-2" @click="getPackages">اعمال فیلتر</v-btn>
            <v-btn color="grey" @click="resetFilters">ریست</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="packages.data"
        :items-per-page="packages.per_page"
        :server-items-length="packages.total"
        :loading="loading"
        class="elevation-1"
        :options.sync="options"
      >

        <template v-slot:[`item.title`]="{ item }">
          <span>{{ item.title }}</span>
        </template>

        <template v-slot:[`item.volume`]="{ item }">
          <span>{{ item.data?.volume_display || '-' }}</span>
        </template>

        <template v-slot:[`item.period`]="{ item }">
          <span>{{ item.data?.period || '-' }}</span>
        </template>

        <template v-slot:[`item.operator`]="{ item }">
          <span>{{ formatOperator(item.operator) }}</span>
        </template>

        <template v-slot:[`item.sim_type`]="{ item }">
          <span>{{ formatSimType(item.sim_type) }}</span>
        </template>

        <template v-slot:[`item.provider_price`]="{ item }">
          <span>{{ formatPrice(item.provider_price) }}</span>
        </template>

        <template v-slot:[`item.sale_price`]="{ item }">
          <span>{{ formatPrice(item.sale_price) }}</span>
        </template>

        <template v-slot:[`item.updated_at`]="{ item }">
          <span class="ltr-cell">
            {{ item.updated_at ? new Date(item.updated_at).toLocaleString('fa-IR') : '-' }}
          </span>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "OperatorPackagesView",
  data() {
    return {
      loading: true,
      packages: { current_page: 1 },
      options: {},
      filters: {
        operator: null,
        duration: null,
        sim_type: null,
        order: null
      },
      headers: [
        { text: 'ردیف', value: 'row_number', align: 'center', sortable: false },
        { text: 'نام سرویس', value: 'title', align: 'center' },
        { text: 'حجم', value: 'volume', align: 'center' },
        { text: 'دوره', value: 'period', align: 'center' },
        { text: 'اپراتور', value: 'operator', align: 'center' },
        { text: 'نوع سیم‌کارت', value: 'sim_type', align: 'center' },
        { text: 'مبلغ نماینده (تومان)', value: 'provider_price', align: 'center' },
        { text: 'مبلغ فروش (تومان)', value: 'sale_price', align: 'center' },
        { text: 'آخرین بروزرسانی', value: 'updated_at', align: 'center' }
      ]
    }
  },
  watch: {
    options: {
      handler() { this.getPackages() },
      deep: true
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) return '-'
      const num = Number(value)
      return num.toLocaleString('fa-IR') + ' تومان'
    },
    formatOperator(op) {
      switch (op) {
        case 'mtn': return 'ایرانسل'
        case 'mci': return 'همراه اول'
        case 'rtl': return 'رایتل'
        default: return '-'
      }
    },
    formatSimType(type) {
      switch (type) {
        case 'prepaid': return 'اعتباری'
        case 'permanent': return 'دائمی'
        case 'tdlte': return 'TD-LTE'
        default: return '-'
      }
    },
    getPackages() {
      let url = 'v3/admin/operator/internet/packages'

      const params = {
        operator: this.filters.operator,
        duration: this.filters.duration,
        sim_type: this.filters.sim_type,
        order: this.filters.order,
        page: this.options.page || 1,
        per_page: this.options.itemsPerPage || 15
      }

      window.axios.post(url, params).then(res => {
        this.packages = res.data.data
        this.packages.data = (this.packages.data || []).map((it, idx) => ({
          ...it,
          row_number: (this.packages.from || 1) + idx
        }))
        this.loading = false
      })
    },
    resetFilters() {
      this.filters = { operator: null, duration: null, sim_type: null, order: null }
      this.getPackages()
    }
  },
  mounted() {
    this.getPackages()
  }
}
</script>

<style scoped>
.ltr-cell {
  direction: ltr;
  display: inline-block;
}
</style>
