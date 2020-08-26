<template>
	<div>
		<template>
			<v-card
				max-width="100%"
				class="mx-auto custom-card"
			>
				<v-list-item>
					<v-list-item-content>
						<span class="headline">Select Parent Organization</span>
					</v-list-item-content>
				</v-list-item>

				<v-card-text>
					<div class="container">
						<div class="title">Affiliated Company</div>
						<div class="row mt-4" v-if="moduleInfo.level >= 1 && Auth.authLevel === 1">
							<div class="col-50p justify-center">
								<p class="subtitle">Datacom</p>
								<DxSwitch 
									id="datacom" 
									:disabled="GET_DATACOM_LIST.length === 0 || !accountSettings.editProfile"
									:value="accountSettings.accountPlatform.is_datacom" 
									@value-changed="companyTypeToggle"/>
							</div>
							<div class="col-50p items-center">
								<p class="subtitle text-center">Name</p>
								<div class="row">
									<div class="col-2">
										<span class="mdi mdi-domain mdi-35 mr-4"></span>
									</div>
									<div id="dxContainer" class="col-10">
										<DxDropDownBox
											id="datacomBox"
											v-if="Auth.authLevel === 1"
											:disabled="accountSettings.accountPlatform.is_datacom === false"
											@initialized="datacomDropdown"
											:data-source="GET_DATACOM_LIST"
											:value.sync="selectedDatacom"
											placeholder="Select a value..."
											display-expr="dba_name"
										>
											<DxList
												:data-source="GET_DATACOM_LIST"
												:height="400"
												:selected-items.sync="selectedDatacom"
												selection-mode="single"
												display-expr="dba_name"
												@selectionChanged="datacomDropdownSelection"
												> 
											</DxList>
										</DxDropDownBox>
									</div>

								</div>
							</div>
						</div>
						<div class="row mt-4" v-if="moduleInfo.level >= 2 && Auth.authLevel === 1">
							<div class="col-50p">
								<p class="subtitle">Partner</p>
								<DxSwitch 
								id="partner" 
								:disabled="GET_PARTNER_LIST.length === 0 || !accountSettings.editProfile"
								:value="accountSettings.accountPlatform.is_partner" 
								@value-changed="companyTypeToggle" />
								
							</div>
							<div class="col-50p items-center">
								<div class="row">
									<div class="col-2">
									<fa-icon :icon="['fa', 'handshake']" class="mdi-30 mr-4"></fa-icon>
									</div>
									<div class="col-10">
										<DxDropDownBox
											:disabled="accountSettings.accountPlatform.is_partner === false"
											@initialized="partnerDropdown"
											:data-source="GET_PARTNER_LIST"
											:value.sync="selectedPartner"
											placeholder="Select a value..."
											display-expr="dba_name">
											<DxList
												:data-source="GET_PARTNER_LIST"
												:height="400"
												:selected-items.sync="selectedPartner"
												selection-mode="single"
												display-expr="dba_name" 
												@selectionChanged="partnerSelection" />
												
										</DxDropDownBox>
									</div>
									
								</div>
							</div>
						</div>
						<div class="row mt-4" v-if="moduleInfo.level >= 3 && Auth.authLevel === 1">
							<div class="col-50p">
								<p class="subtitle">Merchant</p>
								<DxSwitch 
								id="merchant" 
								:disabled="GET_MERCHANT_LIST.length === 0 || !accountSettings.editProfile"
								:value="accountSettings.accountPlatform.is_merchant" 
								@value-changed="companyTypeToggle" />
							</div>
							<div class="col-50p items-center">
								<div class="row">
									<div class="col-2">
									<span class="mdi mdi-storefront-outline mdi-35 mr-4"></span>
									</div>
									<div class="col-10">
										<DxDropDownBox
											:disabled="accountSettings.accountPlatform.is_merchant === false"
											@initialized="merchantDropdown"
											:data-source="GET_MERCHANT_LIST"
											:value.sync="selectedMerchant"
											placeholder="Select a value..."
											display-expr="dba_name">
											<DxList
												:data-source="GET_MERCHANT_LIST"
												:height="400"
												:selected-items.sync="selectedMerchant"
												selection-mode="single"
												display-expr="dba_name"
												@selectionChanged="merchantDropdownSelection" />
												
										</DxDropDownBox>
									</div>
									
								</div>
							</div>
						</div>

							<div class="row">
								<dxButton text="Click me" @click="testingMethod"/>
							</div>
							<div id="btnContainer" class="row">
							</div>

						
					</div>
				</v-card-text>
			</v-card>
		</template>

	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import { DxSwitch } from 'devextreme-vue/switch';
import dxButton from 'devextreme-vue/button';
import Button from 'devextreme/ui/button';


//Mixins
import { FormMixins } from "@/mixins/form-mixins.js"
import { LocaleMixins } from "@/mixins/locale-mixins"

export default {
	name: "parentSelectionComponent",
	mixins: [
		FormMixins,
		LocaleMixins
	],
	components: {
		DxSwitch,
		DxDropDownBox,
		DxList,
		dxButton
	},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		},
		accountSettings: {
			type: Object,
			required: true
		},
		toggleEditProfile: {
			type: Function
		},
		formData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {	
			//Initialized Data
			datacomDropdowninstance: null,
			partnerDropdowninstance: null,
			merchantDropdowninstance: null,

			//Form
			selectedDatacom: [],
			selectedPartner: [],
			selectedMerchant: [],

			//Data
			datacomList: [
				"Datacom",
				"Dataco",
				"Datacom123",
				"Datacom Parent",
			],
			datacomList2: [
				{id: 1, name:"Datacomdfsdfsd"},
				{id: 2, name:"Dataco"},
				{id: 3, name:"Datacom123"},
				{id: 4, name:"Datacom Parent"},
			]
			
		};
	},
	// *************************************** Methods *****************************************//
	methods: {
		testingMethod(e) {

		},
		datacomDropdown(e) {
			this.datacomDropdowninstance = e.component
		},
		partnerDropdown(e) {
			this.partnerDropdowninstance = e.component
		},
		merchantDropdown(e) {
			this.merchantDropdowninstance = e.component
		},
		resetCompanyToggles(name) {
			this.accountSettings.accountPlatform.is_datacom = name === "datacom";
			this.accountSettings.accountPlatform.is_partner = name === "partner";
			this.accountSettings.accountPlatform.is_merchant = name === "merchant";
		},
		companyTypeToggle(e) {
			console.log("Toggle e", e);
			if (e.element.id === "datacom") {
				if (e.value) {
					this.resetCompanyToggles(e.element.id);
				} else {
					this.accountSettings.accountPlatform.company_name = null;
					this.accountSettings.accountPlatform.is_datacom = false;
				}
			}
			if (e.element.id === "partner") {
				if (e.value) {
					this.resetCompanyToggles(e.element.id);
				} else {
					this.accountSettings.accountPlatform.company_name = null;
					this.accountSettings.accountPlatform.is_partner = false;
				}
			}
			if (e.element.id === "merchant") {
				if (e.value) {
					this.resetCompanyToggles(e.element.id);
				} else {
					this.accountSettings.accountPlatform.company_name = null;
					this.accountSettings.accountPlatform.is_merchant = false;
				}
			}
		},
		determineAccountOwner() {
			return new Promise( async (resolve, reject) => {
				var companyOBJ = {};
				if (this.accountSettings.accountPlatform.is_datacom) {
					companyOBJ = this.GET_DATACOM_LIST.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.formData["datacom"] = companyOBJ.id;
					return resolve({success: "You must select a Company"});
				} else if (this.accountSettings.accountPlatform.is_partner) {
					companyOBJ = this.GET_PARTNER_LIST.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.formData["partner"] = companyOBJ.id;
					return resolve();
				} else if (this.accountSettings.accountPlatform.is_merchant) {
					companyOBJ = this.GET_MERCHANT_LIST.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.formData["company"] = companyOBJ.id;
					return resolve();
				}else {
					this.$f7.dialog.alert("You must select a Company").open();
					return resolve({error: "You must select a Company"});
				}
			});
		},
		datacomDropdownSelection(e) {
			console.log("datacomDropdownSelection")
			console.log("datacomDropdown", this.datacomDropdowninstance)
			console.log("e", e)
			if(e) {
				this.accountSettings.accountPlatform.company_name = e.addedItems[0].dba_name
				this.datacomDropdowninstance.close()
				this.selectedPartner = []
				this.selectedMerchant = []
			}
		},
		partnerSelection(e) {
			console.log("partnerSelection")
			console.log("partnerDropdown", this.partnerDropdowninstance)
			console.log("e", e)
			if(e) {
				this.accountSettings.accountPlatform.company_name = e.addedItems[0].dba_name
				this.partnerDropdowninstance.close()
				this.selectedDatacom = []
				this.selectedMerchant = []
			}
		},
		merchantDropdownSelection(e) {
			console.log("merchantDropdownSelection")
			console.log("merchantDropdowninstance", this.merchantDropdowninstance)
			console.log("e", e)
			if(e) {
				this.accountSettings.accountPlatform.company_name = e.addedItems[0].dba_name
				this.merchantDropdowninstance.close()
				this.selectedMerchant = []
			}
		}
			

	},
	computed: {
		...mapState(["Auth", "Users", "Merchants", "Datacom", "Partners", "Vendors"]),
		...mapGetters(["GET_DATACOM_LIST", "GET_PARTNER_LIST", "GET_MERCHANT_LIST", "GET_VENDOR_LIST"]),
	},
	created() {},
	mounted() {
		// $("#btnContainer").dxButton({
		// 	text: "Click me!",
		// 	onClick: function () {
		// 			alert("Hello world!");
		// 	}
		// });
	}
};
</script>

<style scoped lang="scss">
.custom-card{
	width: 100%;
	margin: 4px;
	display: inline-block;
	vertical-align: top;
}
</style>
