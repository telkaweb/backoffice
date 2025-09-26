<template>
  <div class="main-page">
    <v-card elevation="0" class="mx-16 mt-16" style="border-radius: 10px" color="#ffffff" min-height="100vh">
      <v-row>
        <v-col cols="12" class="chart-container" v-if="!chartLoading">
          <line-chart-component :dataset="credits"></line-chart-component>
        </v-col>

        <v-col cols="12" class="text-center">
          میزان علاقه مشتریان به خدمات
        </v-col>
        <v-col cols="12" v-if="!chartLoading">
          <PieChartComponent :chartData="totalBuy"
                             :chartLabels="['گردشگری','آموزش' , 'تفریحات' ,'ورزش و سلامت' ]"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import LineChartComponent from "@/components/Charts/LineChartComponent.vue";
import PieChartComponent from '@/components/Charts/PieChartComponent.vue'

export default {
  name: "HomeView",
  components: {LineChartComponent, PieChartComponent},
  data() {
    return {
      chartLoading: true,
      totalBuy: [],
      credits: {
        labels: ['آموزش', 'ورزش و سلامتی', 'تفریحات و سرگرمی', 'گردشگری'],
        datasets: [
          {
            label: 'موجودی اعتباری',
            backgroundColor: '#0a04f6',
            borderColor: '#446bff',
            data: []
          },
        ]
      },
    }
  },
  methods: {
    getHomePageDetails() {
      window.axios.get('v1/admin/home-page').then((res) => {
        Object.values(res.data.data.value_of_wallets).forEach(item => {
          this.credits.datasets[0].data.push(parseInt(item.total));
        });
        Object.values(res.data.data.value_of_orders).forEach(item => {
          if (item.wallet_type === 'tourism' || item.wallet_type === 'education' || item.wallet_type === 'entertainment' || item.wallet_type === 'health')
            this.totalBuy.push(parseInt(item.total));
        });
        console.log(this.totalBuy)
        this.chartLoading = false
      })
    }
  },
  mounted() {
    this.getHomePageDetails()
  }
}
</script>

<style scoped>
.chart-container {
  padding: 50px;
  max-height: 400px !important;
  font-size: 20px !important;
}

.main-page {
  background-color: #f7f8fa;
}

.main-page-card {
  background-color: #f7f8fa;
  border-style: solid;
  border-color: #FFD700;
}

.main-page-card:hover {
  border-color: #413b3b;
}
</style>