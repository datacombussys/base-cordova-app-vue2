<template>
	<div>
		<template>
			<DxValidationSummary id="summary"/>
		</template>
		<template>
			<inventoryDisaplayFieldsComponent :formData="formData"/>
		</template>

		<!-- Product Details -->
		<template v-if="!formData.is_service">
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Product Details</div>
				<div class="field-row">

					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Product Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
										<DxRequiredRule message="Product Name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Manufacturer</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.manufacturer">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Make</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.make">
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Model</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.model">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Model Number</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.model_number">
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Product Type</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.product_type">
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Supplier Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.supplier">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
										<DxRequiredRule message="Product Name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Service Details -->
		<template v-else>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Service Details</div>
				<div class="field-row">

					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Service Name</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.name">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
										<DxRequiredRule message="Product Name is required"/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Service Type</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.product_type">
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Service Provider</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!inventorySettings.editProfile"
									:value.sync="formData.supplier">
									<DxValidator>
										<DxPatternRule
											pattern="^[a-zA-Z0-9 ]+$"
											message="The name should not contain special characters"
										/>
										<DxRequiredRule message="Product Name is required"/>
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
				<div class="dx-fieldset-header">Category</div>
				<div class="field-row">
					<div class="col-6">
						<div class="dx-field">
							<div class="dx-field-label">Category Name</div>
							<div id="drop-down-menu" class="dx-field-value">
								<DxDropDownBox
									:disabled="!inventorySettings.editProfile"
									:data-source="categories"
									:value.sync="selectedCategory"
									placeholder="Select a value..."
									display-expr="name"
									@value-changed="selectedCategoryDropdown($event)"
								>
									<DxList
										:data-source="categories"
										:height="400"
										:selected-items.sync="selectedCategory"
										selection-mode="single"
										display-expr="name"
									/>
								</DxDropDownBox>
							</div>
						</div>
						<div>
							<DxButton
								type="gray"
								text="Manage Categories"
								@click="categoryPopupVisible = !categoryPopupVisible" />
						</div>
					</div>
				</div>
			</div>
		</template>
					

				

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Barcode</div>
				<div class="field-row">
					
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Barcode Number</div>
							<div class="dx-field-value">
								D-13343645
							</div>
						</div>
					</div>
					<div class="cols">
						<div class="dx-field">
							<div class="dx-field-label">Barcode</div>
							<div class="mt-4 business-barcode text-center">
								D-13343645
							</div>
						</div>
					</div>
					<div class="col-6">
						<DxButton
						@click="barcodePopupVisible = !barcodePopupVisible"
						type="gray"
						text="Manage Barcode" />
					</div>

				</div>
			</div>
		</template>

		<!-- Categories Popup -->
		<template>
			<DxPopup
				:visible.sync="categoryPopupVisible"
				:drag-enabled="true"
				:close-on-outside-click="false"
				:show-title="true"
				:width="600"
				:height="400"
				title="Categories"
				class="p-0"
			>
			<v-form>
				<v-container>
					<v-row>
						<v-col sm="6">
							<v-text-field
								:v-model="category.name"
								label="Name"
							></v-text-field>
						</v-col>
						<v-col sm="6">
							<DxScrollView
								ref="categoryScroller"
								show-scrollbar="onScroll"
								:height="300"
							>
								<v-list>
									<v-list-item
										v-for="category in Inventory.categoryList"
										:key="category.id">
										<v-list-item-content class="p-0">
											<v-list-item-title v-text="category.name"></v-list-item-title>
										</v-list-item-content>
										
										<v-list-item-action>
											<v-btn icon @click="deleteCategory">
												<v-icon color="grey lighten-1">mdi-close-thick</v-icon>
											</v-btn>
										</v-list-item-action>
									</v-list-item>
								</v-list>
							</DxScrollView>

						</v-col>
					</v-row>
				</v-container>
			</v-form>
		
			</DxPopup>
		</template>

		<!-- Barcode Popup -->
		<template>
			<DxPopup
				:visible.sync="barcodePopupVisible"
				:drag-enabled="true"
				:close-on-outside-click="false"
				:show-title="true"
				:width="600"
				:height="400"
				title="Barcode"
			>
				<v-form>
					<v-container>
						<v-row>
							<v-col sm="6">
								<v-text-field
									type="text"
									v-model="barcode.barcode_number"
									label="Number"
								></v-text-field>
								<v-select
									:items="barcodeTypes"
									label="Type"
								></v-select>
							</v-col>
							<v-col sm="6">
								<DxScrollView
									ref="categoryScroller"
									show-scrollbar="onScroll"
									:height="300"
								>
									<v-list>
										<v-list-item>
											<v-list-item-content class="p-0 inventory-barcode">
												{{barcode.barcode_number}} 
											</v-list-item-content>
										
										</v-list-item>
									</v-list>
								</DxScrollView>

							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</DxPopup>
		</template>

		<template>
			<div class="w-full">
				<DxButton
					type="gray"
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
import { DxPopup } from 'devextreme-vue/popup';
import DxScrollView from 'devextreme-vue/scroll-view';

//Mixins
import { FormMixins } from "@/mixins/form-mixins"
//Compoennts
import inventoryDisaplayFieldsComponent from "./inventory-display-fields-component"

export default {
	name: "inventoryProfileComponent",
	mixins: [
		FormMixins
	],
	components: {
		inventoryDisaplayFieldsComponent,
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
		DxNumberBox,
		DxPopup,
		DxScrollView
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
			selectedCategory: [],
			selectedBarcodeType: [],
			categoryPopupVisible: false,
			barcodePopupVisible: false,
			categories: [
				{name: "Category One"},
				{name: "Category Two"},
				{name: "Category Three"}
			],
			//Form Data
			category: {
				name: null
			},
			barcode: {
				barcode_number: null,
				is_sku: false,
				is_upc: false,
			},
			barcodeTypes: ['UPC', 'SKU']
		};
	},
	methods: {
		testingMethod(e) {
			console.log("Inventory.categoryList", this.Inventory.categoryList);
		},
		selectedCategoryDropdown() {
			console.log('categoryDropdownChange')
		},
		selectedBarcodeTyopeDropdown() {
			console.log('selectedBarcodeTyopeDropdown')
		},
		deleteCategory() {
			console.log("deleteCategory")
		}
	},
	computed: {
		...mapState(["Static", "Inventory"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
