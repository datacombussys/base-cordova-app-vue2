<template>
	<div>
		<f7-block>
			<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Shift Database</f7-block-title> 
			<f7-card>
				<f7-card-content>
					<f7-row class="display-flex justify-content-center" v-if="Auth.isAuthenticated">
						<f7-col width="50">
							<f7-button fill popup-open=".new-holiday">Add New Holiday</f7-button>
						</f7-col>
					</f7-row>
					<f7-row class="display-flex justify-content-center" v-else>
						<f7-col width="50">
							<p class="text-align-center">Please Log in to create your holidays</p>
						</f7-col>
					</f7-row>
				</f7-card-content>
			</f7-card>

			<f7-card class="data-table data-table-init">
				<f7-card-header class="data-table-header">
					<div class="data-table-links">
						<f7-list-button class="link" popup-open=".trans-popup">New</f7-list-button>
						<a class="link">Deactivate</a>
						<a class="link">Delete</a>
						<!-- <a class="link" @click="uncheckAllCells">Unselect All</a> -->
					</div>
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
										<th class="label-cell sortable-cell margin-left padding-left">Name</th>
										<th class="sortable-cell text-align-center">Type</th>
										<th class="numeric-cell sortable-cell text-align-center">Employees</th>
										<th class="numeric-cell sortable-cell text-align-center">Start Time</th>
										<th class="numeric-cell sortable-cell text-align-center">End Time</th>
										<th class="text-align-center">Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox">
												<i class="icon-checkbox"></i>
											</label>
										</td>
										<td class="label-cell margin-left padding-left">shift.name</td>
										<td class="text-align-center">shift.attendance_type</td>
										<td class="label-cell text-align-center">shift.employees.length</td>
										<td class="numeric-cell text-align-center">shift.start_time</td>
										<td class="numeric-cell text-align-center">shift.end_time</td>
										<td class="numeric-cell text-align-center">
											<b-tag size="is-medium">shift.is_active ? "Active" : "Inactive"</b-tag>
										</td>
									</tr>
								</tbody>
							</table>
						</f7-row>
					</f7-list>
				</f7-card-content>
			</f7-card>
		</f7-block>

		<shift-popup-component :popupSettings="popupSettings"></shift-popup-component>

	</div>
</template>

<script>
import { mapState } from "vuex";

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";

//Components
import shiftPopupComponent from '@/pages/time-attendance/components/shift-popup-component.vue'

export default {
	name: "shiftComponent",
	components: {
		"shift-popup-component": shiftPopupComponent
	},
	mixins: [UniversalMixins],
	props: {

	},
	data() {
		return {
			//Component Settings
			popupSettings: {
				link: ".shift-popup",
				name: "Shift",
				type: "content"
			},

			//Main Settings
			
	
		};
	},
	methods: {


	},
	computed: {
		...mapState(["Auth"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped style="less">

</style>
