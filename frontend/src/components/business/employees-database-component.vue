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
						<td class="label-cell text-align-center">{{ item.user_obj.full_name  }}</td>
						<td class="label-cell text-align-center">{{item.employee_number }}</td>
						<td class="numeric-cell text-align-center">{{ item.position }}</td>
						<td class="numeric-cell text-align-center">{{ item.user_obj.mobile_phone }}</td>
						<td class="label-cell text-align-center">
							<b-tag size="is-medium" :type="`${ item.user_obj.is_active ? 'is-success' : 'is-danger'}`">{{
								item.user_obj.is_active ? "Active" : "Inactive"
							}}</b-tag>
						</td>
					</tr>
				</tbody>
			</template>
			<template v-slot:button>
				<div class="text-align-center error-text margin display-block">
					<div>No records to display</div>
					<f7-col width="50"class="display-flex justify-content-center align-content-center margin-top-half">
						<f7-button fill href="/employeeprofile/">Add New Employee</f7-button>
					</f7-col>
				</div>

			</template>
			<!-- END Table Body Scoped Slot -->
		</f7-datatable-component>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';
import { UniversalMixins } from "@/mixins/universal-mixins";
import { DataTableMixins } from "@/mixins/components/table-mixins";

//Components
import f7DataTableComponent from "@/components/layout-elements/datatables/f7-datatable-component.vue";

export default {
	name: "EmployeesDatabase",
	mixins: [
		UniversalMixins, 
		DataTableMixins, 
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
				title: "Employee List",
				createButton: "Create Employee",
				header1: "Id",
				header2: "Name",
				header3: "Number",
				header4: "Position",
				header5: "Mobile",
				header6: "Status",
				col1: "id",
				col2: "user_obj.full_name",
				col3: "employee_number",
				col4: "position",
				col5: "user_obj.mobile_phone",
				col6: "user_obj.is_active"
			},
			tableData: {
				tableId: "EmployeeDatatable",
				list: new Array()
			},
		};
	},
	methods: {
		testButton() {

		},
		mountSelectedEmployeeList() {
			console.log("this.tableData", this.tableData);
			this.tableData.list = this.GET_SELECTED_EMPLOYEE_LIST;
			this.paginatedList = this.GET_SELECTED_EMPLOYEE_LIST_LENGTH;
		},
		clearData() {
			this.tableData.list = new Array()
			this.paginatedList = 0;
		}
	},
	computed: {
		...mapState(["Warehouses", "Auth", "Users"]),
		...mapGetters(["GET_EMPLOYEE_LIST", "GET_EMPLOYEE_LIST_LENGTH", "GET_SELECTED_EMPLOYEE_LIST", "GET_SELECTED_EMPLOYEE_LIST_LENGTH"]),

	},
	watch: {},
	async mounted() {

	},
	created() {
		// this.tableData.list = this.GET_SELECTED_EMPLOYEE_LIST;
		// this.paginatedList = this.GET_SELECTED_EMPLOYEE_LIST_LENGTH;
		// console.log("created this.GET_SELECTED_EMPLOYEE_LIST", this.GET_SELECTED_EMPLOYEE_LIST);
	}
};
</script>

<style lang="less" scoped>

</style>
