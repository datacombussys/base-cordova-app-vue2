<template>
	<f7-page name="vendor-profile">
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
								<f7-card-header class="no-border hovering" valign="bottom" style="background-color: lightgrey;">
									<f7-row class="full-width display-flex align-items-center">
										<f7-col width="50" class="align-self-flex-end">
											<f7-block-title class="full-width no-margin-bottom">Vendor</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".vendor-image"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!vendorForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load vendor profile"
										/>
									</f7-row>
									<f7-row v-if="vendorForm.profile_img" class="display-flex justify-content-center">
										<img :src="vendorForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<f7-row>
										<f7-col class="text-align-center margin-top" v-if="vendorForm.barcode">
											<img :src="vendorForm.barcode.image" style="width:150px;" alt="Please load item" />
											<div>
												{{ vendorForm.barcode.barcode_number }}
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">{{
										vendorForm.legal_name
									}}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component
								:profileForm="vendorForm"
								:cardSettings="profileCardSettings"
							></profile-card-component>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Vendor</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click="createVendorandClose" class="bg-color-green trans-btn-left"
												><span>Save Vendor</span></f7-button
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
														@click.prevent="createVendorandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createVendorandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createVendorandClose"
														popover-close
														title="Save and Close"
													></f7-list-item>
												</f7-list>
											</f7-popover>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-center" v-if="hideCreateItem">
										<f7-col width="90">
											<f7-button @click="clearFormData" fill class="bg-color-red">Clear Data</f7-button>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>

							<f7-col class="no-margin no-padding">
								<f7-button @click="testingMethod" fill class="bg-color-orange">test</f7-button>
							</f7-col>
							<f7-block class="margin padding"></f7-block>
						</f7-block>
					</div>
				</div>
				<!-- End Scrollbar (dragger) -->
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
								<div v-if="Errors.vendorErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
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
												<p>Notifications</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link href="/users-groups/" icon-only>
													<f7-icon size="50" icon="mdi mdi-account-cash-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Invoicing</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<!-- Do a Billing Popup -->
												<f7-link href="#" sheet-open=".setup-sheet" icon-only>
													<f7-icon size="50" icon="mdi mdi-cogs">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Setup / Admin</p>
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
								<b-tab-item label="Company" v-if="Auth.authLevel <= 3" icon="office-building" class="no-padding">
									<parent-component
										:toggleEditProfile="toggleEditProfile"
										:editProfile="editProfile"
										:hideSaveUser="hideSaveItem"
										:accountParent="vendorParent"
										:moduleInfo="moduleInfo"
									>
									</parent-component>
								</b-tab-item>
								<!-- END Company Tab -->

								<!-- Begin Profile Tab -->
								<b-tab-item label="Profile" icon="cube-scan" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Profile</f7-block-title>
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
													<f7-block-title class="full-width no-margin-top" medium>Account Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Vendor Legal Name:</p>
														<f7-list-item :title="vendorForm.legal_name"> </f7-list-item>
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="vendorForm.account_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Vendor DBA:</p>
														<f7-list-item :title="vendorForm.dba_name"></f7-list-item>
														<p class="field-title">Vendor ID:</p>
														<f7-list-item :title="vendorForm.global_id"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<!-- Vendor Details -->
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="vendorForm.primary_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="vendorForm.primary_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="vendorForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="vendorForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="vendorForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.primary_mailing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.primary_mailing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="vendorForm.primary_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="vendorForm.primary_email"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-item :title="vendorForm.website"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="vendorForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->

											<!-- Begin Profile Edit List -->
											<f7-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Vendor Legal Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="vendorForm.legal_name"
															@input="vendorForm.legal_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.vendorErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.vendorErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.vendorErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'legal_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Vendor DBA:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="vendorForm.dba_name"
															@input="vendorForm.dba_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.vendorErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.vendorErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.vendorErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'dba_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Account ID: (Auto Generated)</p>
														<f7-list-item :title="vendorForm.account_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Vendor ID:</p>
														<f7-list-item :title="vendorForm.global_id"> </f7-list-item>
													</f7-col>
												</f7-row>

												<!-- Vendor Details -->
												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="vendorForm"
													:formSettings="primaryContactSettings">
												</business-contact-form-component>
												
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="vendorDescriptionEditor"
															ref="vendorDescription"
															style="background: rgb(216,252,253)"
														/>
													</f7-col>
												</f7-row>
												<!-- END Profile Edit List -->

												<!-- Delete and Update Buttons -->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red" @click="deleteVendor">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateVendorPATCH">Update</f7-button>
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
											<!-- END Profile Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Profile Tab -->

								<!-- Begin Contacts Tab -->
								<b-tab-item label="Contacts" icon="account-box-multiple-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Vendor Contacts</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Contacts Display List -->
											<f7-list v-show="!editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="vendorForm.billing_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="vendorForm.billing_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="vendorForm.billing_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="vendorForm.billing_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="vendorForm.billing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.billing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.billing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="vendorForm.billing_zip"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="vendorForm.shipping_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="vendorForm.shipping_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="vendorForm.shipping_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="vendorForm.shipping_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="vendorForm.shipping_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.shipping_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.shipping_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="vendorForm.shipping_zip"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="vendorForm"
													:formSettings="billingContactSettings">
												</business-contact-form-component>

												<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="vendorForm"
													:formSettings="shippingContactSettings">
												</business-contact-form-component>

												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateVendorPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="40" class="display-flex justify-content-end margin">
																<f7-button fill popover-open=".new-transaction" class="bg-color-green trans-btn-left"
																	><span>Save Vendor</span></f7-button
																>
																<f7-button
																	fill
																	popover-open=".new-transaction"
																	class="bg-color-green trans-btn-right"
																	icon-color="white"
																	icon-size="40"
																	icon="mdi mdi-menu-down"
																></f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END Contacts Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Contacts Tab -->

								<!-- Begin Employees Tab -->
								<b-tab-item label="Employees" icon="account-group" class="no-padding">
									<employee-database-component :moduleInfo="moduleInfo"></employee-database-component>
								</b-tab-item>
								<!-- END Employees Tab -->

								<!-- Begin Reporting History Tab -->
								<b-tab-item label="Reporting" icon="chart-bar" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Reporting</f7-block-title>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<reporting-charts-component :moduleInfo="moduleInfo"></reporting-charts-component>
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Reporting History Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshVendor">
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
														<f7-list-item
															link="#"
															@click="editVendorData"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deleteVendor"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Vendors.vendorList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no vendors to display.</p>
													<p class="text-align-center">Please create a new vendor.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red"
																>Add New Vendor</f7-button
															>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Vendors.vendorList.length != 0">
												<b-table
													:data="Vendors.vendorList"
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
													:default-sort="['dba_name', 'asc']"
													aria-next-label="Next page"
													aria-previous-label="Previous page"
													aria-page-label="Page"
													aria-current-label="Current page"
												>
													<template slot="bottom-left">
														<b-select v-model="perPage" :disabled="!isPaginated">
															<option value="5">5 per page</option>
															<option value="10">10 per page</option>
															<option value="15">15 per page</option>
															<option value="20">20 per page</option>
														</b-select>
													</template>
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
																<img :src="props.row.profile_img" :class="{ 'inactive-item': !props.row.is_active }" />
															</div>
														</b-table-column>

														<b-table-column
															field="id"
															:visible="columnsVisible['id'].display"
															:label="columnsVisible['id'].title"
															width="40"
															:class="{ 'inactive-item': !props.row.is_active }"
															sortable
															searchable
															numeric
														>
															<template v-if="showDetailIcon">
																{{ props.row.id }}
															</template>
														</b-table-column>

														<b-table-column
															field="date"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['date_added'].display"
															:label="columnsVisible['date_added'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.date_added | moment("M/D/Y") }}
														</b-table-column>

														<b-table-column
															field="dba_name"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['dba_name'].display"
															:label="columnsVisible['dba_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">
																{{ props.row.dba_name }}
															</template>
															<template v-else>
																<a @click="toggle(props.row)">
																	{{ props.row.dba_name }}
																</a>
															</template>
														</b-table-column>

														<b-table-column
															field="closure_date"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['acct_closure_date'].display"
															:label="columnsVisible['acct_closure_date'].title"
															sortable
															searchable
															centered
														>
															<div>{{ props.row.acct_closure_date | moment("M/D/Y") }}</div>
														</b-table-column>

														<b-table-column
															field="is_active"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['is_active'].display"
															:label="columnsVisible['is_active'].title"
															sortable
															searchable
															centered
														>
															<b-tag size="is-medium" :type="`${props.row.is_active ? 'is-success' : 'is-danger'}`">{{
																props.row.is_active ? "Active" : "Inactive"
															}}</b-tag>
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
						<f7-row>
							<f7-block></f7-block>
						</f7-row>
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
			:opened="vendorBulkUploadSheet"
			@sheet:closed="vendorBulkUploadSheet = false"
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

		<!-- Vendor Image Upload Sheet -->
		<f7-sheet class="vendor-image image-sheet" :opened="vendorImageSheet" @sheet:closed="vendorImageSheet = false">
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content class="padding-bottom">
				<section>
					<f7-block v-show="!vendorForm.id">
						<f7-block-header>
							You must first select a vendor to add a profile image
						</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="vendorForm.id">
						<div class="block">
							<button class="button" fill @click="activeStep = 0">Start Over</button>
						</div>
						<div>
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
													ref="croppieRefVendor"
													:enableOrientation="true"
													:boundary="{ width: 300, height: 300 }"
													:viewport="{ width: 250, height: 250, type: 'circle' }"
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
						</div>
					</f7-block>
				</section>
				<f7-block class="margin-bottom"></f7-block>
			</f7-page-content>
			<!-- END Vendor Sheet Content -->
		</f7-sheet>
		<!-- END Vendor Image Upload Sheet -->
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
import { UniversalMixins } from "../../mixins/universal-mixins";
import { LocaleMixin } from "../../mixins/businesses/locale-mixins";

//LayoutComponents
import navBarComponent from "../../components/universal/navbar-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import employeeDatabaseComponent from "../../components/business/employees-database-component.vue";
import reportingChartsComponent from "../../components/business/reporting-component.vue";
import parentComponent from "../../components/business/parent-company-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "vendorProfile",
	mixins: [UniversalMixins, LocaleMixin],
	components: {
		"nav-bar-component": navBarComponent,
		"profile-card-component": profileCardComponent,
		"employee-database-component": employeeDatabaseComponent,
		"reporting-charts-component": reportingChartsComponent,
		"parent-component": parentComponent,
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Main Settings
			platformLevel: 4,
			//Component Data
			pageSettings: {
				leftNavDrawer: ".vendor-panel",
				pageTitle: "Vendor Profile"
			},
			profileCardSettings: {
				type: 'business',
				title: "Vendor Details"
			},
			moduleInfo: {
				name: "vendor",
				type: "profile",
				level: 4
			},
			primaryContactSettings: {
				type: "primary"
			},
			shippingContactSettings: {
				type: "shipping"
			},
			billingContactSettings: {
				type: "billing"
			},

			//Popups and Modals
			deptPopupOpened: false,
			payCyclesPopupOpened: false,
			positionPopupOpened: false,
			vendorImageSheet: false,
			vendorBulkUploadSheet: false,
			setupSheetOpened: false,
			ccPopupOpened: false,
			achPopupOpened: false,
			//Page Setting for CRUD Display
			editProfile: false,
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			hideSaveItem: true,

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
			// Buefy Table Settings
			showDetailIcon: true,
			checkedRows: [],
			columnsVisible: {
				date_added: { title: "Date Added", display: true },
				id: { title: "ID", display: true },
				dba_name: { title: "DBA Name", display: true },
				profile_img: { title: "Image", display: true },
				acct_closure_date: { title: "Closed Date", display: true },
				is_active: { title: "Status", display: true }
			},
			//Buefy Tabs
			activeTab: 0,
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
			//Vendor Form Items
			vendorForm: {
				datacom: null,
				partner: null,
				vendor: null,
				created_by: null,
				account_number: 0,
				domain: null,
				profile_img: null,
				barcode: null,
				purchasing_terms: null,
				vendor_type: null,
				notes: null,
				primary_contact_list: [],
				billing_contact_list: [],
				technical_contact_list: [],
				shipping_contact_list: [],
				//Common Vendor Fields
				id: 0,
				dba_name: null,
				legal_name: null,
				description: null,
				website: null,
				description: null,
				date_added: null,
				global_id: null,
				corp_address: null,
				corp_city: null,
				corp_state: null,
				corp_zip: null,
				main_phone: null,
				main_fax: null,
				main_email: null,
				primary_mailing_address: null,
				primary_mailing_city: null,
				primary_mailing_state: null,
				primary_mailing_zip: null,
				primary_first_name: null,
				primary_last_name: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,
				shipping_address: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				shipping_first_name: null,
				shipping_last_name: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,
				billing_address: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				billing_first_name: null,
				billing_last_name: null,
				billing_phone: null,
				billing_fax: null,
				billing_email: null,
				status: null,
				is_active: null,
				board_date: null,
				acct_closure_date: null,
				closure_reason: null,
				is_active: true,
				is_datacom: true,
				is_partner: false,
				is_merchant: false,
				is_vendor: false
			},
			vendorParent: {
				company_name: null,
				is_datacom: false,
				is_partner: false
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.vendorForm ", this.vendorForm);
			console.log("this.Companaies.vendorList", this.Vendors.vendorList);
			console.log("this.vendorForm.entity_type ", this.vendorForm.entity_type);
		},
		menudropdown(UserID) {
			console.log("menudropdown UserID", UserID);
			// Add User to list
		},
		showEditProfile() {
			this.editProfile = true;
			this.hideUpdateItemButtons = true;
			this.hideCreateItem = true;
			this.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.editProfile = !this.editProfile;
			this.hideUpdateItemButtons = !this.hideUpdateItemButtons;
			this.hideCreateItem = !this.hideCreateItem;
			this.hideSaveItem = true;
		},
		newItemButton() {
			//Show/Hide Edit Fields and buttons
			this.clearFormData();
			this.editProfile = true;
			this.hideCreateItem = !this.hideCreateItem;
			this.hideUpdateItemButtons = false;
			this.hideSaveItem = false;
			this.activeTab = 0;
		},
		clearandResetButton() {
			this.clearFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.editProfile = false;
			this.hideUpdateItemButtons = false;
			this.hideCreateItem = false;
			this.hideSaveItem = true;
			this.activeTab = 0;
			this.activeStep = 0;
			this.$store.commit("RESET_ERRORS");
			this.uploadMessage = "";
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
		},
		//Create Vendor and Edit Current Vendor
		async createVendorandEdit() {
			let createVendorRes = await this.createVendor();
			//Populate Fields with Created Instance
			this.editVendorData(createVendorRes.id);
			console.log("createVendorandEdit All Done", createVendorRes);
		},

		//Create Vendor and Clear form for entering a new vendor
		async createVendorandNew() {
			await this.createVendor();
			//Clear Form and Reset to Starting Editing Position
			console.log("createVendorandNew All Done");
			this.newItemButton();
		},
		//Create Vendor and Clear form for Viewing Data
		async createVendorandClose() {
			let createVendorRes = await this.createVendor();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createVendorandClose All Done", createVendorRes);
			this.clearFormData();
		},
		async createVendor() {
			this.$store.commit("RESET_ERRORS");
			try {
				this.$f7.preloader.show();
				//Dispatch creation method and update Fields with latest Object
				console.log("createVendor, this.vendorForm", this.vendorForm);
				this.vendorForm.description = this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML;

				//Get Details of the creator
				var newVendorForm = await this.setUserPlatformPOST(this.vendorForm);
				console.log("newVendorForm", newVendorForm);
				var vendorResponse = await this.$store.dispatch("createVendor", newVendorForm);
				console.log("vendorResponse", vendorResponse);

				return vendorResponse;
			} catch (error) {
				console.error("Promise Response Error creating Vendor", error);
			}
		},
		refreshVendor() {
			console.log("this.getVendorLit", this.getVendors);
			this.$store.dispatch("getVendorList");
		},
		// Populate Fields for editing in browser
		editVendorData(vendorID) {
			this.clearFormData();
			this.activeTab = 0;
			this.showEditProfile();
			//Get User ID and object and map to fields
			var vendorListID = null;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexPos = this.Vendors.vendorList.findIndex((elem) => {
					return elem.id === rowID;
				});
				console.log("editVendors findIndexPos", findIndexPos);
				vendorListID = findIndexPos;
				console.log("IF vendorListID", vendorListID);
			} else {
				var findIndexPos = this.Vendors.vendorList.findIndex((elem) => {
					return elem.id === vendorID;
				});
				vendorListID = findIndexPos;
				console.log("Then vendorListID", vendorListID);
			}
			//Is there a list of vendors to lookup?
			if (this.Vendors.vendorList.length === 0) {
				return "There are no items available";
			}

			if (this.Vendors.vendorList.length != 0) {
				console.log("this.Vendors.vendorListings", this.Vendors.vendorList);
				console.log("Then vendorListID", vendorListID);
				var vendorItem = this.Vendors.vendorList[vendorListID];
				console.log("editVendors vendorItem", vendorItem);
				for (let key in this.vendorForm) {
					this.vendorForm[key] = vendorItem[key];
				}
				this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML = this.vendorForm.description;
				this.$store.dispatch("getEmployeeFilter", vendorListID);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		updateVendorPATCH() {
			this.vendorForm.description = this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML;
			delete this.vendorForm.profile_img;
			console.log("editVendors vendorForm", this.vendorForm);
			this.$store.dispatch("updateVendorItem", this.vendorForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteVendor() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Vendors.vendorList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteVendor findIndexID", findIndexID);
				if (this.Vendors.vendorList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Vendors.vendorList.length != 0) {
					let vendorItem = this.Vendors.vendorList[findIndexID];
					console.log("deleteVendor != 0 vendorItem", vendorItem);
					for (let key in this.vendorForm) {
						this.vendorForm[key] = vendorItem[key];
					}
					//Set Variables to make account inactive
					delete this.vendorForm.profile_img;
					this.vendorForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.vendorForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteVendor", this.vendorForm).then((response) => {
							console.log("response from deleteVendor method", response);
							this.clearFormData();
						});
					} catch (error) {
						console.error("Promise Response Error", error);
					}
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			this.resetViewtoHome();
		},
		deleteChip() {
			console.log("deleting Chip");
		},
		clearFormData() {
			console.log("clearFormData this.vendorForm", this.vendorForm);
			for (let key in this.vendorForm) {
				console.log("key", this.vendorForm[key]);
				if (this.vendorForm[key] === true || this.vendorForm[key] === false) {
					// console.log('TF key', key);
					this.vendorForm[key] = false;
				} else {
					this.vendorForm[key] = null;
				}
			}
			//Reset Vendor Variables
			this.vendorForm.is_vendor = true;
			this.vendorForm.is_active = true;
			this.vendorForm.primary_contact_list = [];
			this.vendorForm.billing_contact_list = [];
			this.vendorForm.technical_contact_list = [];
			this.vendorForm.shipping_contact_list = [];
			//Reset the view
			this.resetViewtoHome();
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
						this.$store.dispatch("createInventory", chunk);
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
			this.vendorForm.profile_img = this.cropped;
			var formdata = this.vendorForm;
			console.log("this.vendorForm", this.vendorForm);

			try {
				await axios.put("/django/vendors/" + formdata.id + "/", formdata).then((response) => {
					console.log("Vendor Image PUT response", response);
					this.$store.dispatch("getVendorList");
					response.type = "Vendor Profile Image";
					this.$store.dispatch("updateNotification", response);
				});
				// this.uploadMessage = "File has been uploaded";
				this.file = "";
				this.cropped = "";
				this.fileURL = "";
				this.activeStep = 0;
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
			this.$refs.croppieRefVendor
				.bind({
					url: this.fileURL
				})
				.then(() => {
					$$(".cr-slider").attr({ min: 0.15, max: 3 });
				});
		},
		// CroppieJS CALLBACK USAGE
		crop() {
			// Here we are getting the result via callback function
			// and set the result to this.cropped which is being
			// used to display the result above.
			let options = {
				format: "png",
				circle: true
			};
			this.$refs.croppieRefVendor.result(options, (output) => {
				this.cropped = output;
			});
		},
		// CroppieJS
		cropViaEvent() {
			this.$refs.croppieRefVendor.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			// Rotates the image
			this.$refs.croppieRefVendor.rotate(rotationAngle);
		},
		getACHCities(e) {
			this.achForm.billing_state = e.target.value;
			this.$store.dispatch("getCities", this.achForm.billing_state);
		},
		async addCreditCard() {
			//Get Vendor ID
			let response = await this.setUserPlatformPOST(this.creditCardForm);
			console.log("response", response);
			this.$store.dispatch("addCreditCard", response);
		},
		deleteCreditCard() {},
		addDepartment() {
			console.log("addDepartment");
		},
		deleteDepartment() {
			console.log("deleteDepartment");
		},
		async addPosition(e) {
			console.log("addingPosition", e);
			console.log("this.positionForm", this.positionsForm);
			await this.$store.dispatch("addEmloyeePosition", this.positionsForm);
			this.positionsForm.name = null;
		},
		deletePosition(pos) {
			console.log("deletingPosition pos", pos);
			//Find Position form store and send that ID value
			var positonObj = this.Users.employeePositionsList.find((elem) => elem.name === pos);
			console.log("positonObj", positonObj);
			this.$store.dispatch("deleteEmployeePosition", positonObj.id);
		},
		logout() {
			this.$store.dispatch("signOut");
		}
	},
	computed: {
		...mapState(["Auth", "Users", "VTHPP", "Vendors", "Static", "Locale", "Errors"]),
		...mapGetters(["getVendors", "getRegionList", "getVendorDepartments", "getVendorPositions"])
	},
	async mounted() {
		let response = await this.setUserPlatformGET();
		this.$store.dispatch("getVendorList", response);
		this.$store.dispatch("getStates");

		// function to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefVendor.bind({
			url: ""
		});
	},
	on: {}
};
</script>

<style lang="scss" scoped>
.sticky-top {
	height: 95vh;
}
span.icon {
	color: grey;
}
.material-icons {
	font-size: 48px;
	color: grey;
}
.dashboard-icons {
	text-align: center;
	p {
		text-align: center;
	}
}
.about-me-box {
	width: 100%;
	border: 1px solid rgb(182, 181, 181);
	height: 100px;
}
.image-sheet {
	height: 100vh;
}
.setup-sheet {
	height: 100%;
	z-index: 11000;
}
.demo-popup-push {
	z-index: 11001;
}
.credit-card-popup {
	width: 800px;
}
.ach-popup {
	width: 800px;
}
.file-input {
	cursor: pointer;
}
.file-cta {
	width: 100vw;
}
.file-name {
	width: 100vw;
}
.dropzone {
	min-height: 200px;
	padding: 10px 10px;
	position: relative;
	cursor: pointer;
	outline: 2px dashed grey;
	outline-offset: -10px;
	width: 90%;
	background: lightcyan;
	color: dimgray;
	&:hover {
		background: lightblue;
	}
	& .call-to-action {
		font-size: 2rem;
		text-align: center;
		padding-top: 50px;
	}
}

.input-field {
	opacity: 0;
	width: 100%;
	height: 200px;
	position: absolute;
	cursor: pointer;
}
.img-container {
	width: 900px;
	height: 300px;
}
.imageNavButtons {
	.button {
		height: 75px;
		align-content: center;
	}
}

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
