<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش نقش
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/role/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="role.name" label="نام نقش" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="role.label" label="لیبل نقش" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-autocomplete color="black" :items="permissions" item-text="label" item-value="id"
                            v-model="role.permission_ids"
                            multiple
                            label="دسترسی های مورد نظر را انتخاب کنید"
            ></v-autocomplete>
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
  name: "RoleEditView",
  data() {
    return {
      loading: true,
      permissions: [],
      role: {
        name: null,
        label: null,
      },
    }
  },
  mounted() {
    this.getEntities()
    this.getEntity()
  },
  methods: {
    getEntities() {
      window.axios.get('admin/permission/index').then((res) => {
        this.permissions = res.data.data
        this.loading = false
      })
    },
    getEntity() {
      window.axios.get('admin/role/get/' + this.$route.params.id).then((res) => {
        this.role = res.data.data
        this.role.permission_ids = []
        this.role.permissions.forEach((item) => {
          this.role.permission_ids.push(item.id)
        })
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/role/update/' + this.$route.params.id, {
        name: this.role.name,
        label: this.role.label,
        permission_ids: this.role.permission_ids,
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