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
              :items="details.data"
              :items-per-page="details.per_page"
              :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
              :server-items-length="details.total"
              :fixed-header="true"
              item-value="index"
              :loading="loading"
             >
            <template
                v-slot:[`item.section`]="{ item }">
              <div v-if="item.section === 'home_page'">صفحه اصلی</div>
              <div v-if="item.section === 'footer'">فوتر</div>
              <div v-if="item.section === 'fees'">کارمزدها</div>
              <div v-if="item.section === 'certificates'">مجوز ها</div>
              <div v-if="item.section === 'about_us'">درباره ما</div>
              <div v-if="item.section === 'contact_us'">تماس با ما</div>
              <div v-if="item.section === 'menu'">منو</div>
            </template>
            <template
                v-slot:[`item.type`]="{ item }">
              <div v-if="item.type === 'string'">متن</div>
              <div v-if="item.type === 'image'">عکس</div>
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
            </template>
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
  name: "DetailIndexView",
  data() {
    return {
      openFieldsDialog: false,
      loading: true,
      details: {
        current_page: 1
      },
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%',show: true,sortable:true},
        {text: 'کلید', value: 'key', align: 'center', width: '20%',show: true,sortable:true},
        {text: 'لیبل', value: 'label', align: 'center', width: '20%',show: true,sortable:true},
        {text: 'بخش', value: 'section', align: 'center', width: '20%',show: true,sortable: true},
        {text: 'نوع', value: 'type', align: 'center', width: '20%',show: true,sortable: true},
        {
          text: 'آخرین زمان ویرایش',
          value: 'updated_at_fa',
          original_value: 'updated_at',
          align: 'center',
          width: '10%',
          show: true,
          sortable: true
        },
        {text: 'عملیات', value: 'operation', align: 'center', width: '15%',show: true,sortable: false},
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
      let url = window.urlBuilder(this.details, 'v1/detail/index', this.options, this.headers)
      window.axios.get(url).then((res) => {
        this.details = res.data.data
        this.loading = false
      })
    },
    edit(entityID) {
      this.$router.push('/detail/edit/' + entityID)
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