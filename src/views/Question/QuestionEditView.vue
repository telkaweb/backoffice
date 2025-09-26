<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ویرایش سوال
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
            <v-btn @click="edit()" class="letter-spacing-normal white--text main-button" width="200px">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>


export default {
  name: "QuestionEditView",
  data() {
    return {
      loading: true,
      coverDialog: false,
      question: {
        answer: null,
        question: null,
        priority: null,
        status: null,
      },
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    getEntity() {
      window.axios.get('v1/admin/question/get/' + this.$route.params.id).then((res) => {
        this.question = res.data.data
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('v1/admin/question/update/' + this.$route.params.id, {
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