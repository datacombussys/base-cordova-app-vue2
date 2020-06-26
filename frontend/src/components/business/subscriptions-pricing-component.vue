<template>
	<div>
		<!-- Begin Account Pricing Tab -->
		<f7-card>
			<f7-list>
				<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
					<f7-row class="full-width">
						<f7-col width="50" class="align-self-flex-end">
							<f7-block-title class="full-width">Account Pricing</f7-block-title>
						</f7-col>
					</f7-row>
				</f7-card-header>
				<f7-card-content class="no-padding">
					<!-- Begin Pricing Cards -->
					<f7-card class="padding-half">
						<f7-card-header>
							<f7-block-title>Trial Period</f7-block-title>
						</f7-card-header>
						<f7-card-content>
							<f7-row>
								<f7-col width="50">
									<p class="field-title">Enable Trial Period:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="50">
									<p>Trail Period:</p>
									<f7-list-input validate error-message="Format: 2.95" type="select">
										<option value="">30 Days</option>
										<option value="">60 Days</option>
										<option value="">90 Days</option>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="50">
									<p>Start Date:</p>
									<f7-list-input validate error-message="Format: 2.95" type="datepicker"> </f7-list-input>
								</f7-col>
								<f7-col width="50">
									<p>Trial End Date:</p>
									<f7-list-item title="04/25/2021"> </f7-list-item>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>
					<f7-card class="padding-half">
						<f7-card-header>
							<f7-block-title>Modules</f7-block-title>
						</f7-card-header>
						<f7-card-content>
							<f7-row>
								<f7-col width="30">
									<p class="field-title">Cash Discount:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Attendance:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Gift Cards:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="30">
									<p class="field-title">Quick Serve POS:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Retail POS:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Reestaurant POS:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="30">
									<p class="field-title">Website:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Events / Ticketing:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">E-Commerce:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="30">
									<p class="field-title">Invoicing:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Virtual Terminal:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="30">
									<p class="field-title">Hosted Payments:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
						</f7-card-content>
						<f7-card-footer>
							<p>
								Included modules and functionality: ID Cards, Inventory, Unlimited Employees, permissions, Email,
								ChatRooms.
							</p>
						</f7-card-footer>
					</f7-card>
					<!-- END Module Card -->
					<f7-card class="padding-half">
						<f7-card-header>
							<f7-block-title>Cash Discount</f7-block-title>
						</f7-card-header>
						<f7-card-content>
							<f7-row>
								<f7-col width="50">
									<p>Is billed?:</p>
									<f7-list-item>
										<f7-toggle class="margin"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="50">
									<p>Subscription Fee ($):</p>
									<f7-list-input
										validate
										placeholder="3.69"
										error-message="Format: 2.95"
										type="number"
										style="background: rgb(216,252,253)"
									>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="50">
									<p>Credit Amount (%):</p>
									<f7-list-input
										validate
										placeholder="3.69"
										error-message="Format: 2.95"
										type="number"
										style="background: rgb(216,252,253)"
									>
									</f7-list-input>
								</f7-col>
								<f7-col width="50">
									<p>Debit Amount (%):</p>
									<f7-list-input
										validate
										placeholder="1.59"
										step="0.01"
										error-message="Format: 2.95"
										type="number"
										style="background: rgb(216,252,253)"
									>
									</f7-list-input>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>
					<!-- END Cash Discount Options -->

					<!-- Equipment and Lease Options -->
					<f7-card class="padding-half">
						<f7-card-header>
							<f7-block-title>Hardware Leases / Installments</f7-block-title>
						</f7-card-header>
						<f7-card-content>
							<f7-row>
								<f7-col width="50">
									<p class="field-title">Type of Hardware - Pricing</p>
									<p>Build an Equipment tab to display Merchant Equipment</p>
								</f7-col>
								<f7-col width="50">
									<p class="field-title">Lease or Installment</p>
									<p>Build an Invoicing module to bill for the equipment</p>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>
					<!-- END Equipment and Lease Options-->

					<!-- Gift Cards -->
					<f7-card class="padding-half">
						<f7-card-header>
							<f7-block-title>Gift Cards</f7-block-title>
						</f7-card-header>
						<f7-card-content>
							<f7-row>
								<f7-col width="50">
									<p class="field-title">Monthly Fee:</p>
									<f7-list-input
										validate
										placeholder="1.59"
										step="0.01"
										error-message="Format: 2.95"
										type="number"
										style="background: rgb(216,252,253)"
									>
									</f7-list-input>
								</f7-col>
								<f7-col width="50">
									<p class="field-title">Gift Card Options</p>
									<f7-list-input
										validate
										placeholder="1.59"
										step="0.01"
										error-message="Format: 2.95"
										type="number"
										style="background: rgb(216,252,253)"
									>
									</f7-list-input>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>
					<!-- END Gift Cards-->
					<!-- END Pricing Cards -->
				</f7-card-content>
			</f7-list>
		</f7-card>
		<!-- END Account Pricing Tab -->
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "subscriptionsPricingComponent",
	mixins: [],
	components: {},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		...mapState(["Invoices"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less"></style>
