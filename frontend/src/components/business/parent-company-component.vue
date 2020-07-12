<template>
	<div>
		<f7-card class="mo-margin-top">
			<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
				<f7-row class="full-width display-flex align-items-center">
					<f7-col width="50" class="align-self-flex-end">
						<f7-block-title class="full-width margin-bottom-half">Company Details</f7-block-title>
					</f7-col>
					<f7-col width="50" class="text-align-right">
						<f7-link @click="toggleEditProfile">
							<b-icon class="edit-icon" icon="pencil"></b-icon>
						</f7-link>
					</f7-col>
				</f7-row>
			</f7-card-header>
			<f7-card-content>
				<!-- Begin Company Display List -->
				<f7-list v-show="!parentSettings.editProfile">
					<f7-block-title class="full-width" medium>Affiliated Company</f7-block-title>
					<f7-row v-if="moduleInfo.level >= 1 && Auth.authLevel === 1" class="margin-top">
						<f7-col width="50">
							<p>Datacom:</p>
							<f7-list-item>
								<f7-toggle :checked="parentSettings.accountParent.is_datacom" disabled></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Company Name:</p>
							<f7-list-item v-if="parentSettings.accountParent.is_datacom" :title="parentSettings.accountParent.company_name">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
							<f7-list-item v-if="!parentSettings.accountParent.is_datacom" title="Not Selected">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
						</f7-col>
					</f7-row>
					<f7-row v-if="moduleInfo.level >= 2 && Auth.authLevel === 1" class="margin-top">
						<f7-col width="50">
							<p>Partner:</p>
							<f7-list-item>
								<f7-toggle :checked="parentSettings.accountParent.is_partner" disabled></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Partner Name:</p>
							<f7-list-item v-if="parentSettings.accountParent.is_partner" :title="parentSettings.accountParent.company_name">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
							<f7-list-item v-if="!parentSettings.accountParent.is_partner" title="Not Selected">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
						</f7-col>
					</f7-row>
					<f7-row v-if="moduleInfo.level >= 3 && Auth.authLevel < 3" class="margin-top">
						<f7-col width="50">
							<p>Merchant:</p>
							<f7-list-item>
								<f7-toggle :checked="parentSettings.accountParent.is_merchant" disabled></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Merchant Name:</p>
							<f7-list-item v-if="parentSettings.accountParent.is_merchant" :title="parentSettings.accountParent.company_name">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
							<f7-list-item v-if="!parentSettings.accountParent.is_merchant" title="Not Selected">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
						</f7-col>
					</f7-row>
					<!--Vendor is for Users and customers-->
					<!-- <f7-row v-if="moduleInfo.level >= 4 && Auth.authLevel < 4" class="margin-top">
						<f7-col width="50">
							<p>Vendor:</p>
							<f7-list-item>
								<f7-toggle :checked="parentSettings.accountParent.is_vendor" disabled></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Vendor Name:</p>
							<f7-list-item v-if="parentSettings.accountParent.is_vendor" :title="parentSettings.accountParent.company_name">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
							<f7-list-item v-if="!parentSettings.accountParent.is_vendor" title="Not Selected">
								<f7-icon slot="media" size="40" icon="mdi mdi-office-building"></f7-icon>
							</f7-list-item>
						</f7-col>
					</f7-row> -->
					<!-- <f7-row>
						<f7-button @click="testingMethod">Test</f7-button>
					</f7-row> -->
				</f7-list>
				<!-- END Company Display -->
				<!-- Begin Company Edit View List -->
				<f7-list v-show="parentSettings.editProfile">
					<f7-block-title class="full-width" medium>Super User View</f7-block-title>
					<f7-row class="margin-top" v-if="moduleInfo.level >= 1 && Auth.authLevel === 1">
						<f7-col width="50">
							<p>Datacom:</p>
							<f7-list-item>
								<f7-toggle
									name="datacom"
									:disabled="GET_DATACOM_LIST.length === 0"
									:checked="parentSettings.accountParent.is_datacom"
									@change="companyTypeToggle"
								></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Datacom Name:</p>
							<f7-list-input
								v-if="Auth.authLevel === 1"
								:disabled="parentSettings.accountParent.is_datacom === false"
								:value="parentSettings.accountParent.company_name"
								@input="parentSettings.accountParent.company_name = $event.target.value"
								type="select"
								class="datacom-input"
							>
								<option v-for="dataco in GET_DATACOM_LIST" :key="dataco.id" :value="dataco.dba_name">
									{{
									dataco.dba_name
									}}
								</option>
							</f7-list-input>
						</f7-col>
					</f7-row>
					<f7-row class="margin-top" v-if="moduleInfo.level >= 2 && Auth.authLevel === 1">
						<f7-col width="50">
							<p>Partner:</p>
							<f7-list-item>
								<f7-toggle
									name="partner"
									:disabled="GET_PARTNER_LIST.length === 0"
									:checked="parentSettings.accountParent.is_partner"
									@change="companyTypeToggle"
								></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Partner Name:</p>
							<f7-list-input
								:disabled="parentSettings.accountParent.is_partner === false"
								:value="parentSettings.accountParent.company_name"
								@input="parentSettings.accountParent.company_name = $event.target.value"
								type="select"
								class="datacom-input"
							>
								<option v-for="partner in GET_PARTNER_LIST" :key="partner.id">{{ partner.dba_name }}</option>
							</f7-list-input>
						</f7-col>
					</f7-row>
					<f7-row class="margin-top" v-if="moduleInfo.level >= 3 && Auth.authLevel < 3">
						<f7-col width="50">
							<p>Merchant:</p>
							<f7-list-item>
								<f7-toggle
									name="merchant"
									:disabled="GET_COMPANY_LIST.length === 0"
									:checked="parentSettings.accountParent.is_merchant"
									@change="companyTypeToggle"
								></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Merchant Name:</p>
							<f7-list-input
								:disabled="parentSettings.accountParent.is_merchant === false"
								:value="parentSettings.accountParent.company_name"
								@input="parentSettings.accountParent.company_name = $event.target.value"
								type="select"
								class="datacom-input"
							>
								<option v-for="co in GET_COMPANY_LIST" :key="co.id">{{ co.dba_name }}</option>
							</f7-list-input>
						</f7-col>
					</f7-row>
					<!-- <f7-row class="margin-top" v-if="moduleInfo.level >= 4 && Auth.authLevel < 4">
						<f7-col width="50">
							<p>Vendor:</p>
							<f7-list-item>
								<f7-toggle
									name="vendor"
									:disabled="GET_VENDOR_LIST.length === 0"
									:checked="parentSettings.accountParent.is_vendor"
									@change="companyTypeToggle"
								></f7-toggle>
							</f7-list-item>
						</f7-col>
						<f7-col width="50">
							<p>Vendor Name:</p>
							<f7-list-input
								:disabled="parentSettings.accountParent.is_vendor === false"
								:value="
									Auth.platformInfo.platform === 'vendor' && Auth.isAuthenticated ? parentSettings.accountParent.company_name : ''
								"
								@input="parentSettings.accountParent.company_name = $event.target.value"
								type="select"
								class="datacom-input"
							>
								<option v-for="vend in GET_VENDOR_LIST" :key="vend.id">{{ vend.dba_name }}</option>
							</f7-list-input>
						</f7-col>
					</f7-row> -->
					<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
						<f7-row class="margin-top level-right">
							<f7-col width="25">
								<f7-button fill @click="parentSettings.activeTab = 1" class="bg-color-deeporange">Next -></f7-button>
							</f7-col>
						</f7-row>
					</f7-block>
				</f7-list>
				<!-- END Company Edit View -->
			</f7-card-content>
		</f7-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Mixins
// import { ParentCompanyMixin } from '../../mixins/businesses/parent-company-mixins';

export default {
	name: "parentCompany",
	mixins: [
		// ParentCompanyMixin
	],
	components: {},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		},
		parentSettings: {
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
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.moduleInfo", this.moduleInfo);
			console.log("this.Auth.authLevel", this.Auth.authLevel);
		},
		resetCompanyToggles(name) {
			this.parentSettings.accountParent.is_datacom = name === "datacom";
			this.parentSettings.accountParent.is_partner = name === "partner";
			this.parentSettings.accountParent.is_merchant = name === "merchant";
		},
		companyTypeToggle(e) {
			console.log("Toggle e", e);
			if (e.target.name === "datacom") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.company_name = null;
					this.parentSettings.accountParent.is_datacom = false;
				}
			}
			if (e.target.name === "partner") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.company_name = null;
					this.parentSettings.accountParent.is_partner = false;
				}
			}
			if (e.target.name === "merchant") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.company_name = null;
					this.parentSettings.accountParent.is_merchant = false;
				}
			}
		},
		determineAccountOwner() {
			return new Promise( async (resolve, reject) => {
				var companyOBJ = {};
				if (this.parentSettings.accountParent.is_datacom) {
					companyOBJ = this.GET_DATACOM_LIST.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.formData["datacom"] = companyOBJ.id;
					return resolve({success: "You must select a Company"});
				} else if (this.parentSettings.accountParent.is_partner) {
					companyOBJ = this.GET_PARTNER_LIST.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.formData["partner"] = companyOBJ.id;
					return resolve();
				} else if (this.parentSettings.accountParent.is_merchant) {
					companyOBJ = this.GET_COMPANY_LIST.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.formData["company"] = companyOBJ.id;
					return resolve();
				}else {
					this.$f7.dialog.alert("You must select a Company").open();
					return resolve({error: "You must select a Company"});
				}
			});
			
		}
	},
	computed: {
		...mapState(["Auth"]),
		...mapState(["Users", "Companies", "Datacom", "Partners", "Vendors"]),
		...mapGetters(["GET_DATACOM_LIST", "GET_PARTNER_LIST", "GET_COMPANY_LIST", "GET_VENDOR_LIST"]),
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less">

</style>
