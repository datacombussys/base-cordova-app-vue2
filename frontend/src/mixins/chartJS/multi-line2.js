
import { Line } from 'vue-chartjs'
// console.log('Line', Line);

export default {
  extends: Line,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      datasets: [
        {
          label: 'Warehouse Orders',
          backgroundColor: '#0610B5',
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
          ],
          type: 'line',
          fill: false,
          pointRadius: 5,
        },
        {
          label: 'Sales Invoices',
          backgroundColor: '#05A39B',
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
          ],
          type: 'line',
          fill: false,
          pointRadius: 5,
        },
        {
          label: 'Website Sales',
          backgroundColor: '#EC1D0C',
          data: [
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
          ],
          type: 'line',
          fill: false,
          pointRadius: 5,
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
