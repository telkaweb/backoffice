<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-row>
        <v-col cols="12" class="text-left">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="primary"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="approveAllDialog=true">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
            <span>تایید گروهی درخواست های عتبات (اگر کاربران مبلغ مورد نظر را در کیف پول نداشته باشند تایید نخواهد شد.)  </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="error"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="deleteAllDialog=true">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <span>پاک کردن گروهی درخواست های عتبات</span>
          </v-tooltip>
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
              :items="atabats.data"
              :items-per-page="atabats.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="atabats.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
          >
            <template
                v-slot:[`item.national_card_image`]="{ item }">
              <img :src="item.national_card_image" width="100" height="100" alt="cover">
            </template>
            <template
                v-slot:[`item.status`]="{ item }">
              <span v-if="item.status === 'approved'" class="text-green">تایید شده</span>
              <span v-if="item.status === 'rejected'">رد شده</span>
              <span v-if="item.status === 'pending'" class="text--primary">در انتظار تایید</span>
            </template>
            <template
                v-slot:[`item.passport_image`]="{ item }">
              <img :src="item.passport_image" width="100" height="100" alt="cover">
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
            <template
                v-slot:[`item.multi-approve`]="{ item }">
              <v-row>
                <v-col class="text-left">
                  <v-checkbox color="error" v-model="selectedItemsForApprove[item.id]">
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
              آیا از پاک کردن این درخواست عتبات اطمینان دارید ؟
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
        v-model="approveAllDialog"
        width="812"
    >
      <v-card>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="12" class="text-center">
            آیا از تایید شدن {{ selectedItemsForApprove.filter(value => value === true).length }} درخواست عتبات انتخاب
            شده اطمینان دارید؟
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <v-text-field color="black" v-model="amountPerPerson" label="مبلغ به ازای هر درخواست"
                              hint="این مبلغ از کیف پول تمام کاربرانی که انتخاب کرده اید در صورت وجود کسر خواهد شد و درخواست آن ها به حالت تایید شده در می آید."></v-text-field>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <v-btn color="success" @click="approveMultiRequest()">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="error" @click="approveAllDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
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
export default {
  name: "AtabatIndexView",
  data() {
    return {
      amountPerPerson: 0,
      openFieldsDialog: false,
      selectedItems: [],
      selectedItemsForApprove: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      approveAllDialog: false,
      atabats: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {
          text: 'نام کاربر سفارش دهنده',
          original_value: 'user_id',
          value: 'user_name',
          align: 'center',
          width: '20%',
          show: true,
          sortable: true
        },
        {text: 'نام و  خانوادگی', value: 'full_name', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نام پدر', value: 'father_name', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'کد ملی', value: 'national_code', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'تاریخ تولد', value: 'birth_date', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'شماره پاسپورت', value: 'passport_number', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'شماره اضطراری', value: 'emergency_mobile', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'تاریخ شروع', value: 'start_date', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'تاریخ پایان', value: 'end_date', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'آدرس', value: 'address', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'نوع', value: 'type', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'نیاز به ترنسفر', value: 'has_transfer', align: 'center', width: '5%', show: true, sortable: true},
        {
          text: 'کارت ملی (رو)',
          value: 'national_card_image_1',
          align: 'center',
          width: '5%',
          show: true,
          sortable: true
        },
        {
          text: 'کارت ملی(پشت)',
          value: 'national_card_image_2',
          align: 'center',
          width: '5%',
          show: true,
          sortable: true
        },
        {text: 'پاسپورت صفحه اول', value: 'passport_image_1', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'پاسپورت صفحه دوم', value: 'passport_image_2', align: 'center', width: '5%', show: true, sortable: true},
        {text: 'پاسپورت صفحه سوم', value: 'passport_image_3', align: 'center', width: '5%', show: true, sortable: true},
        {
          text: 'پاسپورت صفحه چهارم',
          value: 'passport_image_4',
          align: 'center',
          width: '5%',
          show: true,
          sortable: true
        },
        {
          text: 'زمان ثبت',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {
          text: 'وضعیت',
          value: 'status',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {text: 'عملیات', value: 'operation', align: 'center', width: '10%', show: true, sortable: false},
        {text: 'عملیات گروهی', value: 'multi-operation', align: 'right', width: '5%', show: true, sortable: false},
        {
          text: 'تایید گروهی درخواست ها',
          value: 'multi-approve',
          align: 'right',
          width: '10%',
          show: true,
          sortable: false
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
    approveMultiRequest() {
      window.axios.post('admin/atabat/approve', {
        amount: this.amountPerPerson,
        atabat_ids: this.selectedItemsForApprove
      }).then((res) => {
        this.approveAllDialog = false
        this.amountPerPerson = 0
        this.openSnackbar(res.data.message, '#413b3b')
      }).catch((err) => {
        if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      }).finally(() => {
        this.getEntities()
      })
    },
    async removeAllFinally() {
      window.axios.post('/admin/atabat/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },

    getEntities() {
      let url = window.urlBuilder(this.atabats, 'admin/atabat/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.atabats = res.data.data
        this.loading = false
      })
    },
    create() {
      this.$router.push('/atabat/create')
    },
    remove() {
      window.axios.delete('admin/atabat/delete/' + this.selectedEntityID).then(() => {
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