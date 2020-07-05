<template>
	<f7-page style="overflow-y: hidden;" name="warehouses">
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
											<f7-block-title class="full-width no-margin-bottom">Warehouse</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".warehouse-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!warehouseForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/BusinessLogo170x170.png"
											style="width:170px;height:170px;"
											alt="Please load warehouse profile"
										/>
									</f7-row>
									<f7-row v-if="warehouseForm.profile_img" class="display-flex justify-content-center">
										<img :src="warehouseForm.profile_img" style="width:170px;height:170px;" alt="" />
									</f7-row>
									<f7-row>
										<f7-col class="text-align-center margin-top">
											<div v-if="warehouseForm.barcode != null">
												<img :src="warehouseForm.barcode.image" style="width:150px;" alt="Please load item" />
												<div>
													{{ warehouseForm.barcode.barcode_number }}
												</div>
											</div>
										</f7-col>
									</f7-row>
								</f7-card-content>
								<f7-card-footer class="display-flex justify-content-center">
									<f7-block-title medium class="margin-top-half text-align-center">{{
										warehouseForm.legal_name
									}}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component
								:profileForm="warehouseForm"
								:cardSettings="profileCardSettings"
							></profile-card-component>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Warehouse</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!parentSettings.hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button
												fill
												@click.prevent="createWarehouseandClose"
												:disabled="canSubmitWarehouseForm"
												class="bg-color-green trans-btn-left"
												><span>Save Warehouse</span></f7-button
											>
											<f7-button
												fill
												popover-open=".new-warehouse-button"
												:disabled="canSubmitWarehouseForm"
												class="bg-color-green trans-btn-right"
												icon-color="white"
												icon-size="40"
												icon="mdi mdi-menu-down"
											></f7-button>
											<f7-popover class="new-warehouse-button">
												<f7-list>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createWarehouseandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createWarehouseandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createWarehouseandClose"
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
							<f7-row class="full-width display-flex justify-content-center">
								<article v-if="Errors.warehouseErrorHandle" class="left message is-danger">
									<div class="message-body">
										There were one or more errors when processing this request. Please review all the fields and make
										the necessary changes.
									</div>
								</article>
							</f7-row>
							<f7-card>
								<f7-card-content class="padding-half">
									<f7-row class="full-width display-flex justify-content-center">
										<div class="active-arrow">Active</div>
										<div class="pastdue-arrow">Past Due</div>
										<div class="completed-arrow">Completed</div>
										<div class="backordered">Backordered</div>
										<div class="cancelled">Cancelled</div>
									</f7-row>
								</f7-card-content>
							</f7-card>
							<f7-card>
								<f7-card-content class="padding-top-half">
									<f7-block-title medium class="no-margin-top">Dashboard</f7-block-title>
									<f7-row class="display-flex justify-content-space-around">
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
												<f7-link href="/groups-permissions/" icon-only>
													<f7-icon size="50" icon="mdi mdi-account-lock">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Permissions</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div
												class="dashboard-icons display-flex flex-direction-column justify-content-center align-items-center"
											>
												<f7-link href="/users-groups/" icon-only>
													<f7-icon size="50" icon="mdi mdi-account-cash-outline">
														<!-- <f7-badge color="red">5</f7-badge> -->
													</f7-icon>
												</f7-link>
												<p>Suscriptions</p>
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
							<b-tabs type="is-boxed" v-model="parentSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Parent Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
									<parent-component
										ref="parentComponentRef"
										:toggleEditProfile="toggleEditProfile"
										:parentSettings="parentSettings"
										:moduleInfo="moduleInfo"
										:formData="warehouseForm">
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
											<f7-list v-show="!parentSettings.editProfile">
												<f7-row>
													<f7-block-title class="full-width no-margin-top" medium>Account Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">Warehouse Name:</p>
														<f7-list-item :title="warehouseForm.warehouse_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sales Offices:</p>
														<f7-list-item v-for="office in GET_SALES_OFFICE_LIST" :key="office.id">{{
															office.salesoffice_name
														}}</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Account ID:</p>
														<f7-list-item :title="warehouseForm.warehouse_number"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Warehouse ID:</p>
														<f7-list-item :title="warehouseForm.global_id"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Warehouse Details -->
												<f7-row>
													<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="warehouseForm.primary_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="warehouseForm.primary_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary Phone:</p>
														<f7-list-item :title="warehouseForm.primary_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Fax:</p>
														<f7-list-item :title="warehouseForm.primary_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Primary Address:</p>
														<f7-list-item :title="warehouseForm.primary_mailing_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">Primary State:</p>
														<f7-list-item :title="warehouseForm.primary_mailing_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary City:</p>
														<f7-list-item :title="warehouseForm.primary_mailing_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Primary Zip:</p>
														<f7-list-item :title="warehouseForm.primary_mailing_zip"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Primary Email:</p>
														<f7-list-item :title="warehouseForm.primary_email"></f7-list-item>
													</f7-col>
													<f7-col width="50"> </f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<p class="field-title">About The Business:</p>
														<div class="about-me-box" v-html="warehouseForm.description"></div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Account Information</f7-block-title>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Warehouse Name:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="text"
															error-message="Legal name is required. Letters Only."
															required
															validate
															:value="warehouseForm.warehouse_name"
															@input="warehouseForm.warehouse_name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.warehouseErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.warehouseErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.warehouseErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'warehouse_name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Sales Offices:<span style="color: red;"> *</span></p>
														<f7-list-item
															title="Sales Offices"
															smart-select
															:smart-select-params="{ openIn: 'popover' }"
														>
															<select name="SalesOffices" v-model="warehouseForm.sales_offices" multiple>
																<option
																	v-for="office in SalesOffices.salesOfficeList"
																	:key="office.id"
																	:value="office.id"
																	selected
																	>{{ office.salesoffice_name }}</option
																>
															</select>
														</f7-list-item>
														<div v-if="Errors.warehouseErrorData.length != 0">
															<div
																class="full-width"
																v-for="errorArray in Errors.warehouseErrorData"
																:key="errorArray.id"
															>
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.warehouseErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'sales_offices'" class="message-body">
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
														<f7-list-item :title="warehouseForm.warehouse_number"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Warehouse ID:</p>
														<f7-list-item :title="warehouseForm.global_id"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Warehouse Details -->
												<f7-block-title class="full-width" medium>Primary Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="warehouseForm"
													:formSettings="primaryContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>

												<f7-row>
													<f7-block-title class="full-width" medium>About the Business</f7-block-title>
													<f7-col>
														<f7-text-editor
															id="warehouseDescriptionEditor"
															ref="warehouseDescription"
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
																<f7-button fill class="bg-color-blue" @click="updateWarehousePATCH">Update</f7-button>
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
													<f7-block-title class="full-width">Warehouse Contacts</f7-block-title>
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
													<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
													<f7-col width="50">
														<p class="field-title">First Name:</p>
														<f7-list-item :title="warehouseForm.shipping_first_name"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Last Name:</p>
														<f7-list-item :title="warehouseForm.shipping_last_name"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">Phone:</p>
														<f7-list-item :title="warehouseForm.shipping_phone"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Fax:</p>
														<f7-list-item :title="warehouseForm.shipping_fax"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Street Address:</p>
														<f7-list-item :title="warehouseForm.shipping_address"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">State:</p>
														<f7-list-item :title="warehouseForm.shipping_state"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p class="field-title">City:</p>
														<f7-list-item :title="warehouseForm.shipping_city"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Zip:</p>
														<f7-list-item :title="warehouseForm.shipping_zip"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Contacts Display List -->
											<!-- Begin Contacts Edit List -->
											<f7-list simple-list v-show="parentSettings.editProfile">
												<f7-block-title class="full-width" medium>Primary Billing Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="warehouseForm"
													:formSettings="billingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>

											<f7-block-title class="full-width" medium>Primary Shipping Information</f7-block-title>
												<business-contact-form-component 
													:contactForm="warehouseForm"
													:formSettings="shippingContactSettings"
													:errorData="errorData"
													:errorHandle="errorHandle">
												</business-contact-form-component>

												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top display-flex justify-content-end">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateWarehousePATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!parentSettings.hideSaveItem">
														<f7-row class="margin-top">
															<f7-col width="50" class="display-flex margin justify-content-end">
																<f7-button
																	fill
																	@click.prevent="createWarehouseandClose"
																	:disabled="canSubmitWarehouseForm"
																	class="bg-color-green trans-btn-left"
																	><span>Save Warehouse</span></f7-button
																>
																<f7-button
																	fill
																	popover-open=".new-warehouse-button"
																	:disabled="canSubmitWarehouseForm"
																	class="bg-color-green trans-btn-right"
																	icon-color="white"
																	icon-size="40"
																	icon="mdi mdi-menu-down"
																></f7-button>
																<f7-popover class="new-warehouse-button">
																	<f7-list>
																		<f7-list-item
																			link="#"
																			no-chevron
																			@click.prevent="createWarehouseandNew"
																			popover-close
																			title="Save and New"
																		></f7-list-item>
																		<f7-list-item
																			link="#"
																			no-chevron
																			@click.prevent="createWarehouseandEdit"
																			popover-close
																			title="Save and Edit"
																		></f7-list-item>
																		<f7-list-item
																			link="#"
																			no-chevron
																			@click.prevent="createWarehouseandClose"
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
													<f7-block-title class="full-width" medium>Purchase Orders</f7-block-title>
													<f7-block-title class="full-width" medium>Sales Orders</f7-block-title>
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
													<f7-link @click="refreshWarehouse">
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
															@click="editWarehouse"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deleteWarehouse"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="GET_SELECTED_WAREHOUSE_PROFILE === 0">
												<f7-col>
													<p class="text-align-center">There are no companies to display.</p>
													<p class="text-align-center">Please create a new warehouse.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red"
																>Add New Warehouse</f7-button
															>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="GET_SELECTED_WAREHOUSE_PROFILE != 0">
												<b-table
													:data="GET_WAREHOUSE_LIST"
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
															field="warehouse_name"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['warehouse_name'].display"
															:label="columnsVisible['warehouse_name'].title"
															sortable
															width="200"
															searchable
															centered
														>
															<template v-if="showDetailIcon">
																{{ props.row.warehouse_name }}
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
import parentComponent from "../../components/business/parent-company-component.vue";
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import businessContactFormComponent from "@/components/business/contact-form-component.vue";

export default {
	name: "warehouses",
	mixins: [
		UniversalMixins, 
		LocaleMixin
		],
	components: {
		"nav-bar-component": navBarComponent,
		"parent-component": parentComponent,
		"profile-card-component": profileCardComponent,
		"business-contact-form-component": businessContactFormComponent
	},
	data() {
		return {
			//Component Variables
			pageSettings: {
				leftNavDrawer: ".warehouse-panel",
				pageTitle: "Warehouse Profile"
			},
			profileCardSettings: {
				type: "business",
				title: "Warehouse Profile"
			},
			moduleInfo: {
				name: "Warehouse",
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

			//Popups and Modals
			warehouseImageSheet: false,
			warehouseBulkUploadSheet: false,
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
				id: { title: "Id", display: true },
				warehouse_name: { title: "Name", display: true },
				primary_mailing_city: { title: "Location", display: true },
				profile_img: { title: "Image", display: true },
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
			//Warehouse Form Items
			requiredFieldsDone: 0,
			warehouseForm: {
				id: null,
				company: null,
				partner: null,
				datacom: null,
				primary_contact: null,
				//Arrays
				primary_contacts: [],
				billing_contacts: [],
				technical_contacts: [],
				shipping_contacts: [],
				sales_offices: [],
				employees: [],
				warehouse_name: null,
				warehouse_number: null,
				global_id: null,
				date_added: null,
				profile_img: null,
				description: null,
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
				shipping_mailing_country: null,
				shipping_first_name: null,
				shipping_last_name: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,
				closure_date: null,
				closure_reason: null,
				is_active: true,
				status: null
			},
			

			//Contact Lists
			primaryContactList: [],
			shippingContactList: []
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.warehouseForm", this.warehouseForm);
			console.log("this.GET_WAREHOUSE_LIST", this.GET_WAREHOUSE_LIST);
			console.log("this.Warehouses.warehouseProfile", this.Warehouses.warehouseProfile);
			console.log("this.parentSettings.accountParent", this.parentSettings.accountParent);
			console.log("this.Auth.userCompanyParent", this.Auth.userCompanyParent);
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
		//Create Warehouse and Edit Current Warehouse
		async createWarehouseandEdit() {
			this.$store.commit("RESET_ERRORS");
			let createWarehouseRes = await this.createWarehouse();
			//Populate Fields with Created Instance
			this.editWarehouseById(createWarehouseRes.id);
			console.log("createWarehouseandEdit All Done", createWarehouseRes);
		},

		//Create Warehouse and Clear form for entering a new warehouse
		async createWarehouseandNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createWarehouse();
			//Clear Form and Reset to Starting Editing Position
			console.log("createWarehouseandNew All Done");
			this.newItemButton();
		},
		//Create Warehouse and Clear form for Viewing Data
		async createWarehouseandClose() {
			this.$store.commit("RESET_ERRORS");
			let createWarehouseRes = await this.createWarehouse();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createWarehouseandClose All Done", createWarehouseRes);
			if(createWarehouseRes != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				this.$f7.dialog.alert("You had some errors on your submission").open();
			}
		},
		async createWarehouse() {
			return new Promise( async (resolve, reject) => {
				try {
					this.$f7.preloader.show();

					console.log("createWarehouse, this.warehouseForm", this.warehouseForm);
					var newWarehouseForm = JSON.parse(JSON.stringify(this.warehouseForm));
					console.log("newWarehouseForm", newWarehouseForm);

					//Populate Variables
					newWarehouseForm.description = this.$refs.warehouseDescription.f7TextEditor.contentEl.innerHTML;

					// Get Parent Company Info to add the Warehouse
					let platformForm = await this.setUserPlatformPOST(newWarehouseForm);
					console.log("platformForm", platformForm);

					var warehouseResponse = await this.$store.dispatch("POSTWarehouse", platformForm);
					console.log("warehouseResponse", warehouseResponse);
					this.$f7.preloader.hide();

					return resolve(warehouseResponse);
				} catch (error) {
					console.error("Promise Response Error creating Warehouse", error);
					return reject(error);
			}
			});
			
		},
		refreshWarehouse() {
			console.log("GETWarehouseList");
			this.$store.dispatch("GETWarehouseList");
		},
		// Populate Fields for editing in browser
		async editWarehouse() {
			//I still need to handle the Parent Company Field. I ti snot updating properly
			this.clearFormData();
			this.parentSettings.activeTab = 1;
			if (this.checkedRows.length != 0) {
				console.log("this.checkedRows != 0", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;

				var getSelectedWarehouseObj = await this.$store.dispatch("GETWarehouseSelectedProfile", {id: rowID});
				console.group('getSelectedWarehouseObj', getSelectedWarehouseObj);

				for (let key in this.warehouseForm) {
					console.log("key", key);
					console.log("this.warehouseForm[key]", this.warehouseForm[key]);
					console.log("getSelectedWarehouseObj.data[key]", getSelectedWarehouseObj[key]);
					this.warehouseForm[key] = getSelectedWarehouseObj[key];
				}
				this.$refs.warehouseDescription.f7TextEditor.contentEl.innerHTML = this.warehouseForm.description;
			} 
			this.showEditProfile();
		},
		async editWarehouseById(companyID) {
			console.log("editWarehouse");
			this.clearFormData();
			this.parentSettings.activeTab = 0;
			//2) Get User ID and object and map to fields from database table
			var getSelectedWarehouseObj = await this.$store.dispatch("GETWarehouseSelectedProfile", {id: companyID});
			console.group('getSelectedWarehouseObj', getSelectedWarehouseObj);

			for (let key in this.warehouseForm) {
				this.warehouseForm[key] = this.GET_SELECTED_WAREHOUSE_PROFILE[key];
			}
			this.$refs.warehouseDescription.f7TextEditor.contentEl.innerHTML = this.warehouseForm.description;
			this.showEditProfile();

		},
		//Make the PUT request to update datebase instance from updated form Data
		updateWarehousePATCH() {
			this.syncWithMixin();
			this.warehouseForm.description = this.$refs.warehouseDescription.f7TextEditor.contentEl.innerHTML;
			delete this.warehouseForm.profile_img;
			console.log("updateWarehousePATCH warehouseForm", this.warehouseForm);
			this.$store.dispatch("updateWarehouse", this.warehouseForm);
			this.resetViewtoHome();
		},
		syncWithMixin() {
			return new Promise((resolve, reject) => {
				this.warehouseForm.primary_mailing_country = this.localeCities.primary_country_name;
				this.warehouseForm.primary_mailing_state = this.localeCities.primary_state_name;
				this.warehouseForm.shipping_mailing_country = this.localeCities.shipping_country_name;
				this.warehouseForm.shipping_state = this.localeCities.shipping_state_name;
				this.warehouseForm.billing_mailing_country = this.localeCities.billing_country_name;
				this.warehouseForm.billing_state = this.localeCities.billing_state_name;
				return resolve();
			});
		},

		//Set inventory item to inactive instead of deleting instance
		async deleteWarehouse() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.GET_WAREHOUSE_LIST.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteWarehouse findIndexID", findIndexID);
				if (this.GET_SELECTED_WAREHOUSE_PROFILE === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.GET_SELECTED_WAREHOUSE_PROFILE != 0) {
					let warehouseItem = this.GET_WAREHOUSE_LIST[findIndexID];
					console.log("deleteWarehouse != 0 warehouseItem", warehouseItem);
					for (let key in this.warehouseForm) {
						this.warehouseForm[key] = warehouseItem[key];
					}
					//Set Variables to make account inactive
					delete this.warehouseForm.profile_img;
					this.warehouseForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.warehouseForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteWarehouse", this.warehouseForm).then((response) => {
							console.log("response from deleteWarehouse method", response);
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
			console.log("clearFormData this.warehouseForm", this.warehouseForm);
			for (let key in this.warehouseForm) {
				console.log("key", this.warehouseForm[key]);
				if (this.warehouseForm[key] === true || this.warehouseForm[key] === false) {
					// console.log('TF key', key);
					this.warehouseForm[key] = false;
				} else {
					this.warehouseForm[key] = null;
				}
			}
			//Reset Warehouse Variables
			this.warehouseForm.is_active = true;
			this.warehouseForm.sales_offices = [];
			this.warehouseForm.employees = [];
			this.warehouseForm.primary_contacts = [];
			this.warehouseForm.billing_contacts = [];
			this.warehouseForm.technical_contacts = [];
			this.warehouseForm.shipping_contacts = [];

			//Reset the view
			this.resetViewtoHome();
		},


		logout() {
			this.$store.dispatch("signOut");
		}
	},
	computed: {
		...mapState(["Auth", "Users", "Warehouses", "Locale", "Errors", "SalesOffices"]),
		...mapGetters(["GET_WAREHOUSE_LIST", "GET_SALES_OFFICE_LIST", "GET_SELECTED_WAREHOUSE_PROFILE", 
									"GET_SELECTED_WAREHOUSE_PROFILE"]),
		...mapGetters(["GET_WAREHOUSE_ERRORS_LIST", "GET_WAREHOUSE_ERROR_HANDLE"]),
		errorData() {
			return this.GET_WAREHOUSE_ERRORS_LIST;
		},
		errorHandle() {
			return this.GET_WAREHOUSE_ERROR_HANDLE;
		},
		canSubmitWarehouseForm() {
			if (this.Auth.isAuthenticated) {
				return false;
			}
			return true;
		},
		
	},
	async mounted() {
		let response = await this.setUserPlatformGET();
		console.log("Warehouse Mounted setUserPlatformGET response", response);
		this.$store.dispatch("getStates");
		this.$store.dispatch("GETWarehouseList", response);
		this.editWarehouse();

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
.active-arrow {
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	background: rgba(2, 90, 114, 0.6);
	clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
}
.pastdue-arrow {
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(117, 6, 6, 0.3);
	clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.completed-arrow {
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(2, 95, 10, 0.3);
	clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.backordered {
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
.cancelled {
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
