<template>
  <div v-if="!loading">
    <v-card class="pa-4">
      <v-card-title>
        بروزرسانی قیمت سرویس
        <v-spacer></v-spacer>
        <v-btn small color="grey" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon> بازگشت
        </v-btn>
      </v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.provider_price"
                label="قیمت نماینده (تومان)"
                type="number"
                :rules="[v => !!v || 'این فیلد الزامی است']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.sale_price"
                label="قیمت فروش (تومان)"
                type="number"
                :rules="[v => !!v || 'این فیلد الزامی است']"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.description"
                label="توضیحات"
                rows="3"
                auto-grow
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-left">
              <v-btn color="success" :loading="saving" @click="updateService">
                <v-icon left>mdi-content-save</v-icon>
                ذخیره تغییرات
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>

  <div v-else>
    <v-skeleton-loader type="card"></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "KycServiceUpdate",
  data() {
    return {
      loading: true,
      saving: false,
      valid: false,
      form: {
        provider_price: null,
        sale_price: null,
        description: ''
      },
      snackbar: {
        show: false,
        text: "",
        color: "success"
      }
    }
  },
  methods: {
    showMessage(text, color = "success") {
      this.snackbar.text = text
      this.snackbar.color = color
      this.snackbar.show = true
    },
    getService() {
      const id = this.$route.params.id
      window.axios
        .get(`/v3/admin/kyc/service/${id}/details`)
        .then((res) => {
          const data = res.data.data
          this.form.provider_price = Number(data.provider_price)
          this.form.sale_price = Number(data.sale_price)
          this.form.description = data.description
        })
        .catch(() => {
          this.showMessage("خطا در دریافت اطلاعات سرویس", "error")
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateService() {
      if (!this.$refs.form.validate()) return
      this.saving = true
      const id = this.$route.params.id

      window.axios
        .post(`/v3/admin/kyc/service/${id}/update`, {
          provider_price: this.form.provider_price,
          sale_price: this.form.sale_price,
          description: this.form.description
        })
        .then(() => {
          this.showMessage("بروزرسانی با موفقیت انجام شد", "success")
          this.$router.back()
        })
        .catch(() => {
          this.showMessage("خطا در بروزرسانی سرویس", "error")
        })
        .finally(() => {
          this.saving = false
        })
    }
  },
  mounted() {
    this.getService()
  }
}
</script>
