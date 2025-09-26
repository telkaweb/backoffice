<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات کاربر
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/user/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ user.name }}</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="3">
                      <v-card-text>ایمیل: {{ user.email }} </v-card-text>
                    </v-col>
                    <v-col cols="3">
                      <v-card-text>شماره همراه: {{ user.mobile }} </v-card-text>
                    </v-col>
                    <v-col cols="3">
                      <v-card-text>وضعیت کاربر: {{ user.status }} </v-card-text>
                    </v-col>
                    <v-col cols="3">
                      <v-card-text>تاریخ ثبت نام کاربر: {{ user.created_at_fa }} </v-card-text>
                    </v-col>
                  </v-row>
                </v-card-text>
            </v-card>

            <v-card class="card-show mt-6">
              <v-card-title>کیف پول </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="card-show mt-6">
              <v-card-title>تراکنش ها </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="card-show mt-6">
              <v-card-title>سفارشات </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="card-show mt-6">
              <v-card-title>نتایج احراز هویت </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="card-show mt-6">
              <v-card-title>امتیازات </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


export default {
  name: "AdminGetView",
  data() {
    return {
      loading: true,
      user: {}
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('v1/admin/user/get/' + this.$route.params.id).then((res) => {
        this.user = res.data.data
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