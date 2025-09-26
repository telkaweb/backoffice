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
            <span>پاک کردن گروهی صندوق‌ها</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab color="#413b3b"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="openFieldsDialog = true">
                <v-icon>mdi-land-fields</v-icon>
              </v-btn>
            </template>
            <span>فیلدها</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" fab large color="#413b3b"
                     v-bind="attrs" v-on="on" class="white--text mx-1"
                     @click="create()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>ساخت صندوق جدید</span>
          </v-tooltip>
        </v-col>

        <v-col cols="12">
          <v-data-table
            hover
            id="sh-table"
            class="table c-table rounded-t-lg number-font t14300 table-show"
            :options.sync="options"
            :headers="headers.filter((header) => header.show)"
            :items="categories.data"
            :items-per-page="categories.per_page"
            :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
            :server-items-length="categories.total"
            :fixed-header="true"
            item-value="index"
            :loading="loading"
          >
            <template v-slot:[`item.description`]="{ item }">
              <span>{{ truncate(item.description, 100) }}</span>
            </template>

            <template v-slot:[`item.balance`]="{ item }">
              <span>{{ formatPrice(item.balance) }}</span>
            </template>

            <template v-slot:[`item.icon`]="{ item }"> 
              <img :src="item.icon_file && item.icon_file.url ? item.icon_file.url : '/images/no-image.png'" width="64" height="64" alt="icon" class="border-img">
            </template>

            <template v-slot:[`item.cover`]="{ item }">
              <img :src="item.cover || '/images/no-image.png'" width="64" height="64" alt="cover" class="border-img">
            </template>

            <template v-slot:[`item.is_active`]="{ item }">
              <v-chip :color="item.is_active ? 'success' : 'grey'" dark small @click="toggleStatus(item.unique_key)">
                {{ item.is_active ? 'فعال' : 'غیرفعال' }}
              </v-chip>
            </template>

            <template v-slot:[`item.is_selected_for_profit`]="{ item }">
              <v-chip
                :color="item.is_selected_for_profit === 1 ? 'green' : 'grey'"
                dark
                small
                @click="toggleDefault(item.unique_key)"
              >
                {{ item.is_selected_for_profit === 1 ? 'صندوق پیش‌فرض' : 'تعیین پیش‌فرض' }}
              </v-chip>
            </template>

            <template v-slot:[`item.created_at_fa`]="{ item }">
              <span class="ltr-cell">{{ item.created_at_fa }}</span>
            </template>

            <template v-slot:[`item.operation`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="info"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="donations(item.unique_key)" elevation="0">
                    <v-icon>mdi-cash-multiple</v-icon>
                  </v-btn>
                </template>
                <span>لیست واریزی ها</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="warning"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="edit(item.unique_key)" elevation="0">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                </template>
                <span>ویرایش</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="error"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="initialRemove(item.unique_key)" elevation="0">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>حذف</span>
              </v-tooltip>
            </template>

            <template v-slot:[`item.multi-operation`]="{ item }">
              <v-row>
                <v-col class="text-left">
                  <v-checkbox color="error" v-model="selectedItems[item.unique_key]">
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
              آیا از پاک کردن صندوق اطمینان دارید؟
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn width="200px" color="warning" class="mx-16 letter-spacing-normal" @click="remove">بله، مطمئنم</v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn width="200px" color="success" class="mx-16 letter-spacing-normal"
                     @click="deleteEntityDialog = false">خیر، منصرف شدم</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteAllDialog" width="468">
      <v-card>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="12" class="text-center">
            آیا از پاک شدن تمام صندوق‌های انتخاب‌شده اطمینان دارید؟
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

    <v-dialog v-model="openFieldsDialog" width="468">
      <v-card>
        <v-card-actions>
          <v-btn text @click="openFieldsDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="6" v-for="header in headers" :key="header.value" class="text-right">
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
  name: "CharityIndexView",
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      categories: { current_page: 1 },
      headers: [
        { text: 'ردیف', value: 'row_number', align: 'center', width: '5%', show: true, sortable: false },
        { text: 'عنوان صندوق', value: 'name', align: 'center', width: '15%', show: true, sortable: true },
        { text: 'توضیحات', value: 'description', align: 'center', width: '20%', show: true, sortable: false },
        { text: 'موجودی صندوق (تومان)', value: 'balance', align: 'center', width: '12%', show: true, sortable: true },
        { text: 'وضعیت', value: 'is_active', align: 'center', width: '8%', show: true, sortable: true },
        { text: 'پیش‌فرض(تخصیص سود)', value: 'is_selected_for_profit', align: 'center', width: '10%', show: true, sortable: false },
        { text: 'آیکون', value: 'icon', align: 'center', width: '8%', show: true, sortable: false },
        { text: 'کاور', value: 'cover', align: 'center', width: '8%', show: true, sortable: false },
        { text: 'زمان ثبت', value: 'created_at_fa', original_value: 'created_at', align: 'center', width: '10%', show: true, sortable: true },
        { text: 'عملیات', value: 'operation', align: 'center', width: '13%', show: true, sortable: false },
        { text: 'عملیات گروهی', value: 'multi-operation', align: 'right', width: '8%', show: true, sortable: false },
      ],
      selectedEntityID: null,
      options: {},
    }
  },
  watch: {
    options: {
      handler() { this.getEntities() },
      deep: true,
    },
  },
  methods: {
    async removeAllFinally() {
      window.axios.post('v1/admin/charity/delete-multi', {
        ids: this.selectedItems
      }).then(() => {
        this.deleteAllDialog = false
        this.getEntities()
      })
    },
    donations(entityKey) {
      this.$router.push('/charity/' + entityKey + '/donations')
    },
    formatPrice(value) {
      if (!value) return '0 تومان'
      const num = Number(value)
      return num.toLocaleString('fa-IR') + ' تومان'
    },
    truncate(text, length = 100) {
      if (!text) return '-'
      return text.length > length ? text.substring(0, length) + '...' : text
    },
    getEntities() {
      let url = window.urlBuilder(this.categories, 'v3/admin/charity/list', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.categories = res.data.data

        this.categories.data = (this.categories.data || []).map((it, idx) => ({
          index: idx + 1,
          ...it,
          row_number: (this.categories.from || 1) + idx,
          created_at_fa: it.created_at ? new Date(it.created_at).toLocaleString('fa-IR') : '-',
          icon: it.icon_file?.url || null,
          cover: it.cover_file?.url || null
        }))
        this.loading = false
      })
    },
    create() {
      this.$router.push('/charity/create')
    },
    edit(entityKey) {
      this.$router.push('/charity/edit/' + entityKey)
    },
    remove() {
      window.axios.delete('v3/admin/charity/delete/' + this.selectedEntityID).then(() => {
        this.getEntities()
      })
      this.deleteEntityDialog = false
    },
    initialRemove(entityKey) {
      this.selectedEntityID = entityKey
      this.deleteEntityDialog = true
    },
    toggleStatus(entityKey) {
      window.axios.post(`v3/admin/charity/${entityKey}/status`).then(() => {
        this.getEntities()
      })
    },
    toggleDefault(entityKey) {
      window.axios.post(`v3/admin/charity/${entityKey}/default`).then(() => {
        this.getEntities()
      })
    }
  },
  mounted() {
    this.getEntities()
  }
}
</script>

<style scoped>
.main-margin { margin: 2vh 6vw 2vh 2vw; }
.main-padding { padding: 1vh 2vw; }
.text-dialog-title { font-size: 18px; font-weight: 800; }
.letter-spacing-normal { letter-spacing: normal; }
.text-red { color: red; }
.text-green { color: darkgreen; }
.text-grey { color: grey; }
.border-img {border-radius: 8px;margin-top: 10px;}
.ltr-cell { direction: ltr; display: inline-block; }
</style>
