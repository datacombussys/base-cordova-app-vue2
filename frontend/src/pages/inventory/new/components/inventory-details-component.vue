<template>
	<div>
		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Inventory Details</div>
				<div class="field-row">

					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Track Inventory</div>
							<div class="flex dx-field-value justify-center">
								<DxSwitch 
								v-model="formData.is_tracked"
								:disabled="!inventorySettings.editProfile" />
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Initial Quantity</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.initial_qty"
									:step="1"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Reorder Level</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.reorder_level"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Weight</div>
				<div class="field-row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Weight</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.weight"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Unit of Measure</div>
							<div class="dx-field-value">
								<DxDropDownBox
									:disabled="!inventorySettings.editProfile"
									:data-source="Static.UOMWeight"
									:value.sync="selectedUOMWeight"
									placeholder="Select a value..."
									display-expr="name"
									@value-changed="selectedUOMWeightDropdown($event)"
								>
									<DxList
										:data-source="Static.UOMWeight"
										:height="400"
										:selected-items.sync="selectedUOMWeight"
										selection-mode="single"
										display-expr="name"
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
				<div class="dx-fieldset-header">Dimensions</div>
				<div class="field-row">
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Width</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.width"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Length</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.length"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Height</div>
							<div class="dx-field-value">
								<DxNumberBox
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.height"
									:step="0.01"
									:show-spin-buttons="true"
								/>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Unit of Measure</div>
							<div class="dx-field-value">
								<DxDropDownBox
									:disabled="!inventorySettings.editProfile"
									:data-source="Static.UOMDimension"
									:value.sync="selectedUOMDimension"
									placeholder="Select a value..."
									display-expr="name"
									@value-changed="selectedUOMDimensionDropdown($event)"
								>
									<DxList
										:data-source="Static.UOMDimension"
										:height="400"
										:selected-items.sync="selectedUOMDimension"
										selection-mode="single"
										display-expr="name"
									/>
								</DxDropDownBox>
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
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
} from 'devextreme-vue/validator';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import { DxSwitch } from 'devextreme-vue/switch';
import DxNumberBox from 'devextreme-vue/number-box';

export default {
	name: "inventoryDetailsComponent",
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
		DxDropDownBox,
		DxList,
		DxSwitch,
		DxNumberBox
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
			selectedUOMWeight: [],
			selectedUOMDimension: []
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		selectedUOMWeightDropdown() {
			console.log("selectedUOMWeightDropdown")
		},
		selectedUOMDimensionDropdown() {
			console.log("selectedUOMDimensionDropdown")
		}
	},
	computed: {
		...mapState(["Static"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
