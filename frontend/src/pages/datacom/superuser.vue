<template>
	<f7-page name="datacom-superuser">
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
										<f7-col width="50">
											<f7-block-title class="full-width no-margin-bottom">Company</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".edit-profile-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
											<profile-image-popup-component
												ref="profileImageComponent"
												:profileImageSettings="profileImageSettings"
												:profileData="datacomForm">
											</profile-image-popup-component>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!datacomForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load company profile"
										/>
									</f7-row>
									<f7-row v-if="datacomForm.profile_img" class="display-flex justify-content-center">
										<img :src="datacomForm.profile_img" style="width:170px;height:170px;" alt />
									</f7-row>
									<div v-if="datacomForm.barcode != undefined">
										<f7-row v-if="Object.keys(datacomForm.barcode).length != 0">
											<f7-col class="text-align-center margin-top">
												<img :src="datacomForm.barcode.image" style="width:150px;" alt="Please load item" />
												<div>{{ datacomForm.barcode.barcode_number }}</div>
											</f7-col>
										</f7-row>
									</div>
										
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">
										{{datacomForm.legal_name}}
									</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component :profileForm="datacomForm" :cardSettings="profileCardSettings"></profile-card-component>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Company</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button
												fill
												@click.prevent="createCompanyandClose"
												class="bg-color-green trans-btn-left"
											>
												<span>Save Company</span>
											</f7-button>
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
														@click.prevent="createCompanyandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createCompanyandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createCompanyandClose"
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
												<f7-link href="#" sheet-open=".setup-sheet" icon-only>
													<f7-icon size="50" icon="mdi mdi-cogs">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Setup / Admin</p>
												<setup-sheet-component :moduleInfo="moduleInfo"></setup-sheet-component>
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
														<p class="field-title">Company Legal Name:</p>
														<f7-list-item :title="datacomForm.legal_name"></f7-list-item>
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="datacomForm.account_number"></f7-list-item>
														<p class="field-title">Federal EIN:</p>
														<f7-list-item :title="datacomForm.tax_id"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Company DBA:</p>
														<f7-list-item :title="datacomForm.dba_name"></f7-list-item>
														<p class="field-title">Company ID:</p>
														<f7-list-item :title="datacomForm.global_id"></f7-list-item>
														<p class="field-title">Resale ID #:</p>
														<f7-list-item :title="datacomForm.resale_id"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Company Details -->
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="datacomForm.primary_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="datacomForm.primary_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="datacomForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="datacomForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="datacomForm.primary_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="datacomForm.primary_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="datacomForm.primary_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="datacomForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="datacomForm.primary_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="datacomForm.primary_email"></f7-list-item>
													</f7-col>
													
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Domain</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Domain Name:</p>
														<f7-list-item :title="datacomForm.domain"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-item :title="datacomForm.website"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="datacomForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">
															Company Legal Name:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="datacomForm.legal_name"
															@input="datacomForm.legal_name = $event.target.value"
															style="background: rgb(216,252,253)"
														></f7-list-input>

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
														<p class="field-title">
															Company DBA:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="datacomForm.dba_name"
															@input="datacomForm.dba_name = $event.target.value"
															style="background: rgb(216,252,253)"
														></f7-list-input>
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
														<f7-list-item :title="datacomForm.account_number"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Company ID:</p>
														<f7-list-item :title="datacomForm.global_id"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Federal EIN:</p>
														<f7-list-input
															type="text"
															placeholder="123456789"
															pattern="[0-9]{1,9}"
															error-message="Format: Numbers only. No special characters."
															:value="datacomForm.tax_id"
															@input="datacomForm.tax_id = $event.target.value"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Resale ID #:</p>
														<f7-list-input
															validate
															placeholder="1234567"
															pattern="[0-9]*"
															error-message="Format: Numbers only. No special characters."
															:value="datacomForm.resale_id"
															@input="datacomForm.resale_id = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<!-- Company Details -->

												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="datacomForm"
													:formSettings="primaryContactSettings"
													@updateLocaleInfo="syncWithMixin"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>
												
												<f7-row>
													<f7-block-title class="full-width" medium>Domain</f7-block-title>
													<f7-col width="50">
														<p class="field-title">
															Domain Name:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															validate
															required
															pattern="[a-z]*"
															error-message="Format:Lowercase Letters"
															placeholder="starbucks"
															:value="datacomForm.domain"
															@input="datacomForm.domain = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'domain'"
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
														<p class="field-title">Website Address:</p>
														<f7-list-input
															:value="datacomForm.website"
															@input="datacomForm.website = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="datacomDescriptionEditor"
															ref="datacomDescription"
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
																<f7-button fill class="bg-color-blue" @click="updateDatacomPATCH">Update</f7-button>
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
													<f7-block-title class="full-width">Company Contacts</f7-block-title>
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
														<f7-list-item :title="datacomForm.billing_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="datacomForm.billing_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="datacomForm.billing_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="datacomForm.billing_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="datacomForm.billing_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="datacomForm.billing_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="datacomForm.billing_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="datacomForm.billing_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="datacomForm.billing_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="datacomForm.billing_email"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="datacomForm.shipping_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="datacomForm.shipping_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="datacomForm.shipping_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="datacomForm.shipping_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="30">
														<p class="field-title">Country:</p>
														<f7-list-item :title="datacomForm.shipping_mailing_country"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="datacomForm.shipping_mailing_state"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">City:</p>
														<f7-list-item :title="datacomForm.shipping_mailing_city"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="datacomForm.shipping_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="datacomForm.shipping_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="datacomForm.shipping_email"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="datacomForm"
													:formSettings="billingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>

												<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="datacomForm"
													:formSettings="shippingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>
											
												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top display-flex justify-content-end">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateDatacomPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="40" class="display-flex justify-content-end margin">
																<f7-button
																	fill
																	popover-open=".new-transaction"
																	class="bg-color-green trans-btn-left"
																>
																	<span>Save Company</span>
																</f7-button>
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

								<!-- Begin Locations Tab -->
								<b-tab-item label="Locations" icon="map-marker-radius-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-block-title class="full-width">Sales Offices and Warehouses</f7-block-title>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Locations Display List -->
											<f7-list simple-list>
												<f7-row class="margin-top no-margin">
													<sales-offices-component>
													</sales-offices-component>
												</f7-row>
												<f7-row class="margin-top">
													<warehouse-component :moduleInfo="moduleInfo"></warehouse-component>
												</f7-row>
											</f7-list>
											<!-- END Locations Display -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Locations Tab -->

								<!-- Begin Shipping Details Tab -->
								<b-tab-item label="Shipping" icon="truck" class="no-padding">
									<shipping-component :dataForm="datacomForm" :moduleInfo="moduleInfo"></shipping-component>
								</b-tab-item>
								<!-- END Shipping Details Tab -->

								<!-- Begin Payment Tab -->
								<b-tab-item label="Payment" icon="credit-card" class="no-padding">
									<credit-card-component :moduleInfo="moduleInfo"></credit-card-component>
								</b-tab-item>
								<!-- END Payment Tab -->

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

								<!-- Begin Employees Tab -->
								<b-tab-item label="Employees" icon="account-group" class="no-padding">
									<employee-database-component 
										ref="employeeDatabaseRef"
										:moduleInfo="moduleInfo">
									</employee-database-component>
								</b-tab-item>
								<!-- END Employees Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshDatacom">
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
														<f7-list-item link="#" @click="editDatacom" popover-close title="Edit Item"></f7-list-item>
														<f7-list-item link="#" @click="deleteDatacom" popover-close title="Delete Item"></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="GET_DATACOM_LIST.length === 0">
												<f7-col>
													<p class="text-align-center">There are no companies to display.</p>
													<p class="text-align-center">Please create a new company.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red">Add New Company</f7-button>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="GET_DATACOM_LIST.length != 0">
												<b-table
													:data="GET_DATACOM_LIST"
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
																<img
																	:src="props.row.profile_img"
																	:class="{ 'inactive-item': !props.row.is_active }"
																/>
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
															<template v-if="showDetailIcon">{{ props.row.id }}</template>
														</b-table-column>

														<b-table-column
															field="date"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['date_added'].display"
															:label="columnsVisible['date_added'].title"
															sortable
															searchable
															centered
														>{{ props.row.date_added | moment("M/D/Y") }}</b-table-column>

														<b-table-column
															field="dba_name"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['dba_name'].display"
															:label="columnsVisible['dba_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">{{ props.row.dba_name }}</template>
															<template v-else>
																<a @click="toggle(props.row)">{{ props.row.dba_name }}</a>
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
														>
															<b-tag
																size="is-medium"
																:type="`${props.row.is_active ? 'is-success' : 'is-danger'}`"
															>
																{{
																props.row.is_active ? "Active" : "Inactive"
																}}
															</b-tag>
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
			:opened="companyBulkUploadSheet"
			@sheet:closed="companyBulkUploadSheet = false"
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

//LayoutComponents
import navBarComponent from "@/components/universal/navbar-component.vue";
import creditCardComponent from "../../components/business/creditcard-ach-component.vue";
import shippingComponent from "../../components/business/shipping-component.vue";
import setupSheetComponent from "../../components/business/new-docs/setup/setup-sheet-component.vue";
import salesOfficesComponent from "../../components/business/salesoffices-database-component.vue";
import warehouseComponent from "../../components/business/warehouses-database-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import employeeDatabaseComponent from "../../components/business/employees-database-component.vue";
import reportingChartsComponent from "../../components/business/reporting-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";
import profileImagePopupComponent from "@/components/universal/profile-image/profile-image-sheet-component.vue";

export default {
	name: "datacomSuperUser",
	mixins: [
		LocaleMixins,
		UniversalMixins
		],
	components: {
		"nav-bar-component": navBarComponent,
		"shipping-component": shippingComponent,
		"credit-card-component": creditCardComponent,
		"setup-sheet-component": setupSheetComponent,
		"sales-offices-component": salesOfficesComponent,
		"warehouse-component": warehouseComponent,
		"profile-card-component": profileCardComponent,
		"employee-database-component": employeeDatabaseComponent,
		"reporting-charts-component": reportingChartsComponent,
		"business-contact-form-component": businessContactFormComponent,
		"profile-image-popup-component": profileImagePopupComponent
	},
	data() {
		return {
			//Main Seettings
			platformLevel: 1,
			//Component Variables
			pageSettings: {
				leftNavDrawer: ".datacom-panel",
				pageTitle: "Datacom"
			},
			profileCardSettings: {
				type: "business",
				title: "Profile Details"
			},
			moduleInfo: {
				name: "Datacom",
				type: "profile",
				level: 1
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
			//Edit Profile Image
			profileImageSettings: {
				url: 'datacom/',
				module: 'Datacom',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},

			//Popups and Modals
			payCyclesPopupOpened: false,
			companyImageSheet: false,
			companyBulkUploadSheet: false,
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
				dba_name: { title: "DBA Name", display: true },
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
			//Company Form Items
			datacomForm: {
				//datacom Specific
				account_number: 0,
				domain: null,
				profile_img: null,
				barcode: null,
				logo: null,
				//Arrays
				primary_contacts: [],
				billing_contacts: [],
				technical_contacts: [],
				shipping_contacts: [],
				//Common Company Fields
				id: null,
				dba_name: null,
				legal_name: null,
				description: null,
				website: null,
				description: null,
				date_added: null,
				global_id: null,
				primary_mailing_address: null,
				primary_mailing_city: null,
				primary_mailing_state: null,
				primary_mailing_zip: null,
				primary_mailing_country: null,
				primary_first_name: null,
				primary_last_name: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,
				shipping_address: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				shipping_country: null,
				shipping_first_name: null,
				shipping_last_name: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,
				billing_address: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				billing_country: null,
				billing_first_name: null,
				billing_last_name: null,
				billing_phone: null,
				billing_fax: null,
				billing_email: null,
				tax_id: null,
				resale_id: null,
				is_active: null,
				is_datacom: true,
				is_partner: false,
				is_merchant: false,
				is_vendor: false,
				//Unused Variables
				corp_address: null,
				corp_city: null,
				corp_state: null,
				corp_zip: null,
				corp_country: null,
				main_phone: null,
				main_fax: null,
				main_email: null,
				status: null,
				board_date: null,
				acct_closure_date: null,
				closure_reason: null
			},
			is_company_loaded: false,
			isPrimaryCreditCard: false,
			creditCardCalcForm: {
				billing_state: null
			},
			//Contact Lists
			technicalContactList: [],
			primaryContactList: [],
			billingContactList: [],
			additionalContactList: []
		};
	},
	methods: {
		async testingMethod(e) {
			console.log("this.Auth.userProfile", this.Auth.userProfile);
			console.log("this.datacomForm", this.datacomForm);
			console.log("this.Users.employeeList", this.Users.employeeList);
			console.log("this.Users.employeeProfile", this.Users.employeeProfile);
			console.log("this.Users.selectedEmployeeList", this.Users.selectedEmployeeList);


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
		//Create Company and Edit Current Company
		async createCompanyandEdit() {
			this.$store.commit("RESET_ERRORS");
			let createCompanyRes = await this.createCompany();
			//Populate Fields with Created Instance
			this.editDatacomById(createCompanyRes.id);
			console.log("createCompanyandEdit All Done", createCompanyRes);
		},

		//Create Company and Clear form for entering a new company
		async createCompanyandNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createCompany();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCompanyandNew All Done");
			this.newItemButton();
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose() {
			this.$store.commit("RESET_ERRORS");
			let createCompanyRes = await this.createCompany();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createCompanyandClose All Done", createCompanyRes);
			if(createCompanyRes != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				this.$f7.dialog.alert("You had some errors on your submission").open();
			}
		},
		createCompany() {
			return new Promise( async (resolve, reject) => {
				try {
					this.$f7.preloader.show();

					console.log("createDatacom, this.datacomForm", this.datacomForm);
					var newDatacomForm = JSON.parse(JSON.stringify(this.datacomForm));
					console.log("newDatacomForm", newDatacomForm);

					newDatacomForm.description = this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML;

					var companyResponse = await this.$store.dispatch("POSTDatacom", newDatacomForm);
					console.log("companyResponse", companyResponse);

					this.$f7.preloader.hide();

					return resolve(companyResponse);
				} catch (error) {
					console.error("Promise Response Error creating Company", error);
					return reject(error);
				}
			});
			
		},
		refreshDatacom() {
			console.log("GETDatacomList");
			this.$store.dispatch("GETDatacomList");
		},
		//Clear Form Data
		clearFormData() {
			console.log("clearFormData this.datacomForm", this.datacomForm);
			for (let key in this.datacomForm) {
				console.log("key", this.datacomForm[key]);
				if (this.datacomForm[key] === true || this.datacomForm[key] === false) {
					// console.log('TF key', key);
					this.datacomForm[key] = false;
				} else {
					this.datacomForm[key] = null;
				}
			}
			//Reset Datacom Variables
			this.datacomForm.is_datacom = true;
			this.datacomForm.is_active = true;
			this.datacomForm.primary_contacts= [];
			this.datacomForm.	billing_contacts= [];
			this.datacomForm.technical_contacts= [];
			this.datacomForm.shipping_contacts= [];
			//Reset the view
			this.resetViewtoHome();
		},
		// Populate Fields for editing in browser
		async editDatacom() {
			this.clearFormData();
			this.activeTab = 1;
			if (this.checkedRows.length != 0) {
				this.$refs.employeeDatabaseRef.clearData();
				console.log("this.checkedRows != 0", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;

				var getSelectedDatacomObj = await this.$store.dispatch("GETDatacomSelectedProfile", {id: rowID});
				console.group('getSelectedDatacomObj', getSelectedDatacomObj);

				for (let key in this.datacomForm) {
					this.datacomForm[key] = this.GET_SELECTED_DATACOM_PROFILE[key];
				}
				this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.datacomForm.description;
				//get employee List for specified company
				let response = await this.getObjectQueryFilter(getSelectedDatacomObj);
				console.log('editDatacom response', response);
				this.$store.dispatch("GETEmployeeFilterList", {id: response.id, filterURL: response.filterURL});
				console.log('this.$refs', this.$refs);
				this.$refs.employeeDatabaseRef.mountSelectedEmployeeList();
			} 
			this.showEditProfile();
		},
		async editDatacomById(companyID) {
			console.log("editDatacom");
			this.clearFormData();
			this.activeTab = 0;
			//2) Get User ID and object and map to fields from database table
			var getSelectedDatacomObj = await this.$store.dispatch("GETDatacomSelectedProfile", {id: companyID});
			console.group('getSelectedDatacomObj', getSelectedDatacomObj);

			for (let key in this.datacomForm) {
				this.datacomForm[key] = this.GET_SELECTED_DATACOM_PROFILE[key];
			}
			this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.datacomForm.description;
			this.showEditProfile();
		},
		//Load Datacom On itnitial render
		async loadDatacomProfile() {
			for (let key in this.datacomForm) {
				this.datacomForm[key] = this.GET_DATACOM_PROFILE[key];
			}
			this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.datacomForm.description;

			let response = await this.getObjectQueryFilter(this.GET_DATACOM_PROFILE);
			console.log('editDatacom response', response);
			this.$store.dispatch("GETEmployeeFilterList", {id: response.id, filterURL: response.filterURL});
			console.log('this.$refs', this.$refs);
			this.$refs.employeeDatabaseRef.mountSelectedEmployeeList();
			this.resetViewtoHome();
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateDatacomPATCH() {
			this.syncWithMixin();
			let newDatacomForm = await this.setUserPlatformPOST();
			newDatacomForm.description = this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML;
			delete newDatacomForm.profile_img;
			console.log("updateCompanyPATCH newDatacomForm", newDatacomForm);
			this.$store.dispatch("PATCHDatacomProfile", newDatacomForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteDatacom() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.GET_DATACOM_LIST.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteDatacom findIndexID", findIndexID);
				if (this.GET_DATACOM_LIST.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.GET_DATACOM_LIST.length != 0) {
					let companyItem = this.GET_DATACOM_LIST[findIndexID];
					console.log("deleteDatacom != 0 companyItem", companyItem);
					for (let key in this.datacomForm) {
						this.datacomForm[key] = companyItem[key];
					}
					//Set Variables to make account inactive
					delete this.datacomForm.profile_img;
					this.datacomForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.datacomForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteDatacom", this.datacomForm).then((response) => {
							console.log("response from deleteDatacom method", response);
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
		//Callback function from Child Component
		syncWithMixin(payload) {
			console.log("Must emit informaiotn from child component to parent");
			console.log('syncWithMixin payload', payload);
			return new Promise((resolve, reject) => {
				this.datacomForm.primary_mailing_country = payload.primary_country_name;
				this.datacomForm.primary_mailing_state = payload.primary_state_name;
				this.datacomForm.billing_country = payload.billing_country_name;
				this.datacomForm.billing_state = payload.billing_state_name;
				this.datacomForm.shipping_country = payload.shipping_country_name;
				this.datacomForm.shipping_state = payload.shipping_state_name;
				console.log('this.datacomForm', this.datacomForm);
				console.log('this.localeCities', this.localeCities);

				return resolve(payload.primary_state_name);
			});
		},
		deleteChip() {
			console.log("deleting Chip");
		},

	},
	computed: {
		...mapState(["Auth", "Common", "VTHPP", "Static", "Locale", "Errors", "Warehouses", "SalesOffices"]),
		...mapState(["Users", "Merchants", "Datacom", "Partners", "Vendors", "Inventory"]),
		...mapGetters(["GET_DATACOM_LIST", "GET_DATACOM_PROFILE", "GET_SELECTED_DATACOM_PROFILE", "GET_MERCHANT_LIST"]),
		...mapGetters(["GET_DATACOM_ERRORS_LIST", "GET_DATACOM_ERROR_HANDLE"]),
		errorData() {
			return this.GET_DATACOM_ERRORS_LIST
		},
		errorHandle() {
			return this.GET_DATACOM_ERROR_HANDLE
		}
	},
	async mounted() {
		this.loadDatacomProfile();

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
.ach-popup {
	width: 750px;
	left: 45%;
}
.shipping-popup {
	width: 750px;
	left: 45%;
}
.demo-popup-push {
	z-index: 11001;
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

.contact-types-header {
	font-size: 1.5em;
}
</style>
