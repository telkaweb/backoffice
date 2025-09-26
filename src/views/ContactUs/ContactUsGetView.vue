<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات فرم تماس با ما
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/contact-us/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ contactUs.full_name }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    <v-card-text>موضوع : {{ contactUs.subject }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>شماره همراه : {{ contactUs.mobile }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>ایمیل: {{ contactUs.email }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ارسال فرم: {{ contactUs.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text>محتوا: {{ contactUs.content }}</v-card-text>
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
  name: "ContactUsGetView",
  data() {
    return {
      selectedVideoIdForShow: null,
      loading: true,
      contactUs: {},
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('v1/admin/contact-us/get/' + this.$route.params.id).then((res) => {
        this.contactUs = res.data.data
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