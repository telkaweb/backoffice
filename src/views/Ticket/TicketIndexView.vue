<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-row>
        <v-col cols="12" class="text-left">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="error"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="deleteAllDialog=true">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <span>پاک کردن گروهی تیکت ها</span>
          </v-tooltip>
<!--          <ExportButton model="ticket"></ExportButton>-->
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
<!--          <v-tooltip bottom>-->
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--              <v-btn type="button" fab large color="#413b3b"-->
<!--                     v-bind="attrs" v-on="on" class="white&#45;&#45;text mx-1"-->
<!--                     @click="create()">-->
<!--                <v-icon>mdi-plus</v-icon>-->
<!--              </v-btn>-->
<!--            </template>-->
<!--            <span>ساخت تیکت جدید</span>-->
<!--          </v-tooltip>-->
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="tickets.data"
              :items-per-page="tickets.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="tickets.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
          >
            <template
                v-slot:[`item.section`]="{ item }">
              <div v-if="item.section === 'service'">سرویس های وی آی پی</div>
              <div v-else-if="item.section === 'transaction'">تراکنش</div>
              <div v-else-if="item.section === 'wallet'">کیف پول</div>
              <div v-else-if="item.section === 'general'">عمومی</div>
              <div v-else-if="item.section === 'travel'">سفر</div>
              <div v-else-if="item.section === 'hotel'">هتل</div>
              <div v-else-if="item.section === 'cip'">سی آی پی</div>
              <div v-else-if="item.section === 'insurance'">بیمه</div>
              <div v-else-if="item.section === 'atabat'">عتبات</div>
            </template>
            <template
                v-slot:[`item.is_seen`]="{ item }">
              <div v-if="item.is_seen">
                <v-icon color="success">mdi-check</v-icon>
              </div>
              <div v-else>
                <v-icon color="error">mdi-close</v-icon>
              </div>
            </template>
            <template
                v-slot:[`item.status`]="{ item }">
              <div v-if="item.status === 'open'">باز شده</div>
              <div v-else-if="item.status === 'pending'">منتظر</div>
              <div v-else-if="item.status === 'answered'">پاسخ داده شده</div>
              <div v-else-if="item.status === 'resolved'">حل شده</div>
            </template>
            <template
                v-slot:[`item.priority`]="{ item }">
              <div v-if="item.priority === 'high'" class="text-red">بالا</div>
              <div v-else-if="item.priority === 'medium'">معمولی</div>
              <div v-else-if="item.priority === 'low'" class="green--text">کم</div>
            </template>
            <template
                v-slot:[`item.operation`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="error"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="initialRemove(item.id)" elevation="0">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="primary"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="showItem(item.id)" elevation="0">
                    <v-icon>mdi-eye-outline</v-icon>
                  </v-btn>
                </template>
                <span>جزییات</span>
              </v-tooltip>
            </template>
            <template
                v-slot:[`item.multi-operation`]="{ item }">
              <v-row>
                <v-col class="text-left">
                  <v-checkbox color="error" v-model="selectedItems[item.id]">
                  </v-checkbox>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="deleteEntityDialog" width="50%">
      <v-card>
        <v-card-actions>
          <v-icon color="error" @click="deleteEntityDialog = false">mdi-close</v-icon>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-dialog-title">
              آیا از پاک کردن تیکت اطمینان دارید ؟
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn width="200px" color="warning" class="mx-16 letter-spacing-normal" @click="remove">بله، مطمئنم
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn width="200px" color="success" class="mx-16 letter-spacing-normal"
                     @click="deleteEntityDialog = false">خیر، منصرف شدم
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="deleteAllDialog"
        width="468"
    >
      <v-card>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="12" class="text-center">
            آیا از پاک شدن تمام اطلاعات انتخاب شده اطمینان دارید؟
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <v-btn color="success" @click="removeAllFinally()">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="error" @click="deleteAllDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
// import ExportButton from "@/components/Export/ExportButton.vue";

export default {
  name: "TicketIndexView",
  // components: {ExportButton},
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      tickets: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {text: 'کد', value: 'code', align: 'center', width: '5%', show: true, sortable: true},
        {
          text: 'نام کاربر',
          value: 'user_name',
          original_value: 'user_id',
          align: 'center',
          width: '8%',
          show: true,
          sortable: true
        },
        // {text: 'موضوع', value: 'title', align: 'center', width: '15%', show: true, sortable: true},
        {
          text: 'پاسخ داده شده در',
          value: 'answer_date_time_fa',
          original_value: 'answer_date_time',
          align: 'center',
          width: '5%',
          show: true,
          sortable: true
        },
        {text: 'بررسی شده؟', value: 'is_seen', align: 'center', width: '2%', show: true, sortable: true},
        {text: 'واحد', value: 'section', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'اولویت', value: 'priority', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '8%', show: true, sortable: true},
        {
          text: 'زمان ثبت',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {text: 'عملیات', value: 'operation', align: 'center', width: '15%', show: true, sortable: false},
        {text: 'عملیات گروهی', value: 'multi-operation', align: 'right', width: '5%', show: true, sortable: false},
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
    async removeAllFinally() {
      window.axios.post('/admin/ticket/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },
    getEntities() {
      let url = window.urlBuilder(this.tickets, 'admin/ticket/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.tickets = res.data.data
        this.loading = false
      })
    },
    create() {
      this.$router.push('/ticket/create')
    },
    showItem(entityID) {
      this.$router.push('/ticket/get/' + entityID)
    },
    remove() {
      window.axios.delete('admin/ticket/delete/' + this.selectedEntityID).then(() => {
        this.getEntities()
      })
      this.deleteEntityDialog = false
    },
    initialRemove(entityID) {
      this.selectedEntityID = entityID
      this.deleteEntityDialog = true
    }
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