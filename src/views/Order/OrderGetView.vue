<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات سفارش
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/order/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title># {{ order.id }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <v-card-text>خریدار: {{ order.user_name }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>استان: {{ order.state_name }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>شهر: {{ order.city_name }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>کد پستی: {{ order.receiver_postal_code }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>کد ملی: {{ order.receiver_national_code }}</v-card-text>
                  </v-col>
                  <v-col cols="8">
                    <v-card-text>آدرس خریدار: {{ order.receiver_address }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>کد دریافت : {{ order.receive_code }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>وضعیت: {{ order.status }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text> قیمت کل:
                      {{formatNumber(order.total_price)}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>
                      تخفیف کل:
                      {{formatNumber(order.total_discount)}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>
                      مالیات:
                      {{formatNumber(order.tax_amount)}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>
                      کل مبلغ پرداختی:
                      {{formatNumber(order.total_paid_price)}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>هزینه ارسال:
                      {{formatNumber(order.sending_price)}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>وضعیت پرداخت: {{ order.payment_status }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ثبت نام کاربر: {{ order.created_at_fa }}</v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <div v-if="order.details" class="mt-6">
              کالا های خریداری شده :
              <v-card v-for="detail in  order.details" :key="detail.id"  class="card-show mt-4">
                <v-card-text>
                  نام کالا:
                  {{detail.product.name}}
                </v-card-text>
                <v-card-text>
                  قیمت کالا:
                  {{formatNumber(detail.price)}}
                </v-card-text>
                <v-card-text>
                  تخفیف کالا:
                  {{formatNumber(detail.discount)}}
                </v-card-text>
                <v-card-text>
                  پرداختی بابت کالا:
                  {{formatNumber(detail.paid_price)}}
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>



export default {
  name: "OrderGetView",
  data() {
    return {
      loading: true,
      order: {},
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
      window.axios.get('admin/order/get/' + this.$route.params.id).then((res) => {
        this.order = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
  }
}
</script>

<style>

</style>