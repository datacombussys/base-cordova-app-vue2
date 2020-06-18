<template>
	<!-- Page content-->
	<f7-row class="full-width no-margin">
		<f7-block class="full-width no-margin-top">
			<!-- Shifts -->
			<f7-card class="data-table data-table-init">
				<f7-card-content v-if="Users.employeeList.length === 0 || Auth.platformInfo.domain != moduleInfo.name">
					<div class="error-text">
						None to display
					</div>
					<f7-row class="display-flex justify-content-center">
						<f7-col width="50">
							<f7-button href="/userprofile/" fill>Create Employee</f7-button>
						</f7-col>
					</f7-row>
				</f7-card-content>
				<f7-card-content v-if="Auth.platformInfo.domain === moduleInfo.name">
					<f7-list>
						<f7-row>
							<table :id="tableID">
								<thead>
									<tr>
										<th @click="sortTable(1, tableID)" class="label-cell sortable-cell margin-left padding-left">ID</th>
										<th @click="sortTable(2, tableID)" class="label-cell sortable-cell text-align-center">Name</th>
										<th @click="sortTable(3, tableID)" class="label-cell sortable-cell text-align-center">
											Date Added
										</th>
										<th @click="sortTable(4, tableID)" class="label-cell sortable-cell text-align-center">
											Department
										</th>
										<th @click="sortTable(5, tableID)" class="medium-only sortable-cell text-align-center">Position</th>
										<th class="text-align-center">Status</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(employee, $employeeIndex) in Users.employeeList" :key="$employeeIndex">
										<td class="text-align-center">{{ employee.employee_number }}</td>
										<td class="margin-left padding-left">{{ employee.user.full_name }}</td>
										<td class="text-align-center">{{ employee.user.date_added | moment("M/D/Y") }}</td>
										<td class="text-align-center">{{ employee.department }}</td>
										<td class="text-align-center">{{ employee.position }}</td>
										<td class="text-align-center">
											<b-tag size="is-medium" :type="`${employee.user.is_active ? 'is-success' : 'is-danger'}`">{{
												employee.user.is_active ? "Active" : "Inactive"
											}}</b-tag>
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
import { mapState } from "vuex";
import { UniversalMixins } from "../../mixins/universal-mixins";
import { DataTableMixins } from "../../mixins/components/table-mixins";

export default {
	name: "EmployeesDatabase",
	mixins: [
		UniversalMixins, 
		DataTableMixins, 
	],
	components: {},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Mixin Variables
			tableID: "EmployeeDatabaseTable"
		};
	},
	methods: {
		testButton() {

		}
	},
	computed: {
		...mapState(["Warehouses", "Auth", "Users"])
	},
	watch: {},
	async mounted() {
		//get User Platform
		let response = await this.setUserPlatformGET(this.moduleInfo);
		console.log("Mounted response", response);
		response.then;

		this.$store.dispatch("getEmployeeList", response);
	},
	created() {}
};
</script>

<style lang="less" scoped></style>
