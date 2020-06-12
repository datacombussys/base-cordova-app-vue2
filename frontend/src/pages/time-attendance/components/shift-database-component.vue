<template>
	<div>
		<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Shift Database</f7-block-title> 
			<f7-card class="data-table data-table-init">
				<f7-card-header class="data-table-header">
					<f7-col width="30" class="margin-right">
					</f7-col>
					
					<!-- Table links/actions -->
					<f7-col width="25" class="data-table-links">
						<a class="link">Add</a>
						<a class="link">Edit</a>
						<a class="link">Remove</a>
					</f7-col>
					<!-- Table actions -->
					<f7-col width="25" class="data-table-actions">
						<a class="link icon-only">
							<i class="icon f7-icons if-not-md">more_vertical_round</i>
							<i class="icon material-icons md-only">more_vert</i>
						</a>
					</f7-col>
					
				</f7-card-header>
				<f7-card-content>
					<f7-list>
						<f7-row>
							<table id="EmployeeShiftTable">
								<thead>
									<tr>
										<th class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox">
												<i class="icon-checkbox"></i>
											</label>
										</th>
										<th @click="sortTable(1)" class="label-cell sortable-cell margin-left padding-left">Name</th>
										<th @click="sortTable(2)" class="sortable-cell text-align-center">Type</th>
										<th @click="sortTable(3)" class="numeric-cell sortable-cell text-align-center">Employees</th>
										<th @click="sortTable(4)" class="numeric-cell sortable-cell text-align-center">Start Time</th>
										<th @click="sortTable(5)" class="numeric-cell sortable-cell text-align-center">End Time</th>
										<th class="text-align-center">Status</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(shift, $shiftIndex) in Attendance.shiftList" :key="$shiftIndex">
										<td class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox">
												<i class="icon-checkbox"></i>
											</label>
										</td>
										<td class="label-cell margin-left padding-left">{{ shift.name }}</td>
										<td class="text-align-center">{{ shift.attendance_type }}</td>
										<td class="label-cell text-align-center">{{ shift.employees.length }}</td>
										<td class="numeric-cell text-align-center">{{ shift.start_time }}</td>
										<td class="numeric-cell text-align-center">{{ shift.end_time }}</td>
										<td class="numeric-cell text-align-center">
											<b-tag size="is-medium" :type="`${shift.is_active ? 'is-success' : 'is-danger'}`">{{ shift.is_active ? "Active" : "Inactive" }}</b-tag>
										</td>
									</tr>
								</tbody>
							</table>
						</f7-row>
					</f7-list>
				</f7-card-content>
			</f7-card>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "shiftDatabaseComponent",
	components: {},
	mixins: [],
	props: {

	},
	data() {
		return {
			//Main Settings
		
	
		};
	},
	methods: {
		async testingMethod(e) {
	
		},

	
	},
	computed: {
		...mapState(["Users", "Attendance"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped style="less">

</style>
