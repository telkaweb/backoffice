<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn type="button" fab color="#01601d"
             v-bind="attrs" v-on="on" class="white--text mx-1"
             @click="getExport()">
        <v-icon>mdi-file-excel-outline</v-icon>
      </v-btn>
    </template>
    <span>گرفتن خروجی</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "ExportButton",
  props: ['model'],
  data() {
    return {}
  },
  methods: {
    getExport() {
      window.axios.get('admin/' + this.model + '/export').then((res) => {
        window.location.href = res.data.data
      })
    },
  }
}
</script>
<style scoped>

</style>