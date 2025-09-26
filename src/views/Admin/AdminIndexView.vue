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
            <span>پاک کردن گروهی ادمین ها</span>
          </v-tooltip>
          <ImportButton model="admin"></ImportButton>
          <ExportButton model="admin"></ExportButton>
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
            <span>ساخت ادمین جدید</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="admins.data"
              :items-per-page="admins.per_page"
              :server-items-length="admins.total"
              :fixed-header="true"
              item-value="index"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :loading="loading"
          >
            <template
                v-slot:[`item.status`]="{ item }">
              <span v-if="item.status === 1">
                فعال
              </span>
              <span v-if="item.status === 0">
                غیر فعال
              </span>
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
              آیا از پاک کردن ادمین اطمینان دارید ؟
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
  name: "AdminIndexView",
  components: {ImportButton, ExportButton},
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      admins: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true},
        {text: 'نام', value: 'name', align: 'center', width: '10%', show: true, sortable: true},
        {
          text: 'شعبه بانک',
          value: 'bank_label',
          original_value: 'bank_id',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {text: 'شهر', value: 'city_name',original_value: 'city_id', align: 'center', width: '5%', show: true},
        {text: 'استان', value: 'state_name',original_value: 'state_id', align: 'center', width: '5%', show: true},
        {text: 'شماره همراه', value: 'mobile', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'کد ملی', value: 'national_code', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'وضعیت', value: 'status', align: 'center', width: '10%', show: true, sortable: true},
        {text: 'ایمیل', value: 'email', align: 'center', width: '10%', show: true, sortable: true},
        {
          text: 'نقش',
          value: 'role_label',
          original_value: 'role_id',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {
          text: 'زمان ثبت نام',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true
        },
        {
          text: 'آخرین فعالیت ادمین',
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
      window.axios.post('v1/admin/admin/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },
    getEntities() {
      let url = window.urlBuilder(this.admins, 'v1/admin/admin/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.admins = res.data.data
        this.loading = false
      })
    },
    create() {
      this.$router.push('/admin/create')
    },
    edit(entityID) {
      this.$router.push('/admin/edit/' + entityID)
    },
    showItem(entityID) {
      this.$router.push('/admin/get/' + entityID)
    },
    remove() {
      window.axios.delete('v1/admin/admin/delete/' + this.selectedEntityID).then(() => {
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