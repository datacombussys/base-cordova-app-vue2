<template>
	<div>
		<template>
			<!-- Change Poup to Vuetify -->
			<basicPopupComponent 
				:openedBasicPopup="openedBasicPopup"
				@closePopup="closePopup">

				<template v-slot:title>
					Credit Card Processing API Keys
				</template>
				<template v-slot:main-data>
					<div>
						<v-card 	
							class="p-4">
							<div class="row">
								<div class="col-6">
									<v-text-field
										label="Pin"
										v-model="apiForm.pin"
										:disabled="!disableEdit"
									></v-text-field>
								</div>
								<div class="col-6">
									<v-select
										:items="processors"
										label="Processor"
										v-model="apiForm.processor_name"
										:disabled="!disableEdit"
									></v-select>
								</div>
							</div>

							<div class="row">
								<div class="col-6">
									<v-text-field
										label="Merchant ID"
										v-model="apiForm.merchant_id"
										:disabled="!disableEdit"
									></v-text-field>
								</div>
								<div class="col-6">
									<v-text-field
										label="User ID"
										v-model="apiForm.ssl_user_id"
										:disabled="!disableEdit"
									></v-text-field>
								</div>
							</div>
							<div class="row">
								<div class="col-6">
									<v-switch
										v-model="apiForm.is_demo"
										label="Is Demo?"
										:disabled="!disableEdit"
									></v-switch>
								</div>
								<div class="col-6">
									<v-switch
										v-if="showEditToggle"
										v-model="disableEdit"
										label="Edit"
									></v-switch>
								</div>
							</div>
						</v-card>
					</div>
				</template>

				<template v-slot:action>
					<div class="row mt-4 justify-end">
						<div class="col-25p text-center mx-4">
							<DxButton
								:width="150"
								text="Cancel"
								type="warning"
								styling-mode="contained"
								:focusStateEnabled="false"
								@click="closePopup">
							</DxButton>
						</div>
						<div class="col-25p text-center mx-4 primary">
							<DxButton
								:width="150"
								text="Save"
								type="success"
								styling-mode="contained"
								:focusStateEnabled="false"
								@click="submit">
							</DxButton>
						</div>
					</div>
				</template>

			</basicPopupComponent>
		</template>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { DxPopup } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxButton from "devextreme-vue/button"

//Components
import basicPopupComponent from "@/components/elements/modals/basic-popup-component"

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins"

export default {
	name: "ElavonApiKeysComponent",
	mixins: [
		UniversalMixins
	],
	components: {
		basicPopupComponent,
		DxScrollView,
		DxButton,
		DxPopup
	},
	props: {

	},
	data() {
		return {
			//Main Data
			openedBasicPopup: false,
			processors: [
				"Elavon",
				"Forte"
			],

			//Form Data
			showEditToggle: false,
			disableEdit: false,
			apiForm: {
				pin: null,
				processor_name: null,
				merchant_id: null,
				user_id: null,
				is_demo: true,
			}

			
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
		},
		async submit() {
			let form = await this.setUserPlatformPOST(this.apiForm)
			if(this.apiForm.processor_name === "Elavon") {
				this.$store.dispatch("POSTElavonAPIKey", form)
			}
			this.openedBasicPopup = false
			
		},
		closePopup(evt) {
			if(typeof evt === Boolean) {
				this.openedBasicPopup = evt
			} else {
				this.openedBasicPopup = false
			}
			
		},
		mountData() {
			console.log('mountData');
			if(Object.keys(this.APIKeys.elavonAPIKeyProfile).length != 0) {
				this.showEditToggle = true
				for(let key in this.apiForm) {
					console.log('key', key);
					this.apiForm[key] = this.APIKeys.elavonAPIKeyProfile[key]
				}
			} else {
				this.disableEdit = true
			}
			
			console.log('this.apiForm', this.apiForm);
		}
	},
	computed: {
		...mapState(["APIKeys"])
	},
	created() {},
	mounted() {
		this.mountData()
	}
};
</script>

<style scoped lang="scss">

</style>
