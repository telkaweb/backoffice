<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت کامنت جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/comment/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-autocomplete :items="products" item-value="id" item-text="label" v-model="comment.product_id"
                            label="نام محصول" color="black">
            </v-autocomplete>
          </v-col>
          <v-col cols="9">
            <v-text-field v-model="comment.content" label="متن کامنت" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "CommentCreateView",
  data() {
    return {
      loading: false,
      products: [],
      comment: {
        product_id: null,
        content: null,
      },
    }
  },
  mounted() {
    this.getEntities()
  },
  methods: {
    getEntities() {
      window.axios.get('v1/admin/product/index?per_page=10000').then((res) => {
        this.products = res.data.data.data
      })
    },
    create() {
      window.axios.post('v1/admin/comment/create/', {
        product_id: this.comment.product_id,
        content: this.comment.content,
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