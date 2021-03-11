<template>
	<div>

		<template>
			<displayFieldsComponent :formData="formData" :accountSettings="accountSettings"/>
		</template>
		<template>
			<DxValidationSummary id="summary"/>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Employee Details</div>
				<div class="row">

					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">First Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.user_obj.first_name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="The name should not contain numbers or special characters"
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
									:value.sync="formData.user_obj.last_name">
									<DxValidator>
										<DxRequiredRule message="Last Name is required"/>
										<DxPatternRule
											pattern="^[a-zA-Z ]+$"
											message="The name should not contain numbers or special characters"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Date of Birth</div>
							<div class="dx-field-value">
								<DxDateBox
									:disabled="!accountSettings.editProfile"
									type="date"
									:value="formData.dob"
									@value-changed="dobDateChanged"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">SSN</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="ssnRules"
									mask="X00-00-0000"
									:value.sync="formData.ssn">>
									<DxValidator>
										<DxRequiredRule message="Social security number is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Mobile Phone</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.user_obj.mobile_phone">
									<DxValidator>
										<DxRequiredRule message="Mobile Phone is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Work Phone</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:mask-rules="phoneRules"
									mask="+1 (X00) 000-0000"
									:value.sync="formData.work_phone">
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
									:value.sync="formData.user_obj.fax">
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
									:value.sync="formData.user_obj.email">
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
							<div class="dx-field-label">Hire Date</div>
							<div class="dx-field-value">
								<DxDateBox
									:disabled="!accountSettings.editProfile"
									type="date"
									:value="new Date()"
									@value-changed="hireDateChanged"
								/>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="dx-field">
							<div class="dx-field-label">About Me</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.user_obj.bio">
									<DxValidator>
										<DxRequiredRule message="Website is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Termination Date</div>
							<div class="dx-field-value">
								<DxDateBox
									:disabled="!accountSettings.termination_date"
									type="date"
									:value="formData.closure_date"
									@value-changed="terminationDateChanged"
								/>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Address Information</div>
				<div class="row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Address</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="formData.address">
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
									:value.sync="formData.address2">
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
									:value.sync="formData.city">
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
									:value.sync="formData.state">
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
									:value.sync="formData.zip">
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
									@value-changed="dxDropdownSelection($event)"
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

				</div>
			</div>
		</template>

		<template>
			<div class="dx-fieldset">
				<setPasswordComponent
					:accountSettings="accountSettings"
					:loginForm="formData">
				</setPasswordComponent>
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


//Data Import
import {countries} from "@/js/countries"
//Components
import displayFieldsComponent from "@/components/employees/display-datafields-component"
import setPasswordComponent from "@/components/universal/logging-in/new/set-password-component"
//Mixins
import { FormMixins } from "@/mixins/form-mixins"
import { LocaleMixins } from "@/mixins/locale-mixins"


export default {
	name: "employeeProfileComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		setPasswordComponent,
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
		const currentDate = new Date();
		return {
			//Form Settings
			isDropDownBoxOpened: false,
		
		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.accountSettings.editProfile', this.accountSettings.editProfile)

		},
		dxDropdownSelection(e) {
			console.log('changeDropDownBoxValue e', e)
			this.formData.country = e.value[0]
			e.component.close()
		},
		asyncValidation(params) {
			console.log('params', params)
      // return sendRequest(params.value);
		},
		hireDateChanged(e) {
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.hire_date = djangoTime
		},
		terminationDateChanged(e) {
			// console.log('closeDateChanged e', e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.termination_date = djangoTime
		},
		dobDateChanged(e) {
			// console.log('closeDateChanged e', e)
			let newDate = e.value
			// console.log('neewData', newDate)
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.user_obj.dob = djangoTime
		}
	},
	computed: {
		...mapState([]),
	},
	created() {},
	mounted() {

	}
}
</script>

<style lang="scss">

</style>
