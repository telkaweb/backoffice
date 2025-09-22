<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت سوال جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/question/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-textarea v-model="question.question" label="سوال" color="black">
            </v-textarea>
          </v-col>
          <v-col cols="6">
            <v-textarea v-model="question.answer" label="پاسخ" color="black">
            </v-textarea>
          </v-col>
          <v-col cols="3">
            <v-text-field color="black" label="اولویت"
                          v-model="question.priority"
                          ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-checkbox color="black" :false-value="0" :true-value="1" label=" نمایش در سایت؟"
                          v-model="question.status"
            ></v-checkbox>
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
  name: "QuestionCreateView",
  data() {
    return {
      loading: false,
      coverDialog: false,
      question: {
        answer: null,
        question: null,
        priority: null,
        status: 1,
      },
    }
  },
  mounted() {
  },
  methods: {
    create() {
      window.axios.post('admin/question/create/', {
        answer: this.question.answer,
        question: this.question.question,
        priority: this.question.priority,
        status: this.question.status,
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