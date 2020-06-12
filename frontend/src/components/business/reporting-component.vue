<template>
  <div>
    <!-- Page content-->
    <f7-row class="full-width no-margin">
      <f7-block-title class="full-width" medium>Customers</f7-block-title>
      <f7-col width="50">
        <div class="swiper1-container">
          <bar-chart class="swiper1-bar-chart"></bar-chart>
        </div>
      </f7-col>
      <f7-col width="50">
        <div class="swiper2-container">
          <pie-chart class="swiper2-pie-chart" :styles="pieStyle"></pie-chart>
        </div>
      </f7-col>
    </f7-row>
    <f7-row class="full-width no-margin">
      <f7-block-title class="full-width" medium>Employees</f7-block-title>
      <f7-col width="50">
        <div class="multi-line-container">
          <multi-line-chart class="multi-line-chart"></multi-line-chart>
        </div>
      </f7-col>
      <f7-col width="50">
        <div class="multi-line2-container">
          <multi-line2 class="multi-line2"></multi-line2>
        </div>
      </f7-col>
    </f7-row>
    <f7-row class="full-width no-margin">
      <f7-block-title class="full-width" medium>Sales</f7-block-title>
      <f7-col width="50">
        <div class="histogram-container">
          <histogram-chart class="histogram-chart" :styles="histogramStyle"></histogram-chart>
        </div>
      </f7-col>
      <f7-col width="50">
        <div class="line-container"> 
          <line-chart class="line-chart"></line-chart>
        </div>
      </f7-col>
    </f7-row>
    <f7-row class="full-width no-margin">
      <f7-block-title class="full-width" medium>Inventory</f7-block-title>
      <f7-col width="50">
        <div class="swiper1-container">
          <bar-chart class="swiper1-bar-chart"></bar-chart>
        </div>
      </f7-col>
      <f7-col width="50">
        <div class="swiper2-container">
          <pie-chart class="swiper2-pie-chart" :styles="pieStyle"></pie-chart>
        </div>
      </f7-col>
    </f7-row>
    <!-- END Page content-->
  </div> 
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';

//Charts
import BarChart from '../../mixins/chartJS/bar-chart';
import PieChart from '../../mixins/chartJS/pie-chart1';
import LineChart from '../../mixins/chartJS/line-chart';
import MultiLineChart from '../../mixins/chartJS/multi-line-chart';
import MultiLineChart2 from '../../mixins/chartJS/multi-line2';
import HistogramChart from '../../mixins/chartJS/histogram-chart';

export default {
  name: "reportingComponent",
  mixins: [
    UniversalMixins,
  ],
  components: {
    'bar-chart': BarChart,
    'pie-chart': PieChart,
    'line-chart': LineChart,
    'multi-line-chart': MultiLineChart,
    'multi-line2': MultiLineChart2,
    'histogram-chart': HistogramChart,
  },
  props: {
    moduleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //Mixin Data

    }
  },
  methods: {
    testButton() {
      console.log('this.Auth.platformInfo', this.Auth.platformInfo);
    },
   
  },
  computed: {
    ...mapState(["Warehouses", "Auth"]),
    pieStyle() {
      return {
        width: '175px',
        // position: 'absolute'
      }
    },
    histogramStyle() {
      return {
        width: '200px',
        // position: 'absolute'
      }
    }
  },
  watch: {

  },
  async mounted() {
    //get User Platform and get Shift List
    let response = await this.setUserPlatformGET();
    console.log('Mounted Warehouse database response', response);
    if(this.Warehouses.warehouseList.length === 0) {
      this.$store.dispatch('getWarehouseList', response);
    }
    
  },
  created() {

  },

  
}
</script>

<style lang="less" scoped>
.swiper1-container {
  max-width: 600px;
  .swiper1-bar-chart {
    height: 150px;
  }
}
.swiper2-container {
  max-width: 500px;
  .swiper2-pie-chart {
    max-height:160px;
  }
}

.line-container {
  max-width: 500px;
  .line-chart {
    max-height:160px;
  }
}
.histogram-container {
  max-width: 600px;
  .histogram-chart {
    height: 165px;
  }
}
.multi-line-container {
  max-width: 600px;
  .multi-line-chart {
    height: 300px;
  }
}
.multi-line2-container {
  max-width: 600px;
  .multi-line2 {
    height: 200px;
  }
}
</style>

