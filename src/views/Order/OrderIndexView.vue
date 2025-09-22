<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-row>
        <v-col cols="12" class="text-left">
          <ExportButton model="order"></ExportButton>
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
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="orders.data"
              :items-per-page="orders.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="orders.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
          >
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
  name: "OrderIndexView",
  components: {ExportButton},
  data() {
    return {
      openFieldsDialog: false,
      loading: true,
      orders: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {
          text: 'نام کاربر',
          value: 'user_name',
          original_value: 'user_id',
          align: 'center',
          width: '8%',
          show: true,
          sortable: true
        },
        {
          text: 'نام تور',
          value: 'tour_title',
          original_value: 'tour_id',
          align: 'center',
          width: '8%',
          show: true,
          sortable: true
        },
        {
          text: 'نام خدمات',
          value: 'vip_service_title',
          original_value: 'vip_service_id',
          align: 'center',
          width: '8%',
          show: true,
          sortable: true
        },
        {text: 'شناسه عتبات', value: 'atabat_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'شناسه هتل', value: 'hotel_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'شناسه تشریفات', value: 'cip_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'شناسه بیمه', value: 'insurance_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'شناسه سفر', value: 'trip_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'قیمت کل', value: 'paid_price', align: 'center', width: '5%', show: true, sortable: true},
        {
          text: 'زمان ثبت',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
      ],
      selectedEntityID: null,
      options: {},
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
    getEntities() {
      let url = window.urlBuilder(this.orders, 'admin/order/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.orders = res.data.data
        this.loading = false
      })
    },
    showItem(entityID) {
      this.$router.push('/order/get/' + entityID)
    },
    sendItem(item) {
      if (item.receive_code) {
        return this.openSnackbar('این کالا از قبل ارسال شده است.', '#413b3b')
      }
      window.axios.get('admin/order/send/' + item.id).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
        this.getEntities()
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