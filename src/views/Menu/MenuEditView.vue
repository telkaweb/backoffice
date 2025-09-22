<template>
  <div class="main-margin" v-if="!loading">
    <v-card class="main-padding" color="white">
      <v-card-title>
        ویرایش منو
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" color="#0a1225" @click="$router.push('/menu/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="menu.label" label="نام منو" color="black">
            </v-text-field>
          </v-col>

                    <!--LANGS-->
          <v-col cols="12">
            زبان های دیگر
            <v-btn color="success" class="mx-1" @click="addLang()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn color="error" class="mx-1" @click="removeLang()">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-for="(_,index) in languages" :key="index+'lang'">
            <v-row>
              <v-col cols="2">
                <v-text-field color="black" hint="اختصار زبان مثل fa" label="lang" v-model="languages[index].lang">
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field color="black" label="نام" v-model="languages[index].title">
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="edit()" class="letter-spacing-normal white--text" width="200px" color="#0a1225">ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "MenuEditView",
  data() {
    return {
      loading: true,
      coverDialog: false,
      menu: {
        label: null,
      },
      languages: [],
    }
  },
  mounted() {
    this.getEntity()
  },
  methods: {
    addLang() {
      this.$set(this.languages, this.languages.length, {
        lang: null,
        title: null,
      })
    },
    removeLang() {
      if (this.languages.length > 0) {
        this.$delete(this.languages, this.languages.length - 1)
      }
    },
    getEntity() {
      window.axios.get('menu/get/' + this.$route.params.id).then((res) => {
        this.menu = res.data.data.model
        this.languages = res.data.data.languages
        this.loading = false
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#F1416C')
      })
    },
    edit() {
      window.axios.post('menu/update/' + this.$route.params.id, {
        label: this.menu.label,
        lang: this.languages,
      }).then((res) => {
        this.openSnackbar(res.data.message, '#0a1225')
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