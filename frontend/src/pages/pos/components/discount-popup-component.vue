<template>
	<div>
				<!-- Discount Page Popup -->
		<f7-popup
			class="discount-popup"
			:opened="discountSettings.DiscountpopupOpened"
			@popup:closed="
				discountSettings.DiscountpopupOpened = false;
				resetDiscounts;
			"
		>
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="margin-top text-color-white">Discounts</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right margin-top-half"
							@click="popupCloseDiscount($event)"
							icon-size="50"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>
				<f7-row class="full-width margin-bottom">
					<f7-button class="full-width" @click="resetDiscounts">Start Over</f7-button>
				</f7-row>
				<b-steps
					v-model="discountSettings.activeStepDiscount"
					:animated="isAnimated"
					:has-navigation="hasNavigation"
					:icon-prev="prevIcon"
					:icon-next="nextIcon"
				>
					<!-- Enter Manager Approval -->
					<b-step-item
						:visible="!manager.isUserManager"
						label="Manager Approval"
						:clickable="isStepsClickable"
					>
						<f7-card v-show="discountData.allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card
							v-show="!discounts.managerApproved && !manager.invalidCredentials && discountData.allItemsInTill.length != 0"
						>
							<f7-card-content>
								<f7-row>
									<f7-col width="100">
										<f7-block-header>Barcode + PIN</f7-block-header>
										<f7-list form>
											<f7-list-input
												ref="barcodeInput"
												id="barcodeInputID"
												autofocus
												maxlength="7"
												:value="manager.loginBarcode.barcode_number"
												@input="
													changeFocus('barcodeInput', 'pinInput');
													manager.loginBarcode.barcode_number = $event.target.value;
												"
												label="Barcode Number"
												type="number"
												placeholder="10000001"
											></f7-list-input>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div v-show="errorArray[0] === 'username'" class="message-body">{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
											<f7-list-item>
												<input
													id="pinInput"
													class="pin-cell"
													type="password"
													placeholder="PIN"
													maxlength="4"
													:value="manager.loginBarcode.pin"
													@input="manager.loginBarcode.pin = $event.target.value"
													@focus="show"
													data-layout="numeric"
												/>
											</f7-list-item>
											<vue-touch-keyboard
												:options="options"
												v-show="visible"
												:layout="layout"
												:cancel="hide"
												:accept="accept"
												:input="input"
											/>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div v-show="errorArray[0] === 'password'" class="message-body">{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width display-flex justify-content-center no-padding-no-margin"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div
															v-show="errorArray[0] === 'non_field_errors'"
															class="message-body"
														>{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
										</f7-list>
									</f7-col>
								</f7-row>
								<f7-row class="margin-top display-flex justify-content-center">
									<f7-col width="50">
										<f7-button fill @click="sendManagerCredentials">Submit</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="discounts.managerApproved">
							<f7-card-content style="height: 175px;">
								<f7-row class="display-flex justify-content-center">
									<img src="/static/AnimatedGreenCheck.gif" />
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<p>Success.</p>
								</f7-row>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="manager.invalidCredentials">
							<f7-card-content style="height: 175px;">
								<f7-row class="display-flex justify-content-center">
									<img src="/static/AnimatedRedX.gif" />
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<p>Credentials were not approved.</p>
									<p>Please try again.</p>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</b-step-item>
					<!-- Enter Discount Type -->
					<b-step-item
						label="Select Discount Type"
						:clickable="isStepsClickable"
						:type="{ 'is-success': isProfileSuccess }"
					>
						<f7-row class="margin-top">
							<f7-col width="50">
								<f7-button outline class="tall-button" @click="selectIndividualItem">Single Item</f7-button>
							</f7-col>
							<f7-col width="50">
								<f7-button outline class="tall-button" @click="selectEntireOrder">Entire Order</f7-button>
							</f7-col>
						</f7-row>
					</b-step-item>
					<!-- Individual Item Discount -->
					<b-step-item
						:visible="discounts.individualItemSelected"
						label="Individual Item"
						:clickable="isStepsClickable"
					>
						<f7-card v-if="discountData.allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or "Refund" to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="discountData.allItemsInTill.length != 0">
							<f7-card-content>
								<f7-list>
									<!-- Select Item to Discount -->
									<f7-row v-if="!discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" title="Select Item"></f7-list-item>
										</f7-col>
										<f7-col
											v-if="discountData.allItemsInTill.length != 0"
											width="50"
											class="display-flex justify-content-center"
										>
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="discounts.individualItem"
												@input="selectDiscountItem"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discountItem in discountData.allItemsInTill" :key="discountItem.id">
													{{
													discountItem.name
													}}
												</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Show Selected item -->
									<f7-row v-if="discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" :title="discounts.individualItem"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item
												class="checkout-text"
												:title="
													`$ ${discounts.individualItemList[0]['price'] *
														discounts.individualDiscountQtySelected}`
												"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- How Many items to Discount -->
									<f7-row v-if="discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Select Qty"></f7-list-item>
										</f7-col>
										<f7-col
											v-if="discountData.allItemsInTill.length != 0"
											width="50"
											class="display-flex justify-content-center"
										>
											<b-numberinput
												v-model="discounts.individualDiscountQtySelected"
												step="1"
												min="1"
												:max="selectedItem.qty"
												type="is-success"
											></b-numberinput>
										</f7-col>
									</f7-row>
									<!-- Select Discount Type -->
									<f7-row v-if="showDiscountType">
										<f7-col width="50">
											<f7-list-item
												checkbox
												:disabled="discountType == 'discount-dollar'"
												:checked="discountType == 'discount-percent'"
												title="Percentage"
												name="discount-checkbox"
												value="discount-percentage"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
										<f7-col width="50">
											<f7-list-item
												checkbox
												title="Dollar Amount"
												name="discount-checkbox"
												value="discount-dollar"
												:checked="discountType == 'discount-dollar'"
												:disabled="discountType == 'discount-percentage'"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Selected Percentage Discount -->
									<f7-row
										v-if="discountType === 'discount-percentage'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount %"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="discounts.individualItemSelectedPercent"
												@input="discounts.individualItemSelectedPercent = $event.target.value"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discount in RetailPOS.dicountsList" :key="discount.id">{{ discount }}%</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Selected Dollar Amount Discount -->
									<f7-row
										v-if="discountType === 'discount-dollar'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount $"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-row class="justify-content-center">
												<b-field>
													<b-numberinput
														class="checkout-text-bold"
														v-model="discounts.individualItemAmount"
														step="0.01"
														min="0"
														:max="selectedItem.price"
														type="is-success"
													></b-numberinput>
												</b-field>
											</f7-row>
										</f7-col>
									</f7-row>
									<!-- Discount Applied Calculation-->
									<f7-row
										v-if="discountType === 'discount-percentage' || discountType === 'discount-dollar'"
									>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" title="Discount Applied"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" :title="`$ ${discountCalculation}`"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-bold" title="New Item Total"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item
													class="checkout-text-bold"
													:title="discounts.newItemTotal | formatDollar"
												></f7-list-item>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-list>
								<f7-row>
									<f7-col>
										<f7-button
											fill
											large
											:disabled="checkToDiscountSave"
											@click="setNewItemDiscountedPrice"
										>Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</b-step-item>
					<!-- Entire Order Discount -->
					<b-step-item
						:visible="discounts.entireOrderSelected"
						label="Entire Order"
						:clickable="isStepsClickable"
					>
						<f7-card v-if="discountData.allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="discountData.allItemsInTill.length != 0">
							<f7-card-content>
								<f7-list>
									<!-- Show Selected item -->
									<f7-row>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" title="Order Total"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" :title="`$ ${formData.total}` | formatDollar"></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Select Discount Type -->
									<f7-row v-if="!showDiscountType">
										<f7-col width="50">
											<f7-list-item
												checkbox
												:disabled="discountType == 'discount-dollar'"
												:checked="discountType == 'discount-percent'"
												title="Percentage"
												name="discount-checkbox"
												value="discount-percentage"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
										<f7-col width="50">
											<f7-list-item
												checkbox
												title="Dollar Amount"
												name="discount-checkbox"
												value="discount-dollar"
												:checked="discountType == 'discount-dollar'"
												:disabled="discountType == 'discount-percentage'"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Selected Percentage Discount -->
									<f7-row
										v-if="discountType === 'discount-percentage'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount %"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="discounts.entireOrderPercent"
												@input="discounts.entireOrderPercent = $event.target.value"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discount in RetailPOS.dicountsList" :key="discount.id">{{ discount }}%</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Selected Dollar Amount Discount -->
									<f7-row
										v-if="discountType === 'discount-dollar'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount $"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-row class="justify-content-center">
												<b-field>
													<b-numberinput
														class="checkout-text-bold"
														v-model="discounts.entireOrderAmount"
														step="0.01"
														min="0"
														:max="formData.total"
														type="is-success"
													></b-numberinput>
												</b-field>
											</f7-row>
										</f7-col>
									</f7-row>
									<!-- Discount Applied Calculation-->
									<f7-row
										v-if="discountType === 'discount-percentage' || discountType === 'discount-dollar'"
									>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" title="Discount Applied"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" :title="`$ ${discountCalculation}`"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-bold" title="New Item Total"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item
													class="checkout-text-bold"
													:title="discounts.newOrderTotal | formatDollar"
												></f7-list-item>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-list>
								<f7-row>
									<f7-col>
										<f7-button
											fill
											large
											:disabled="!discounts.newItemTotal"
											@click="setNewItemDiscountedPrice"
										>Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</b-step-item>

					<!-- navigation Links -->
					<template v-if="customNavigation" slot="navigation" slot-scope="{ previous, next }">
						<f7-row class="display-flex justify-content-space-around">
							<f7-col width="25" class="imageNavButtons">
								<b-button
									v-if="!previous.disabled"
									class="display-flex justify-content-center"
									outlined
									type="is-danger"
									icon-pack="mdi"
									icon-left="arrow-left-box"
									size="is-large"
									:disabled="previous.disabled"
									@click.prevent="previous.action"
								>
									<span>Previous</span>
								</b-button>
							</f7-col>
							<f7-col width="25" class="imageNavButtons">
								<b-button
									v-if="!next.disabled"
									class="display-flex justify-content-center"
									outlined
									type="is-success"
									icon-pack="mdi"
									size="is-large"
									icon-left="arrow-right-box"
									:disabled="next.disabled"
									@click.prevent="next.action"
								>
									<span>Next</span>
								</b-button>
								<f7-button
									class="display-flex justify-content-center"
									v-if="next.disabled"
									large
									fill
									sheet-close
									@click.prevent="sendFile"
								>Submit</f7-button>
							</f7-col>
						</f7-row>
					</template>
					<!-- END navigation Links -->
				</b-steps>
				<f7-row>
					<f7-col>
						<f7-button @click="testButton">Test Button</f7-button>
					</f7-col>
				</f7-row>
			</f7-page>
		</f7-popup>
		<!-- END Discount Page Popup -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";
import { vueKeyboardMixin } from "@/mixins/layout-elements/vue-keyboard-mixin.js";
import { managerLoginMixin } from "@/mixins/businesses/manager-login-mixin";

//Components


export default {
	name: "discountPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		vueKeyboardMixin,
		managerLoginMixin
		],
	props: {
		discountData: {
			type: Object,
			required: true
		},
		discountSettings: {
			type: Object,
			required: true
		},
		formData: {
			type: Object,
			required: true
		}

	},
	data() {
		return {
			//Component Data

			//Main Data
			showDiscountType: false,
			discountType: null,
			discounts: {
				managerApproved: false,
				individualItemList: [],
				individualItemSelected: false,
				individualItem: "",
				selectedDiscountPercent: false,
				individualItemAmount: 0,
				individualItemSelectedPercent: 0,
				individualDiscountQtySelected: 1,
				individualDiscountQtyTotal: 1,
				newItemTotal: null,
				newOrderTotal: null,
				entireOrderSelected: false,
				entireOrderAmount: 0,
				entireOrderPercent: 0
			},
			//Buefy Steps
			stepItems: [],
			isAnimated: true,
			hasNavigation: false,
			customNavigation: false,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: true,
			isProfileSuccess: false,

			//Built-In Keyboard
			visible: false,
			layout: "numeric",
			input: null,
			options: {
				useKbEvents: false,
				preventClickEvent: false
			}

		};
	},
	methods: {
		testButton(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		resetDiscounts() {
			this.discountSettings.activeStepDiscount = 0;
			this.formData.totalDiscounts = 0;
			this.discounts.managerApproved = false;
			this.manager.invalidCredentials = false;
			this.discounts.individualItem = null;
		},
		selectDiscountType(e) {
			console.log("e", e);
			if (this.discountType) {
				this.discountType = "";
			} else {
				this.discounts.selectedDiscountPercent = true;
				this.discountType = e;
			}
		},
		//Close Discount Popup
		popupCloseDiscount(e) {
			// console.log('discount popup e', e);
			this.$f7.popup.close();
			this.resetDiscounts();
		},
		//Save item in Till with updated Discounted Price
		setNewItemDiscountedPrice() {
			console.log("setNewItemDiscountedPrice");
			console.log("this.discounts.newItemTotal", this.discounts.newItemTotal);
			var discountedPrice = this.discounts.newItemTotal;

			var finTillItemIndex = this.discountData.allItemsInTill.findIndex(
				(elem) => elem.name === this.discounts.individualItem
			);
			console.log("finTillItemIndex", finTillItemIndex);
			this.discountData.allItemsInTill[finTillItemIndex]["is_discounted"] = true;
			this.discountData.allItemsInTill[finTillItemIndex]["discount"] =
				this.discountData.allItemsInTill[finTillItemIndex]["price"] - discountedPrice;
			this.discountData.allItemsInTill[finTillItemIndex]["discounted_price"] = discountedPrice;
			console.log("this.discountData.allItemsInTill", this.discountData.allItemsInTill);
			this.resetDiscounts();
			this.calculateTotals();

			this.$f7.popup.close();
		},
		selectIndividualItem() {
			this.discounts.individualItemSelected = true;
			this.discounts.entireOrderSelected = false;
			this.discountSettings.activeStepDiscount = 2;
		},
		selectEntireOrder() {
			this.discounts.individualItemSelected = false;
			this.discounts.entireOrderSelected = true;
			this.discountSettings.activeStepDiscount = 3;
		},
		selectDiscountItem(e) {
			console.log("e", e);
			//find Item in inventoryList
			var invObj = this.Inventory.inventoryList.find((elem) => elem.name === e.target.value);
			console.log("invObj", invObj);
			this.formData.discounts.individualItemList.push(invObj);
			this.formData.discounts.individualItem = e.target.value;
			console.log("this.formData.discounts", this.formData.discounts);
			this.showDiscountType = true;
		},


	},
	computed: {
		...mapState(["Auth", "RetailPOS", "Errors"]),
		...mapGetters([]),
		discountCalculation() {
			console.log("Start discountCalculation");
			//Calculation for Individual Item Discount
			if (this.discounts.individualItemList.length != 0) {
				var currentPercentString = String(this.discounts.individualItemSelectedPercent);
				var currentItemPrice = this.discounts.individualItemList[0]["price"];
				var currentPercentFloat = currentPercentString.split("%")[0];
				var currentItemPriceFloat = parseFloat(currentItemPrice);
				var discount = 0;
				if (this.discountType == "discount-percentage") {
					// console.log("discount-percentage");
					if (this.discounts.individualItemSelectedPercent) {
						discount =
							(currentPercentFloat / 100) *
							currentItemPriceFloat *
							this.discounts.individualDiscountQtySelected;
						// console.log("discount-percentage", discount);
					}
				}
				if (this.discountType == "discount-dollar") {
					console.log("this.discounts.individualItemAmount", this.discounts.individualItemAmount);
					if (this.discounts.individualItemAmount) {
						// console.log("discount-dollar");
						discount =
							this.discounts.individualItemAmount * this.discounts.individualDiscountQtySelected;
						// console.log("discount-dollar", discount);
					}
				} else {
				}
				if (discount === undefined) {
					return "0.00";
				}
				this.discounts.newItemTotal =
					currentItemPriceFloat * this.discounts.individualDiscountQtySelected - discount;
				return numeral(discount).format("0,0.00");
			}
			//Calculation for entitre order
			if (this.discounts.entireOrderSelected) {
				var currentPercentString = String(this.discounts.entireOrderPercent);
				var currentPercentFloat = currentPercentString.split("%")[0];
				console.log("grandTotal", this.grandTotal);
				var discount = 0;
				if (this.discounts.entireOrderAmount) {
					if (this.discountType == "discount-percentage") {
						// console.log("discount-percentage");
						discount = (currentPercentFloat / 100) * this.grandTotal;
						// console.log("discount-percentage", discount);
					}
					if (this.discountType == "discount-dollar") {
						console.log("this.discounts.entireOrderAmount", this.discounts.entireOrderAmount);
						console.log("discount-dollar");
						discount = this.discounts.entireOrderAmount;
						// console.log("discount-dollar", discount);
					}
					if (discount === undefined) {
						return "0.00";
					}
					this.discounts.newOrderTotal = this.grandTotal - discount;
					return numeral(discount).format("0,0.00");
				}
			}
		},
		checkToDiscountSave() {
			if (this.discounts.newItemTotal) {
				var currentItemPrice = this.discounts.individualItemList[0]["price"];
				var currentItemPriceFloat = parseFloat(currentItemPrice);
				if (this.discountCalculation <= currentItemPriceFloat) {
					console.log("You can make a discount greater than the item itself");
					return false;
				}
			}
			return true;
		}

	},
	watch: {
		"discounts.individualItem": {
			deep: true,
			handler: function(after, before) {
				console.log("There has been a change to the discounts.individualItem");
				console.log("before", before);
				console.log("after", after);
			}
		}
	},
	created() {

	},
	async mounted() {
		this.$refs.barcodeInput.$el.querySelector('input').focus();
		
	}
};
</script>

<style scoped lang="less">
.discount-popup {
	height: 750px;
}

//Login PIN
.pin-cell {
	height: 50px;
	width: 50%;
	background: rgb(169, 236, 236);
	font-size: 1.5em;
}
</style>
