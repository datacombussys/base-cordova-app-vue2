<template>
	<div>
		<v-bottom-sheet class="top-sheet" v-model="contractsPopup">
      <v-sheet height="100vh">
				<nav class="close-sheet-button">
					<div class="header">
						Contracts
					</div>
					<div class="close-button">
						<a href="#" @click="closePopup">
							<fa-layer class="mdi-35">
								<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
								<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
							</fa-layer>
						</a>
					</div>
				</nav>
				<div class="frame-container-sheet">

					<DxScrollView
						id="contractsScroll"
						ref="contractsScrollWidget"
						height="100%"
						width="100%"
						:scroll-by-content="false"
						:scroll-by-thumb="true"
						show-scrollbar="always"
						:bounce-enabled="true">
						<div class="content-block">
						
							<v-data-table
								:headers="headers"
								:items="contracts"
								sort-by="calories"
								class="elevation-1"
							>
								<template v-slot:top>
									<v-toolbar flat color="white">
										<v-toolbar-title>Contracts</v-toolbar-title>
										<v-divider
											class="mx-4"
											inset
											vertical
										></v-divider>
										<v-spacer></v-spacer>
										<v-dialog v-model="dialog" max-width="600px">
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													color="primary"
													dark
													class="mb-2"
													v-bind="attrs"
													v-on="on"
												>New Item</v-btn>
											</template>
											<v-card>
												<v-card-title>
													<span class="headline">{{ formTitle }}</span>
												</v-card-title>

												<v-card-text>
													<v-container>
														<v-row>
															<v-col sm="12">
																<v-text-field v-model="editedItem.name" label="Name"></v-text-field>
															</v-col>
															<v-col sm="6">
																<DxDateBox
																	type="date"
																	placeholder="Start Date"
																	:min="new Date()"
																	@value-changed="startDateChanged"
																/>
															</v-col>
															<v-col sm="6">
																<DxDateBox
																	type="date"
																	placeholder="End Date"
																	:min="new Date()"
																	@value-changed="endDateChanged"
																/>
															</v-col>
															<v-col sm="6">
																<DxButton
																:width="150"
																text="Recurrence"
																type="default"
																styling-mode="outlined"
																@click="recurringPopup = true"
															/>
															<recurringComponent :recurringPopup="recurringPopup" @closePopup="closeRecurringPopup" />
															</v-col>
															<v-col sm="6">
																Recurrence Rules: 
																<p>{{ recurrenceRulesSelected }}</p>
															</v-col>
															<v-col sm="6" v-if="showManualTaxField">
																<v-text-field v-model="editedItem.tax" 
																	type="number" 
																	placeholder="eg 8.95" 
																	label="Tax Amount"
																	step="0.01">
																</v-text-field>
															</v-col>
															<v-col sm="6" v-if="!showManualTaxField">
																<v-select
																	:items="Financial.salesTaxList"
																	label="Select Tax"
																	item-text="name"
          												item-value="name"
																></v-select>
															</v-col>
															<v-col sm="6" class="flex items-center">
																<a href="#" @click="showManualTaxField = !showManualTaxField" class="pt-4">
																<span class="mdi mdi-swap-vertical-bold mdi-rotate-90 mdi-30"></span>
															</a>
															</v-col>
														</v-row>
													</v-container>
												</v-card-text>

												<v-card-actions>
													<v-spacer></v-spacer>
													<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
													<v-btn color="blue darken-1" text @click="save">Save</v-btn>
												</v-card-actions>
											</v-card>
										</v-dialog>
									</v-toolbar>
								</template>
								<template v-slot:item.actions="{ item }">
									<v-icon
										small
										class="mr-2"
										@click="editItem(item)"
									>
										mdi-pencil
									</v-icon>
									<v-icon
										small
										@click="deleteItem(item)"
									>
										mdi-delete
									</v-icon>
								</template>
								<template v-slot:no-data>
									<v-btn color="primary" @click="initialize">Reset</v-btn>
								</template>
							</v-data-table>
						
						</div>
						<div class="content-block">
							<p>Name</p>
							<p>Recurring Options</p>
							<p>Start Date / End Date</p>
							<p>Tax Amount</p>
							<p>Save Button</p>

						</div>
					</DxScrollView>
					<v-divider></v-divider>
						<v-divider></v-divider>
						<v-divider></v-divider>
					<div class="row justify-end">
						
						<div class="col-2 mr-3 text-right">
							<v-btn>
								Close
							</v-btn>
						</div>
					</div>
				</div>
      </v-sheet>
    </v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";

import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxDateBox from 'devextreme-vue/date-box';
import DxButton from 'devextreme-vue/button';
import DxNumberBox from 'devextreme-vue/number-box';
import DxTextBox from 'devextreme-vue/text-box';
import { DxSwitch } from 'devextreme-vue/switch';

//components
import recurringComponent from "@/components/universal/new/recurring-component"

export default {
	name: "contractsComponent",
	mixins: [],
	components: {
		DxNumberBox,
		DxTextBox,
		DxSwitch,
		DxScrollView,
		DxDateBox,
		DxButton,
		recurringComponent
	},
	props: {
		contractsPopup: {
			type: Boolean
		}
	},
	data() {
		return {
			//Recurring Payment Popup
			recurringPopup: false,
			showManualTaxField: false,
			//Datatable Data
			minDate: new Date(),
			startDate: null,
			endDate: null,
			dialog: false,
			headers: [
        {
          text: 'Name',
          align: 'center',
          sortable: true,
          value: 'name',
        },
				{ text: 'Start', 
					align: 'center',
					sortable: true, 
					value: 'start' 
					},
				{ text: 'End', 
					align: 'center',
					sortable: true,
					value: 'end'
					},
				{ text: 'Recurring',
					align: 'center',
					sortable: true,
					value: 'recurring'
					},
				{ text: 'Tax Amount', 
					align: 'center',
					sortable: true,
					value: 'tax' 
					},
				{ text: 'Actions', 
					value: 'actions', 
					align: 'center',
					sortable: false 
					},
      ],
      contracts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		closePopup(e) {
			this.$emit('closePopup', false)
		},
		//Datatable Methods
		initialize () {
			this.contracts = [
				{
        name: 'Monthly',
        start: "1/25/20",
        end: "1/25/22",
        recurring: "Monthly",
        tax: 2.35 + " %",
			},
			{
        name: 'Weekly',
        start: "1/25/20",
        end: "1/25/22",
        recurring: "Weekly",
        tax: 0+ " %",
      },
			
			]
		},

		editItem (item) {
			this.editedIndex = this.contracts.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			const index = this.contracts.indexOf(item)
			confirm('Are you sure you want to delete this item?') && this.contracts.splice(index, 1)
		},

		close () {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save () {
			if (this.editedIndex > -1) {
				Object.assign(this.contracts[this.editedIndex], this.editedItem)
			} else {
				this.contracts.push(this.editedItem)
			}
			this.close()
		},
		startDateChanged(e) {
			console.log("startDateChanged e", e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.editedItem.start = djangoTime
		},
		endDateChanged(e) {
			console.log("endDateChanged e", e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.editedItem.end = djangoTime
		},
		closeRecurringPopup(e) {
			console.log('closeRecurringPopup e', e)
			this.recurringPopup = e
		},
    

	},
	computed: {
		...mapState(["Financial"]),
		formTitle () {
			return this.editedIndex === -1 ? 'New Contract' : 'Edit Contract'
		},
		recurrenceRulesSelected() {
			return "Each Month on the 15th"
		}
	},
	watch: {
		dialog (val) {
			val || this.close()
		},
	},
	created() {
		this.initialize()
	},
	mounted() {}
};
</script>

<style scoped lang="scss">
.top-sheet {
	z-index: 1000;
}
.close-sheet-button {
	text-align: right;
	position: relative;
	right: -1px;
	top: -18px;
}

.frame-container-sheet {
	height: calc(90vh - 150px);
}
</style>
