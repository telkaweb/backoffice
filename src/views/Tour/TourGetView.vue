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
        <v-col cols="12">
          <v-data-table
              hover
              id="sh-table"
              class="table c-table rounded-t-lg number-font t14300 table-show "
              :options.sync="options"
              :headers="headers.filter((header) => header.show)"
              :items="buyers.data"
              :items-per-page="buyers.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="buyers.total"
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
export default {
  name: "TourGetView",
  data() {
    return {
      openFieldsDialog: false,
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      buyers: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%', show: true, sortable: true},
        {text: 'نام خریدار', value: 'user_name',original_value: 'user_id', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'نام مسافر', value: 'first_name', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'فامیلی مسافر', value: 'last_name', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'جنسیت', value: 'gender', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'کد ملی', value: 'national_code', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'تاریخ تولد',value:'birth_date_fa', original_value: 'birth_date', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'شماره پاسپورت', value: 'passport_number', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'انقضا پاسپورت', value: 'passport_expire_date', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'ملیت', value: 'nationality', align: 'center', width: '8%', show: true, sortable: true},
        {text: 'رده سنی', value: 'age', align: 'center', width: '8%', show: true, sortable: true},
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
      let url = window.urlBuilder(this.buyers, 'admin/tour/index-buyers/'+this.$route.params.id, this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.buyers = res.data.data
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