<template>
	<div>
		<template>	

		</template>
		<div class="flex justify-between mt-2">
			<div class="md-headline">Shipping Locations</div>
			<div>
				<DxButton
					width="100%"
					type="datacom"
					text="Add New Location"
					@click="popupVisible = true" />
			</div>
		</div>
		<md-card>
      <md-ripple>
        <md-card-header class="flex">
					<span class="mdi mdi-star-outline mdi-30px"></span>
					<span class="text-datacom-darker ml-4 flex items-center" style="font-size: 20px;">Primary</span>
        </md-card-header>
        <md-card-content>
					<div class="row">
					 <div class="col-25">
						 <p class="label">Name:</p>
					 </div>
					 <div class="col-75">
						<p class="field">Joe Smith</p>
					 </div>
					 <div class="col-25">
						 <p class="label">Address:</p>
					 </div>
					 <div class="col-75">
						<p class="field">1234 N. Main St</p>
					 </div>
					 <div class="col-25">
						 <p class="label">City:</p>
					 </div>
					 <div class="col-75">
						<p class="field">Phoenix</p>
					 </div>
					 <div class="col-25">
						 <p class="label">State:</p>
					 </div>
					 <div class="col-75">
						<p class="field">Arizona</p>
					 </div>
					 <div class="col-25">
						 <p class="label">Phone:</p>
					 </div>
					 <div class="col-75">
						<p class="field">(602-451-8710)</p>
					 </div>
				 </div>
         
        </md-card-content>
        <md-card-actions>
          <md-button>Edit</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

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
				<div class="row">
					<div class="col-50">
						<p class="label">Name of Person Receiving Shipment</p>
						<DxTextBox :value.sync="shippingForm.name"/>
					</div>
					<div class="col-50">
						<p class="label">Phone of Person Receiving Shipment</p>
					<DxTextBox 
						:mask-rules="phoneRules"
						mask="+1 (X00) 000-0000"
						:value.sync="shippingForm.phone"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Address</p>
						<DxTextBox :value.sync="shippingForm.address"/>
					</div>
					<div class="col-50">
						<p class="label">Address 2</p>
						<DxTextBox :value.sync="shippingForm.address2"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">City</p>
						<DxTextBox :value.sync="shippingForm.city"/>
					</div>
					<div class="col-50">
						<p class="label">State</p>
						<DxTextBox :value.sync="shippingForm.state"/>
					</div>
				</div>
				<div class="row">
					<div class="col-50">
						<p class="label">Zip Code</p>
						<DxTextBox :value.sync="shippingForm.zip"/>
					</div>
					<div class="col-50">
						<p class="label">Country</p>
						<DxDropDownBox
							:data-source="countries"
							:value.sync="shippingForm.country"
							:opened.sync="isShippingDropDownOpened">
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
						<DxTextArea :value.sync="shippingForm.instructions" placeholder="Type here..."/>
					</div>
					<div class="col-25">
						<p class="label">Make as Primary</p>
						<DxSwitch 
							@changed="shippingForm.is_primary = !shippingForm.is_primary"
							:value.sync="shippingForm.is_primary" />
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
		DxList

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
			isShippingDropDownOpened: false,
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
 .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
