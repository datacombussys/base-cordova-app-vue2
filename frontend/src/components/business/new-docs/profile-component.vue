<template>
	<div>

		<template>
			<displayFieldsComponent :formData="formData"/>
		</template>
		<template>
			<DxValidationSummary id="summary"/>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Profile Details</div>
				<div class="row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Dba Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.dba_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
										<DxRequiredRule message="DBA name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
						<div class="dx-field-label">Legal Name</div>
							<div class="dx-field-value">
								<DxTextBox
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.legal_name">
									<DxValidator>
										<DxRequiredRule message="Legal Name is required"/>
										<DxPatternRule
											pattern="^[A-z0-9]*((-|\s)*[,A-z0-9.])*$"
											message="No Special Characters"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Domain</div>
							<div class="dx-field-value">
								<DxTextBox 
									placeholder="shortname"
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.domain">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-z0-9]+$"
											message="Number and letters only (lowercase)"
										/>
										<DxRequiredRule message="Domain is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Website</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.website" placeholder="www.domain.org">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
										<DxPatternRule
											pattern="(http://|)(www\.)?([^\.]+)\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$"
											message="Please enter a valid web address"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Tax Id</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="taxIdRules"
									mask="X0-0000000"
									:value.sync="formData.tax_id">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Resale Id</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.resale_id">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Board Date</div>
							<div class="dx-field-value">
								<DxDateBox
									:disabled="!accountSettings.editProfile"
									type="date"
									:value="new Date()"
									@value-changed="boardDateChanged"
								/>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="dx-field">
							<div class="dx-field-label">Description</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.description">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Closure Date</div>
							<div class="dx-field-value">
								<DxDateBox
									:disabled="!accountSettings.editProfile"
									type="date"
									:value="formData.closure_date"
									@value-changed="closeDateChanged"
								/>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="dx-field">
							<div class="dx-field-label">Closure Reason</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.closure_reason">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Primary Contact</div>
				<div class="row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">First Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.primary_first_name">
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
									:value.sync="formData.primary_last_name">
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
									:value.sync="formData.primary_email">
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
									:value.sync="formData.primary_mailing_address">
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
									:value.sync="formData.primary_mailing_address_2">
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
									:value.sync="formData.primary_mailing_city">
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
									:value.sync="formData.primary_mailing_state">
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
									:value.sync="formData.primary_mailing_zip">
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
									:value.sync="country"
									placeholder="Select a value..."
									@value-changed="primaryDropdownChange($event)"
								>
									<DxList
										:data-source="countries"
										:height="400"
										:selected-items.sync="country"
										selection-mode="single"
									/>
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
									:value.sync="formData.primary_phone">
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
									:value.sync="formData.primary_fax">
								</DxTextBox>
							</div>
						</div>
					</div>
					

				</div>
			</div>
		</template>


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

import DxTextBox from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxButton from 'devextreme-vue/button';
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

//Components
import displayFieldsComponent from "@/components/business/new-docs/display-fields-component"
//Mixins
import { FormMixins } from "@/mixins/form-mixins"
import { LocaleMixins } from "@/mixins/locale-mixins"

export default {
	name: "companyProfileComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		displayFieldsComponent,
		//New form items
    DxTextBox,
    DxDateBox,
    DxButton,
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxAsyncRule,
		DxValidationSummary,
		DxDropDownBox,
		DxList,
		
	},
	props: {
		accountSettings: {
			type: Object,
			required: true
		},
		formData: {
			type: Object,
			required: true
		},
	},
	data() {
		const currentDate = new Date();
		return {
			//Form Settings
			isDropDownBoxOpened: false,
			
		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.accountSettings.editProfile')

		},
		primaryDropdownChange(e) {
			console.log('changeDropDownBoxValue e', e)
			this.formData.primary_mailing_country = e.value[0];
			e.component.close()
		},
		asyncValidation(params) {
			console.log('params', params)
      // return sendRequest(params.value);
		},
		boardDateChanged(e) {
			// console.log('boardDateChanged e', e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.board_date = djangoTime
		},
		closeDateChanged(e) {
			// console.log('closeDateChanged e', e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.closure_date = djangoTime
		}
	},
	computed: {
		...mapState([]),
	},
	created() {},
	mounted() {
		let container = document.getElementById("drop-down-menu")
		console.log('container', container)



	}
}
</script>

<style lang="scss">

</style>
