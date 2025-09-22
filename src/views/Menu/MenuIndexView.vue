<template>
  <div class="main-margin" v-if="!loading">
    <v-card class="main-padding" color="white">
      <v-row>
        <v-col cols="12" class="text-left">
        </v-col>
        <v-col cols="12">
          <v-data-table
              align="center"
              item-key="id"
              :headers="headers"
              :items="menus"
              :items-per-page="10"
              disable-sort
              hide-default-footer>
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
  </div>

</template>

<script>
export default {
  name: "MenuIndexView",
  data() {
    return {
      selectedItems: [],
      deleteAllDialog: false,
      loading: true,
      deleteEntityDialog: false,
      menus: [],
      headers: [
        {text: 'شناسه', value: 'id', align: 'center', width: '2%'},
        {text: 'نام', value: 'label', align: 'center', width: '20%'},
        {text: 'عملیات', value: 'operation', align: 'center', width: '15%'},
      ],
      selectedEntityID: null,
    }
  },
  methods: {
    getEntities() {
      let url = 'menu/index'
      window.axios.get(url).then((res) => {
        this.menus = res.data.data.menus
        this.loading = false
      })
    },
    edit(entityID) {
      this.$router.push('/menu/edit/' + entityID)
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