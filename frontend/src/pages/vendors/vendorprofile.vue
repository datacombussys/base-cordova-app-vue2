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
										<f7-col width="50">
											<f7-block-title class="full-width no-margin-bottom">Vendor</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".edit-profile-image"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
											<profile-image-popup-component
												ref="profileImageComponent"
												:profileImageSettings="profileImageSettings"
												:profileData="vendorForm">
											</profile-image-popup-component>
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
									<div v-if="vendorForm.barcode != undefined">
										<f7-row v-if="Object.keys(vendorForm.barcode).length != 0">
											<f7-col class="text-align-center margin-top" v-if="vendorForm.barcode">
												<img :src="vendorForm.barcode.image" style="width:150px;" alt="Please load item" />
												<div>
													{{ vendorForm.barcode.barcode_number }}
												</div>
											</f7-col>
										</f7-row>
									</div>

										
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">
										{{vendorForm.legal_name}}</f7-block-title>
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
									<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
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
										<f7-col width="100">
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
							<f7-row>
								<article v-if="errorHandle" class="message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</article>
							</f7-row>
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
							<b-tabs type="is-boxed" v-model="parentSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Company Tab -->
								<b-tab-item label="Company" v-if="Auth.authLevel <= 3" icon="office-building" class="no-padding">
										<parent-component
										ref="parentComponentRef"
										:toggleEditProfile="toggleEditProfile"
										:parentSettings="parentSettings"
										:moduleInfo="moduleInfo"
										:formData="vendorForm">
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
											<f7-list v-show="!parentSettings.editProfile">
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
												<!-- Vendor Details -->
												<f7-row>
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
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="vendorForm.primary_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.primary_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.primary_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="vendorForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
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
													<f7-block-title class="full-width" medium>About the Vendor</f7-block-title>
													<f7-col>
														<p class="field-title">Notes:</p>
														<div class="about-me-box" v-html="vendorForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->

											<!-- Begin Profile Edit List -->
											<f7-list v-show="parentSettings.editProfile">
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
															class="datacom-input"
															:class="errorHandle? 'item-input-invalid': ''"
														>
														</f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'legal_name'"
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
														<p class="field-title">Vendor DBA:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="vendorForm.dba_name"
															@input="vendorForm.dba_name = $event.target.value"
															class="datacom-input"
															:class="errorHandle? 'item-input-invalid': ''"
														>
														</f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'dba_name'"
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
													:formSettings="primaryContactSettings"
													@updateLocaleInfo="syncWithMixin"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>
												
												<f7-row>
													<f7-block-title class="full-width" medium>About the Vendor</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="vendorDescriptionEditor"
															ref="vendorDescription"
															class="datacom-input"
														/>
													</f7-col>
												</f7-row>
												<!-- END Profile Edit List -->

												<!-- Delete and Update Buttons -->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red" @click="PATCHDeleteProfile">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateVendorPATCH">Update</f7-button>
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
											<f7-list v-show="!parentSettings.editProfile">
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
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="vendorForm.billing_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.billing_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.billing_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="vendorForm.billing_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="vendorForm.billing_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="vendorForm.billing_email"></f7-list-item>
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
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="vendorForm.shipping_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="vendorForm.shipping_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="vendorForm.shipping_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="vendorForm.shipping_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="vendorForm.shipping_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="vendorForm.shipping_email"></f7-list-item>
													</f7-col>
												</f7-row>

											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="vendorForm"
													:formSettings="billingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>

												<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="vendorForm"
													:formSettings="shippingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
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
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
															<f7-col width="25" class="display-flex margin">
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
									<employee-database-component 
										ref="employeeDatabaseRef"
										:moduleInfo="moduleInfo">
									</employee-database-component>
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
											<f7-row class="full-width display-flex align-items-center">
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
															@click="editVendorForm"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="PATCHDeleteProfile"
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
											<f7-row>
												<b-table
													:data="GET_VENDOR_LIST"
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
import { UniversalMixins } from "@/mixins/universal-mixins";
import { LocaleMixin } from "../../mixins/businesses/locale-mixins";

//LayoutComponents
import navBarComponent from "@/components/universal/navbar-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import employeeDatabaseComponent from "../../components/business/employees-database-component.vue";
import reportingChartsComponent from "../../components/business/reporting-component.vue";
import parentComponent from "../../components/business/parent-company-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";
import profileImagePopupComponent from "@/components/universal/profile-image/profile-image-sheet-component.vue";

export default {
	name: "vendorProfile",
	mixins: [UniversalMixins, LocaleMixin],
	components: {
		"nav-bar-component": navBarComponent,
		"profile-card-component": profileCardComponent,
		"employee-database-component": employeeDatabaseComponent,
		"reporting-charts-component": reportingChartsComponent,
		"parent-component": parentComponent,
		"business-contact-form-component": businessContactFormComponent,
		"profile-image-popup-component": profileImagePopupComponent
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
			parentSettings: {
				activeTab: 0,
				editProfile: false,
				hideSaveItem: true,
				accountParent: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
				}
			},
			//Edit Profile IMage
			profileImageSettings: {
				url: 'vendor/',
				module: 'Vendor',
				mutation: 'UPDATE_PROFILE_IMAGE'
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
			hideUpdateItemButtons: false,
			hideCreateItem: false,

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
				company: null,
				created_by: null,
				account_number: 0,
				profile_img: null,
				barcode: null,
				purchasing_terms: null,
				vendor_type: null,
				notes: null,
				logo: null,
				//Arrays
				primary_contacts: [],
				billing_contacts: [],
				technical_contacts: [],
				shipping_contacts: [],
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
			
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.vendorForm ", this.vendorForm);
			console.log("this.parentSettings", this.parentSettings);
			console.log("this.Vendors.vendorList", this.Vendors.vendorList);

		},
		menudropdown(UserID) {
			console.log("menudropdown UserID", UserID);
			// Add User to list
		},
		showEditProfile() {
			this.parentSettings.editProfile = true;
			this.hideUpdateItemButtons = true;
			this.hideCreateItem = true;
			this.parentSettings.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.parentSettings.editProfile = !this.parentSettings.editProfile;
			this.hideUpdateItemButtons = !this.hideUpdateItemButtons;
			this.hideCreateItem = !this.hideCreateItem;
			this.parentSettings.hideSaveItem = true;
		},
		newItemButton() {
			//Show/Hide Edit Fields and buttons
			this.clearFormData();
			this.parentSettings.editProfile = true;
			this.hideCreateItem = !this.hideCreateItem;
			this.hideUpdateItemButtons = false;
			this.parentSettings.hideSaveItem = false;
			this.parentSettings.activeTab = 0;
		},
		clearandResetButton() {
			this.clearFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.parentSettings.editProfile = false;
			this.hideUpdateItemButtons = false;
			this.hideCreateItem = false;
			this.parentSettings.hideSaveItem = true;
			this.parentSettings.activeTab = 0;
			this.activeStep = 0;
			this.$store.commit("RESET_ERRORS");
			this.uploadMessage = "";
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
		},
		//Create Vendor and Edit Current Vendor
		async createVendorandEdit() {
			let createVendorRes = await this.POSTVendor();
			//Populate Fields with Created Instance
			this.editVendorFormById(createVendorRes.id);
			console.log("createVendorandEdit All Done", createVendorRes);
		},

		//Create Vendor and Clear form for entering a new vendor
		async createVendorandNew() {
			await this.POSTVendor();
			//Clear Form and Reset to Starting Editing Position
			console.log("createVendorandNew All Done");
			this.newItemButton();
		},
		//Create Vendor and Clear form for Viewing Data
		async createVendorandClose() {
			let createVendorRes = await this.POSTVendor();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createVendorandClose All Done", createVendorRes);
			if(createVendorRes != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				this.$f7.dialog.alert("You had some errors on your submission").open();
			}
		},
		POSTVendor() {
			return new Promise( async (resolve, reject) => {
				this.$store.commit("RESET_ERRORS");
				try {
					this.$f7.preloader.show();
					//Dispatch creation method and update Fields with latest Object
					console.log("POSTVendor, this.vendorForm", this.vendorForm);
					this.vendorForm.description = this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML;

					//If parentSettings then use that, if Not then use setUserPlatform
					console.group('this.parentSettings.accountParent.company_name', this.parentSettings.accountParent.company_name);
					if(this.parentSettings.accountParent.company_name) {
						let response = await this.$refs.parentComponentRef.determineAccountOwner();
						console.log("response", response);
						var vendorResponse = await this.$store.dispatch("POSTVendor", this.vendorForm);
					} else {
						var newVendorForm = await this.setUserPlatformPOST(this.vendorForm);
						console.log("newVendorForm", newVendorForm);
						var vendorResponse = await this.$store.dispatch("POSTVendor", newVendorForm);
					}
					
					console.log("vendorResponse", vendorResponse);
					this.$f7.preloader.hide();

					return resolve(vendorResponse);
				} catch (error) {
					this.$f7.preloader.hide();
					console.error("Promise Response Error creating Vendor", error);
					return reject(error);
				}
			});	
		},
		refreshVendor() {
			console.log("this.getVendorLit", this.getVendors);
			this.$store.dispatch("GETVendorList");
		},
		// Populate Fields for editing in browser
		async editVendorForm() {
			//I still need to handle the Parent Company Field. I ti snot updating properly
			this.clearFormData();
			this.parentSettings.activeTab = 1;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows != 0", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;

				var getSelectedVendorObj = await this.$store.dispatch("GETVendorSelectedProfile", {id: rowID});
				console.group('getSelectedVendorObj', getSelectedVendorObj);

				for (let key in this.vendorForm) {
					this.vendorForm[key] = this.GET_SELECTED_VENDOR_PROFILE[key];
				}
				this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML = this.vendorForm.description;
			} 
			this.showEditProfile();
		},
		async editVendorFormById(companyID) {
			console.log("editVendor");
			this.clearFormData();
			this.parentSettings.activeTab = 0;
			//2) Get User ID and object and map to fields from database table
			var getSelectedVendorObj = await this.$store.dispatch("GETVendorSelectedProfile", {id: companyID});
			console.group('getSelectedVendorObj', getSelectedVendorObj);

			for (let key in this.vendorForm) {
				this.vendorForm[key] = this.GET_SELECTED_VENDOR_PROFILE[key];
			}
			this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML = this.vendorForm.description;
			this.showEditProfile();
		},
		//Load Vendor On itnitial render
		loadVendorProfile() {
			for (let key in this.vendorForm) {
				this.vendorForm[key] = this.GET_OWN_VENDOR_PROFILE[key];
			}
			this.$refs.vendorDescription.f7TextEditor.contentEl.innerHTML = this.vendorForm.description;
			this.resetViewtoHome();
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
		async PATCHDeleteProfile() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Vendors.vendorList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("PATCHDeleteProfile findIndexID", findIndexID);
				if (this.Vendors.vendorList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Vendors.vendorList.length != 0) {
					let vendorItem = this.Vendors.vendorList[findIndexID];
					console.log("PATCHDeleteProfile != 0 vendorItem", vendorItem);
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
						await this.$store.dispatch("PATCHDeleteProfile", this.vendorForm).then((response) => {
							console.log("response from PATCHDeleteProfile method", response);
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
			this.$store.commit("RESET_ERRORS");
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
			this.vendorForm.primary_contacts = [];
			this.vendorForm.billing_contacts = [];
			this.vendorForm.technical_contacts = [];
			this.vendorForm.shipping_contacts = [];
			//Reset the view
			this.resetViewtoHome();
		},

		//Callback function from Child Component
		syncWithMixin(payload) {
			console.log("Must emit information from child component to parent");
			console.log('syncWithMixin payload', payload);
			return new Promise((resolve, reject) => {
				this.vendorForm.primary_mailing_country = payload.primary_country_name;
				this.vendorForm.primary_mailing_state = payload.primary_state_name;
				this.vendorForm.billing_country = payload.billing_country_name;
				this.vendorForm.billing_state = payload.billing_state_name;
				this.vendorForm.shipping_country = payload.shipping_country_name;
				this.vendorForm.shipping_state = payload.shipping_state_name;
				console.log('this.vendorForm', this.vendorForm);
				console.log('this.localeCities', this.localeCities);

				return resolve(payload.primary_state_name);
			});
		},


		logout() {
			this.$store.dispatch("signOut");
		}
	},
	computed: {
		...mapState(["Auth", "Users", "VTHPP", "Vendors", "Static", "Locale", "Errors"]),
		...mapGetters(["GET_VENDOR_LIST", "GET_VENDOR_LIST_LENGTH", "GET_OWN_VENDOR_PROFILE", "GET_SELECTED_VENDOR_PROFILE"]),
		...mapGetters(["GET_VENDOR_ERRORS_LIST", "GET_VENDOR_ERROR_HANDLE"]),
		errorData() {
			return this.GET_VENDOR_ERRORS_LIST
		},
		errorHandle() {
			return this.GET_VENDOR_ERROR_HANDLE
		}
	},
	async mounted() {

	},
	on: {}
};
</script>

<style lang="scss" scoped>
.sticky-top {
	height: 95vh;
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
