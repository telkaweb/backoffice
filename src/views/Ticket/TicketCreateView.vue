<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت تیکت جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/ticket/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            اگر مربوط به تیکت های گذشته نیست این قسمت را خالی بگذاربد
            <v-autocomplete color="black" item-value="id" item-text="title" :items="tickets"
                            label="تیکت مورد نظر را انتخاب کنید"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="ticket.title" label="عنوان تیکت" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select v-model="ticket.section" color="black" item-value="value" item-text="label" :items="sections"
                      label="بخش مورد نظر را انتخاب کنید"></v-select>
          </v-col>
          <v-col cols="3" v-if="ticket.section === 'transaction' || ticket.section === 'convert'">
            <v-autocomplete color="black" item-value="id" item-text="created_at_fa" :items="transactions"
                            label="تراکنش مورد نظر را انتخاب کنید"></v-autocomplete>
          </v-col>
          <v-col cols="12">
            اگر اولویت بالا ندارد مقدار کم را انتخاب کنید این امر باعث رسیدگی سریعتر به مشکل شما و مشتریان شما خواهد شد.
            <v-select v-model="ticket.priority" color="black" item-value="value" item-text="label" :items="priorities"
                      label="اولویت تیکت ارسالی را انتخاب کنید"></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea color="black" label="متن تیکت" v-model="ticket.content"></v-textarea>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


export default {
  name: "TicketCreateView",
  data() {
    return {
      loading: false,
      tickets: [],
      transactions: [],
      priorities: [
        {value: 'high', label: 'زیاد'},
        {value: 'medium', label: 'متوسط'},
        {value: 'low', label: 'کم'},
      ],
      sections: [
        {value: 'transaction', label: 'تراکنش'},
        {value: 'convert', label: 'تبدیل دارایی'},
      ],
      ticket: {
        ticket_id: null,
        product_id: null,
        transaction_id: null,
        title: null,
        content: null,
        section: null,
        priority: null,
      },
    }
  },
  mounted() {
    this.getMyTickets()
    this.getMyTransactions()
  },
  methods: {
    getMyTickets() {
      window.axios.get('v1/admin/ticket/my?per_page=1000').then((res) => {
        this.tickets = res.data.data.data
      })
    },
    getMyTransactions() {
      window.axios.get('v1/admin/transaction/my?per_page=10000').then((res) => {
        this.transactions = res.data.data.data
      })
    },
    create() {
      window.axios.post('v1/admin/ticket/create/', {
        ticket_id: this.ticket.ticket_id,
        product_id: this.ticket.product_id,
        transaction_id: this.ticket.transaction_id,
        title: this.ticket.title,
        content: this.ticket.content,
        section: this.ticket.section,
        priority: this.ticket.priority,
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
  }
}
</script>

<style>
.main-margin {
  margin: 2vh 6vw 2vh 2vw;
}

.main-padding {
  padding: 1vh 2vw;
}

.text-dialog-title {
  font-size: 18px;
  font-weight: 800;
}

.letter-spacing-normal {
  letter-spacing: normal;
}
</style>