
import { Line } from 'vue-chartjs'
// console.log('Line', Line);

export default {
  extends: Line,
  data: () => ({
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      datasets: [
        {
          label: 'Rent',
          backgroundColor: '#0610B5',
          data: [1000, 1250, 1124, 1236, 1000, 950],
          type: 'line',
          fill: false,
        },
        {
          label: 'Supplies',
          backgroundColor: '#05A39B',
          data: [525, 750, 489, 625, 425, 600],
          type: 'line'
        },
        {
          label: 'COGS',
          backgroundColor: '#EC1D0C',
          data: [757, 656, 854, 523, 656, 858],
          type: 'line'
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
