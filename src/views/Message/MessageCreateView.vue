<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت پیام جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/message/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="message.text" label="متن پیام" color="black">
            </v-textarea>
          </v-col>
          <v-col cols="4">
            <v-autocomplete color="black" v-model="message.tag_id" :items="tags" item-text="label"
                            label="تک پیام را انتخاب کنید." item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete color="black" v-model="message.receiver_id" :items="users" item-text="full_name"
                            label="کاربر را انتخاب کنید." item-value="id"></v-autocomplete>
          </v-col>

          <v-col cols="4">
            <v-select :items="[{text:'اعلان',value:'notification'},{text:'پیامک',value:'sms'}]" v-model="message.type"
                      label="نوع پیام" color="black">
            </v-select>
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
  name: "MessageCreateView",
  data() {
    return {
      loading: false,
      tags: [],
      users: [],
      message: {
        receiver_id: null,
        text: null,
        tag_id: null,
        type: null,
      },
    }
  },
  mounted() {
    this.getTags()
    this.getUsers()
  },
  methods: {
    getTags() {
      window.axios.get('v1/admin/tag/index?per_page=1000').then((res) => {
        this.tags = res.data.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getUsers() {
      window.axios.get('v1/admin/user/index?per_page=1000').then((res) => {
        this.users = res.data.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    create() {
      window.axios.post('v1/admin/message/create/', {
        text: this.message.text,
        receiver_id: this.message.receiver_id,
        tag_id: this.message.tag_id,
        type: this.message.type,
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