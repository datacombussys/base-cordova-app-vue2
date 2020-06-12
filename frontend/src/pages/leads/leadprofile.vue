<template>
	<f7-page name="lead-profile">
		<f7-navbar title="Lead Profile" back-link="Back" back-link-url="/">
			<f7-searchbar
				class="searchbar-demo"
				expandable
				search-container=".search-list"
				search-in=".item-title"
				:disable-button="!$theme.aurora"
			></f7-searchbar>
		</f7-navbar>
		<!-- Main Container Row -->
		<f7-row>
			<!-- Left Column -->
			<f7-col width="100" medium="30" class="sticky-top" style="overflow-y: scroll;">
				<!-- User Image and Common Details -->
				<f7-block class="display-block full-height">
					<f7-card>
						<f7-card-header class="no-border hovering" valign="bottom" style="background-color: lightgrey;">
							<f7-row class="full-width">
								<f7-col width="50" class="align-self-flex-end">
									Company
								</f7-col>
								<f7-col width="50" class="text-align-right">
									<f7-link sheet-open=".company-image"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
								</f7-col>
							</f7-row>
						</f7-card-header>
						<f7-card-content>
							<f7-row v-if="!leadForm.profile_img" class="display-flex justify-content-center">
								<img
									src="/static/BusinessLogo170x170.png"
									style="width:170px;height:170px;"
									alt="Please load company profile"
								/>
							</f7-row>
							<f7-row v-if="leadForm.profile_img" class="display-flex justify-content-center">
								<img :src="leadForm.profile_img" style="width:170px;height:170px;" alt="" />
							</f7-row>
							<f7-row>
								<f7-col class="text-align-center margin-top">
									<img :src="barcode.image" style="width:150px;" alt="Please load item" />
									<div>
										{{ barcode.barcode_number }}
									</div>
								</f7-col>
							</f7-row>
						</f7-card-content>
						<f7-card-footer class="display-flex justify-content-center">
							<f7-block-title medium class="margin-top-half text-align-center">{{
								leadForm.legal_name
							}}</f7-block-title>
						</f7-card-footer>
					</f7-card>

					<f7-card class="margin-top">
						<f7-card-header class="no-border" valign="bottom" style="background-color: lightgrey;"
							>Warehouse Details</f7-card-header
						>
						<f7-card-content class="padding-half text-align-center">
							<f7-row>
								<f7-col>
									<f7-block-title medium class="margin-top-half">Warehouse</f7-block-title>
									<p class="text-align-center">ABC Corporation</p>
									<p class="text-align-center">1234 N Main St.</p>
									<p class="text-align-center">Irvine, CA. 92807</p>
								</f7-col>
							</f7-row>
							<f7-row class="full-width display-flex justify-content-stretch">
								<f7-col width="100">
									<f7-list>
										<f7-list-item
											title="Join Date"
											:after="leadForm.date_added | moment('MMM, Do, YYYY')"
										></f7-list-item>
										<f7-list-item title="Business Type" after="Merchant"></f7-list-item>
										<f7-list-item
											title="Status"
											:after="leadForm.is_active && leadForm.id ? 'Active' : 'Load Company'"
										></f7-list-item>
									</f7-list>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>

					<f7-card class="margin-top" v-if="!hideCreateItem">
						<f7-card-content class="padding-half text-align-center">
							<f7-row>
								<f7-col>
									<f7-button @click="newItemButton" fill class="bg-color-red">Add New Company</f7-button>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-card>
					<f7-card v-if="!hideSaveItem">
						<f7-card-content class="padding-half text-align-center">
							<f7-row class="full-width">
								<f7-col width="100" class="display-flex margin">
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
												title="Save and View"
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
					<f7-block></f7-block>
				</f7-block>
			</f7-col>
			<!-- END Left Column -->

			<!-- Right Column -->
			<f7-col width="100" medium="70">
				<f7-block>
					<f7-card>
						<f7-card-content>
							<f7-block-title medium class="no-margin-top">Dashboard</f7-block-title>
							<f7-row class="display-flex justify-content-space-around">
								<f7-col width="25">
									<div class="dashboard-icons">
										<f7-link icon-only>
											<i size="30" class="material-icons">person </i>
										</f7-link>
										<p>Employees</p>
									</div>
								</f7-col>
								<f7-col width="25">
									<div class="dashboard-icons">
										<f7-link icon-only>
											<i size="30" class="material-icons"
												>security
												<f7-badge color="red">5</f7-badge>
											</i>
										</f7-link>
										<p>Permissions</p>
									</div>
								</f7-col>
								<f7-col width="25">
									<div class="dashboard-icons">
										<f7-link icon-only>
											<i size="30" class="material-icons">pie_chart </i>
										</f7-link>
										<p>Reports</p>
									</div>
								</f7-col>
								<f7-col width="25">
									<div class="dashboard-icons">
										<f7-link icon-only>
											<i size="30" @click="showEditProfile" class="material-icons"
												>settings_applications
												<f7-badge color="red">5</f7-badge>
											</i>
										</f7-link>
										<p>Settings</p>
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
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											Profile
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link @click="showEditProfile"> <b-icon class="edit-icon" icon="pencil"></b-icon> </f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin profile Display List-->
									<f7-list v-show="!editProfile">
										<f7-row>
											<f7-block-title class="full-width no-margin-top" medium>Account Information</f7-block-title>
											<f7-col width="50">
												<p>Company Legal Name:</p>
												<f7-list-item :title="leadForm.legal_name"> </f7-list-item>
												<p>Is Partner:</p>
												<f7-list-item>
													<f7-toggle :checked="leadForm.is_partner" disabled slot="inner-start"></f7-toggle>
												</f7-list-item>
												<p>Has Parent Company:</p>
												<f7-list-item>
													<f7-toggle :checked="leadForm.has_parent_company" disabled slot="inner-start"></f7-toggle>
												</f7-list-item>
												<p>Account ID:</p>
												<f7-list-item :title="leadForm.account_number"> </f7-list-item>
												<p>Federal EIN:</p>
												<f7-list-item :title="leadForm.tax_id"></f7-list-item>
												<p>Industry:</p>
												<f7-list-item :title="leadForm.industry"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Company DBA:</p>
												<f7-list-item :title="leadForm.dba_name"></f7-list-item>
												<p>Is Merchant:</p>
												<f7-list-item>
													<f7-toggle :checked="leadForm.is_merchant" disabled slot="inner-start"></f7-toggle>
												</f7-list-item>
												<p>Parent Company Name:</p>
												<f7-list-item :title="leadForm.parent_company_name"></f7-list-item>
												<p>Company ID:</p>
												<f7-list-item :title="leadForm.merchant_id"></f7-list-item>
												<p>Resale ID #:</p>
												<f7-list-item :title="leadForm.resale_id"></f7-list-item>
												<p>Products/Services:</p>
												<f7-list-item :title="leadForm.products_sold"></f7-list-item>
											</f7-col>
										</f7-row>
										<!-- Company Details -->
										<f7-row>
											<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
											<f7-col width="50">
												<p>Primary Phone:</p>
												<f7-list-item :title="leadForm.primary_phone"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Primary Fax:</p>
												<f7-list-item :title="leadForm.primary_fax"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="70">
												<p>Primary Address:</p>
												<f7-list-item :title="leadForm.mailing_address"></f7-list-item>
											</f7-col>
											<f7-col width="30">
												<p>Primary State:</p>
												<f7-list-item :title="leadForm.mailing_state"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Primary City:</p>
												<f7-list-item :title="leadForm.mailing_city"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Primary Zip:</p>
												<f7-list-item :title="leadForm.mailing_zip"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Primary Email:</p>
												<f7-list-item :title="leadForm.primary_email"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Website Address:</p>
												<f7-list-item :title="leadForm.website"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-block-title class="full-width" medium>Type of Company</f7-block-title>
											<f7-col width="15">
												<p>Public Corporation:</p>
												<f7-list-item radio disabled value="pcorp" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Private Corporation:</p>
												<f7-list-item radio disabled value="privcorp" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>LLC:</p>
												<f7-list-item radio disabled value="llc" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Partnership:</p>
												<f7-list-item radio disabled value="partner" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Sole Proprietor:</p>
												<f7-list-item radio disabled value="sole" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Govenment:</p>
												<f7-list-item radio disabled value="govern" name="entity-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Non-Profit:</p>
												<f7-list-item radio disabled value="nonprofit" name="entity-type"></f7-list-item>
											</f7-col>
										</f7-row>

										<f7-row>
											<f7-block-title class="full-width" medium>About the Business</f7-block-title>
											<f7-col>
												<p>About The Business:</p>
												<div v-html="leadForm.description"></div>
											</f7-col>
										</f7-row>
									</f7-list>
									<!-- END Profile Display List -->
									<!-- Begin Profile Edit List -->
									<f7-list v-show="editProfile">
										<f7-block-title class="full-width" medium>Account Information</f7-block-title>
										<f7-row>
											<f7-col width="50">
												<p>Company Legal Name:<span style="color: red;"> *</span></p>
												<f7-list-input
													type="text"
													error-message="Legal name is required. Letters Only."
													required
													validate
													:value="leadForm.legal_name"
													@input="leadForm.legal_name = $event.target.value"
													style="background: rgb(216,252,253)"
												>
												</f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Company DBA:<span style="color: red;"> *</span></p>
												<f7-list-input
													type="text"
													error-message="Legal name is required. Letters Only."
													required
													validate
													:value="leadForm.dba_name"
													@input="leadForm.dba_name = $event.target.value"
													style="background: rgb(216,252,253)"
												>
												</f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Is Partner:</p>
												<f7-list-item>
													<f7-toggle
														:disabled="leadForm.is_merchant"
														:checked="leadForm.is_partner"
														@change="leadForm.is_partner = $event.target.checked"
														slot="inner-start"
													></f7-toggle>
												</f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Is Merchant:</p>
												<f7-list-item>
													<f7-toggle
														:disabled="leadForm.is_partner"
														:checked="leadForm.is_merchant"
														@change="leadForm.is_merchant = $event.target.checked"
														slot="inner-start"
													></f7-toggle>
												</f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Has Parent Company:</p>
												<f7-list-item>
													<f7-toggle
														:checked="leadForm.has_parent_company"
														@change="leadForm.has_parent_company = $event.target.checked"
														slot="inner-start"
													></f7-toggle>
												</f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Parent Company Name:</p>
												<f7-list-input
													:disabled="!leadForm.has_parent_company"
													:value="leadForm.parent_company_name"
													@input="leadForm.parent_company_name = $event.target.value"
													type="select"
													style="background: rgb(216,252,253)"
												>
													<option v-for="company in Companies.companyList" :key="company.id">
														{{ company.dba_name }}
													</option>
												</f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Account ID: (Auto Generated)</p>
												<f7-list-item :title="leadForm.account_number"> </f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Merchant ID:</p>
												<f7-list-input
													validate
													placeholder="#### #### #### ####"
													pattern="[0-9]{1,16}"
													error-message="Format: Numbers only. No special characters."
													:value="leadForm.merchant_id"
													@input="leadForm.merchant_id = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Federal EIN:</p>
												<f7-list-input
													required
													type="text"
													validate
													placeholder="123456789"
													pattern="[0-9]{1,9}"
													error-message="Format: Numbers only. No special characters."
													:value="leadForm.tax_id"
													@input="leadForm.tax_id = $event.target.value"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Resale ID #:</p>
												<f7-list-input
													validate
													placeholder="1234567"
													pattern="[0-9]*"
													error-message="Format: Numbers only. No special characters."
													:value="leadForm.resale_id"
													@input="leadForm.resale_id = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Industry:</p>
												<f7-list-input
													type="select"
													:value="leadForm.industry"
													@input="leadForm.industry = $event.target.value"
													style="background: rgb(216,252,253)"
												>
													<option v-for="industry in Static.industries" :key="industry.id">{{ industry }}</option>
												</f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Products/Services:</p>
												<f7-list-input
													:value="leadForm.products_sold"
													@input="leadForm.products_sold = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<!-- Company Details -->
										<f7-row>
											<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
											<f7-col width="50">
												<p>Primary Phone:</p>
												<f7-list-input
													validate
													placeholder="(800) 555-1234"
													pattern="[0-9]{1,10}"
													error-message='Format "##########"'
													:value="leadForm.primary_phone"
													@input="leadForm.primary_phone = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Primary Fax:</p>
												<f7-list-input
													validate
													placeholder="(800) 555-1234"
													pattern="[0-9]{1,10}"
													error-message='Format "##########"'
													:value="leadForm.primary_fax"
													@input="leadForm.primary_fax = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="70">
												<p>Primary Address:</p>
												<f7-list-input
													:value="leadForm.primary_address"
													@input="leadForm.primary_address = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
											<f7-col width="30">
												<p>Primary State:</p>
												<f7-list-input
													:value="leadForm.primary_state"
													@input="getPrimaryCities"
													type="select"
													style="background: rgb(216,252,253)"
												>
													<option
														v-for="primary_state in GET_STATE_LIST"
														:key="primary_state.id"
														:value="primary_state.id"
														>{{ primary_state.name }}</option
													>
												</f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Primary City:</p>
												<f7-list-input
													:value="leadForm.primary_city"
													@input="leadForm.primary_city = $event.target.value"
													type="select"
													style="background: rgb(216,252,253)"
												>
													<option
														v-for="primary_city in Locale.cities"
														:key="primary_city.id"
														:value="primary_city.id"
														>{{ primary_city.name }}</option
													>
												</f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Primary Zip:</p>
												<f7-list-input
													:value="leadForm.primary_zip"
													@input="leadForm.primary_zip = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50">
												<p>Primary Email:</p>
												<f7-list-input
													:value="leadForm.primary_email"
													@input="leadForm.primary_email = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Website Address:</p>
												<f7-list-input
													:value="leadForm.website"
													@input="leadForm.website = $event.target.value"
													type="text"
													style="background: rgb(216,252,253)"
												></f7-list-input>
											</f7-col>
										</f7-row>
										<!-- Type of Company -->
										<f7-row class="align-items-flex-end">
											<f7-block-title class="full-width" medium>Type of Company</f7-block-title>
											<f7-col width="15">
												<p>Public Corporation:</p>
												<f7-list-item radio value="pcorp" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Private Corporation:</p>
												<f7-list-item radio value="privcorp" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>LLC:</p>
												<f7-list-item radio value="llc" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Partnership:</p>
												<f7-list-item radio value="partner" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Sole Proprietor:</p>
												<f7-list-item radio value="sole" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Govenment:</p>
												<f7-list-item radio value="govern" name="company-type"></f7-list-item>
											</f7-col>
											<f7-col width="15">
												<p>Non-Profit:</p>
												<f7-list-item radio value="nonprofit" name="company-type"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col>
												<f7-text-editor
													id="companyDescriptionEditor"
													placeholder="Enter text..."
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
						<b-tab-item label="Contacts" icon="account-card-details-outline" class="no-padding">
							<f7-card class="mo-margin-top">
								<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											Company Contacts
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link @click="showEditProfile"> <b-icon icon="pencil" class="edit-icon"></b-icon> </f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin Contacts Display List -->
									<f7-list v-show="!editProfile">
										<f7-row>
											<f7-block-title class="full-width" medium>Billing Information</f7-block-title>
											<f7-col width="50">
												<p>Billing Contact:</p>
												<f7-list-item :title="leadForm.billing_first_name + leadForm.billing_last_name">
												</f7-list-item>
												<p>Street Address:</p>
												<f7-list-item :title="leadForm.billing_address"> </f7-list-item>
												<p>City:</p>
												<f7-list-item :title="leadForm.billing_city"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Billing Phone:</p>
												<f7-list-item :title="leadForm.billing_phone"></f7-list-item>
												<p>State:</p>
												<f7-list-item :title="leadForm.billing_state"></f7-list-item>
												<p>Zip:</p>
												<f7-list-item :title="leadForm.billing_zip"></f7-list-item>
											</f7-col>
										</f7-row>

										<f7-row>
											<f7-block-title class="full-width" medium>Shipping Information</f7-block-title>
											<f7-col width="50">
												<p>Shipping Contact:</p>
												<f7-list-item :title="leadForm.shipping_contact"></f7-list-item>
												<p>Street Address:</p>
												<f7-list-item :title="leadForm.shipping_address"> </f7-list-item>
												<p>City:</p>
												<f7-list-item :title="leadForm.shipping_city"></f7-list-item>
											</f7-col>
											<f7-col width="50">
												<p>Shipping Phone:</p>
												<f7-list-item :title="leadForm.shipping_phone"></f7-list-item>
												<p>State:</p>
												<f7-list-item :title="leadForm.shipping_state"></f7-list-item>
												<p>Zip:</p>
												<f7-list-item :title="leadForm.shipping_zip"></f7-list-item>
											</f7-col>
										</f7-row>
									</f7-list>
									<!-- END Contacts Display List -->
									<!-- Begin Contacts Edit List -->
									<f7-list simple-list v-show="editProfile">
										<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
										<business-contact-form-component 
											:contactForm="leadForm"
											:formSettings="billingContactSettings">
										</business-contact-form-component>

										<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
										<business-contact-form-component 
											:contactForm="leadForm"
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
											<f7-block class="full-width" v-if="!hideSaveItem">
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
						<b-tab-item label="Employees" icon="map-marker-radius-outline" class="no-padding">
							<f7-card class="mo-margin-top">
								<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											Employees
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin Employees Display List -->
									<f7-list simple-list>
										<f7-row class="margin-top">
											<f7-block-title class="full-width" medium>Employees</f7-block-title>
											<b-table :data="data" :columns="columns"></b-table>
										</f7-row>
									</f7-list>
									<!-- END Employees Display -->
								</f7-card-content>
							</f7-card>
						</b-tab-item>
						<!-- END Employees Tab -->

						<!-- Begin Locations Tab -->
						<b-tab-item label="Locations" icon="map-marker-radius-outline" class="no-padding">
							<f7-card class="mo-margin-top">
								<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											Sales Offices and Warehouses
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin Locations Display List -->
									<f7-list simple-list>
										<f7-row class="margin-top">
											<f7-block-title class="full-width" medium>Sales Offices</f7-block-title>
											<b-table :data="data" :columns="columns"></b-table>
										</f7-row>
										<f7-row class="margin-top">
											<f7-block-title class="full-width" medium>Warehouses</f7-block-title>
											<b-table :data="data" :columns="columns"></b-table>
										</f7-row>
									</f7-list>
									<!-- END Locations Display -->
								</f7-card-content>
							</f7-card>
						</b-tab-item>
						<!-- END Locations Tab -->

						<!-- Begin Reporting History Tab -->
						<b-tab-item label="Reporting" icon="note-text-outline" class="no-padding">
							<f7-card class="mo-margin-top">
								<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											Reporting
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin Reporting History List-->
									<f7-list>
										<f7-row class="margin-top">
											<f7-block-title class="full-width" medium>Statements</f7-block-title>
											<b-table :data="data" :columns="columns"></b-table>
										</f7-row>
										<f7-row class="margin-top">
											<f7-block-title class="full-width" medium>Transactions</f7-block-title>
											<b-table :data="data" :columns="columns"></b-table>
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
									<f7-row class="full-width">
										<f7-col width="25">
											Database
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
												<f7-list-item link="#" @click="editCompanyData" popover-close title="Edit Item"></f7-list-item>
												<f7-list-item link="#" @click="deleteCompany" popover-close title="Delete Item"></f7-list-item>
											</f7-list>
										</f7-popover>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<!-- Begin Database Section -->
									<f7-row v-if="Companies.companyList.length === 0">
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
											<template slot-scope="props">
												<b-table-column
													field="id"
													:visible="columnsVisible['id'].display"
													:label="columnsVisible['id'].title"
													width="40"
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
													field="phone"
													:visible="columnsVisible['primary_phone'].display"
													:label="columnsVisible['primary_phone'].title"
													sortable
													searchable
													centered
												>
													{{ props.row.primary_phone }}
												</b-table-column>

												<b-table-column
													field="closure_date"
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
					<f7-block v-show="!leadForm.id">
						<f7-block-header>
							You must first select a company to add a profile image
						</f7-block-header>
					</f7-block>
				</section>

				<section>
					<f7-block v-show="leadForm.id">
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

//Components
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "leadProfile",
	mixins: [

		],
	components: {
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Componsnt Data
			primaryContactSettings: {
				type: "primary"
			},
			shippingContactSettings: {
				type: "shipping"
			},
			billingContactSettings: {
				type: "billing"
			},

			//Scrollbar Settings
			settings: {
				maxScrollbarLength: 120
			},
			//Buefy Tabs
			activeTab: 0,
			//Page Setting for CRUD Display
			isDetailView: false,
			editProfile: false,
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			hideSaveItem: true,
			//Popups and Sheets
			companyImageSheet: false,
			companyBulkUploadSheet: false,
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
				primary_phone: { title: "Phone", display: true },
				acct_closure_date: { title: "Closed Date", display: true },
				is_active: { title: "Status", display: true }
			},
			isPaginated: true,
			isPaginationSimple: false,
			paginationPosition: "bottom",
			defaultSortDirection: "asc",
			sortIcon: "arrow-up",
			sortIconSize: "is-small",
			currentPage: 1,
			perPage: 5,
			//f7-DataTables
			data: [
				{ id: 1, first_name: "Jesse", last_name: "Simmons", date: "2016-10-15 13:43:27", gender: "Male" },
				{ id: 2, first_name: "John", last_name: "Jacobs", date: "2016-12-15 06:00:53", gender: "Male" },
				{ id: 3, first_name: "Tina", last_name: "Gilbert", date: "2016-04-26 06:26:28", gender: "Female" },
				{ id: 4, first_name: "Clarence", last_name: "Flores", date: "2016-04-10 10:28:46", gender: "Male" },
				{ id: 5, first_name: "Anne", last_name: "Lee", date: "2016-12-06 14:38:38", gender: "Female" }
			],
			columns: [
				{
					field: "id",
					label: "ID",
					width: "40",
					numeric: true
				},
				{
					field: "first_name",
					label: "First Name"
				},
				{
					field: "last_name",
					label: "Last Name"
				},
				{
					field: "date",
					label: "Date",
					centered: true
				},
				{
					field: "gender",
					label: "Gender"
				}
			],
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
			leadForm: {
				id: null,
				global_id: null,
				dba_name: null,
				entity_type: null,
				has_parent_company: false,
				parent_company_name: null,
				industry: null,
				products_sold: null,
				legal_name: null,
				description: null,
				created_at: null,
				main_phone: null,
				main_fax: null,
				corp_address: null,
				corp_city: null,
				corp_state: null,
				corp_zip: null,
				mailing_address: null,
				mailing_city: null,
				mailing_state: null,
				mailing_zip: null,
				created_by: null,
				website: null,
				account_id: null,
				merchant_id: null,
				tax_id: null,
				barcode: null,
				profile_img: null,
				is_active: true,
				shipping_contact: null,
				shipping_phone: null,
				shipping_address: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				primary_first_name: null,
				primary_last_name: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,
				primary_address: null,
				primary_city: null,
				primary_state: null,
				primary_zip: null,
				billing_first_name: null,
				billing_last_name: null,
				billing_phone: null,
				billing_email: null,
				billing_address: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				resale_id: null,
				purchasing_terms: null,
				board_date: null,
				acct_closure_date: null,
				closure_reason: null,
				is_partner: null,
				is_merchant: null
			},
			barcode: {
				title: null,
				image: null,
				barcode_number: null
			},
			editProfile: false,
			//Contact Lists
			technicalContactList: [],
			primaryContactList: [],
			billingContactList: [],
			additionalContactList: []
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.leadForm ", this.leadForm);
			console.log("this.Companaies.companyList", this.Companies.companyList);
			console.log("this.Users.companyFilteredEmployeeList", this.Users.companyFilteredEmployeeList);
		},
		menudropdown(UserID) {
			console.log("menudropdown UserID", UserID);
			// Add User to list
		},
		showEditProfile() {
			this.editProfile = !this.editProfile;
			this.hideCreateItem = !this.hideCreateItem;

			if (!this.hideCreateItem) {
				this.hideUpdateItemButtons = false;
			} else {
				this.hideUpdateItemButtons = true;
			}

			this.hideSaveItem = true;
			console.log("showEditProfile Clicked", this.editProfile);
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
		//Create Company and Edit Current Company
		async createCompanyandEdit(e) {
			// this.$f7.preloader.show();
			//Dispatch creation method and update Fields with latest Object
			console.log("createCompanyandEdit", this.leadForm);
			this.leadForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;
			await this.$store.dispatch("createCompany", this.leadForm).then((response) => {
				console.log("Promise Response from Create Company", response);
				//Populate Fields with Created Instance
				this.editCompanyData(response.id);
			});
		},
		//Create Company and Clear form for entering a new company
		async createCompanyandNew(e) {
			// this.$f7.preloader.show();
			//Dispatch creation method and update Fields with latest Object
			console.log("createCompanyandNew, this.leadForm", this.leadForm);
			this.leadForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;
			await this.$store.dispatch("createCompany", this.leadForm).then((response) => {
				console.log("Promise Response from CreateCompanyandNew", response);
				//Populate Fields with Created Instance
				this.newItemButton();
			});
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose(e) {
			// this.$f7.preloader.show();
			//Dispatch creation method and update Fields with latest Object
			console.log("createCompanyandNew, this.leadForm", this.leadForm);
			this.leadForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;
			await this.$store.dispatch("createCompany", this.leadForm).then((response) => {
				console.log("Promise Response from CreateCompanyandNew", response);
				//Populate Fields with Created Instance
				this.clearFormData();
			});
		},
		async refreshCompany() {
			console.log("this.getCompanyLit", this.getCompanies);
			await this.$store.dispatch("getCompanyList");
		},
		// Populate Fields for editing in browser
		editCompanyData(companyID) {
			this.clearFormData();
			this.activeTab = 0;
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
				for (let key in this.leadForm) {
					this.leadForm[key] = companyItem[key];
				}
				this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML = this.leadForm.description;
				this.$store.dispatch("getEmployeeFilter", companyListID);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		updateCompanyPATCH() {
			this.leadForm.description = this.$refs.companyDescription.f7TextEditor.contentEl.innerHTML;
			delete this.leadForm.profile_img;
			console.log("editCompanies leadForm", this.leadForm);
			this.$store.dispatch("updateCompanyItem", this.leadForm);
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
					for (let key in this.leadForm) {
						this.leadForm[key] = companyItem[key];
					}
					//Set Variables to make account inactive
					delete this.leadForm.profile_img;
					this.leadForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.leadForm.acct_closure_date = newDate;
					await this.$store.dispatch("deleteCompany", this.leadForm).then((response) => {
						console.log("response from deleteCompany method", response);
						this.clearFormData();
					});
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
		},
		deleteChip() {
			console.log("deleting Chip");
		},
		clearFormData() {
			console.log("clearFormData this.leadForm", this.leadForm);
			for (let key in this.leadForm) {
				console.log("key", this.leadForm[key]);
				if (this.leadForm[key] === true || this.leadForm[key] === false) {
					// console.log('TF key', key);
					this.leadForm[key] = false;
				} else {
					this.leadForm[key] = null;
				}
			}
			//Reset the view
			console.log("this.leadForm Clear Data", this.leadForm);
			this.editProfile = false;
			this.hideCreateItem = false;
			this.hideSaveItem = true;
			this.hideUpdateItemButtons = true;
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
			this.leadForm.profile_img = this.cropped;
			var formdata = this.leadForm;
			console.log("this.leadForm", this.leadForm);

			try {
				await axios.put("/django/companies/" + formdata.id + "/", formdata).then((response) => {
					console.log("Commpany Image PUT response", response);
					this.$store.dispatch("getCompanyList");
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

		// CALLBACK USAGE
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
		// EVENT USAGE
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
		getPrimaryCities(e) {
			this.leadForm.primary_states = e.target.value;
			this.$store.dispatch("getCities", this.leadForm.primary_states);
		},
		getShippingCities(e) {
			this.leadForm.shipping_states = e.target.value;
			this.$store.dispatch("getCities", this.leadForm.shipping_states);
		},
		getBillingCities(e) {
			this.leadForm.billing_states = e.target.value;
			this.$store.dispatch("getCities", this.leadForm.billing_states);
		}
	},
	computed: {
		...mapState(["Users", "Companies", "Static", "Locale"]),
		...mapGetters(["getCompanies"])
	},
	mounted() {
		this.$store.dispatch("getCompanyList");
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

p {
	margin-left: 5px;
	font-weight: 900;
	text-align: left;
}
.image-sheet {
	height: 100vh;
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
//Double Button
.trans-btn-left {
	display: flex;
	align-content: center;
	flex-direction: column;
	width: 85%;
	border-radius: 5px 0px 0px 5px;
	border: 1px solid black;
	height: 50px;
}
.trans-btn-right {
	display: flex;
	align-content: center;
	flex-direction: column;
	width: 15%;
	border-radius: 0px 5px 5px 0px;
	border: 1px solid black;
	height: 50px;
}
.user-container {
	font-size: 1.5em;
	font-weight: 600;
	width: 100%;
	height: 200px;
	border: 3px solid rgb(82, 82, 82);
	margin-bottom: 30px;
	background: rgba(201, 243, 255, 0.5);
}
.no-user-container {
	font-size: 1.2em;
	font-weight: 600;
	color: #8f1414;
	width: 100%;
	height: 200px;
	border: 3px solid rgb(82, 82, 82);
	margin-bottom: 30px;
	background: rgba(201, 243, 255, 0.5);
}
.contact-types-header {
	font-size: 1.5em;
}
</style>
