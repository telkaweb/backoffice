<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت کارت معرفی جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/promot/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="promot.title" label="عنوان" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="promot.url" label="لینک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="promot.cover"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="promot.priority" label="اولویت" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-switch :true-value="1" :false-value="0" v-model="promot.status" label="وضعیت" color="black">
            </v-switch>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="promot.description" label="توضیحات" color="black">
            </v-textarea>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="coverDialog = false"
                     @changeFile="promot.cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "PromotCreateView",
  components: {DragAndDrop},
  data() {
    return {
      loading: false,
      coverDialog: false,
      promot: {
        title: null,
        description: null,
        cover: null,
        url: null,
        priority: null,
        status: null,
      },
    }
  },
  mounted() {
  },
  methods: {
    create() {
      window.axios.post('v1/admin/promot/create/', {
        title: this.promot.title,
        description: this.promot.description,
        cover: this.promot.cover,
        url: this.promot.url,
        priority: this.promot.priority,
        status: this.promot.status,
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