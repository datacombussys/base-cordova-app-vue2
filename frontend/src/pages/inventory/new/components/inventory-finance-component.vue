<template>
	<div>
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Pricing</div>
				<div class="field-row">

					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Purchase Price</div>
							<div class="flex dx-field-value justify-center">
								<v-text-field
									color="orange darken-4"
									:step="0.01"
									prefix="$"
									type="number"
									placeholder="5.00"
									:disabled="!inventorySettings.editProfile"
									v-model="formData.purchase_price"
								></v-text-field>
								<!-- <DxNumberBox
									placeholder="$ 50.00"
									format="$ #,##0.##"
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.purchase_price"
									:step="0.01"
									:show-spin-buttons="true"
								/> -->
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">List Price</div>
							<div class="flex dx-field-value justify-center">
								<v-text-field
									color="orange darken-4"
									:step="0.01"
									prefix="$"
									type="number"
									placeholder="15.00"
									:disabled="!inventorySettings.editProfile"
									v-model="formData.list_price"
								></v-text-field>
								<!-- <DxNumberBox
									placeholder="$ 100.00"
									format="$ #,##0.##"
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.list_price"
									:step="0.01"
									:show-spin-buttons="true"
								/> -->
							</div>
							<p class="margin-text">Retail Margin: 45%</p>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Whosesale Price</div>
							<div class="flex dx-field-value justify-center">
								<v-text-field
									color="orange darken-4"
									:step="0.01"
									prefix="$"
									type="number"
									placeholder="10.00"
									:disabled="!inventorySettings.editProfile"
									v-model="formData.wholesale_price"
								></v-text-field>
								<!-- <DxNumberBox
									placeholder="$ 75.00"
									format="$ #,##0.##"
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.wholesale_price"
									:step="0.01"
									:show-spin-buttons="true"
								/> -->
							</div>
							<p class="margin-text">Wholesale Margin: 45%</p>
						</div>
					</div>
					

				</div>
			</div>
		</template>
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">On-Sale Details</div>
				<div class="row">
					<div class="col-50p">
						<div class="dx-field">
							<div class="dx-field-label">Is On-Sale?</div>
							<div class="flex dx-field-value justify-center">
								<DxSwitch 
								v-model="formData.is_on_sale"
								:disabled="!inventorySettings.editProfile" />
							</div>
						</div>
					</div>
					<div class="col-50p">
						<div class="dx-field">
							<div class="dx-field-label">On-Sale Price</div>
							<div class="dx-field-value">
								<DxNumberBox
									placeholder="$ 85.00"
									format="$ #,##0.##"
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.sale_price"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
							<p class="margin-text">On-Sale Margin: 15%</p>
						</div>
					</div>
					<div class="col-50p">
						<div class="dx-field">
							<div class="dx-field-label">Expiration Date?</div>
							<div class="flex dx-field-value justify-center">
								<DxSwitch 
									v-model="set_expiration_date"
									:disabled="!inventorySettings.editProfile" />
							</div>
						</div>
					</div>
					<div class="col-50p">
						<div class="dx-field">
							<div class="dx-field-label">Set Date</div>
							<div class="flex dx-field-value justify-center">
									<DxDateBox
										:disabled="!set_expiration_date"
										:min="min"
										apply-value-mode="useButtons"
										@value-changed="changedSaleDate"
									/>
							</div>
						</div>
					</div>

				</div>
			</div>
		</template>

		<!-- Accounting -->
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Accounting</div>
				<div class="field-row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Income Account</div>
							<div class="flex dx-field-value justify-center">
								<DxDropDownBox
									:disabled="!inventorySettings.editProfile"
									:data-source="Accounting.incomeAccountsList"
									:value.sync="incomeAccount"
									placeholder="Select a value..."
									display-expr="name"
									@value-changed="selectedIncomeAcct($event)"
								>
									<DxList
										:data-source="Accounting.incomeAccountsList"
										:height="400"
										:selected-items.sync="incomeAccount"
										selection-mode="single"
										display-expr="name"
									/>
								</DxDropDownBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Expense Account</div>
							<div class="flex dx-field-value justify-center">
								<DxDropDownBox
									:disabled="!inventorySettings.editProfile"
									:data-source="Accounting.expenseAccountsList"
									:value.sync="expenseAccount"
									placeholder="Select a value..."
									display-expr="name"
									@value-changed="selectedExpenseAcct($event)"
								>
									<DxList
										:data-source="Accounting.expenseAccountsList"
										:height="400"
										:selected-items.sync="expenseAccount"
										selection-mode="single"
										display-expr="name"
									/>
								</DxDropDownBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Is Taxable</div>
							<div class="flex dx-field-value justify-center">
								<DxSwitch 
									v-model="formData.is_taxable"
									:disabled="!inventorySettings.editProfile" />
							</div>
						</div>
					</div>
				

				</div>
			</div>
		</template>


	</div>
</template>

<script>
import { mapState } from "vuex";
import DxNumberBox from 'devextreme-vue/number-box';
import { DxSwitch } from 'devextreme-vue/switch';
import DxTextBox from 'devextreme-vue/text-box';
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
} from 'devextreme-vue/validator';
import DxDateBox from 'devextreme-vue/date-box';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';

export default {
	name: "inventoryFinanceComponent",
	mixins: [],
	components: {
		DxTextBox,
    DxButton,
    DxValidator,
    DxRequiredRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
		DxValidationSummary,
		DxSwitch,
		DxNumberBox,
		DxDateBox,
		DxDropDownBox,
		DxList
	},
	props: {
		inventorySettings: {
			type: Object,
			required: true
		},
		formData: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			now: new Date(),
			min: new Date(),
			//Dropdowns
			incomeAccount: [],
			expenseAccount: [],
			set_expiration_date: false,
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		changedSaleDate(e) {
			console.log("handle sale date e", e)
			let newDate = e.value
			let ISODate = newDate.toISOString()
			let djangoTime = ISODate.split('T')[0]
			this.formData.sale_expire_date = djangoTime
		},
		selectedIncomeAcct(e) {
			console.log("selectedIncomeAcct e", e)
		},
		selectedExpenseAcct(e) {
			console.log("selectedExpenseAcct e", e)
		}
	},
	computed: {
		...mapState(["Accounting"])
	},
	created() {},
	mounted() {}
};
</script>

<style lang="scss">
.margin-text {

	font-size: 0.75em;
}
</style>
