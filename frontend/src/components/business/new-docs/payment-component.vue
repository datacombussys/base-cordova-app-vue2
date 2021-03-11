<template>
	<div>

		<!--Credit Cards -->
		<div class="flex justify-between m-2">
			<div class="headline">Credit Cards</div>
			<div>
				<DxButton
					width="100%"
					type="datacom"
					text="Add New Method"
					@click="popupVisible = !popupVisible" />
			</div>
		</div>
		<div id="accordion">
			<DxAccordion
        :data-source="accordionData"
        item-template="item">
        <template #item="{ data }">
					<div>
						<div class="container">
							<div class="row">
								<div class="col-25p">
									<p class="label">Cardholder:</p>
								</div>
								<div class="col-75p">
									<p class="field">{{ data.name_on_card }}</p>
								</div>
							</div>
							<div class="row">
								<div class="col-25p">
									<p class="label">Address:</p>
								</div>
								<div class="col-75p">
									<p class="field">{{ data.billing_address }} {{ data.billing_address2 }}</p>
									<p class="field">{{ data.billing_city }} {{ data.billing_state }}, {{ data.billing_zip }}</p>
									<p class="field">Phone: {{ data.phone }}</p>
								</div>
							</div>
							<div class="row pt-4 justify-end">
								<div class="col-3 justify-center">
									<DxButton
										width="100%"
										type="warning raised"
										text="Edit"
										@click="testingMethod" />
								</div>
								<div class="col-3 justify-center">
									<DxButton
										width="100%"
										type="success"
										text="Make Primary"
										@click="testingMethod" />
								</div>
							</div>
						</div>
						
					</div>
        </template>
    	</DxAccordion>
		</div>
		<!--END Credit Cards -->

		<!--ACH Accounts -->
		<div class="divider"></div>

		<div class="flex justify-between m-2">
			<div class="headline">Bank Accounts</div>
			<div>
				<DxButton
					width="100%"
					type="datacom"
					text="Add New Method"
					@click="popupVisible = !popupVisible" />
			</div>
		</div>
		<div id="accordion">
			<DxAccordion
        :data-source="accordionData"
        item-template="item">
        <template #item="{ data }">
					<div>
						<div class="row">
							<div class="col-25p">
								<p class="label">Cardholder:</p>
							</div>
							<div class="col-75p">
								<p class="field">{{ data.name_on_card }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-25p">
								<p class="label">Address:</p>
							</div>
							<div class="col-75p">
								<p class="field">{{ data.billing_address }} {{ data.billing_address2 }}</p>
								<p class="field">{{ data.billing_city }} {{ data.billing_state }}, {{ data.billing_zip }}</p>
								<p class="field">Phone: {{ data.phone }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<DxButton
									type="warning raised"
									text="Edit"
									@click="testingMethod" />
							</div>
							<div class="col-50p">
								<DxButton
									type="success"
									text="Make Primary"
									@click="testingMethod" />
							</div>
						</div>
					</div>
        </template>
    	</DxAccordion>
		</div>
		<!--END ACH Accounts -->

		<!--Credit Card Popup-->
		<template>
			<DxPopup
				:visible.sync="popupVisible"
				:drag-enabled="true"
				:close-on-outside-click="false"
				:show-title="true"
				width="60%"
				height="60%"
				title="New Credit Card"
			>
			<div class="container">
				<v-card 	
					class="p-4">
					<DxScrollView
						id="paymentScrollview"
						ref="paymentScrollviewWidget"
						show-scrollbar="always"
						:height="425"
					>
						<div class="row">
							<div class="headline-6 w-full">
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
											v-model="creditCardForm.card_number"
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
											:value.sync="creditCardForm.card_exp_date"
											@input="creditCardForm.card_exp_date = $event.event.target.value"
											:mask-rules="expRules"
											mask="X0/00"
											class="custom-exp"
											max-length="4"
										/>
										<div class="date-plcaceholder">
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
											v-model="creditCardForm.card_cvv"
											placeholder="123"
											max-length="4"
											class="cvv-field"
										/>
									</fieldset>
								</div>
							</div>
						</div>
						<div class="headline-6 w-full pt-8">
							Cardholder Details
							<v-divider></v-divider>
						</div>
						<div class="row">
							<div class="col-6 p-0">
								<div class="dx-field">
									<div class="dx-field-label">First Name</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="mainData.ssl_first_name"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-6 p-0">
								<div class="dx-field">
									<div class="dx-field-label">Last Name</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="mainData.last_name"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>	
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Address</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="accountData.ssl_avs_address"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Address 2</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="accountData.ssl_address2"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">City</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="accountData.ssl_city"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">State</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="accountData.ssl_state"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Zip Code</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="accountData.ssl_avs_zip"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Country</div>
									<div class="dx-field-value">
										<v-select
											v-model="accountData.ssl_country"
											:items="countries"
										></v-select>
									</div>
								</div>
							</div>
						</div>
						<div class="row justify-end mt-4">
							<div class="col-25p">
								<p class="label">Make as Primary</p>
								<DxSwitch 
									@changed="creditCardForm.is_primary = !creditCardForm.is_primary"
									:value="creditCardForm.is_primary" />
							</div>
							<div class="col-25p text-center">
								<DxButton
									:width="150"
									text="Test"
									type="warning"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
							</div>
							<div class="col-25p text-center">
								<DxButton
									:width="150"
									text="Cancel"
									type="warning"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="cancel">
								</DxButton>
							</div>
							<div class="col-25p text-center">
								<DxButton
									:width="150"
									text="Save"
									type="success"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="createCreditCard">
								</DxButton>
							</div>
						</div>
					</DxScrollView>
				</v-card>
			</div>

				
			</DxPopup>
		</template>
		<!--END Credit Card Popup-->

		<!--ACH Popup-->
		<template>
			<DxPopup
				:visible.sync="popupVisible"
				:drag-enabled="true"
				:close-on-outside-click="false"
				:show-title="true"
				width="60%"
				height="60%"
				title="New Credit Card"
			>
			<div class="container">
				<v-card 	
					class="p-4">
					<DxScrollView
						id="shippingScrollview"
						ref="shippingScrollviewWidget"
						show-scrollbar="always"
						:height="425"
					>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Account Owner Name</div>
									<div class="dx-field-value">
										<v-text-field
											type="number"
											v-model="creditCardForm.name"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Account Name</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.name_on_card"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Account Number</div>
									<div class="dx-field-value">
										<v-text-field
											type="number"
											v-model="creditCardForm.account_number"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Routing Number</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.name_on_card"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Address</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.billing_address"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Address 2</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.billing_address2"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">City</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.billing_city"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">State</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.billing_state"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Zip Code</div>
									<div class="dx-field-value">
										<v-text-field
											type="text"
											v-model="creditCardForm.billing_zip"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Country</div>
									<div class="dx-field-value">
										<v-select
											:items="countries"
										></v-select>
									</div>
								</div>
							</div>
						</div>
						<div class="row justify-end mt-4">
							<div class="col-25p">
								<p class="label">Make as Primary</p>
								<DxSwitch 
									@changed="creditCardForm.is_primary = !creditCardForm.is_primary"
									:value="creditCardForm.is_primary" />
							</div>
							<div class="col-25p text-center">
								<DxButton
									:width="150"
									text="Cancel"
									type="danger"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="cancel">
								</DxButton>
							</div>
							<div class="col-25p text-center">
								<DxButton
									:width="150"
									text="Save"
									type="success"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="createACHAccount">
								</DxButton>
							</div>
						</div>
					</DxScrollView>
				</v-card>
			</div>

				
			</DxPopup>
		</template>
		<!--END ACH Popup-->
		

	</div>
</template>

<script>
import { mapState } from "vuex";

import DxAccordion from "devextreme-vue/accordion";
import DxButton from "devextreme-vue/button"
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxPopup } from 'devextreme-vue/popup';
import { DxTextArea } from 'devextreme-vue/text-area';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import DxSwitch from 'devextreme-vue/switch';
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Mixins
import { FormMixins } from "@/mixins/form-mixins.js"
import { LocaleMixins } from "@/mixins/locale-mixins"
import { UniversalMixins } from "@/mixins/universal-mixins"
import { ElavonConvergeMixins } from "@/mixins/credit-card/elavon-converge-mixin"




export default {
	name: "paymentMethodsComponent",
	mixins: [
		FormMixins,
		LocaleMixins,
		UniversalMixins,
		ElavonConvergeMixins
	],
	components: {
		DxAccordion,
		DxButton,
		DxTextBox,
		DxPopup,
		DxTextArea,
		DxDropDownBox,
		DxList,
		DxSwitch,
		DxScrollView
	},
	props: {
		formData: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			//Popup
			popupVisible: false,
			isDropDownOpened: false,
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
				name_on_card: "Ian Christensen",
				first_name: "Ian",
				last_name: "Christensen",
				card_number: "4159288888888882",
				card_number_token: null,
				card_cvv: "912",
				billing_address: "1 Main St",
				billing_address2: "Ste.155",
				billing_city: "Phoenix",
				billing_state: "AZ",
				billing_zip: '85355',
				billing_country: "United States",
				card_exp_date: '0125',
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
				is_primary: false,
				is_active: true,
				is_debit: false,
				name_on_card: null,
				account_number: null,
				account_number_token: null,
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
			//Accordion Settings
			accordionData: [
				{
				title: "MasterCard ending in 4523",
				name_on_card: "John Do",
				is_primary: "false",
				billing_address: "3 W. Main St",
				billing_address2: "Ste. 12",
				billing_city: "Phoenix",
				billing_state: "AZ",
				billing_zip: "85325",
				phone: "480-424-2345",
			}, {
				title: "MasterCard ending in 4523",
				name_on_card: "John Do",
				is_primary: "false",
				billing_address: "3 W. Main St",
				billing_address2: "Ste. 12",
				billing_city: "Phoenix",
				billing_state: "AZ",
				billing_zip: "85325",
				phone: "480-424-2345",
			}, 
			{
				title: "MasterCard ending in 4523",
				name_on_card: "John Do",
				is_primary: "false",
				billing_address: "3 W. Main St",
				billing_address2: "Ste. 12",
				billing_city: "Phoenix",
				billing_state: "AZ",
				billing_zip: "85325",
				phone: "480-424-2345",
			}, 
			{
				title: "MasterCard ending in 4523",
				name_on_card: "John Do",
				is_primary: "false",
				billing_address: "3 W. Main St",
				billing_address2: "Ste. 12",
				billing_city: "Phoenix",
				billing_state: "AZ",
				billing_zip: "85325",
				phone: "480-424-2345",
			}, 
			]
			
		};
	},

	methods: {
		testingMethod(e) {
			console.log('this.creditCardForm', this.creditCardForm);
		},
		getItemKeys: function(item) {
			return Object.keys(item);
		},
		cancel() {
			this.popupVisible = false
		},
		async createCreditCard() {
			var newCCForm = JSON.parse(JSON.stringify(this.creditCardForm))

			newCCForm.card_exp_month = this.creditCardForm.card_exp_date.slice(0,2)
			newCCForm.card_exp_year = "20".concat("", this.creditCardForm.card_exp_date.slice(2,4))
			newCCForm.card_exp_date = null;

			let form = await this.setUserPlatformPOST(newCCForm)
			this.$store.dispatch("POSTCreditCard", form)
		},
		async createACHAccount() {
			let form = await this.setUserPlatformPOST(this.achForm)
			this.$store.dispatch("POSTACHAccount", form)
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
@import "../../../assets/sass/variables.scss";

#accordion h1 {
  font-size: 20px;
}

#accordion h1,
#accordion p {
  margin: 0;
}

.dx-theme-material #accordion .dx-accordion-item-opened .dx-accordion-item-title {
  display: flex;
}

.dx-theme-material #accordion .dx-accordion-item-opened h1 {
  align-self: center;
}

.options,
.selected-data {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.selected-data {
  position: relative;
  height: 36px;
}

.selected-data > .caption {
  position: relative;
  top: 5px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 115%;
}

.selected-data > .dx-widget {
  position: absolute;
  left: 140px;
  right: 20px;
  top: 20px;
}

.options > .caption {
  font-weight: 500;
  font-size: 18px;
}

.option {
  margin-top: 10px;
}
.date-plcaceholder {
	position: relative;
	left: 10px;
	top: -15px;
	font-size: $base-font-size *.8;
	opacity: 0.5;
	height: 10px;
}
</style>
