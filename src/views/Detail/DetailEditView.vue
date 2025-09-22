<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش محتوا
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/detail/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="44">
            <v-text-field disabled v-model="detail.key" label="کلید محتوا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field disabled v-model="detail.label" label="عنوان محتوا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field disabled v-model="detail.section" label="بخش محتوا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field disabled v-model="detail.type" label="نوع محتوا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="4" v-if="detail.link">
            <v-text-field v-model="detail.link" label="لینک محتوا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="6" v-if="detail.value">
            <b>محتوا</b>
            <ckeditor :editor-url="$ckeditor.editorUrl"  v-model="detail.value" label="محتوا" color="black">
            </ckeditor>
          </v-col>
          <v-col cols="6" v-if="detail.title">
            <b>محتوا</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="detail.title" label="محتوا" color="black">
            </ckeditor>
          </v-col>
          <v-col cols="6" v-if="detail.content">
            <b>محتوا</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="detail.content" label="محتوا" color="black">
            </ckeditor>
          </v-col>
          <v-col cols="6" v-if="detail.path">
            <v-text-field label="فایل عکس"
                          @click="imageDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="detail.path"></v-text-field>
          </v-col>
          <v-col cols="6" v-if="detail.path">
            <v-img :alt="detail.label" :src="detail.path"> </v-img>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="imageDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="imageDialog = false"
                     @changeFile="detail.path = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "DetailEditView",
  components: {DragAndDrop},
  data() {
    return {
      loading: true,
      imageDialog: false,
      detail: {
        key: null,
        label: null,
        content: null,
        title: null,
        path: null,
        link: null,
      },
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('detail/get/' + this.$route.params.id).then((res) => {
        this.detail = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/detail/update/' + this.$route.params.id, this.detail).then((res) => {
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