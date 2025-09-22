<template>
  <span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn type="button" fab color="#01601d"
               v-bind="attrs" v-on="on" class="white--text mx-1"
               @click="openUploadDialog()">
          <v-icon>mdi-microsoft-excel</v-icon>
        </v-btn>
      </template>
      <span>آپلود فایل ورودی</span>
    </v-tooltip>
    <v-dialog width="800px" v-model="uploadFileDialog">
      <v-card>
        <v-card-actions>
          <v-btn color="error" @click="uploadFileDialog = false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-file-input label="فایل اکسل را بارگزاری کنید" v-model="file"></v-file-input>
            </v-col>
            <v-col cols="3">
              <v-btn color="primary" style="letter-spacing: normal!important;" @click="downloadTemplate()">
                دانلود نمونه
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn color="success" style="letter-spacing: normal!important;" @click="uploadExcel()">
                بارگزاری
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-dialog>
  </span>

</template>
<script>
export default {
  name: "ImportButton",
  props: ['model'],
  data() {
    return {
      uploadFileDialog: false,
      file: null,
    }
  },
  methods: {
    downloadTemplate() {
      window.open(process.env.VUE_APP_BACKEND_STORAGE + `/templates/${this.model}.xlsx`, '_blank');
    },
    openUploadDialog() {
      this.uploadFileDialog = true
    },
    uploadExcel() {
      let formData = new FormData
      formData.append('file', this.file)
      window.axios.post(`admin/${this.model}/import`, formData).then((res) => {
        this.openSnackbar(res.data.message, 'success')
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, 'error')
      })
    },
  }
}
</script>
<style scoped>

</style>