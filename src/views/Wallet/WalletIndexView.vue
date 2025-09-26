<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-row>
        <v-col cols="12" class="text-left">
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
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-autocomplete
              v-model="selectedUser"
              :items="users"
              :search-input.sync="search"
              item-text="full_name"
              item-value="id"
              placeholder="جستجو در مشتریان"
              @update:search-input="getUsers"
              @input="getEntities"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="2"></v-col>
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="wallets.data"
              :items-per-page="wallets.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="wallets.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
          >
            <template
                v-slot:[`item.operation`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn type="button" fab x-small color="warning"
                         v-bind="attrs" v-on="on" class="white--text mx-1"
                         @click="chargeInitial(item)" elevation="0">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>شارژ</span>
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
    <v-dialog
        v-model="chargeDialog"
        width="468"
    >
      <v-card>
        <v-card-actions>
          <v-btn text @click="chargeDialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" align="center" class="ma-0 pa-5">
          <v-col cols="12">
            شارژ کیف پول
          </v-col>
          <v-col cols="12" class="text-center">
            <v-text-field color="black" type="number" v-model="amount"
                          label="مقدار مورد نظر را وارد کنید"></v-text-field>
          </v-col>
          <v-col cols="12" class="text-center" style="letter-spacing: normal!important;">
            <v-btn @click="update" color="success">تایید</v-btn>
          </v-col>
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
  name: "WalletIndexView",
  data() {
    return {
      selectedUser: null,
      search: null,
      users: [],
      openFieldsDialog: false,
      selectedItems: [],
      selectedItem: null,
      chargeDialog: false,
      loading: true,
      amount: 0,
      wallets: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {
          text: 'نام',
          value: 'user_name',
          original_value: 'user_id',
          align: 'center',
          width: '20%',
          show: true,
          sortable: true
        },
        {text: 'عنوان', value: 'name', align: 'center', width: '20%', show: true, sortable: true},
        {text: 'لیبل', value: 'label', align: 'center', width: '20%', show: true, sortable: true},
        {text: 'مقدار', value: 'value', align: 'center', width: '20%', show: true, sortable: true},
        {text: 'نوع', value: 'type', align: 'center', width: '20%', show: true, sortable: true},
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
    getUsers() {
      if (!this.search.length) return;
      window.axios.get('/admin/user/index?per_page=20&needle=' + this.search).then(res => {
        this.users = res.data.data.data;
      });
    },
    chargeInitial(item) {
      this.chargeDialog = true
      this.selectedItem = item
    },
    async update() {
      window.axios.post('v1/admin/wallet/charge', {
        wallet_id: this.selectedItem.id,
        amount: this.amount
      }).then((res) => {
        this.openSnackbar(res.data.message, 'success')
        this.chargeDialog = false
        this.getEntities()
      })
    },
    getEntities() {
      let url = 'v1/admin/wallet/index'
      if (this.selectedUser) {
        url = url + '?user_id=' + this.selectedUser
      }
      let newurl = window.urlBuilder(this.wallets, url, this.options, this.headers)
      window.axios.get(newurl).then((res) => {
        this.wallets = res.data.data
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