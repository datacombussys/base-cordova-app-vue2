<template>
	<div>
		<div class="headline">Locations Datagrid</div>
		<template>
			<DxDataGrid
				:data-source="dataSource"
				:remote-operations="false"
				:allow-column-reordering="true"
				:row-alternation-enabled="true"
				:show-borders="true"
				@content-ready="onContentReady"
			>
				<DxColumn
					:group-index="0"
					data-field="Product"
				/>
				<DxColumn
					data-field="Amount"
					caption="Sale Amount"
					data-type="number"
					format="currency"
					alignment="right"
				/>
				<DxColumn
					:allow-grouping="false"
					data-field="Discount"
					caption="Discount %"
					data-type="number"
					format="percent"
					alignment="right"
					cell-template="discountCellTemplate"
					css-class="bullet"
				/>
				<DxColumn
					data-field="SaleDate"
					data-type="date"
				/>
				<DxColumn
					data-field="Region"
					data-type="string"
				/>
				<DxColumn
					data-field="Sector"
					data-type="string"
				/>
				<DxColumn
					data-field="Channel"
					data-type="string"
				/>
				<DxColumn
					:width="150"
					data-field="Customer"
					data-type="string"
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
import { mapState } from "vuex";
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
	name: "locationsComponent",
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
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
