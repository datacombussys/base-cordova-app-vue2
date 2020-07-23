	<template>
	<div>

		<!-- Shipping Contact -->
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Shipping Contact</div>
				<div class="row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">First Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_first_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="First name should not contain numbers or special characters"
										/>
										<DxRequiredRule message="First name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
						<div class="dx-field-label">Last Name</div>
							<div class="dx-field-value">
								<DxTextBox
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_last_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="Last name should not contain numbers or special characters"
										/>
										<DxRequiredRule message="Last name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Email</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_email">
									<DxValidator>
										<DxRequiredRule message="Email is required"/>
										<DxEmailRule message="Email is invalid"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Address</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_mailing_address">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9,. ]+$"
											message="Address should not contain special characters"
										/>
										<DxRequiredRule message="Address is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Address 2</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_mailing_address_2">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9,. ]+$"
											message="Address 2 should not contain special characters"
										/>
										<DxRequiredRule message="Address is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">City</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_mailing_city">
									<DxValidator>
										<DxRequiredRule message="City is required"/>
										<DxPatternRule
											pattern="^[A-z0-9]*((-|\s)*[A-z0-9])*$"
											message="City should not contain special characters"
										/>
										
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">State</div>
							<div class="dx-field-value">
								<DxTextBox  
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.shipping_mailing_state">
									<DxValidator>
										<DxRequiredRule message="State is required"/>
										<DxPatternRule
											pattern="^[A-Za-z]{2}$"
											message="2 Letter State abbreviation"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Zip Code</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									mask="00000" 
									:value.sync="formData.shipping_mailing_zip">
									<DxValidator>
										<DxRequiredRule message="Zip code is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Country</div>
							<div id="drop-down-menu" class="dx-field-value">
								<DxDropDownBox
									:disabled="!accountSettings.editProfile"
									:data-source="countries"
									:value.sync="formData.shipping_mailing_country"
									:opened.sync="isShippingDropDownOpened">
									<DxList
										:items="countries"
										selection-mode="single"
										@selection-changed="changeShippingCountry($event)">
									</DxList>
							</DxDropDownBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Phone</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.shipping_phone">
									<DxValidator>
										<DxRequiredRule message="Phone is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Fax</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.shipping_fax">
								</DxTextBox>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- END Shipping Contact -->
		<!-- Billing Contact -->
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Billing Contact</div>
				<div class="row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">First Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_first_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="First name should not contain numbers or special characters"
										/>
										<DxRequiredRule message="First name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
						<div class="dx-field-label">Last Name</div>
							<div class="dx-field-value">
								<DxTextBox
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_last_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="Last name should not contain numbers or special characters"
										/>
										<DxRequiredRule message="Last name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Email</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_email">
									<DxValidator>
										<DxRequiredRule message="Email is required"/>
										<DxEmailRule message="Email is invalid"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Address</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_mailing_address">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9,. ]+$"
											message="Address should not contain special characters"
										/>
										<DxRequiredRule message="Address is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Address 2</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_mailing_address_2">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9,. ]+$"
											message="Address 2 should not contain special characters"
										/>
										<DxRequiredRule message="Address is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">City</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_mailing_city">
									<DxValidator>
										<DxRequiredRule message="City is required"/>
										<DxPatternRule
											pattern="^[A-z0-9]*((-|\s)*[A-z0-9])*$"
											message="City should not contain special characters"
										/>
										
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">State</div>
							<div class="dx-field-value">
								<DxTextBox  
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.billing_mailing_state">
									<DxValidator>
										<DxRequiredRule message="State is required"/>
										<DxPatternRule
											pattern="^[A-Za-z]{2}$"
											message="2 Letter State abbreviation"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Zip Code</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									mask="00000" 
									:value.sync="formData.billing_mailing_zip">
									<DxValidator>
										<DxRequiredRule message="Zip code is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Country</div>
							<div id="drop-down-menu" class="dx-field-value">
								<DxDropDownBox
									:disabled="!accountSettings.editProfile"
									:data-source="countries"
									:value.sync="formData.billing_mailing_country"
									:opened.sync="isBillingDropDownOpened">
									<DxList
										:items="countries"
										selection-mode="single"
										@selection-changed="changeBillingCountry($event)">
									</DxList>
							</DxDropDownBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Phone</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.billing_phone">
									<DxValidator>
										<DxRequiredRule message="Phone is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Fax</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.billing_fax">
								</DxTextBox>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- END Billing Contact -->

	
		<template>
			<div class="w-full">
				<DxButton
					class="w-full"
					text="Test Button"
					@click="testingMethod" />
			</div>
		</template>
 

	</div>
</template>

<script>
import { mapState } from "vuex";
import DxButton from "devextreme-vue/button";
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule
} from 'devextreme-vue/validator';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import DxTextBox from 'devextreme-vue/text-box';

//Mixins
import { FormMixins } from "@/mixins/form-mixins.js"
import { LocaleMixins } from "@/mixins/locale-mixins.js"

export default {
	name: "contactsComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		DxValidationSummary,
		DxValidator,
		DxRequiredRule,
		DxCompareRule,
		DxEmailRule,
		DxPatternRule,
		DxStringLengthRule,
		DxRangeRule,
		DxAsyncRule,
		DxDropDownBox,
		DxList,
		DxTextBox,
		DxButton,

	},
	props: {
		formData: {
			type: Object,
			required: true
		},
		accountSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Form Settings
			isBillingDropDownOpened: false,
			isShippingDropDownOpened: false,
		
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
			this.readOnly = ! this.readOnly
		},
		changeBillingCountry(e) {
			console.log('changeBillingCountry e', e)
			this.formData.billing_mailing_country = e.addedItems[0];
			this.isBillingDropDownOpened = false;
		},
		changeShippingCountry(e) {
			console.log('changeShippingCountry e', e)
			this.formData.shipping_mailing_country = e.addedItems[0];
			this.isShippingDropDownOpened = false;
		},
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
