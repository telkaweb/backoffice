<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت استعلام جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/inquiry/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="inquiry.mobile" label="شماره همراه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="inquiry.national_code" label="کد ملی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea color="black" v-model="inquiry.description"
                        hint="پر کردن این فیلد به ساخت سیستم اعتبار سنجی عمومی توسط هوش مصنوعی در ورژن های آینده بسیار کمک خواهد کرد."
                        label="توضیحاتی درباره این استعلام وارد کنید . مثلا نام و نام خانوداگی و علت گرفتن این استعلام"></v-textarea>
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
  name: "InquiryCreateView",
  data() {
    return {
      loading: false,
      inquiry: {
        mobile: null,
        national_code: null,
        description: null,
      },
    }
  },
  mounted() {
  },
  methods: {
    create() {
      window.axios.post('admin/inquiry/create/', {
        mobile: this.inquiry.mobile,
        national_code: this.inquiry.national_code,
        description: this.inquiry.description,
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