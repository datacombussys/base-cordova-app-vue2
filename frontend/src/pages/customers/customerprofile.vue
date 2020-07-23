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
									<f7-row class="full-width display-flex align-items-center">
										<f7-col width="50">
											<f7-block-title class="full-width no-margin-bottom">Profile</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".edit-profile-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
											<profile-image-popup-component
												ref="profileImageComponent"
												:profileImageSettings="profileImageSettings"
												:profileData="customerForm">
											</profile-image-popup-component>
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
									<div v-if="customerForm.user">
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

							<profile-card-component :profileForm="customerForm" :cardSettings="profileCardSettings"></profile-card-component>

							<f7-card class="margin-top">
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateUser">
										<f7-col>
											<f7-button @click="newUserButton" fill class="bg-color-red">Add New User</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!accountSettings.hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click.prevent="createCustomerandClose" class="bg-color-green trans-btn-left"
												><span>Save Customer</span></f7-button
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
							<b-tabs type="is-boxed" v-model="accountSettings.activeTab" class="no-padding-top bg-color-white">
								<!-- Begin Company Tab -->
								<b-tab-item label="Company" icon="office-building" class="no-padding">
								<parent-component
									ref="parentComponentRef"
									:toggleEditProfile="toggleEditProfile"
									:accountSettings="accountSettings"
									:moduleInfo="moduleInfo"
									:formData="customerForm">
								</parent-component>
								</b-tab-item>
								<!-- END Company Tab -->

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
											<f7-list v-show="!accountSettings.editProfile">
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
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list simple-list v-show="accountSettings.editProfile">
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
															:class="errorHandle? 'item-input-invalid': ''"
														>
														</f7-list-input>
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'first_name'"
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
														<!-- Error Handling -->
														<f7-row 
															v-for="errorArray in errorData" 
															:key="errorArray.id">	
															<article
																v-if="errorArray[0] === 'last_name'"
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
														<p class="field-title">Customer Number:</p>
														<f7-list-item
															:title="customerForm.customer_number"
														></f7-list-item>
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
															error-message='Format "000000000"'
															:value="customerForm.ssn"
															@input="customerForm.ssn = $event.target.value"
															type="text"
														></f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p class="field-title">Mobile Phone:
															<span style="color: red;">*</span>
														</p>
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
												</f7-row>
												<f7-row>
													<f7-col width="30">
														<p class="field-title">
															Country:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															required
															:value="localeCities.primary_country_id"
															@input="getPrimaryStates($event, 'primary')"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option
																v-for="country in GET_PRIMARY_COUNTRY_LIST"
																:key="country.id"
																:value="country.id">
																{{ country.name }}
															</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
														<p class="field-title">
															State:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															required
															:value="localeCities.primary_state_id"
															@input="getPrimaryCities($event, 'primary')"
															type="select"
															style="background: rgb(216,252,253)"
														>
															<option
																v-for="mailing_state in GET_PRIMARY_STATE_LIST"
																:key="mailing_state.id"
																:value="mailing_state.id"
															>{{ mailing_state.name }}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
															<p class="field-title">
																City:
																<span style="color: red;">*</span>
															</p>
															<f7-list-input
																required
																:value="customerForm.user.city"
																@input="customerForm.user.city = $event.target.value"
																type="select"
																style="background: rgb(216,252,253)"
															>
																<option
																	v-for="mailing_city in GET_PRIMARY_CITY_LIST"
																	:key="mailing_city.id"
																	:value="mailing_city.name"
																>{{ mailing_city.name }}</option>
															</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="70">
														<p class="field-title">Street Address:
															<span style="color: red;">*</span>
														</p>
														<f7-list-input
															:value="customerForm.user.street_address"
															@input="customerForm.user.street_address = $event.target.value"
															type="text"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
													</f7-col>
													<f7-col width="30">
															<p class="field-title">Zip:
																<span style="color: red;">*</span>
															</p>
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
											</f7-list>

											<set-password-component 
												:accountSettings="accountSettings"
												:loginForm="customerForm"
												:errorData="errorData"
												:errorHandle="errorHandle">
											</set-password-component>

												<!-- Delete / Update Buttons-->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateUserButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="updateUserPATCH">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
													<f7-block class="full-width" v-if="!accountSettings.hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="50" class="display-flex justify-content-end margin">
																<f7-button
																	fill
																	@click.prevent="createCustomerandClose"
																	class="bg-color-green trans-btn-left"
																>
																	<span>Save Customer</span>
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
													</f7-block>
												</f7-row>
											
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
	
											<invoice-datatable-component></invoice-datatable-component>

											<receipt-datatable-component></receipt-datatable-component>
		
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
																	:class="{ 'inactive-item': !props.row.user_obj.is_active }"
																/>
															</div>
														</b-table-column>
														<b-table-column
															field="id"
															:visible="columnsVisible['id'].display"
															:label="columnsVisible['id'].title"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
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
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['date_added'].display"
															:label="columnsVisible['date_added'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.user_obj.date_added | moment("M/D/Y h:m:s") }}
														</b-table-column>

														<b-table-column
															field="full_name"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['full_name'].display"
															:label="columnsVisible['full_name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">
																{{ props.row.user_obj.full_name }}
															</template>
															<template v-else>
																<a @click="toggle(props.row)">
																	{{ props.row.user_obj.full_name }}
																</a>
															</template>
														</b-table-column>

														<b-table-column
															field="customer_type"
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
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
															:class="{ 'inactive-item': !props.row.user_obj.is_active }"
															:visible="columnsVisible['is_active'].display"
															:label="columnsVisible['is_active'].title"
															sortable
															searchable
															centered
														>
															<b-tag
																size="is-medium"
																:type="`${props.row.user_obj.is_active ? 'is-success' : 'is-danger'}`"
																>{{ props.row.user_obj.is_active ? "Active" : "Inactive" }}</b-tag
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
							<f7-row>
								<f7-block class="margin"></f7-block>
							</f7-row>
						</f7-block>
					</div>
				</div>
			</f7-col>
				<!-- END Right Column -->

		</f7-row>
		<!-- END Main Container Row -->		

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

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datepicker-component.vue';
import shippingComponent from "../../components/business/shipping-component.vue";
import creditCardComponent from "../../components/business/creditcard-ach-component.vue";
import parentComponent from "@/components/business/parent-company-component.vue";
import invoiceDatatableComponent from '@/components/financial/invoice-datatable-component.vue';
import receiptDatatableComponent from '@/components/financial/receipt-datatable-component.vue';
import profileCardComponent from "../../components/layout-elements/profile-card-component.vue";
import setPasswordComponent from "../../components/universal/logging-in/set-password-component.vue";


export default {
	name: "customerProfile",
	mixins: [
		LocaleMixins,
		UniversalMixins
		],
	components: {
		"nav-bar-component": navBarComponent,
		"f7-date-picker-component": f7DatePickerComponent,
		"shipping-component": shippingComponent,
		"credit-card-component": creditCardComponent,
		"parent-component": parentComponent,
		"invoice-datatable-component": invoiceDatatableComponent,
		"receipt-datatable-component": receiptDatatableComponent,
		"profile-card-component": profileCardComponent,
		"set-password-component": setPasswordComponent

	},
	data() {
		return {
			pageSettings: {
				leftNavDrawer: ".customer-panel",
				pageTitle: "Customer Profile"
			},
			moduleInfo: {
				name: "Customers",
				type: "profile",
				level: 5
			},
			accountSettings: {
				showPasswordReset: false,
				activeTab: 0,
				editProfile: false,
				hideSaveItem: true,
				accountPlatform: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
					is_vendor: false
				},
			},
			//Profile Card
			profileCardSettings: {
				title: "Profile Details",
				type: "customer"
			},
			//Edit Profile Image
			profileImageSettings: {
				url: 'customer/',
				module: 'Customer',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},

			//Scrollbar Settings
			settings: {
				maxScrollbarLength: 60
			},
			//Page Setting for CRUD Display
			hideUpdateUserButtons: false,
			hideCreateUser: false,

			//Popups and Sheets
			catPopupOpened: false,
			gallerySheetOpened: false,

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
				resale_id: null,
				customer_type: null,
				is_member: null,
				is_paid_member: null,
				subscription_fee: null,
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
					is_staff: false,
					is_superuser: false,
					is_cutomer: true,
					is_vendor: false,
					is_sales_rep: false,
					is_warehouse_ee: false,
					barcode: {},
					groups: [],
					permissions: [],
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
			this.accountSettings.editProfile = true;
			this.hideUpdateUserButtons = true;
			this.hideCreateUser = true;
			this.accountSettings.hideSaveItem = true;
			
		},
		toggleEditProfile() {
			this.accountSettings.editProfile = !this.accountSettings.editProfile;
			this.hideUpdateUserButtons = !this.hideUpdateUserButtons;
			this.hideCreateUser = !this.hideCreateUser;
			this.accountSettings.hideSaveItem = true;
			this.accountSettings.showPasswordReset = !this.accountSettings.showPasswordReset;
		},
		async newUserButton() {
			//Show/Hide Edit Fields and buttons
			let response = await this.clearUserFormData();
			console.log("addNewuserButton response", response);
			this.accountSettings.editProfile = true;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = true;
			this.accountSettings.hideSaveItem = false;
			this.accountSettings.activeTab = 0;
			this.accountSettings.showPasswordReset = false;
		},
		async clearandResetButton() {
			await this.clearUserFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.accountSettings.editProfile = false;
			this.hideUpdateUserButtons = false;
			this.hideCreateUser = false;
			this.accountSettings.hideSaveItem = true;
			this.accountSettings.activeTab = 0;
			this.activeStep = 0;
			this.$store.commit("RESET_ERRORS");
			this.uploadMessage = "";
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
		},
		async createCustomerandNew() {
			this.$store.commit("RESET_ERRORS");
			console.log("createCustomerandNew");
			//invoke the create user and create customer function
			let createUserRes = await this.POSTCustomer();
			console.log("createUserRes", createUserRes);
			//Populate Fields with Created Instance
			this.resetViewtoHome();
			this.newUserButton();
			console.log("createCustomerandNew All Done");
		},
		async createCustomerandEdit() {
			this.$store.commit("RESET_ERRORS");
			console.log("createCustomerandEdit");
			//invoke the create user and create customer function
			let createCustomerRes = await this.POSTCustomer();
			console.log("createCustomerRes", createCustomerRes);
			await this.clearUserFormData();
			//Populate Fields with Created Instance
			this.showUserData(createCustomerRes.id);
			this.showEditProfile();
			console.log("createCustomerandEdit All Done createUserRes");
		},
		async createCustomerandClose() {
			this.$store.commit("RESET_ERRORS");
			console.log("createCustomerandClose");
			//invoke the create user and create customer function
			let response = await this.POSTCustomer();
			console.log("createCustomerandClose response", response);
			//Populate Fields with Created Instance
			if(response != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				this.$f7.dialog.alert("You had some errors on your submission").open();
			}
			//Load current users data next
			console.log("createCustomerandClose All Done");
		},

		POSTCustomer() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				this.$f7.preloader.show();
				// Await addUser then await AddCustomer using email address to find user in Django
				this.customerForm.user.bio = this.$refs.userBio.f7TextEditor.contentEl.innerHTML;

				console.log("Create User this.customerForm.user", this.customerForm.user);
				//Create UnLinked Copy of Form
				var customerFormCopy = JSON.parse(JSON.stringify(this.customerForm));

				console.log("customerFormCopy", customerFormCopy);
				let response = await this.$store.dispatch("POSTUser", customerFormCopy.user);
				console.log("POSTCustomer POSTUser response: ", response);

				if (response.status === 200 || response.status === 201) {
					console.log("Response 201");
					newUserForm = response.data;
				} else {
					this.$f7.preloader.hide();
					response.type = "Create User";
					if (!response.status) {
						response.status = 401;
						this.$store.dispatch("updateNotification", response);
					} 
					return reject(response.message);
				}

				this.customerForm["user"] = newUserForm.id;
				console.log("Successful User created:", newUserForm);

				//-------------------------------------------------------------------------------------//

				//Get Company ID (from each company type) and UserID add to Customer Form
				console.log("this.customerForm", this.customerForm);
				var companyOBJ = {};
				if (this.accountSettings.accountPlatform.is_datacom) {
					companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_datacom companyOBJ", companyOBJ);
					this.customerForm["datacom"] = companyOBJ.id;
				} else if (this.accountSettings.accountPlatform.is_partner) {
					companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_partner companyOBJ", companyOBJ);
					this.customerForm["partner"] = companyOBJ.id;
				} else if (this.accountSettings.accountPlatform.is_merchant) {
					companyOBJ = this.Companies.companyList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
					console.log("is_merchant companyOBJ", companyOBJ);
					this.customerForm["company"] = companyOBJ.id;
				} else {
					this.$f7.preloader.hide();
					console.log("You must select a Company");
					this.$f7.dialog.alert("You must first select a Company").open();
					response.type = "Create Customer";
					response.status = 400;
					this.$store.dispatch("updateNotification", response);
					return "You must select a Company";
				}

				console.log("this.customerForm", this.customerForm);
				let custResponse = await this.$store.dispatch("POSTCustomer", this.customerForm);
				console.log("Create Customer Promise custResponse", custResponse);
				if (custResponse.status === 200 || custResponse.status === 201) {
					this.$f7.preloader.hide();
					return resolve(custResponse);
				} else {
					this.$f7.preloader.hide();
					custResponse.type = "Create Customer";
					custResponse.status = 401;
					this.$store.dispatch("updateNotification", custResponse);
					return reject(custResponse.message);
				}
			}).catch((error) => {
				console.log("Caught Promise error:", error);
				return error;
			});
		},
		refreshCustomers() {
			this.$store.dispatch("GETCustomerList");
		},
		// Populate Fields for editing in browser
		async showUserData(customerID) {
			console.log("showUserData customerID", customerID);
			this.accountSettings.showPasswordReset = true;
			this.accountSettings.activeTab = 0;
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
				await this.$store.dispatch("PATCHEmployeeProfile", this.customerForm.user).then((response) => {
					console.log("PATCH User Repsonse Update User", response);
				});
				delete this.customerForm.user;
				await this.$store.dispatch("PATCHCustomerProfile", this.customerForm).then((response) => {
					console.log("PATCH User Repsonse Update Customer", response);
				});
			} catch (error) {
				console.log("There was an error in the try catch block", error);
			}
		},
		//Set User item to inactive instead of deleting instance
		async PATCHDeleteProfile() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows[0].id;
				var findIndexID = this.Users.userList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("PATCHDeleteProfile findIndexID", findIndexID);
				if (this.Users.userList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Users.userList.length === 1) {
					let UserItem = this.Users.userList[0];
					console.log("PATCHDeleteProfile len===1 UserItem", UserItem);
					for (let key in this.customerForm) {
						this.customerForm[key] = UserItem[key];
					}
					this.customerForm.is_active = false;
					await this.$store.dispatch("PATCHDeleteProfile", this.customerForm);
				}
				if (this.Users.userList.length >= 2) {
					// Map function to assign the varibles to the form variables
					let UserItem = this.Users.userList[findIndexID];
					console.log("PATCHDeleteProfile len>=2 UserItem", UserItem);
					for (let key in this.customerForm) {
						this.customerForm[key] = UserItem[key];
					}
					this.customerForm.is_active = false;
					await this.$store.dispatch("PATCHDeleteProfile", this.customerForm);
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			await this.clearUserFormData();
		},

		logout() {
			this.$store.dispatch("signOut");
		},

		//Verified Methods
		receiveDobDate(date) {
			console.log('receiveDate date', date);
			this.customerForm.user.dob = date;
		},
		
	},
	computed: {
		...mapState(["Auth", "Locale", "Static", "Errors", "Common", "VTHPP"]),
		...mapState(["Users", "Merchants", "Datacom", "Partners", "Customers"]),
		...mapGetters(["GET_USER_LIST", "GET_STATE_LIST", "getcustomerCreditCardsList"]),
		...mapGetters(["GET_CUSTOMER_ERRORS_LIST", "GET_CUSTOMER_ERROR_HANDLE"]),
		errorData() {
			return this.GET_CUSTOMER_ERRORS_LIST
		},
		errorHandle() {
			return this.GET_CUSTOMER_ERROR_HANDLE
		},
		canSubmitUserForm() {
			if (this.Auth.isAuthenticated) {
				if (this.accountSettings.accountPlatform.is_datacom) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_partner) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_merchant) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_vendor) {
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

	},
	on: {}
};
</script>

<style lang="scss" scoped>

</style>
