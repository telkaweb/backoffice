<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش محصول
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/product/index')">
              <v-icon class="main-icon">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.name" label="نام محصول" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.slug" label="نامک محصول"
                          hint="اسلاگ یا نامک را به صورتی وارد کنید که مثلا به جای فاصله از - استفاده کنید . به عنوان مثال gold-service-18k"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.label" label="لیبل محصول" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="فایل کاور"
                          @click="coverDialog = true" prepend-icon="mdi-plus"
                          color="black"
                          v-model="product.cover"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.code" label="کد محصول" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select item-text="text" item-value="value"
                      :items="[{text:'سکه',value:'coin'},{text:'جواهر',value:'jewelry'}]" v-model="product.type"
                      label="نوع محصول" color="black">
            </v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" hint="بین ۰ تا ۱۰۰" v-model="product.margin" label="درصد سود محصول"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" hint="بین ۰ تا ۱۰۰" v-model="product.wage" label="درصد کارمزد محصول"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" hint="بین ۰ تا ۱۰۰" v-model="product.tax" label="درصد مالیات محصول"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" hint="بین ۰ تا ۱۰۰" v-model="product.discount" label="درصد تخفیف محصول"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" v-model="product.priority" label="اولویت محصول" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="product.count" label="موجودی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="product.average_price" label="میانگین قیمت" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="product.is_special" label="خاص است؟" :true-value="1" :false-value="0" color="black">
            </v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox :true-value="1" :false-value="0" v-model="product.is_index" color="black"
                        label="نمایش در صفحه اصلی؟"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox :true-value="1" :false-value="0" v-model="product.is_menu" color="black"
                        label="نمایش در منو؟"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <vue-persian-datetime-picker color="black" v-model="product.valid_until"
                                         type="datetime"
                                         custom-input="#valid_until"
                                         auto-submit></vue-persian-datetime-picker>
            <v-text-field label="محصول قابل فروش است تا" v-model="product.valid_until" id="valid_until"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <vue-persian-datetime-picker color="black" v-model="product.has_discount_until"
                                         type="datetime"
                                         custom-input="#has_discount_until"
                                         auto-submit></vue-persian-datetime-picker>
            <v-text-field label="محصول دارای تخفیف است تا" v-model="product.has_discount_until" id="has_discount_until"
                          color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select color="black" v-model="product.status"
                      :items="[{label:'فعال',value:'active'},{label:'غیر فعال',value:'inactive'}]" item-text="label"
                      label="وضعیت محصول انتخاب کنید" item-value="value"></v-select>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="product.category_id" :items="categories" item-text="label"
                            label="دسته بندی محصول را انتخاب کنید." item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="product.admin_id" :items="sellers" item-text="name"
                            label="فروشنده محصول را انتخاب کنید." item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete color="black" v-model="product.tag_ids" :items="tags" multiple item-text="label"
                            label="تک های محصول را انتخاب کنید." item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field label="اضافه کردن فایل"
                          @click="mediaDialog = true" prepend-icon="mdi-plus"
                          color="black"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.meta_title" label="meta title" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.meta_description" label="meta description" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.og_title" label="og title" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="product.og_description" label="og description" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-btn text>
                  <v-icon color="success" @click="addMaterials()">mdi-plus</v-icon>
                </v-btn>
                <v-btn text>
                  <v-icon color="warning" @click="removeMaterials()">mdi-minus</v-icon>
                </v-btn>
                (ابتدا نوع متریال را وارد کنید سپس در فیلد زیر مقدار آن را وارد کنید . مثلا برای سرویس طلا با سنگ یاقوت،
                متریال طلا مقدار ۱۳ و سنگ یاقوت مقدار ۴ را وارد کنید. سیستم قیمت ۱۳ گرم طلا و ۴ گرم یاقوت را محاسبه
                خواهد کرد و قیمت زنده را نمایش می دهد.)
              </v-col>
              <v-col cols="4" v-for="item in selectedMaterials" :key="item.id+'selected-material'">
                <v-autocomplete color="black" v-model="item.id" label="متریال" :items="materials" item-value="id"
                                item-text="label">
                </v-autocomplete>
                <v-text-field color="black" type="number" v-model="item.count" label="مقدار متریال"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <b>توضیحات</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="product.description" label="توضیحات" color="black">
            </ckeditor>
          </v-col>
          <v-col cols="12">
            <b>توضیحات مختصر</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="product.short_description" label="توضیحات مختصر"
                      color="black">
            </ckeditor>
          </v-col>
          <v-col cols="12">
            <b>ویژگی ها</b>
            <ckeditor :editor-url="$ckeditor.editorUrl" v-model="product.features" label="ویژگی ها" color="black">
            </ckeditor>
          </v-col>
          <v-col cols="12" v-if="files.length">
            <v-row>
              <v-col cols="3" v-for="file in files" :key="file.id" class="image-container">
                <v-icon class="delete-icon" color="error" @click="detachFile(file)">mdi-trash-can-outline</v-icon>
                <img v-if="file.type === 'video' && selectedVideoIdForShow !== file.id " src="@/assets/play.png"
                     style="cursor: pointer;"
                     class="fill-image" alt="play" @click="showVideo(file)">
                <video-player v-else-if="file.type === 'video' && selectedVideoIdForShow === file.id"
                              source="ProductEditView" :options="videoOptions"></video-player>
                <img v-else :src="file.url" class="fill-image" alt="fileName">
              </v-col>
            </v-row>
          </v-col>
          <v-dialog v-model="mediaDialog" max-width="50vw">
            <drag-and-drop-multiple module="ProductEditView" ref="file-uploader"
                                    @closeUploadFileDialog="mediaDialog = false"
                                    @changeFile="attachFile($event)"></drag-and-drop-multiple>
          </v-dialog>
          <v-col cols="12" class="text-center mt-6">
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="coverDialog" max-width="50vw">
      <drag-and-drop module="products" ref="file-uploader" @closeUploadFileDialog="coverDialog = false"
                     @changeFile="product.cover = $event"></drag-and-drop>
    </v-dialog>
  </div>
</template>

<script>

import DragAndDropMultiple from "@/components/UploadFile/DragAndDropMultiple.vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import VideoPlayer from "@/components/Player/VideoPlayer.vue";
import DragAndDrop from "@/components/UploadFile/DragAndDrop.vue";

export default {
  name: "ProductEditView",
  components: {VideoPlayer, DragAndDropMultiple, VuePersianDatetimePicker, DragAndDrop},
  data() {
    return {
      coverDialog: false,
      selectedVideoIdForShow: null,
      loading: false,
      mediaDialog: false,
      materials: [],
      categories: [],
      tags: [],
      sellers: [],
      files: [],
      selectedMaterials: [],
      product: {
        name: null,
        slug: null,
        label: null,
        cover: null,
        description: null,
        short_description: null,
        features: null,
        code: null,
        margin: null,
        wage: null,
        tax: null,
        discount: null,
        priority: null,
        count: null,
        is_special: null,
        valid_until: null,
        has_discount_until: null,
        status: null,
        type: null,
        is_index: 0,
        is_menu: 0,
        admin_id: null,
        category_id: null,
        average_price: null,
        tag_ids: [],
        file_ids: [],
        meta_title: null,
        meta_description: null,
        og_title: null,
        og_description: null,
      },
      videoOptions: {
        autoplay: true,
        playbackRates: [0.5, 1, 1.5, 2, 4, 8],
        height: 500,
        width: 888,
        controls: true,
        liveui: true,
        responsive: true,
        sources: [
          {
            src: '',
            type: "application/vnd.apple.mpegurl"
          }
        ],
      },
    }
  },
  mounted() {
    this.getEntity()
    this.getCategories()
    this.getTags()
    this.getSellers()
    this.getMaterials()
  },
  methods: {
    showVideo(file) {
      this.selectedVideoIdForShow = file.id
      this.videoOptions.sources[0].src = file.url
    },
    addMaterials() {
      let material = {
        id: null,
        count: null
      }
      this.selectedMaterials.push(material)
    },
    removeMaterials() {
      if (this.selectedMaterials.length > 0) {
        this.selectedMaterials.pop();
      }
    },
    attachFile(e) {
      this.files.push(e)
      this.mediaDialog = false
    },
    detachFile(file) {
      const index = this.files.findIndex(f => f.file_id === file.file_id);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    },
    getMaterials() {
      window.axios.get('admin/material/index?per_page=1000').then((res) => {
        this.materials = res.data.data.data
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    getSellers() {
      window.axios.get('admin/seller/index?per_page=1000').then((res) => {
        this.sellers = res.data.data.data
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    getCategories() {
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
    getTags() {
      window.axios.get('admin/tag/index?per_page=1000').then((res) => {
        this.tags = res.data.data.data
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    getEntity() {
      window.axios.get('admin/product/get/' + this.$route.params.id).then((res) => {
        this.product = res.data.data
        this.product.valid_until = this.product.valid_until_fa
        this.product.has_discount_until = this.product.has_discount_until_fa
        this.product.tag_ids = []
        this.product.tags.forEach((item) => {
          this.product.tag_ids.push(item.id)
        })
        this.selectedMaterials = []
        this.product.materials.forEach((item) => {
          this.selectedMaterials.push({id: item.id, count: item.pivot.count})
        })
        this.files = []
        this.product.files.forEach((file) => {
          let item = {
            type: file.type,
            url: file.url,
            file_id: file.id
          }
          this.files.push(item)
        })
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      this.product.file_ids = []
      this.files.forEach((item) => {
        this.product.file_ids.push(item.file_id)
      })
      window.axios.post('admin/product/update/' + this.$route.params.id, {
        name: this.product.name,
        slug: this.product.slug,
        label: this.product.label,
        cover: this.product.cover,
        description: this.product.description,
        short_description: this.product.short_description,
        features: this.product.features,
        code: this.product.code,
        margin: this.product.margin,
        wage: this.product.wage,
        tax: this.product.tax,
        discount: this.product.discount,
        priority: this.product.priority,
        count: this.product.count,
        is_special: this.product.is_special,
        valid_until: this.product.valid_until,
        has_discount_until: this.product.has_discount_until,
        status: this.product.status,
        type: this.product.type,
        is_index: this.product.is_index,
        is_menu: this.product.is_menu,
        admin_id: this.product.admin_id,
        category_id: this.product.category_id,
        average_price: this.product.average_price,
        tag_ids: this.product.tag_ids,
        materials: this.selectedMaterials,
        file_ids: this.product.file_ids,
        meta_title: this.product.meta_title,
        meta_description: this.product.meta_description,
        og_title: this.product.og_title,
        og_description: this.product.og_description
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