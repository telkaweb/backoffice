<template>
  <LineChart :data="dataset" :options="sampleOptions"/>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Line as LineChart} from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
export default {
  name: 'App',
  props: ['dataset'],
  components: {
    LineChart
  },
  data() {
    return {
      sampleOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  }
}
</script>
