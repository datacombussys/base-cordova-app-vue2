<template>
	<!-- Page content-->
	<f7-row class="full-width no-margin">
		<f7-block class="full-width no-margin-top">
			<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">{{ tableSettings.title }}</f7-block-title> 
			<f7-card v-if="Auth.isAuthenticated" class="data-table data-table-init">
				<f7-card-header class="data-table-header display-flex justify-content-space-between">
					<f7-row class="full-width">
						<f7-col width="25">
							<slot class="level-left" name="headerLinks"/>
						</f7-col>
						<f7-col width="25">
							<div class="data-table-links">
								<f7-list-button v-if="showActive === 1" class="link" @click="tableFilter({value: 'Inactive'}, tableData.tableId)">Show Inactive</f7-list-button>
								<f7-list-button v-if="showActive === 2" class="link" @click="tableFilter({value: 'Active'}, tableData.tableId)">Show Active</f7-list-button> 
								<f7-list-button v-if="showActive === 3" class="link" @click="showAllRows(tableData.tableId)">Show All</f7-list-button> 
							</div>
						</f7-col>
					</f7-row>
				</f7-card-header>
				<f7-card-content>
					<f7-list>
						<f7-row>
							<table :id="tableData.tableId">
								<thead>
									<tr>
										<th class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox" @change="toggleAllChecks($event, tableData.tableId, tableData.list)" :checked="isAllChecked">
												<i class="icon-checkbox"></i>
											</label>
										</th>
										<th @click="sortTable(1, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header1 }}</span>
										</th>
										<th @click="sortTable(2, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header2 }}</span>
										</th>
										<th @click="sortTable(3, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header3 }}</span>
										</th>
										<th @click="sortTable(4, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header4 }}</span>
										</th>
										<th @click="sortTable(5, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header5 }}</span>
										</th>
										<th @click="sortTable(6, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">{{ tableSettings.header6 }}</span>
										</th>
									</tr>

									<tr>
										<th></th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell padding-left-half padding-right-half">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half inactive-item" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
									</tr>
								</thead>

								<tbody v-if="tableData.list.length === 0">
									<tr>
										<td colspan="8">
											<!-- Authenticated AND no Records -->
											<f7-row class="display-flex justify-content-center full-width" v-if="Auth.isAuthenticated">
												<slot name="button"/>
											</f7-row>
											<!-- END Authenticated AND no Records -->
										</td>
									</tr>
								</tbody>

								<slot name="tbody" v-else></slot>

							</table>
							<!-- Footer and Pagination -->
							<f7-row class="full-width display-flex justify-content-end">
								<div class="data-table-footer full-width padding-half">
									<div class="data-table-rows-select">
										Per page:
										<f7-input type="select" 
											:value="pagination.pageSize" 
											@change="pagination.pageSize = $event.target.value">
											<option value="5">5</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
										</f7-input>
									</div>
									<div class="data-table-pagination">
										<span class="data-table-pagination-label">
											{{ beginningPageRecord }}-{{ endingPageRecord }} of {{ tableData.list.length }}</span>
										<f7-link icon-only @click="firstPage" :class="{ disabled: disabledPrevButton }">
											<f7-icon size="20" color="datacom"  icon="mdi mdi-skip-previous">
											</f7-icon>
										</f7-link>
										<f7-link icon-only @click="prevPage" :class="{ disabled: disabledPrevButton }">
											<f7-icon size="20" color="datacom" icon="mdi mdi-chevron-left">
											</f7-icon>
										</f7-link>
										<f7-link v-for="page in renderPageButtons" :key="page.id" @click="changePages($event.target.innerText)" >
											<span class="pageIndicator">
												{{ page }}
											</span>
										</f7-link>
										
										<f7-link icon-only @click="nextPage" :class="{ disabled: disabledNextButton }">
											<f7-icon size="20" color="datacom" icon="mdi mdi-chevron-right">
											</f7-icon>
										</f7-link>
										<f7-link icon-only @click="lastPage" :class="{ disabled: disabledNextButton }">
											<f7-icon size="20" color="datacom" icon="mdi mdi-skip-next">
											</f7-icon>
										</f7-link>
									</div>
								</div>
							</f7-row>
							<!-- END Footer and Pagination -->

						</f7-row>
					</f7-list>
				</f7-card-content>
			</f7-card>

			<!-- NOT Authenticated -->
			<f7-card v-if="!Auth.isAuthenticated">
				<f7-card-content>
					<f7-row class="display-flex justify-content-center">
						<f7-col width="100">
							<div class="text-align-center error-text margin">No records to display</div>
							<p class="text-align-center">(Please log in)</p>
						</f7-col>
					</f7-row>
				</f7-card-content>
			</f7-card>

		</f7-block>
	</f7-row>
	<!-- END Page content-->
</template>

<script>
import { mapState } from "vuex";

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";
import { DataTableMixins } from "@/mixins/components/table-mixins";
import { StoreModuleMixins } from "@/mixins/components/module-store-data-mixins";

export default {
	name: "f7DatatableComponent",
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
		},
		editItem: {
			type: Function,
			required: false
		}
	},
	data() {
		return {
			isAllChecked: false,

		}
	},
	methods: {
		testButton() {
			console.log("this.pagination.currentPage", this.pagination.currentPage);
		},

	
	},
	computed: {
		...mapState(["Auth"])
	},
	watch: {},
	async mounted() {

	},
	created() {}
};
</script>

<style lang="less" scoped></style>
