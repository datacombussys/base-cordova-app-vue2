<template>

		<v-stepper v-model="step" light>
			<v-stepper-header>
				<v-stepper-step :complete="step > 1" step="1">Transaction Details</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="step > 2" step="2">Customer</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="step > 3" step="3">Billing Info</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="step > 4" step="4">Payment Details</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<!-- Step 1 Transaction Details -->
				<v-stepper-content step="1">
					<v-card
						class="mb-4 my-card"
						color="grey lighten-1"
					>
					<DxScrollView
						id="customerScroll"
						ref="customerScrollWidget"
						height="100%"
						width="100%"
						:scroll-by-content="false"
						:scroll-by-thumb="true"
						show-scrollbar="always"
						:bounce-enabled="true">
						<div class="container">
							<div class="row justify-center">
								<div class="col-9">
									<v-card
										outlined
										class="mx-auto p-6"
										width="100%">
											<div class="headline w-full">
												Transaction Type
												<v-divider></v-divider>
											</div>
											<div class="row justify-center mt-2">
												<DxButtonGroup
													class="payment-type-buttons"
													:activeStateEnabled="false"
													:focusStateEnabled="false"
													:items="transctionType"
													key-expr="text"
													selection-mode="single"
													:selected-item-keys.sync="selectedTransType"
													@selection-changed="logSelectionChanged"
												/>
											</div>
											<div class="headline w-full mt-8">
												Transaction Amount
												<v-divider></v-divider>
											</div>
											<div class="row justify-center mt-2">
												<DxButtonGroup
													class="payment-type-buttons"
													:activeStateEnabled="false"
													:focusStateEnabled="false"
													:items="transctionMethod"
													key-expr="text"
													selection-mode="single"
													:selected-item-keys.sync="selectedTransMethod"
													@selection-changed="logSelectionChanged"
												/>
											</div>
											<div class="row">
												<div class="headline w-full mt-8">
													Transaction Amount
													<v-divider></v-divider>
												</div>
											</div>
											<div class="row justify-center">
												<v-col cols="8">
													<div class="row">
														<div class="col-90p">
															<v-text-field
															label="Sale Amount ($)"
															outlined
														></v-text-field>
														</div>
													</div>
													<div class="row">
														<v-text-field
															v-if="showManualTaxField"
															label="Tax Amount (%)"
															outlined
														></v-text-field>
														<DxDropDownBox
															v-if="!showManualTaxField"
															width="90%"
															:data-source="Financial.salesTaxList"
															:value.sync="selectedTaxList"
															placeholder="Select a value..."
															@value-changed="taxRateDropdownChange($event)"
															display-expr="name"
														>
															<DxList
																:data-source="Financial.salesTaxList"
																:height="400"
																:selected-items.sync="selectedTaxList"
																selection-mode="single"
																display-expr="name"
															/>
														</DxDropDownBox>
														<a href="#" @click="showManualTaxField = !showManualTaxField" class="pt-4">
															<span class="mdi mdi-swap-vertical-bold mdi-rotate-90 mdi-30"></span>
														</a>
													</div>
													<div class="row justify-between mt-2">
														<div class="col-50p">
															<div class="headline">
																<div>Discounts</div>
															</div>
														</div>
														<div class="col-50p">
															<div class="headline text-right">
																<div>$(20.00)</div>
															</div>
														</div>
													</div>
													<div class="row justify-between">
														<div class="col-50p">
															<div class="headline">
																<div>Processing Fee</div>
															</div>
														</div>
														<div class="col-50p">
															<div class="headline text-right">
																<div>$14.00</div>
															</div>
														</div>
													</div>
													<div class="row justify-between">
														<div class="col-50p">
															<div class="headline">
																<div>Sales Tax</div>
															</div>
														</div>
														<div class="col-50p">
															<div class="headline text-right">
																<div>$0.25</div>
															</div>
														</div>
													</div>
													<div class="row mt-4 justify-between">
														<div class="col-50p">
															<div class="headline-1">
																<div>Grand Total</div>
															</div>
														</div>
														<div class="col-50p">
															<div class="headline-1 text-right">
																<div>$140.25</div>
															</div>
														</div>
													</div>
													
												</v-col>
											</div>
										
									</v-card>
								</div>
							</div>
						</div>
						</DxScrollView>
					</v-card>
					<div class="row justify-end">
						<div class="col-4 text-center">
							<v-btn text>Cancel</v-btn>
							<v-btn
								color="primary"
								@click="step = 2">
								Continue
							</v-btn>
						</div>
					</div>

				</v-stepper-content>
				<!-- END Step 1 Transaction Details -->
				<!-- Step 2 Customer Details -->
				<v-stepper-content step="2">
					<v-card
						class="mb-4 my-card"
						color="grey lighten-1">
						<div class="row justify-center">
							<div class="col-9">
								<v-card
									class="mx-auto p-8"
									max-width="800"
									outlined>
									<div class="headline w-full">
										Select Customer
										<v-divider></v-divider>
									</div>
									<div class="row justify-center">
										<div class="col-8">
											<v-card
												class="mx-auto"
												max-width="600"
												outlined
											>
												<v-container fluid>
													<v-data-iterator
														:items="items"
														:search="search"
														:sort-desc="sortDesc"
														hide-default-footer
													>
														<template v-slot:header>
															<v-toolbar
																dark
																color="blue darken-3"
																class="mb-1">
																<v-text-field
																	v-model="search"
																	clearable
																	flat
																	solo-inverted
																	hide-details
																	prepend-inner-icon="search"
																	label="Search"
																></v-text-field>
																<template v-if="$vuetify.breakpoint.mdAndUp">
																	<v-spacer></v-spacer>
																	<v-btn-toggle
																		v-model="sortDesc"
																		mandatory
																	>
																		<v-btn
																			large
																			depressed
																			color="blue"
																			:value="false"
																		>
																			<v-icon>mdi-arrow-up</v-icon>
																		</v-btn>
																		<v-btn
																			large
																			depressed
																			color="blue"
																			:value="true"
																		>
																			<v-icon>mdi-arrow-down</v-icon>
																		</v-btn>
																	</v-btn-toggle>
																</template>
															</v-toolbar>
														</template>

														<template v-slot:default="props">
															<v-row>
																<v-list class="w-full" dense>
																	<DxScrollView
																		id="customerScroll"
																		ref="customerScrollWidget"
																		:height="200"
																		width="100%"
																		:scroll-by-content="false"
																		:scroll-by-thumb="true"
																		show-scrollbar="always"
																		:bounce-enabled="true">
																		<v-list-item
																			v-for="(key, index) in filteredKeys"
																			:key="index"
																			@click="selectCustomer(key)">
																			<v-list-item-content>{{ key.name }}</v-list-item-content>
																		</v-list-item>
																	</DxScrollView>

																	
																</v-list>
															</v-row>
														</template>

													</v-data-iterator>
												</v-container>
											</v-card>
										</div>
									</div>
									<div class="row justify-center">
										<div class="col-8 px-2 bg-gray-400">
											<p>Customer Selected</p>
											<p class="title">Name: {{customerSelected.name}}</p>
										</div>
									</div>

								</v-card>
							</div>
						</div>
						
					</v-card>

					<div class="row justify-end">
						<div class="col-6 text-right">
							<v-btn 
								@click="step = 1"
								text>
								Previous
							</v-btn>
							<v-btn
							class="mr-6"
								color="primary"
								@click="step = 3">
								Continue
							</v-btn>
							<v-btn
								outlined
								color="primary"
								@click="skipCustomer">
								Skip
							</v-btn>
						</div>
					</div>
				</v-stepper-content>
				<!-- END Step 2 Customer Details -->
				<!-- Step 3 Billing Details -->
				<v-stepper-content step="3">
					<v-card
						class="mb-4 my-card"
						color="grey lighten-1"
					>
					<DxScrollView
						id="customerScroll"
						ref="customerScrollWidget"
						height="100%"
						width="100%"
						:scroll-by-content="false"
						:scroll-by-thumb="true"
						show-scrollbar="always"
						:bounce-enabled="true">
							<div class="row justify-center">
								<div class="col-9">
									<v-card
										class="mx-auto p-8"
										max-width="800"
										outlined
									>
										<div class="headline w-full">
											Cardholder Information
											<v-divider></v-divider>
										</div>
										<div class="row mt-2">
											<div class="col-50p px-1">
												<v-text-field
													label="First Name"
													outlined
												></v-text-field>
											</div>
											<div class="col-50p px-1">
												<v-text-field
													label="Last Name"
													outlined
												></v-text-field>
											</div>
										</div>
										<div class="row">
											<div class="col-100p px-1">
												<v-text-field
													label="Address"
													outlined
												></v-text-field>
											</div>
										</div>
										<div class="row">
											<div class="col-30p px-1">
												<v-text-field
													label="City"
													outlined
												></v-text-field>
											</div>
											<div class="col-30p px-1">
												<v-text-field
													label="State"
													outlined
												></v-text-field>
											</div>
											<div class="col-30p px-1">
												<v-text-field
													label="Zip"
													outlined
												></v-text-field>
											</div>
										</div>
										<div class="row">
											<div class="col-50p px-1">
												<v-text-field
													label="Phone"
													outlined
												></v-text-field>
											</div>
											<div class="col-50p px-1">
												<v-text-field
													label="Email"
													outlined
												></v-text-field>
											</div>
										</div>
										<!-- Shipping Details -->
										<div class="row justify-center items-center">
											<div class="col-5p">
												<v-checkbox
													color="success"
													value="primary"
												></v-checkbox>
											</div>
											<div class="col-95p px-4">
												<div class="headline w-full">
													Shipping same as billing
													<v-divider></v-divider>
										</div>
											</div>
										</div>

										<div class="row">
											<div class="col-100p">
												<v-expansion-panels>
													<v-expansion-panel>
														<v-expansion-panel-header>Address</v-expansion-panel-header>
														<v-expansion-panel-content>
															<div class="title w-full">
																Revceiving Information
																<v-divider></v-divider>
															</div>
															<div class="row mt-2">
																<div class="col-50p px-1">
																	<v-text-field
																		label="First Name"
																		outlined
																	></v-text-field>
																</div>
																<div class="col-50p px-1">
																	<v-text-field
																		label="Last Name"
																		outlined
																	></v-text-field>
																</div>
															</div>
															<div class="row">
																<div class="col-100p px-1">
																	<v-text-field
																		label="Address"
																		outlined
																	></v-text-field>
																</div>
															</div>
															<div class="row">
																<div class="col-30p px-1">
																	<v-text-field
																		label="City"
																		outlined
																	></v-text-field>
																</div>
																<div class="col-30p px-1">
																	<v-text-field
																		label="State"
																		outlined
																	></v-text-field>
																</div>
																<div class="col-30p px-1">
																	<v-text-field
																		label="Zip"
																		outlined
																	></v-text-field>
																</div>
															</div>
			
														
														</v-expansion-panel-content>
													</v-expansion-panel>
												</v-expansion-panels>
											</div>
										</div>
									</v-card>
								</div>
							</div>
						</DxScrollView>
					</v-card>

					<div class="row justify-end">
						<div class="col-4 text-center">
							<v-btn 
								@click="step = 2"
								text>
								Previous
							</v-btn>
							<v-btn
								color="primary"
								@click="step = 4">
								Continue
							</v-btn>
						</div>
					</div>
				</v-stepper-content>
				<!-- END Step 3 Billing Details -->
				<!-- Step 4 Payment Details -->
				<v-stepper-content step="4">
					<v-card
						class="mb-4 my-card"
						color="grey lighten-1">
						<div class="row justify-center">
							<div class="col-9">
								<v-card
									class="mx-auto p-8"
									max-width="800"
									outlined>
									<div class="headline w-full">
										Sale Type
										<v-divider></v-divider>
									</div>
									<div class="row justify-center mt-2">
										<DxButtonGroup
											class="payment-type-buttons"
											:activeStateEnabled="false"
											:focusStateEnabled="false"
											:items="saleType"
											key-expr="text"
											selection-mode="single"
											:selected-item-keys.sync="selectedSaleType"
											@selection-changed="logSelectionChanged"
										/>
									</div>
									<div class="headline w-full mt-8">
										Card Details
										<v-divider></v-divider>
									</div>
									<div class="row justify-center">
										<div class="col-8 px-2">
											<fieldset class="w-full">
											<legend class="mx-3 px-2">
												<span>
													Card Number
												</span>	
											</legend>
												<DxTextBox
													styling-mode="filled"
													:height="50"
													v-model="creditCardForm.number"
													class="card-number-field"
													:mask-rules="cardNumberRules"
													mask="X000 0000 0000 0000"
													max-length="16"
												/>
											</fieldset>
										</div>
									</div>
									<div class="row justify-center">
										<div class="col-4 p-2">
											<fieldset class="h-19">
											<legend class="mx-3 px-2">
												<span>
													Expiration Date
												</span>	
											</legend>
												<DxTextBox
													styling-mode="filled"
													:height="50"
													:value.sync="creditCardForm.expDate"
													@input="creditCardForm.expDate = $event.event.target.value"
													:mask-rules="expRules"
													mask="X0/00"
													class="custom-exp"
													max-length="4"
												/>
												<div class="date-plcaeholder">
													<span class="pr-1">MM </span><span class="pr-1">/</span> <span>YY</span>
												</div>
											</fieldset>
										</div>
										<div class="col-4 p-2">
											<fieldset>
											<legend class="mx-3 px-2">
												<span>
													CVV
												</span>	
											</legend>
												<DxTextBox
													styling-mode="filled"
													:height="50"
													:mask-rules="expRules"
													mask-char="_"
													mask="X000"
													v-model="creditCardForm.cvv"
													placeholder="123234"
													max-length="4"
													class="cvv-field"
												/>
											</fieldset>
										</div>
									</div>
								</v-card>
							</div>
						</div>
						<div class="row">
							<div class="col-3">
								<v-btn @click="recurringPopup = !recurringPopup">
									Recurring Popup
								</v-btn>
								<recurringComponent :recurringPopup="recurringPopup" @closePopup="closeRecurringPopup" />
							</div>
							<div class="col-3">
								<v-btn @click="contractsPopup = !contractsPopup">
									Contracts Popup
								</v-btn>
								<contractsComponent :contractsPopup="contractsPopup" @closePopup="closeContractPopup"/>
							</div>
							<div class="col-3">
								<v-btn @click="transResponsePopup = !transResponsePopup">
									Transaction Response Popup
								</v-btn>
								<transactionResponseComponent :transResponsePopup="transResponsePopup" @closePopup="closeTransResponsePopup" />
							</div>
						</div>
						
						<div class="row justify-center sticky-ISO">
							<v-card>
								<div class="row">
									<div class="col-12">
										<p>Datacom Merchant Services is a Registered ISO/MSP of US Bank Elavon</p>
									</div>
								</div>
							</v-card>
						</div>
					</v-card>

					<div class="row justify-end">
						<div class="col-4 text-center">
							<v-btn 
								@click="step = 3"
								text>
								Previous
							</v-btn>
							<v-btn
								color="primary"
								@click="submitForm">
								Submit
							</v-btn>
						</div>
					</div>
				</v-stepper-content>
				<!-- END Step 4 Payment Details -->

			</v-stepper-items>
		</v-stepper>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { DxButtonGroup } from 'devextreme-vue/button-group';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxNumberBox from 'devextreme-vue/number-box';
import DxTextBox from 'devextreme-vue/text-box';
import {mask} from "jquery-mask-plugin"
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';

//Mixins
import { FormMixins } from "@/mixins/form-mixins"
//components
import recurringComponent from "@/components/universal/new/recurring-component"
import contractsComponent from "@/components/financial/new/contracts-component"
import transactionResponseComponent from "@/components/financial/new/transaction-response-component"

export default {
  name: "virtualTerminal",
    mixins: [
			FormMixins
  ],
  components: {
		DxButtonGroup,
		DxScrollView,
		DxNumberBox,
		DxTextBox,
		DxDropDownBox,
		DxList,
		recurringComponent,
		contractsComponent,
		transactionResponseComponent
  },
  data() {
    return {
      //Component Data
      pageSettings: {
      pageTitle: "Accounting"
    },
      moduleInfo: {
        name: "Accounting",
        type: "dashboard",
        level: 5
      },
			//Main Settings
			 step: 1,
			 transctionType: [{
					icon: "mdi mdi-cash-usd-outline",
					text: "Sale"
				}, {
					icon: "mdi mdi-credit-card-refund",
					text: "Return"
				}, {
					icon: "mdi mdi-credit-card-off-outline",
					text: "Void"
				},],
				transctionMethod: [{
					icon: "mdi mdi-cash",
					text: "Cash"
				}, {
					icon: "mdi mdi-credit-card",
					text: "Credit Card"
				}, {
					icon: "mdi mdi-checkbook",
					text: "ACH"
				},],
				saleType: [{
					icon: "mdi mdi-arrow-down-bold",
					text: "One-Time"
				}, {
					icon: "mdi mdi-sync",
					text: "Recurring"
				}, {
					icon: "mdi mdi-calendar-clock",
					text: "Installment"
				},],
				selectedTransMethod: [ '' ],
				selectedTransType: [ '' ],
				selectedSaleType: [ '' ],
				//Step 1
				showManualTaxField: false,
				selectedTaxList: [],

				//Customer Dropdown
				sortBy: 'name',
				sortDesc: false,
				search: '',
				filter: {},
				customerSelected: {},

        items: [
          {
						id: 1,
						customer_id: 53245435,
            name: 'Joe Smith',

          },
					
					{
						id: 2,
						customer_id: 53245435,
            name: 'Leah leigh',

					},
					{
						id: 3,
						customer_id: 53245435,
            name: 'Bruce Almighty',

					},
					{
						id: 4,
						customer_id: 53245435,
            name: 'Heather Smith',

					},
					{
						id: 5,
						customer_id: 53245435,
            name: 'Mike Jones',

					},
					{
						id: 6,
						customer_id: 53245435,
            name: 'Susan Sarandon',

          },
				],
				//Recurring Payment Popup
				recurringPopup: false,
				contractsPopup: false,
				transResponsePopup: false,
				//Payment Details
				creditCardForm: {
					number: null,
					expDate: "",
					cvv: null
				},
				// Payment Form
				isSale: false,
        isVoid: null, 
        isRefund: null,
        isAuth: null,
        isOneTimeTrans: true,
        isRecurringTrans: false, 
        isInstallmentTrans: false,
        isCreditCardTrans: true,
        isCashTrans: false,
        isCheckTrans:false, 
        isACHTrans: false,
        isKeyedTrans: false,
        isSwipedTrans: false,
        paymentForm: {
          datacom: null,
          partner: null,
          company: null,
          transType: null,
          subtotal: null,
          total: null,
          salesTax: null,
        },
    }
  },
  methods: {
    testButton(e) {
			console.log("e", e)
			console.log("this.creditCardForm", this.creditCardForm)
			let elem = $('.custom-mask').find('input')
			console.log("elem", elem)
			
		},
		logSelectionChanged() {
			let message;
			if(this.selectedTransMethod.length > 0) {
				message = "The following styles are selected: " + this.selectedTransMethod.join(", ");
			} else {
				message = "There are no selected styles";
			}
			console.log(message);
		},
		submitForm() {
			console.log("submitForm")
		},
		selectCustomer(key) {
			console.log('key', key)
			this.customerSelected = key
		},
		skipCustomer() {
			this.step = 3
			this.customerSelected = {}
		},
		taxRateDropdownChange(e) {
			console.log('e', e)
			e.component.close()
		},
		closeContractPopup(e) {
			console.log('closeContractPopup e', e)
			this.contractsPopup = e
		},
		closeRecurringPopup(e) {
			console.log('closeRecurringPopup e', e)
			this.recurringPopup = e
		},
		closeTransResponsePopup(e) {
			console.log('closeTransResponsePopup e', e)
			this.transResponsePopup = e
		}
		

  },
  computed: {
		...mapState(["Financial"]),
		sortedKeys() {
			if(this.sortDesc) {
				return _.orderBy(this.items, 'name'.toLowerCase(), "asc")
			} else if(!this.sortDesc) {
				return _.orderBy(this.items, 'name'.toLowerCase(), "desc")
			}
			
		},
		filteredKeys () {
			return this.sortedKeys.filter(key => key['name'].includes(this.search))
		},
		// computedExpMonth() {
		// 	return this.creditCardForm.expDate.slice(0,2)
		// },
		// computedExpYear() {
		// 	return this.creditCardForm.expDate.slice(2,4)
		// }
    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {

  },

    
  }
</script>

<style lang="scss">
@import "../../../assets/sass/variables.scss";

.my-card {
	background: rgb(223, 223, 223);
	height: calc(100vh - 260px);
}

.credit-card-field {
	.v-input__control {
		.v-input__slot {
			.v-text-field__slot {
				input {
					font-size: $base-font-size *1.3;
					padding:0px 0px;
				}
			}
			
		}
	}
}
.card-number-field {
	.dx-texteditor-container {
		.dx-texteditor-input-container {
			input {
				font-size: $base-font-size *1.3;
				padding-top:5px;
			}
		}
	}
}
.custom-exp {
	.dx-texteditor-container {
		.dx-texteditor-input-container {
			input {
				font-size: $base-font-size *1.3;
				padding-top:5px;
			}
		}
	}
}
.cvv-field {
	.dx-texteditor-container {
		.dx-texteditor-input-container {
			input {
				font-size: $base-font-size *1.3;
				padding-top:5px;
			}
		}
	}
}
.dx-texteditor.dx-editor-outlined.dx-state-focused {
	border: 2px solid rgb(0, 131, 163);
	box-shadow: none;
}

.date-plcaeholder {
	position: relative;
	left: 10px;
	top: -15px;
	font-size: $base-font-size *.8;
	opacity: 0.5;
	height: 10px;
}
.sticky-ISO {
	position: absolute;
	bottom: 10px;
	
}

.close-button {
	color: rgb(58, 58, 58);
	text-align: right;
	position: relative;
	right: -18px;
	top: -20px;
}
.recurring-popup {
	height: 50vh;
}
</style>

