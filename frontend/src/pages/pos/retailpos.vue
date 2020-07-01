<template>
	<f7-page name="retail-pos">
		<f7-row>
			<!--<f7-navbar title="POS" back-link="Back" back-link-url="/">
			</f7-navbar>-->
		</f7-row>

		<!-- Main Container Row -->
		<f7-row>
			<!-- Main Container Column -->
			<f7-col width="100" medium="100" class="fullheight">
				<!-- Main Container Block -->
				<f7-block class="no-padding no-margin">
					<!-- Top Row -->
					<f7-row class="full-width no-margin-top">
						<div class="full-width no-margin-bottom">
							<div class="display-flex justify-content-space-around main-row">
								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-row class="display-flex justify-content-space-evenly">
										<f7-col width="25" class="display-flex justify-content-start">
											<f7-row class="full-width">
												<f7-link
													class="align-self-center bg-color-gray text-color-white"
													panel-open="pos-categories"
												>
													<b-icon icon="chevron-double-right"></b-icon>
												</f7-link>
											</f7-row>
											<f7-row class="full-width">
												<f7-link
													class="bg-color-red align-self-center text-color-white"
													@click="Inventory.selectedCategory = ''"
												>
													<b-icon icon="mdi mdi-close"></b-icon>
												</f7-link>
											</f7-row>
										</f7-col>
										<f7-col width="75" class="display-flex justify-content-start">
											<f7-block-header>Transaction Type</f7-block-header>
										</f7-col>
										<f7-row class="full-width">
											<f7-col width="100" class="display-flex justify-content-space-between">
												<div
													class="tall-button time-box display-flex flex-direction-column"
													style="width:23%; border: 1px solid gray;"
												>
													<strong>
														<f7-row class="justify-content-center" style="font-size: 1.3em">{{ Static.time }}</f7-row>
													</strong>
													<f7-row class="justify-content-center" style="font-size: 1em">{{ Static.date }}</f7-row>
												</div>
												<f7-button
													class="tall-button padding-half"
													@click="initSale"
													fill
													:active="orderForm.isSale"
													style="width:23%;"
												>Sale</f7-button>
												<f7-button
													class="tall-button padding-half"
													@click="initReturn"
													fill
													:active="orderForm.isReturn"
													style="width:23%;"
												>Return</f7-button>
												<f7-button
													class="tall-button padding-half"
													@click="initVoid"
													fill
													:active="orderForm.isVoid"
													style="width:23%;"
												>Void</f7-button>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-col>
								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-block-header>Register Management</f7-block-header>
									<f7-row class="full-width">
										<f7-col width="100" class="display-flex justify-content-space-between">
											<f7-button
												popup-open=".open-till-popup"
												class="tall-button padding-half"
												style="width:23%;"
												fill
											>Open Till</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Close Till</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Reports</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Drawer</f7-button>
										</f7-col>
									</f7-row>
									<f7-row>
										<open-till-popup-component></open-till-popup-component>
									</f7-row>
								</f7-col>

								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-row class="padding-bottom display-flex justify-content-center">
										<f7-col>
											<f7-segmented raised round>
												<f7-button round active>{{ Auth.userLoginProfile.full_name || 'Clerk' }}</f7-button>
												<f7-button @click="testButton" popup-open=".manager-login-popup"round>Manager</f7-button>
												<manager-login-popup-component></manager-login-popup-component>
											</f7-segmented>
										</f7-col>
									</f7-row>
									<f7-row class="full-width">
										<f7-col width="75" class="display-flex justify-content-space-between">
											<f7-button class="bottom-button padding-half" style="width:35%;" fill>Dashboard</f7-button>
											<f7-button
												class="bottom-button padding-half bg-color-gray"
												style="width:28%;"
												fill
												sheet-open=".retail-POS-Settings">
												Settings
											</f7-button>
											<retail-POS-settings-component :retailSettings="retailSettings"></retail-POS-settings-component>
											<f7-button
												class="bottom-button bg-color-black text-color-white padding-half margin-bottom"
												style="width:28%;"
												href="/pos-login/"
												@click="logout"
											>Logout</f7-button>
										</f7-col>
										<f7-col width="25" class="padding-top-half">
											<f7-row class="full-width display-flex justify-content-center">
												<b-switch
													:value="isOnLine"
													size="is-large"
													:type="isOnLine ? 'is-success' : 'is-danger'"
													class="no-margin-right"
												></b-switch>
											</f7-row>
											<f7-row class="full-width display-flex justify-content-center">
												<p>Connected</p>
											</f7-row>
										</f7-col>
									</f7-row>
								</f7-col>
							</div>
						</div>
					</f7-row>
					<!-- END Top Row -->

					<!-- Middle Row  Calculator-->
					<f7-row class="full-width no-padding-top no-margin-top">
						<div class="full-width no-margin-top no-margin-bottom">
							<div class="main-row">
								<f7-row class="full-width">
									<!-- Begin Inventory -->
									<f7-col resizable class="thirdbox-middle mbox-1 no-padding display-flex elevation-10">
										<f7-row class="full-width">
											<f7-list class="full-width no-margin no-padding">
												<f7-list-input ref="barcodeInput" type="text" class="barcode-search" placeholder="Barcode Number">
													<f7-icon f7="barcode" slot="media"></f7-icon>
												</f7-list-input>
											</f7-list>
										</f7-row>
										<f7-row class="full-width">
											<f7-col>
												<f7-searchbar
													placeholder="Sku / Item / Description"
													searchContainer=".search-list"
													searchItem=".inventory-item"
													searchIn=".inventory-title"
													:disable-button="!$theme.aurora"
												></f7-searchbar>
											</f7-col>
										</f7-row>

										<f7-row class="inventory-row no-margin full-width full-height">
											<div
												v-bar="{
													preventParentScroll: true,
													scrollThrottle: 30
												}"
												style="height: 88%;"
											>
												<!-- el1 -->
												<div>
													<!-- el2 -->
													<!-- your scrollable content -->
													<f7-col class="inventory-div searchbar-found search-list">
														<!-- All Items in Inventory -->
														<f7-col v-if="!Inventory.selectedCategory" class="inventory-div">
															<div
																v-for="item in Inventory.inventoryList"
																:key="item.id"
																:class="orderForm.isSale || orderForm.isReturn ? '' : 'disabled'"
																class="inventory-item no-margin no-padding"
																@click="addItemToTill(item.id)"
															>
																<div class="inventory-img">
																	<img :src="item.profile_img" />
																</div>
																<div class="inventory-title">{{ item.name }}</div>
															</div>
														</f7-col>
														<f7-col v-if="Inventory.selectedCategory" class="inventory-div">
															<div
																v-for="item in categoryItems"
																:key="item.id"
																class="inventory-item no-margin no-padding"
																:class="orderForm.isSale || orderForm.isReturn ? '' : 'disabled'"
																@click="addItemToTill(item.id)"
															>
																<div class="inventory-img">
																	<img :src="item.profile_img" />
																</div>
																<div class="inventory-title">{{ item.name }}</div>
															</div>
														</f7-col>
													</f7-col>

													<f7-row class="full-width searchbar-not-found">
														<p class="text-align-center">Nothing to show</p>
													</f7-row>
												</div>
											</div>
										</f7-row>
									</f7-col>
									<!-- End Inventory -->

									<!-- Begin Calculator -->
									<f7-col
										resizable
										class="no-padding thirdbox-middle center-box display-flex flex-direction-column justify-content-start elevation-10"
									>
										<f7-row class="bg-color-black" @click="showCalc = !showCalc" style="cursor: pointer;">
											<f7-icon icon="mdi mdi-swap-horizontal-bold" color="white" size="35"></f7-icon>
										</f7-row>
										<f7-row class="full-width">
											<transition name="calc-transition" class="flip-card">
												<!-- Frontside Card -->
												<div v-if="showCalc" key="frontSide" class="cardFront">
													<f7-col width="100" class="cardFront">
												
													<f7-row class="full-width">
														<calculator-component :calcData="calc"></calculator-component>

														<f7-row class="no-padding full-width no-margin">
															<f7-col class="order-buttons-bg">
																<f7-row class="full-width justify-content-space-around">
																	<f7-col>
																		<f7-button fill class="bg-color-green calc-button" @click="clearBarcodeInterval" popup-open=".gratuity-popup">Gratuity</f7-button>
																		<gratuity-popup-component :orderForm="orderForm" :startTimer="startTimer"></gratuity-popup-component>
																	</f7-col>
																	<f7-col>
																		<f7-button fill @click="saveQty" class="bg-color-green calc-button">Save</f7-button>
																	</f7-col>
																
																	
																</f7-row>
																<f7-row class="full-width justify-content-space-around">
																	<f7-col width="50">
																		<f7-button fill class="calc-button" @click="canApplyDiscount" popup-open=".discount-popup">Discount</f7-button>
																		<discount-popup-component 
																			:discountSettings="discountSettings" 
																			:sharedData="sharedData"
																			:formData="orderForm">
																		</discount-popup-component>
																	</f7-col>
																	<f7-col width="50">
																		<f7-row>
																			<f7-col width="50">
																				<f7-button fill popup-open=".popup-component" class="calc-button">Popup</f7-button>
																				<transaction-response-popup-component :transResponseSettings="transResponseSettings">
																				
																					<span slot="title">Transaction Response</span>
																					<f7-block-title class="classy text-align-center" slot="errorTitle">DECLINED</f7-block-title>
																					<span slot="errorMsg">
																						<p class="field-title">Please call support for help with this issue</p>
																						<p class="field-title">Error Code: 4205</p>
																						<p class="field-title">Phone Number: 1-800-555-1212</p>
																					</span>
																				</transaction-response-popup-component>
																			</f7-col>
																			<f7-col width="50">
																				<f7-button fill @click="testButton" class="calc-button">Test</f7-button>
																			</f7-col>
																		</f7-row>
																	</f7-col>
																</f7-row>
															</f7-col>
														</f7-row>

														<f7-row class="full-width no-margin">
															<f7-col width="100">
																<f7-row class="tender-rows no-margin">
																	<p class="no-margin">Tender</p>
																</f7-row>
																<f7-row class="full-width">
																	<f7-col class="display-flex justify-content-space-around flex-direction-row">
																		<f7-button fill popup-open=".cash-popup" class="bg-color blue calc-button">Cash</f7-button>
																		<cash-payment-popup-component :sharedData="sharedData" :formData="orderForm"></cash-payment-popup-component>
																		<f7-button
																			fill
																			popup-open=".credit-card-popup"
																			class="bg-color blue calc-button"
																		>Credit</f7-button>
																		<credit-card-popup-component :sharedData="sharedData" :formData="orderForm"></credit-card-popup-component>
																		<f7-button fill popup-open=".gift-card-popup" class="bg-color blue calc-button">Gift</f7-button>
																		<gift-card-popup-component :sharedData="sharedData" :formData="orderForm"></gift-card-popup-component>
																	</f7-col>
																</f7-row>
															</f7-col>
														</f7-row>
													</f7-row>
											</f7-col>
												</div>
												<!-- Backside Card -->
												<div v-else key="backSide" class="cardBack">
													<f7-col width="100" class="cardBack">
														<f7-row class="full-width">
															<order-notifications-component></order-notifications-component>
															<order-status-component></order-status-component>
														</f7-row>
													</f7-col>
												</div>
											</transition>
										</f7-row>
				
									</f7-col>
									<!-- End Calculator -->
									<!-- Begin Till -->
									<f7-col resizable class="thirdbox-middle mbox-3 elevation-10">
										<f7-row class="full-width padding-half till-header">
											<f7-col width="5" class="display-flex justify-content-start">
												<div class="text-align-center">QTY</div>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<div class="text-align-center">ITEM</div>
											</f7-col>
											<f7-col width="20" class="display-flex justify-content-center">
												<div class="text-align-center">EACH</div>
											</f7-col>
											<f7-col width="15" class="display-flex justify-content-center">
												<div class="text-align-center">TOTAL</div>
											</f7-col>
											<f7-col width="10" class="display-flex justify-content-center">
												<div class="text-align-center"></div>
											</f7-col>
										</f7-row>
										<div class="till justify-content-space-evenly">
											<!--Till Content Rows-->
											<f7-row class="align-content-flex-start till-container">
												<f7-col width="100" class="no-padding no-margin display-flex flex-direction-column">
													<div
														v-bar="{
															preventParentScroll: true,
															scrollThrottle: 30
														}"
														style="max-height: 49vh;"
													>
														<!-- el1 -->
														<div>
															<!-- el2 -->
															<!-- your scrollable content -->
															<f7-list class="no-margin">
																<f7-list-item
																	v-for="(item, index) in sharedData.allItemsInTill"
																	:key="item.id"
																	class="pos-till no-margin"
																	swipeout
																>
																	<f7-row
																		@click="editSelectedItem(item.id)"
																		class="full-width display-flex justify-content-space-between padding-right-half"
																		style="cursor: pointer;"
																		:class="selectedItem.id === item.id ? 'selected-item' : ''"
																	>
																		<f7-col width="5" class="display-flex justify-content-start margin-left-half">
																			<div class="till-text">{{ item.qty }}</div>
																		</f7-col>
																		<f7-col width="40" class="flex-shrink-1">
																			<div class="till-text text-align-center">{{ item.name }}</div>
																		</f7-col>
																		<f7-col width="20">
																			<div class="till-text">{{ item.sale_price || item.list_price | formatDollar }}</div>
																		</f7-col>
																		<f7-col width="20" class="display-flex justify-content-end">
																			<div
																				class="till-text"
																			>{{ item.qty * item.sale_price || (item.qty * item.list_price) | formatDollar }}</div>
																		</f7-col>
																		<f7-col
																			width="10"
																			@click.prevent="deleteItemFromTill(index)"
																			class="display-flex justify-content-center"
																		>
																			<b-icon class="padding-top" icon="mdi mdi-close-circle-outline"></b-icon>
																		</f7-col>
																	</f7-row>
																	<f7-swipeout-actions left>
																		<f7-swipeout-button
																			delete
																			confirm-text="Are you sure you want to delete this item?"
																		>Delete</f7-swipeout-button>
																	</f7-swipeout-actions>
																</f7-list-item>
															</f7-list>
														</div>
													</div>

													<f7-row class="full-width till-totals display-flex align-items-center">
														<f7-col width="50">
															<f7-row>
																<f7-col class="total-text margin-left-half" width="50">
																	<div v-if="retailSettings.enableGratuity" style="font-size:1em;">Gratuity</div>
																	<div>Tax</div>
																	<div style="font-size:1em;">Discounts</div>
																</f7-col>
																<f7-col class="total-text" width="50">
																	<div
																		v-if="retailSettings.enableGratuity"
																		class="text-align-center"
																		style="font-size:1em;"
																	>{{ orderForm.gratuity | formatDollar }}</div>
																	<div
																		class="text-align-center"
																		style="font-size:1em;"
																	>{{ orderForm.tax | formatDollar }}</div>
																	<div
																		class="text-align-center"
																		style="font-size:1em;"
																	>({{ orderForm.totalDiscounts | formatDollar }})</div>
																</f7-col>
															</f7-row>
														</f7-col>
														<f7-col width="15" class="total-text text-align-center">
															<div>Subtotal</div>
															<div style="font-size:1.35em;">Total</div>
														</f7-col>
														<f7-col width="35" class="text-align-center total-text">
															<div>{{ orderForm.subtotal | formatDollar }}</div>
															<div style="font-size:1.35em;">{{ grandTotal | formatDollar }}</div>
														</f7-col>
													</f7-row>
												</f7-col>
												<!-- END TIll Screen -->
											</f7-row>
										</div>
									</f7-col>
									<!-- END Till -->
								</f7-row>
							</div>
						</div>
					</f7-row>
					<!-- END Middle Row -->

					<!-- Bottom Row -->
					<f7-row class="full-width">
						<div class="display-flex main-row no-margin full-width">
							<f7-col width="33" class="thirdbox-bottom full-width elevation-10">
								<f7-block-header>Lookup</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Customer</span>
									</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Transactions</span>
									</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Inventory</span>
									</f7-button>
								</f7-row>
							</f7-col>
							<f7-col width="33" class="thirdbox-bottom margin-left-half full-width elevation-10">
								<f7-block-header>Loyalty</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Coupons</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Gift Cards</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Loyalty Cards</f7-button>
								</f7-row>
							</f7-col>
							<f7-col width="33" class="thirdbox-bottom margin-left-half full-width elevation-10">
								<f7-block-header>Orders</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button @click="clearBarcodeInterval"class="bottom-button padding-half" style="width:23%;" fill>Find</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Reprint</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Hold</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Resume</f7-button>
								</f7-row>
							</f7-col>
						</div>
					</f7-row>
					<!-- END Bottom Row -->
				</f7-block>
				<!-- END Main Container Block -->
			</f7-col>
			<!-- END Main Container Column -->
		</f7-row>
		<!-- END Main Container Row -->

		<!-- Left Panel POS Categories -->
		<div class="panel panel-left pos-categories panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Datacom Links"></f7-navbar>
					<f7-list v-if="GET_INV_CATEGORY_LIST_LENGTH === 0">
						<f7-list-item view=".view-main" link="#" panel-close title="Categories are Empty"></f7-list-item>
					</f7-list>
					<f7-list v-if="GET_INV_CATEGORY_LIST_LENGTH != 0">
						<f7-list-item
							v-for="cat in GET_INV_CATEGORY_LIST"
							:key="cat.id"
							view=".view-main"
							link="#"
							panel-close
							:title="cat.name"
						></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import numeral from "numeral";

//Components
import openTillPopupComponent from "./components/open-till-popup-component.vue";
import discountPopupComponent from "@/pages/pos/components/discount-popup-component.vue";
import transactionResponsePopupComponent from "@/pages/pos/components/transaction-response-component.vue";
import cashPaymentPopupComponent from "@/pages/pos/components/cash-payment-popup-component.vue";
import giftCardPopupComponent from "@/pages/pos/components/gift-card-popup-component.vue";
import creditCardPopupComponent from "@/pages/pos/components/credit-card-popup-component.vue";
import retailPOSSettingsComponent from "@/pages/pos/components/retail-pos-settings-component.vue"
import calculatorComponent from "@/pages/pos/components/calculator-component.vue";
import orderStatusComponent from "@/pages/pos/components/order-status-component.vue";
import orderNotificationsComponent from "@/pages/pos/components/order-notifications-component.vue";
import gratuityPopupComponent from "@/pages/pos/components/gratuity-popup-component.vue";
import managerLoginPopupComponent from "@/pages/pos/components/manager-login-popup-component.vue";

export default {
	name: "retailPOS",
	mixins: [],
	components: {
		"open-till-popup-component": openTillPopupComponent,
		"discount-popup-component": discountPopupComponent,
		"transaction-response-popup-component": transactionResponsePopupComponent,
		"cash-payment-popup-component": cashPaymentPopupComponent,
		"gift-card-popup-component": giftCardPopupComponent,
		"credit-card-popup-component": creditCardPopupComponent,
		"retail-POS-settings-component": retailPOSSettingsComponent,
		"calculator-component": calculatorComponent,
		"order-status-component": orderStatusComponent,
		"order-notifications-component": orderNotificationsComponent,
		"gratuity-popup-component": gratuityPopupComponent,
		"manager-login-popup-component": managerLoginPopupComponent
	},
	data() {
		return {
			// Component Data 
			moduleInfo: {
				name: "Retail POS",
				type: "POS"
			},
			retailSettings: {
				retailPOSsheetOpened: false,
				enableGratuity: true,
			},
			//Transaction Response Popup
			transResponseSettings: {
				link: '.popup-component',
				name: "POS",
				type: "POS",
			},
			sharedData: {
				CCpopupOpened: false,
				CashpopupOpened: false,
				GiftpopupOpened: false,
				allItemsInTill: [],
			},
			//Transaction Completion Popup
			transactionDetails: {
				type: "Sale",
				isError: false,
				errorLevel: 1,
				errorData: "Error Data"
			},
			//Disocunt Popup Settings
			discountSettings: {
				DiscountpopupOpened: false,
				activeStepDiscount: 0,
			},
			//Calculate Settings
			showCalc: true,
			calc: {
				value: 0,
				id: null
			},


			//Main Settings and Variables
			isOnLine: navigator.onLine,
			
			printReport: false,
			openCashDrawer: null,

			


			//Selected Item
			selectedItem: {
				id: null,
				qty: 0,
				name: null,
				price: null,
				net_price: null,
				discounts: 0,
				total_price: 0
			},
			selectedOrder: {},

			
			//Order Form
			orderForm: {
				id: null,
				customer: null,
				onHold: false,
				isSale: false,
				isReturn: false,
				isVoid: false,
				isEdit: false,
				isDiscounted: false,
				isRefund: false,
				isSplitCheck: false,
				splitWays: 1,
				date: null,
				time: null,
				registerID: null,
				clerkID: null,
				merchantID: null,
				payment: {
					cashPaidAmount: null,
					cardPaidAmount: null,
					giftCardPaidAmount: null,
					transactionType: null,
					paymentMethod: null,
					transactionApproval: null,
					approvalCode: null,
					transactionID: null,
					coupons: null,
					giftCards: null
				},
				orderNumber: 0,
				qtyItems: 0,
				subtotal: 0,
				totalDiscounts: 0,
				//Error Data
				errorData: {
					type: "Authorization Unsuccessful",
					data: {
						non_field_errors: ["Error sending request to server"]
					},
					status: 400
				},
				//Totals
				gratuity: 0,
				tax: 0,
				total: 0,
			},


			//Input Selectors
			inputFocusList: {
				"pos-login": "this.$refs.barcodeInput.$el.querySelector('input').focus()",
				CashPayment: "this.$refs.barcodeInput.$el.querySelector('input').focus()"
			},
			barcodeInterval: null,
			//Login Data
			loginBarcode: {
				barcode: "",
				pin: ""
			},
			
		};
	},

	methods: {
		testButton() {
			// console.log("this.Auth.user", this.Auth.user);
			// console.log("this.Auth.userLoginProfile", this.Auth.userLoginProfile);
			this.startTimer();

			

			// console.log("element", element);
		},
		//Reset View
		resetView() {
			this.sharedData.allItemsInTill = [];
			this.orderForm.isSale = false;
			this.orderForm.isVoid = false;
			this.orderForm.isReturn = false;
			this.orderForm.subtotal = 0;
			this.orderForm.gratuity = 0;
			this.orderForm.tax = 0;
			this.orderForm.totalDiscounts = 0;
			this.orderForm.total = 0;
		},
		//Initiate Sale
		initSale() {
			if(this.orderForm.isReturn) {
				this.$f7.dialog.confirm("Do you want to cancel the current return?", "Order Change", () => {
					//User clicked OK
					console.log("User clicked OK");
					this.resetView();
					this.orderForm.isSale = true;
				}, () => {
					//User clicked Cancel
					console.log("User clicked Cancel");
					return
				}).open();
			}
			this.resetView();
			this.orderForm.isSale = true;
			
		},
		//Initiate Void
		initVoid() {
			this.resetView();
			this.orderForm.isVoid = true;
		},
		//Initiate Return
		initReturn() {
			if(this.orderForm.isSale) {
				this.$f7.dialog.confirm("Do you want to cancel the current sale?", "Order Change", () => {
					//User clicked OK
					console.log("User clicked OK");
					this.resetView();
					this.orderForm.isReturn = true;
				}, () => {
					//User clicked Cancel
					console.log("User clicked Cancel");
					return
				}).open();
			}
			this.resetView();
			this.orderForm.isReturn = true;
		},

		//Ticket
		addItemToTill(id) {
			console.log("this.sharedData.allItemsInTill", this.sharedData.allItemsInTill);
			//Find item in Ticket First to increase QTY
			var findTillItem = this.sharedData.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			console.log("findTillItem", findTillItem);
			if (findTillItem === undefined) {
				//Then add from Inventory if not already in list
				var invObj = this.Inventory.inventoryList.find((elem) => {
					return elem.id == id;
				});
				console.log("invObj", invObj);
				//Add Item Attributes
				invObj.qty = 1;
				invObj.is_discounted = false;
				this.sharedData.allItemsInTill.push(invObj);
				// this.subtotal += invObj.list_price * invObj.qty;
				this.calculateTotals();
			} else {
				//Item already in List, increase quantity
				console.log("findTillItem Obj", findTillItem["qty"]);
				findTillItem["qty"] += 1;
				//Populate SelectedItem Object
				this.selectedItem.id = findTillItem["id"];
				this.selectedItem.qty = findTillItem["qty"];
				this.selectedItem.name = findTillItem["name"];
				var currentItemPrice = findTillItem["price"];
				this.selectedItem.price = parseFloat(currentItemPrice);
				console.log("this.selectedItem", this.selectedItem);

				this.$forceUpdate();
				this.calculateTotals();
			}
			this.selectedItem.id = null;
		},
		deleteItemFromTill(e) {
			console.log("e", e);
			console.log("deleteItemFromTill");
			this.sharedData.allItemsInTill.splice(e, 1);
			this.calculateTotals();
		},
		calculateTotals() {
			//Reduce the tax rate from each item and add them up
			var taxRatePercent = 9.75;

			this.orderForm.subtotal = this.sharedData.allItemsInTill.reduce((acc, obj) => {
				return acc + parseFloat(obj.list_price) * parseFloat(obj.qty);
			}, 0);
			console.log("this.orderForm.subtotal", this.orderForm.subtotal);

			this.orderForm.tax = this.sharedData.allItemsInTill.reduce((acc, obj) => {
				return acc + (parseFloat(obj.list_price) * parseFloat(obj.qty) * taxRatePercent) / 100;
			}, 0);
			console.log("this.orderForm.tax", this.orderForm.tax);
			//Calculate Total Discounts
			// console.log("Object.keys(this.sharedData.allItemsInTill[0].discounted_price", Object.keys(this.sharedData.allItemsInTill[0].discounted_price));
			if (this.sharedData.allItemsInTill.length != 0) {
				if (this.sharedData.allItemsInTill[0].discount != undefined) {
					var sumDiscount = this.sharedData.allItemsInTill.reduce((acc, obj) => {
						return acc + obj.discount;
					}, 0);
					console.log("sumDiscount", sumDiscount);
					console.log("sumDiscount", typeof sumDiscount);
					console.log("this.orderForm.totalDiscounts", this.orderForm.totalDiscounts);
					this.orderForm.totalDiscounts = sumDiscount;
				} else {
					this.orderForm.totalDiscounts = 0.0;
				}
			} else {
				this.orderForm.totalDiscounts = 0.0;
			}
			//Totals computed in watcher
		},
		editSelectedItem(itemId) {
			if (this.selectedItem.id) {
				this.selectedItem.id = null;
			} else {
				this.selectedItem.id = itemId;
			}
			console.log("itemId", itemId);
			console.log("this.sharedData.allItemsInTill", this.sharedData.allItemsInTill);
			var findOrderItem = this.sharedData.allItemsInTill.find((elem) => elem.id === itemId);
			console.log("findOrderItem", findOrderItem);

			this.calc.value = findOrderItem.qty;
			this.calc.id = findOrderItem.id;
			console.log("this.calc", this.calc);
		},
		saveOrdersInstead() {
			console.log("Offine - Orders are being saved for future processing");
			//1) Push all orders to a list
			//2) Execute transactions when back online 5 minutes afer connection
			//3) verify that all ofers have been successfully completed
			//4) If not all successful, find the unsuccessful ones and execute them individually
		},
		canApplyDiscount() {
			if (this.orderForm.isSale) {
				// this.$f7.popup.open(".discount-popup");
				this.discountSettings.DiscountpopupOpened=true;
			}
			if (this.orderForm.isReturn) {
				// this.$f7.popup.open(".discount-popup");
				this.$f7.dialog.alert('Discounts cannot be applied to return orders!');
			}
		},
		saveQty() {
			//Find object in array
			var id = this.selectedItem.id;
			console.log("this.selectedItem.id", this.selectedItem.id);
			var findTillItem = this.sharedData.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			findTillItem.qty = this.calc.value;
			console.log("Orde qty has been updated", this.sharedData.allItemsInTill);
			this.selectedItem.id = null;
			this.calc.value = 0;
		},




		//LogOut
		logout() {
			this.$store.dispatch("signOut");
		},
		logon(credentials) {
			console.log(credentials);
			this.$store.dispatch("signIn", credentials);
		},
		clearBarcodeInterval() {
			console.log('clearBarcodeInterval');
			clearInterval(this.barcodeInterval);
		},
		startTimer() {
			this.barcodeInterval = setInterval(() => {
					this.$refs.barcodeInput.$el.querySelector('input').focus();
					// console.log("this", this);			
			}, 2000);
		},
	},
	computed: {
		...mapState(["Auth", "Users", "Inventory", "Orders", "Static", "Errors"]),
		...mapGetters(["GET_INV_CATEGORY_LIST", "GET_INV_CATEGORY_LIST_LENGTH"]),
		categoryItems() {
			var filtered = this.Inventory.inventoryList.filter((elem) => elem.category != null);
			var answer = filtered.filter((elem) => elem.category.name === this.Inventory.selectedCategory);
			return answer;
		},

		grandTotal() {
			//Calculate Grand Total
			var newTotal = parseFloat(this.orderForm.subtotal) + parseFloat(this.orderForm.gratuity) + 
				parseFloat(this.orderForm.tax) - parseFloat(this.orderForm.totalDiscounts);
			console.log("newTotal", newTotal);

			return newTotal;
		},

	},
	watch: {
		isOnLine() {
			console.log("Orders are being pushed to a List");
			this.saveOrdersInstead();
		},

	},
	mounted() {

		

		
	}
};
</script>

<style lang="scss" scoped>
.main-row {
	padding-top: 8px;
	padding-bottom: 0px;
	padding-right: 8px;
	padding-left: 8px;
}
.quarterbox-top {
	background: rgb(221, 228, 228);
	width: 100%;
	padding: 7px;
	height: 18vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}
.thirdbox-middle {
	background: rgb(255, 255, 255);
	height: 64vh;
	min-width: 290px;

	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}
.thirdbox-bottom {
	background: rgb(221, 228, 228);
	padding: 1px;
	height: 15vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}

.tall-button {
	display: flex;
	justify-content: center;
	height: 5.5rem;
	border-radius: 10px;
}
.bottom-button {
	display: flex;
	justify-content: center;
	height: 4.5rem;

	border-radius: 10px;
}
.med-button {
	display: flex;
	justify-content: center;
	height: 2em;
	border-radius: 10px;
}

.chevrons {
	.chevron1 {
		background: rgba(129, 235, 245, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		font-weight: 900;
	}
	.chevron2 {
		background: rgba(46, 180, 192, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		font-weight: 900;
	}
	.chevron3 {
		background: rgba(3, 90, 98, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		color: white;
		font-weight: 900;
	}
}
.mbox-1 {
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: start;
	.inventory-row {
		height: 90%;
		width: 100%;
		.inventory-div {
			display: flex;
			justify-content: space-around;
			flex-shrink: 2;
			flex-wrap: wrap;
			min-width: 20%;
			width: 95%;
			height: 100%;
			.inventory-item {
				border: 2px solid black;
				cursor: pointer;
				width: 150px;
				height: 6em;
				background: white;
				font-weight: 300;
				margin-bottom: 5px;
				background: rgb(47, 47, 47);

				.inventory-img {
					display: flex;
					background: rgb(235, 235, 235);
					height: 75%;
					text-align: center;
					justify-content: center;
					img {
						height: 75px;
						border-radius: 50%;
						box-shadow: 5px 5px 10px rgb(34, 33, 33);
					}
				}
				.inventory-title {
					box-shadow: 0px 7px 10px rgb(34, 33, 33);
					text-align: center;
					font-weight: 600;
					color: black;
					height: 25%;
					color: white;
				}
			}
		}
	}
}

.notifications {
	border: 2px solid black;
	width: 100%;
	height: 7.5em;
	background: white;
	font-weight: 300;
	margin: 0px;
}

.category-box {
	flex-grow: 3;
	border-right: 2px solid grey;
	border-top: 2px solid grey;
	border-bottom: 2px solid grey;
	background: rgb(78, 78, 78);
	width: 5%;
	max-width: 25px;
	height: 90%;
}

.tender-rows {
	width: 100%;
	background: rgb(68, 68, 68);
	border-radius: 8px;
	padding-left: 20px;
	margin-left: 20px;
	margin-right: 20px;
	p {
		color: white;
		font-size: 0.8em;
	}
}
.order-buttons-bg {
	padding-top: 0px;
	background: rgb(177, 177, 177);
	width: 100%;
	height: 12vh;
	p {
		color: white;
		text-align: center;
	}
}



.till-header {
	font-family: OpenSans-Bold;
	font-weight: 500;
	background: rgb(9, 52, 59);
	color: white;
}
.qtyButton {
	display: flex;
	justify-content: center;
	background: rgb(216, 246, 244);
	height: 2.5em;
	cursor: pointer;
	border: 2px solid rgb(126, 124, 124);
	border-radius: 15px;
	width: 75%;
}

.till-container {
	height: 96%;
}
.till-totals {
	position: absolute;
	bottom: 10px;
	padding-right: 20px;
}
.inv-header {
	background: lightgrey;
}
.total-text {
	font-family: OpenSans-Bold;
	font-weight: 500;
}

//Till Text
div .till-text {
	font-size: 0.95em;
	line-height: 2.5em;
	// background: green;
}

//Checkout Popups Totals
.checkout-text {
	font-size: 2em;
}

.checkout-text-bold {
	font-size: 2em;
	font-family: OpenSans-SemiBold;
}
.checkout-text-paid {
	font-size: 1.5em;
}

.time-box {
	background-image: linear-gradient(rgb(255, 255, 255), rgb(212, 212, 212));
}
.selected-item {
	background: rgb(235, 192, 192);
}
.calc-button{
	margin: 2px;
	width:100%;
	height: 50px;
}


//Calculator and Backside Card Transition
.calc-transition-enter,
.calc-transition-leave-to {
	transform: rotateY(180deg);
	opacity: 0;
}
.calc-transition-enter-active,
.calc-transition-leave-active {
  transition: all 0.5s;
}
.flip-card {
	position: relative;
}
.cardFront {
	position:absolute;
	width: 100%;
	height: 100%;
	perspective: 1000px;
}
.cardBack {
	position:absolute;
	width: 100%;
	height: 100%;
	perspective: 1000px;
}
</style>
