<template>
	<div>
		<f7-datatable-component 
			:tableData="tableData" 
			:tableSettings="tableSettings" 
			:editItem="editItem">
			<!-- Slot Header -->
			<template v-slot:headerLinks>
				<div class="data-table-links" :v-if="tableSettings.showEditLinks">
					<f7-list-button class="link" :popup-open="tableSettings.popupLink">New</f7-list-button>
					<f7-list-button id="edit-popup" class="link" @click="editItem">Edit</f7-list-button>
					<f7-list-button class="link confirm-deactivate">Deactivate</f7-list-button>
					<f7-list-button class="link confirm-delete">Delete</f7-list-button>
				</div>
			</template>
			<!--END Slot Header -->

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
						<td class="label-cell text-align-center">{{ item.name  }}</td>
						<td class="label-cell text-align-center">{{item.date }}</td>
						<td class="numeric-cell text-align-center">{{ item.duration_days }}</td>
						<td class="numeric-cell text-align-center">{{ item.type }}</td>
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
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";
import { DataTableMixins } from "@/mixins/components/table-mixins";

//Components
import f7DataTableComponent from "@/components/layout-elements/datatables/f7-datatable-component.vue";

export default {
	name: "tillCountDatabaseComponent",
	components: {
		"f7-datatable-component": f7DataTableComponent
	},
	mixins: [
		UniversalMixins,
		DataTableMixins

		],
	props: {

	},
	data() {
		return {
			//Component Data
			tableSettings: {
				popupLink: '',
				showCreateButton: false,
				title: "Till Counts",
				createButton: "",
				header1: "Id",
				header2: "Name",
				header3: "Date",
				header4: "Duration",
				header5: "Type",
				header6: "Status",
				col1: "id",
				col2: "name",
				col3: "date",
				col4: "duration_days",
				col5: "type",
				col6: "is_active"
			},
			tableData: {
				tableId: "tillCountTable",
				list: new Array()
			},
			//Main Settings




		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		resetForm() {
			for (let key in this.holidayForm) {
				console.log("value", this.holidayForm[key]);
				if (this.holidayForm[key] === true || this.holidayForm[key] === false) {
					this.holidayForm[key] = false;
				} else {
					this.holidayForm[key] = null;
				}
			}
			//Reset Variables
			this.holidayForm.employees = [];
			this.holidayForm.is_active = true;
		},
		editItem() {
			console.log("EditItem");
			console.log("this.selectedList", this.selectedList);
			var list2 = this.GET_TILL_HISTORY_LIST[2];
			var newList = this.selectedList[0];

			for(let key in this.holidayForm) {
				// this.holidayForm[key] = list2[key];
				Object.defineProperty(this.holidayForm, key, {
					value: list2[key],
					writable: true
				});
			}

			// this.$f7.popup.open(".shift-popup-component");
			this.ShiftPopupOpened = true;
			console.log("this.holidayForm", this.holidayForm);
		},
		deleteItem() {
      //Grab item from this.selectedList and delete it from Django
			try {
				// this.$store.dispatch('deleteShift', this.selectedList);
				this.$f7.dialog.alert('Successfully Deleted!');

			} catch {
				this.$f7.dialog.alert('There was an error deleting the record(s)');
			}
		},
		deactivate() {

		},

	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters(["GET_TILL_HISTORY_LIST", "GET_TILL_HISTORY_LIST_LENGTH", "GET_OPEN_TILL_OBJECT"])

	},
	created() {
		this.tableData.list = this.GET_TILL_HISTORY_LIST;
		this.paginatedList = this.GET_TILL_HISTORY_LIST_LENGTH;
		console.log("created this.GET_TILL_HISTORY_LIST_LENGTH", this.GET_TILL_HISTORY_LIST_LENGTH);
	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="scss">

</style>
