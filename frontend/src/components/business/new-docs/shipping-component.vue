<template>
	<div>
		<div class="flex justify-between mt-2">
			<div class="headline">Shipping Locations</div>
			<div>
				<DxButton
					width="100%"
					type="datacom"
					text="Add New Location"
					@click="popupVisible = true" />
			</div>
		</div>
		<template>
			<div class="small-block mb-6"> 
				<v-card
					class="mx-auto"
					max-width="325"
					:elevation="6">
					<v-card-title class="p-5">
						<div class="mdi mdi-star-outline mdi-30 text-datacom-darker"></div>
						<div class="text-datacom-darker ml-4 flex items-center" style="font-size: 20px;">Primary</div>
					</v-card-title>
					
					<v-card-text>
						<div class="container">
							<div class="row">
								<div class="col-25p">
									<p class="label">Name:</p>
								</div>
								<div class="col-75p">
									<p class="field">Joe Smith</p>
								</div>
							</div>
							<div class="row">
								<div class="col-25p">
									<p class="label">Address:</p>
								</div>
								<div class="col-75p">
									<p class="field">1234 N. Main St</p>
								</div>
							</div>
							<div class="row">
								<div class="col-25p">
									<p class="label">City:</p>
								</div>
								<div class="col-75p">
									<p class="field">Phoenix</p>
								</div>
							</div>
							<div class="row">
								<div class="col-25p">
									<p class="label">State:</p>
								</div>
								<div class="col-75p">
									<p class="field">Arizona</p>
								</div>
							</div>
							<div class="row">
								<div class="col-25p">
									<p class="label">Phone:</p>
								</div>
								<div class="col-75p">
									<p class="field">(602-451-8710)</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-6 flex justify-center">
								<DxButton
									:width="150"
									text="Edit"
									type="warning"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
							</div>
							<div class="col-6 flex justify-center">
								<DxButton
									:width="150"
									text="Delete"
									type="danger"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</div>
		</template>

		<template>
			<DxPopup
				:visible.sync="popupVisible"
				:drag-enabled="true"
				:close-on-outside-click="false"
				:show-title="true"
				width="60%"
				height="60%"
				title="New Shipping Address"
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
									<div class="dx-field-label">Name of Person Receiving Shipment</div>
									<div class="dx-field-value">
										<v-text-field
											filled
											v-model="shippingForm.name"
										></v-text-field>
									</div>
								</div>
								
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Phone of Person Receiving Shipment</div>
									<div class="dx-field-value">
										<v-text-field
											type="tel"
											filled
											v-model="shippingForm.phone"
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
											filled
											v-model="shippingForm.address"
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
											filled
											v-model="shippingForm.address2"
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
											filled
											v-model="shippingForm.city"
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
											filled
											v-model="shippingForm.state"
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
											filled
											v-model="shippingForm.zip"
										></v-text-field>
									</div>
								</div>
							</div>
							<div class="col-50p">
								<div class="dx-field">
									<div class="dx-field-label">Country</div>
									<div class="dx-field-value">
										<v-select
											filled
											:items="countries"
										></v-select>
									</div>
								</div>
								
							</div>
						</div>
						<div class="row">
							<div class="col-100p">
								<div class="dx-field">
									<div class="dx-field-label">Instructions</div>
									<div class="dx-field-value">
										<v-textarea
											name="input-7-1"
											label="Default style"
											filled
											v-model="shippingForm.instructions"
											hint="Hint text"
										></v-textarea>
									</div>
								</div>
							</div>
							
							
						</div>
						<div class="row justify-end mt4">
							<div class="col-25p">
								<p class="label">Make as Primary</p>
								<DxSwitch 
									@changed="shippingForm.is_primary = !shippingForm.is_primary"
									:value.sync="shippingForm.is_primary" />
							</div>
							<div class="col-25p text-center mx-4">
								<DxButton
									:width="150"
									text="Delete"
									type="danger"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
							</div>
							<div class="col-25p text-center mx-4 primary">
								<DxButton
									:width="150"
									text="Save"
									type="success"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
								</v-btn>
							</div>
						</div>
					</DxScrollView>

					
				</v-card>
			</div>
			

				
			</DxPopup>
		</template>


	</div>
</template>

<script>
import { mapState } from "vuex";

//DataExorccess
import DxAccordion from "devextreme-vue/accordion";
import DxButton from "devextreme-vue/button"
import DxSwitch from 'devextreme-vue/switch';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxPopup } from 'devextreme-vue/popup';
import { DxTextArea } from 'devextreme-vue/text-area';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Mixins
import { FormMixins } from "@/mixins/form-mixins.js"
import { LocaleMixins } from "@/mixins/locale-mixins"

export default {
	name: "shippingLocationsComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		DxAccordion,
		DxButton,
		DxPopup,
		DxTextBox,
		DxSwitch,
		DxTextArea,
		DxDropDownBox,
		DxList,
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
			//Form
			shippingForm: {
				user: null,
				name: null,
				address: null,
				city: null,
				state: null,
				zip: null,
				country: null,
				phone: null,
				instructions: null,
				is_primary: false,
				is_active: true,
				date_added: null,
			},
			
		};
	},
	// *************************************** Methods *****************************************//
	methods: {
		testingMethod(e) {
			console.log('e', e);
			console.log('shippingForm', this.shippingForm)
		},
		getItemKeys: function(item) {
			return Object.keys(item);
		},
		changeShippingCountry() {
			console.log('changeBillingCountry e', e)
			this.shippingFormcountry = e.addedItems[0];
			this.isShippingDropDownOpened = false;
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

</style>
