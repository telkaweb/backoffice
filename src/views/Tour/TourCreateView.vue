<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت تور جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/tour/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.title" label="عنوان" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.hotel_title" label="نام هتل" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.origin" label="مبدا" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.destination" label="مقصد" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select v-model="tour.trip_type" label="نوع تور" color="black"
                      :items="[{text:'هواپیما',value:'airplane'},{text:'قطار',value:'train'},{text:'اتوبوس',value:'bus'}]"
                      item-value="value"
                      item-text="text"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="tour.short_description" label="توضیحات کوتاه" color="black">
            </v-text-field>
          </v-col>


          <v-col cols="3">
            <v-text-field type="number" v-model="tour.price_per_adult" label="قیمت به ازای بزرگسال" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" v-model="tour.price_per_child" label="قیمت به ازای کودک" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.duration" label="مدت زمان" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="tour.trip_date" label="تاریخ تور" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select color="black" v-model="tour.status"
                      :items="[{label:'فعال',value:1},{label:'غیر فعال',value:0}]"
                      item-text="label"
                      label="وضعیت تور را انتخاب کنید" item-value="value"></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="tour.cover"></v-text-field>
          </v-col>
          <v-col cols="12">
            <b>توضیحات</b>
            <ckeditor :editor-url="$ckeditor.editorUrl"  v-model="tour.description" label="توضیحات" color="black">
            </ckeditor>
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
                     @changeFile="tour.cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "TourCreateView",
  components: {DragAndDrop},
  data() {
    return {
      loading: false,
      coverDialog: false,
      tour: {
        title: null,
        hotel_title: null,
        origin: null,
        destination: null,
        short_description: null,
        description: null,
        price_per_adult: null,
        price_per_child: null,
        duration: null,
        trip_type: null,
        trip_date: null,
        status: 1,
        cover: null,
      },
    }
  },
  mounted() {
  },
  methods: {
    create() {
      window.axios.post('v1/admin/tour/create/', this.tour).then((res) => {
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