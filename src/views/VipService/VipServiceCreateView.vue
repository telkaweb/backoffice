<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت خدمت جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/vip-service/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="vipService.title" label="عنوان" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="vipService.service_provider_name" label="نام تامیین کننده خدمت" color="black">
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="vipService.cover"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور منو"
                          @click="menuCoverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="vipService.menu_cover"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور کارت پرداخت"
                          @click="purchaseCardCoverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="vipService.purchase_card_cover"></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field v-model="vipService.price" label="قیمت" color="black" type="number">
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field color="black" label="اولویت" type="number"
                          v-model="vipService.priority"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field color="black" label="عنوان کارت پرداخت"
                          v-model="vipService.purchase_card_title"
            ></v-text-field>
          </v-col>


          <v-col cols="6">
            <b>توضیحات</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="vipService.description" label="توضیحات" color="black">
            </ckeditor>
          </v-col>

          <v-col cols="6">
            <b>توضیحات کارت پرداخت</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="vipService.purchase_description"
                      label="توضیحات کارت پرداخت" color="black">
            </ckeditor>
          </v-col>

          <v-col cols="3">
            <v-text-field color="black" label="عنوان کارت پس از پرداخت"
                          v-model="vipService.after_purchase_title"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select
                :items="[{text:'خدمات نیازمند به رزرو و پر کردن فیلد ها',value:'reserve'},{text:'کد تخفیف یا خرید کالا',value:'code'}]"
                color="black"
                label="نوع خدمت"
                item-text="text"
                item-value="value"
                v-model="vipService.type"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select :items="categories" item-text="label" item-value="id" color="black"
                      label="دسته بندی"
                      v-model="vipService.category_id"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
                :items="[{text:'عمومی',value:'general'},{text:'آموزش',value:'education'},{text:'گردشگری',value:'tourism'},{text:'سرگرمی',value:'entertainment'},{text:'سلامتی و ورزش',value:'health'}]"
                item-text="text" item-value="value" color="black"
                label="منبع مالی خدمت"
                v-model="vipService.wallet_type"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-switch :true-value="1" :false-value="0" v-model="vipService.status" label="وضعیت" color="black">
            </v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch :true-value="1" :false-value="0" v-model="vipService.selected_for_home"
                      label="نمابش در قسمت پیشنهاد های منتخب؟" color="black">
            </v-switch>
          </v-col>
          <v-col cols="12">
            <b>توضیحات کارت پس از پرداخت</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="vipService.after_purchase_description"
                      label="توضیحات کارت پس از پرداخت" color="black">
            </ckeditor>
          </v-col>


          <v-col cols="12">
            <v-row v-for="(field, index) in vipService.fields" :key="index">
              <v-col cols="5">
                <v-text-field
                    v-model="field.field"
                    :label="`نام فیلد ${index+1}`">
                </v-text-field>
              </v-col>
              <v-col cols="5">
                <v-select
                    v-model="field.type"
                    item-text="text"
                    item-value="value"
                    :items="[{text:'متنی' , value :'string'},{text:'عدد' , value :'integer'},{ text:'تاریخ',value:'date'}]"
                    :label="` نوع فیلد ${index+1}`">
                </v-select>
              </v-col>
              <v-col cols="2">
                <v-btn text color="warning" @click="removeField(index)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-btn text color="success" @click="addField()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
                     @changeFile="vipService.cover = $event"></drag-and-drop>
    </v-dialog>
    <v-dialog v-model="menuCoverDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="menuCoverDialog = false"
                     @changeFile="vipService.menu_cover = $event"></drag-and-drop>
    </v-dialog>
    <v-dialog v-model="purchaseCardCoverDialog" max-width="50vw">
      <drag-and-drop module="articles" ref="file-uploader" @closeUploadFileDialog="purchaseCardCoverDialog = false"
                     @changeFile="vipService.purchase_card_cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>


import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "VipServiceCreateView",
  components: {DragAndDrop},
  data() {
    return {
      loading: true,
      categories: [],
      coverDialog: false,
      menuCoverDialog: false,
      purchaseCardCoverDialog: false,
      vipService: {
        title: null,
        service_provider_name: null,
        description: null,
        cover: null,
        menu_cover: null,
        price: null,
        purchase_card_title: null,
        purchase_card_cover: null,
        purchase_description: null,
        fields: [{field: null, type: null}],
        after_purchase_title: null,
        after_purchase_description: null,
        type: null,
        category_id: null,
        status: 1,
        selected_for_home: 1,
        priority: 1,
        wallet_type: null,
      },
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    addField() {
      this.vipService.fields.push({field: null, type: null});
    },
    removeField(index) {
      this.vipService.fields.splice(index, 1);
    },
    getCategories() {
      window.axios.get('admin/category/index?per_page=1000&type=vip_service').then((res) => {
        this.categories = res.data.data.data
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    create() {
      window.axios.post('admin/vip-service/create/', this.vipService).then((res) => {
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