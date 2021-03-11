<template>
	<div class="container py-0">
		<v-overlay
			:absolute="true"
			:value="transResponsePopup"
		>
		<v-sheet
			light
			color="v-primary-base"
			class="mx-auto"
			height="500"
			width="600">
			<nav class="close-button">
				<div class="header">
					Transaction Response
				</div>
				<div class="close-button">
					<a href="#" @click="closePopup">
						<fa-layer class="mdi-35">
							<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
							<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
						</fa-layer>
					</a>
				</div>
			</nav>
			<div class="row frame-container-popup">
				<div class="col-12 py-0" v-if="isSuccess">
					<v-card>
						<div class="row">
							<div class="row justify-center">
								<div class="col-75p items-center text-center">
									<img src="@/static/AnimatedGreenCheck.gif" alt="Success" width="150" height="150">								
									<p>Success</p>
								</div>
							</div>

						</div>
					</v-card>
					<div class="row mt-10 justify-center">
						<div class="col-6 flex justify-center">
							<v-btn 
								color="green darken-2">
								Email Receipt
							</v-btn>
						</div>
						<div class="col-6 flex justify-center">
							<v-btn 
								color="green darken-2">
								Print Receipt
							</v-btn>	
						</div>
					</div>
				</div>

				<div class="col-12 py-0" v-if="isDeclined">
					<v-card>
						<div class="row">
							<div class="row justify-center">
								<div class="col-75p items-center text-center">
									<img src="@/static/AnimatedRedX.gif" alt="Success" width="150" height="150">
									<p>Declined</p>
								</div>
							</div>
						</div>
					</v-card>
					<div class="row mt-5 h-auto">
						<div class="col-3 flex justify-center">
							<div>
								<img :src="errorType" width="75" height="75">
							</div>
						</div>
						<div class="col-9">
							<v-expansion-panels>
								<v-expansion-panel>
									<v-expansion-panel-header>Details</v-expansion-panel-header>
									<v-expansion-panel-content>
										Slot of Error Message goes here
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</div>
					</div>
				</div>

			</div>
			<v-divider></v-divider>
			<v-divider></v-divider>
			<v-divider></v-divider>
			<div class="row justify-end">
				<div class="col-3">	
					<v-btn
						color="primary"
						@click="closePopup">
						Close
					</v-btn>
				</div>
			</div>

		</v-sheet>
			
		</v-overlay>

				
	</div>
</template>

<script>
import { mapState } from "vuex";

import DxNumberBox from 'devextreme-vue/number-box';
import DxTextBox from 'devextreme-vue/text-box';
import { DxSwitch } from 'devextreme-vue/switch';

export default {
	name: "transactionResponseComponent",
	mixins: [],
	components: {
		DxNumberBox,
		DxTextBox,
		DxSwitch
	},
	props: {
		transResponsePopup: {
			type: Boolean
		}
	},
	data() {
		return {
			isSuccess: false,
			isDeclined: true,
			isFraud: false,
			isSystemError: false,
			isTransactionError: false,
			isAccountError: false,
			errorImageType: "warning"

		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		closePopup(e) {
			this.$emit('closeTransResponsePopup', false)
		}

	},
	computed: {
		...mapState([]),
		errorType() {
			if (this.errorImageType === "danger") {
				return require("@/static/RedDangerIcon150x150.png");
			} else if (this.errorImageType === "warning") {
				return require("@/static/YellowWarningIcon150x150.png");
			} else if (this.errorImageType === "info") {
				return require("@/static/BlueInfoIcon150x150.png");
			}
		}
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
.close-sheet-button {
	text-align: right;
	position: relative;
	right: -1px;
	top: -18px;
}
.frame-container-popup {
	height: calc(7vh + 300px);
}
</style>
