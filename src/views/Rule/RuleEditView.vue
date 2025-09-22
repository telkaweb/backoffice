<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش دسته بندی
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/rule/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="rule.label" label="لیبل دسته بندی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <ckeditor v-model="rule.content" color="black"></ckeditor>
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
  name: "RuleEditView",
  data() {
    return {
      loading: true,
      rule: {
        label: null,
        content: null,
      },
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('admin/rule/get/' + this.$route.params.id).then((res) => {
        this.rule = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/rule/update/' + this.$route.params.id, {
        label: this.rule.label,
        content: this.rule.content
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