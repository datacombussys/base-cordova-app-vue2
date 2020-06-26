<template>
	<div>
		<f7-row>  
			<f7-block-title class="full-width" medium>Contact Information</f7-block-title>
			<f7-col width="50">
				<div class="contact-types-header">Primary Contacts:</div> 
				<f7-row class="full-width display-flex justify-content-space-evenly align-items-center">
					<f7-col width="60">
						<f7-menu>
							<f7-menu-item text="Add Contacts" dropdown icon-color="white" icon-f7="arrowtriangle_down_fill">
								<f7-menu-dropdown left content-height="300px">
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" 
										class="bg-color-deeporange" 
										style="font-size: 1.5em; font-weight: 600;"
										text="Search" 
										searchbar-enable>
										<f7-icon class="margin-left" size="30" color="white" f7="search"></f7-icon>
									</f7-menu-dropdown-item>
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" 
										class="bg-color-teal" 
										style="font-size: 1.5em; font-weight: 600;" 
										text-color="white" 
										text="Add New">
										<f7-icon class="margin-left" size="30" color="white" f7="plus_app"></f7-icon>
									</f7-menu-dropdown-item>
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
									<f7-menu-dropdown-item 
										v-show="companyForm.id" 
										v-for="employee in Users.companyFilteredEmployeeList" 
										:key="employee.id" 
										href="#" 
										@click.prevent="menudropdown(employee.user.id)" 
										:text="employee.employee_id + '-' + employee.user.full_name">
									</f7-menu-dropdown-item>
									<f7-menu-dropdown-item 
										v-show="!companyForm.id" 
										href="#" 
										@click.prevent="menudropdown(employee.user.id)" 
										text="Select a company first">
									</f7-menu-dropdown-item>
								</f7-menu-dropdown>
							</f7-menu-item>
						</f7-menu>
					</f7-col>
				</f7-row>
				<f7-row v-if="primaryContactList.length === 0">
					<div class="no-user-container text-align-center padding-top">
						No "Primary Contacts" to display!
						<f7-row class="margin-top full-width display-flex justify-content-center">
							<f7-col width="50">
								<b-button 
									size="is-medium"
									icon-left="plus-thick"
									href="/userprofile/"
									type="is-dark">
									<span class="btn-text">Add New</span> 
								</b-button>
							</f7-col>
						</f7-row>
					</div>
				</f7-row>
				<f7-row v-if="primaryContactList.length != 0">
					<div class="user-container">
						<f7-block class="padding-half" type="textarea" title="Admin Group">
							<f7-chip text="Manager"></f7-chip>
							<f7-chip text="Admin"></f7-chip>
							<f7-chip text="Accounting"></f7-chip>
							<f7-chip text="Executive" media-bg-color="pink" media="J"></f7-chip>
						</f7-block>
					</div>
				</f7-row>
				<f7-row>
					<div class="contact-types-header">Technical Contacts:</div> 
					<f7-row class="full-width display-flex justify-content-space-evenly align-items-center">
						<f7-col width="60">
							<f7-menu>
								<f7-menu-item text="Add Contacts" dropdown icon-color="white" icon-f7="arrowtriangle_down_fill">
									<f7-menu-dropdown left content-height="300px">
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
											<f7-menu-dropdown-item href="#" 
												class="bg-color-deeporange" 
												style="font-size: 1.5em; font-weight: 600;"
												text="Search" 
												searchbar-enable>
												<f7-icon class="margin-left" size="30" color="white" f7="search"></f7-icon>
											</f7-menu-dropdown-item>
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" 
											class="bg-color-teal" 
											style="font-size: 1.5em; font-weight: 600;" 
											text-color="white" 
											text="Add New">
											<f7-icon class="margin-left" size="30" color="white" f7="plus_app"></f7-icon>
										</f7-menu-dropdown-item>
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 7"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 8"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 9"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 10"></f7-menu-dropdown-item>
									</f7-menu-dropdown>
								</f7-menu-item>
							</f7-menu>
						</f7-col>
					</f7-row>
					<f7-row class="full-width" v-if="technicalContactList.length === 0">
						<div class="no-user-container text-align-center padding-top">
							No "Technical Contacts" to display!
							<f7-row class="margin-top full-width display-flex justify-content-center">
								<f7-col width="50">
									<b-button size="is-medium"
										icon-left="plus-thick"
										type="is-dark">
										<span class="btn-text">Add New</span> 
									</b-button>
								</f7-col>
							</f7-row>
						</div>
					</f7-row>
					<f7-row v-if="technicalContactList.length != 0" class="full-width">
						<div class="user-container">
							<f7-block class="padding-half" type="textarea" title="Admin Group">
								<f7-chip text="Manager"></f7-chip>
								<f7-chip text="Admin"></f7-chip>
								<f7-chip text="Accounting"></f7-chip>
								<f7-chip text="Executive" media-bg-color="pink" media="J"></f7-chip>
							</f7-block>
						</div>
					</f7-row>
				</f7-row>
			</f7-col>
			<f7-col width="50">
				<div class="contact-types-header">Billing Contacts:</div> 
				<f7-row class="full-width display-flex justify-content-space-evenly align-items-center">
					<f7-col width="60">
						<f7-menu>
							<f7-menu-item text="Add Contacts" dropdown icon-color="white" icon-f7="arrowtriangle_down_fill">
								<f7-menu-dropdown left content-height="300px">
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" 
											class="bg-color-deeporange" 
											style="font-size: 1.5em; font-weight: 600;"
											text="Search" 
											searchbar-enable>
											<f7-icon class="margin-left" size="30" color="white" f7="search"></f7-icon>
										</f7-menu-dropdown-item>
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" 
										class="bg-color-teal" 
										style="font-size: 1.5em; font-weight: 600;" 
										text-color="white" 
										text="Add New">
										<f7-icon class="margin-left" size="30" color="white" f7="plus_app"></f7-icon>
									</f7-menu-dropdown-item>
									<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 7"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 8"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 9"></f7-menu-dropdown-item>
									<f7-menu-dropdown-item href="#" text="Menu Item 10"></f7-menu-dropdown-item>
								</f7-menu-dropdown>
							</f7-menu-item>
						</f7-menu>
					</f7-col>
				</f7-row>
				<f7-row class="full-width" v-if="billingContactList.length === 0">
					<div class="no-user-container text-align-center padding-top">
						No "Billing Contacts" to display!
						<f7-row class="margin-top full-width display-flex justify-content-center">
							<f7-col width="50">
								<b-button size="is-medium"
									icon-left="plus-thick"
									type="is-dark">
									<span class="btn-text">Add New</span> 
								</b-button>
							</f7-col>
						</f7-row>
					</div>
				</f7-row>
				<f7-row v-if="billingContactList.length != 0">
					<div class="user-container">
						<f7-block class="padding-half" type="textarea" title="Admin Group">
							<f7-chip text="Manager"></f7-chip>
							<f7-chip text="Admin"></f7-chip>
							<f7-chip text="Accounting"></f7-chip>
							<f7-chip text="Executive" media-bg-color="pink" media="J"></f7-chip>
						</f7-block>
					</div>
				</f7-row>
				<f7-row>
					<div class="contact-types-header">Shipping Contacts:</div> 
					<f7-row class="full-width display-flex justify-content-space-evenly align-items-center">
						<f7-col width="60">
							<f7-menu>
								<f7-menu-item text="Add Contacts" dropdown icon-color="white" icon-f7="arrowtriangle_down_fill">
									<f7-menu-dropdown left content-height="300px">
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
											<f7-menu-dropdown-item href="#" 
												class="bg-color-deeporange" 
												style="font-size: 1.5em; font-weight: 600;"
												text="Search" 
												searchbar-enable>
												<f7-icon class="margin-left" size="30" color="white" f7="search"></f7-icon>
											</f7-menu-dropdown-item>
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" 
											class="bg-color-teal" 
											style="font-size: 1.5em; font-weight: 600;" 
											text-color="white" 
											text="Add New">
											<f7-icon class="margin-left" size="30" color="white" f7="plus_app"></f7-icon>
										</f7-menu-dropdown-item>
										<f7-menu-dropdown-item divider></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 7"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 8"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 9"></f7-menu-dropdown-item>
										<f7-menu-dropdown-item href="#" text="Menu Item 10"></f7-menu-dropdown-item>
									</f7-menu-dropdown>
								</f7-menu-item>
							</f7-menu>
						</f7-col>
					</f7-row>
					<f7-row class="full-width" v-if="additionalContactList.length === 0">
						<div class="no-user-container text-align-center padding-top">
							No "Shipping Contacts" to display!
							<f7-row class="margin-top full-width display-flex justify-content-center">
								<f7-col width="50">
									<b-button size="is-medium"
										icon-left="plus-thick"
										type="is-dark">
										<span class="btn-text">Add New</span> 
									</b-button>
								</f7-col>
							</f7-row>
						</div>
					</f7-row>
					<f7-row v-if="additionalContactList.length != 0" class="full-width">
						<div class="user-container">
							<f7-block class="padding-half" type="textarea" title="Admin Group">
								<f7-chip text="Manager"></f7-chip>
								<f7-chip text="Admin"></f7-chip>
								<f7-chip text="Accounting"></f7-chip>
								<f7-chip text="Executive" media-bg-color="pink" media="J"></f7-chip>
							</f7-block>
						</div>
					</f7-row>
				</f7-row>
			</f7-col>
		</f7-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';

// Mixins
import { LocaleMixin } from '@/mixins/businesses/locale-mixins';


export default {
	name: "customDropdownComponent",
	components: {},
	mixins: [LocaleMixin],
	props: {
	
	},
	data() {
		return {
			//Main Data

	
		}
	},
	methods: {
		async testingMethod(e) {


		},

			
	},
	computed: {
		// ...mapState([]),
		// ...mapGetters([]),
	},
	created() {},
	async mounted() {
		
		
	}

};
</script>

<style scoped lang="less">
.user-container {
	font-size: 1.5em;
	font-weight: 600;
	width: 100%;
	height: 200px;
	border: 1px solid rgb(82, 82, 82);
	margin-bottom: 30px;
	background: rgba(201, 243, 255, 0.5);
}
.no-user-container {
	font-size: 1.2em;
	font-weight: 600;
	color: #8f1414;
	width: 100%;
	height: 200px;
	border: 1px solid rgb(82, 82, 82);
	margin-bottom: 30px;
	background: rgba(201, 243, 255, 0.5);
}
.contact-types-header {
	font-size: 1.5em;
}
</style>
