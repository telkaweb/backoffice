<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش متریال (پر کردن تمامی فیلد ها الزامی است.)
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/material/index')">
              <v-icon class="main-icon">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="material.name" label="نام ماده" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="material.label" label="لیبل ماده" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="material.unit" label="واحد ماده" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field :disabled="material.is_hard" v-model="material.price_per_unit" label="قیمت به ازای واحد" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="material.price_unit" label="واحد قیمت" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="material.cover"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select color="black" v-model="material.status"
                      :items="[{label:'فعال',value:'active'},{label:'غیر فعال',value:'inactive'}]" item-text="label"
                      label="وضعیت ماده انتخاب کنید" item-value="value"></v-select>
          </v-col>

          <v-col cols="3">
            <v-select color="black" v-model="material.category_id" :items="categories" item-text="label"
                      label="دسته بندی ماده را انتخاب کنید." item-value="id"></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="material.description" label="توضیحات" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop module="MaterialEditView" ref="file-uploader" @closeUploadFileDialog="coverDialog = false"
                     @changeFile="material.cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "MaterialEditView",
  components: {DragAndDrop},
  data() {
    return {
      loading: true,
      coverDialog: false,
      categories: [],
      material: {
        name: null,
        label: null,
        unit: null,
        price_per_unit: null,
        price_unit: null,
        cover: null,
        description: null,
        status: null,
        category_id: null
      },
    }
  },
  mounted() {
    this.getEntities()
    this.getEntity()
  },
  methods: {
    getEntities() {
      window.axios.get('admin/category/index?per_page=1000').then((res) => {
        this.categories = res.data.data.data
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    getEntity() {
      window.axios.get('admin/material/get/' + this.$route.params.id).then((res) => {
        this.material = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('admin/material/update/' + this.$route.params.id, {
        name: this.material.name,
        label: this.material.label,
        unit: this.material.unit,
        price_per_unit: this.material.price_per_unit,
        price_unit: this.material.price_unit,
        cover: this.material.cover,
        description: this.material.description,
        status: this.material.status,
        category_id: this.material.category_id,
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

<style>
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