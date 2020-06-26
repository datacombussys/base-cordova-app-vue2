<template>
	<f7-page name="company-profile">
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
											<f7-block-title class="full-width no-margin-bottom">Company</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".company-image"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!companyForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load company profile"
										/>
									</f7-row>
									<f7-row v-if="companyForm.profile_img" class="display-flex justify-content-center">
										<img :src="companyForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<f7-row>
										<f7-col class="text-align-center margin-top" v-if="companyForm.barcode">
											<img :src="companyForm.barcode.image" style="width:150px;" alt="Please load item" />
											<div>
												{{ companyForm.barcode.barcode_number }}
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">{{
										companyForm.legal_name
									}}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component
								:profileForm="companyForm"
								:cardSettings="profileCardSettings"
							></profile-card-component>

							<f7-card v-if="Auth.authLevel <= 2" class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Company</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click="createCompanyandClose" class="bg-color-green trans-btn-left"
												><span>Save Company</span></f7-button
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
								<div v-if="Errors.companyErrorHandle" class="left message is-danger">
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
							<b-tabs type="is-boxed" v-model="parentSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Company Tab -->
								<b-tab-item label="Company" v-if="Auth.authLevel <= 2" icon="office-building" class="no-padding">
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
														<p class="field-title">Company Legal Name:</p>
														<f7-list-item :title="companyForm.legal_name"> </f7-list-item>
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="companyForm.account_number"> </f7-list-item>
														<p class="field-title">Federal EIN:</p>
														<f7-list-item :title="companyForm.tax_id"></f7-list-item>
														<p class="field-title">Industry:</p>
														<f7-list-item :title="companyForm.industry"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Company DBA:</p>
														<f7-list-item :title="companyForm.dba_name"></f7-list-item>
														<p class="field-title">Company ID:</p>
														<f7-list-item :title="companyForm.global_id"></f7-list-item>
														<p class="field-title">Resale ID #:</p>
														<f7-list-item :title="companyForm.resale_id"></f7-list-item>
														<p class="field-title">Products/Services:</p>
														<f7-list-item :title="companyForm.products_sold"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Company Details -->
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Primary Phone:</p>
														<f7-list-item :title="companyForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Fax:</p>
														<f7-list-item :title="companyForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Primary Address:</p>
														<f7-list-item :title="companyForm.mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Primary State:</p>
														<f7-list-item :title="companyForm.mailing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary City:</p>
														<f7-list-item :title="companyForm.mailing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Zip:</p>
														<f7-list-item :title="companyForm.mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary Email:</p>
														<f7-list-item :title="companyForm.primary_email"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-item :title="companyForm.website"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Type of Company</f7-block-title>
													<f7-row class="full-width">
														<f7-col width="15">
															<p class="field-title">Public Corporation:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Private Corporation:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Limited Liability Company:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Partnership:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Sole Proprietor:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Govenment:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Non-Profit:</p>
														</f7-col>
													</f7-row>
													<f7-row class="full-width">
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Public Corporation'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Private Corporation'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Limited Liability Company'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Partnership'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Sole Proprietor'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Govenment'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="companyForm.entity_type === 'Non-Profit'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
													</f7-row>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Domain:</p>
														<f7-list-item :title="companyForm.domain"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-item :title="companyForm.website"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="companyForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Company Legal Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="companyForm.legal_name"
															@input="companyForm.legal_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.companyErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.companyErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.companyErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'legal_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Company DBA:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="companyForm.dba_name"
															@input="companyForm.dba_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.companyErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.companyErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.companyErrorHandle ? 'is-danger' : 'is-success'}`"
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
														<f7-list-item :title="companyForm.account_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Merchant ID:</p>
														<f7-list-input
															validate
															placeholder="#### #### #### ####"
															pattern="[0-9]{1,16}"
															error-message="Format: Numbers only. No special characters."
															:value="companyForm.merchant_id"
															@input="companyForm.merchant_id = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Federal EIN:</p>
														<f7-list-input
															type="text"
															validate
															placeholder="123456789"
															pattern="[0-9]{1,9}"
															error-message="Format: Numbers only. No special characters."
															:value="companyForm.tax_id"
															@input="companyForm.tax_id = $event.target.value"
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
															:value="companyForm.resale_id"
															@input="companyForm.resale_id = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Industry:</p>
														<f7-list-input
															type="select"
															:value="companyForm.industry"
															@input="companyForm.industry = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option v-for="industry in Static.industries" :key="industry.id">{{ industry }}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Products/Services:</p>
														<f7-list-input
															:value="companyForm.products_sold"
															@input="companyForm.products_sold = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<!-- Company Details -->
												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="companyForm"
													:formSettings="primaryContactSettings">
												</business-contact-form-component>
											
												<!-- Type of Company -->
												<f7-row class="align-items-flex-end">
													<f7-block-title class="full-width" medium>Type of Company</f7-block-title>
													<f7-col width="15">
														<p class="field-title">Public Corporation:</p>
														<f7-list-item
															radio
															value="Public Corporation"
															name="company-type"
															:checked="companyForm.entity_type === 'Public Corporation'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Private Corporation:</p>
														<f7-list-item
															radio
															value="Private Corporation"
															name="company-type"
															:checked="companyForm.entity_type === 'Private Corporation'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Limited Liability Company:</p>
														<f7-list-item
															radio
															value="Limited Liability Company"
															name="company-type"
															:checked="companyForm.entity_type === 'Limited Liability Company'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Partnership:</p>
														<f7-list-item
															radio
															value="Partnership"
															name="company-type"
															:checked="companyForm.entity_type === 'Partnership'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Sole Proprietor:</p>
														<f7-list-item
															radio
															value="Sole Proprietor"
															name="company-type"
															:checked="companyForm.entity_type === 'Sole Proprietor'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Govenment:</p>
														<f7-list-item
															radio
															value="Govenment"
															name="company-type"
															:checked="companyForm.entity_type === 'Govenment'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Non-Profit:</p>
														<f7-list-item
															radio
															value="Non-Profit"
															name="company-type"
															:checked="companyForm.entity_type === 'Non-Profit'"
															@change="companyForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Domain:<span style="color: red;"> *</span></p>
														<f7-list-input
															validate
															required
															pattern="[a-z]*"
															error-message="Format:Lowercase Letters"
															placeholder="starbucks"
															:value="companyForm.domain"
															@input="companyForm.domain = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website Address:</p>
														<f7-list-input
															:value="companyForm.website"
															@input="companyForm.website = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="companyDescriptionEditor"
															ref="companyDescription"
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
																<f7-button fill class="bg-color-red" @click="deleteCompany">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateCompanyPATCH">Update</f7-button>
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
											<f7-list v-show="!parentSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Billing Contact:</p>
														<f7-list-item :title="companyForm.billing_first_name + companyForm.billing_last_name">
														</f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="companyForm.billing_address"> </f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="companyForm.billing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Billing Phone:</p>
														<f7-list-item :title="companyForm.billing_phone"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="companyForm.billing_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="companyForm.billing_zip"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Shipping Contact:</p>
														<f7-list-item :title="companyForm.shipping_contact"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="companyForm.shipping_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="companyForm.shipping_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Shipping Phone:</p>
														<f7-list-item :title="companyForm.shipping_phone"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="companyForm.shipping_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="companyForm.shipping_zip"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="parentSettings.editProfile">
												

												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="companyForm"
													:formSettings="billingContactSettings">
												</business-contact-form-component>

												<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="companyForm"
													:formSettings="shippingContactSettings">
												</business-contact-form-component>

												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateCompanyPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="40" class="display-flex justify-content-end margin">
																<f7-button fill popover-open=".new-transaction" class="bg-color-green trans-btn-left"
																	><span>Save Company</span></f7-button
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
												<f7-row class="margin-top">
													<sales-offices-component :moduleInfo="moduleInfo"></sales-offices-component>
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

								<!-- Begin Billing Tab -->
								<b-tab-item label="Billing" icon="receipt" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Billing</f7-block-title>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Billing List-->
											<f7-list>
												<f7-row class="margin-top">
													<f7-block-title class="full-width" medium>Invoices</f7-block-title>
													<billing-component :moduleInfo="moduleInfo"></billing-component>
												</f7-row>
											</f7-list>
											<!-- END Reporting History Display List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Billing Tab -->

								<!-- Begin Shipping Details Tab -->
								<b-tab-item label="Shipping" icon="truck" class="no-padding">
									<shipping-component :dataForm="companyForm" :moduleInfo="moduleInfo"></shipping-component>
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

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshCompany">
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
															@click="editCompanyData"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deleteCompany"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Companies.companyList.length === 0">
												<f7-col v-if="Auth.authLevel <= 2">
													<p class="text-align-center">There are no companies to display.</p>
													<p class="text-align-center">Please create a new company.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red"
																>Add New Company</f7-button
															>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Companies.companyList.length != 0">
												<b-table
													:data="Companies.companyList"
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

								<!-- Begin Account Pricing Tab -->
								<b-tab-item label="Pricing" icon="currency-usd" class="no-padding">
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
															Included modules and functionality: ID Cards, Inventory, Unlimited Employees, permissions,
															Email, ChatRooms.
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
								</b-tab-item>
								<!-- END Account Pricing Tab -->
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

		<!-- Company Image Upload Sheet -->
		<f7-sheet class="company-image image-sheet" :opened="companyImageSheet" @sheet:closed="companyImageSheet = false">
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content class="padding-bottom">
				<section>
					<f7-block v-show="!companyForm.id">
						<f7-block-header>
							You must first select a company to add a profile image
						</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="companyForm.id">
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
													ref="croppieRefCompany"
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
			<!-- END Company Sheet Content -->
		</f7-sheet>
		<!-- END Company Image Upload Sheet -->
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
import creditCardComponent from "../../components/business/creditcard-ach-component.vue";
import shippingComponent from "../../components/business/shipping-component.vue";
import setupSheetComponent from "../../components/business/setup-sheet-component.vue";
import salesOfficesComponent from "../../components/business/salesoffices-database-component.vue";
import warehouseComponent from "../../components/business/warehouses-database-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import employeeDatabaseComponent from "../../components/business/employees-database-component.vue";
import reportingChartsComponent from "../../components/business/reporting-component.vue";
import parentComponent from "../../components/business/parent-company-component.vue";
import billingInvoiceComponent from "../../components/universal/billing-invoice-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "companyProfile",
	mixins: [LocaleMixin, UniversalMixins],
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
		"parent-component": parentComponent,
		"billing-component": billingInvoiceComponent,
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Main Settings
			platformLevel: 3,
			//Component Data
			pageSettings: {
				leftNavDrawer: ".merchant-panel",
				pageTitle: "Merchant Profile"
			},
			profileCardSettings: {
				type: 'business',
				title: "Partner Details"
			},
			moduleInfo: {
				name: "merchant",
				type: "profile",
				level: 3
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
					is_partner: false
				}
			},

			//Popups and Modals
			deptPopupOpened: false,
			payCyclesPopupOpened: false,
			positionPopupOpened: false,
			companyImageSheet: false,
			companyBulkUploadSheet: false,
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
			//Company Form Items
			companyForm: {
				datacom: null,
				partner: null,
				created_by: null,
				account_number: 0,
				merchant_id: null,
				domain: null,
				profile_img: null,
				barcode: null,
				primary_contact_list: [],
				billing_contact_list: [],
				technical_contact_list: [],
				shipping_contact_list: [],
				//Common Company Fields
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
				tax_id: null,
				resale_id: null,
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
		}
	
		
	},
	methods: {
		testingMethod(e) {
			console.log("this.companyForm ", this.companyForm);
			console.log("this.Users.employeeProfile", this.Users.employeeProfile);
			console.log("this.Auth.userCompanyName ", this.Auth.userCompanyName);
			console.log("this.Auth.userCompanyParent ", this.Auth.userCompanyParent);
			console.log("this.Auth.platformInfo ", this.Auth.platformInfo);
			console.log("this.parentSettings.accountParent", this.parentSettings.accountParent);
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
		//Create Company and Edit Current Company
		async createCompanyandEdit() {
			let createCompanyRes = await this.createCompany();
			//Populate Fields with Created Instance
			this.editCompanyData(createCompanyRes.id);
			console.log("createCompanyandEdit All Done", createCompanyRes);
		},

		//Create Company and Clear form for entering a new company
		async createCompanyandNew() {
			await this.createCompany();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCompanyandNew All Done");
			this.newItemButton();
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose() {
			let createCompanyRes = await this.createCompany();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createCompanyandClose All Done", createCompanyRes);
			this.clearFormData();
		},
		async createCompany() {
			this.$store.commit("RESET_ERRORS");
			try {
				this.$f7.preloader.show();
				//Dispatch creation method and update Fields with latest Object
				console.log("createCompany, this.companyForm", this.companyForm);
				this.companyForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;

				//Get Company ID (from each platform) and add to Company Form
				console.log("this.companyForm", this.companyForm);
				var companyOBJ = {};
				if (this.parentSettings.accountParent.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.companyForm["datacom"] = companyOBJ.id;
				} else if (this.parentSettings.accountParent.is_partner) {
					companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.companyForm["partner"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					response.type = "Create Employee";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}

				//Get Details of the creator
				var newCompanyForm = await this.setUserPlatformPOST(this.companyForm);
				console.log("newCompanyForm", newCompanyForm);
				var companyResponse = await this.$store.dispatch("createCompany", newCompanyForm);
				console.log("companyResponse", companyResponse);

				return companyResponse;
			} catch (error) {
				console.error("Promise Response Error creating Company", error);
			}
		},
		refreshCompany() {
			console.log("this.getCompanyLit", this.getCompanies);
			this.$store.dispatch("getCompanyList");
		},
		// Populate Fields for editing in browser
		editCompanyData(companyID) {
			this.clearFormData();
			this.parentSettings.activeTab = 0;
			this.showEditProfile();
			//Get User ID and object and map to fields
			var companyListID = null;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexPos = this.Companies.companyList.findIndex((elem) => {
					return elem.id === rowID;
				});
				console.log("editCompanies findIndexPos", findIndexPos);
				companyListID = findIndexPos;
				console.log("IF companyListID", companyListID);
			} else {
				var findIndexPos = this.Companies.companyList.findIndex((elem) => {
					return elem.id === companyID;
				});
				companyListID = findIndexPos;
				console.log("Then companyListID", companyListID);
			}
			//Is there a list of companies to lookup?
			if (this.Companies.companyList.length === 0) {
				return "There are no items available";
			}

			if (this.Companies.companyList.length != 0) {
				console.log("this.Companies.companyListings", this.Companies.companyList);
				console.log("Then companyListID", companyListID);
				var companyItem = this.Companies.companyList[companyListID];
				console.log("editCompanies companyItem", companyItem);
				for (let key in this.companyForm) {
					this.companyForm[key] = companyItem[key];
				}
				this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML = this.companyForm.description;
				this.$store.dispatch("getCompanyEmployees", companyListID);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateCompanyPATCH() {
			var newCompanyForm = await this.setUserPlatformPOST(this.companyForm);

			newCompanyForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;
			delete newCompanyForm.profile_img;
			console.log("editCompanies companyForm", newCompanyForm);
			this.$store.dispatch("updateCompany", newCompanyForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteCompany() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Companies.companyList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteCompany findIndexID", findIndexID);
				if (this.Companies.companyList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Companies.companyList.length != 0) {
					let companyItem = this.Companies.companyList[findIndexID];
					console.log("deleteCompany != 0 companyItem", companyItem);
					for (let key in this.companyForm) {
						this.companyForm[key] = companyItem[key];
					}
					//Set Variables to make account inactive
					delete this.companyForm.profile_img;
					this.companyForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.companyForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteCompany", this.companyForm).then((response) => {
							console.log("response from deleteCompany method", response);
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
			console.log("clearFormData this.companyForm", this.companyForm);
			for (let key in this.companyForm) {
				console.log("key", this.companyForm[key]);
				if (this.companyForm[key] === true || this.companyForm[key] === false) {
					// console.log('TF key', key);
					this.companyForm[key] = false;
				} else {
					this.companyForm[key] = null;
				}
			}
			//Reset Vendor Variables
			this.companyForm.is_merchant = true;
			this.companyForm.is_active = true;
			this.companyForm.primary_contact_list = [];
			this.companyForm.billing_contact_list = [];
			this.companyForm.technical_contact_list = [];
			this.companyForm.shipping_contact_list = [];
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
			this.companyForm.profile_img = this.cropped;
			var formdata = this.companyForm;
			console.log("this.companyForm", this.companyForm);

			try {
				await axios.put("/django/companies/" + formdata.id + "/", formdata).then((response) => {
					console.log("Company Image PUT response", response);
					this.$store.dispatch("getCompanyList");
					response.type = "Company Profile Image";
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
			this.$refs.croppieRefCompany
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
			this.$refs.croppieRefCompany.result(options, (output) => {
				this.cropped = output;
			});
		},
		// CroppieJS
		cropViaEvent() {
			this.$refs.croppieRefCompany.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			// Rotates the image
			this.$refs.croppieRefCompany.rotate(rotationAngle);
		},
		logout() {
			this.$store.dispatch("signOut");
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
		}
	},
	computed: {
		...mapState(["Auth", "Users", "VTHPP", "Static", "Locale", "Errors"]),
		...mapState(["Datacom", "Partners", "Companies"]),
		...mapGetters(["GET_COMPANY_LIST", "GET_DEPARTMENTS_LIST", "GET_POSITIONS_LIST"])
	},
	async mounted() {
		if (this.Auth.platformInfo.platform === "datacom") {
			this.parentSettings.accountParent.is_datacom = true;
		}
		if (this.Auth.platformInfo.platform === "merchant") {
			this.parentSettings.accountParent.is_partner = true;
		}
		if (this.Auth.platformInfo.platform === "company") {
			this.parentSettings.accountParent.is_merchant = true;
		}
		this.parentSettings.accountParent.company_name = this.Auth.userCompanyName;
		let response = await this.setUserPlatformGET();
		this.$store.dispatch("getCompanyList", response);
		this.$store.dispatch("getPartnerList", response);
		this.$store.dispatch("getStates");

		// function to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefCompany.bind({
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


</style>
