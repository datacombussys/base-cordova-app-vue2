<template>
	<div>
		<div class="headline">{{ databaseSettings.title }}</div>
		<template>
			<DxDataGrid
				:id="databaseData.tableId"
				:data-source="databaseData.list"
				:remote-operations="false"
				:allow-column-reordering="true"
				:row-alternation-enabled="true"
				:show-borders="true"
				@content-ready="onContentReady"
				:key-expr="databaseSettings.col1"
				@selection-changed="onSelectionChanged"
			>
			<!-- <DxSelection
				mode="multiple"
				:allow-select-all="false"
				show-check-boxes-mode="always" />  -->
			<DxEditing
        :allow-updating="false"
        :allow-deleting="false"
        :allow-adding="false"
        mode="row"
      />
				<DxColumn
					:caption="databaseSettings.header1"
					:data-field="databaseSettings.col1"
					:width="50"
				/>
				<DxColumn
				:caption="databaseSettings.header2"
					:data-field="databaseSettings.col2"
					cell-template="show-image"
					data-type="string"
				/>
					<template #show-image="{ data }">
            <img :src="data.value" width="50" height="50">
        	</template>
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
				<DxColumn
					:data-field="databaseSettings.col7"
					:caption="databaseSettings.header7"
					cell-template="stylize-isactive"
					data-type="string"
				/>
					<template #stylize-isactive="{ data }">
            <div class="bg-success text-white text-sm text-center p-1 rounded-md" v-if="data.value">Active</div>
						<div class="bg-danger text-white text-sm text-center p-1 rounded-md" v-else>Inactive</div>
        	</template>
				<DxColumn
					:data-field="databaseSettings.col1"
					caption="Actions"
					cell-template="edit-delete-icons"
					data-type="string"
				/>
					<template #edit-delete-icons="{ data }">
						<div>
							<div class="row">
								<div class="col-6">
									<a href="#" @click="editRow(data)">
										<i class="material-icons text-orange-lighter">edit</i>
									</a>
								</div>
								<div class="col-6">
									<a href="#" @click="deleteRow(data)">
										<i class="material-icons text-orange-lighter">delete</i>
									</a>
								</div>
							</div>
						</div>
        </template>
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
		<!-- <div class="row">
			<DxButton
				:width="150"
				class="ml-4"
				text="Test"
				type="danger"
				styling-mode="contained"
				:focusStateEnabled="false"
				@click="testingMethod">
			</DxButton>
		</div> -->
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
	DxEditing,
	DxSelection
	} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { confirm, custom, alert } from 'devextreme/ui/dialog';

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
		DxEditing,
		DxSelection,
		DxButton,
		alert
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
      table: null,
			events:[],

		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
			console.log('this.table', this.table);
			console.log('this.event', this.event);
		},
		logEvent(eventName) {
      this.events.unshift(eventName);
		},
		clearEvents() {
      this.events = [];
		},
		onContentReady: function(e) {
			this.table = e.component
			// if (!collapsed) {
			// 	e.component.expandRow(['EnviroCare']);
			// 	collapsed = true;
			// }
		},
		onSelectionChanged({ selectedRowsData }) {
			console.log('onSelectionChanged { selectedRowsData }', selectedRowsData);
		},
		alertSingleSelection() {
			this.$nextTick(function() {
				alert("You can only edit one record at a time", "Edit Error")
			})
		},
		editRow(e) {
			console.log('editRow e', e);
			this.$emit("editProfile", e.value)

		},
		deleteRow(e) {
			console.log('deleteRow e', e);
			this.$emit("deleteProfile", e.value)

		}
	},
	computed: {
		...mapGetters([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
