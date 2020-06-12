
import { Bar } from 'vue-chartjs'
// console.log('Bar', Bar);

export default {
  extends: Bar,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      datasets: [
        {
          label: 'Customers',
          backgroundColor: '#F21203',
          data: [
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ],
        },
        {
          label: 'Employees',
          backgroundColor: '#0C8D84',
          data: [
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ],
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
