<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش دسته بندی
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/category/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="category.name" label="نام دسته بندی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="category.label" label="لیبل دسته بندی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select :items="[{text:'بلاگ',value:'post'},{text:'سرویس',value:'vip_service'}]" v-model="category.type" label="نوع دسته بندی" color="black">
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="category.cover"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل آیکون"
                          @click="iconDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="category.icon"></v-text-field>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="coverDialog = false"
                     @changeFile="category.cover = $event"></drag-and-drop>
    </v-dialog>
    <v-dialog v-model="iconDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="iconDialog = false"
                     @changeFile="category.icon = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "CategoryEditView",
  components: {DragAndDrop},
  data() {
    return {
      loading: true,
      coverDialog: false,
      iconDialog: false,
      category: {
        name: null,
        label: null,
        cover: null,
        icon: null
      },
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('v1/admin/category/get/' + this.$route.params.id).then((res) => {
        this.category = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/category/update/' + this.$route.params.id, {
        name: this.category.name,
        label: this.category.label,
        cover: this.category.cover,
        icon: this.category.icon,
        type: this.category.type,
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