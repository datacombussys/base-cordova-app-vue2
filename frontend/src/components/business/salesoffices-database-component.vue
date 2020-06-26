<template>
	<div>
		<f7-datatable-component 
			:tableData="tableData" 
			:tableSettings="tableSettings">
			<!-- Table Body Scoped Slot -->
			<template v-slot:tbody>
				<tbody v-if="tableData.list.length != 0">
					<tr v-for="item in paginatedList" :key="item.id">
						<td class="checkbox-cell">
							<label class="checkbox">
								<input :id="item.id" type="checkbox" @change="checkedItem($event, tableData.list)">
								<i class="icon-checkbox"></i>
							</label>
						</td>
						<td :id="item.id" class="label-cell text-align-center">{{ item.id }}</td>
						<td class="label-cell text-align-center">{{ item.salesoffice_name  }}</td>
						<td class="label-cell text-align-center">{{item.salesoffice_number }}</td>
						<td class="numeric-cell text-align-center">{{ item.primary_mailing_city }}</td>
						<td class="numeric-cell text-align-center">{{ item.primary_mailing_state }}</td>
						<td class="label-cell text-align-center">
							<b-tag size="is-medium" :type="`${ item.is_active ? 'is-success' : 'is-danger'}`">{{
								item.is_active ? "Active" : "Inactive"
							}}</b-tag>
						</td>
					</tr>
				</tbody>
			</template>
			<!-- END Table Body Scoped Slot -->
		</f7-datatable-component>

			<!-- <f7-card class="data-table data-table-init" v-if="SalesOffices.salesOfficeList.length === 0 || Auth.platformInfo.domain != moduleInfo.name">
				<f7-card-content>
					<div class="error-text">
						None to display
					</div>
					<f7-row class="display-flex justify-content-center">
						<f7-col width="50">
							<f7-button href="/salesoffice/" fill>Create Sales Office</f7-button>
						</f7-col>
					</f7-row>
				</f7-card-content>
			</f7-card> -->

	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "../../mixins/universal-mixins";
import { DataTableMixins } from "../../mixins/components/table-mixins";

//Components
import f7DataTableComponent from "@/components/layout-elements/f7-datatable-component.vue";

export default {
	name: "salesOfficesDatabase",
	mixins: [
		UniversalMixins, 
		DataTableMixins
		],
	components: {
		"f7-datatable-component": f7DataTableComponent
	},
	props: {
	},
	data() {
		return {
			//Component Data
			tableSettings: {
				popupLink: '',
				showCreateButton: false,
				title: "Sales Office List",
				createButton: "Create Sales Office",
				header1: "Id",
				header2: "Name",
				header3: "Number",
				header4: "City",
				header5: "State",
				header6: "Status",
				col1: "id",
				col2: "salesoffice_name",
				col3: "salesoffice_number",
				col4: "primary_mailing_city",
				col5: "primary_mailing_state",
				col6: "is_active"
			},
			tableData: {
				tableId: "SalesOfficeTable",
				list: new Array()
			},

		};
	},
	methods: {
		testButton() {
			console.log("this.Auth.platformInfo", this.Auth.platformInfo);
		},

	
	},
	computed: {
		...mapState(["SalesOffices", "Auth"]),
		...mapGetters(["GET_SALES_OFFICE_LIST", "GET_SALES_OFFICE_LIST_LENGTH"])
	},
	watch: {},
	async mounted() {

	},
	created() {
		this.tableData.list = this.GET_SALES_OFFICE_LIST;
		this.paginatedList = this.GET_SALES_OFFICE_LIST_LENGTH;
		console.log("created this.GET_SALES_OFFICE_LIST", this.GET_SALES_OFFICE_LIST);
	}
};
</script>

<style lang="less" scoped>

</style>
