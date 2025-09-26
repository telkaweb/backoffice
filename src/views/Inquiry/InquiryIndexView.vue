<template>
  <div>
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
              <span>پاک کردن گروهی استعلام ها</span>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn type="button" fab large color="#413b3b"
                       v-bind="attrs" v-on="on" class="white--text mx-1"
                       @click="create()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>درخواست استعلام جدید</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12">
            <v-data-table
                hover
                id="sh-table"
                class="table c-table rounded-t-lg number-font t14300 table-show "
                :options.sync="options"
                :headers="headers.filter((header) => header.show)"
                :items="inquiries.data"
                :items-per-page="inquiries.per_page"
                :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
                :server-items-length="inquiries.total"
                :fixed-header="true"
                item-value="index"
                :loading="loading"
            >
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
                <v-tooltip bottom v-if="item.status !== 'entered_otp'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn type="button" fab x-small color="secondary"
                           v-bind="attrs" v-on="on" class="white--text mx-1"
                           @click="enterOtpInitial(item.id)" elevation="0">
                      <v-icon>mdi-code-json</v-icon>
                    </v-btn>
                  </template>
                  <span>وارد کردن کد پیامک شده</span>
                </v-tooltip>
                <v-tooltip bottom v-if="item.status === 'entered_otp'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn type="button" fab x-small color="teal"
                           v-bind="attrs" v-on="on" class="white--text mx-1"
                           @click="checkStatus(item.id)" elevation="0">
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </template>
                  <span>چک کردن وضعیت استعلام</span>
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
    </div>
    <div v-else style="margin-top: 30vh">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-progress-circular size="500" color="#e5daa8" indeterminate>
            در حال اتصال به سامانه
          </v-progress-circular>
        </v-col>
      </v-row>

    </div>
    <v-dialog v-model="deleteEntityDialog" width="50%">
      <v-card>
        <v-card-actions>
          <v-icon color="error" @click="deleteEntityDialog = false">mdi-close</v-icon>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-dialog-title">
              آیا از پاک کردن استعلام اطمینان دارید ؟
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

    <v-dialog
        v-model="enterOtpDialog"
        width="468"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="enterOtpDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="12">
            <v-text-field color="black" type="number" label="کد را وارد کنید"
                          hint="کد ,پیامک شده به شماره همراه وارد شده." v-model="otp"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn width="200px" color="secondary" class="mx-16 letter-spacing-normal" @click="enterOtp">ارسال کد
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  name: "InquiryIndexView",
  data() {
    return {
      otp: null,
      selectedInquiryId: null,
      enterOtpDialog: false,
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      inquiries: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {text: 'شماره همراه', value: 'mobile', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'کد ملی', value: 'national_code', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شناسه پیگیری', value: 'track_id', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'کد هش', value: 'hash_code', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نتیجه', value: 'result', align: 'center', width: '25%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '5%', show: true, sortable: true},
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
    checkStatus(itemID) {
      this.loading = true
      window.axios.get('/admin/inquiry/check-status/' + itemID).then((res) => {
        window.open(res.data.data.data.reportLink, '_blank');
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        } else if (err.response.status === 500) {
          this.openSnackbar('سامانه شاهکار در دسترس نیست')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    enterOtpInitial(itemId) {
      this.selectedInquiryId = itemId
      this.enterOtpDialog = true
    },
    enterOtp() {
      this.loading = true
      window.axios.post('v1/admin/inquiry/enter-otp/' + this.selectedInquiryId, {
        otp: this.otp
      }).then(() => {
        this.enterOtpDialog = false
        this.getEntities()
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        } else if (err.response.status === 500) {
          this.openSnackbar('سامانه شاهکار در دسترس نیست')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    async removeAllFinally() {
      window.axios.post('v1/admin/inquiry/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    getEntities() {
      let url = window.urlBuilder(this.inquiries, 'v1/admin/inquiry/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.inquiries = res.data.data
        this.loading = false
      })
    },
    create() {
      this.$router.push('/inquiry/create')
    },
    remove() {
      window.axios.delete('v1/admin/inquiry/delete/' + this.selectedEntityID).then(() => {
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