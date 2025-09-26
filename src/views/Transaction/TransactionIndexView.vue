<template>
  <div v-if="!loading">
    <v-card class="mt-6 card-show">
      <v-row>
        <v-col cols="12" class="text-left mt-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="#413b3b"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="openFieldsDialog = true">
                <v-icon>mdi-land-fields</v-icon>
              </v-btn>
            </template>
            <span>فیلد ها</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="#01601d"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="getWithdrawExport()">
                <v-icon>mdi-file-excel-box</v-icon>
              </v-btn>
            </template>
            <span>گرفتن خروجی درخواست های برداشت</span>
          </v-tooltip>
          <ExportButton model="transaction"></ExportButton>
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="transactions.data"
              :items-per-page="transactions.per_page"
              :server-items-length="transactions.total"
              :fixed-header="true"
              item-value="index"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :loading="loading"
          >
            <template
                v-slot:[`item.amount`]="{ item }">
               ریال&nbsp;&nbsp;{{ formatNumber(item.amount) }}
            </template>
            <template
                v-slot:[`item.type`]="{ item }">
              <div v-if="item.type === 'deposit'" class="text-green">واریز</div>
              <div v-else class="text-red">برداشت</div>
            </template>
            <template
                v-slot:[`item.status`]="{ item }">
              <div v-if="item.status === 'success'" class="text-green">موفق</div>
              <div v-else-if="item.status === 'failed'" class="text-red">ناموفق</div>
              <div v-else-if="item.status === 'cancel'" class="text--black">کنسل شده از سمت کاربر</div>
              <div v-else-if="item.status === 'waiting'" class="text-grey">در حال انتظار</div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
        v-model="openFieldsDialog"
        width="468"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="openFieldsDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="6" v-for="header in headers" :key="header.id" class="text-right">
            {{ header.text }}
            <v-switch v-model="header.show" :false-value="false" :true-value="true"></v-switch>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ExportButton from "@/components/Export/ExportButton.vue";

export default {
  name: "TransactionIndexView",
  components: {ExportButton},
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      transactions: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true},
        {text: 'مبلغ', value: 'amount', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نوع', value: 'type', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'شناسه کیف پول', value: 'wallet_id', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'توضیحات', value: 'description', align: 'center', width: '12%', show: true, sortable: true},
        {text: 'شناسه کاربر', value: 'user_id', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'نام کاربر', value: 'user_name', original_value:'user_id',align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نام فروشنده', value: 'admin_name', original_value:'admin_id',align: 'center', width: '10%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'جزییات', value: 'details', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'روش', value: 'method', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'آتوریتی', value: 'authority', align: 'center', width: '5%', show: false, sortable: true},
        {text: 'شناسه رفرتس', value: 'refid', align: 'center', width: '5%', show: false, sortable: true},
        {text: 'توکن', value: 'token', align: 'center', width: '5%', show: false, sortable: true},
        {text: 'شهر کد', value: 'shahr_tracking_code', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شناسه تراکنش متصل', value: 'transaction_id', align: 'center', width: '10%', show: false, sortable: true},
        {text: 'نوع شارژ', value: 'charge_type', align: 'center', width: '10%', show: true, sortable: true},
        {
          text: 'لحظه تراکنش',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true
        },
      ],
      options: {},
      selectedEntityID: null,
    }
  },
  watch: {
    options: {
      handler() {
          this.getEntities()
      },
      deep: true,
    },
  },
  methods: {
    getWithdrawExport() {
      window.axios.get('v1/admin/withdraw/export').then((res) => {
        window.location.href = res.data.data
      })
    },
    formatNumber(value) {
      const numericValue = parseFloat(value);
      return numericValue.toLocaleString();
    },
    getEntities() {
      let url = window.urlBuilder(this.transactions, 'v1/admin/transaction/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.transactions = res.data.data
        this.loading = false
      })
    },
  },
  mounted() {
    this.getEntities()
  }
}
</script>

<style scoped>
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

.table-show {
  background-color: rgba(65, 59, 59, 0.02) !important;
}

.text-red {
  color: red;
}

.text-green {
  color: darkgreen;
}

.text-grey {
  color: grey;
}
</style>