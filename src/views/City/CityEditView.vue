<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش شهر
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/city/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="city.name" label="نام شهر" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="city.label" label="لیبل شهر" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete :items="states" item-text="label" item-value="id" v-model="city.state_id" label="استان را انتخاب کنید."
                            color="black">
            </v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-switch :true-value="1" :false-value="0" v-model="city.is_active" label="وضعیت شهر" color="black">
            </v-switch>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


export default {
  name: "CityEditView",
  data() {
    return {
      loading: true,
      states: [],
      city: {
        name: null,
        label: null,
        is_active: null,
        state_id: null,
      },
    }
  },
  mounted() {
    this.getEntities()
    this.getEntity()
  },
  methods: {
    getEntities() {
      window.axios.get('v1/admin/state/index?per_page=10000').then((res) => {
        this.states = res.data.data.data
      })
    },
    getEntity() {
      window.axios.get('v1/admin/city/get/' + this.$route.params.id).then((res) => {
        this.city = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/city/update/' + this.$route.params.id, {
        name: this.city.name,
        label: this.city.label,
        is_active: this.city.is_active,
        state_id: this.city.state_id,
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
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
</style>