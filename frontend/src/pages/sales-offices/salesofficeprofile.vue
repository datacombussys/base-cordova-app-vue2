<template>
	<f7-page name="sales-offices">
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
											<f7-block-title class="full-width no-margin-bottom">Sales Office</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".salesOffice-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!salesOfficeForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load salesOffice profile"
										/>
									</f7-row>
									<f7-row v-if="salesOfficeForm.profile_img" class="display-flex justify-content-center">
										<img :src="salesOfficeForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<f7-row>
										<f7-col class="text-align-center margin-top">
											<div v-if="salesOfficeForm.barcode != null">
												<img :src="salesOfficeForm.barcode.image" style="width:150px;" alt="Please load item" />
												<div>
													{{ salesOfficeForm.barcode.barcode_number }}
												</div>
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">{{
										salesOfficeForm.legal_name
									}}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component :profileForm="salesOfficeForm" :cardSettings="profileCardSettings"></profile-card-component>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Sales Office</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button
												fill
												@click.prevent="createSalesOfficeandClose"
												:disabled="canSubmitSalesOfficeForm"
												class="bg-color-green trans-btn-left"
												><span>Save Sales Office</span></f7-button
											>
											<f7-button
												fill
												popover-open=".new-salesOffice-button"
												:disabled="canSubmitSalesOfficeForm"
												class="bg-color-green trans-btn-right"
												icon-color="white"
												icon-size="40"
												icon="mdi mdi-menu-down"
											></f7-button>
											<f7-popover class="new-salesOffice-button">
												<f7-list>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createSalesOfficeandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createSalesOfficeandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createSalesOfficeandClose"
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
								<div v-if="Errors.salesOfficeErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</div>
							</f7-row>
							<f7-card>
								<f7-card-content class="padding-half">
									<f7-row class="full-width display-flex justify-content-center">
										<div class="open-arrow">Quotes</div>
										<div class="approved-quote-arrow">Approved</div>
										<div class="invoices-arrow">Invoices</div>
										<div class="past-due-arrow">Past Due</div>
										<div class="paid">Paid</div>
									</f7-row>
								</f7-card-content>
							</f7-card>
							<f7-card>
								<f7-card-content class="padding-top-half">
									<f7-block-title medium class="no-margin-top no-padding-top">Dashboard</f7-block-title>
									<f7-row class="display-flex justify-content-space-around">
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
												<f7-link href="/groups-permissions/" icon-only>
													<f7-icon size="50" icon="mdi mdi-file-document-edit-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>New Quote</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
												<f7-link href="/users-groups/" icon-only>
													<f7-icon size="50" icon="mdi mdi-chart-pie">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Reports</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
												<!-- Do a Billing Popup -->
												<f7-link href="#" sheet-open=".setup-sheet" icon-only>
													<f7-icon size="50" icon="mdi mdi-cogs">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Setup</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
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
								<!-- Begin Parent Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
									<parent-component
										:toggleEditProfile="toggleEditProfile"
										:editProfile="editProfile"
										:hideSaveUser="hideSaveItem"
										:accountParent="salesOfficeParent"
										:moduleInfo="moduleInfo"
									>
									</parent-component>
								</b-tab-item>
								<!-- END Parent Company Tab -->

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
														<p class="field-title">Sales Office Name:</p>
														<f7-list-item :title="salesOfficeForm.salesoffice_name"></f7-list-item>
														<p class="field-title">Sales Office ID:</p>
														<f7-list-item :title="salesOfficeForm.salesoffice_number"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="salesOfficeForm.global_id"></f7-list-item>
														<p class="field-title">Warehouses:</p>
														<f7-list-item></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Sales Office Details -->
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="70">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="salesOfficeForm.primary_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="salesOfficeForm.primary_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary Phone:</p>
														<f7-list-item :title="salesOfficeForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Fax:</p>
														<f7-list-item :title="salesOfficeForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Primary Address:</p>
														<f7-list-item :title="salesOfficeForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Primary State:</p>
														<f7-list-item :title="salesOfficeForm.primary_mailing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary City:</p>
														<f7-list-item :title="salesOfficeForm.mailinprimary_mailing_cityg_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Zip:</p>
														<f7-list-item :title="salesOfficeForm.primary_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary Email:</p>
														<f7-list-item :title="salesOfficeForm.primary_email"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-item :title="salesOfficeForm.website"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="salesOfficeForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Sales Office Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="salesOfficeForm.salesoffice_name"
															@input="salesOfficeForm.salesoffice_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.salesOfficeErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.salesOfficeErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.salesOfficeErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Account ID: (Auto Generated)</p>
														<f7-list-item :title="salesOfficeForm.global_id"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-col width="50">
														<p class="field-title">Sales Office ID: (Auto Generated)</p>
														<f7-list-item :title="salesOfficeForm.salesoffice_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Warehouses:</p>
														<f7-list-item title="Select" smart-select :smart-select-params="{ openIn: 'popover' }">
															<select name="superhero" multiple>
																<option value="Batman" selected>West Coast Sales Office</option>
																<option value="Superman">MidWest Coast Sales Office</option>
																<option value="Superman">East Coast Sales Office</option>
															</select>
														</f7-list-item>
														<div v-if="Errors.salesOfficeErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.salesOfficeErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.salesOfficeErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'dba_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<!-- Sales Office Details -->
												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="salesOfficeForm"
													:formSettings="primaryContactSettings">
												</business-contact-form-component>
								
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="salesOfficeDescriptionEditor"
															ref="salesOfficeDescription"
															style="background: rgb(216,252,253)"
														/>
													</f7-col>
												</f7-row>
												<!-- END Profile Edit List -->

												<!-- Delete and Update Buttons -->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top display-flex justify-content-end">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateSalesOfficePATCH">Update</f7-button>
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
													<f7-block-title class="full-width">Sales Office Contacts</f7-block-title>
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
														<f7-list-item :title="salesOfficeForm.billing_first_name"></f7-list-item>
														<p class="field-title">Phone:</p>
														<f7-list-item :title="salesOfficeForm.billing_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="salesOfficeForm.billing_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="salesOfficeForm.billing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="salesOfficeForm.billing_last_name"></f7-list-item>
														<p class="field-title">Fax:</p>
														<f7-list-item :title="salesOfficeForm.billing_fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="salesOfficeForm.billing_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="salesOfficeForm.billing_zip"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="salesOfficeForm.shipping_first_name"></f7-list-item>
														<p class="field-title">Phone:</p>
														<f7-list-item :title="salesOfficeForm.shipping_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="salesOfficeForm.shipping_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="salesOfficeForm.shipping_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="salesOfficeForm.shipping_last_name"></f7-list-item>
														<p class="field-title">Fax:</p>
														<f7-list-item :title="salesOfficeForm.shipping_fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="salesOfficeForm.shipping_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="salesOfficeForm.shipping_zip"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
													<business-contact-form-component 
														:contactForm="salesOfficeForm"
														:formSettings="billingContactSettings">
													</business-contact-form-component>

													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<business-contact-form-component 
														:contactForm="salesOfficeForm"
														:formSettings="shippingContactSettings">
													</business-contact-form-component>

												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top display-flex justify-content-end">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateSalesOfficePATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="40" class="display-flex justify-content-end margin">
																<f7-button fill popover-open=".new-transaction" class="bg-color-green trans-btn-left"
																	><span>Save Sales Office</span></f7-button
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

								<!-- Begin Purchase Orders Tab -->
								<b-tab-item label="Purchase Orders" icon="buffer" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-block-title class="full-width">Purchase Orders</f7-block-title>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Purchase Orders Display List -->
											<f7-list simple-list>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Purchase Orders</f7-block-title>
												</f7-row>
											</f7-list>
											<!-- END Purchase Orders Display -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Purchase Orders Tab -->

								<!-- Begin Sales Orders Tab -->
								<b-tab-item label="Sales Orders" icon="truck" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-block-title class="full-width">Sales Orders</f7-block-title>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Sales Orders Display List -->
											<f7-list simple-list>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Sales Orders</f7-block-title>
												</f7-row>
											</f7-list>
											<!-- END Sales Orders Display -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Sales Orders Tab -->

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
											<!-- Begin Reporting History List-->
											<f7-list>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Employees</f7-block-title>
												</f7-row>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Customers</f7-block-title>
													<f7-block-title class="full-width" medium>Sales</f7-block-title>
													<f7-block-title class="full-width" medium>Inventory</f7-block-title>
												</f7-row>
											</f7-list>
											<!-- END Reporting History Display List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Reporting History Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshSalesOffice">
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
															@click="editSalesOffice"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deleteSalesOffice"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="SalesOffices.salesOfficeList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no companies to display.</p>
													<p class="text-align-center">Please create a new salesOffice.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red"
																>Add New Sales Office</f7-button
															>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="SalesOffices.salesOfficeList.length != 0">
												<b-table
													:data="SalesOffices.salesOfficeList"
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
															field="id"
															:visible="columnsVisible['id'].display"
															:label="columnsVisible['id'].title"
															width="40"
															centered
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
															field="location"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['primary_mailing_city'].display"
															:label="columnsVisible['primary_mailing_city'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.primary_mailing_city }}
														</b-table-column>

														<b-table-column
															field="salesoffice_name"
															:visible="columnsVisible['salesoffice_name'].display"
															:label="columnsVisible['salesoffice_name'].title"
															:class="{ 'inactive-item': !props.row.is_active }"
															sortable
															searchable
															centered
															numeric
														>
															<template v-if="showDetailIcon">
																{{ props.row.salesoffice_name }}
															</template>
														</b-table-column>

														<b-table-column
															field="is_active"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['is_active'].display"
															:label="columnsVisible['is_active'].title"
															sortable
															searchable
															centered
															width="100"
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
			:opened="salesOfficeBulkUploadSheet"
			@sheet:closed="salesOfficeBulkUploadSheet = false"
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

		<!-- Sales Office Image Upload Sheet -->
		<f7-sheet
			class="salesOffice-image image-sheet"
			:opened="salesOfficeImageSheet"
			@sheet:closed="salesOfficeImageSheet = false"
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
					<f7-block v-show="!salesOfficeForm.id">
						<f7-block-header>
							You must first select a salesOffice to add a profile image
						</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="salesOfficeForm.id">
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
													ref="croppieRefSalesOffice"
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
			<!-- END Sales Office Sheet Content -->
		</f7-sheet>
		<!-- END Sales Office Image Upload Sheet -->

		<!-- Setup Sheet -->
		<f7-sheet class="setup-sheet" :opened="setupSheetOpened" @sheet:closed="setupSheetOpened = false">
			<f7-toolbar>
				<div class="left padding-left">Sales Office Setup</div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
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

						<f7-card class="margin">
							<f7-card-content class="margin-half">
								<f7-list>
									<!-- Begin Employees Display List -->

									<f7-row>
										<f7-block-title class="classy margin-top">Sales Office Details</f7-block-title>
										<b-progress class="full-width" :value="60" show-value format="percent">Progress</b-progress>
										<f7-col width="50">
											<p class="field-title">Create Departments:</p>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline active small popup-open=".departments-popup">Create Now</f7-button>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<p class="field-title">Create Employee Positions:</p>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline active small popup-open=".positions-popup">Create Now</f7-button>
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
								</f7-list>
								<!-- END Employees Display -->
							</f7-card-content>
						</f7-card>
					</div>
				</div>
				<!-- END Vue Scrollbar (dragger) -->
			</f7-page-content>
		</f7-sheet>
		<!-- END Setup Sheet -->
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
import reportingChartsComponent from "../../components/business/reporting-component.vue";
import parentComponent from "../../components/business/parent-company-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "SalesOffices",
	mixins: [
		UniversalMixins, 
		LocaleMixin
		],
	components: {
		"nav-bar-component": navBarComponent,
		"profile-card-component": profileCardComponent,
		"reporting-charts-component": reportingChartsComponent,
		"parent-component": parentComponent,
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Main Settings
			//Component Data
			pageSettings: {
				leftNavDrawer: ".salesoffice-panel",
				pageTitle: "Sales Office Profile"
			},
			profileCardSettings: {
				type: "business",
				title: "Sales Office Details"
			},
			moduleInfo: {
				name: "Sales Office",
				type: "profile",
				level: 5
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
			salesOfficeImageSheet: false,
			salesOfficeBulkUploadSheet: false,
			setupSheetOpened: false,
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
				id: { title: "Id", display: true },
				salesoffice_name: { title: "Name", display: true },
				primary_mailing_city: { title: "Location", display: true },
				profile_img: { title: "Image", display: true },
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
			//Sales Office Form Items
			requiredFieldsDone: 0,
			salesOfficeForm: {
				id: 0,
				company: null,
				partner: null,
				datacom: null,
				primary_contact: null,
				warehouses: [],
				billing_contacts: [],
				employees: [],
				salesoffice_name: null,
				salesoffice_number: null,
				global_id: null,
				date_added: null,
				profile_img: null,
				description: null,
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
				closure_date: null,
				closure_reason: null,
				is_active: null,
				status: null
			},
			salesOfficeParent: {
				company_name: null,
				is_datacom: false,
				is_partner: false,
				is_merchant: false,
				is_vendor: false
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.salesOfficeForm", this.salesOfficeForm);
			console.log("this.SalesOffices.salesOfficeList", this.SalesOffices.salesOfficeList);
			console.log("this.SalesOffices.salesOfficeProfile", this.SalesOffices.salesOfficeProfile);
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
		//Create Sales Office and Edit Current Sales Office
		async createSalesOfficeandEdit() {
			let createSalesOfficeRes = await this.createSalesOffice();
			//Populate Fields with Created Instance
			this.editSalesOffice(createSalesOfficeRes.id);
			console.log("createSalesOfficeandEdit All Done", createSalesOfficeRes);
		},

		//Create Sales Office and Clear form for entering a new salesOffice
		async createSalesOfficeandNew() {
			await this.createSalesOffice();
			//Clear Form and Reset to Starting Editing Position
			console.log("createSalesOfficeandNew All Done");
			this.newItemButton();
		},
		//Create Sales Office and Clear form for Viewing Data
		async createSalesOfficeandClose() {
			let createSalesOfficeRes = await this.createSalesOffice();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createSalesOfficeandClose All Done", createSalesOfficeRes);
			await this.clearFormData();
		},
		async createSalesOffice() {
			this.$store.commit("RESET_ERRORS");
			this.syncWithMixin();
			try {
				this.$f7.preloader.show();
				//Create Unlinked Copy of Form for Manipulation
				console.log("this.salesOfficeForm", this.salesOfficeForm);
				var salesOfficeFormCopy = JSON.parse(JSON.stringify(this.salesOfficeForm));
				console.log("salesOfficeFormCopy", salesOfficeFormCopy);

				//Dispatch creation method and update Fields with latest Object
				console.log("createSalesOffice, this.salesOfficeForm", this.salesOfficeForm);
				salesOfficeFormCopy.description = this.$refs.salesOfficeDescription.f7TextEditor.contentEl.innerHTML;

				// Get Parent Company Info to add the Sales Office
				let newSalesOfficeForm = await this.setUserPlatformPOST(salesOfficeFormCopy);
				console.log("newSalesOfficeForm", newSalesOfficeForm);

				var salesOfficeResponse = await this.$store.dispatch("createSalesOffice", newSalesOfficeForm);
				console.log("salesOfficeResponse", salesOfficeResponse);
				this.$f7.preloader.hide();

				return salesOfficeResponse;
			} catch (error) {
				console.error("Promise Response Error creating Sales Office", error);
			}
		},
		refreshSalesOffice() {
			console.log("getSalesOfficeList");
			this.$store.dispatch("getSalesOfficeList");
		},
		// Populate Fields for editing in browser
		editSalesOffice(salesOfficeID) {
			this.clearFormData();
			this.activeTab = 0;
			this.showEditProfile();
			//Get User ID and object and map to fields
			var salesOfficeListID = null;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexPos = this.SalesOffices.salesOfficeList.findIndex((elem) => {
					return elem.id === rowID;
				});
				console.log("editSalesOffice findIndexPos", findIndexPos);
				salesOfficeListID = findIndexPos;
				console.log("IF salesOfficeListID", salesOfficeListID);
			} else {
				var findIndexPos = this.SalesOffices.salesOfficeList.findIndex((elem) => {
					return elem.id === salesOfficeID;
				});
				salesOfficeListID = findIndexPos;
				console.log("Then salesOfficeListID", salesOfficeListID);
			}
			//Is there a list of SalesOffices to lookup?
			if (this.SalesOffices.salesOfficeList.length === 0) {
				return "There are no items available";
			}

			if (this.SalesOffices.salesOfficeList.length != 0) {
				console.log("this.SalesOffices.salesOfficeListings", this.SalesOffices.salesOfficeList);
				console.log("Then salesOfficeListID", salesOfficeListID);
				var salesOfficeItem = this.SalesOffices.salesOfficeList[salesOfficeListID];
				console.log("editSalesOffice salesOfficeItem", salesOfficeItem);
				for (let key in this.salesOfficeForm) {
					this.salesOfficeForm[key] = salesOfficeItem[key];
				}
				this.$refs.salesOfficeDescription.f7TextEditor.contentEl.innerHTML = this.salesOfficeForm.description;
				this.$store.dispatch("getEmployeeFilter", salesOfficeListID);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		updateSalesOfficePATCH() {
			this.syncWithMixin();
			this.salesOfficeForm.description = this.$refs.salesOfficeDescription.f7TextEditor.contentEl.innerHTML;
			delete this.salesOfficeForm.profile_img;
			console.log("updateSalesOfficePATCH salesOfficeForm", this.salesOfficeForm);
			this.$store.dispatch("updateSalesOffice", this.salesOfficeForm);
			this.resetViewtoHome();
		},
		syncWithMixin() {
			this.salesOfficeForm.primary_mailing_state = this.localeCities.primary_state_name;
			this.salesOfficeForm.shipping_state = this.localeCities.shipping_state_name;
			this.salesOfficeForm.billing_state = this.localeCities.billing_state_name;
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteSalesOffice() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.SalesOffices.salesOfficeList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteSalesOffice findIndexID", findIndexID);
				if (this.SalesOffices.salesOfficeList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.SalesOffices.salesOfficeList.length != 0) {
					let salesOfficeItem = this.SalesOffices.salesOfficeList[findIndexID];
					console.log("deleteSalesOffice != 0 salesOfficeItem", salesOfficeItem);
					for (let key in this.salesOfficeForm) {
						this.salesOfficeForm[key] = salesOfficeItem[key];
					}
					//Set Variables to make account inactive
					delete this.salesOfficeForm.profile_img;
					this.salesOfficeForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.salesOfficeForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteSalesOffice", this.salesOfficeForm).then((response) => {
							console.log("response from deleteSalesOffice method", response);
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
			console.log("clearFormData this.salesOfficeForm", this.salesOfficeForm);
			for (let key in this.salesOfficeForm) {
				console.log("key", this.salesOfficeForm[key]);
				if (this.salesOfficeForm[key] === true || this.salesOfficeForm[key] === false) {
					// console.log('TF key', key);
					this.salesOfficeForm[key] = false;
				} else {
					this.salesOfficeForm[key] = null;
				}
			}
			//Reset Sales Office Variables
			this.salesOfficeForm.is_active = true;
			this.salesOfficeForm.billing_contacts = [];
			this.salesOfficeForm.employees = [];
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
			this.salesOfficeForm.profile_img = this.cropped;
			var formdata = this.salesOfficeForm;
			console.log("this.salesOfficeForm", this.salesOfficeForm);
			try {
				await axios.put("/django/companies/" + formdata.id + "/", formdata).then((response) => {
					console.log("Sales Office Image PUT response", response);
					this.$store.dispatch("getSalesOfficeList");
					response.type = "Sales Office Profile Image";
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
		// Croppie JS Image Cropper
		bind() {
			var $$ = this.Dom7;
			// Bind image to Cropper
			console.log("this.fileURL from bind()", this.fileURL);
			this.$refs.croppieRefSalesOffice
				.bind({
					url: this.fileURL
				})
				.then(() => {
					$$(".cr-slider").attr({ min: 0.15, max: 3 });
				});
		},

		// Croppie JS CALLBACK USAGE
		crop() {
			// Here we are getting the result via callback function
			// and set the result to this.cropped which is being
			// used to display the result above.
			let options = {
				format: "png",
				circle: true
			};
			this.$refs.croppieRefSalesOffice.result(options, (output) => {
				this.cropped = output;
			});
		},
		// Croppie JS EVENT USAGE
		cropViaEvent() {
			this.$refs.croppieRefSalesOffice.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			this.$refs.croppieRefSalesOffice.rotate(rotationAngle);
		},
		//END Croppie JS

		logout() {
			this.$store.dispatch("signOut");
		},
		resetCompanyToggles(name) {
			this.merchantParent.is_datacom = name === "datacom";
			this.merchantParent.is_partner = name === "partner";
			this.merchantParent.is_merchant = name === "merchant";
			this.merchantParent.is_vendor = name === "vendor";
		},
		companyTypeToggle(e) {
			console.log("Toggle e", e);
			if (e.target.name === "datacom") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.merchantParent.is_datacom = false;
				}
			}
			if (e.target.name === "partner") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.merchantParent.is_partner = false;
				}
			}
			if (e.target.name === "merchant") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.merchantParent.is_merchant = false;
				}
			}
			if (e.target.name === "vendor") {
				if (e.target.checked) {
					this.resetCompanyToggles(e.target.name);
				} else {
					this.merchantParent.is_vendor = false;
				}
			}
		}
	},
	computed: {
		...mapState(["Auth", "Users", "SalesOffices", "Locale", "Errors", "Warehouses"]),
		...mapState(["Datacom", "Partners", "Companies"]),
		...mapGetters(["getRegionList"]),

		canSubmitSalesOfficeForm() {
			if (this.Auth.isAuthenticated) {
				return false;
			}
			return true;
		}
	},
	async mounted() {
		let response = await this.setUserPlatformGET();
		console.log("Sales Office Mounted setUserPlatformGET response", response);
		this.$store.dispatch("getStates");
		this.$store.dispatch("getSalesOfficeList", response);

		// function to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefSalesOffice.bind({
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
.open-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	background: rgba(2, 90, 114, 0.6);
	clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
}
.approved-quote-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(4, 143, 69, 0.3);
	clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.invoices-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(4, 81, 95, 0.3);
	clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.past-due-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(117, 6, 6, 0.3);
	clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 50%);
}
.paid {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding-top: 20px;
	padding-bottom: 20px;
	margin-left: 5px;
	background: rgba(0, 0, 0, 0.3);
}
.cancelled {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding-top: 20px;
	padding-bottom: 20px;
	margin-left: 5px;
	background: rgba(65, 65, 65, 0.3);
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
