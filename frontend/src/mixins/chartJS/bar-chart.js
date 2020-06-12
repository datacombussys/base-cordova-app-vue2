
import { Bar } from 'vue-chartjs'
// console.log('Bar', Bar);

export default {
  extends: Bar,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: ' #F55805',
          data: [40, 30, 25, 45, 50, 92],
          
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: false,
          scaleLabel: {
            display: true,
            labelString: "Dollars"
          },
          gridLines: {
            display: false,
            lineWidth: 1,
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: false,
          },
          gridLines: {
            display: false,
            lineWidth: 5,
          },
        }]
      },
    }
  }),

  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
