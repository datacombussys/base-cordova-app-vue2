<template>
	<f7-page name="customer-profile">
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
								<f7-card-header class="no-border hovering" valign="bottom" style="background-color: lightgrey;">
									<f7-row class="full-width">
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
									<f7-row v-if="!customerForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/UserProfileGrey170x170.png"
											style="width:170px;height:170px;"
											alt="Please load User Profile"
										/>
									</f7-row>
									<f7-row v-if="customerForm.profile_img" class="display-flex justify-content-center">
										<img :src="customerForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<div v-if="customerForm.user.barcode != undefined">
										<f7-row v-if="Object.keys(customerForm.user.barcode).length != 0">
											<f7-col class="text-align-center margin-top">
												<img :src="customerForm.user.barcode.image" style="width:75px;" alt="Please Load User" />
												<div>
													{{ customerForm.user.barcode.barcode_number }}
												</div>
											</f7-col>
										</f7-row>
									</div>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center"
										>{{ customerForm.user.first_name }} {{ customerForm.user.last_name }}</f7-block-title
									>
								</f7-card-footer>
							</f7-card>

							<f7-card class="margin-top">
								<f7-card-header class="no-border" valign="bottom" style="background-color: lightgrey;">
									<f7-block-title class="full-width no-margin-bottom">Contact Details</f7-block-title>
								</f7-card-header>
								<f7-card-content class="padding-half text-align-center">
									<!-- Show Company Data -->
									<f7-row v-show="!editProfile">
										<f7-col>
											<f7-block-title medium class="margin-top-half">Sales Rep</f7-block-title>
											<p>Mike Jones</p>
										</f7-col>
									</f7-row>
									<!-- Edit Company Data -->
									<f7-row v-show="editProfile">
										<f7-col>
											<f7-block-title medium class="margin-top-half">ABC Company Ltd.</f7-block-title>
											<p>Company Name:</p>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-stretch">
										<f7-col width="100">
											<f7-list>
												<f7-list-item
													title="Active Since"
													:after="customerForm.user.date_added | moment('MMM, Do, YYYY')"
												></f7-list-item>
												<f7-list-item title="Trial Period" after="Yes"></f7-list-item>
												<f7-list-item title="Expiration Date" after="2/25/2020"></f7-list-item>
												<f7-row class="display-flex">
													<f7-list-item checkbox title="Member" name="free-paid"></f7-list-item>
													<f7-list-item checkbox title="Non-Member" name="free-paid"></f7-list-item>
												</f7-row>
											</f7-list>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateUser">
										<f7-col>
											<f7-button @click="newUserButton" fill class="bg-color-red">Add New User</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click.prevent="createCustomerandClose" class="bg-color-green trans-btn-left"
												><span>Save User</span></f7-button
											>
											<f7-button
												fill
												popover-open=".new-transaction"
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
														@click.prevent="createCustomerandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createCustomerandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createCustomerandClose"
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
								<f7-block class="padding margin"></f7-block>
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
								<div v-if="Errors.customerErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</div>
								<div v-if="Errors.customerErrorData.length != 0">
									<div class="full-width" v-for="errorArray in Errors.customerErrorData" :key="errorArray.id">
										<div
											class="display-flex justify-content-center"
											:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
										>
											<div v-show="errorArray[0] === 'non_field_errors'" class="message-body">
												{{ errorArray[1][0] }}
											</div>
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
													<f7-icon size="50" icon="mdi mdi-account-cash-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Suscriptions</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<!-- Do a Billing Popup -->
												<f7-link href="/clock-screen/" icon-only>
													<f7-icon size="50" icon="mdi mdi-cart-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Shopping Cart</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<!-- Do a Helpdesk Popup -->
												<f7-link href="/work-schedule/" icon-only>
													<f7-icon size="50" icon="mdi mdi-lifebuoy">
														<f7-badge color="red">3</f7-badge>
													</f7-icon>
												</f7-link>
												<p>Help Desk</p>
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>
						</f7-block>
						<f7-block>
							<b-tabs type="is-boxed" v-model="activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
								<parent-component
									:toggleEditProfile="toggleEditProfile"
									:parentSettings="parentSettings"
									:moduleInfo="moduleInfo">
								</parent-component>
								</b-tab-item>
								<!-- END Company Tab -->

								<!-- Begin Profile Tab -->
								<b-tab-item label="Profile" icon="cube-scan" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
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
											<f7-list v-show="!editProfile">
												<f7-row>
													<f7-block-title class="full-width margin-top-half" medium>Your Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="customerForm.user.first_name"></f7-list-item>
														<p class="field-title">SSN:</p>
														<f7-list-item :title="customerForm.ssn"></f7-list-item>
														<p class="field-title">Mobile Phone:</p>
														<f7-list-item :title="customerForm.user.mobile_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="customerForm.user.street_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="customerForm.user.city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="customerForm.user.last_name"></f7-list-item>
														<p class="field-title">Date of Birth:</p>
														<f7-list-item
															:title="customerForm.user.dob | moment('MMM, Do, YYYY')"
														></f7-list-item>
														<p class="field-title">Fax Number:</p>
														<f7-list-item :title="customerForm.user.fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="customerForm.user.state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="customerForm.user.zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About Me</f7-block-title>
													<f7-col>
														<f7-list-item class="about-me-box" v-html="customerForm.user.bio"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Login Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="customerForm.user.email"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">PIN:</p>
														<f7-list-item :title="customerForm.user.pin"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col>
														<p>Password requirements: 1 Alpha, 1 Numeric, 1 Special Character, Minimum 6 characters.</p>
													</f7-col>
												</f7-row>
												<f7-row class="full-width no-margin-top">
													<f7-col>
														<f7-button fill>Password Reset</f7-button>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-row>
													<f7-block-title class="full-width margin-top-half" medium>Your Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															class="datacom-input"
															validate
															required
															error-message="First name is required"
															pattern="[A-Za-z]*"
															:value="customerForm.user.first_name"
															@input="customerForm.user.first_name = $event.target.value"
															type="text"
														>
														</f7-list-input>
														<div v-if="Errors.customerErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.customerErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'first_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															class="datacom-input"
															validate
															required
															error-message="Last name is required"
															pattern="[A-Za-z]*"
															:value="customerForm.user.last_name"
															@input="customerForm.user.last_name = $event.target.value"
															type="text"
														>
														</f7-list-input>
														<div v-if="Errors.customerErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.customerErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'last_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
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
															error-message='Format "000000000"'
															:value="customerForm.ssn"
															@input="customerForm.ssn = $event.target.value"
															type="text"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Date of Birth:</p>
														<f7-date-picker-component @receiveDate="receiveDobDate"></f7-date-picker-component>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Mobile Phone:</p>
														<f7-list-input
															validate
															class="datacom-input"
															placeholder="(800) 555-1234"
															pattern="[0-9]{1,10}"
															error-message='Format "##########"'
															:value="customerForm.user.mobile_phone"
															@input="customerForm.user.mobile_phone = $event.target.value"
															type="text"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax Number:</p>
														<f7-list-input
															validate
															placeholder="(800) 555-1234"
															pattern="[0-9]{1,10}"
															error-message='Format "##########"'
															:value="customerForm.user.fax"
															@input="customerForm.user.fax = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Street Address:</p>
														<f7-list-input
															:value="customerForm.user.street_address"
															@input="customerForm.user.street_address = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-input
															:value="customerForm.user.state"
															@input="getCities"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option v-for="state in GET_STATE_LIST" :key="state.id" :value="state.id">{{
																state.name
															}}</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-input
															:value="customerForm.user.city"
															@input="customerForm.user.city = $event.target.value"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option v-for="city in Locale.cities" :key="city.id" :value="city.id">{{
																city.name
															}}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-input
															validate
															placeholder="90210"
															pattern="[0-9]{1,5}"
															error-message='Format "#####"'
															:value="customerForm.user.zip"
															@input="customerForm.user.zip = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row class="full-width">
													<f7-block-title class="full-width" medium>About Me</f7-block-title>
													<f7-col width="100">
														<f7-text-editor ref="userBio" style="background: rgb(216,252,253)" />
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Login Information</f7-block-title>
													<f7-row>
														<f7-col>
															<p>
																Password requirements: 1 Alpha, 1 Numeric, 1 Special Character, Minimum 6 characters.
															</p>
														</f7-col>
													</f7-row>
													<f7-row v-if="showPasswordRest" class="full-width no-margin-top">
														<f7-col>
															<f7-button fill>Password Reset</f7-button>
														</f7-col>
													</f7-row>
													<f7-row v-if="!showPasswordRest" class="margin-top">
														<f7-col width="50">
															<p class="field-title">Email:<span style="color: red;"> *</span></p>
															<f7-list-input
																validate
																required
																error-message="Email is required"
																:value="customerForm.user.email"
																@input="customerForm.user.email = $event.target.value"
																type="email"
																style="background: rgb(216,252,253)"
															>
															</f7-list-input>
															<div v-if="Errors.customerErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.customerErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div v-show="errorArray[0] === 'email'" class="message-body">
																			{{ errorArray[1][0] }}
																		</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">PIN:<span style="color: red;"> *</span></p>
															<f7-list-input
																validate
																required
																pattern="[0-9]{1,4}"
																error-message="4-Digit Numerical PIN is required"
																:value="customerForm.user.pin"
																@input="customerForm.user.pin = $event.target.value"
																type="password"
																style="background: rgb(216,252,253)"
															>
															</f7-list-input>
															<div v-if="Errors.customerErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.customerErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div v-show="errorArray[0] === 'pin'" class="message-body">
																			{{ errorArray[1][0] }}
																		</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Password:<span style="color: red;"> *</span></p>
															<f7-list-input
																validate
																required
																error-message="Password is required"
																:value="customerForm.user.password"
																@input="customerForm.user.password = $event.target.value"
																type="password"
																style="background: rgb(216,252,253)"
															>
															</f7-list-input>
															<div v-if="Errors.customerErrorData.length != 0">
																<div
																	class="full-width"
																	v-for="errorArray in Errors.customerErrorData"
																	:key="errorArray.id"
																>
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.customerErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div v-show="errorArray[0] === 'password'" class="message-body">
																			{{ errorArray[1][0] }}
																		</div>
																	</div>
																</div>
															</div>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Verify PW:<span style="color: red;"> *</span></p>
															<f7-list-input
																validate
																required
																error-message="You must verify password"
																:value="customerForm.user.verify_pw"
																@input="customerForm.user.verify_pw = $event.target.value"
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

												<!-- Delete / Update Buttons-->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateUserButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateUserPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="25">
																<f7-button fill @click="activeTab = 1" class="bg-color-deeporange">Next -></f7-button>
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

								<!-- Begin Shipping Details Tab -->
								<b-tab-item label="Shipping" icon="truck" class="no-padding">
									<shipping-component :dataForm="customerForm" :moduleInfo="moduleInfo"></shipping-component>
								</b-tab-item>
								<!-- END Shipping Details Tab -->

								<!-- Begin Payment Tab -->
								<b-tab-item label="Payment" icon="credit-card" class="no-padding">
									<credit-card-component :moduleInfo="moduleInfo"></credit-card-component>
								</b-tab-item>
								<!-- END Payment Tab -->

								<!-- Begin Receipts Tab -->
								<b-tab-item label="Receipts" icon="account-clock" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-block-title class="full-width margin-bottom-half">Receipts and Invoices</f7-block-title>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Receipts Display List -->
											<f7-list v-show="!editProfile">
												<f7-row class="margin-top display-flex justify-content-center">
													<billing-component></billing-component>
							
												</f7-row>
												<f7-row class="margin-top display-flex justify-content-center">
													<receipt-component></receipt-component>
			
												</f7-row>
											</f7-list>
											<!-- END Receipts Display -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Receipts Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width margin-bottom-half">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshCustomers">
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
														<f7-list-item
															link="#"
															@click="deleteCustomer"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Customers.customerList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no users to display.</p>
													<p class="text-align-center">Create a new customer to get started.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newUserButton" large fill class="bg-color-red">Add New User</f7-button>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Customers.customerList.length != 0">
												<b-table
													:data="Customers.customerList"
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
															field="id"
															:visible="columnsVisible['id'].display"
															:label="columnsVisible['id'].title"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															sortable
															searchable
															centered
														>
															<template v-if="showDetailIcon">
																{{ props.row.id }}
															</template>
														</b-table-column>

														<b-table-column
															field="date_hired"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['date_added'].display"
															:label="columnsVisible['date_added'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.user.date_added | moment("M/D/Y h:m:s") }}
														</b-table-column>

														<b-table-column
															field="full_name"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['full_name'].display"
															:label="columnsVisible['full_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">
																{{ props.row.user.full_name }}
															</template>
															<template v-else>
																<a @click="toggle(props.row)">
																	{{ props.row.user.full_name }}
																</a>
															</template>
														</b-table-column>

														<b-table-column
															field="customer_type"
															:class="{ 'inactive-item': !props.row.user.is_active }"
															:visible="columnsVisible['customer_type'].display"
															:label="columnsVisible['customer_type'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.customer_type }}
														</b-table-column>

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
																>{{ props.row.user.is_active ? "Active" : "Inactive" }}</b-tag
															>
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
					</div>
				</div>
			</f7-col>
				<!-- END Right Column -->

		</f7-row>
		<!-- END Main Container Row -->

		<!-- ****************************************** Sheets and Modals *********************************************-->
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
									<f7-checkbox id="hasHeaders" :value="headers" checked @change="toggle"></f7-checkbox>
									Headers?
								</label>
							</template>

							<template slot="error">
								File type is invalid
							</template>

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
						<f7-block>
							{{ csv }}
						</f7-block>
					</f7-col>
				</f7-row>
			</f7-page-content>
			<!-- END Bulk Upload Sheet Content -->
		</f7-sheet>
		<!-- END Bulk Upload Sheet -->

		<!-- User Image Upload Sheet -->
		<f7-sheet class="inventory-image image-sheet" :opened="userImageSheet" @sheet:closed="userImageSheet = false">
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content class="padding-bottom">
				<section>
					<f7-block v-show="!customerForm.id">
						<f7-block-header>
							You must first select a user to add a profile image
						</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="customerForm.id">
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
								<div class="left" v-if="uploadMessage" :class="`message ${error ? 'is-danger' : 'is-success'}`">
									<div class="message-body">{{ uploadMessage }}</div>
								</div>
								<f7-block>
									<form enctype="multipart/form-data">
										<f7-row class="justify-content-center">
											<div class="dropzone">
												<input type="file" name="invArray" @change="selectFile" ref="invFile" class="input-field" />

												<p v-if="!uploading" class="call-to-action">
													Drop file here
												</p>
												<p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
													<progress class="progress"> </progress>
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
											>
											</vue-croppie>
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
										<p style="font-size: 30px;">You have not cropped an image. Please go back and click "Cropped".</p>
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
											>Submit</f7-button
										>
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

	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";
import Croppie from "croppie";

var moment = require("moment");

//Mixins
import { LocaleMixin } from "../../mixins/businesses/locale-mixins";
import { UniversalMixins } from "../../mixins/universal-mixins";

//Components
import navBarComponent from "../../components/universal/navbar-component.vue";
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datepicker-component.vue';
import shippingComponent from "../../components/business/shipping-component.vue";
import creditCardComponent from "../../components/business/creditcard-ach-component.vue";
import parentComponent from "@/components/business/parent-company-component.vue";
import billingInvoiceComponent from '@/components/universal/billing-invoice-component.vue';
import receiptsComponent from '@/components/universal/receipt-component.vue';

export default {
	name: "customerProfile",
	mixins: [
		LocaleMixin,
		UniversalMixins
		],
	components: {
		"nav-bar-component": navBarComponent,
		"f7-date-picker-component": f7DatePickerComponent,
		"shipping-component": shippingComponent,
		"credit-card-component": creditCardComponent,
		"parent-component": parentComponent,
		"billing-component": billingInvoiceComponent,
		"receipt-component": receiptsComponent

	},
	data() {
		return {
			pageSettings: {
				leftNavDrawer: ".employee-panel",
				pageTitle: "Employee Profile"
			},
			moduleInfo: {
				name: "Employees",
				type: "profile",
				level: 5
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
			//Buefy Tabs
			activeTab: 0,
			//Page Setting for CRUD Display
			editProfile: false,
			hideUpdateUserButtons: false,
			hideCreateUser: false,
			hideSaveItem: true,
			//V-IF Blocks
			isPrimaryCreditCard: false,
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
			//Begin DataTable Info
			showDetailIcon: true,
			checkedRows: [],
			columnsVisible: {
				id: { title: "ID", display: true },
				date_added: { title: "Date Joined", display: true },
				full_name: { title: "Full Name", display: true },
				customer_type: { title: "Type", display: true },
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
			//User / Customer Form Items
			customerDOBDate: [],
			customerForm: {
				id: null,
				datacom: null,
				partner: null,
				company: null,
				user: null,
				sales_rep: null,
				customer_number: null,
				company_name: null,
				dob: null,
				ssn: null,
				mailing_address: null,
				mailing_city: null,
				mailing_state: null,
				mailing_zip: null,
				resale_id: null,
				customer_type: null,
				profile_img: null,
				user: {
					id: null,
					email: null,
					password: null,
					verify_pw: null,
					username: null,
					date_added: null,
					last_login: null,
					is_admin: null,
					is_active: true,
					is_staff: false,
					is_superuser: null,
					full_name: null,
					first_name: null,
					last_name: null,
					mobile_phone: null,
					street_address: null,
					city: null,
					state: null,
					zip: null,
					bio: null,
					global_id: null,
					groups: [],
					barcode: {},
					pin: null,
					fax: null
				}
			}
		}
	},
	methods: {
		testingMethod(e) {
			console.log("this.Customers.customerList", this.Customers.customerList);
			console.log("this.customerForm", this.customerForm);
		},
		showEditProfile() {
			this.editProfile = true;
			this.hideUpdateUserButtons = true;
			this.hideCreateUser = true;
			this.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.editProfile = !this.editProfile;
			this.hideUpdateUserButtons = !this.hideUpdateUserButtons;
			this.hideCreateUser = !this.hideCreateUser;
			this.hideSaveItem = true;
		},
		async newUserButton() {
			//Show/Hide Edit Fields and buttons
			let response = await this.clearUserFormData();
			console.log("addNewuserButton response", response);
			if (this.Customers.customerProfile.company) {
				this.customerForm.company_id = this.Customers.customerProfile.company.id;
			}
			this.editProfile = true;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = true;
			this.hideSaveItem = false;
			this.activeTab = 0;
			this.showPasswordRest = false;
		},
		async clearandResetButton() {
			await this.clearUserFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.editProfile = false;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = false;
			this.hideSaveItem = true;
			this.activeTab = 0;
			this.activeStep = 0;
			this.$store.commit("RESET_ERRORS");
			this.uploadMessage = "";
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
		},
		async createCustomerandNew() {
			console.log("createCustomerandNew");
			//invoke the create user and create customer function
			let createUserRes = await this.createCustomer();
			console.log("createUserRes", createUserRes);
			//Populate Fields with Created Instance
			this.resetViewtoHome();
			this.newUserButton();
			console.log("createCustomerandNew All Done");
		},
		async createCustomerandEdit() {
			console.log("createCustomerandEdit");
			//invoke the create user and create customer function
			let createCustomerRes = await this.createCustomer();
			console.log("createCustomerRes", createCustomerRes);
			await this.clearUserFormData();
			//Populate Fields with Created Instance
			this.showUserData(createCustomerRes.id);
			this.showEditProfile();
			console.log("createCustomerandEdit All Done createUserRes");
		},
		async createCustomerandClose() {
			console.log("createCustomerandClose");
			//invoke the create user and create customer function
			let response = await this.createCustomer();
			console.log("createCustomerandClose response", response);
			//Populate Fields with Created Instance
			this.resetViewtoHome();
			//Load current users data next
			console.log("createCustomerandClose All Done");
		},

		createCustomer() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				this.$f7.preloader.show();
				// Await addUser then await AddCustomer using email address to find user in Django
				this.customerForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;
				this.customerForm.dob = new Date(this.customerForm.user.dob);

				console.log("Create User this.customerForm.user", this.customerForm.user);
				//Create UnLinked Copy of Form
				var customerFormCopy = JSON.parse(JSON.stringify(this.customerForm));
				delete customerFormCopy.user.groups;
				delete customerFormCopy.user.barcode;
				console.log("customerFormCopy", customerFormCopy);
				let response = await this.$store.dispatch("createUser", customerFormCopy.user);
				console.log("createCustomer createUser response: ", response);

				if (response.status === 200 || response.status === 201) {
					console.log("Response 201");
					newUserForm = response.data;
				} else {
					response.type = "Create User";
					response.status = 401;
					this.$store.dispatch("updateNotification", response);
					return reject(response.message);
				}

				this.customerForm["user"] = newUserForm.id;
				console.log("Successful User created:", newUserForm);

				//-------------------------------------------------------------------------------------//

				//Get Company ID (from each company type) and UserID add to Employee Form
				console.log("this.Auth.platformInfo", this.Auth.platformInfo);
				var companyOBJ = {};
				if (this.parentSettings.accountParent.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.legal_name == this.parentSettings.accountParent.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.customerForm["datacom"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_partner) {
					companyOBJ = this.Partners.partnerList.find((elem) => elem.legal_name == this.parentSettings.accountParent.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.customerForm["partner"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_merchant) {
					companyOBJ = this.Companies.companyList.find((elem) => elem.legal_name == this.parentSettings.accountParent.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.customerForm["company"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					response.type = "Create Employee";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}

				console.log("this.customerForm", this.customerForm);
				let eeResponse = await this.$store.dispatch("createCustomer", this.customerForm);
				console.log("Create Customer Promise eeResponse", eeResponse);
				if (response.status === 200 || response.status === 201) {
					this.$store.dispatch("getCustomerList");
					this.$f7.preloader.hide();
					return resolve(eeResponse);
				} else {
					response.type = "Create Customer";
					response.status = 401;
					this.$store.dispatch("updateNotification", response);
					return reject(response.message);
				}
			}).catch((error) => {
				console.log("Caught Promise error:", error);
				return error;
			});
		},
		refreshCustomers() {
			this.$store.dispatch("getCustomerList");
		},
		// Populate Fields for editing in browser
		async showUserData(customerID) {
			console.log("showUserData customerID", customerID);
			this.showPasswordRest = true;
			this.activeTab = 0;
			//Get User ID and object and map to fields
			var customerListID = null;
			if (this.checkedRows.length != 0) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var eeIndex = this.Customers.customerList.findIndex((elem) => elem.id === rowID);
				console.log("editUsers eeIndex", eeIndex);
				customerListID = eeIndex;
				console.log("IF customerListID", customerListID);
			} else {
				var findIndexPos = this.Customers.customerList.findIndex((elem) => {
					return elem.id === customerID;
				});
				customerListID = findIndexPos;
				console.log("Else customerListID", customerListID);
				console.log("Else this.Customers.customerList", this.Customers.customerList);
			}
			//Is there a list of companies to lookup?
			if (this.Customers.customerList.length === 0) {
				return "There are no items available";
			}
			if (this.Customers.customerList.length != 0) {
				console.log("this.Customers.customerList", this.Customers.customerList);
				console.log("Then customerListID", customerListID);
				var customerObj = this.Customers.customerList[customerListID];
				console.log("showUserData customerObj", customerObj);
				this.customerForm = customerObj;
				for (let key in this.customerForm) {
					this.customerForm[key] = customerObj[key];
				}
				//Parse the User SubLevel Info for User Data
				for (let attribute in this.customerForm.user) {
					this.customerForm.user[attribute] = customerObj.user[attribute];
				}
				this.customerForm.company = customerObj.company;

				//I need to update the calendar fields and bio field manually
				if (this.customerForm.dob) {
					var foramttedDOBDate = this.customerForm.dob.split("T")[0];
					//Need to Populate Hire Date
				}

				//Populate User Bio Field
				this.$refs.userBio.f7TextEditor.contentEl.innerHTML = this.customerForm.user.bio;
				//Get User Barcode
				this.getUserBarcode();
				//Switch View to Edit Mode
				this.resetViewtoHome();
				this.showEditProfile();
			}
		},
		clearUserFormData() {
			return new Promise((resolve, reject) => {
				try {
					console.log("clearUserFormData Start", this.customerForm);
					for (let key in this.customerForm.user) {
						// console.log('key', this.customerForm.user[key]);
						if (this.customerForm.user[key] === true || this.customerForm.user[key] === false) {
							// console.log('TF key', key);
							this.customerForm.user[key] = false;
						} else {
							this.customerForm.user[key] = null;
						}
					}
					for (let key in this.invImgGallery) {
						// console.log('key', this.invImgGallery[key]);
						this.invImgGallery[key] = null;
					}
					//Reset Customer Variables
					this.customerForm.user.groups = [];
					this.customerForm.user.barcode = {};
					this.customerForm.user.is_active = true;

					//Reset the view
					this.resetViewtoHome();

					//Call other methods to clear
					this.clearCustomerFormData();
					this.clearDOBDate();
					console.log("clearUserFormData End", this.customerForm);

					return resolve("ClearUserForms Promise Returned");
				} catch (error) {
					console.log("Caught error", error);
				}
			});
		},
		clearCustomerFormData() {
			console.log("this.customerForm Clear Data", this.customerForm);
			const user = JSON.parse(JSON.stringify(this.customerForm.user));
			for (let key in this.customerForm) {
				console.log("key", this.customerForm[key]);
				if (this.customerForm[key] === true || this.customerForm[key] === false) {
					// console.log('TF key', key);
					this.customerForm[key] = false;
				} else {
					this.customerForm[key] = null;
				}
			}
			//Reset Customer Variables
			this.customerForm.user = user;
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateUserPATCH() {
			this.customerForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;
			this.customerForm.dob = new Date(this.customerForm.user.dob);

			try {
				await this.$store.dispatch("PATCHUser", this.customerForm.user).then((response) => {
					console.log("PATCH User Repsonse Update User", response);
				});
				delete this.customerForm.user;
				await this.$store.dispatch("PATCHCustomer", this.customerForm).then((response) => {
					console.log("PATCH User Repsonse Update Customer", response);
				});
			} catch (error) {
				console.log("There was an error in the try catch block", error);
			}
		},
		//Set User item to inactive instead of deleting instance
		async deleteCustomer() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows[0].id;
				var findIndexID = this.Users.userList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteCustomer findIndexID", findIndexID);
				if (this.Users.userList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Users.userList.length === 1) {
					let UserItem = this.Users.userList[0];
					console.log("deleteCustomer len===1 UserItem", UserItem);
					for (let key in this.customerForm) {
						this.customerForm[key] = UserItem[key];
					}
					this.customerForm.is_active = false;
					await this.$store.dispatch("deleteCustomer", this.customerForm);
				}
				if (this.Users.userList.length >= 2) {
					// Map function to assign the varibles to the form variables
					let UserItem = this.Users.userList[findIndexID];
					console.log("deleteCustomer len>=2 UserItem", UserItem);
					for (let key in this.customerForm) {
						this.customerForm[key] = UserItem[key];
					}
					this.customerForm.is_active = false;
					await this.$store.dispatch("deleteCustomer", this.customerForm);
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			await this.clearUserFormData();
		},
		addCreditCard() {
			console.log("addCreditCard");
		},
		deleteCreditCard(card) {
			console.log("deletingPosition card", card);
			//Find Position form store and send that ID value
			var cardObj = this.Customers.customerCreditCardList.find((elem) => elem.name === pos);
			console.log("cardObj", cardObj);
			this.$store.dispatch("deleteCustomerPosition", cardObj.id);
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
						this.$store.dispatch("createUser", chunk);
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
			this.customerForm.profile_img = this.cropped;
			var formdata = this.customerForm.user;
			console.log("this.customerForm.user", this.customerForm.user);

			try {
				await axios.patch("/django/users/" + formdata.id + "/", formdata).then((response) => {
					console.log("Django Image PATCH response", response);
					this.$store.dispatch("getCustomerList");
				});
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
		//Find out which Platform Customer belongs to
		getCustomerPlatform(inForm) {
			return new Promise(async (resolve, reject) => {
				var payload = {};
				if (inForm != undefined) {
					payload = inForm;
				}
				console.log("this.Customers.customerProfile", this.Customers.customerProfile);
				console.log("getCustomerPlatform payload", payload);
				if (this.Customers.customerProfile.datacom != null) {
					let platform = {
						platform: "datacom",
						url: "?datacom__id=" + this.Customers.customerProfile.datacom.id,
						domain: this.Auth.domain
					};
					payload["datacom"] = this.Customers.customerProfile.datacom.id;
					let newForm = { ...payload, ...platform };
					console.log("newForm", newForm);
					return resolve(newForm);
				} else if (this.Customers.customerProfile.partner != null) {
					let platform = {
						platform: "partner",
						url: "?partner__id=" + this.Customers.customerProfile.partner.id,
						domain: this.Auth.domain
					};
					payload.partner = this.Customers.customerProfile.partner.id;
					let newForm = { ...payload, ...platform };
					console.log("newForm", newForm);
					return resolve(newForm);
				} else if (this.Customers.customerProfile.company != null) {
					let platform = {
						platform: "company",
						url: "?company__id=" + this.Customers.customerProfile.company.id,
						domain: this.Auth.domain
					};
					payload.company = this.Customers.customerProfile.company.id;
					let newForm = { ...payload, ...platform };
					console.log("newForm", newForm);
					return resolve(newForm);
				} else if (this.Customers.customerProfile.vendor != null) {
					let platform = {
						platform: "vendor",
						url: "?vendor__id=" + this.Customers.customerProfile.vendor.id,
						domain: this.Auth.domain
					};
					payload.vendor = this.Customers.customerProfile.vendor.id;
					let newForm = { ...payload, ...platform };
					console.log("newForm", newForm);
					return resolve(newForm);
				} else {
					return reject("No Match Found");
				}
			}).catch((error) => {
				return error;
			});
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
		logout() {
			this.$store.dispatch("signOut");
		},
		getCities(e) {
			this.customerForm.user.state = e.target.value;
			// console.log("this.customerForm.user.state", this.customerForm.user.state);
			this.$store.dispatch("getCities", this.customerForm.user.state);
		},
		clearDOBDate() {
			// console.log('this.$refs.customerDOBDate', this.$refs.customerDOBDate);
			this.$refs.customerDOBDate.$refs.inputEl.value = "";
		},
		resetCompanyToggles(name) {
			this.parentSettings.accountParent.is_datacom = name === "datacom";
			this.parentSettings.accountParent.is_partner = name === "partner";
			this.parentSettings.accountParent.is_merchant = name === "merchant";
			this.parentSettings.accountParent.is_vendor = name === "vendor";
		},
		companyTypeToggle(e) {
			console.log("Toggle e", e);
			if (e.target.name === "datacom") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.is_datacom = false;
				}
			}
			if (e.target.name === "partner") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.is_partner = false;
				}
			}
			if (e.target.name === "merchant") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.is_merchant = false;
				}
			}
			if (e.target.name === "vendor") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.parentSettings.accountParent.is_vendor = false;
				}
			}
		},
		//Verified Methods
		receiveDobDate(date) {
			console.log('receiveDate date', date);
			this.customerForm.user.dob = date;
		},
		
	},
	computed: {
		...mapState(["Auth", "Locale", "Static", "Errors", "Common", "VTHPP"]),
		...mapState(["Users", "Companies", "Datacom", "Partners", "Customers"]),
		...mapGetters(["GET_USER_LIST", "GET_STATE_LIST", "getcustomerCreditCardsList"]),
		computedPasswords: {
			get() {
				console.log("this.passwordMessage", this.passwordMessage);
				if (this.customerForm.user.password != this.customerForm.user.verify_pw) {
					return "The passwords do not match";
				} else {
					return;
				}
			},
			set() {
				//I cant seem to figure out how to set vartiables with the computed
				this.passwordMessage = "New Message";
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
		}
	},
	beforeMount() {},
	async mounted() {

		// Method to put an initial image on the canvas for Croppie.js.
		// this.$refs.croppieRefUser.bind({
		// 	url: "http://datacom.localhost.mydataboxx.com:9000/static/UserProfileGrey170x170.png"
		// });
	},
	on: {}
};
</script>

<style lang="scss" scoped>

</style>
