<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش صندوق
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/charity/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="charity.name" label="نام صندوق" color="black"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="charity.description" label="توضیحات صندوق" color="black" rows="4"></v-textarea>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="فایل کاور"
              @click="coverDialog = true"
              prepend-icon="mdi-plus"
              color="black"
              v-model="charity.cover"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="فایل آیکون"
              @click="iconDialog = true"
              prepend-icon="mdi-plus"
              color="black"
              v-model="charity.icon"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">
              ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop
        module="charity"
        ref="cover-uploader"
        @closeUploadFileDialog="coverDialog = false"
        @changeFile="charity.cover = $event"
      ></drag-and-drop>
    </v-dialog>

    <v-dialog v-model="iconDialog" max-width="50vw">
      <drag-and-drop
        module="charity"
        ref="icon-uploader"
        @closeUploadFileDialog="iconDialog = false"
        @changeFile="charity.icon = $event"
      ></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>
import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "CharityEditView",
  components: { DragAndDrop },
  data() {
    return {
      loading: true,
      coverDialog: false,
      iconDialog: false,
      charity: {
        name: null,
        description: null,
        cover: null,
        icon: null,
      },
    };
  },
  mounted() {
    this.getEntity();
  },
  methods: {
    getEntity() {
      window.axios
        .get("v3/admin/charity/" + this.$route.params.id + "/details")
        .then((res) => {
          const data = res.data.data;
          this.charity = {
            name: data.name,
            description: data.description,
            cover: data.cover_file?.url || null,
            icon: data.icon_file?.url || null,
          };
          this.loading = false;
        })
        .catch((err) => {
          this.openSnackbar(err.response.data.status.message, "#F1416C");
        });
    },

    edit() {
      window.axios
        .post("v3/admin/charity/" + this.$route.params.id + "/update", {
          name: this.charity.name,
          description: this.charity.description,
          cover: this.charity.cover,
          icon: this.charity.icon,
        })
        .then((res) => {
          this.openSnackbar(res.data.status.message, "#413b3b");
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.showValidationErrors(err, "#F1416C");
          } else {
            this.openSnackbar(err.response.data.status.message, "#F1416C");
          }
        });
    },
  },
};
</script>

<style scoped>
.main-button {
  background-color: #413b3b;
}
.letter-spacing-normal {
  letter-spacing: normal;
}
</style>
