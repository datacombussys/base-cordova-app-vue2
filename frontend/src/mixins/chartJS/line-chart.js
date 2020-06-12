
import { Line } from 'vue-chartjs'
// console.log('Line', Line);

export default {
  extends: Line,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#05A39B',
          data: [
            Math.random()*1000,
            Math.random()*1000,
            Math.random()*1000,
            Math.random()*1000,
            Math.random()*1000,
            Math.random()*1000,
          ]
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Dollars"
          },
          gridLines: {
            display: false,
            lineWidth: 1,
          },
          ticks: {
            beginAtZero: false
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
