<template>
	<div>
		<div class="headline">{{ databaseSettings.title }}</div>
		<template>
			<DxDataGrid
				:data-source="databaseData.list"
				:remote-operations="false"
				:allow-column-reordering="true"
				:row-alternation-enabled="true"
				:show-borders="true"
				@content-ready="onContentReady"
			>
				<DxEditing
					:allow-updating="true"
					:allow-deleting="true"
					mode="form" /> <!-- 'batch' | 'cell' | 'form' | 'popup' -->
				<DxColumn
					:caption="databaseSettings.header1"
					:data-field="databaseSettings.col1"
					:width="50"
				/>
				<DxColumn
				:caption="databaseSettings.header2"
					:data-field="databaseSettings.col2"
					data-type="string"
				/>
				<DxColumn
					:caption="databaseSettings.header3"
					:data-field="databaseSettings.col3"
					data-type="string"
				/>
				<DxColumn
					:caption="databaseSettings.header4"
					:data-field="databaseSettings.col4"
					data-type="string"
				/>
				<DxColumn
					:caption="databaseSettings.header5"
					:data-field="databaseSettings.col5"
					data-type="string"
				/>
				<DxColumn
					:caption="databaseSettings.header6"
					:data-field="databaseSettings.col6"
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
import { mapGetters } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
	DxSearchPanel,
	DxEditing
	} from 'devextreme-vue/data-grid';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import 'devextreme/data/odata/store';

let collapsed = false;


export default {
	name: "databaseComponent",
	mixins: [],
	components: {
		DxDataGrid,
		DxColumn,
		DxGrouping,
		DxGroupPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DxEditing
	},
	props: {
		databaseSettings: {
			type: Object,
			required: true
		},
		databaseData: {
			type: Object, 
			required: true
		}
	},
	data() {
		return {
			//DataTable
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
		...mapGetters(["GET_DATACOM_LIST"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
