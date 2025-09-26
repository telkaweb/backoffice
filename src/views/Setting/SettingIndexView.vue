<template>
  <div>
    <v-card class="card-show">
      <v-card-title>متغیر های پروژه</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="variable in variables" :key="variable.id">
            <v-text-field
                v-if="variable.type === 'string'"
                v-model="variable.value"
                :hint="variable.description"
                :label="variable.key"
                color="black"
            ></v-text-field>
            <v-text-field
                v-if="variable.type === 'integer'"
                type="number"
                v-model="variable.value"
                :hint="variable.description"
                :label="variable.key"
                color="black"
            ></v-text-field>
            <v-switch
                v-if="variable.type === 'boolean'"
                v-model="variable.value"
                true-value="1"
                false-value="0"
                :label="variable.description"
                color="black"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <v-btn @click="submit()" width="200px" class="main-button">ویرایش</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn @click="getEntities()" width="200px" class="error-button">بازگردانی به حالت اولیه</v-btn>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SettingIndexView",
  data() {
    return {
      variables: [],
    }
  },
  methods: {
    getEntities() {
      window.axios.get('v1/admin/setting/index').then((res) => {
        this.variables = res.data.data
      })
    },
    submit() {
      let variables = []
      this.variables.forEach((item) => {
        variables.push({id: item.id, value: item.value, value_2: item.value_2})
      })
      window.axios.post('v1/admin/setting/update', {
        variables: variables
      }).then((res) => {
        this.getEntities()
        this.openSnackbar(res.data.message, '#413b3b')
      })
    }
  },
  mounted() {
    this.getEntities()
  }
}
</script>

<style scoped>

</style>