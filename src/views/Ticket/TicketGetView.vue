<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات تیکت
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/ticket/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ ticket.title }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <v-card-text>شناسه تیکت: {{ ticket.id }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>کد تیکت: {{ ticket.code }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>اولویت تیکت: {{ ticket.priority }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>بخش تیکت: {{ ticket.section }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>مشاهده شده؟: {{ ticket.is_seen }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>وضعیت: {{ ticket.status }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ثبت نام کاربر: {{ ticket.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    {{ ticket.content }}
                  </v-col>
                  <v-col cols="12" v-if="ticket.children_recursive">
                    <TicketComponent :children="ticket.children_recursive"/>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <v-textarea color="black" label="متن پاسخ را بنویسید." v-model="response.content">
                    </v-textarea>
                    <v-btn width="200px" class="main-button white--text" @click="answer">
                      ارسال پاسخ
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card v-if="ticket.user_name" class="card-show mt-4">
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    کاربر: {{ ticket.full_user.first_name }}
                    {{ ticket.full_user.last_name }}
                  </v-col>
                  <v-col cols="3">
                    شماره همراه : {{ ticket.full_user.mobile }}
                  </v-col>
                  <v-col cols="3">
                    ایمیل : {{ ticket.full_user.email }}
                  </v-col>
                  <v-col cols="3">
                    کد ملی : {{ ticket.full_user.national_code }}
                  </v-col>
                  <v-col cols="3">
                    وضعیت : {{ ticket.full_user.status }}
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


import TicketComponent from "@/components/Ticket/TicketComponent.vue";

export default {
  name: "TicketGetView",
  components: {TicketComponent},
  data() {
    return {
      loading: true,
      ticket: {},
      response: {
        content: null
      }
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('admin/ticket/get/' + this.$route.params.id).then((res) => {
        this.ticket = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    answer() {
      window.axios.post('admin/ticket/answer/' + this.$route.params.id, {
        content: this.response.content
      }).then((res) => {
        this.getEntity()
        this.openSnackbar(res.data.message, '#413b3b')
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    }
  }
}
</script>

<style>

</style>