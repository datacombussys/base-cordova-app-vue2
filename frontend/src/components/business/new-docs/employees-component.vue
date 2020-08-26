<template>
	<div>
		<div class="headline">Employees</div>
		<template>
			<DxDataGrid
				:data-source="GET_SELECTED_EMPLOYEE_LIST"
				:remote-operations="false"
				:allow-column-reordering="true"
				:row-alternation-enabled="true"
				:show-borders="true"
				@content-ready="onContentReady"
			>
				<DxColumn
					:width="50"
					data-field="id"
				/>
				<DxColumn
					data-field="profile_img"
					caption="Image"
					alignment="center"
				/>
				<DxColumn
					data-type="date"
					format="shortDate"
					data-field="date_added"
					alignment="center"
				/>
				<DxColumn
					data-field="user_obj.full_name"
					caption="Full Name"
					alignment="center"
				/>
				<DxColumn
					data-field="employee_number"
					caption="Number"
					alignment="center"
				/>
				<DxColumn
					data-field="position"
					alignment="center"
				/>
				<DxColumn
					data-field="user_obj.mobile_phone"
					caption="Mobile"
					alignment="center"
				/>
				<DxColumn
					data-field="user_obj.is_active"
					caption="Is active"
					alignment="center"
				/>			

				<DxGroupPanel :visible="true"/>
				<DxSearchPanel
					:visible="true"
					:highlight-case-sensitive="true"
				/>
				<DxGrouping :auto-expand-all="false"/>
				<DxPager
					:allowed-page-sizes="pageSizes"
					:show-page-size-selector="true"
				/>
				<DxPaging :page-size="10"/>

			</DxDataGrid>
		</template>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel
} from 'devextreme-vue/data-grid';

import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

let collapsed = false;


export default {
	name: "employeesComponent",
	mixins: [],
	components: {
		DxDataGrid,
		DxColumn,
		DxGrouping,
		DxGroupPanel,
		DxPager,
		DxPaging,
		DxSearchPanel
	},
	props: {
		formData: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			//DataTable
			dataSource: new DataSource({
        store: {
          type: 'odata',
          url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
          beforeSend: function(request) {
            request.params.startDate = '2018-05-10';
            request.params.endDate = '2018-05-15';
          }
        }
      }),
      pageSizes: [10, 25, 50, 100],
      onContentReady: function(e) {
        if (!collapsed) {
          e.component.expandRow(['EnviroCare']);
          collapsed = true;
        }
      }

		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
		},

	},
	computed: {
		...mapGetters(["GET_EMPLOYEE_LIST", "GET_EMPLOYEE_LIST_LENGTH", "GET_SELECTED_EMPLOYEE_LIST", "GET_SELECTED_EMPLOYEE_LIST_LENGTH"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
