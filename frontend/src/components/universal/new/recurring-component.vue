<template>
	<div class="container py-0">
		<v-overlay
			:absolute="true"
			:value="recurringPopup"
		>
		<v-sheet
			light
			color="v-primary-base"
			class="mx-auto"
			height="565"
			width="600">
			<nav class="close-button">
				<div class="header">
					Recurring
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
			<div class="recurring-popup">
				<div class="row recurring-popup">
					

					<div class="row">
						<div class="col-12 py-0">
							<v-card>
								<div class="row p-2">
									<div class="title">Select Frequency</div>
									<div class="col-25p">
										<div class="field">
											<div class="label">
												Daily
											</div>  
											<div class="content">
												<DxSwitch 
												:value="isDaily"
												@option-changed="handleDailySwitch"/>
											</div>
										</div>
									</div>
									<div class="col-25p">
										<div class="field">
											<div class="label">
												Weekly
											</div>  
											<div class="content">
												<DxSwitch 
												:value="isWeekly"
												@option-changed="handleWeeklySwitch"/>
											</div>
										</div>
									</div>
									<div class="col-25p">
										<div class="field">
											<div class="label">
												Monthly
											</div>  
											<div class="content">
												<DxSwitch 
												:value="isMonthly"
												@option-changed="handleMonthlySwitch"/>
											</div>
										</div>
									</div>
									<div class="col-25p">
										<div class="field">
											<div class="label">
												Yearly
											</div>  
											<div class="content">
												<DxSwitch
												:value="isYearly"
												@option-changed="handleYearlySwitch"/>
											</div>
										</div>
									</div>
								</div>
								<template>
									<v-divider></v-divider>
									<v-divider></v-divider>
									<v-divider></v-divider>
								</template>

								<!-- Daily Block -->
								<template>
									<div class="container" v-if="isDaily">
										<div class="row">
											<div class="col-3">
												<div class="field">
													<div class="label">
														Every Day
													</div>  
													<div class="content">
														<DxSwitch :value="false"/>
													</div>
												</div>
											</div>
											
										</div>
										<div class="row">
											<div class="col-3">
												<div class="field">
													<div class="label">
														Every Weekday
													</div>  
													<div class="content">
														<DxSwitch :value="false"/>
													</div>
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-2 flex items-center">
												<div class="field">
													<div class="label">
														Every
													</div>  
													<div class="content">
														<DxSwitch :value="false"/>
													</div>
												</div>
											</div>
											<div class="col-2 flex items-center">
												<div class="field"> 
													<div>
														<DxTextBox
														styling-mode="outlined" />
													</div>
												</div>
											</div>
											<div class="col-4 flex items-center">
												<p>Days</p>
											</div>
										</div>
									</div>
								</template>

								<!-- Weekly Block -->
								<template>
									<div class="container" v-if="isWeekly">
										<div class="row">
											<div class="col-2">
												<div class="field">
													<div class="label">
														Every
													</div>  
													<div class="content">
														<DxSwitch :value="false"/>
													</div>
												</div>
											</div>
											<div class="col-3 flex items-center">
												<div class="field">
													<div class="content">
														<DxTextBox
															placeholder="3"
															styling-mode="outlined" />
													</div>
												</div>
											</div>
											<div class="col-2 flex items-center">
												<p>Week(s)</p>
											</div>
											<div class="col-5">
												<div class="field">
													<div class="label">
														On
													</div> 
													<div class="content">
														<v-select
															:items="daysOfWeek"
														></v-select>
													</div>
												</div>
											</div>

										</div>

									</div>
								</template>

								<!-- Monthly Block -->
								<template>
									<div class="container" v-if="isMonthly">
										<div class="row">
											<div class="col-2 flex items-center">
												<div class="field">
													<div class="label">
														Every
													</div>  
													<div class="content">
														<DxSwitch 
														:value="monthly.monthIntervalSelected"
														@option-changed="monthIntervalClick"/>
													</div>
												</div>
											</div>
											<div class="col-2 flex items-center">
												<div class="field"> 
													<div>
														<DxTextBox
														styling-mode="outlined" />
													</div>
												</div>
											</div>
											<div class="col-4 flex items-center">
												<p>Months</p>
											</div>
										</div>
										<div class="row">
											<div class="col-2 flex items-center">
												<div class="field">
													<div class="label">
														Every
													</div>  
													<div class="content">
														<DxSwitch 
														:value="monthly.daysOfMonthSelected"
														@option-changed="daysOfMonthClick"/>
													</div>
												</div>
											</div>
											<div class="col-3 flex items-center">
												<div class="field"> 
													<div>
														<DxTextBox
														placeholder="3,12,23"
														styling-mode="outlined" />
													</div>
												</div>
											</div>
											<div class="col-4 flex items-center">
												<p>days of the month</p>
											</div>
										</div>

										<div class="row">
											<div class="col-4">
												<div class="field">
													<div class="label">
														1st of the Month
													</div>  
													<div class="content">
														<v-checkbox 
														color="#F75403"
														:value="monthly.firstOfMonth" 
														@click.stop="firstOfMonthClick"></v-checkbox>
													</div>
												</div>
											</div>
											<div class="col-4">
												<div class="field">
													<div class="label">
														15th of the Month
													</div> 
													<div class="content">
														<v-checkbox 
														color="#F75403"
														:value="monthly.middleOfMonth" 
														@click.stop="middleOfMonthClick"></v-checkbox>
													</div>
												</div>
											</div>
									
											<div class="col-4">
												<div class="field">
													<div class="label">
														Last day of the Month
													</div> 
													<div class="content">
														<v-checkbox 
														color="#F75403"
														:value="monthly.lastOfMonth" 
														@click.stop="lastOfMonthClick"></v-checkbox>
													</div>
												</div>
											</div>

										</div>
									</div>
								</template>

								<!-- Yearly Block -->
								<template>
									<div class="container" v-if="isYearly">
										<div class="row">
											<div class="col-2">
												<div class="field">
													<div class="label">
														Every
													</div>  
													<div class="content">
														<DxSwitch :value="false"/>
													</div>
												</div>
											</div>
											<div class="col-2 flex items-center">
												<div class="field">
													<div class="content">
														<DxTextBox
															placeholder="3"
															styling-mode="outlined" />
													</div>
												</div>
											</div>
											<div class="col-2 flex items-center">
												<p>Year(s) on</p>
											</div>
											<div class="col-3">
												<div class="field">
													<div class="content">
														<v-select
															:items="Static.months"
															item-text="name"
															item-value="name"
															single-line
														></v-select>
													</div>
												</div>
											</div>
											<div class="col-3">
												<div class="field">
													<div class="label">

													</div> 
													<div class="content">
														<v-select
															:items="Static.days"
															item-text="name"
															item-value="name"
															single-line
														></v-select>
													</div>
												</div>
											</div>

										</div>

									</div>
								</template>

								
							</v-card>
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
							Save
						</v-btn>
					</div>
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
	name: "recurringComponent",
	mixins: [],
	components: {
		DxNumberBox,
		DxTextBox,
		DxSwitch
	},
	props: {
		recurringPopup: {
			type: Boolean
		}
	},
	data() {
		return {
			//Main Data 

//Form Data
			isDaily: false,
			isWeekly: false,
			isMonthly: false,
			isYearly: false,
			daysOfWeek: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			daily: {
				everyday: false,
				everyWeekday: false,
				intervalDays: 0
			},
			weekly: {
				intervalDays: 0,
				dayOfWeek: ""
			},
			monthly: {
				monthIntervalSelected: false,
				monthInterval: 0,
				daysOfMonthSelected: false,
				daysOfMonth: [],
				firstOfMonth: false,
				middleOfMonth: false,
				lastOfMonth: false,
			},
			yearly: {

			},

		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		findEvent(e) {
			console.log('findEvent e',e);
		},
		closePopup(e) {
			this.$emit('closePopup', false)
		},
		//Overall Methods
		handleDailySwitch(e) {
			if(e.name === "value" && e.value === true) {
				this.isDaily = true
				this.isWeekly = false
				this.isMonthly = false
				this.isYearly = false
			} else if(e.name === "value" && e.value === false) {
				this.isDaily = false
			}
		},
		handleWeeklySwitch(e) {
			if(e.name === "value" && e.value === true) {
				this.isDaily = false
				this.isWeekly = true
				this.isMonthly = false
				this.isYearly = false
			}else if(e.name === "value" && e.value === false) {
				this.isWeekly = false
			}
		},
		handleMonthlySwitch(e) {
			if(e.name === "value" && e.value === true) {
				this.isDaily = false
				this.isWeekly = false
				this.isMonthly = true
				this.isYearly = false
			}else if(e.name === "value" && e.value === false) {
				this.isMonthly = false
			}
		},
		handleYearlySwitch(e) {
			if(e.name === "value" && e.value === true) {
				this.isDaily = false
				this.isWeekly = false
				this.isMonthly = false
				this.isYearly = true
			}else if(e.name === "value" && e.value === false) {
				this.isYearly = false
			}
		},

		//Monthly methods
		monthIntervalClick(e) {
			console.log('e', e)
			if(e.name === "value" && e.value === true) {
				this.monthly.monthIntervalSelected = true
				this.monthly.daysOfMonthSelected = false
				this.monthly.firstOfMonth = false
				this.monthly.middleOfMonth = false
				this.monthly.lastOfMonth = false
			}else if(e.name === "value" && e.value === false) {
				this.monthly.monthIntervalSelected = false
			}
			
		},
		daysOfMonthClick(e) {
			console.log('e', e)
			if(e.name === "value" && e.value === true) {
				this.monthly.monthIntervalSelected = false
				this.monthly.daysOfMonthSelected = true
				this.monthly.firstOfMonth = false
				this.monthly.middleOfMonth = false
				this.monthly.lastOfMonth = false
			}else if(e.name === "value" && e.value === false) {
				this.monthly.daysOfMonthSelected = false
			}
		},
		firstOfMonthClick(e) {
			console.log('firstOfMonthClick e', e)
			console.log('this.monthly', this.monthly)
			this.monthly.firstOfMonth = !this.monthly.firstOfMonth

			if(this.monthly.firstOfMonth) {
				this.monthly.monthIntervalSelected = false
				this.monthly.daysOfMonthSelected = false
				this.monthly.middleOfMonth = false
				this.monthly.lastOfMonth = false
			}
		},
		middleOfMonthClick(e) {
			console.log('e', e)
			this.monthly.middleOfMonth = !this.monthly.middleOfMonth
			if(this.monthly.middleOfMonth) {
				this.monthly.monthIntervalSelected = false
				this.monthly.daysOfMonthSelected = false
				this.monthly.firstOfMonth = false
				this.monthly.lastOfMonth = false
			}
		},
		lastOfMonthClick(e) {
			console.log('e', e)
			this.monthly.lastOfMonth = !this.monthly.lastOfMonth
			if(this.monthly.lastOfMonth) {
				this.monthly.monthIntervalSelected = false
				this.monthly.daysOfMonthSelected = false
				this.monthly.firstOfMonth = false
				this.monthly.middleOfMonth = false
			}
		},

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
