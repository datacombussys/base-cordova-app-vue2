
import { Pie } from 'vue-chartjs'
// console.log('Pie', Pie);

export default {
  extends: Pie,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          backgroundColor: ['#E3890F', '#084E4C', '#24F6EE'],
          data: [40, 30, 52]
        },
 
      ]
    },
    chartOptions: {
      legend: {
        fullWidth: true,
        position: 'right',
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)',
          boxWidth: 10,
        }
      },
      responsive: true,
      cutoutPercentage:30,
      // rotation: 1,
      // circumference: 1,
    }
  }),

  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
