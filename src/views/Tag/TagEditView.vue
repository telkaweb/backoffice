<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش تگ
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/tag/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tag.name" label="نام تگ" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tag.label" label="لیبل تگ" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="tag.cover"></v-text-field>
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
                     @changeFile="tag.cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "TagEditView",
  components: {DragAndDrop},
  data() {
    return {
      loading: true,
      coverDialog: false,
      tag: {
        name: null,
        label: null,
        cover: null,
      },
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('admin/tag/get/' + this.$route.params.id).then((res) => {
        this.tag = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/tag/update/' + this.$route.params.id, {
        name: this.tag.name,
        label: this.tag.label,
        cover: this.tag.cover,
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