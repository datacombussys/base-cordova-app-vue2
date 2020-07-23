<template>
	<f7-page name="employee-profile">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
		<!-- Main Container Row -->
		<f7-row class="display-flex justify-content-center full-width margin-right">
			<!-- Left Column -->
			<f7-col width="100" small="30" class="sticky-top">
				<!-- Vue Scrollbar (dragger) -->
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100vh;">
					<!-- el1 -->
					<div>
					<!-- el2 -->
					<f7-block class="display-block margin-top-half full-height">
						<f7-card>
							<f7-card-header
								class="no-border hovering"
								valign="bottom"
								style="background-color: lightgrey;"
							>
								<f7-row class="full-width display-flex align-items-center">
									<f7-col width="50">
										<f7-block-title class="full-width no-margin-bottom">Profile</f7-block-title>
									</f7-col>
									<f7-col width="50" class="text-align-right">
										<f7-link sheet-open=".edit-profile-image">
											<b-icon class="edit-icon" icon="pencil"></b-icon>
										</f7-link>
										<profile-image-popup-component
												ref="profileImageComponent"
												:profileImageSettings="profileImageSettings"
												:profileData="employeeForm">
											</profile-image-popup-component>
									</f7-col>
								</f7-row>
							</f7-card-header>
							<f7-card-content>
								<f7-row v-if="!employeeForm.profile_img" class="display-flex justify-content-center">
									<img
										src="/static/UserProfileGrey170x170.png"
										style="width:170px;height:170px;"
										alt="Please load User Profile"
									/>
								</f7-row>
								<f7-row v-if="employeeForm.profile_img" class="display-flex justify-content-center">
									<img :src="employeeForm.profile_img" style="width:170px;height:170px;" alt />
								</f7-row>
								<div v-if="employeeForm.user.barcode != undefined">
									<f7-row v-if="Object.keys(employeeForm.user.barcode).length != 0">
										<f7-col class="text-align-center margin-top">
											<img :src="employeeForm.user.barcode.image" style="width:75px;" alt="Please Load User" />
											<div>{{ employeeForm.user.barcode.barcode_number }}</div>
										</f7-col>
									</f7-row>
								</div>
								<div v-if="employeeForm.user.barcode != undefined">
									<f7-row v-if="Object.keys(employeeForm.user.barcode).length === 0">
										<f7-col class="text-align-center margin-top">
											<div>Please Load User</div>
										</f7-col>
									</f7-row>
								</div>
							</f7-card-content>
							<f7-card-footer class="display-flex justify-content-center">
								<f7-block-title
									medium
									class="margin-top-half text-align-center"
								>{{ employeeForm.user.first_name }} {{ employeeForm.user.last_name }}</f7-block-title>
							</f7-card-footer>
						</f7-card>

						<profile-card-component :profileForm="employeeForm" :cardSettings="profileCardSettings"></profile-card-component>

						<f7-card class="margin-top">
							<f7-card-content class="padding-half text-align-center">
								<f7-row v-show="!hideCreateUser">
									<f7-col>
										<f7-button @click="newUserButton" fill class="bg-color-red">Add New User</f7-button>
									</f7-col>
								</f7-row>
								<f7-row class="full-width" v-show="!accountSettings.hideSaveItem">
									<f7-col width="100" class="display-flex margin">
										<f7-button
											fill
											@click.prevent="createUserandClose"
											:disabled="canSubmitUserForm"
											class="bg-color-green trans-btn-left"
										>
											<span>Save Employee</span>
										</f7-button>
										<f7-button
											fill
											popover-open=".new-transaction"
											:disabled="canSubmitUserForm"
											class="bg-color-green trans-btn-right"
											icon-color="white"
											icon-size="40"
											icon="mdi mdi-menu-down"
										></f7-button>
										<f7-popover class="new-transaction">
											<f7-list>
												<f7-list-item
													link="#"
													no-chevron
													@click.prevent="createUserandNew"
													popover-close
													title="Save and New"
												></f7-list-item>
												<f7-list-item
													link="#"
													no-chevron
													@click.prevent="createUserandEdit"
													popover-close
													title="Save and Edit"
												></f7-list-item>
												<f7-list-item
													link="#"
													no-chevron
													@click.prevent="createUserandClose"
													popover-close
													title="Save and Close"
												></f7-list-item>
											</f7-list>
										</f7-popover>
									</f7-col>
								</f7-row>
								<f7-row class="full-width display-flex justify-content-center">
									<f7-col width="90" v-show="hideCreateUser">
										<f7-button @click="clearandResetButton" fill class="bg-color-red">Reset Form</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
						<f7-row>
							<f7-col class="no-margin no-padding">
								<f7-button @click="testingMethod" fill class="bg-color-orange">test</f7-button>
							</f7-col>
						</f7-row>
						<f7-row>
							<f7-block class="margin padding"></f7-block>
						</f7-row>
		
					</f7-block>	
					</div>
				</div>
				<!-- END Scrollbar-->
			</f7-col>
			<!-- END Left Column -->

			<!-- Right Column -->
			<f7-col width="100" medium="70" class="no-margin-top">
				<!-- Vue Scrollbar (dragger) -->
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100vh;"
				>
					<!-- el1 -->
					<div>
						<!-- el2 -->
						<f7-block class="margin-top-half">
							<f7-row class="full-width display-flex justify-content-center">
								<article v-if="Errors.userErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</article>
								<!-- Error Handling -->
							<f7-row 
								v-for="errorArray in errorData" 
								:key="errorArray.id">	
								<article
									v-if="errorArray[0] === 'non_field_errors'"
									class="has-background-white margin-top-half"
									:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
									<div 
										class="message-body">
										{{ errorArray[1][0] }}
									</div>
								</article>
							</f7-row>
							<!-- END Error Handling -->
							</f7-row>
							<f7-card>
								<f7-card-content>
									<f7-block-title medium class="no-margin-top">Dashboard</f7-block-title>
									<f7-row class="display-flex justify-content-space-around">
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link href="/groups-permissions/" icon-only>
													<f7-icon size="50" icon="mdi mdi-account-lock">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Permissions</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link href="/users-groups/" icon-only>
													<f7-icon size="50" icon="mdi mdi-account-group-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Permission Groups</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link href="/clock-screen/" icon-only>
													<f7-icon size="50" icon="mdi mdi-calendar-clock">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Clock-In</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link href="/work-schedule/" icon-only>
													<f7-icon size="50" icon="mdi mdi-calendar-month-outline">
														<f7-badge color="red">3</f7-badge>
													</f7-icon>
												</f7-link>
												<p>Schedule</p>
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>
						</f7-block>
						<f7-block>
							<b-tabs type="is-boxed" v-model="accountSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Parent Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
									<parent-component
										ref="parentComponentRef"
										:toggleEditProfile="toggleEditProfile"
										:accountSettings="accountSettings"
										:moduleInfo="moduleInfo"
										:formData="employeeForm">
									</parent-component>
								</b-tab-item>
								<!-- END Parent Company Tab -->

								<!-- Begin Profile Tab -->
								<b-tab-item label="Profile" icon="cube-scan" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width margin-bottom-half">Profile</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon class="edit-icon" icon="pencil"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin profile Display List-->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width margin-top-half" medium>Employee Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="employeeForm.user.first_name"></f7-list-item>
														<p class="field-title">Employee ID:</p>
														<f7-list-item :title="employeeForm.employee_number"></f7-list-item>
														<p class="field-title">SSN:</p>
														<f7-list-item :title="employeeForm.ssn"></f7-list-item>
														<p class="field-title">Work Phone:</p>
														<f7-list-item :title="employeeForm.work_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="employeeForm.user.street_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="employeeForm.user.city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="employeeForm.user.last_name"></f7-list-item>
														<p class="field-title">Date of Birth:</p>
														<f7-list-item :title="employeeForm.user.dob | moment('MMM, Do, YYYY')"></f7-list-item>
														<p class="field-title">Mobile Phone:</p>
														<f7-list-item :title="employeeForm.user.mobile_phone"></f7-list-item>
														<p class="field-title">Fax Number:</p>
														<f7-list-item :title="employeeForm.user.fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="employeeForm.user.state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="employeeForm.user.zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col>
														<p class="field-title">About Me:</p>
														<f7-list-item class="about-me-box" v-html="employeeForm.user.bio"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Login Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="employeeForm.user.email"></f7-list-item>
														<p class="field-title">Password:</p>
														<f7-list-item :title="employeeForm.user.password"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">PIN:</p>
														<f7-list-item :title="employeeForm.user.pin"></f7-list-item>
														<p class="field-title">Verify PW:</p>
														<f7-list-item :title="employeeForm.user.verify_pw"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Office/Warehouse</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Assign to Sales office:</p>
														<f7-toggle class="margin" :checked="employeeForm.is_sales_office_ee" disabled></f7-toggle>
														<p class="field-title">Assign to Warehouse:</p>
														<f7-toggle class="margin" :checked="employeeForm.is_warehouse_ee" disabled></f7-toggle>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sales Office Name:</p>
														<f7-list-item title="West Region"></f7-list-item>
														<p class="field-title">Warehouse Name:</p>
														<f7-list-item title="Central Warehouse"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list simple-list v-show="accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width margin-top-half" medium>Employee Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">
															First Name:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															class="datacom-input"
															validate
															required
															error-message="First name is required"
															pattern="[A-Za-z]*"
															:value="employeeForm.user.first_name"
															@input="employeeForm.user.first_name = $event.target.value"
															@change="requiredFieldsDone += 1"
															type="text"
														></f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'first_name'"
																class="has-background-white margin-top-half"
																:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
																<div 
																	class="message-body">
																	{{ errorArray[1][0] }}
																</div>
															</article>
														</f7-row>
														<!-- END Error Handling -->
													</f7-col>
													<f7-col width="50">
														<p class="field-title">
															Last Name:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															class="datacom-input"
															validate
															required
															error-message="Last name is required"
															pattern="[A-Za-z]*"
															:value="employeeForm.user.last_name"
															@input="employeeForm.user.last_name = $event.target.value"
															@change="requiredFieldsDone += 1"
															type="text"
														></f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'last_name'"
																class="has-background-white margin-top-half"
																:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
																<div 
																	class="message-body">
																	{{ errorArray[1][0] }}
																</div>
															</article>
														</f7-row>
														<!-- END Error Handling -->
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Employee ID:</p>
														<f7-list-item :title="employeeForm.employee_number"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Date of Birth:</p>
														<f7-date-picker-component @receiveDate="receiveDobDate"></f7-date-picker-component>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">SSN:</p>
														<f7-list-input
															validate
															class="datacom-input"
															placeholder="000-00-0000"
															pattern="[0-9]{1,9}"
															error-message="Format '000000000'"
															:value="employeeForm.ssn"
															@input="employeeForm.ssn = $event.target.value"
															type="text"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Mobile Phone:</p>
														<f7-list-input
															validate
															class="datacom-input"
															placeholder="(800) 555-1234"
															pattern="[0-9]{1,10}"
															error-message="Format '##########'"
															:value="employeeForm.user.mobile_phone"
															@input="employeeForm.user.mobile_phone = $event.target.value"
															type="text"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Work Phone:</p>
														<f7-list-input
															validate
															placeholder="(800) 555-1234"
															pattern="[0-9]{1,10}"
															error-message="Format '##########'"
															:value="employeeForm.work_phone"
															@input="employeeForm.work_phone = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax Number:</p>
														<f7-list-input
															validate
															placeholder="(800) 555-1234"
															pattern="[0-9]{1,10}"
															error-message="Format '##########'"
															:value="employeeForm.user.fax"
															@input="employeeForm.user.fax = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="30">
														<p class="field-title">
															Country:
														</p>
														<f7-list-input
															required
															:value="localeCities.user_country_id"
															@input="getUserStates"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option
																v-for="country in GET_COUNTRY_LIST"
																:key="country.id"
																:value="country.id">
																{{ country.name }}
															</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-input
															:value="localeCities.user_state_id"
															@input="getUserCities"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option 
																v-for="state in GET_STATE_LIST" 
																:key="state.id" 
																:value="state.id">
																{{state.name}}
															</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-input
															:value="employeeForm.user.city"
															@input="employeeForm.user.city = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option 
																v-for="city in GET_CITY_LIST" 
																:key="city.id" 
																:value="city.id">
																{{city.name}}
															</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Street Address:</p>
														<f7-list-input
															:value="employeeForm.user.street_address"
															@input="employeeForm.user.street_address = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-input
															validate
															placeholder="90210"
															pattern="[0-9]{1,5}"
															error-message="Format '#####'"
															:value="employeeForm.user.zip"
															@input="employeeForm.user.zip = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row class="full-width">
													<f7-col width="100">
														<p class="field-title">About Me:</p>
														<f7-text-editor ref="userBio" style="background: rgb(216,252,253)" />
													</f7-col>
												</f7-row>
											</f7-list>

												<set-password-component 
													:accountSettings="accountSettings"
													:loginForm="employeeForm"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</set-password-component>

											<f7-list simple-list v-show="accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Business Unit</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Assign to Sales office:</p>
														<f7-toggle 
															:disabled="employeeForm.is_warehouse_ee" 
															@change="employeeForm.is_sales_office_ee = $event.target.checked" 
															class="margin">
														</f7-toggle>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sales Office Name:</p>
														<f7-list-input 
															:disabled="!employeeForm.is_sales_office_ee"
															@change="sales_office_id = [$event.target.value]"
															type="select">
															<option 
																v-for="office in GET_SALES_OFFICE_LIST" 
																:value="office.id"
																:key="office.id">
																{{ office.salesoffice_name }}
															</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Assign to Warehouse:</p>
														<f7-toggle
															:disabled="employeeForm.is_sales_office_ee"
															@change="employeeForm.is_warehouse_ee = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Warehouse Name:</p>
														<f7-list-input 
															:disabled="!employeeForm.is_warehouse_ee"
															@change="warehouse_employees = [$event.target.value]"
															type="select">
															<option 
																v-for="warehouse in GET_WAREHOUSE_LIST" 
																:value="warehouse.warehouse_name"
																:key="warehouse.id">
																{{ warehouse.warehouse_name }}
															</option>
														</f7-list-input>
													</f7-col>
												</f7-row>

												<!-- Delete / Update Buttons-->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateUserButtons">
														<f7-row class="margin">
															<f7-col width="25">
																<f7-button fill class="bg-color-red" @click="deleteEmployee">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateUserPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!accountSettings.hideSaveItem">
														<f7-row class="margin level-right">
															<f7-col width="25">
																<f7-button fill @click="accountSettings.activeTab = 3" class="bg-color-deeporange">Next -></f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END Profile Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Profile Tab -->

								<!-- Begin Human Resources Tab -->
								<b-tab-item label="Human Resources" icon="account-supervisor-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width margin-bottom-half">Human Resources</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Human Resources Display List -->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Employment Details</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Is Active?:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.user.is_active" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Position:</p>
														<f7-list-item :title="employeeForm.position_title"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Contract Type:</p>
														<f7-list-item :title="employeeForm.salary_type"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Employment Type:</p>
														<f7-list-item :title="employeeForm.employee_type"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Business Status:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.is_business" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Business Name:</p>
														<f7-list-item :title="employeeForm.org_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Compensation</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Compensation:</p>
														<f7-list-item :title="employeeForm.salary"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Frequency:</p>
														<f7-list-item :title="employeeForm.pay_cycle"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Employee Details</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Hire Date:</p>
														<f7-list-item :title="employeeForm.hire_date | moment('MMM, Do, YYYY')"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Exit Date:</p>
														<f7-list-item :title="employeeForm.termination_date | moment('MMM, Do, YYYY')"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Reporting Manager:</p>
														<f7-list-item :title="employeeForm.reporting_manager"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Permission Group:</p>
														<f7-block type="textarea" title="Admin Group">
															<f7-chip text="Manager" @click="deleteChip"></f7-chip>
															<f7-chip text="Admin" @click="deleteChip"></f7-chip>
															<f7-chip text="Accounting" @click="deleteChip"></f7-chip>
															<f7-chip text="Executive" media-bg-color="pink" media="J" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Modules Assigned:</p>
														<f7-block type="textarea" title="Admin Group">
															<f7-chip text="Example Chip" @click="deleteChip"></f7-chip>
															<f7-chip text="Jane Doe" @click="deleteChip">
																<img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
															</f7-chip>
															<f7-chip text="One More Chip" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Subordinates:</p>
														<f7-block type="textarea" title="list of people">
															<f7-chip text="Jow Smith" @click="deleteChip"></f7-chip>
															<f7-chip text="Jane Doe" @click="deleteChip">
																<img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
															</f7-chip>
															<f7-chip text="Bill Nye" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Human Resources Display List -->
											<!-- Begin Human Resources Edit List -->
											<f7-list v-show="accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Employment Details</f7-block-title>
													<f7-col width="30">
														<p class="field-title">Is Active?:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.user.is_active"
																@input="employeeForm.user.is_active = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Position:</p>
														<f7-list-input
															type="select"
															:value="employeeForm.position_title"
															@input="employeeForm.position_title = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option
																v-for="position in GET_POSITIONS_LIST"
																:key="position.id"
																:value="position.name"
															>{{ position.name }}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Edit Positions:</p>
														<f7-button small popup-open=".positions-popup" outline>Edit</f7-button>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Contract Type:</p>
														<f7-list-input
															:value="employeeForm.salary_type"
															@input="employeeForm.salary_type = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option v-for="contract in Static.contractType" :key="contract.id" :value="contract">
																{{
																contract
																}}
															</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Employment Type:</p>
														<f7-list-input
															:value="employeeForm.employee_type"
															@input="employeeForm.employee_type = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option v-for="type in Static.employeeType" :key="type.id" :value="type">
																{{
																type
																}}
															</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Business Status:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.is_business"
																@change="employeeForm.is_business = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Business Name:</p>
														<f7-list-input
															:disabled="!employeeForm.is_business"
															:value="employeeForm.org_name"
															@input="employeeForm.org_name = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Compensation</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Compensation:</p>
														<f7-list-input
															:value="employeeForm.salary"
															@input="employeeForm.salary = $event.target.value"
															type="number"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Frequency:</p>
														<f7-list-input
															:value="employeeForm.pay_cycle"
															@input="employeeForm.pay_cycle = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option
																v-for="frequency in Static.payFrequency"
																:key="frequency.id"
																:value="frequency"
															>
																{{
																frequency
																}}
															</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Employee Details</f7-block-title>
													<f7-col width="50">
														<f7-row class="display-flex align-items-center">
															<f7-col width="70">
																<p class="field-title">Hire Date:</p>
																<f7-date-picker-component @receiveDate="receiveHireDate"></f7-date-picker-component>
															</f7-col>
															<f7-col width="30">
																<f7-button @click="clearHireDate">Clear</f7-button>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex align-items-center">
															<f7-col width="70">
																<p class="field-title">Exit Date:</p>
																<f7-date-picker-component @receiveDate="receiveExitDate"></f7-date-picker-component>
															</f7-col>
															<f7-col width="30">
																<f7-button @click="clearTermDate">Clear</f7-button>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Management Details</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Reporting Manager:</p>
														<f7-list-input
															:value="employeeForm.reporting_manager"
															@input="employeeForm.reporting_manager = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option name="ichael Hall" id>Michael Hall</option>
															<option name="Jordan Smith" id>Jordan Smith</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Assigned Permissions:</p>
														<f7-block type="textarea" title="Admin Group">
															<f7-chip text="Manager" @click="deleteChip"></f7-chip>
															<f7-chip text="Admin" @click="deleteChip"></f7-chip>
															<f7-chip text="Accounting" @click="deleteChip"></f7-chip>
															<f7-chip text="Executive" media-bg-color="pink" media="J" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Is a Manager?</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.is_manager"
																@change="employeeForm.is_manager = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Subordinates:</p>
														<f7-block type="textarea" title="Admin Group">
															<f7-chip text="Manager" @click="deleteChip"></f7-chip>
															<f7-chip text="Admin" @click="deleteChip"></f7-chip>
															<f7-chip text="Accounting" @click="deleteChip"></f7-chip>
															<f7-chip text="Executive" media-bg-color="pink" media="J" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>System Permissions Level</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Module Manager?</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.is_module_manager"
																@change="employeeForm.is_module_manager = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<div>
														<f7-list-item title="Modules" smart-select :smart-select-params="{openIn: 'popover'}">
															<select name="modules" multiple>
																<option value="Blog" selected>Blog</option>
																<option value="Website">Website</option>
																<option value="Accounting">Accounting</option>
																<option value="Human Resurces">Human Resurces</option>
																<option value="Accounting">Accounting</option>
																<option value="Time Attendance">Time Attendance</option>
															</select>
															<b-icon slot="media" icon="power-plug" size="is-medium"></b-icon>
														</f7-list-item>
													</div>
													</f7-col>
												</f7-row>
												<!-- Delete / Update -->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateUserButtons">
														<f7-row class="margin">
															<f7-col width="25">
																<f7-button fill class="bg-color-red" @click="deleteEmployee">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateUserPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!accountSettings.hideSaveItem">
														<f7-row class="margin level-right">
															<f7-col width="25">
																<f7-button fill @click="accountSettings.activeTab = 3" class="bg-color-deeporange">Next -></f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END HR Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Human Resources Tab -->

								<!-- Begin Benefits Tab -->
								<b-tab-item label="Benefits" icon="hand-heart" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width margin-bottom-half">Benefits</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Benefits List-->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Benefits</f7-block-title>
													<f7-col width="20">
														<p class="field-title">Medical Insurance:</p>
														<f7-list-item>
															<f7-toggle class="margin" :checked="employeeForm.medical_ins" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">AD&D:</p>
														<f7-list-item>
															<f7-toggle class="margin" :checked="employeeForm.accident_ins" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">Dental Insurance:</p>
														<f7-list-item>
															<f7-toggle class="margin" :checked="employeeForm.dental_ins" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">Vision Insurance:</p>
														<f7-list-item>
															<f7-toggle class="margin" :checked="employeeForm.vision_ins" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">401K:</p>
														<f7-list-item>
															<f7-toggle class="margin" :checked="employeeForm.retirement" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Personal Days Remaining:</p>
														<f7-list-item type="number" :title="employeeForm.personal_days_rem"></f7-list-item>
														<p class="field-title">Vacation Days Remaining:</p>
														<f7-list-item type="number" :title="employeeForm.vacation_days_rem"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sick Days Remaining:</p>
														<f7-list-item type="number" :title="employeeForm.sick_days_rem"></f7-list-item>
														<p class="field-title">Paid Time Off Remaining:</p>
														<f7-list-item type="number" :title="employeeForm.pto_days_rem"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Benefits Display List -->
											<!-- Begin Benefits Edit List -->
											<f7-list v-show="accountSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Benefits</f7-block-title>
													<f7-col width="20">
														<p class="field-title">Medical Insurance:</p>
														<f7-toggle
															:checked="employeeForm.medical_ins"
															@change="employeeForm.medical_ins = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">AD&D:</p>
														<f7-toggle
															:checked="employeeForm.accident_ins"
															@change="employeeForm.accident_ins = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">Dental Insurance:</p>
														<f7-toggle
															:checked="employeeForm.dental_ins"
															@change="employeeForm.dental_ins = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">Vision Insurance:</p>
														<f7-toggle
															:checked="employeeForm.vision_ins"
															@change="employeeForm.vision_ins = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="20">
														<p class="field-title">401K:</p>
														<f7-toggle
															:checked="employeeForm.retirement"
															@change="employeeForm.retirement = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Personal Days Remaining:</p>
														<f7-list-item
															:value="employeeForm.personal_days_rem"
															@input="employeeForm.personal_days_rem = $event.target.value"
															type="number"
															title="14"
														></f7-list-item>
														<p class="field-title">Vacation Days Remaining:</p>
														<f7-list-item
															:value="employeeForm.vacation_days_rem"
															@input="employeeForm.vacation_days_rem = $event.target.value"
															type="number"
															title="3"
														></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sick Days Remaining:</p>
														<f7-list-item
															:value="employeeForm.sick_days_rem"
															@input="employeeForm.sick_days_rem = $event.target.value"
															type="number"
															title="20"
														></f7-list-item>
														<p class="field-title">Paid Time Off Remaining:</p>
														<f7-list-item
															:value="employeeForm.pto_days_rem"
															@input="employeeForm.pto_days_rem = $event.target.value"
															type="number"
															title="14"
														></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<f7-row>
												<f7-block class="full-width" v-if="hideUpdateUserButtons">
													<f7-row class="margin-top">
														<f7-col width="25">
															<f7-button fill class="bg-color-red" @click="deleteEmployee">Delete</f7-button>
														</f7-col>
														<f7-col width="25">
															<f7-button fill class="bg-color-blue" @click="updateUserPATCH">Update</f7-button>
														</f7-col>
													</f7-row>
												</f7-block>
												<f7-block class="full-width" v-if="!accountSettings.hideSaveItem">
													<f7-row class="margin-top level-right">
														<f7-col width="25" class="display-flex justify-content-end margin">
															<f7-button
																fill
																@click.prevent="createUserandClose"
																class="bg-color-green trans-btn-left"
															>
																<span>Save User</span>
															</f7-button>
															<f7-button
																fill
																popover-open=".new-transaction"
																:disabled="canSubmitUserForm"
																class="bg-color-green trans-btn-right"
																icon-color="white"
																icon-size="40"
																icon="mdi mdi-menu-down"
															></f7-button>
															<f7-popover class="new-transaction">
																<f7-list>
																	<f7-list-item
																		link="#"
																		no-chevron
																		@click.prevent="createUserandNew"
																		popover-close
																		title="Save and New"
																	></f7-list-item>
																	<f7-list-item
																		link="#"
																		no-chevron
																		@click.prevent="createUserandEdit"
																		popover-close
																		title="Save and Edit"
																	></f7-list-item>
																	<f7-list-item
																		link="#"
																		no-chevron
																		@click.prevent="createUserandClose"
																		popover-close
																		title="Save and Close"
																	></f7-list-item>
																</f7-list>
															</f7-popover>
														</f7-col>
													</f7-row>
												</f7-block>
											</f7-row>
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Benefits Tab -->

								<!-- Begin Document Tab -->
								<b-tab-item label="Docs" icon="file-multiple-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width margin-bottom-half">Documents</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Document List-->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row class="display-flex justify-content-space-evenly">
													<f7-block-title class="full-width" medium>Company Policies</f7-block-title>
													<f7-col width="25">
														<p class="field-title">Employee Handbook:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Policies and Procedures:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Code of Conduct:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Employment Agreement:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Compensation Plan:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
													</f7-col>
													<f7-col width="25" class="text-align-center">
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.signed_handbook" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.signed_pp" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.signed_code" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.signed_ee_agmt" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle :checked="employeeForm.signed_comp_plan" disabled slot="inner-start"></f7-toggle>
														</f7-list-item>
													</f7-col>

													<f7-col width="25">
														<p class="field-title">Receipt:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Receipt:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Receipt:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Receipt:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Receipt:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Document Display List -->
											<!-- Begin Document Edit List -->
											<f7-list v-show="accountSettings.editProfile">
												<f7-row class="display-flex justify-content-space-evenly">
													<f7-block-title class="full-width" medium>Company Policies</f7-block-title>
													<f7-col width="25">
														<p class="field-title">Employee Handbook:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Policies and Procedures:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Code of Conduct:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Employment Agreement:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
														<p class="field-title">Compensation Plan:</p>
														<f7-list-item>
															<f7-button small outline>Download</f7-button>
														</f7-list-item>
													</f7-col>
													<f7-col width="25" class="text-align-center">
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.signed_handbook"
																@change="employeeForm.signed_handbook = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.signed_pp"
																@change="employeeForm.signed_pp = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.signed_code"
																@change="employeeForm.signed_code = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.signed_ee_agmt"
																@change="employeeForm.signed_ee_agmt = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
														<p class="text-align-center">Signed:</p>
														<f7-list-item>
															<f7-toggle
																:checked="employeeForm.signed_comp_plan"
																@change="employeeForm.signed_comp_plan = $event.target.checked"
																slot="inner-start"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="25" class="justify-content-center">
														<p class="field-title">Upload:</p>
														<f7-list-input class="file-field" type="file" style="background: rgb(216,252,253)"></f7-list-input>
														<p class="field-title">Upload:</p>
														<f7-list-input class="file-field" type="file" style="background: rgb(216,252,253)"></f7-list-input>
														<p class="field-title">Upload:</p>
														<f7-list-input class="file-field" type="file" style="background: rgb(216,252,253)"></f7-list-input>
														<p class="field-title">Upload:</p>
														<f7-list-input class="file-field" type="file" style="background: rgb(216,252,253)"></f7-list-input>
														<p class="field-title">Upload:</p>
														<f7-list-input class="file-field" type="file" style="background: rgb(216,252,253)"></f7-list-input>
													</f7-col>
												</f7-row>
											</f7-list>
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Document Tab -->

								<!-- Begin Attendance Tab -->
								<b-tab-item label="Attendance" icon="account-clock" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-block-title class="full-width margin-bottom-half">Attendance and Employement Records</f7-block-title>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Attendance Display List -->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row class="margin-top display-flex justify-content-center">
													<f7-block-title class="full-width" medium>Attendance History</f7-block-title>
													<f7-row class="full-width display-flex justify-content-end">
														<f7-col width="50">
															<f7-button outline sheet-open=".time-off-request-sheet">Request Time Off</f7-button>
															<time-off-request-form-component></time-off-request-form-component>
														</f7-col>
													</f7-row>
													
												</f7-row>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Leave Request History</f7-block-title>

											
												</f7-row>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Mileage Reimbursement History</f7-block-title>
												
												</f7-row>
											</f7-list>
											<!-- END Attendance Display -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Attendance Tab -->

								<!-- Begin Compensation History Tab -->
								<b-tab-item label="Compensation" icon="cash-usd-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width margin-bottom-half">Compensation</f7-block-title>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Compensation History List-->
											<f7-list v-show="!accountSettings.editProfile">
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Paychecks</f7-block-title>
										
												</f7-row>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Commissions</f7-block-title>
					
												</f7-row>
											</f7-list>
											<!-- END Compensation History Display List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Compensation History Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item v-if="Auth.authLevel === 1" label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width margin-bottom-half">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshEmployees">
														<b-icon icon="mdi mdi-refresh" size="is-medium"></b-icon>
													</f7-link>
												</f7-col>
												<f7-col width="25">
													<f7-link class="level-right" sheet-open=".uploadInventory">
														<b-icon icon="cloud-upload-outline" size="is-medium"></b-icon>
													</f7-link>
												</f7-col>
												<f7-col width="25" class="text-align-right">
													<f7-link popover-open=".database-menu">
														<b-icon icon="dots-vertical" size="is-medium"></b-icon>
													</f7-link>
												</f7-col>
												<f7-popover class="database-menu">
													<f7-list>
														<f7-list-item link="#" popover-close title="Clear Checkbox"></f7-list-item>
														<f7-list-item link="#" @click="showUserData" popover-close title="Edit Item"></f7-list-item>
														<f7-list-item link="#" @click="deleteEmployee" popover-close title="Delete Item"></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Users.employeeList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no users to display.</p>
													<p class="text-align-center">Create a new employee to get started.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newUserButton" large fill class="bg-color-red">Add New User</f7-button>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Users.employeeList.length != 0">
												<b-table
													:data="Users.employeeList"
													:paginated="isPaginated"
													:per-page="perPage"
													:current-page.sync="currentPage"
													:pagination-simple="isPaginationSimple"
													:pagination-position="paginationPosition"
													:default-sort-direction="defaultSortDirection"
													:sort-icon="sortIcon"
													:sort-icon-size="sortIconSize"
													checkable
													:checked-rows.sync="checkedRows"
													:default-sort="['name', 'asc']"
													aria-next-label="Next page"
													aria-previous-label="Previous page"
													aria-page-label="Page"
													aria-current-label="Current page"
												>
													<!-- :is-row-checkable="(row) => checkedRows.length <= 1 && checkedRows.indexOf(row.id) == -1" -->
													<template slot-scope="props">
														<b-table-column
															field="profile_img"
															:visible="columnsVisible['profile_img'].display"
															:label="columnsVisible['profile_img'].title"
															sortable
															searchable
															centered
														>
															<div class="profile-thumb-img">
																<img
																	:src="props.row.profile_img"
																	:class="{ 'inactive-item': !props.row.user_obj.is_active }"
																/>
															</div>
														</b-table-column>
														<b-table-column
															field="employee_number"
															:visible="columnsVisible['employee_number'].display"
															:label="columnsVisible['employee_number'].title"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															sortable
															searchable
															centered
														>
															<template v-if="showDetailIcon">{{ props.row.employee_number }}</template>
														</b-table-column>

														<b-table-column
															field="date_hired"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['hire_date'].display"
															:label="columnsVisible['hire_date'].title"
															sortable
															searchable
															centered
														>{{ props.row.hire_date | moment("M/D/Y h:m:s") }}</b-table-column>

														<b-table-column
															field="full_name"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['full_name'].display"
															:label="columnsVisible['full_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">{{ props.row.user_obj.full_name }}</template>
															<template v-else>
																<a @click="toggle(props.row)">{{ props.row.user_obj.full_name }}</a>
															</template>
														</b-table-column>

														<b-table-column
															field="position"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['position_title'].display"
															:label="columnsVisible['position_title'].title"
															sortable
															searchable
															centered
														>{{ props.row.position_title }}</b-table-column>

														<b-table-column
															field="is_active"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['is_active'].display"
															:label="columnsVisible['is_active'].title"
															sortable
															searchable
															centered
														>
															<b-tag
																size="is-medium"
																:type="`${props.row.user_obj.is_active ? 'is-success' : 'is-danger'}`"
															>{{ props.row.user_obj.is_active ? "Active" : "Inactive" }}</b-tag>
															<!-- {{ props.row.user_obj.is_active }} -->
														</b-table-column>
													</template>
												</b-table>
											</f7-row>
											<!-- END Database Section -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Database Tab -->
							</b-tabs>
							<f7-row>
								<f7-block class="margin padding"></f7-block>
							</f7-row>
						</f7-block>
						</f7-block>
					</div>
				</div>
				<!-- END Scrollbar-->
			</f7-col>
			<!-- END Right Column -->
			
		</f7-row>
		<!-- END Main Container Row -->

		<!-- Popups -->
		<positions-popup-component :moduleInfo="moduleInfo"></positions-popup-component>

	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import _ from "lodash";
import Croppie from "croppie";

var moment = require("moment");

//Mixins
import { LocaleMixins } from "../../mixins/businesses/locale-mixins";
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import parentComponent from "@/components/business/parent-company-component.vue";
import invoiceDatatableComponent from '@/components/financial/invoice-datatable-component.vue';
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datepicker-component.vue';
import positionsComponent from "@/components/business/positions-component.vue";
import timeOffRequestFormComponent from '@/components/layout-elements/notifications/time-off-request-form-component.vue';
import setPasswordComponent from "../../components/universal/logging-in/set-password-component.vue";

export default {
	name: "employeeProfile",
	mixins: [
		LocaleMixins,
		UniversalMixins
		],
	components: {
		"nav-bar-component": navBarComponent,
		"profile-card-component": profileCardComponent,
		"parent-component": parentComponent,
		"invoice-datatable-component": invoiceDatatableComponent,
		"f7-date-picker-component": f7DatePickerComponent,
		//Popups
		"positions-popup-component": positionsComponent,
		"time-off-request-form-component": timeOffRequestFormComponent,
		"set-password-component": setPasswordComponent
	},
	data() {
		return {
			platformLevel: 1,
			//Component Variables
			pageSettings: {
				leftNavDrawer: ".employee-panel",
				pageTitle: "Employee Profile"
			},
			profileCardSettings: {
				title: "Profile Details",
				type: "employee"
			},
			moduleInfo: {
				name: "Employees",
				type: "profile",
				level: 5
			},
			hireDateSettings: {
				ref: "hireCalendarDate"
			},
			accountSettings: {
				showPasswordReset: false,
				activeTab: 0,
				editProfile: false,
				hideSaveItem: true,
				accountPlatform: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
					is_vendor: false
				},
			},
				//Edit Profile Image
			profileImageSettings: {
				url: 'employee/',
				module: 'Employee',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},

			//Scrollbar Settings
			settings: {
				maxScrollbarLength: 60
			},
			//Page Setting for CRUD Display
			hideUpdateUserButtons: false,
			hideCreateUser: false,
			//Popups and Sheets
			catPopupOpened: false,
			userImageSheet: false,
			gallerySheetOpened: false,
			userBulkUploadSheet: false,
			// CSV Upload
			csv: [],
			//Image Cropping
			cropped: null,
			image: null,
			altIMage: "/static/test.png",
			//Image Uploading
			fileURL: null,
			file: "",
			files: [],
			uploadFiles: [],
			uploadedFiles: [],
			progress: 0,
			uploading: false,
			uploadMessage: "",
			error: false,
			//Buefy Tabs
			//Begin DataTable Info
			showDetailIcon: true,
			checkedRows: [],
			columnsVisible: {
				hire_date: { title: "Hire Date", display: true },
				employee_number: { title: "Employee Number", display: true },
				full_name: { title: "Full Name", display: true },
				position_title: { title: "Position", display: true },
				profile_img: { title: "Image", display: true },
				is_active: { title: "Is Active", display: true }
			},
			isPaginated: true,
			isPaginationSimple: false,
			paginationPosition: "bottom",
			defaultSortDirection: "asc",
			sortIcon: "arrow-up",
			sortIconSize: "is-small",
			currentPage: 1,
			perPage: 10,
			//Begin Image Processing Wizard Template
			activeStep: 0,
			showSocial: false,
			isAnimated: true,
			hasNavigation: true,
			customNavigation: true,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: false,
			isProfileSuccess: false,
			//User / Employee Form Items
			requiredFieldsDone: 0,

			//Employee / User Form
			employeeForm: {
				id: null,
				datacom: null,
				partner: null,
				company: null,
				vendor: null,
				company: null,
				department: null,
				position: null,
				employee_docs: null,
				benefits: null,
				modules_managed: [],
				employee_number: null,
				salary: null,
				salary_type: null,
				employee_type: null,
				work_phone: null,
				is_business: false,
				is_sales_office_ee: false,
				is_sales_rep: false,
				is_exempt: false,
				is_warehouse_ee: false,
				is_manager: null,
				is_module_manager: null,
				reporting_manager: null,
				hire_date: null,
				termination_date: null,
				termination_reason: null,
				ssn: null,
				dob: null,
				org_name: null,
				profile_img: null,
				user: {
					id: null,
					date_added: null,
					global_id: null,
					last_login: null,
					first_name: null,
					last_name: null,
					full_name: null,
					password: null,
					verify_pw: null,
					pin: null,
					email: null,
					username: null,
					mobile_phone: null,
					fax: null,
					street_address: null,
					city: null,
					state: null,
					zip: null,
					country: null,
					bio: null,
					is_active: true,
					is_admin: false,
					is_staff: true,
					is_superuser: false,
					is_cutomer: false,
					is_vendor: false,
					is_sales_rep: false,
					is_warehouse_ee: false,
					barcode: {},
					groups: [],
					permissions: [],
				}
			},
			sales_office_id: [],
			warehouse_employees: [],

	
		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.employeeForm', this.employeeForm);
			// console.log('sales_office_id', sales_office_id);
			console.log('warehouse_employees', warehouse_employees);
		},
		showEditProfile() {
			this.accountSettings.editProfile = true;
			this.hideUpdateUserButtons = true;
			this.hideCreateUser = true;
			this.accountSettings.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.accountSettings.editProfile = !this.accountSettings.editProfile;
			this.hideUpdateUserButtons = !this.hideUpdateUserButtons;
			this.hideCreateUser = !this.hideCreateUser;
			this.accountSettings.hideSaveItem = true;
			this.accountSettings.showPasswordReset = !this.accountSettings.showPasswordReset;
		},
		async newUserButton() {
			//Show/Hide Edit Fields and buttons
			let response = await this.clearUserFormData();
			console.log("addNewuserButton response", response);

			this.accountSettings.editProfile = true;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = true;
			this.accountSettings.hideSaveItem = false;
			this.accountSettings.activeTab = 0;
			this.accountSettings.showPasswordReset = false;
		},
		async clearandResetButton() {
			await this.clearUserFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.accountSettings.editProfile = false;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = false;
			this.accountSettings.hideSaveItem = true;
			this.accountSettings.activeTab = 0;
			this.activeStep = 0;
			this.$store.commit("RESET_ERRORS");
			this.uploadMessage = "";
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
		},
		async createUserandNew() {
			console.log("createUserandNew");
			//invoke the create user and create employee function
			let createUserRes = await this.POSTEmployee();
			console.log("createUserRes", createUserRes);
			//Populate Fields with Created Instance
			this.resetViewtoHome();
			this.newUserButton();
			console.log("createUserandNew All Done");
		},
		async createUserandEdit() {
			console.log("createUserandEdit");
			//invoke the create user and create employee function
			let createEmployeeRes = await this.POSTEmployee();
			console.log("createEmployeeRes", createEmployeeRes);
			await this.clearUserFormData();
			//Populate Fields with Created Instance
			this.showUserData(createEmployeeRes.id);
			this.showEditProfile();
			console.log("createUserandEdit All Done createUserRes");
		},
		async createUserandClose() {
			console.log("createUserandClose");
			//invoke the create user and create employee function
			let response = await this.POSTEmployee();
			console.log("createUserandClose response", response);
			if(response != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				this.$f7.dialog.alert("You had some errors on your submission").open();
			}
			console.log("createUserandClose All Done");
		},

		POSTEmployee() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				this.$f7.preloader.show();
				// Await addUser then await AddEmployee using email address to find user in Django
				this.employeeForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;

				console.log("Create User this.employeeForm.user", this.employeeForm.user);
				let response = await this.$store.dispatch("POSTUser", this.employeeForm.user);
				console.log("response: ", response);
				this.employeeForm.user.barcode = {};

				if (response.status === 200 || response.status === 201) {
					console.log("Response 201");
					newUserForm = response.data;
				} else {
					this.$f7.preloader.hide();
					response.type = "Create User";
					if (!response.status) {
						response.status = 401;
						this.$store.dispatch("updateNotification", response);
					} 

					return reject(response.message);
				}

				this.employeeForm["user"] = newUserForm.id;
				console.log("Successful User created:", newUserForm);

				//-------------------------------------------------------------------------------------//

				//Get Company ID (from each company type) and UserID add to Employee Form
				console.log("this.employeeForm", this.employeeForm);
				var companyOBJ = {};
				if (this.accountSettings.accountPlatform.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.employeeForm["datacom"] = companyOBJ.id;
				} else if (this.accountSettings.accountPlatform.is_partner) {
					companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.employeeForm["partner"] = companyOBJ.id;
				} else if (this.accountSettings.accountPlatform.is_merchant) {
					companyOBJ = this.Companies.companyList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.employeeForm["company"] = companyOBJ.id;
				} else if (this.accountSettings.accountPlatform.is_vendor) {
					companyOBJ = this.Vendors.vendorList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_vendor companyOBJ", companyOBJ);
					this.employeeForm["vendor"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					this.$f7.dialog.alert("You must first select a Company").open();
					response.type = "Create Employee";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}

				console.log("this.employeeForm", this.employeeForm);
				let eeResponse = await this.$store.dispatch("POSTEmployee", this.employeeForm);
				console.log("Create Employee Promise eeResponse", eeResponse);

				if (eeResponse.status === 200 || eeResponse.status === 201) {
				//-----------------------------------------------------------//
				
					//Make submission to add employee to Sales office or Warehouse
					if(this.GET_SALES_OFFICE_LIST.length != 0) {
						let idArray = this.GET_SALES_OFFICE_EMPLOYEE_IDS;
						console.log('idArray', idArray);
						idArray.push(this.eeResponse.data.id);

						if(this.sales_office_id.length != 0) {
							let eeObj = {
								id: this.this.sales_office_id,
								employees: idArray
							}
							console.log('eeObj', eeObj);
							
							this.$store.dispatch("PATCHSalesOfficeProfile", eeObj);
						}
					}
					
					this.$f7.preloader.hide();
					return resolve(eeResponse);
				} else {
					this.$f7.preloader.hide();
					response.type = "Create Employee";
					response.status = 401;
					this.$store.dispatch("updateNotification", response);
					return reject(response.message);
				}

				//Reset User Object to employeeForm
				this.employeeForm.user = newUserForm;
			}).catch((error) => {
				console.log("Caught Promise error:", error);
				return error;
			});
		},
		refreshEmployees() {
			this.$store.dispatch("GETEmployeeList");
		},
		// Populate Fields for editing in browser
		async showUserData(employeeID) {
			console.log("showUserData employeeID", employeeID);
			this.accountSettings.showPasswordReset = true;
			this.accountSettings.activeTab = 0;
			//Get User ID and object and map to fields
			var emloyeeListID = null;
			if (this.checkedRows.length != 0) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var eeIndex = this.Users.employeeList.findIndex((elem) => elem.id === rowID);
				console.log("editUsers eeIndex", eeIndex);
				emloyeeListID = eeIndex;
				console.log("IF emloyeeListID", emloyeeListID);
			} else {
				var findIndexPos = this.Users.employeeList.findIndex((elem) => {
					return elem.id === employeeID;
				});
				emloyeeListID = findIndexPos;
				console.log("Else emloyeeListID", emloyeeListID);
				console.log("Else this.Users.employeeList", this.Users.employeeList);
			}
			//Is there a list of companies to lookup?
			if (this.Users.employeeList.length === 0) {
				return "There are no items available";
			}
			if (this.Users.employeeList.length != 0) {
				console.log("this.Users.employeeList", this.Users.employeeList);
				console.log("Then employeeListID", emloyeeListID);
				var employeeObj = this.Users.employeeList[emloyeeListID];
				console.log("showUserData employeeObj", employeeObj);
				this.employeeForm = employeeObj;
				for (let key in this.employeeForm) {
					this.employeeForm[key] = employeeObj[key];
				}
				//Parse the User SubLevel Info for User Data
				for (let attribute in this.employeeForm.user) {
					this.employeeForm.user[attribute] = employeeObj.user[attribute];
				}
				this.employeeForm.company = employeeObj.company;

				//I need to update the calendar fields and bio field manually
				if (this.employeeForm.dob) {
					var foramttedDOBDate = this.employeeForm.dob.split("T")[0];
					//Populate the DOB field
				}
				if (this.employeeForm.termination_date) {
					var foramttedTermDate = this.employeeForm.termination_date.split("T")[0];
					//Need to Populate termination date
				}
				if (this.employeeForm.hire_date) {
					var foramttedHireDate = this.employeeForm.hire_date.split("T")[0];
					//Need to Populate Hire Date
				}
				//Populate User Bio Field
				this.$refs.userBio.f7TextEditor.contentEl.innerHTML = this.employeeForm.user.bio;
				//Switch View to Edit Mode
				this.resetViewtoHome();
				this.showEditProfile();
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateUserPATCH() {
			this.employeeForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;

			try {
				await this.$store.dispatch("PATCHEmployeeProfile", this.employeeForm.user).then((response) => {
					console.log("PATCH User Repsonse Update User", response);
				});
				delete this.employeeForm.user;
				await this.$store.dispatch("PATCHEmployeeProfile", this.employeeForm).then((response) => {
					console.log("PATCH User Repsonse Update Employee", response);
				});
			} catch (error) {
				console.log("There was an error in the try catch block", error);
			}
		},
		clearUserFormData() {
			this.$store.commit("RESET_ERRORS");
			return new Promise((resolve, reject) => {
				try {
					console.log("clearUserFormData this.employeeForm", this.employeeForm);
					for (let key in this.employeeForm.user) {
						// console.log('key', this.employeeForm.user[key]);
						if (this.employeeForm.user[key] === true || this.employeeForm.user[key] === false) {
							// console.log('TF key', key);
							this.employeeForm.user[key] = false;
						} else {
							this.employeeForm.user[key] = null;
						}
					}
					for (let key in this.invImgGallery) {
						// console.log('key', this.invImgGallery[key]);
						this.invImgGallery[key] = null;
					}

					//Reset Variables to Start Position
					this.employeeForm.user.groups = [];
					this.employeeForm.user.permissions = [];
					this.employeeForm.user.is_staff = true;
					this.employeeForm.user.is_active = true;
					//Call other methods to clear
					this.clearEmployeeFormData();

					this.resetViewtoHome();

					return resolve("ClearUserForms Promise Returned");
				} catch (error) {
					console.log("Caught error", error);
				}
			});
		},
		clearEmployeeFormData() {
			console.log("this.employeeForm Clear Data", this.employeeForm);
			const user = this.employeeForm.user;
			for (let key in this.employeeForm) {
				console.log("key", this.employeeForm[key]);
				if (this.employeeForm[key] === true || this.employeeForm[key] === false) {
					// console.log('TF key', key);
					this.employeeForm[key] = false;
				} else {
					this.employeeForm[key] = null;
				}
			}
			//Reset Properties
			this.employeeForm.modules_managed = [];
			//Reassign User to Employee
			this.employeeForm.user = user;
		},
		//Set User item to inactive instead of deleting instance
		async deleteEmployee() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows[0].id;
				var findIndexID = this.Users.userList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteEmployee findIndexID", findIndexID);
				if (this.Users.userList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Users.userList.length === 1) {
					let UserItem = this.Users.userList[0];
					console.log("deleteEmployee len===1 UserItem", UserItem);
					for (let key in this.employeeForm) {
						this.employeeForm[key] = UserItem[key];
					}
					this.employeeForm.is_active = false;
					await this.$store.dispatch("deleteEmployee", this.employeeForm);
				}
				if (this.Users.userList.length >= 2) {
					// Map function to assign the varibles to the form variables
					let UserItem = this.Users.userList[findIndexID];
					console.log("deleteEmployee len>=2 UserItem", UserItem);
					for (let key in this.employeeForm) {
						this.employeeForm[key] = UserItem[key];
					}
					this.employeeForm.is_active = false;
					await this.$store.dispatch("deleteEmployee", this.employeeForm);
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			await this.clearUserFormData();
		},

		deleteChip() {
			console.log("deleting Chip");
		},
	
		
		clearTermDate() {
			this.employeeForm.termination_date = null;
		},
		clearHireDate() {
			this.employeeForm.hire_date = null;
		},
		receiveDobDate(date) {
			console.log('receiveDate date', date);
			this.employeeForm.user.dob = date;
		},
		receiveHireDate(date) {
			console.log('receiveHireDate date', date);
			this.employeeForm.hire_date = date;
		},
		receiveExitDate(date) {
			console.log('receiveExitDate date', date);
			this.employeeForm.termination_date = date;
		},
		logout() {
			this.$store.dispatch("signOut");
		},
		syncWithMixin() {
			this.employeeForm.user.country = this.localeCities.user_country_name;
			this.employeeForm.user.state = this.localeCities.user_state_name;

		},
		//Callback function from Child Component
		syncWithMixin(payload) {
			console.log("Must emit information from child component to parent");
			console.log('syncWithMixin payload', payload);
			return new Promise((resolve, reject) => {
				this.employeeForm.user.country = payload.primary_country_name;
				this.employeeForm.user.state = payload.primary_state_name;
				console.log('this.employeeForm', this.employeeForm);
				console.log('this.localeCities', this.localeCities);

				return resolve(payload.primary_state_name);
			});
		},
	},
	computed: {
		...mapState(["Auth", "Orders", "Inventory", "Locale", "Static", "Errors"]),
		...mapState(["Users", "Merchants", "Datacom", "Partners", "Vendors"]),
		...mapGetters(["GET_USER_LIST", "GET_COUNTRY_LIST", "GET_STATE_LIST", "GET_CITY_LIST", 
									"GET_POSITIONS_LIST", "GET_SALES_OFFICE_LIST", "GET_WAREHOUSE_LIST", "GET_SALES_OFFICE_EMPLOYEE_IDS"]),
		...mapGetters(["GET_USER_ERRORS_LIST", "GET_USER_ERROR_HANDLE", "GET_EMPLOYEE_ERRORS_LIST", "GET_EMPLOYEE_ERROR_HANDLE"]),
		errorData() {
			return this.GET_USER_ERRORS_LIST
		},
		errorHandle() {
			return this.GET_USER_ERROR_HANDLE
		},
		errorEmployeeData() {
			return this.GET_EMPLOYEE_ERRORS_LIST
		},
		errorEmployeeHandle() {
			return this.GET_EMPLOYEE_ERROR_HANDLE
		},
		computedDates: {
			get() {
				// console.log('this.employeeForm computedDates', this.employeeForm);
				const hireDate = this.employeeForm.hire_date;
				const termDate = this.employeeForm.termination_date;
				if (moment(hireDate).isAfter(termDate)) {
					return "The termination date must be after the hire date";
				} else {
					return;
				}
			}
		},
		canSubmitUserForm() {
			if (this.Auth.isAuthenticated) {
				if (this.accountSettings.accountPlatform.is_datacom) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_partner) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_merchant) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_vendor) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
			}
			return true;
		}
	},
	beforeMount() {},
	async mounted() {
	},
	on: {}
}
</script>

<style lang="scss" scoped>
.sticky-top {
	height: 95vh;
}

</style>
