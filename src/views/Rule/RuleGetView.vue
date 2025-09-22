<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات قانون
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/rule/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ rule.label }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <v-card-text>نام: {{ rule.name }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>بخش: {{ rule.section }}</v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <v-card-text>نام ادمین (آخرین شخصی که این رکورد را ویرایش کرده است): {{ rule.admin_name }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>تاریخ ساخت: {{ rule.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>تاریخ آخرین ویرایش: {{ rule.updated_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text>محتوا :
                    <div v-html="rule.content">
                    </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="card-show mt-4 pa-4">
              <v-card-title>کاربرانی که قوانین را تایید کردند.</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
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
  name: "RuleGetView",
  data() {
    return {
      selectedVideoIdForShow: null,
      loading: true,
      rule: {},
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('admin/rule/get/' + this.$route.params.id).then((res) => {
        this.rule = res.data.data
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