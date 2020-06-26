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
						<td class="label-cell text-align-center">{{ item.user.full_name  }}</td>
						<td class="label-cell text-align-center">{{item.employee_number }}</td>
						<td class="numeric-cell text-align-center">{{ item.position }}</td>
						<td class="numeric-cell text-align-center">{{ item.user.mobile_phone }}</td>
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
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';
import { UniversalMixins } from "../../mixins/universal-mixins";
import { DataTableMixins } from "../../mixins/components/table-mixins";

//Components
import f7DataTableComponent from "@/components/layout-elements/f7-datatable-component.vue";

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
				col2: "user.full_name",
				col3: "employee_number",
				col4: "position",
				col5: "user.mobile_phone",
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

		}
	},
	computed: {
		...mapState(["Warehouses", "Auth", "Users"]),
		...mapGetters(["GET_EMPLOYEE_LIST", "GET_EMPLOYEE_LIST_LENGTH"])
	},
	watch: {},
	async mounted() {

	},
	created() {
		this.tableData.list = this.GET_EMPLOYEE_LIST;
		this.paginatedList = this.GET_EMPLOYEE_LIST_LENGTH;
		console.log("created this.GET_EMPLOYEE_LIST", this.GET_EMPLOYEE_LIST);
	}
};
</script>

<style lang="less" scoped>

</style>
