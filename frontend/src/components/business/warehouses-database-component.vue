<template>
  <!-- Page content-->
  <f7-row class="full-width no-margin">
    <f7-block class="full-width no-margin-top">
      <!-- Shifts -->  
      <f7-card class="data-table data-table-init">
        <f7-card-content v-if="Warehouses.warehouseList.length === 0">
          <div class="error-text">
            None to display
          </div>
          <f7-row class="display-flex justify-content-center">
            <f7-col width="50">
              <f7-button href="/warehouse/" fill>Create Warehouse</f7-button>
            </f7-col>
          </f7-row>
        </f7-card-content>
        <f7-card-content v-if="Warehouses.warehouseList.length != 0">
          <f7-list>
            <f7-row>
              <table :id="tableID">
                <thead>
                  <tr>
                    <!-- <th class="checkbox-cell">
                      <label class="checkbox">
                        <input type="checkbox">
                        <i class="icon-checkbox"></i>
                      </label>
                    </th> -->
                    <th @click="sortTable(1, tableID)" class="label-cell sortable-cell text-align-center">Warehouse ID</th>
                    <th @click="sortTable(2, tableID)" class="label-cell sortable-cell text-align-center">Name</th>
                    <th @click="sortTable(3, tableID)" class="label-cell sortable-cell text-align-center">Date Added</th>
                    <th @click="sortTable(4, tableID)" class="label-cell sortable-cell text-align-center">Phone</th>
                    <th class="text-align-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(warehouse, $warehouseIndex) in Warehouses.warehouseList" :key="$warehouseIndex">
                    <!-- <td class="checkbox-cell">
                      <label class="checkbox">
                        <input type="checkbox">
                        <i class="icon-checkbox"></i>
                      </label>
                    </td> -->
                    <td class="margin-left padding-left">{{ warehouse.warehouse_number }}</td>
                    <td class="text-align-center">{{ warehouse.warehouse_name }}</td>
                    <td class="text-align-center">{{ warehouse.date_added | moment("M/D/Y") }}</td>
                    <td class="text-align-center">{{ warehouse.main_phone }}</td>
                    <td class="text-align-center">
                      <b-tag size="is-medium" :type="`${warehouse.is_active ? 'is-success' : 'is-danger'}`">{{ warehouse.is_active ? "Active" : "Inactive" }}</b-tag>
                    </td>
                  </tr>
                </tbody>
              </table>
            </f7-row>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </f7-block>
  </f7-row>
  <!-- END Page content-->
        
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
var moment = require('moment');

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';
import { DataTableMixins } from '../../mixins/components/table-mixins';


export default {
  name: "warehousesDatabase",
  mixins: [
    UniversalMixins,
    DataTableMixins
  ],
  components: {

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
      tableID: 'WarehouseTable'

    
    }
  },
  methods: {
    testButton() {
      console.log('this.Auth.platformInfo', this.Auth.platformInfo);
    },


  },
  computed: {
    ...mapState(["Warehouses", "Auth"]),
    
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

</style>

