<template>
	<div>

		<!--redit Cards -->
		<div class="flex justify-between m-2">
			<div class="md-headline">Credit Cards</div>
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
							<div class="col-25">
								<p class="label">Cardholder:</p>
							</div>
							<div class="col-75">
								<p class="field">{{ data.name_on_card }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-25">
								<p class="label">Address:</p>
							</div>
							<div class="col-75">
								<p class="field">{{ data.billing_address }} {{ data.billing_address2 }}</p>
								<p class="field">{{ data.billing_city }} {{ data.billing_state }}, {{ data.billing_zip }}</p>
								<p class="field">Phone: {{ data.phone }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-50">
								<DxButton
									type="warning raised"
									text="Edit"
									@click="testingMethod" />
							</div>
							<div class="col-50">
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
		<!--END Credit Cards -->

		<!--ACH Accounts -->
		<div class="divider"></div>

		<div class="flex justify-between m-2">
			<div class="md-headline">Bank Accounts</div>
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
							<div class="col-25">
								<p class="label">Cardholder:</p>
							</div>
							<div class="col-75">
								<p class="field">{{ data.name_on_card }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-25">
								<p class="label">Address:</p>
							</div>
							<div class="col-75">
								<p class="field">{{ data.billing_address }} {{ data.billing_address2 }}</p>
								<p class="field">{{ data.billing_city }} {{ data.billing_state }}, {{ data.billing_zip }}</p>
								<p class="field">Phone: {{ data.phone }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-50">
								<DxButton
									type="warning raised"
									text="Edit"
									@click="testingMethod" />
							</div>
							<div class="col-50">
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
				<div class="row">
					<div class="col-50">
						<p class="label">Credit Card Number</p>
						<DxTextBox 
							:mask-rules="expirationRules"
							mask="X0/00"
							:value.sync="creditCardForm.card_number"/>
					</div>
					<div class="col-50">
						<p class="label">Name of Cardholder</p>
					<DxTextBox 
						:mask-rules="phoneRules"
						mask="+1 (X00) 000-0000"
						:value.sync="creditCardForm.name_on_card"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Address</p>
						<DxTextBox :value.sync="creditCardForm.address"/>
					</div>
					<div class="col-50">
						<p class="label">Address 2</p>
						<DxTextBox :value.sync="creditCardForm.address2"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">City</p>
						<DxTextBox :value.sync="creditCardForm.city"/>
					</div>
					<div class="col-50">
						<p class="label">State</p>
						<DxTextBox :value.sync="creditCardForm.state"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Zip Code</p>
						<DxTextBox :value.sync="creditCardForm.zip"/>
					</div>
					<div class="col-50">
						<p class="label">Country</p>
						<DxDropDownBox
							:data-source="countries"
							:value.sync="creditCardForm.country"
							:opened.sync="isDropDownOpened">
							<DxList
								:items="countries"
								selection-mode="single"
								@selection-changed="changeShippingCountry($event)">
							</DxList>
					</DxDropDownBox>
					</div>
				</div>
				<div class="row">
					<div class="col-75">
						<p class="label">Instructions</p>
						<DxTextArea :value.sync="creditCardForm.instructions" placeholder="Type here..."/>
					</div>
					<div class="col-25">
						<p class="label">Make as Primary</p>
						<DxSwitch 
							@changed="creditCardForm.is_primary = !creditCardForm.is_primary"
							:value="creditCardForm.is_primary" />
					</div>
					
				</div>
				<div class="row justify-between mt4">
					<div class="col-25 text-center">
						<md-button class="md-raised text-white bg-danger">Delete</md-button>
					</div>
					<div class="col-25 text-center">
						<md-button @click="testingMethod" class="md-raised text-white bg-success">Save</md-button>
					</div>
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
				<div class="row">
					<div class="col-50">
						<p class="label">Credit Card Number</p>
						<DxTextBox 
							:mask-rules="expirationRules"
							mask="X0/00"
							:value.sync="creditCardForm.card_number"/>
					</div>
					<div class="col-50">
						<p class="label">Name of Cardholder</p>
					<DxTextBox 
						:mask-rules="phoneRules"
						mask="+1 (X00) 000-0000"
						:value.sync="creditCardForm.name_on_card"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Address</p>
						<DxTextBox :value.sync="creditCardForm.address"/>
					</div>
					<div class="col-50">
						<p class="label">Address 2</p>
						<DxTextBox :value.sync="creditCardForm.address2"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">City</p>
						<DxTextBox :value.sync="creditCardForm.city"/>
					</div>
					<div class="col-50">
						<p class="label">State</p>
						<DxTextBox :value.sync="creditCardForm.state"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Zip Code</p>
						<DxTextBox :value.sync="creditCardForm.zip"/>
					</div>
					<div class="col-50">
						<p class="label">Country</p>
						<DxDropDownBox
							:data-source="countries"
							:value.sync="creditCardForm.country"
							:opened.sync="isDropDownOpened">
							<DxList
								:items="countries"
								selection-mode="single"
								@selection-changed="changeShippingCountry($event)">
							</DxList>
					</DxDropDownBox>
					</div>
				</div>
				<div class="row">
					<div class="col-75">
						<p class="label">Instructions</p>
						<DxTextArea :value.sync="creditCardForm.instructions" placeholder="Type here..."/>
					</div>
					<div class="col-25">
						<p class="label">Make as Primary</p>
						<DxSwitch 
							@changed="creditCardForm.is_primary = !creditCardForm.is_primary"
							:value.sync="creditCardForm.is_primary" />
					</div>
					
				</div>
				<div class="row justify-between mt4">
					<div class="col-25 text-center">
						<md-button class="md-raised text-white bg-danger">Delete</md-button>
					</div>
					<div class="col-25 text-center">
						<md-button @click="testingMethod" class="md-raised text-white bg-success">Save</md-button>
					</div>
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

//Mixins
import { FormMixins } from "@/mixins/form-mixins.js"
import { LocaleMixins } from "@/mixins/locale-mixins"

export default {
	name: "paymentMethodsComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		DxAccordion,
		DxButton,
		DxTextBox,
		DxPopup,
		DxTextArea,
		DxDropDownBox,
		DxList,
		DxSwitch
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
				name_on_card: null,
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
			console.log('e', e);
		},
		getItemKeys: function(item) {
			return Object.keys(item);
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
</style>
