<template>
	<!-- Page content-->
	<f7-row class="full-width no-margin">
		<f7-block class="full-width no-margin-top">
			<!-- Shifts -->
			<f7-card v-if="Attendance.holidaysList.length === 0">
				<f7-card-content>
					<div class="error-text">
						No records to display
					</div>
					<slot name="button"></slot>
				</f7-card-content>
			</f7-card>
			<f7-card v-else class="data-table data-table-init">
				<f7-card-header>
					<!-- <f7-list>
						<f7-list-button @click="deactivate">Deactivate</f7-list-button>
						<f7-list-button @click="deleteItem">Delete</f7-list-button>
					</f7-list> -->
					<div class="data-table-links">
						<f7-list-button class="link" :popup-open="tableSettings.popupLink">New</f7-list-button>
						<a class="link" @click="deactivate">Deactivate</a>
						<a class="link" @click="deleteItem">Delete</a>
						<!-- <a class="link" @click="uncheckAllCells">Unselect All</a> -->

					</div>
				</f7-card-header>
				<f7-card-content>
					<f7-list>
						<f7-row>
							<table :id="tableData.tableId">
								<thead>
									<tr>
										<th class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox" @change="toggleAllChecks" :checked="isAllChecked"/>
												<i class="icon-checkbox"></i>
											</label>
										</th>
										<th @click="sortTable(1, tableData.tableId)" class="label-cell sortable-cell text-align-center">{{ tableSettings.col1 }}</th>
										<th @click="sortTable(2, tableData.tableId)" class="label-cell sortable-cell text-align-center">{{ tableSettings.col2 }}</th>
										<th @click="sortTable(3, tableData.tableId)" class="label-cell sortable-cell text-align-center">{{ tableSettings.col3 }}</th>
										<th @click="sortTable(4, tableData.tableId)" class="label-cell sortable-cell text-align-center">{{ tableSettings.col4 }}</th>
										<th @click="sortTable(5, tableData.tableId)" class="label-cell sortable-cell text-align-center">{{ tableSettings.col5 }}</th>
										<th class="label-cell sortable-cell text-align-center">{{ tableSettings.col5 }}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(tdata, $tdataIndex) in returnStoreModule(tableData.module).holidaysList" :key="$tdataIndex">
										<td class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox" @change="checkedItem"/>
												<i class="icon-checkbox"></i>
											</label>
										</td>
										<td class="text-align-center">{{ tdata.id }}</td>
										<td class="text-align-center">{{ tdata.name }}</td>
										<td class="text-align-center">{{ tdata.date | moment("MMMM Do") }}</td>
										<td class="text-align-center">{{ tdata.duration_days }}</td>
										<td class="text-align-center">{{ tdata.type }}</td>
										<td class="text-align-center">
											<b-tag size="is-medium" :type="`${tdata.is_open ? 'is-success' : 'is-danger'}`">{{
												tdata.is_open ? "Open" : "Closed"
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

//Mixins
import { UniversalMixins } from "../../mixins/universal-mixins";
import { DataTableMixins } from "../../mixins/components/table-mixins";
import { StoreModuleMixins } from "../../mixins/components/module-store-data-mixins";

export default {
	name: "databaseComponent",
	mixins: [
		UniversalMixins, 
		DataTableMixins, 
		StoreModuleMixins
	],
	components: {},
	props: {
		tableData: {
			type: Object,
			required: true
		},
		tableSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isAllChecked: false,
			checkedItemData: null,
			tableID: "holidayDatabaseTable"

		};
	},
	methods: {
		testButton() {
	
		},
		deleteItem(e) {
			console.log('e', e);
		},
		deactivate(e) {
			console.log('e', e);
		},
		toggleAllChecks(e) {
			console.log('e', e);
			console.log('toggleAllChecks e', e);
			if(!e.target.checked) {
				var table = document.getElementById(this.tableData.tableId);
				console.log('table', table);
				var rows = table.rows;
				console.log('rows', rows);
				for(let index = 1; index < rows.length; index++) {
					rows[index].childNodes[0].childNodes[0].childNodes[0].checked = false;
				}
				// for(let key in rows) {
				// 	rows[key].childNodes[0].childNodes[0].childNodes[0].checked = false;
				// }
			} else {
				var table = document.getElementById(this.tableData.tableId);
				console.log('table', table);
				var rows = table.rows;
				console.log('rows', rows);
				for(let index = 1; index < rows.length; index++) {
					rows[index].childNodes[0].childNodes[0].childNodes[0].checked = true;
				}
				// for(let key in rows) {
				// 	rows[key].childNodes[0].childNodes[0].childNodes[0].checked = true;
				// }
				this.isAllChecked = true;
			}
			
		},
		checkedItem(e) {
			console.log('e', e);
			//Find out if cehcked or unchecked
			if(e.target.checked) {
				var rowObj = {};
				var row = e.target.parentNode.parentNode.parentNode.children;
				// console.log('row', row);
				var rowHeader = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.childNodes[0].cells;
				// console.log('rowHeader', rowHeader);
				for(let key in row) {
					var objKey = rowHeader[key].innerText;
					var objValue = row[key].innerText;
					if(objKey != null) {
						rowObj[objKey] = objValue;
						// console.log('objKey', objKey);
						// console.log('objValue', objValue);
					}
				}
				// console.log('rowObj', rowObj);
				delete rowObj[""];
				// console.log('rowObj', rowObj);
				this.checkedItemData = rowObj;
			} else {
				// remove the Object from store
				this.checkedItemData = null;
			}
			this.uncheckAllOthers(e);
		},
		uncheckAllOthers(e) {
			console.log('uncheckAllOthers e', e);
			var tableBody = e.target.parentNode.parentNode.parentNode.parentNode.childNodes;
			console.log('tableBody array', tableBody);
			for(let index = 0; index < tableBody.length; index++) {
				console.log('tableBody', tableBody[index]);
				tableBody[index].childNodes[0].childNodes[0].childNodes[0].checked = false;

			}
		},
		//Not Used
		uncheckAllCells(e) {
			console.log('uncheckAllCells e', e);
			var table = document.getElementById(this.tableData.tableId);
			console.log('table', table);
			var rows = table.rows;
			console.log('rows', rows);
			for(let index = 1; index < rows.length; index++) {
				console.log('rows[index]', rows[index]);
				// rows[index].childNodes[0].childNodes[0].childNodes[0].checked = false;
			}
			// for(let key in rows) {
			// 	rows[key].childNodes[0].childNodes[0].childNodes[0].checked = false;
			// }
		},
	},
	computed: {
		...mapState(["Auth", "Users", "Attendance"])
	},
	watch: {},
	async mounted() {

	},
	created() {}
};
</script>

<style lang="less" scoped></style>
