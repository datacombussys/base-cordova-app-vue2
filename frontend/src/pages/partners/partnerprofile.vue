<template>
	<f7-page name="partner-profile">
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
											<f7-block-title class="full-width no-margin-bottom">Partner</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".partner-image"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!partnerForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load partner profile"
										/>
									</f7-row>
									<f7-row v-if="partnerForm.profile_img" class="display-flex justify-content-center">
										<img :src="partnerForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<div v-if="partnerForm.barcode != undefined">
										<f7-row v-if="Object.keys(partnerForm.barcode).length != 0">
											<f7-col class="text-align-center margin-top">
												<img :src="partnerForm.barcode.image" style="width:75px;" alt="Please Load User" />
												<div>
													{{ partnerForm.barcode.barcode_number }}
												</div>
											</f7-col>
										</f7-row>
									</div>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">{{
										partnerForm.legal_name
									}}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component
								:profileForm="partnerForm"
								:cardSettings="profileCardSettings"
							></profile-card-component>

							<f7-card v-if="Auth.authLevel <= 1" class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Partner</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click="createPartnerandClose" class="bg-color-green trans-btn-left"
												><span>Save Partner</span></f7-button
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
														@click.prevent="createPartnerandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createPartnerandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createPartnerandClose"
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
								<div v-if="Errors.partnerErrorHandle" class="left message is-danger">
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
													<f7-icon size="50" icon="mdi mdi-cash-usd">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Commissions</p>
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
								<b-tab-item label="Company" v-if="Auth.authLevel === 1" icon="office-building" class="no-padding">
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
														<p class="field-title">Legal Name:</p>
														<f7-list-item :title="partnerForm.legal_name"> </f7-list-item>
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="partnerForm.account_number"> </f7-list-item>
														<p class="field-title">Federal EIN:</p>
														<f7-list-item :title="partnerForm.tax_id"></f7-list-item>
														<p class="field-title">Industry:</p>
														<f7-list-item :title="partnerForm.industry"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">DBA Name:</p>
														<f7-list-item :title="partnerForm.dba_name"></f7-list-item>
														<p class="field-title">Partner ID:</p>
														<f7-list-item :title="partnerForm.global_id"></f7-list-item>
														<p class="field-title">Resale ID #:</p>
														<f7-list-item :title="partnerForm.resale_id"></f7-list-item>
														<p class="field-title">Products/Services:</p>
														<f7-list-item :title="partnerForm.products_sold"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Partner Details -->
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="partnerForm.primary_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last name:</p>
														<f7-list-item :title="partnerForm.primary_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="partnerForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="partnerForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Address:</p>
														<f7-list-item :title="partnerForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="partnerForm.primary_mailing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-item :title="partnerForm.primary_mailing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="partnerForm.primary_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Email:</p>
														<f7-list-item :title="partnerForm.primary_email"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website:</p>
														<f7-list-item :title="partnerForm.website"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Type of Partner</f7-block-title>
													<f7-row class="full-width">
														<f7-col width="15">
															<p class="field-title">Public Corporation:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Private Corporation:</p>
														</f7-col>
														<f7-col width="15">
															<p class="field-title">Limited Liability Partner:</p>
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
																:checked="partnerForm.entity_type === 'Public Corporation'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Private Corporation'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Limited Liability Partner'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Partnership'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Sole Proprietor'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Govenment'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
														<f7-col width="15">
															<f7-list-item
																radio
																disabled
																:checked="partnerForm.entity_type === 'Non-Profit'"
																name="show-entity-type"
															></f7-list-item>
														</f7-col>
													</f7-row>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Domain</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Domain Name:</p>
														<f7-list-item :title="partnerForm.domain"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="partnerForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->

											<!-- Begin Profile Edit List -->
											<f7-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Partner Legal Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="partnerForm.legal_name"
															@input="partnerForm.legal_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.partnerErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.partnerErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.partnerErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'legal_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Partner DBA:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="partnerForm.dba_name"
															@input="partnerForm.dba_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.partnerErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.partnerErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.partnerErrorHandle ? 'is-danger' : 'is-success'}`"
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
														<f7-list-item :title="partnerForm.account_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Merchant ID:</p>
														<f7-list-input
															validate
															placeholder="#### #### #### ####"
															pattern="[0-9]{1,16}"
															error-message="Format: Numbers only. No special characters."
															:value="partnerForm.merchant_id"
															@input="partnerForm.merchant_id = $event.target.value"
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
															:value="partnerForm.tax_id"
															@input="partnerForm.tax_id = $event.target.value"
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
															:value="partnerForm.resale_id"
															@input="partnerForm.resale_id = $event.target.value"
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
															:value="partnerForm.industry"
															@input="partnerForm.industry = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option v-for="industry in Static.industries" :key="industry.id">{{ industry }}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Products/Services:</p>
														<f7-list-input
															:value="partnerForm.products_sold"
															@input="partnerForm.products_sold = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<!-- Partner Details -->
												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="partnerForm"
													:formSettings="primaryContactSettings"
													@updateLocaleInfo="syncWithMixin">
												</business-contact-form-component>
											
												<!-- Type of Partner -->
												<f7-row class="align-items-flex-end">
													<f7-block-title class="full-width" medium>Type of Partner</f7-block-title>
													<f7-col width="15">
														<p class="field-title">Public Corporation:</p>
														<f7-list-item
															radio
															value="Public Corporation"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Public Corporation'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Private Corporation:</p>
														<f7-list-item
															radio
															value="Private Corporation"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Private Corporation'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Limited Liability Partner:</p>
														<f7-list-item
															radio
															value="Limited Liability Partner"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Limited Liability Partner'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Partnership:</p>
														<f7-list-item
															radio
															value="Partnership"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Partnership'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Sole Proprietor:</p>
														<f7-list-item
															radio
															value="Sole Proprietor"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Sole Proprietor'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Govenment:</p>
														<f7-list-item
															radio
															value="Govenment"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Govenment'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
													<f7-col width="15">
														<p class="field-title">Non-Profit:</p>
														<f7-list-item
															radio
															value="Non-Profit"
															name="partner-type"
															:checked="partnerForm.entity_type === 'Non-Profit'"
															@change="partnerForm.entity_type = $event.target.value"
														></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Domain</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Domain Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															validate
															required
															pattern="[a-z]*"
															error-message="Format:Lowercase Letters"
															placeholder="starbucks"
															:value="partnerForm.domain"
															@input="partnerForm.domain = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Website:</p>
														<f7-list-input
															:value="partnerForm.website"
															@input="partnerForm.website = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														></f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="partnerDescriptionEditor"
															ref="partnerDescription"
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
																<f7-button fill class="bg-color-red" @click="deletePartner">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updatePartnerPATCH">Update</f7-button>
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
													<f7-block-title class="full-width">Partner Contacts</f7-block-title>
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
														<f7-list-item :title="partnerForm.billing_first_name"></f7-list-item>
														<p class="field-title">Phone:</p>
														<f7-list-item :title="partnerForm.billing_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="partnerForm.billing_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="partnerForm.billing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="partnerForm.billing_last_name"></f7-list-item>
														<p class="field-title">Fax:</p>
														<f7-list-item :title="partnerForm.billing_fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="partnerForm.billing_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="partnerForm.billing_zip"></f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="partnerForm.shipping_first_name"></f7-list-item>
														<p class="field-title">Phone:</p>
														<f7-list-item :title="partnerForm.shipping_phone"></f7-list-item>
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="partnerForm.shipping_address"></f7-list-item>
														<p class="field-title">City:</p>
														<f7-list-item :title="partnerForm.shipping_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="partnerForm.shipping_last_name"></f7-list-item>
														<p class="field-title">Fax:</p>
														<f7-list-item :title="partnerForm.shipping_fax"></f7-list-item>
														<p class="field-title">State:</p>
														<f7-list-item :title="partnerForm.shipping_state"></f7-list-item>
														<p class="field-title">Zip:</p>
														<f7-list-item :title="partnerForm.shipping_zip"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="partnerForm"
													:formSettings="billingContactSettings">
												</business-contact-form-component>

												<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="partnerForm"
													:formSettings="shippingContactSettings">
												</business-contact-form-component>
												
												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updatePartnerPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="full-width">
															<f7-col width="100" class="display-flex margin">
																<f7-button fill @click="createPartnerandClose" class="bg-color-green trans-btn-left"
																	><span>Save Partner</span></f7-button
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
																			@click.prevent="createPartnerandNew"
																			popover-close
																			title="Save and New"
																		></f7-list-item>
																		<f7-list-item
																			link="#"
																			no-chevron
																			@click.prevent="createPartnerandEdit"
																			popover-close
																			title="Save and Edit"
																		></f7-list-item>
																		<f7-list-item
																			link="#"
																			no-chevron
																			@click.prevent="createPartnerandClose"
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
													<invoice-datatable-component :moduleInfo="moduleInfo"></invoice-datatable-component>
												</f7-row>
											</f7-list>
											<!-- END Reporting History Display List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Billing Tab -->

								<!-- Begin Shipping Details Tab -->
								<b-tab-item label="Shipping" icon="truck" class="no-padding">
									<shipping-component :dataForm="partnerForm" :moduleInfo="moduleInfo"></shipping-component>
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
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshPartner">
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
															@click="editPartnerData"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deletePartner"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Partners.partnerList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no companies to display.</p>
													<p class="text-align-center">Please create a new partner.</p>
													<f7-row v-if="Auth.authLevel <= 1" class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red"
																>Add New Partner</f7-button
															>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Partners.partnerList.length != 0">
												<b-table
													:data="Partners.partnerList"
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
import { LocaleMixin } from "@/mixins/businesses/locale-mixins";
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import creditCardComponent from "@/components/business/creditcard-ach-component.vue";
import shippingComponent from "@/components/business/shipping-component.vue";
import setupSheetComponent from "@/components/business/setup-sheet-component.vue";
import salesOfficesComponent from "@/components/business/salesoffices-database-component.vue";
import warehouseComponent from "@/components/business/warehouses-database-component.vue";
import profileCardComponent from "@/components/layout-elements/profile-card-component.vue";
import employeeDatabaseComponent from "@/components/business/employees-database-component.vue";
import reportingChartsComponent from "@/components/business/reporting-component.vue";
import parentComponent from "@/components/business/parent-company-component.vue";
import receiptDatatableComponent from '@/components/financial/receipt-datatable-component.vue';
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "partnerProfile",
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
		"invoice-datatable-component": receiptDatatableComponent,
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Main Seettings
			platformLevel: 2,
			//Components Data
			pageSettings: {
				leftNavDrawer: ".partner-panel",
				pageTitle: "Partner Profile"
			},
			profileCardSettings: {
				type: "business",
				title: "Partner Details"
			},
			moduleInfo: {
				name: "partner",
				type: "profile",
				level: 2
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
					is_datacom: false
				}
			},
			//Popups and Modals
			deptPopupOpened: false,
			payCyclesPopupOpened: false,
			positionPopupOpened: false,
			partnerImageSheet: false,
			partnerBulkUploadSheet: false,
			setupSheetOpened: false,
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
			//Partner Form Items
			partnerForm: {
				datacom: null,
				created_by: null,
				account_number: 0,
				merchant_id: null,
				domain: null,
				industry: null,
				entity_type: null,
				products_sold: null,
				profile_img: null,
				barcode: null,
				primary_contact_list: [],
				billing_contact_list: [],
				technical_contact_list: [],
				shipping_contact_list: [],
				//Common Partner Fields
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
				primary_mailing_country: null,
				primary_mailing_address: null,
				primary_mailing_city: null,
				primary_mailing_state: null,
				primary_mailing_zip: null,
				primary_first_name: null,
				primary_last_name: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,
				shipping_mailing_country: null,
				shipping_address: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				shipping_first_name: null,
				shipping_last_name: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,
				billing_mailing_country: null,
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
				board_date: null,
				acct_closure_date: null,
				closure_reason: null,
				is_active: true,
				is_datacom: false,
				is_partner: true,
				is_merchant: false,
				is_vendor: false
			},
			
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.partnerForm ", this.partnerForm);
			console.log("this.Companaies.partnerList", this.Partners.partnerList);
			console.log("this.partnerForm.entity_type ", this.partnerForm.entity_type);
			console.log("this.parentSettings.accountParent ", this.parentSettings.accountParent);
			console.log("this.Auth.platformInfo", this.Auth.platformInfo);
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
		//Create Partner and Edit Current Partner
		async createPartnerandEdit() {
			let createPartnerRes = await this.createPartner();
			//Populate Fields with Created Instance
			this.editPartnerData(createPartnerRes.id);
			console.log("createPartnerandEdit All Done", createPartnerRes);
		},

		//Create Partner and Clear form for entering a new partner
		async createPartnerandNew() {
			await this.createPartner();
			//Clear Form and Reset to Starting Editing Position
			console.log("createPartnerandNew All Done");
			this.newItemButton();
		},
		//Create Partner and Clear form for Viewing Data
		async createPartnerandClose() {
			let createPartnerRes = await this.createPartner();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createPartnerandClose All Done", createPartnerRes);
			await this.clearFormData();
			this.resetViewtoHome();
		},
		async createPartner() {
			this.$store.commit("RESET_ERRORS");
			try {
				this.$f7.preloader.show();
				//Dispatch creation method and update Fields with latest Object
				console.log("createPartner, this.partnerForm", this.partnerForm);
				this.partnerForm.description = this.$refs.partnerDescription.f7TextEditor.contentEl.innerHTML;

				var partnerFormCopy = JSON.parse(JSON.stringify(this.partnerForm));

				//Get Company ID (from each company type) and UserID add to Employee Form
				var companyOBJ = {};
				if (this.parentSettings.accountParent.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.parentSettings.accountParent.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					partnerFormCopy["datacom"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					response.type = "Create Employee";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}
				console.log("this.partnerForm", this.partnerForm);
				console.log("partnerFormCopy", partnerFormCopy);
				var partnerResponse = await this.$store.dispatch("createPartner", partnerFormCopy);
				console.log("partnerResponse", partnerResponse);
				this.$f7.preloader.hide();

				return partnerResponse;
			} catch (error) {
				console.error("Promise Response Error creating Partner", error);
			}
		},
		refreshPartner() {
			console.log("this.getPartnerList");
			this.$store.dispatch("getPartnerList");
		},
		// Populate Fields for editing in browser
		editPartnerData(partnerID) {
			this.clearFormData();
			this.parentSettings.activeTab = 0;
			this.showEditProfile();
			//Get User ID and object and map to fields
			var partnerListID = null;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexPos = this.Partners.partnerList.findIndex((elem) => {
					return elem.id === rowID;
				});
				console.log("editPartners findIndexPos", findIndexPos);
				partnerListID = findIndexPos;
				console.log("IF partnerListID", partnerListID);
			} else {
				var findIndexPos = this.Partners.partnerList.findIndex((elem) => {
					return elem.id === partnerID;
				});
				partnerListID = findIndexPos;
				console.log("Then partnerListID", partnerListID);
			}
			//Is there a list of companies to lookup?
			if (this.Partners.partnerList.length === 0) {
				return "There are no items available";
			}

			if (this.Partners.partnerList.length != 0) {
				console.log("this.Partners.partnerListings", this.Partners.partnerList);
				console.log("Then partnerListID", partnerListID);
				var partnerItem = this.Partners.partnerList[partnerListID];
				console.log("editPartners partnerItem", partnerItem);
				for (let key in this.partnerForm) {
					this.partnerForm[key] = partnerItem[key];
				}
				this.$refs.partnerDescription.f7TextEditor.contentEl.innerHTML = this.partnerForm.description;
				this.$store.dispatch("getEmployeeFilter", partnerListID);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		updatePartnerPATCH() {
			this.syncWithMixin();
			this.partnerForm.description = this.$refs.partnerDescription.f7TextEditor.contentEl.innerHTML;

			var partnerFormCopy = JSON.parse(JSON.stringify(this.partnerForm));

			delete partnerFormCopy.profile_img;
			delete partnerFormCopy.datacom;
			console.log("editPartners partnerForm", this.partnerForm);
			console.log("editPartners partnerFormCopy", partnerFormCopy);
			this.$store.dispatch("updatePartner", partnerFormCopy);

			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deletePartner() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Partners.partnerList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deletePartner findIndexID", findIndexID);
				if (this.Partners.partnerList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Partners.partnerList.length != 0) {
					let partnerItem = this.Partners.partnerList[findIndexID];
					console.log("deletePartner != 0 partnerItem", partnerItem);
					for (let key in this.partnerForm) {
						this.partnerForm[key] = partnerItem[key];
					}
					//Set Variables to make account inactive
					delete this.partnerForm.profile_img;
					this.partnerForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.partnerForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deletePartner", this.partnerForm).then((response) => {
							console.log("response from deletePartner method", response);
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
			console.log("clearFormData this.partnerForm", this.partnerForm);
			for (let key in this.partnerForm) {
				console.log("key", this.partnerForm[key]);
				if (this.partnerForm[key] === true || this.partnerForm[key] === false) {
					// console.log('TF key', key);
					this.partnerForm[key] = false;
				} else {
					this.partnerForm[key] = null;
				}
			}
			//Reset Partner Variables
			this.partnerForm.is_partner = true;
			this.partnerForm.is_active = true;
			this.partnerForm.primary_contact_list = [];
			this.partnerForm.billing_contact_list = [];
			this.partnerForm.technical_contact_list = [];
			this.partnerForm.shipping_contact_list = [];
			//Reset the view
			this.resetViewtoHome();
		},
		//Callback function from Child Component
		syncWithMixin(payload) {
			console.log("Must emit information from child component to parent");
			console.log('syncWithMixin payload', payload);
			return new Promise((resolve, reject) => {
				this.partnerForm.primary_mailing_country = payload.primary_country_name;
				this.partnerForm.primary_mailing_state = payload.primary_state_name;
				this.partnerForm.billing_country = payload.billing_country_name;
				this.partnerForm.billing_state = payload.billing_state_name;
				this.partnerForm.shipping_country = payload.shipping_country_name;
				this.partnerForm.shipping_state = payload.shipping_state_name;
				console.log('this.partnerForm', this.partnerForm);
				console.log('this.localeCities', this.localeCities);

				return resolve(payload.primary_state_name);
			});
		},

		logout() {
			this.$store.dispatch("signOut");
		},
		
	},
	computed: {
		...mapState(["Auth", "Static", "Locale", "Errors"]),
		...mapState(["Users", "Companies", "Datacom", "Partners"]),
		...mapGetters(["getPartners", "getPartnerDepartments", "getPartnerPositions"])
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
