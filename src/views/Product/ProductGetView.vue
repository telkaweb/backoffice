<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات کالا
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/product/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    <v-card-text>لیبل: {{ product.label }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>کد: {{ product.code }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>سود: %{{ product.margin }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>کارمزد: %{{ product.wage }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>مالیات: %{{ product.tax }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تخفیف: %{{ product.discount }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>اولویت: {{ product.priority }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تعداد: عدد{{ product.count }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>meta_title {{ product.meta_title }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>meta_description {{ product.meta_description }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>og_title {{ product.og_title }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>og_description {{ product.og_description }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>
                      خاص است؟:
                      <span v-if="product.is_special">بله</span>
                      <span v-else>خیر</span>
                    </v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>معتبر تا: {{ product.valid_until_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تخفیف دارد تا: {{ product.has_discount_until_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>وضعیت: {{ product.status }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>میانگین قیمت: {{ product.average_price }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>نام فروشنده: {{ product?.admin?.name }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>دسته بندی: {{ product.category_name }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ساخت کالا: {{ product.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text v-html="product.description"></v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="card-show mt-4 pa-4">
              <v-card-title>تگ ها</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="2" v-for="tag in product.tags" :key="tag.id">
                    {{tag.label}}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="card-show mt-4 pa-4">
              <v-card-title>مدیا</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3" v-for="file in product.files" :key="file.id">
                    <img v-if="file.type === 'video' && selectedVideoIdForShow !== file.id " src="@/assets/play.png"
                         style="cursor: pointer;"
                         class="fill-image" alt="play" @click="showVideo(file)">
                    <video-player v-else-if="file.type === 'video' && selectedVideoIdForShow === file.id"
                                  source="ProductEditView" :options="videoOptions"></video-player>
                    <img v-else :src="file.url" class="fill-image" alt="fileName">
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


import VideoPlayer from "@/components/Player/VideoPlayer.vue";

export default {
  name: "ProductGetView",
  components: {VideoPlayer},
  data() {
    return {
      selectedVideoIdForShow: null,
      loading: true,
      product: {},
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
  },
  methods: {
    showVideo(file) {
      this.selectedVideoIdForShow = file.id
      this.videoOptions.sources[0].src = file.url
    },
    getEntity() {
      window.axios.get('admin/product/get/' + this.$route.params.id).then((res) => {
        this.product = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
  }
}
</script>

<style>


.responsive-image {
  width: 100%; /* Fill the width of the container */
  height: 20vh; /* Set height as 20% of the viewport height */
  object-fit: cover; /* Preserve aspect ratio but might crop the image */
}
</style>