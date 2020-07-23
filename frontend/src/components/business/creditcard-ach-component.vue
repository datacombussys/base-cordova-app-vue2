<template>
	<div>
		<f7-card class="mo-margin-top">
			<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
				<f7-row class="full-width">
					<f7-col width="50" class="align-self-flex-end">
						<f7-block-title class="full-width">Payment</f7-block-title>
					</f7-col>
				</f7-row>
			</f7-card-header>
			<f7-card-content>
				<!-- Begin Payment List-->
				<f7-block-title class="full-width" medium>Manage Your Cards</f7-block-title>
				<f7-row class="margin-top display-flex justify-content-center">
					<f7-row class="full-width" v-if="VTHPP.creditCardList.length === 0">
						<div class="error-text">
							<p>There are no credit cards to display.</p>
						</div>
					</f7-row>
					<f7-row v-show="0">
						<p>Jesus is Lord</p>
						<p>In the name of Jesus Christ, I command all unGodly to leave.</p>
						<p>This website is protected by Jesus Christ our Lord.</p>
					</f7-row>
					<f7-row class="full-width" v-if="VTHPP.creditCardList.length != 0">
						<f7-col width="45" class="margin-left">
							<f7-block-title class="small full-width">Card #</f7-block-title>
						</f7-col>
						<f7-col width="50" class="margin-right padding-right">
							<f7-block-title class="small full-width text-align-right">Expiration Date</f7-block-title>
						</f7-col>
					</f7-row>
					<div class="full-width" v-if="VTHPP.creditCardList.length != 0">
						<f7-list accordion-list inset class="full-width padding">
							<f7-list-item
								accordion-item
								:title="`${card.card_type} ending in ${card.last4}`"
								:after="`${card.card_exp_month} / ${card.card_exp_year}`"
								v-for="card in VTHPP.creditCardList"
								:key="card.id"
							>
								<f7-accordion-content>
									<f7-row>
										<f7-col width="50">
											<f7-row>
												<p>
													<strong>Name on Card:</strong>
													{{card.name_on_card}}
												</p>
											</f7-row>
											<f7-row v-if="card.is_primary">
												<f7-block-title class="classy-small">Primary Credit Card</f7-block-title>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<strong>
												<p>Billing Address:</p>
											</strong>
											<p>{{ card.billing_address }} {{ card.billing_address2 }}</p>
											<p>{{ card.billing_city }} {{ card.billing_state }}, {{ card.billing_zip }}</p>
											<p>Phone: {{ card.phone }}</p>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-end margin padding-right">
										<f7-col width="50">
											<f7-row v-if="!card.is_primary">
												<f7-button outline class="padding" @click="makePrimaryCC" active>Make Primary</f7-button>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-segmented>
												<f7-button outline @click="deleteCreditCard" class="padding">Delete</f7-button>
											</f7-segmented>
										</f7-col>
									</f7-row>
								</f7-accordion-content>
							</f7-list-item>
						</f7-list>
					</div>
				</f7-row>
				<f7-row class="display-flex justify-content-end align-items-center margin-top">
					<f7-button fill small popup-open=".credit-card-popup">Add Credit Card</f7-button>
				</f7-row>
				<!-- END Credit Card -->
				<!-- ACH -->
				<f7-block-title class="full-width" medium>Manage Your Bank Accounts</f7-block-title>
				<f7-row class="margin-top display-flex justify-content-center">
					<f7-row class="full-width" v-if="VTHPP.achAccountList.length === 0">
						<div class="error-text">
							<p>There are no bank accounts to display.</p>
						</div>
					</f7-row>
					<f7-row v-show="0">
						<p>Jesus is Lord</p>
						<p>In the name of Jesus Christ, I command all ungodly to leave.</p>
						<p>This website is protected by Jesus Christ our Lord.</p>
					</f7-row>
					<f7-row class="full-width" v-if="VTHPP.achAccountList.length != 0">
						<f7-col width="45" class="margin-left">
							<f7-block-title class="small full-width">Account</f7-block-title>
						</f7-col>
						<f7-col width="50" class="margin-right padding-right">
							<f7-block-title class="small full-width text-align-right">Account Type</f7-block-title>
						</f7-col>
					</f7-row>
					<div class="full-width" v-if="VTHPP.achAccountList.length != 0">
						<f7-list accordion-list inset class="full-width padding">
							<f7-list-item
								accordion-item
								:title="`Account ending in ${ach.last4}`"
								after="Checking"
								v-for="ach in VTHPP.achAccountList"
								:key="ach.id"
							>
								<f7-accordion-content>
									<f7-row>
										<f7-col width="50">
											<f7-row>
												<p>
													<strong>Name on Card:</strong>
													{{ach.name_on_account}}
												</p>
												<p></p>
											</f7-row>
											<f7-row v-if="ach.is_primary">
												<f7-block-title class="classy-small">Primary Credit Card</f7-block-title>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<strong>
												<p>Billing Address:</p>
											</strong>
											<p>{{ ach.billing_address }} {{ ach.billing_address2 }}</p>
											<p>{{ ach.billing_city }} {{ ach.billing_state }}, {{ ach.billing_zip }}</p>
											<p>Phone: {{ ach.phone }}</p>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-end margin padding-right">
										<f7-col width="50">
											<f7-row v-if="!ach.is_primary">
												<f7-button outline class="padding" @click="makePrimaryCC" active>Make Primary</f7-button>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-segmented>
												<f7-button outline @click="deleteCreditCard" class="padding">Delete</f7-button>
											</f7-segmented>
										</f7-col>
									</f7-row>
								</f7-accordion-content>
							</f7-list-item>
						</f7-list>
					</div>
				</f7-row>
				<f7-row class="display-flex justify-content-end align-items-center margin-top">
					<f7-button fill small popup-open=".ach-popup">Add ACH Account</f7-button>
				</f7-row>
				<!-- END ACH -->

				<!-- END Payment Display List -->
			</f7-card-content>
		</f7-card>

		<!-- ********************************   Popups ******************************-->

		<!-- Credit Card Popup -->
		<f7-popup class="credit-card-popup" :opened="ccPopupOpened" @popup:closed="ccPopupOpened = false">
			<f7-page>
				<f7-navbar title="Add Credit Card">
					<f7-nav-right>
						<f7-link popup-close>Close</f7-link>
					</f7-nav-right>
				</f7-navbar>
				<f7-block>
					<f7-card>
						<f7-card-content>
							<f7-list class="padding">
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Credit Card Number</p>
										<f7-list-input
											placeholder="#### #### #### ####"
											:value="creditCardForm.card_number_token"
											@input="creditCardForm.card_number_token = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<f7-row>
											<f7-col width="50">
												<p class="field-title">Exp Month</p>
												<f7-list-input
													placeholder="03"
													:value="creditCardForm.card_exp_month"
													@input="creditCardForm.card_exp_month = $event.target.value"
													type="text"
													class="datacom-input"
												></f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p class="field-title">Exp Year</p>
												<f7-list-input
													placeholder="2022"
													:value="creditCardForm.card_exp_year"
													@input="creditCardForm.card_exp_year = $event.target.value"
													type="text"
													class="datacom-input"
												></f7-list-input>
											</f7-col>
										</f7-row>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Name on Credit Card</p>
										<f7-list-input
											placeholder="Joe Smith"
											:value="creditCardForm.name_on_card"
											@input="creditCardForm.name_on_card = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">Contact Number</p>
										<f7-list-input
											placeholder="### ### ####"
											:value="creditCardForm.phone"
											@input="creditCardForm.phone = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="100">
										<p class="field-title">Billing Address</p>
										<f7-list-input
											placeholder="1 N. Main St."
											:value="creditCardForm.billing_address"
											@input="creditCardForm.billing_address = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Suite / Unit / Apt</p>
										<f7-list-input
											placeholder="Unit 100"
											:value="creditCardForm.billing_address2"
											@input="creditCardForm.billing_address2 = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">Zip</p>
										<f7-list-input
											placeholder="Unit 100"
											:value="creditCardForm.billing_zip"
											@input="creditCardForm.billing_zip = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="30">
										<p class="field-title">
											Country:
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											required
											:value="localeCities.creditcard_country_id"
											@input="getCreditCardStates($event, 'primary')"
											type="select"
											class="datacom-input"
										>
											<option
												v-for="country in GET_COUNTRY_LIST"
												:key="country.id"
												:value="country.id">
												{{ country.name }}
											</option>
										</f7-list-input>
									</f7-col>
									<f7-col width="30">
										<p class="field-title">State</p>
										<f7-list-input
											:value="localeCities.creditcard_state_id"
											@input="getCreditCardCities"
											type="select"
											class="datacom-input"
										>
											<option
												v-for="state in GET_STATE_LIST"
												:key="state.id"
												:value="state.id">
												{{ state.name }}
											</option>
										</f7-list-input>
									</f7-col>
									<f7-col width="30">
										<p class="field-title">City</p>
										<f7-list-input
											:value="creditCardForm.billing_city"
											@input="creditCardForm.billing_city = $event.target.value"
											type="select"
											class="datacom-input"
										>
											<option
												v-for="ccardcity in GET_CITY_LIST"
												:key="ccardcity.id"
												:value="ccardcity.name">
												{{ ccardcity.name }}
											</option>
										</f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<f7-col width="50">
										<f7-button class="margin" popup-close @click="addCreditCard">Add Credit Card</f7-button>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-card-content>
					</f7-card>
				</f7-block>
			</f7-page>
		</f7-popup>
		<!-- END Credit Card Popup -->

		<!-- ACH Popup -->
		<f7-popup class="ach-popup" :opened="achPopupOpened" @popup:closed="achPopupOpened = false">
			<f7-page>
				<f7-navbar title="ACH">
					<f7-nav-right>
						<f7-link popup-close>Close</f7-link>
					</f7-nav-right>
				</f7-navbar>
				<f7-block>
					<f7-card>
						<f7-card-content>
							<f7-list class="padding">
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Checking Account Number</p>
										<f7-list-input
											placeholder="0000000000"
											:value="achForm.account_number"
											@input="achForm.account_number = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">Routing Number</p>
										<f7-list-input
											placeholder="1221003456"
											:value="achForm.routing_number"
											@input="achForm.routing_number = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Name on Account</p>
										<f7-list-input
											placeholder="Joe Smith"
											:value="achForm.name_on_account"
											@input="achForm.name_on_account = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">Contact Number</p>
										<f7-list-input
											placeholder="### ### ####"
											:value="achForm.phone"
											@input="achForm.phone = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="100">
										<p class="field-title">Billing Address</p>
										<f7-list-input
											placeholder="1 N. Main St."
											:value="achForm.billing_address"
											@input="achForm.billing_address = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">Suite / Unit / Apt</p>
										<f7-list-input
											placeholder="Unit 100"
											:value="achForm.billing_address2"
											@input="achForm.billing_address2 = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">Zip</p>
										<f7-list-input
											placeholder="Unit 100"
											:value="achForm.billing_zip"
											@input="achForm.billing_zip = $event.target.value"
											type="text"
											class="datacom-input"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="30">
										<p class="field-title">
											Country:
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											required
											:value="localeCities.ach_country_id"
											@input="getACHStates($event, 'primary')"
											type="select"
											class="datacom-input"
										>
											<option
												v-for="country in GET_COUNTRY_LIST"
												:key="country.id"
												:value="country.id">
												{{ country.name }}
											</option>
										</f7-list-input>
									</f7-col>
									<f7-col width="30">
										<p class="field-title">State</p>
										<f7-list-input
											:value="localeCities.ach_state_id"
											@input="getACHCities"
											type="select"
											class="datacom-input"
										>
											<option 
												v-for="state in GET_STATE_LIST" 
												:key="state.id"
												:value="state.id">
												{{ state.name }}
											</option>
										</f7-list-input>
									</f7-col>
									<f7-col width="30">
										<p class="field-title">City</p>
										<f7-list-input
											:value="achForm.billing_city"
											@input="achForm.billing_city = $event.target.value"
											type="select"
											class="datacom-input"
										>
											<option 
												v-for="city in GET_CITY_LIST" 
												:key="city.id"
												:value="city.id">
												{{ city.name }}
											</option>
										</f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<f7-col width="50">
										<f7-button class="margin" popup-close @click="addACHAccount">Add Bank Account</f7-button>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-card-content>
					</f7-card>
				</f7-block>
			</f7-page>
		</f7-popup>
		<!-- END ACH Popup -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Mixins
import { LocaleMixins } from "../../mixins/businesses/locale-mixins";
import { UniversalMixins } from "@/mixins/universal-mixins";

export default {
	name: "creditCardComponent",
	mixins: [LocaleMixins, UniversalMixins],
	components: {},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Manage Popups and Modals
			ccPopupOpened: false,
			achPopupOpened: false,
			//Credit Card Form
			creditCardForm: {
				datacom: null,
				partner: null,
				company: null,
				user: null,
				date_added: null,
				is_primary: false,
				is_active: true,
				is_debit: false,
				name_on_card: null,
				card_number: null,
				card_number_token: null,
				card_cvv: null,
				billing_address: null,
				billing_address2: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				card_exp_date: null,
				card_exp_month: null,
				card_exp_year: null,
				phone: null,
				last4: null,
				card_type: null,
				is_datacom: true,
				is_partner: false,
				is_merchant: false,
				is_vendor: false
			},
			//ACH Form
			achForm: {
				datacom: null,
				partner: null,
				company: null,
				user: null,
				date_added: null,
				name_on_account: null,
				account_number: null,
				routing_number: null,
				bank_name: null,
				billing_address: null,
				billing_address2: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				last4: null,
				phone: null,
				is_primary: false,
				is_active: true,
				is_business_acct: true
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		},
		async addCreditCard() {
			console.log(" this.creditCardForm", this.creditCardForm);
			this.creditCardForm.billing_state = this.localeCities.creditcard_state_name;
			//Get Company ID
			let platformForm = await this.setUserPlatformPOST(this.creditCardForm);
			console.log("platformForm", platformForm);
			this.$store.dispatch("addCreditCard", platformForm);
		},
		makePrimaryCC() {},
		deleteCreditCard() {},
		async addACHAccount() {
			//Get Company ID
			this.achForm["datacom"] = this.Users.employeeProfile.datacom.id;
			this.achForm["url"] = "?datacom__id=" + this.Users.employeeProfile.datacom.id;
			console.log(" this.achForm", this.achForm);
			await this.$store.dispatch("addACHAccount", this.achForm);
			this.clearACHForm();
		},
		clearACHForm() {
			for (let index in this.achForm) {
				if (this.achForm[index] === true || this.achForm[index] === false) {
					// console.log('index', index);
					// console.log('this.achForm[index]', this.achForm[index]);
					this.achForm[index] = false;
				} else {
					this.achForm[index] = null;
				}
				//Reset variables to original state
				this.achForm.is_active = true;
			}
		},
		deleteACHAccount() {}
	},
	computed: {
		...mapState(["Locale", "VTHPP"]),
		...mapGetters(["GET_COUNTRY_LIST", "GET_STATE_LIST", "GET_CITY_LIST"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less">
</style>