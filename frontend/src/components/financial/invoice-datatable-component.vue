<template>
	<div>
		<f7-datatable-component 
			:tableData="tableData" 
			:tableSettings="tableSettings" >
			
			<!-- Slot Header -->
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
import { mapGetters } from 'vuex';

//Components
import f7DataTableComponent from "@/components/layout-elements/f7-datatable-component.vue";

export default {
	name: "invoiceDatatableComponent",
	mixins: [],
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
				title: "Invoice List",
				createButton: "Create Invoice",
				header1: "Id",
				header2: "Date Created",
				header3: "Date Due",
				header4: "Discount",
				header5: "Total",
				header6: "Status",
				col1: "invoice_number",
				col2: "date_added",
				col3: "due_date",
				col4: "discount",
				col5: "total",
				col6: "is_active"
			},
			tableData: {
				tableId: "InvoiceTable",
				list: new Array()
			},
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		...mapState(["Auth", "Invoices"]),
		...mapGetters(["GET_INVOICE_LIST", "GET_INVOICE_LIST_LENGTH"])
	},
	created() {
		this.tableData.list = this.GET_INVOICE_LIST;
		this.paginatedList = this.GET_INVOICE_LIST_LENGTH;
		console.log("created this.GET_INVOICE_LIST", this.GET_INVOICE_LIST);
	},
	mounted() {}
};
</script>

<style scoped lang="less"></style>
