<template>
  <div v-if="!loading">
    <v-card class="card-show">
      <v-card-title>
        نمایش جزییات متریال
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/material/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card class="card-show">
              <v-card-title>{{ material.name }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <img :alt="material.name" :src="material.cover" class="responsive-image"/>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>لیبل: {{ material.label }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>واحد: {{ material.unit }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>قیمت هر واحد: {{ material.price_per_unit }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>کاور: {{ material.cover }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>وضعیت: {{ material.status }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>دسته بندی: {{ material.category_name }}</v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-card-text>تاریخ ساخت متریال: {{ material.created_at_fa }}</v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text v-html="material.description"></v-card-text>
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


export default {
  name: "MaterialGetView",
  data() {
    return {
      loading: true,
      material: {}
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('v1/admin/material/get/' + this.$route.params.id).then((res) => {
        this.material = res.data.data
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
  width: 100%;   /* Fill the width of the container */
  height: 20vh;  /* Set height as 20% of the viewport height */
  object-fit: cover; /* Preserve aspect ratio but might crop the image */
}
</style>