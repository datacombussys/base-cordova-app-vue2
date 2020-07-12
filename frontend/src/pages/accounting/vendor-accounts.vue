<template>
  <f7-page name="vendor-accounts">
    <nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <!-- Main Container Row -->
    <f7-row class="full-width full-height">
      <!-- Main Column -->
      <f7-col width="100" medium="100">
        <!-- Page content-->
        <f7-row class="full-width">
          <!-- <assets-component></assets-component> -->
        </f7-row>
        <f7-row>
          <ejs-treegrid 
            ref='treegrid'
            allowRowDragAndDrop="true" 
            :dataSource='data' 
            hildMapping='subtasks' 
            :treeColumnIndex='1' 
            height='270px' 
            :editSettings='editSettings' 
            :toolbar='toolbar'
            :selectionSettings="selection">
            <e-columns>
              <e-column field='taskID'  :isPrimaryKey='true'  headerText='Task ID'  width=90 textAlign='Right'></e-column>
              <e-column field='taskName' headerText='Task Name' width=180></e-column>
              <e-column field='startDate' headerText='Start Date' editType= 'datepickeredit' type= 'date' format= 'yMd' textAlign='Right' width=170></e-column>
              <e-column field='duration' headerText='Duration' width=80  textAlign='Right'></e-column>
              </e-columns>
            </ejs-treegrid>
        </f7-row>
        <!-- END Page content-->
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//LayoutComponents
import navBarComponent from "@/components/universal/navbar-component.vue";

//Chart Of Accounts Compoents
import assetsComponent from "@/pages/accounting/chart-of-accounts/components/assets-component.vue";

import { TreeGridPlugin, Edit, Toolbar, RowDD  }  from '@syncfusion/ej2-vue-treegrid';

let dataSource = [
        {
            taskID: 1,
            taskName: 'Planning',
            startDate: new Date('02/03/2017'),
            endDate: new Date('02/07/2017'),
            progress: 100,
            duration: 5,
            priority: 'Normal',
            approved: false,
            subtasks: [
                { taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'), endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Normal', approved: false },
                { taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'), endDate: new Date('02/07/2017'), duration: 5, progress: 100, approved: true },
                { taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'), endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Critical', approved: false },
                { taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'), endDate: new Date('02/07/2017'), duration: 0, progress: 0, priority: 'Low', approved: true }
            ]
        },
        {
            taskID: 6,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            duration: 3,
            progress: 86,
            priority: 'High',
            approved: false,
            subtasks: [
                { taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'), endDate: new Date('02/12/2017'), duration: 3, progress: 60, priority: 'Normal', approved: false },
                { taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'), endDate: new Date('02/12/2017'), duration: 3, progress: 100, priority: 'Critical', approved: false },
                { taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'), endDate: new Date('02/14/2017'), duration: 2, progress: 100, approved: true },
                { taskID: 10, taskName: 'Design Documentation', startDate: new Date('02/13/2017'), endDate: new Date('02/14/2017'), duration: 2, progress: 100, approved: true },
                { taskID: 11, taskName: 'Design complete', startDate: new Date('02/14/2017'), endDate: new Date('02/14/2017'), duration: 0, progress: 0, priority: 'Normal', approved: true }
            ]
        }];

export default {
    name: "vendorAccounts",
    	mixins: [
		UniversalMixins
		],
	components: {
    "nav-bar-component": navBarComponent,
    "assets-component": assetsComponent,
	},
    data() {
      return {
        data: dataSource,
        //Component Data
        pageSettings: {
				leftNavDrawer: ".accounting-panel",
				pageTitle: "Vendor Accounts"
			},
        moduleInfo: {
          name: "Vendor Accounts",
          type: "dashboard",
          level: 5
			  },
        //Main Settings
        allowDD: true,
        toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
        selection: { type: 'Multiple' },
        editSettings:  { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
       
     
      }
    },
    provide: {
      treegrid: [ Edit, Toolbar, RowDD ]
    },
    methods: {
      testButton() {
       
      },
 
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
     
    },
    watch: {
 
    },
    mounted() {
 
     
    },
    created() {

    },

    
  }
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "../../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css";
</style>

