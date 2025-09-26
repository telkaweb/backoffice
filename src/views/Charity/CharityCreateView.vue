<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت صندوق جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.back()">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="charity.name" label="نام صندوق" color="black"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="charity.description" label="توضیحات صندوق" color="black"></v-textarea>
          </v-col>

          <v-col cols="6">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="charity.cover"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field label="فایل آیکون"
                          @click="iconDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="charity.icon"></v-text-field>
          </v-col>

          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">
              ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop module="charity" ref="cover-uploader"
                     @closeUploadFileDialog="coverDialog = false"
                     @changeFile="charity.cover = $event"></drag-and-drop>
    </v-dialog>

    <v-dialog v-model="iconDialog" max-width="50vw">
      <drag-and-drop module="charity" ref="icon-uploader"
                     @closeUploadFileDialog="iconDialog = false"
                     @changeFile="charity.icon = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>
import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "CharityCreateView",
  components: { DragAndDrop },
  data() {
    return {
      loading: false,
      coverDialog: false,
      iconDialog: false,
      charity: {
        name: null,
        description: null,
        cover: null,
        icon: null
      }
    }
  },
  methods: {
    create() {
      window.axios.post('v3/admin/charity/add', {
        name: this.charity.name,
        description: this.charity.description,
        cover: this.charity.cover,
        icon: this.charity.icon,
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
        this.$router.push('/charity/index')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    }
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
