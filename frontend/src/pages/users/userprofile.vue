<template>
	<f7-page name="user-profile">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
		<!-- Main Container Row -->
		<f7-row class="display-flex justify-content-center full-width margin-right">
			<!-- Left Column -->
			<f7-col width="100" medium="30" class="sticky-top">
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
						
						<!-- User Image and Common Details -->
						<f7-block class="display-block margin-top-half full-height">
							<f7-card>
								<f7-card-header
									class="no-border hovering"
									valign="bottom"
									style="background-color: lightgrey;"
								>
									<f7-row class="full-width display-flex align-items-center">
										<f7-col width="50" class="align-self-flex-end">
											<f7-block-title class="full-width no-margin-bottom">Profile</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".inventory-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
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
									<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button
												fill
												@click.prevent="createUserandClose"
												:disabled="canSubmitUserForm"
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

						</f7-block>
					</div>
				</div>
				<!-- End Scrollbar (drahgger) -->
			</f7-col>
			<!-- END Left Column -->

			<!-- Right Column -->
			<f7-col width="100" medium="70" class="margin-top-half">
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
						<f7-block class="no-margin">
							<f7-row class="full-width display-flex justify-content-center">
								<articlev-if="Errors.userErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</articlev-if=>
								<div v-if="Errors.userErrorData.length != 0">
									<div class="full-width" v-for="errorArray in Errors.userErrorData" :key="errorArray.id">
										<div
											class="display-flex justify-content-center"
											:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
										>
											<div
												v-show="errorArray[0] === 'non_field_errors'"
												class="message-body"
											>{{ errorArray[1][0] }}</div>
										</div>
									</div>
								</div>
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
							<b-tabs type="is-boxed" v-model="parentSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Parent Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
									<parent-component
										ref="parentComponentRef"
										:toggleEditProfile="toggleEditProfile"
										:parentSettings="parentSettings"
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
											<f7-list v-show="!parentSettings.editProfile">
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
														<p class="field-title">Is Sales Rep?:</p>
														<f7-toggle class="margin" :checked="employeeForm.is_sales_rep" disabled></f7-toggle>
														<p class="field-title">Is Warehouse Employee:</p>
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
											<f7-list simple-list v-show="parentSettings.editProfile">
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
														<div v-if="Errors.userErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.userErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div
																		v-show="errorArray[0] === 'first_name'"
																		class="message-body"
																	>{{ errorArray[1][0] }}</div>
																</div>
															</div>
														</div>
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
														<div v-if="Errors.userErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.userErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div
																		v-show="errorArray[0] === 'last_name'"
																		class="message-body"
																	>{{ errorArray[1][0] }}</div>
																</div>
															</div>
														</div>
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

												<f7-row>
													<f7-block-title class="full-width" medium>Login Information</f7-block-title>
													<f7-row>
														<f7-col>
															<p>Password requirements: 1 Alpha, 1 Numeric, 1 Special Character, Minimum 6 characters.</p>
														</f7-col>
													</f7-row>
													<f7-row v-if="showPasswordRest" class="full-width no-margin-top">
														<f7-col>
															<f7-button fill>Password Reset</f7-button>
														</f7-col>
													</f7-row>
													<f7-row v-if="!showPasswordRest" class="margin-top">
														<f7-col width="50">
															<p class="field-title">
																Email:
																<span style="color: red;">*</span>
															</p>
															<f7-list-input
																validate
																required
																error-message="Email is required"
																:value="employeeForm.user.email"
																@input="employeeForm.user.email = $event.target.value"
																@change="requiredFieldsDone += 1"
																type="email"
																style="background: rgb(216,252,253)"
															></f7-list-input>
															<div v-if="Errors.userErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.userErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div
																			v-show="errorArray[0] === 'email'"
																			class="message-body"
																		>{{ errorArray[1][0] }}</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">
																PIN:
																<span style="color: red;">*</span>
															</p>
															<f7-list-input
																validate
																required
																pattern="[0-9]{1,4}"
																error-message="4-Digit Numerical PIN is required"
																:value="employeeForm.user.pin"
																@input="employeeForm.user.pin = $event.target.value"
																@change="requiredFieldsDone += 1"
																type="password"
																style="background: rgb(216,252,253)"
															></f7-list-input>
															<div v-if="Errors.userErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.userErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div v-show="errorArray[0] === 'pin'" class="message-body">{{ errorArray[1][0] }}</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">
																Password:
																<span style="color: red;">*</span>
															</p>
															<f7-list-input
																validate
																required
																error-message="Password is required"
																:value="employeeForm.user.password"
																@input="employeeForm.user.password = $event.target.value"
																@change="requiredFieldsDone += 1"
																type="password"
																style="background: rgb(216,252,253)"
															></f7-list-input>
															<div v-if="Errors.userErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.userErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.userErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div
																			v-show="errorArray[0] === 'password'"
																			class="message-body"
																		>{{ errorArray[1][0] }}</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">
																Verify PW:
																<span style="color: red;">*</span>
															</p>
															<f7-list-input
																validate
																required
																error-message="You must verify password"
																:value="employeeForm.user.verify_pw"
																@input="employeeForm.user.verify_pw = $event.target.value"
																@change="requiredFieldsDone += 1"
																type="password"
																style="background: rgb(216,252,253)"
															></f7-list-input>
														</f7-col>
													</f7-row>
													<!-- Password Error Handling-->
													<div
														class="left full-width"
														v-if="computedPasswords"
														:class="`message ${computedPasswords ? 'is-danger' : 'is-success'}`"
													>
														<div class="message-body full-width no padding">{{ computedPasswords }}</div>
													</div>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Office/Warehouse</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Is Sales Rep?:</p>
														<f7-toggle @change="employeeForm.is_sales_rep = $event.target.checked" class="margin"></f7-toggle>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sales Office Name:</p>
														<f7-list-item title="West Region"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Is Warehouse Employee:</p>
														<f7-toggle
															@change="employeeForm.is_warehouse_ee = $event.target.checked"
															class="margin"
														></f7-toggle>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Warehouse Name:</p>
														<f7-list-item title="Central Warehouse"></f7-list-item>
													</f7-col>
												</f7-row>

												<!-- Delete / Update Buttons-->
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
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="25">
																<f7-button fill @click="parentSettings.activeTab = 2" class="bg-color-deeporange">Next -></f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END profile Edit List -->
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
											<f7-list v-show="!parentSettings.editProfile">
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
											<f7-list v-show="parentSettings.editProfile">
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
																v-for="position in Users.employeePositionsList"
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

												<!-- Password Error Handling-->
												<f7-row>
													<div
														class="left full-width"
														v-if="computedDates"
														:class="`message ${computedDates ? 'is-danger' : 'is-success'}`"
													>
														<div class="message-body full-width no padding">{{ computedDates }}</div>
													</div>
												</f7-row>
												<f7-row>
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
															<f7-chip text="Joe Smith" @click="deleteChip"></f7-chip>
															<f7-chip text="Jane Doe" @click="deleteChip">
																<img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
															</f7-chip>
															<f7-chip text="Bill Nye" @click="deleteChip"></f7-chip>
														</f7-block>
													</f7-col>
												</f7-row>
												<!-- Delete / Update -->
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
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="25">
																<f7-button fill @click="parentSettings.activeTab = 3" class="bg-color-deeporange">Next -></f7-button>
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
											<f7-list v-show="!parentSettings.editProfile">
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
											<f7-list v-show="parentSettings.editProfile">
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
												<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
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
											<f7-list v-show="!parentSettings.editProfile">
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
											<f7-list v-show="parentSettings.editProfile">
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
											<f7-list v-show="!parentSettings.editProfile">
												<f7-row class="margin-top display-flex justify-content-center">
													<f7-block-title class="full-width" medium>Attendance History</f7-block-title>
													<f7-row class="full-width display-flex justify-content-end">
														<f7-col width="50">
															<f7-button outline>Request Time Off</f7-button>
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
											<f7-list v-show="!parentSettings.editProfile">
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
																	:class="{ 'inactive-item': !props.row.user.is_active }"
																/>
															</div>
														</b-table-column>
														<b-table-column
															field="employee_number"
															:visible="columnsVisible['employee_number'].display"
															:label="columnsVisible['employee_number'].title"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															sortable
															searchable
															centered
														>
															<template v-if="showDetailIcon">{{ props.row.employee_number }}</template>
														</b-table-column>

														<b-table-column
															field="date_hired"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['hire_date'].display"
															:label="columnsVisible['hire_date'].title"
															sortable
															searchable
															centered
														>{{ props.row.hire_date | moment("M/D/Y h:m:s") }}</b-table-column>

														<b-table-column
															field="full_name"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['full_name'].display"
															:label="columnsVisible['full_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">{{ props.row.user.full_name }}</template>
															<template v-else>
																<a @click="toggle(props.row)">{{ props.row.user.full_name }}</a>
															</template>
														</b-table-column>

														<b-table-column
															field="position"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['position_title'].display"
															:label="columnsVisible['position_title'].title"
															sortable
															searchable
															centered
														>{{ props.row.position_title }}</b-table-column>

														<b-table-column
															field="is_active"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['is_active'].display"
															:label="columnsVisible['is_active'].title"
															sortable
															searchable
															centered
														>
															<b-tag
																size="is-medium"
																:type="`${props.row.user.is_active ? 'is-success' : 'is-danger'}`"
															>{{ props.row.user.is_active ? "Active" : "Inactive" }}</b-tag>
															<!-- {{ props.row.user.is_active }} -->
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
						</f7-block>
						<f7-block class="margin padding"></f7-block>

						<!-- END Profile Tabs -->
					</div>
				</div>
				<!-- END Vue Scrollbar (dragger) -->
			</f7-col>
			<!-- END Right Column -->
		</f7-row>
		<!-- END Main Container -->

		<!-- Product Bulk Upload Sheet -->
		<f7-sheet
			class="uploadInventory image-sheet"
			:opened="userBulkUploadSheet"
			@sheet:closed="userBulkUploadSheet = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<!-- Store to Django Database -->
				<f7-block-title medium>Store History</f7-block-title>
				<f7-card>
					<f7-card-content class="no-margin-top">
						<f7-block-title class="margin-top-half" medium>Use the following format</f7-block-title>
						<f7-row>
							<f7-col>
								<a href="/static/InventoryCSVFormat.csv" class="external" download="sample">Download Sample</a>
							</f7-col>
						</f7-row>
						<f7-block-title medium>Please select a file to upload</f7-block-title>
						<!--UPLOAD-->
						<csv-import
							v-model="csv"
							:map-fields="[
								'Name',
								'Category',
								'Manufacturer',
								'Model',
								'Model Number',
								'Service?',
								'Variation?',
								'Tracked?',
								'Downloadable?',
								'On Website?',
								'On Sale?',
								'Taxable?',
								'Parent Item',
								'Product ID',
								'SKU',
								'Product Type',
								'ISBN',
								'Tags',
								'Sales Notes',
								'Vendor Notes',
								'Product Description',
								'List Price',
								'Purchase Price',
								'Sale Price',
								'Wholesale Price',
								'Discount %',
								'Sale Expiration',
								'Income Account',
								'Expense Account',
								'Reorder Level',
								'Weight',
								'Weight UOM',
								'Width',
								'Height',
								'Length',
								'Dimensions UOM'
							]"
						>
							<template slot="hasHeaders" slot-scope="{ headers, toggle }">
								<label hidden>
									<f7-checkbox id="hasHeaders" :value="headers" checked @change="toggle"></f7-checkbox>Headers?
								</label>
							</template>

							<template slot="error">File type is invalid</template>

							<template slot="thead">
								<tr>
									<th>Database Fields</th>
									<th>CSV Column</th>
								</tr>
							</template>
							<!-- Large preloaders -->
							<template slot="next" slot-scope="{ load }">
								<f7-row class="display-flex justify-content-left">
									<f7-col width="25" class="margin">
										<f7-button fill @click.prevent="load">Map Data Fields</f7-button>
									</f7-col>
									<f7-col width="25" class="margin">
										<f7-button fill @click.prevent="parseDataHistory">Execute</f7-button>
									</f7-col>
									<f7-col width="25" class="margin">
										<f7-button fill @click.prevent="testingMethod">Test</f7-button>
									</f7-col>
								</f7-row>
							</template>
						</csv-import>
					</f7-card-content>
				</f7-card>
				<!-- END Store to Django Database -->
				<f7-row class="margin">
					<f7-col>
						<f7-block>{{ csv }}</f7-block>
					</f7-col>
				</f7-row>
			</f7-page-content>
			<!-- END Bulk Upload Sheet Content -->
		</f7-sheet>
		<!-- END Bulk Upload Sheet -->

		<!-- User Image Upload Sheet -->
		<f7-sheet
			class="inventory-image image-sheet"
			:opened="userImageSheet"
			@sheet:closed="userImageSheet = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content class="padding-bottom">
				<section>
					<f7-block v-show="!employeeForm.id">
						<f7-block-header>You must first select a user to add a profile image</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="employeeForm.id">
						<div class="block">
							<button class="button" @click="activeStep = 0">Start Over</button>
						</div>
						<b-steps
							v-model="activeStep"
							:animated="isAnimated"
							:has-navigation="hasNavigation"
							:icon-prev="prevIcon"
							:icon-next="nextIcon"
						>
							<b-step-item label="Choose Image" :clickable="isStepsClickable">
								<div
									class="left"
									v-if="uploadMessage"
									:class="`message ${error ? 'is-danger' : 'is-success'}`"
								>
									<div class="message-body">{{ uploadMessage }}</div>
								</div>
								<f7-block>
									<form enctype="multipart/form-data">
										<f7-row class="justify-content-center">
											<div class="dropzone">
												<input
													type="file"
													name="invArray"
													@change="selectFile"
													ref="invFile"
													class="input-field"
												/>

												<p v-if="!uploading" class="call-to-action">Drop file here</p>
												<p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
													<progress class="progress"></progress>
													{{ progress }} %
												</p>
											</div>
											<f7-row>
												<f7-col width="100">
													<div v-if="file" class="file-name" style="font-size:3rem;">{{ file.name }}</div>
												</f7-col>
											</f7-row>
										</f7-row>
									</form>
								</f7-block>
							</b-step-item>

							<b-step-item
								label="Resize Image"
								:clickable="isStepsClickable"
								:type="{ 'is-success': isProfileSuccess }"
							>
								<template>
									<f7-row>
										<f7-col width="50">
											<!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
											<vue-croppie
												ref="croppieRefUser"
												:enableOrientation="true"
												:boundary="{ width: 500, height: 500 }"
												:viewport="{ width: 300, height: 300, type: 'circle' }"
												@result="result"
												@update="update"
											></vue-croppie>
											<f7-button fill @click="crop()">Crop</f7-button>
										</f7-col>
										<f7-col width="50">
											<!-- the result -->
											<f7-row v-if="cropped">
												<f7-col class="display-flex justify-content-center">
													<img v-bind:src="cropped" />
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
								</template>
							</b-step-item>

							<b-step-item label="Upload Image" :clickable="isStepsClickable" disabled>
								<!-- the result -->
								<f7-row v-if="cropped">
									<f7-col class="display-flex justify-content-center">
										<img v-bind:src="cropped" />
									</f7-col>
								</f7-row>
								<f7-row v-if="!cropped">
									<f7-col class="display-flex justify-content-center">
										<p
											style="font-size: 30px;"
										>You have not cropped an image. Please go back and click "Cropped".</p>
									</f7-col>
								</f7-row>
							</b-step-item>

							<!-- navigation Links -->
							<template v-if="customNavigation" slot="navigation" slot-scope="{ previous, next }">
								<f7-row class="display-flex justify-content-space-around">
									<f7-col width="25" class="imageNavButtons">
										<b-button
											v-if="!previous.disabled"
											class="display-flex justify-content-center"
											outlined
											type="is-danger"
											icon-pack="mdi"
											icon-left="arrow-left-box"
											size="is-large"
											:disabled="previous.disabled"
											@click.prevent="previous.action"
										>
											<span>Previous</span>
										</b-button>
									</f7-col>
									<f7-col width="25" class="imageNavButtons">
										<b-button
											v-if="!next.disabled"
											class="display-flex justify-content-center"
											outlined
											type="is-success"
											icon-pack="mdi"
											size="is-large"
											icon-left="arrow-right-box"
											:disabled="next.disabled"
											@click.prevent="next.action"
										>
											<span>Next</span>
										</b-button>
										<f7-button
											class="display-flex justify-content-center"
											v-if="next.disabled"
											large
											fill
											sheet-close
											@click.prevent="sendFile"
										>Submit</f7-button>
									</f7-col>
								</f7-row>
							</template>
							<!-- END navigation Links -->
						</b-steps>
					</f7-block>
				</section>
				<f7-block class="margin-bottom"></f7-block>
			</f7-page-content>
			<!-- END User Sheet Content -->
		</f7-sheet>
		<!-- END User Image Upload Sheet -->

		<!-- Popups -->
		<positions-popup-component :moduleInfo="moduleInfo"></positions-popup-component>
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";
import Croppie from "croppie";

var moment = require("moment");
var momenttz = require("moment-timezone");

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import setupSheetComponent from "@/components/business/setup-sheet-component.vue";
import profileCardComponent from "@/components/layout-elements/profile-card-component.vue";
import parentComponent from "@/components/business/parent-company-component.vue";
import receiptDatatableComponent from '@/components/financial/receipt-datatable-component.vue';
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datepicker-component.vue';
import positionsComponent from "@/components/business/positions-component.vue";

//Mixins
import { UniversalMixins } from '@/mixins/universal-mixins';
import { LocaleMixin } from '@/mixins/businesses/locale-mixins';

export default {
	name: "userProfile",
	mixins: [
		UniversalMixins,
		LocaleMixin
	],
	components: {
		"nav-bar-component": navBarComponent,
		"setup-sheet-component": setupSheetComponent,
		"profile-card-component": profileCardComponent,
		"parent-component": parentComponent,
		"invoice-datatable-component": receiptDatatableComponent,
		"f7-date-picker-component": f7DatePickerComponent,
		//Popups
		"positions-popup-component": positionsComponent,
	},
	data() {
		return {
			//Component Data
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
			parentSettings: {
				activeTab: 0,
				editProfile: false,
				hideSaveItem: true,
				accountParent: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
					is_vendor: false
				},
			},


			//Error Handling
			showPasswordRest: false,
			passwordMessage: "",
			error: false,
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
			employeeForm: {
				id: null,
				datacom: null,
				partner: null,
				company: null,
				vendor: null,
				company: null,
				department: null,
				position: null,
				employee_number: null,
				salary: null,
				salary_type: null,
				pay_cycle: null,
				employee_type: null,
				work_phone: null,
				is_business: false,
				is_sales_rep: false,
				is_exempt: false,
				is_warehouse_ee: false,
				is_manager: null,
				reporting_manager: null,
				hire_date: null,
				termination_date: null,
				termination_reason: null,
				ssn: null,
				dob: null,
				medical_ins: false,
				accident_ins: false,
				dental_ins: false,
				vision_ins: false,
				retirement: false,
				org_name: null,
				handbook: null,
				signed_handbook: false,
				policies_procedures: null,
				signed_pp: false,
				code_conduct: null,
				signed_code: false,
				employment_agmt: null,
				signed_ee_agmt: false,
				compensation_plan: null,
				signed_comp_plan: false,
				personal_days_rem: null,
				vacation_days_rem: null,
				sick_days_rem: null,
				pto_days_rem: null,
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
					permissions: []
				}
			},
			
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.employeeForm", this.employeeForm);
			// console.log("this.$refs", this.$refs);
		},

		showEditProfile() {
			this.parentSettings.editProfile = true;
			this.hideUpdateUserButtons = true;
			this.hideCreateUser = true;
			this.parentSettings.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.parentSettings.editProfile = !this.parentSettings.editProfile;
			this.hideUpdateUserButtons = !this.hideUpdateUserButtons;
			this.hideCreateUser = !this.hideCreateUser;
			this.parentSettings.hideSaveItem = true;
		},
		async newUserButton() {
			//Show/Hide Edit Fields and buttons
			let response = await this.clearUserFormData();
			console.log("addNewuserButton response", response);
			if (this.Users.employeeProfile.company) {
				this.employeeForm.company_id = this.Users.employeeProfile.company.id;
			}
			this.parentSettings.editProfile = true;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = true;
			this.parentSettings.hideSaveItem = false;
			this.parentSettings.activeTab = 0;
			this.showPasswordRest = false;
		},
		async clearandResetButton() {
			await this.clearUserFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.parentSettings.editProfile = false;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = false;
			this.parentSettings.hideSaveItem = true;
			this.parentSettings.activeTab = 0;
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
			this.resetViewtoHome();
			//Load current users data next
			console.log("createUserandClose All Done");
		},

		POSTEmployee() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				this.$f7.preloader.show();
				// Await addUser then await AddEmployee using email address to find user in Django
				this.employeeForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;
				delete this.employeeForm.user.groups;

				console.log("Create User this.employeeForm.user", this.employeeForm.user);
				let response = await this.$store.dispatch("POSTUser", this.employeeForm.user);
				console.log("response: ", response);
				this.employeeForm.user.barcode = {};

				if (response.status === 200 || response.status === 201) {
					console.log("Response 201");
					newUserForm = response.data;
				} else {
					response.type = "Create User";
					if (response.status) {
					} else {
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
				if (this.parentSettings.accountParent.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.employeeForm["datacom"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_partner) {
					companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.employeeForm["partner"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_merchant) {
					companyOBJ = this.Companies.companyList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.employeeForm["company"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_vendor) {
					companyOBJ = this.Vendors.vendorList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_vendor companyOBJ", companyOBJ);
					this.employeeForm["vendor"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					response.type = "Create Employee";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}

				console.log("this.employeeForm", this.employeeForm);
				let eeResponse = await this.$store.dispatch("POSTEmployee", this.employeeForm);
				console.log("Create Employee Promise eeResponse", eeResponse);

				if (response.status === 200 || response.status === 201) {
					this.$store.dispatch("GETEmployeeList");
					this.$f7.preloader.hide();
					return resolve(eeResponse);
				} else {
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
			this.showPasswordRest = true;
			this.parentSettings.activeTab = 0;
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
					//populate terminaiton date
				}
				if (this.employeeForm.hire_date) {
					var foramttedHireDate = this.employeeForm.hire_date.split("T")[0];
					//Populate Hire Date
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
		// Parsing CSV for Django storage
		parseDataHistory() {
			// this.$store.dispatch('firePreloader');
			console.log("csv", this.csv);
			var djangoInvObj = [];
			let mappedData = this.csv.map((data) => {
				"Name", "Model", "Manufacturer", "Category", "Category Class", "List Price", "Purchase Price";
				var objOfData = {
					name: data["Name"],
					model: data["Model"],
					category: data["Category"],
					category_class: data["Category Class"],
					purchase_price: data["Purchase Price"]
				};
				djangoInvObj.push(objOfData);
			});
			console.log("csv data from mapping function", djangoInvObj);

			//Place code here to split the array and dispatch each separately in chunks
			let count = djangoInvObj.length / 1;
			let i = 0;
			while (i < count + 1) {
				((i) => {
					setTimeout(() => {
						let chunk = djangoInvObj.splice(0, 1);
						console.log("chunk", chunk);
						this.$store.dispatch("POSTUser", chunk);
					}, 2000 * i);
				})(i++);
			}
			// this.$store.dispatch('closePreloader');
		},
		selectFile(e) {
			//Get image URL and send to bind method
			console.log("Event", e);
			let newImageFile = e.target.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(newImageFile);
			reader.onload = (e) => {
				this.fileURL = e.target.result;
				this.bind();
			};
			//Get Image object and validate then send
			this.file = this.$refs.invFile.files[0];
			const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
			const MAX_SIZE = 2000000;
			const tooLarge = this.file.size > MAX_SIZE;

			if (allowedFileTypes.includes(this.file.type) && !tooLarge) {
				this.error = false;
				this.uploadMessage = "";
			} else {
				this.error = true;
				this.uploadMessage = toolarge ? `Too large, Max size is ${MAX_SIZE / 1000}kb` : "Only Images are allowed";
			}
		},

		async sendFile() {
			this.employeeForm.profile_img = this.cropped;
			var formdata = this.employeeForm.user;
			console.log("this.employeeForm.user", this.employeeForm.user);

			try {
				this.$store.dispatch("PATCHEmployeeProfile", formdata);
				// await axios.patch('/django/users/'+ formdata.id + '/', formdata).then(response => {
				//   console.log("Django Image PATCH response", response);
				//   response.type = "Update User Profile Image";
				//   this.$store.dispatch("updateNotification", response);
				//   this.$store.dispatch('GETEmployeeList');
				// });
				this.uploadMessage = "File has been uploaded";
				this.file = "";
				this.cropped = "";
				this.fileURL = "";
			} catch (err) {
				this.uploadMessage = `There was an error uploading ${err.response.data.error}`;
				console.log("Error Uploading", err);
				this.error = true;
			}
		},

		//Image Cropper
		bind() {
			var $$ = this.Dom7;
			// Bind image to Cropper
			console.log("this.fileURL from bind()", this.fileURL);
			this.$refs.croppieRefUser
				.bind({
					url: this.fileURL
				})
				.then(() => {
					$$(".cr-slider").attr({ min: 0.15, max: 3 });
				});
		},

		// CALLBACK USAGE
		crop() {
			// Here we are getting the result via callback function
			// and set the result to this.cropped which is being
			// used to display the result above.
			let options = {
				format: "png",
				circle: true
			};
			this.$refs.croppieRefUser.result(options, (output) => {
				this.cropped = output;
			});
		},
		// EVENT USAGE
		cropViaEvent() {
			this.$refs.croppieRefUser.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			// Rotates the image
			this.$refs.croppieRefUser.rotate(rotationAngle);
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
	},
	computed: {
		...mapState(["Auth", "Orders", "Inventory", "Locale", "Static", "Errors"]),
		...mapState(["Users", "Companies", "Datacom", "Partners", "Vendors"]),
		...mapGetters(["GET_USER_LIST", "GET_COUNTRY_LIST", "GET_STATE_LIST", "GET_CITY_LIST"]),
		computedPasswords: {
			get() {
				console.log("this.passwordMessage", this.passwordMessage);
				if (this.employeeForm.user.password != this.employeeForm.user.verify_pw) {
					return "The passwords do not match";
				} else {
					return;
				}
			},
			// set() {
			// 	//I cant seem to figure out how to set vartiables with the computed
			// 	this.passwordMessage = "New Message";
			// }
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
				if (this.parentSettings.accountParent.is_datacom) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.parentSettings.accountParent.is_partner) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.parentSettings.accountParent.is_merchant) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.parentSettings.accountParent.is_vendor) {
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
		// let response = await this.setUserPlatformGET();
		// console.log("Users Mounted response", response);
		console.log("Users Mounted 1");
		this.$store.dispatch('getSharedCountries');
		console.log("Users Mounted 2");

		// Method to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefUser.bind({
			url: "http://datacom.localhost.mydataboxx.com:9000/static/UserProfileGrey170x170.png"
		});
	},
	on: {}
};
</script>

<style lang="scss" scoped>
// .sticky-top {
// 	position: -webkit-sticky;
// 	position: sticky;
// 	top: 0;
// }
// .material-icons {
// 	font-size: 48px;
// 	color: grey;
// }
// .dashboard-icons {
// 	text-align: center;
// 	p {
// 		text-align: center;
// 	}
// }

// .about-me-box {
// 	width: 100%;
// 	border: 1px solid rgb(182, 181, 181);
// 	height: 100px;
// }
// .image-sheet {
// 	height: 100vh;
// }
// .file-input {
// 	cursor: pointer;
// }
// .file-cta {
// 	width: 100vw;
// }
// .file-name {
// 	width: 100vw;
// }
// .dropzone {
// 	min-height: 200px;
// 	padding: 10px 10px;
// 	position: relative;
// 	cursor: pointer;
// 	outline: 2px dashed grey;
// 	outline-offset: -10px;
// 	width: 90%;
// 	background: lightcyan;
// 	color: dimgray;
// 	&:hover {
// 		background: lightblue;
// 	}
// 	& .call-to-action {
// 		font-size: 2rem;
// 		text-align: center;
// 		padding-top: 50px;
// 	}
// }

// .input-field {
// 	opacity: 0;
// 	width: 100%;
// 	height: 200px;
// 	position: absolute;
// 	cursor: pointer;
// }
// .img-container {
// 	width: 900px;
// 	height: 300px;
// }
// .imageNavButtons {
// 	.button {
// 		height: 75px;
// 		align-content: center;
// 	}
// }
</style>
