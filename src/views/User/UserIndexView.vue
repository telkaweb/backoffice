<template>
  <div v-if="!loading">
    <v-card class="mt-6 card-show">
      <v-row>
        <v-col cols="12" class="text-left mt-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="error"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="deleteAllDialog=true">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <span>پاک کردن گروهی کاربران</span>
          </v-tooltip>
          <ImportButton model="user"></ImportButton>
          <ExportButton model="user"></ExportButton>
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
            <span>ساخت کاربر جدید</span>
          </v-tooltip>
          <v-row class="mx-1">
            <v-col cols="12">
              <v-text-field @focusout="search" v-model="needle" prepend-inner-icon="mdi-account" color="black"
                            hint="کد ملی ، شماره همراه ، نام ، کد ، تاریخ تولد ، شهر‌ ،‌ ‌بانک ، شعبه و یا هر نشانه ای از کاربر را برای جستجو وارد کنید..."
                            label="برای جستجو وارد کنید."></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="users.data"
              :items-per-page="users.per_page"
              :server-items-length="users.total"
              :fixed-header="true"
              item-value="index"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :loading="loading"
          >
            <template
                v-slot:[`item.status`]="{ item }">
              <span v-if="item.status === 'active'" class="green--text">
                فعال
              </span>
              <span v-if="item.status === 'inactive'">
                غیر فعال
              </span>
              <span v-if="item.status === 'banned'" class="red--text">
                غیر مجاز
              </span>
              <span></span>
            </template>
            <template
                v-slot:[`item.is_checked_match_mobile_with_national_code`]="{ item }">
              <v-icon color="success" v-if="item.is_checked_match_mobile_with_national_code">mdi-check</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </template>
            <template
                v-slot:[`item.match_mobile_with_national_code`]="{ item }">
              <v-icon color="success" v-if="item.match_mobile_with_national_code">mdi-check</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </template>
            <template
                v-slot:[`item.operation`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="warning"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="edit(item.id)" elevation="0">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                </template>
                <span>ویرایش</span>
              </v-tooltip>
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
              آیا از پاک کردن کاربر اطمینان دارید ؟
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
import ExportButton from "@/components/Export/ExportButton.vue";
import ImportButton from "@/components/Import/ImportButton.vue";
export default {
  name: "UserIndexView",
  components: {ImportButton, ExportButton},
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      needle: null,
      deleteEntityDialog: false,
      users: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true},
        {text: 'نام کوچک', value: 'first_name', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'نام فامیلی', value: 'last_name', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'شماره همراه', value: 'mobile', align: 'center', width: '10%', show: true},
        {text: 'ایمیل', value: 'email', align: 'center', width: '5%', show: true},
        {text: 'شهر', value: 'city_name', original_value: 'city_id', align: 'center', width: '5%', show: true},
        {text: 'موجودی عمومی', value: 'general_balance', align: 'center', width: '5%', show: true, sortable: false},
        {text: 'موجودی سلامت', value: 'health_balance', align: 'center', width: '5%', show: true, sortable: false},
        {
          text: 'موجودی سرگرمی',
          value: 'entertainment_balance',
          align: 'center',
          width: '5%',
          show: true,
          sortable: false
        },
        {text: 'موجودی گردشگری', value: 'tourism_balance', align: 'center', width: '5%', show: true, sortable: false},
        {text: 'موجودی آموزش', value: 'education_balance', align: 'center', width: '5%', show: true, sortable: false},
        {
          text: 'تاریخ تولد',
          value: 'birth_date_fa',
          original_value: 'birth_date',
          align: 'center',
          width: '8%',
          show: true,
          sortable: true
        },
        {text: 'استان', value: 'state_name', original_value: 'state_id', align: 'center', width: '5%', show: true},
        {text: 'شعبه', value: 'bank_label', original_value: 'bank_id', align: 'center', width: '5%', show: true},
        {text: 'کد ملی', value: 'national_code', align: 'center', width: '5%', show: true},
        {text: 'سطح', value: 'level', align: 'center', width: '10%', show: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '10%', show: true},
        {
          text: 'زمان ثبت نام',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true
        },
        {
          text: 'آخرین فعالیت',
          value: 'last_activity_at_fa',
          original_value: 'last_activity_at',
          align: 'center',
          width: '10%',
          show: true
        },
        {text: 'عملیات', value: 'operation', align: 'center', width: '15%', show: true, sortable: false},
        {text: 'عملیات گروهی', value: 'multi-operation', align: 'center', width: '5%', show: true, sortable: false},
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
    async removeAllFinally() {
      window.axios.post('v1/admin/user/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },
    getEntities() {
      let url = window.urlBuilder(this.users, 'v1/admin/user/index', this.options, this.headers)
      if (this.needle && this.needle !== '') {
        url = url + '&needle=' + this.needle
      }
      window.axios.get(url).then((res) => {
        this.users = res.data.data
        this.loading = false
      })
    },
    search() {
      this.getEntities()
    },
    create() {
      this.$router.push('/user/create')
    },
    edit(entityID) {
      this.$router.push('/user/edit/' + entityID)
    },
    showItem(entityID) {
      this.$router.push('/user/get/' + entityID)
    },
    remove() {
      window.axios.delete('v1/admin/user/delete/' + this.selectedEntityID).then(() => {
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