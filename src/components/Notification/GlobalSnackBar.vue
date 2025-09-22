<template>
  <div>
    <v-dialog
        multi-line
        width="500px"
        class="mt-16"
        centered
        top
        v-model="$store.state.snackbarStatus"
    >
      <v-card :color="$store.state.snackbarColor">
        <v-card-actions>
          <v-icon @click="closeDialog" :color="$store.state.snackbarColor !== 'error' ? 'error' : 'black'">
            mdi-close
          </v-icon>
        </v-card-actions>
        <v-row class="ma-0 pa-0">
          <v-col v-html="$store.state.snackbarText " class="white--text">
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "globalSnackBar",
  data() {
    return {
      timeout: 3000
    }
  },
  watch: {
    '$store.state.snackbarStatus'(value) {
      if (value) {
        let self = this
        window.setTimeout(function () {
          self.$store.commit('setSnackbarStatus', false)
        }, self.timeout)
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('setSnackbarStatus', false)
    }
  }
}
</script>

<style scoped>

</style>
