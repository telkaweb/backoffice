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
            <span>پاک کردن گروهی سرویس ها ( از پاک کردن سرویس های فعال پرهیز کنید!)</span>
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
            <span>ساخت سرویس جدید</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="vipServices.data"
              :items-per-page="vipServices.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="vipServices.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
          >
            <template
                v-slot:[`item.cover`]="{ item }">
              <img :src="item.cover" width="100" height="100" alt="cover">
            </template>
            <template
                v-slot:[`item.menu_cover`]="{ item }">
              <img :src="item.menu_cover" width="100" height="100" alt="menu cover">
            </template>
            <template
                v-slot:[`item.purchase_card_cover`]="{ item }">
              <img :src="item.purchase_card_cover" width="100" height="100" alt="purchase card cover">
            </template>
            <template
                v-slot:[`item.operation`]="{ item }">
              <v-tooltip bottom v-if="item.type === 'code'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="success"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="attachCodesInitial(item.id)" elevation="0">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>اضافه کردن کد</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.type === 'code'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="primary"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="getCodes(item.id)" elevation="0">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>مشاهده کد ها</span>
              </v-tooltip>
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
              آیا از پاک کردن سرویس اطمینان دارید ؟ ( از پاک کردن سرویس های فعال پرهیز کنید!)
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
            آیا از پاک شدن تمام اطلاعات انتخاب شده اطمینان دارید؟ ( از پاک کردن سرویس های فعال پرهیز کنید!)
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
        v-model="showAttachCodesDialog"
        width="800"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="showAttachCodesDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="6" v-for="(code, index) in codes" :key="index">
            <v-text-field color="black" label="کد را بنویسید" v-model="codes[index]"></v-text-field>
          </v-col>


          <v-col cols='12' class="text-center">
            <v-btn class="mx-2" color="primary" @click="addNewCode">
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn class="mx-2" color="success" @click="attachCodesFinally">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>


    <v-dialog
        v-model="showCodesDialog"
        width="800"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="showCodesDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col cols="4" v-for="(code,index) in codes" :key="index+'code'">{{ code.code }}
              <v-icon color="error" @click="deleteCode(code)">mdi-trash-can-outline</v-icon>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>


  </div>

</template>

<script>
export default {
  name: "VipServiceْIndexView",
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      codes: [''],
      selectedItem: null,
      showAttachCodesDialog: false,
      showCodesDialog: false,
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      vipServices: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {text: 'عنوان', value: 'title', align: 'center', width: '25%', show: true, sortable: true},
        {
          text: 'نام تامین کننده',
          value: 'service_provider_name',
          align: 'center',
          width: '25%',
          show: true,
          sortable: true
        },
        {text: 'کاور', value: 'cover', align: 'center', width: '25%', show: true, sortable: true},
        {text: 'کاور در منو', value: 'menu_cover', align: 'center', width: '25%', show: true, sortable: true},
        {text: 'قیمت', value: 'price', align: 'center', width: '25%', show: true, sortable: true},
        {
          text: 'عنوان کارت پرداخت',
          value: 'purchase_card_title',
          align: 'center',
          width: '25%',
          show: true,
          sortable: true
        },
        {
          text: 'کاور کارت پرداخت',
          value: 'purchase_card_cover',
          align: 'center',
          width: '25%',
          show: true,
          sortable: true
        },
        {text: 'نوع', value: 'type', align: 'center', width: '25%', show: true, sortable: true},
        {
          text: 'دسته بندی',
          original_value: 'category_id',
          value: 'category_name',
          align: 'center',
          width: '25%',
          show: true,
          sortable: true
        },
        {text: 'وضعیت', value: 'status', align: 'center', width: '4%', show: true, sortable: true},
        {
          text: 'نمابش در قسمت پیشنهاد های منتخب',
          value: 'selected_for_home',
          align: 'center',
          width: '4%',
          show: true,
          sortable: true
        },
        {text: 'اولویت', value: 'priority', align: 'center', width: '4%', show: true, sortable: true},
        {
          text: 'زمان ثبت',
          value: 'created_at_fa',
          original_value: 'created_at',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {text: 'عملیات', value: 'operation', align: 'center', width: '10%', show: true, sortable: false},
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
    getCodes(itemId) {
      window.axios.get('v1/admin/vip-service/get-code/' + itemId).then((res) => {
        this.showCodesDialog = true
        this.codes = res.data.data
      });
    },
    deleteCode(code) {
      window.axios.delete('v1/admin/vip-service/delete-code/' + code.id).then(() => {
        this.getCodes(code.vip_service_id)
      });
    },
    addNewCode() {
      this.codes.push(''); // on button click add new empty input
    },
    attachCodesInitial(entityID) {
      this.selectedItem = entityID
      this.showAttachCodesDialog = true
    },
    attachCodesFinally() {
      window.axios.post('v1/admin/vip-service/attach-code', {
        vip_service_id: this.selectedItem,
        codes: this.codes
      }).then((res) => {
        this.showAttachCodesDialog = false
        this.openSnackbar(res.data.message, 'success')
      });
    },
    async removeAllFinally() {
      window.axios.post('v1/admin/vip-service/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },
    getEntities() {
      let url = window.urlBuilder(this.vipServices, 'v1/admin/vip-service/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.vipServices = res.data.data
        this.loading = false
      })
    },
    create() {
      this.$router.push('/vip-service/create')
    },
    edit(entityID) {
      this.$router.push('/vip-service/edit/' + entityID)
    },
    remove() {
      window.axios.delete('v1/admin/vip-service/delete/' + this.selectedEntityID).then(() => {
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