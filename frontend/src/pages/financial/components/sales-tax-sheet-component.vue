<template>
	<div>
		<f7-sheet class="sales-tax-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
					<f7-card>
						<f7-card-content>
							<f7-list class="padding">
								<f7-row>
									<f7-block-title class="classy-small">Tax Rate (City, State, + Local):</f7-block-title>
									<f7-col width="50">
										<p class="field-title">
											Name of Profile:
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											label="Name"
											type="text"
											placeholder="New York Sales Tax"
											info="The name of this database entry"
											error-message="This field is required"
											required
											validate
											pattern="[a-z A-z]*"
											clear-button
											:value="taxForm.name"
											@input="taxForm.name = $event.target.value">
										</f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">
											Agency Name:
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											label="State / Local Agency Name"
											type="text"
											placeholder="Arizona Department of Revenue"
											info="The name of the agency that you pay"
											error-message="Required Field"
											required
											validate
											pattern="[a-z A-Z]*"
											clear-button
											:value="taxForm.state_agency_name"
											@input="taxForm.state_agency_name = $event.target.value">
										</f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">
											State Rate (%):
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											label="Decimal Number"
											type="text"
											placeholder="4.69"
											info="The state tax rate"
											error-message="Please use a decimal format: 0.00 or 00.00"
											required
											validate
											pattern="[0-9]+(\.\d{1,2})"
											clear-button
											:value="taxForm.state_agency_rate"
											@input="taxForm.state_agency_rate = $event.target.value">
										</f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">
											Local Rate (%):
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											label="Decimal Number"
											type="text"
											placeholder="4.69"
											info="The city/local tax rate"
											error-message="Please use a decimal format: 0.00 or 00.00"
											required
											validate
											pattern="[0-9]+(\.\d{1,2})"
											clear-button
											:value="taxForm.local_tax_rate"
											@input="taxForm.local_tax_rate = $event.target.value">
										</f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50">
										<p class="field-title">
											Filing Frequency:
											<span style="color: red;">*</span>
										</p>
										<f7-list-input
											label="Frequency"
											type="select"
											placeholder="Monthly"
											info="How often are your taxes due"
											error-message="This field is required"
											required
											validate
											:value="taxForm.filing_frequency"
											@input="taxForm.filing_frequency = $event.target.value">
											<option value="Monthly">Monthly</option>
											<option value="Quarterly">Quarterly</option>
											<option value="Yearly">Yearly</option>
										</f7-list-input>
									</f7-col>
									<f7-col width="50">
										<p class="field-title">
											Enable Notifications:</p>
										<f7-list-item>
											<f7-toggle 
											:checked="taxForm.enable_notifications"
											@change="taxForm.enable_notifications = $event.target.checked"></f7-toggle>
										</f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row class="display-flex justify-content-end">
									<f7-col width="25">
										<f7-button fill @click="testButton">Test</f7-button>
									</f7-col>
									<f7-col width="25">
										<f7-button fill @click="saveTaxes">Save</f7-button>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-card-content>
					</f7-card>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
	</div>
</template>



<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";

//Components


export default {
	name: "salesTaxSheetComponent",
	components: {

	},
	mixins: [
		UniversalMixins,


		],
	props: {

	},
	data() {
		return {
			//Component Data
			//Main Data
			sheetOpened: false,
			has_current_settings: false,
			taxForm: {
        id: null,
        datacom: null,
        partner: null,
        company: null,
        name: null,
        state_agency_name: null,
        state_agency_rate: null,
        local_tax_rate: null,
        filing_frequency: null,
        enable_notifications: null,
			}

		};
	},
	methods: {
		async testButton(e) {
			console.log("this.taxForm", this.taxForm);
			console.log("this.Financial.salesTaxProfile", this.Financial.salesTaxProfile);


			//Testing Stuff
			const newtaxForm = {
        id: 24,
        datacom: 1,
        partner: null,
        company: null,
        name: "My new Tax Form",
        state_agency_name: "18:14:00",
        state_agency_rate: 45.24,
        local_tax_rate: [1,2],
        filing_frequency: "2020-06-16T22:41:15.070Z",
        enable_notifications: true,
			}
			for(let key in this.taxForm) {
				this.taxForm[key] = newtaxForm[key];
			}

			console.log("this.taxForm", this.taxForm);
		},
		async saveTaxes() {
			console.log("Save Taxes");
			let response = await this.setUserPlatformPOST(this.taxForm);
			console.log("response", response);

			this.$store.dispatch('POSTSalesTax', response);
		},
		retrieveAndMountData() {
			if(this.HAS_SALES_TAX_PROFILE) {
				console.log("There are settings");
				this.has_current_settings = this.HAS_SALES_TAX_PROFILE;

				for(let key in this.taxForm) {
					this.taxForm[key] = this.Financial.salesTaxProfile[key];
				}

			}
		}


	},
	computed: {
		...mapState(["Financial"]),
		...mapGetters(["HAS_SALES_TAX_PROFILE"])

	},
	created() {
		this.retrieveAndMountData();
	},
	async mounted() {
		console.log("The Tax Sheet has been Mounted!");
		
	}
};
</script>

<style scoped lang="scss">
.sales-tax-sheet {
	height: 100%;
}
</style>
