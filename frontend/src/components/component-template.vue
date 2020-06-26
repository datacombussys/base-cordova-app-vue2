<template>
	<!-- Page content-->
	<f7-row class="full-width no-margin">
		<f7-block class="full-width no-margin-top">
			<!-- Shifts -->
			<f7-card class="data-table data-table-init">
				<f7-card-content>
					<!-- <f7-card-content
					v-if="SalesOffices.salesOfficeList.length === 0 || Auth.platformInfo.domain != moduleInfo.name"
				> -->
					<div class="error-text">
						No Invoices / Receipts to display
					</div>
				</f7-card-content>
				<f7-card-content v-if="Auth.platformInfo.domain === moduleInfo.name">
					<f7-list v-if="Invoices.invoiceList.length != 0">
						<f7-row>
							<table :id="tableID">
								<thead>
									<tr>
										<th @click="sortTable(1, tableID)" class="label-cell sortable-cell text-align-center">ID</th>
										<th @click="sortTable(2, tableID)" class="label-cell sortable-cell text-align-center">Date</th>
										<th @click="sortTable(3, tableID)" class="label-cell sortable-cell text-align-center">Amount</th>
										<th @click="sortTable(4, tableID)" class="label-cell sortable-cell text-align-center">Status</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(invoice, $invoiceIndex) in Invoices.invoiceList" :key="$invoiceIndex">
										<td class="text-align-center">{{ invoice.salesinvoice_number }}</td>
										<td class="text-align-center">{{ invoice.salesinvoice_name }}</td>
										<td class="text-align-center">{{ invoice.date_added | moment("M/D/Y") }}</td>
										<td class="text-align-center">{{ invoice.main_phone }}</td>
										<td class="text-align-center">
											<b-tag size="is-medium" :type="`${invoice.is_active ? 'is-success' : 'is-danger'}`">{{
												invoice.is_active ? "Active" : "Inactive"
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

export default {
	name: "Template",
	mixins: [],
	components: {},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		...mapState(["Invoices"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less"></style>
