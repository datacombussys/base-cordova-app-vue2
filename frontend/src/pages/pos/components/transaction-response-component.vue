<template>
	<f7-popup
		style="scrollbar-width: none;"
		swipeToClose
		class="popup-component"
		:opened="PopupComponentOpened"
		@popup:closed="PopupComponentOpened = false">
		<f7-page>
			<f7-row class="popup-header">
				<f7-col width="90" class="margin-left">
					<f7-block-title large class="margin-top text-color-white">
						<slot name="title"></slot>
					</f7-block-title>
				</f7-col>
				<f7-col width="10">
					<f7-link
						class="level-right margin-right margin-top-half"
						@click="popupClose"
						icon-size="50"
						icon-color="white"
						icon="mdi mdi-close"
					></f7-link>
				</f7-col>
			</f7-row>
			<!-- Vue Scrollbar (dragger) -->
			<div
				v-bar="{
					preventParentScroll: true,
					scrollThrottle: 30
				}"
				style="height: 100v%;">
				<!-- el1 -->
				<div>
				<!-- el2 -->
					<f7-row v-if="transResponseSettings.type==='content'"> 
						<slot name="slotContent"></slot>
					</f7-row>

					<f7-row v-if="transResponseSettings.type==='POS'">
						<f7-block v-if="isSuccess">
							<f7-card>
								<f7-card-content style="height: 175px;">
									<f7-row class="display-flex justify-content-center">
										<img src="/static/AnimatedGreenCheck.gif" />
									</f7-row>
								</f7-card-content>
							</f7-card>
							<f7-card>
								<f7-card-content>
									<f7-row class="display-flex justify-content-center">
										<p>Success!</p>
									</f7-row>
								</f7-card-content>
							</f7-card>
						</f7-block>
						<f7-block v-if="isDeclined">
							<f7-card>
								<f7-card-content>
									<f7-row class="display-flex justify-content-center">
										<img src="/static/AnimatedRedX.gif" />
									</f7-row>
									<f7-row class="display-flex justify-content-center margin-top">
										<slot name="errorTitle"></slot>
									</f7-row>
								</f7-card-content>
							</f7-card>
							<f7-card>
								<f7-card-content>
									<f7-row class="display-flex justify-content-center">
										<f7-col width="20" class="margin-right">
											<img :src="errorType" alt />
										</f7-col>
										<f7-col width="80">
											<f7-list class="full-width" accordion-list>
												<f7-list-item accordion-item title="Details">
													<f7-accordion-content>
														<f7-block>
															<slot name="errorMsg"></slot>
														</f7-block>
													</f7-accordion-content>
												</f7-list-item>
											</f7-list>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>
						</f7-block>
					</f7-row>
				</div>
			</div>
		</f7-page>
	</f7-popup>
</template>

<script>
import {EventBus} from '@/services/event-bus';

export default {
	name: "transactionResponsePopupComponent",
	mixins: [],
	components: {},
	props: {
		transResponseSettings: {
				type: Object,
				required: true
			},
	},
	data() {
		return {
			PopupComponentOpened: false,
			isSuccess: false,
			isDeclined: true,
			isFraud: false,
			isSystemError: false,
			isTransactionError: false,
			isAccountError: false,
			errorImageType: "danger"
		};
	},
	methods: {
		//Close Discount Popup
		popupClose() {
			this.$f7.popup.close();
		}
	},
	computed: {
		errorType() {
			if (this.errorImageType === "danger") {
				return "/static/RedDangerIcon150x150.png";
			} else if (this.errorImageType === "warning") {
				return "/static/YellowWarningIcon150x150.png";
			} else if (this.errorImageType === "info") {
				return "/static/BlueInfoIcon150x150.png";
			}
		}
	},
	created() {},
	mounted() {
		EventBus.$on('EVENT_NAME', val => {
			this.$f7.popup.open('.popup-component');
		});
	}
};
</script>

<style scoped lang="scss">

</style>
