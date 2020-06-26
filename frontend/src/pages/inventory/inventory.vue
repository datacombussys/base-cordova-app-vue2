<template>
	<f7-page name="inventoryitem">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
		<!-- Main Container Row -->
		<f7-row>
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
						<f7-block class="display-block full-height">
							<f7-card>
								<f7-card-header class="no-border hovering" valign="bottom" style="background-color: lightgrey;">
									<f7-row class="full-width">
										<f7-col width="50" class="align-self-flex-end">
											<f7-block-title class="full-width no-margin-bottom">Product</f7-block-title>
										</f7-col>
										<f7-col width="50" class="text-align-right">
											<f7-link sheet-open=".inventory-image">
												<b-icon class="edit-icon" icon="pencil"></b-icon>
											</f7-link>
										</f7-col>
									</f7-row>
								</f7-card-header>
								<f7-card-content>
									<f7-row v-if="!invForm.profile_img" class="display-flex justify-content-center">
										<img
											src="/static/Databoxx-BoxLogo-175x196.png"
											style="width:150px;height:170px;"
											alt="Please load item to add image"
										/>
									</f7-row>
									<f7-row v-if="invForm.profile_img" class="display-flex justify-content-center">
										<img :src="invForm.profile_img" style="width:150px;height:150px;" alt="" />
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
									<f7-block-title medium class="margin-top-half text-align-center">{{ invForm.name }}</f7-block-title>
								</f7-card-footer>
							</f7-card>

							<profile-card-component :profileForm="invForm" :cardSettings="profileCardSettings"></profile-card-component>

							<f7-card>
								<f7-card-content class="padding-half text-align-center">
									<f7-row v-show="!hideCreateItem">
										<f7-col>
											<f7-button @click="newItemButton" fill class="bg-color-red">Add New Item</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="full-width" v-show="!hideSaveItem">
										<f7-col width="100" class="display-flex margin">
											<f7-button fill @click="createItemandClose" class="bg-color-green trans-btn-left"
												><span>Save Item</span></f7-button
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
														@click.prevent="createItemandNew"
														popover-close
														title="Save and New"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createItemandEdit"
														popover-close
														title="Save and Edit"
													></f7-list-item>
													<f7-list-item
														link="#"
														no-chevron
														@click.prevent="createItemandClose"
														popover-close
														title="Save and Close"
													></f7-list-item>
												</f7-list>
											</f7-popover>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-center" v-if="hideCreateItem">
										<f7-col width="90" class="no-paddign">
											<f7-button @click="clearandResetButton" fill class="bg-color-red">Clear Data</f7-button>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-card>
							<f7-col class="no-margin no-padding">
								<f7-button @click="testingMethod($event)" fill class="bg-color-orange">test</f7-button>
							</f7-col>
							<!--<f7-col>
                  <f7-button fill @click="testingMethod" class="bg-color-blue">TestButton</f7-button>
                </f7-col>-->
							<f7-block></f7-block>
						</f7-block>
					</div>
				</div>
				<!-- End Scrollbar (dragger) -->
			</f7-col>
			<!-- END Left Column -->

			<!-- Right Column -->
			<f7-col width="100" medium="70">
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
						<f7-block>
							<f7-row class="full-width display-flex justify-content-center">
								<div v-if="Errors.invErrorHandle" class="left message is-danger">
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
												<f7-link icon-only>
													<i size="30" class="material-icons">multiline_chart </i>
												</f7-link>
												<p>Statistics</p>
											</div>
										</f7-col>
										<f7-col width="25">
											<div class="dashboard-icons">
												<f7-link icon-only>
													<i size="30" class="material-icons"
														>notifications
														<f7-badge color="red">5</f7-badge>
													</i>
												</f7-link>
												<p>Notifications</p>
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
											<f7-list simple-list v-show="!editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Product / Service Details</f7-block-title>
													<f7-col width="50">
														<p>Product Name:</p>
														<f7-list-item :title="invForm.name"></f7-list-item>
														<p>Model:</p>
														<f7-list-item :title="invForm.model"></f7-list-item>
														<p>Prodcut ID:</p>
														<f7-list-item :title="invForm.product_id"></f7-list-item>
														<p>Category:</p>
														<f7-list-item :title="invCategory.name"></f7-list-item>
														<p>ISBN:</p>
														<f7-list-item :title="invForm.isbn"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Manufacturer:</p>
														<f7-list-item :title="invForm.manufacturer"></f7-list-item>
														<p>Model Number:</p>
														<f7-list-item :title="invForm.model_number"></f7-list-item>
														<p>Product Type:</p>
														<f7-list-item :title="invForm.product_type"></f7-list-item>
														<p>SKU:</p>
														<f7-list-item :title="invForm.sku"></f7-list-item>
														<p>Tags:</p>
														<f7-list-item :title="invForm.tags"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Options</f7-block-title>
													<f7-col width="50">
														<p>This Product is a Variation:</p>
														<f7-list-item>
															<f7-toggle disabled :checked="invForm.is_variation"></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Parent Item:</p>
														<f7-list-item :title="invForm.parent_item"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Supplier</f7-block-title>
													<f7-col width="50">
														<p>Product Supplier:</p>
														<f7-list-item title="D&D Distributing"> </f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Phone Number:</p>
														<f7-list-item title="800-858-8588"></f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Profile Display List -->
											<!-- Begin Profile Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Product / Service Details</f7-block-title>
													<f7-col width="50">
														<p>Product Name:<span style="color: red;">*</span></p>
														<f7-list-input
															type="text"
															validate-on-blur
															required
															error-message="Product name is required"
															:value="invForm.name"
															@input="invForm.name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'name'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Manufacturer:</p>
														<f7-list-input
															type="text"
															:value="invForm.manufacturer"
															@input="invForm.manufacturer = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'manufacturer'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Model:</p>
														<f7-list-input
															type="text"
															:value="invForm.model"
															@input="invForm.model = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'model'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Model Number:</p>
														<f7-list-input
															type="text"
															:value="invForm.model_number"
															@input="invForm.model_number = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'model_number'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Prodcut ID:</p>
														<f7-list-input
															type="text"
															:value="invForm.product_id"
															@input="invForm.product_id = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'product_id'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Product Type:</p>
														<f7-list-input
															type="text"
															:value="invForm.product_type"
															@input="invForm.product_type = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'product_type'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="25">
														<p>Category:</p>
														<f7-list-input
															type="select"
															:value="invCategory.name"
															@input="invCategory.name = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option v-for="cat in Inventory.categories" :key="cat.id">{{ cat.name }}</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="20">
														<p>Edit Categories:</p>
														<f7-button small popup-open=".category-popup" fill>Edit</f7-button>
													</f7-col>
													<f7-col width="50">
														<p>SKU:</p>
														<f7-list-input
															type="text"
															:value="invForm.sku"
															@input="invForm.sku = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'sku'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>ISBN:</p>
														<f7-list-input
															type="text"
															validate
															pattern="[0-9]*"
															error-message="Numbers only. No dashes or special characters"
															:value="invForm.isbn"
															@input="invForm.isbn = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'isbn'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Tags:</p>
														<f7-list-input
															type="text"
															:value="invForm.tags"
															@input="invForm.tags = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'tags'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Options</f7-block-title>
													<f7-col width="50">
														<p>This Product is a Variation:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_variation"
																@change="invForm.is_variation = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Parent Item:</p>
														<f7-list-input
															type="select"
															:value="invForm.parent_item"
															@input="invForm.parent_item = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="Loafers">Loafers</option>
															<option value="Sneakers">Sneakers</option>
															<option value="Running Shoes">Running Shoes</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Supplier</f7-block-title>
													<f7-col width="50">
														<p>Product Supplier:</p>
														<f7-list-input
															type="select"
															:value="invForm.supplier"
															@input="invForm.supplier = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="ABC Distributing">ABC Distributing</option>
															<option value="JIT Distributing">JIT Distributing</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p>Phone Number:</p>
														<f7-list-item title="800-565-5555"></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- Delete Update -->
												<f7-row>
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red" @click="deleteInventoryItem">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="putInventoryItem">Update</f7-button>
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

								<!-- Begin Inventory Tab -->
								<b-tab-item label="Inventory" icon="warehouse" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Inventory</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Inventory Display List -->
											<f7-list simple-list v-show="!editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Inventory Details</f7-block-title>
													<f7-col width="50">
														<p>Is Service:</p>
														<f7-list-item>
															<f7-toggle disabled :checked="invForm.is_service"></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Enable Inventory Tacking:</p>
														<f7-list-item>
															<f7-toggle disabled :checked="invForm.is_tracked"></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Warehouse Details</f7-block-title>
													<f7-col width="50"
														><p>Warehouse Name:</p>
														<f7-list-item title="West Coast"></f7-list-item>
														<p>Qty on Hand:</p>
														<f7-list-item :title="invForm.qty_on_hand"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Warehouse Location:</p>
														<f7-list-item title="250 N. State St."></f7-list-item>
														<p>Reorder Level:</p>
														<f7-list-item :title="invForm.reorder_level"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Weight</f7-block-title>
													<f7-col width="50">
														<p>Weight:</p>
														<f7-list-item :title="invForm.weight"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Unit of Measure:</p>
														<f7-list-item :title="invForm.uom_weight"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Dimensions</f7-block-title>
													<f7-col width="50">
														<p>Width:</p>
														<f7-list-item :title="invForm.width"></f7-list-item>
														<p>Length:</p>
														<f7-list-item :title="invForm.length"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Unit of Measure:</p>
														<f7-list-item :title="invForm.uom_dimensions"></f7-list-item>
														<p>Height:</p>
														<f7-list-item :title="invForm.height"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Barcode Details</f7-block-title>
													<f7-col width="50">
														<p>Barcode:</p>
														<img :src="barcode.image" style="width:200px;" :alt="barcode.barcode_number" />
													</f7-col>
													<f7-col width="50">
														<p>Barcode Number:</p>
														<div>{{ barcode.barcode_number }}</div>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Inventory Display List -->
											<!-- Begin Inventory Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Inventory Details</f7-block-title>
													<f7-col width="50">
														<p>Is Service:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_service"
																@change="invForm.is_service = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Enable Inventory Tacking:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_tracked"
																@change="invForm.is_tracked = $event.target.checked"
																:disabled="invForm.is_service"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>

												<f7-row>
													<f7-block-title class="full-width" medium>Warehouse Details</f7-block-title>
													<f7-col width="50">
														<p>Warehouse Name:</p>
														<f7-list-input
															type="select"
															:disabled="invForm.is_service"
															style="background: rgb(216,252,253)"
														>
															<option value="West Coast">West Coast</option>
															<option value="East Coast">East Coast</option>
															<option value="MidWest">MidWest</option>
														</f7-list-input>
														<p>Qty on Hand:</p>
														<f7-list-item :title="invForm.qty_on_hand"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Warehouse Location:</p>
														<f7-list-item title="2500 N. State St."></f7-list-item>
														<p>Reorder Level:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="number"
															step="1.0"
															validate-on-blur
															error-message="Whole numbers only please."
															:value="invForm.reorder_level"
															@input="invForm.reorder_level = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'reorder_level'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Weight</f7-block-title>
													<f7-col width="50">
														<p>Weight:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="number"
															step="0.01"
															validate-on-blur
															error-message="Numbers only. 2 decimal places."
															:value="invForm.weight"
															@input="invForm.weight = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'weight'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Unit of Measure:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="select"
															:value="invForm.uom_weight"
															@input="invForm.uom_weight = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="grams">grams</option>
															<option value="oz">oz</option>
															<option value="lbs">lbs</option>
															<option value="kg">kg</option>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'uom_weight'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Dimensions</f7-block-title>
													<f7-col width="50">
														<p>Width:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="number"
															step="0.01"
															validate-on-blur
															error-message="Numbers only. 2 decimal places."
															:value="invForm.width"
															@input="invForm.width = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'width'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
														<p>Length:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="number"
															step="0.01"
															validate-on-blur
															error-message="Numbers only. 2 decimal places."
															:value="invForm.length"
															@input="invForm.length = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'length'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>Unit of Measure:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="select"
															:value="invForm.uom_dimensions"
															@input="invForm.uom_dimensions = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="mm">mm</option>
															<option value="inches">inches</option>
															<option value="feet">feet</option>
														</f7-list-input>
														<p>Height:</p>
														<f7-list-input
															:disabled="invForm.is_service"
															type="number"
															step="0.01"
															validate-on-blur
															error-message="Numbers only. 2 decimal places."
															:value="invForm.height"
															@input="invForm.height = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'height'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Barcode Details</f7-block-title>
													<f7-col width="50">
														<p>Barcode:</p>
														<img :src="barcode.image" style="width:200px;" :alt="barcode.barcode_number" />
													</f7-col>
													<f7-col width="50">
														<p>Generate New Barcode:</p>
														<f7-button fill @click="generateNewBarcode" disabled>Generate New Barcode</f7-button>
														<f7-button class="margin-top" fill @click="generateNewBarcode" disabled
															>Assign New Barcode</f7-button
														>
													</f7-col>
												</f7-row>
												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="putInventoryItem">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
												<f7-block class="full-width" v-if="!hideSaveItem">
													<f7-row class="margin-top level-right">
														<f7-col width="25">
															<f7-button fill @click="activeTab = 2" class="bg-color-deeporange">Next -></f7-button>
														</f7-col>
													</f7-row>
												</f7-block>
											</f7-list>
											<!-- END Inventory Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Inventory Tab -->

								<!-- Begin Sales Tab -->
								<b-tab-item label="Sales" icon="point-of-sale" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Sales</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Sales Display List Hide to Edit -->
											<f7-list simple-list v-show="!editProfile">
												<f7-row>
													<f7-col width="50">
														<p>Show on Website:</p>
														<f7-list-item>
															<f7-toggle :checked="invForm.is_on_website" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Is Downloadable:</p>
														<f7-list-item>
															<f7-toggle :checked="invForm.is_downloadable" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-row class="full-width margin">
														<f7-col>
															<p>Product Description:</p>
															<div
																style="height:100px;width:100%; border: 1px solid gray;"
																v-html="invForm.product_desc"
															></div>
														</f7-col>
													</f7-row>
													<f7-row class="full-width margin">
														<f7-col>
															<p>Vendor Notes:</p>
															<div
																style="height:100px;width:100%; border: 1px solid gray;"
																v-html="invForm.vendor_notes"
															></div>
														</f7-col>
													</f7-row>
													<f7-row class="full-width margin">
														<f7-col>
															<p>Sales Notes:</p>
															<div
																style="height:100px;width:100%; border: 1px solid gray;"
																v-html="invForm.sales_notes"
															></div>
														</f7-col>
													</f7-row>
												</f7-row>
											</f7-list>
											<!-- END Sales Display -->
											<!-- Begin Sales Edit-->
											<f7-list simple-list v-show="editProfile">
												<f7-row>
													<f7-col width="50">
														<p>Show on Website:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_on_website"
																@change="invForm.is_on_website = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Is Downloadable:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_downloadable"
																@change="invForm.is_downloadable = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="100">
														<p>Product Description:</p>
														<f7-text-editor ref="productDesc" style="background: rgb(216,252,253)" />
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="100">
														<p>Vendor Notes:</p>
														<f7-text-editor ref="vendorNotes" style="background: rgb(216,252,253)" />
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="100">
														<p>Sales Notes:</p>
														<f7-text-editor ref="salesNotes" style="background: rgb(216,252,253)" />
													</f7-col>
												</f7-row>
												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="putInventoryItem">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
												<f7-row>
													<f7-block class="full-width" v-if="!hideSaveItem">
														<f7-row class="margin-top level-right">
															<f7-col width="25">
																<f7-button fill @click="activeTab = 3" class="bg-color-deeporange">Next -></f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END Sales Edit List -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Sales Tab -->

								<!-- Begin Finance Tab -->
								<b-tab-item label="Finance" icon="cash-usd-outline" class="no-padding">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border hovering" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Finance</f7-block-title>
												</f7-col>
												<f7-col width="50" class="text-align-right">
													<f7-link @click="toggleEditProfile">
														<b-icon icon="pencil" class="edit-icon"></b-icon>
													</f7-link>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Finance List Hide to Edit -->
											<f7-list simple-list v-show="!editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Pricing Information</f7-block-title>
													<f7-col width="50">
														<p>Purchase Price:</p>
														<f7-list-item :title="invForm.purchase_price"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>List Price:</p>
														<f7-list-item :title="invForm.list_price"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Wholesale List Price:</p>
														<f7-list-item :title="invForm.wholesale_price"></f7-list-item>
													</f7-col>
													<f7-col width="25">
														<p>Retail Margin:</p>
														<f7-list-item :title="invForm.retail_margin | percentage"></f7-list-item>
													</f7-col>
													<f7-col width="25">
														<p>Wholesale Margin:</p>
														<f7-list-item :title="invForm.wholesale_margin | percentage"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>On-Sale Information</f7-block-title>
													<f7-col width="25">
														<p>On Sale?</p>
														<f7-list-item>
															<f7-toggle :checked="invForm.is_on_sale" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="25">
														<p>Sale Price:</p>
														<f7-list-item>
															<f7-list-item :title="invForm.sale_price"></f7-list-item>
														</f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Sale Expiration Date:</p>
														<f7-list-item :title="invForm.sale_expires | moment('MMM, Do, YYYY')"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Accounting Information</f7-block-title>
													<f7-col width="50">
														<p>Income Account:</p>
														<f7-list-item :title="invForm.income_acct"></f7-list-item>
													</f7-col>
													<f7-col width="50">
														<p>Expense Account:</p>
														<f7-list-item :title="invForm.expense_account"></f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Taxable:</p>
														<f7-list-item>
															<f7-toggle :checked="invForm.is_taxable" disabled></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
											</f7-list>
											<!-- END Finance Display List -->
											<!-- Begin Finance Edit List -->
											<f7-list simple-list v-show="editProfile">
												<f7-row>
													<f7-block-title class="full-width" medium>Pricing Information</f7-block-title>
													<f7-col width="50">
														<p>Purchase Price: (USD)</p>
														<f7-list-input
															type="number"
															step="0.01"
															validate-on-blur
															placeholder="$"
															error-message="Numbers only. 2 decimal places."
															:value="invForm.purchase_price"
															@input="invForm.purchase_price = $event.target.value"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'purchase_price'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="50">
														<p>List Price: (USD)<span style="color: red;">*</span></p>
														<f7-list-input
															type="number"
															required
															step="0.01"
															validate-on-blur
															placeholder="$"
															error-message="Numbers only. 2 decimal places."
															:value="invForm.list_price"
															@input="calcRetailMargin"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'list_price'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Wholesale Price: (USD)</p>
														<f7-list-input
															type="number"
															step="0.01"
															validate-on-blur
															placeholder="$"
															error-message="Numbers only. 2 decimal places."
															:value="invForm.wholesale_price"
															@input="calcWholesaleMargin"
															style="background: rgb(216,252,253)"
														>
														</f7-list-input>
														<div v-if="Errors.invErrorData.length != 0">
															<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																<div
																	class="display-flex justify-content-center"
																	:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																>
																	<div v-show="errorArray[0] === 'wholesale_price'" class="message-body">
																		{{ errorArray[1][0] }}
																	</div>
																</div>
															</div>
														</div>
													</f7-col>
													<f7-col width="25">
														<p>Retail Margin:</p>
														<f7-list-input :value="invForm.retail_margin | percentage" disabled> </f7-list-input>
													</f7-col>
													<f7-col width="25">
														<p>Wholesale Margin:</p>
														<f7-list-input :value="invForm.wholesale_margin | percentage" disabled> </f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>On-Sale Information</f7-block-title>
													<f7-col width="30">
														<p>On Sale?</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_on_sale"
																@change="invForm.is_on_sale = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
													<f7-col width="30">
														<p>Sale Price: (USD)</p>
														<f7-list-item>
															<f7-list-input
																type="text"
																step="0.01"
																validate-on-blur
																placeholder="$"
																error-message="Numbers only. 2 decimal places."
																:value="invForm.sale_price"
																@input="invForm.sale_price = $event.target.value"
																style="background: rgb(216,252,253)"
															>
															</f7-list-input>
															<div v-if="Errors.invErrorData.length != 0">
																<div class="full-width" v-for="errorArray in Errors.invErrorData" :key="errorArray.id">
																	<div
																		class="display-flex justify-content-center"
																		:class="`message ${Errors.invErrorHandle ? 'is-danger' : 'is-success'}`"
																	>
																		<div v-show="errorArray[0] === 'sale_price'" class="message-body">
																			{{ errorArray[1][0] }}
																		</div>
																	</div>
																</div>
															</div>
														</f7-list-item>
													</f7-col>
													<f7-col width="40">
														<p>Sale Expiration Date:</p>
														<f7-date-picker-component @receiveDate="receiveExpDate"></f7-date-picker-component>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-block-title class="full-width" medium>Accounting Information</f7-block-title>
													<f7-col width="50">
														<p>Income Account:</p>
														<f7-list-input
															type="select"
															:value="invForm.income_acct"
															@input="invForm.income_acct = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="Revenue">Revenue</option>
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p>Expense Account:</p>
														<f7-list-input
															type="select"
															:value="invForm.expense_acct"
															@input="invForm.expense_acct = $event.target.value"
															style="background: rgb(216,252,253)"
														>
															<option value="COGS">COGS</option>
														</f7-list-input>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<p>Taxable:</p>
														<f7-list-item>
															<f7-toggle
																:checked="invForm.is_taxable"
																@change="invForm.is_taxable = $event.target.checked"
															></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row class="margin-top">
													<f7-block class="full-width" v-if="hideUpdateItemButtons">
														<f7-row class="margin-top">
															<f7-col width="25">
																<f7-button fill class="bg-color-red">Delete</f7-button>
															</f7-col>
															<f7-col width="25">
																<f7-button fill class="bg-color-blue" @click="putInventoryItem">Update</f7-button>
															</f7-col>
														</f7-row>
													</f7-block>
												</f7-row>
											</f7-list>
											<!-- END Finance Edit List -->
											<f7-block class="full-width" v-if="!hideSaveItem">
												<f7-row class="margin-top level-right">
													<f7-col width="30" class="display-flex justify-content-end margin">
														<f7-button fill @click="createItemandClose" class="bg-color-green trans-btn-left"
															><span>Save Item</span></f7-button
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
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Finance Tab -->

								<!-- Begin Images Gallery Tab -->
								<b-tab-item label="Gallery" icon="history">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">Image Gallery</f7-block-title>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Images Gallery Section -->
											<f7-row v-if="checkedRows.length != 0">
												<f7-col>
													<f7-button sheet-open=".gallery-images">Add Images</f7-button>
												</f7-col>
											</f7-row>
											<f7-row v-if="checkedRows.length === 0">
												<f7-col>
													<div>Please select an inventory item from the database</div>
												</f7-col>
											</f7-row>
											<f7-row>
												<f7-col v-if="checkedRows.length != 0">
													<article v-for="photo in Inventory.inventoryGalleryImgs" :key="photo.id" class="media">
														<figure class="media-left">
															<p class="image is-96x96">
																<img
																	v-if="Inventory.inventoryGalleryImgs.length == 0"
																	src="https://bulma.io/images/placeholders/128x128.png"
																/>
																<img v-if="Inventory.inventoryGalleryImgs.length != 0" :src="photo.image" />
															</p>
														</figure>
														<div class="media-content">
															<div class="content">
																<strong>Title: {{ photo.title }}</strong> <br />
																<div>Subtitle: {{ photo.sub_title }}</div>
																<small>Size: {{ photo.size / 1000 + "Mb" }}</small>
															</div>
															<nav class="level is-mobile">
																<div class="level-left">
																	<a class="level-item">
																		<span class="icon is-small"><i class="fa-reply"></i></span>
																	</a>
																	<a class="level-item">
																		<span class="icon is-small"><i class="fa-retweet"></i></span>
																	</a>
																	<a class="level-item">
																		<span class="icon is-small"><i class="fa-heart"></i></span>
																	</a>
																</div>
															</nav>
														</div>
														<div class="media-right">
															<button @click.prevent="deleteInvGalleryImg(photo.id)" class="delete"></button>
														</div>
													</article>
												</f7-col>
											</f7-row>

											<!-- END Images Gallery Section -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END Images Gallery Tab -->

								<!-- Begin History Tab -->
								<b-tab-item label="History" icon="history">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width">
												<f7-col width="50" class="align-self-flex-end">
													<f7-block-title class="full-width">History</f7-block-title>
												</f7-col>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin History Section -->
											<f7-row v-if="invForm.id === null">
												<f7-col>
													<p class="text-align-center">Please select an inventory item to see sales history.</p>
												</f7-col>
											</f7-row>
											<f7-row class="text-align-center" v-if="Orders.transactions.length === 0 && invForm.id != null">
												<f7-col>
													<p class="text-align-center">There are no order for this product at this time.</p>
												</f7-col>
											</f7-row>
											<f7-row v-if="Orders.transactions.length >= 1">
												<table class="full-width">
													<thead>
														<tr>
															<th class="label-cell">Date</th>
															<th class="numeric-cell">ID</th>
															<th class="medium-only">Trans Type</th>
															<th class="medium-only">Units</th>
															<th class="medium-only">Revenue</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td class="label-cell">12-25-19</td>
															<td class="numeric-cell">345362</td>
															<td class="medium-only">Sale</td>
															<td class="medium-only">400</td>
															<td class="medium-only">$15,234</td>
														</tr>
														<tr>
															<td class="label-cell">12-25-19</td>
															<td class="numeric-cell">345362</td>
															<td class="medium-only">Purchase</td>
															<td class="medium-only">400</td>
															<td class="medium-only">$-9,234</td>
														</tr>
													</tbody>
												</table>
											</f7-row>
											<!-- END History Section -->
										</f7-card-content>
									</f7-card>
								</b-tab-item>
								<!-- END History Tab -->

								<!-- Begin Database Tab -->
								<b-tab-item label="Database" icon="database">
									<f7-card class="mo-margin-top">
										<f7-card-header class="no-border" valign="bottom" style="background: lightgray">
											<f7-row class="full-width display-flex align-items-center">
												<f7-col width="25">
													<f7-block-title class="full-width">Database</f7-block-title>
												</f7-col>
												<f7-col width="25" class="text-align-left">
													<f7-link @click="refreshInventory">
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
															@click="editInventoryItem"
															popover-close
															title="Edit Item"
														></f7-list-item>
														<f7-list-item
															link="#"
															@click="deleteInventoryItem"
															popover-close
															title="Delete Item"
														></f7-list-item>
													</f7-list>
												</f7-popover>
											</f7-row>
										</f7-card-header>
										<f7-card-content>
											<!-- Begin Database Section -->
											<f7-row v-if="Inventory.inventoryList.length === 0">
												<f7-col>
													<p class="text-align-center">There are no items to display.</p>
													<p class="text-align-center">Please create a new inventory item.</p>
													<f7-row class="full-width margin-top">
														<f7-col>
															<f7-button @click="newItemButton" large fill class="bg-color-red">Add New Item</f7-button>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-row>
											<f7-row v-if="Inventory.inventoryList.length != 0">
												<b-table
													:data="Inventory.inventoryList"
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
															:class="{ 'inactive-item': !props.row.is_active }"
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
															field="date_added"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['date_added'].display"
															:label="columnsVisible['date_added'].title"
															sortable
															searchable
															centered
														>
															{{ props.row.date_added | moment("M/D/Y h:m:s") }}
														</b-table-column>

														<b-table-column
															field="name"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['name'].display"
															:label="columnsVisible['name'].title"
															sortable
															searchable
														>
															<template v-if="showDetailIcon">
																{{ props.row.name }}
															</template>
															<template v-else>
																<a @click="toggle(props.row)">
																	{{ props.row.name }}
																</a>
															</template>
														</b-table-column>

														<b-table-column
															field="category"
															:class="{ 'inactive-item': !props.row.is_active }"
															:visible="columnsVisible['category'].display"
															:label="columnsVisible['category'].title"
															sortable
															searchable
															centered
														>
															<!-- {{ (function() {return [Object.keys(props.row.category).length === 0 ? '' : props.row.category.name]})() }}     -->

															{{ props.row.category === null ? "" : props.row.category.name }}
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
			:opened="invBulkSheetOpened"
			@sheet:closed="invBulkSheetOpened = false"
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

		<!-- Product Image Upload Sheet -->
		<f7-sheet
			class="inventory-image image-sheet"
			:opened="invImageSheetOpened"
			@sheet:closed="invImageSheetOpened = false"
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
					<div class="block">
						<button class="button" fill @click="activeStep = 0">Start Over</button>
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

						<b-step-item label="Resize Image" :clickable="isStepsClickable" :type="{ 'is-success': isProfileSuccess }">
							<template>
								<f7-row>
									<f7-col width="50">
										<!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
										<vue-croppie
											ref="croppieRefInv"
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
				</section>
				<f7-block class="margin-bottom"></f7-block>
			</f7-page-content>
			<!-- END Product Sheet Content -->
		</f7-sheet>
		<!-- END Image Upload Sheet -->

		<!-- Product Image Gallery Content -->
		<f7-sheet
			class="gallery-images image-sheet"
			:opened="gallerySheetOpened"
			@sheet:closed="gallerySheetOpened = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<div class="left" v-if="uploadMessage" :class="`message ${error ? 'is-danger' : 'is-success'}`">
					<div class="message-body">{{ uploadMessage }}</div>
				</div>
				<f7-block>
					<form enctype="multipart/form-data">
						<f7-row class="justify-content-center">
							<div class="dropzone">
								<input
									type="file"
									name="invArray"
									multiple
									@change="selectFiles"
									ref="galleryfiles"
									class="input-field"
								/>
								<p v-if="!uploading" class="call-to-action">
									Drop files here
								</p>
							</div>
						</f7-row>
						<f7-row>
							<f7-col>
								<f7-block>
									<div class="field">
										<f7-row calss="full-width" v-if="files.length != 0">
											<f7-col width="20">
												<p>Name</p>
											</f7-col>
											<f7-col width="20">
												<p class="text-align-center">Title</p>
											</f7-col>
											<f7-col width="30">
												<p class="text-align-center">Subtitle</p>
											</f7-col>
											<f7-col width="20">
												<p class="text-align-center">Progress</p>
											</f7-col>
											<f7-col width="10" class="level-right">
												<p>Delete</p>
											</f7-col>
										</f7-row>
										<div
											:class="`level ${file.invalidMessage && 'has-text-danger'}`"
											v-for="(file, index) in files"
											:key="index"
										>
											<f7-row class="full-width">
												<f7-col width="20">
													<div class="level-left">
														{{ file.name }}
														<span v-if="file.invalidMessage">&nbsp; - {{ file.invalidMessage }}</span>
													</div>
												</f7-col>
												<f7-col width="20">
													<f7-input
														:value="file.title"
														@input="file.title = $event.target.value"
														type="text"
													></f7-input>
												</f7-col>
												<f7-col width="30">
													<f7-input
														:value="file.sub_title"
														@input="file.sub_title = $event.target.value"
														type="text"
													></f7-input>
												</f7-col>
												<f7-col width="20">
													<p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
														<progress class="progress"></progress>
														{{ progress }} %
													</p>
												</f7-col>
												<f7-col width="10">
													<div class="level-right">
														<a
															@click.prevent="
																files.splice(index, 1);
																uploadFiles.splice(index, 1);
															"
															class="delete"
														>
														</a>
													</div>
												</f7-col>
											</f7-row>
										</div>
									</div>
								</f7-block>
							</f7-col>
						</f7-row>
						<f7-row class="margin">
							<f7-col width="50">
								<f7-button fill @click.prevent="sendFiles">Submit</f7-button>
							</f7-col>
							<f7-col width="50">
								<f7-button fill @click.prevent="testingMethod">Test</f7-button>
							</f7-col>
						</f7-row>
					</form>
				</f7-block>
			</f7-page-content>
			<!-- END Product Image Gallery Content -->
		</f7-sheet>

		<!-- Categories Popup -->
		<f7-popup class="category-popup" :opened="catPopupOpened" @popup:closed="catPopupOpened = false">
			<f7-page>
				<f7-navbar title="Inventory Categories">
					<f7-nav-right>
						<f7-link popup-close>Close</f7-link>
					</f7-nav-right>
				</f7-navbar>
				<f7-block>
					<f7-row>
						<f7-col width="50">
							<f7-list>
								<p>New Category:</p>
								<f7-list-input :value="invCategory.name" @input="invCategory.name = $event.target.value" type="text">
								</f7-list-input>
							</f7-list>
							<f7-button class="margin" @click="addCategory">Add Category</f7-button>
						</f7-col>
						<f7-col width="50">
							<p class="field-title">All Departments</p>
							<div
								class="full-width display-flex justify-content-space-around"
								v-for="(category, index) in getInventoryCategories"
								:key="index"
							>
								<div class="margin-half full-width">{{ category.name }}</div>
								<div class="delete" @click="deleteCategory(category.name)"></div>
							</div>
						</f7-col>
					</f7-row>
					<f7-row>
						<!--<f7-col width="100">
                <f7-button @click="saveCategories" fill>Save Categories</f7-button>
              </f7-col>-->
					</f7-row>
				</f7-block>
			</f7-page>
		</f7-popup>
		<!-- END Categories Popup -->
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";
import Croppie from "croppie";

var moment = require("moment");
var momenttz = require("moment-timezone");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";
import { LocaleMixin } from "@/mixins/businesses/locale-mixins";

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import profileCardComponent from "@/components/layout-elements/profile-card-component.vue";
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datepicker-component.vue';

export default {
	name: "inventoryItem",
	mixins: [
		UniversalMixins, 
		LocaleMixin
		],
	components: {
		"nav-bar-component": navBarComponent,
		"profile-card-component": profileCardComponent,
		"f7-date-picker-component": f7DatePickerComponent,
	},
	data() {
		return {
			//Page Settings
			pageSettings: {
				leftNavDrawer: ".warehouse-panel",
				pageTitle: "Inventory Profile"
			},
			profileCardSettings: {
				type: "inventory",
				title: "Inventory Details"
			},
			moduleInfo: {
				name: "inventory",
				type: "profile",
				level: 5
			},
			//Scrollbar Settings
			settings: {
				maxScrollbarLength: 120
			},
			//Page Setting for CRUD Display
			editProfile: false,
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			hideSaveItem: true,
			//Popups and Sheets
			catPopupOpened: false,
			invImageSheetOpened: false,
			gallerySheetOpened: false,
			invBulkSheetOpened: false,
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
			//Buefy Tabs
			activeTab: 0,
			//Begin DataTable Info
			showDetailIcon: true,
			checkedRows: [],
			columnsVisible: {
				profile_img: { title: "Image", display: true },
				date_added: { title: "Date Added", display: true },
				id: { title: "ID", display: true },
				name: { title: "Name", display: true },
				category: { title: "Category", display: true },
				is_active: { title: "Status", display: true }
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
			isAnimated: true,
			hasNavigation: true,
			customNavigation: true,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: false,
			isProfileSuccess: false,
			//Inventory Form Items
			categories: [],
			saleExpireCalendar: [],
			invForm: {
				company: null,
				partner: null,
				datacom: null,
				vendor: null,
				warehouse_loc: null,
				category: null,
				id: null,
				name: null,
				global_id: null,
				manufacturer: null,
				model: null,
				model_number: null,
				date_added: null,
				profile_img: null,
				gallery_imgs: null,
				is_service: false,
				is_active: true,
				is_variation: false,
				is_tracked: false,
				is_downloadable: false,
				is_on_website: false,
				is_on_sale: false,
				is_taxable: false,
				parent_item: null,
				product_id: null,
				sku: null,
				product_type: null,
				isbn: null,
				tags: null,
				sales_notes: null,
				vendor_notes: null,
				product_desc: null,
				list_price: null,
				purchase_price: null,
				wholesale_price: null,
				disocunt: null,
				sale_price: null,
				sale_expires: null,
				income_acct: null,
				expense_acct: null,
				retail_margin: 0,
				wholesale_margin: 0,
				qty_on_hand: 0,
				reorder_level: 0,
				weight: 0,
				uom_weight: null,
				width: 0,
				length: 0,
				height: 0,
				uom_dimensions: null
			},
			invCategory: {
				id: null,
				name: null
			},
			invImgGallery: {
				files: null,
				title: null,
				sub_title: ""
			},
			barcode: {
				title: null,
				image: null,
				barcode_number: null
			}
		};
	},
	methods: {
		testingMethod(e) {
			// console.log("this.category", this.invCategory);
			console.log("this.invForm", this.invForm);

			console.log("this.Auth.axiosHeader", this.Auth.axiosHeader);
			this.$store.dispatch("getInventoryList");
		},
		addCategory() {
			console.log("adding new category");
			var categoryObj = this.invCategory;
			delete categoryObj.id;
			this.$store.dispatch("createCategories", categoryObj);
		},
		saveCategories() {
			console.log("this.categories", this.categories);
			this.$store.dispatch("createCategories", this.categories);
		},
		deleteCategory(name) {
			//I need to do a search for inventory items that already have a category attached to them that are being deleted
			//Ask the user if they want to delete the categories from the items first. Otherwise prevent deletion.
			var categoryObj = this.Inventory.inventoryList.find((elem) => elem.name === name);
			console.log("categoryObj", categoryObj);
			this.$store.dispatch("deleteInventoryCategories", categoryObj.id);
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
		async createItemandNew() {
			console.log("createInventoryandNew Start");
			let reponse = await this.createInventory();
			console.log("reponse", reponse);
			//Clear Form and Reset to Starting Editing Position
			console.log("createInventoryandNew All Done", reponse);
			this.resetViewtoHome();
			this.newItemButton();
		},
		async createItemandEdit() {
			console.log("createInventoryandEdit Start");
			let reponse = await this.createInventory();
			console.log("reponse", reponse);
			//Populate Fields with Created Instance
			await this.editInventoryItem(reponse.id);
			this.showEditProfile();
			console.log("createInventoryandEdit All Done", reponse);
		},
		async createItemandClose() {
			console.log("createInventoryandClose Start");
			let newitem = await this.createInventory();
			console.log("newitem", newitem);
			//Clear Form and Reset to Starting Viewing Position
			console.log("createInventoryandClose All Done");
			await this.clearFormData();
			this.resetViewtoHome();
		},
		async createInventory() {
			this.$store.commit("RESET_ERRORS");
			try {
				this.$f7.preloader.show();
				this.invForm.sales_notes = this.$refs.salesNotes.f7TextEditor.contentEl.innerHTML;
				this.invForm.vendor_notes = this.$refs.vendorNotes.f7TextEditor.contentEl.innerHTML;
				this.invForm.product_desc = this.$refs.productDesc.f7TextEditor.contentEl.innerHTML;
				this.invForm.sale_expires = this.saleExpireCalendar[0];
				// Handle the Category
				if (this.invCategory.id) {
					var catID = this.invCategory.id;
				}
				this.invForm.category_id = this.invCategory.id;

				//Dispatch creation method and update Fields with latest Object
				console.log("this.invForm pre-Action", this.invForm);

				let newInvForm = await this.setUserPlatformPOST(this.invForm);
				let response = await this.$store.dispatch("createInventory", newInvForm);
				this.$f7.preloader.hide();

				return response;
			} catch (error) {
				console.log("Promise Response Container Error Create Inventory Item", error);
			}
		},
		async refreshInventory() {
			console.log("this.getInventory", this.getInventory);
			await this.$store.dispatch("getInventoryList");
			this.getInventory;
		},
		// Populate Fields for editing in Browser
		editInventoryItem(invID) {
			return new Promise((resolve, reject) => {
				try {
					console.log("editInventoryItem invID", invID);
					this.clearFormData();
					//Get Inventory Item object and map to fields
					var inventoryListID = null;
					if (this.checkedRows.length != 0) {
						var rowID = this.checkedRows.slice(-1)[0].id;
						var findIndexID = this.Inventory.inventoryList.findIndex((elem) => {
							return elem.id == rowID;
						});
						console.log("editInventoryItem findIndexID", findIndexID);
						inventoryListID = findIndexID;
						console.log("IF inventoryListID", inventoryListID);
					} else {
						//Findindex based on ID being passed into the function
						console.log("else editInventoryItem2 invID2", invID);
						console.log("else this.Inventory.inventoryList", this.Inventory.inventoryList);
						var findObj = this.Inventory.inventoryList.findIndex((item) => item.id == invID);
						inventoryListID = findObj;
						console.log("Else inventoryListID", inventoryListID);
					}
					if (this.Inventory.inventoryList === 0) {
						//Is there a list of Inventory items to lookup?
						return "There are no inventory items available";
					}
					if (this.Inventory.inventoryList.length != 0) {
						console.log("editInventoryItem Inventory.inventoryList", this.Inventory.inventoryList);
						console.log("Available List inventoryListID", inventoryListID);

						var InventoryItem = this.Inventory.inventoryList[inventoryListID];
						console.log("editInventory InventoryItem", InventoryItem);
						for (let key in this.invForm) {
							this.invForm[key] = InventoryItem[key];
						}
					}
					this.getInventoryImages();
					//Switch View to Edit Mode
					this.resetViewtoHome();
					this.showEditProfile();
					return resolve("editInventoryItem Completed");
				} catch (error) {
					return reject(error);
				}
			});
		},
		//Get images including Barcode
		async getInventoryImages() {
			try {
				//Get Inventory Gallery Images for ID
				console.log("Get Inv Gallery Imgs this.invForm", this.invForm);
				//Wrong ID
				this.$store.dispatch("getInventoryImages", this.invForm.id);
				//Not working
				this.$forceUpdate();
				//Update Barcode and Inventory Profile Image
				if (this.getInventoryBarcodes.length === 0) {
					return "There are no barcodes";
				}
				if (this.getInventoryBarcodes.length != 0) {
					console.log("this.Inventory.inventoryBarcodes", this.Inventory.inventoryBarcodes);
					let response = await this.$store.dispatch("getInventoryBarcodesbyId", this.invForm.id);
					console.log("response", response);
					this.barcode.image = response["image"];
					this.barcode.barcode_number = response["barcode_number"];
				}
			} catch (error) {
				console.log("getInventoryImages Try Catch error", error);
			}
		},
		generateNewBarcode() {},
		//Make the PUT request to update datebase instance from updated form Data
		putInventoryItem() {
			//House Cleaning
			console.log("putInventoryItem this.invForm", this.invForm);
			this.$store.commit("RESET_ERRORS");
			this.$f7.preloader.show();

			// Handle Product Description, Vendor Notes, Sales Notes, Calendar Dates
			this.invForm.sales_notes = this.$refs.salesNotes.f7TextEditor.contentEl.innerHTML;
			this.invForm.vendor_notes = this.$refs.vendorNotes.f7TextEditor.contentEl.innerHTML;
			this.invForm.product_desc = this.$refs.productDesc.f7TextEditor.contentEl.innerHTML;
			this.invForm.sale_expires = this.saleExpireCalendar[0];
			// Handle item Categories
			// 1) Item Does have a category Selected, so add
			if (this.invCategory.name) {
				console.log("this.Inventory.categories", this.Inventory.categories);
				console.log("this.invCategory.name", this.invCategory.name);
				var findIndexCat = this.Inventory.categories.findIndex((elem) => {
					return elem.name == this.invCategory.name;
				});
				console.log("Object.keys(this.invCategory).length != 0 findIndexCat", findIndexCat);
				this.invForm.category_id = this.Inventory.categories[findIndexCat]["id"];
			}
			// Handle Product Supplier
			// Handle Warehouse Name
			// Handle Income Acocunt and Expense Account
			// remove profile_img from form
			delete this.invForm.profile_img;
			console.log("this.invForm", this.invForm);
			this.$store.dispatch("updateInventoryItem", this.invForm);
			//I may have to refresh the database Inventory items
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteInventoryItem() {
			console.log("deleteInventoryItem Start");
			this.$store.commit("RESET_ERRORS");
			// Item MUST be selected from table - No other way to delete
			if (this.checkedRows.length >= 2) {
				//Only Select one item Not more than that
				this.$store.commit("updateNotification", "You must select an item first");
			}
			if (this.checkedRows.length === 0) {
				// None have been selected
				this.$store.commit("updateNotification", "You must select an item first");
			} else {
				var inventoryListID = null;
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Inventory.inventoryList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteInventoryItem findIndexID", findIndexID);
				inventoryListID = findIndexID;

				if (this.Inventory.inventoryList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				//Populate current fields with the one in the Store
				if (this.Inventory.inventoryList.length != 0) {
					let InventoryItem = this.Inventory.inventoryList[inventoryListID];
					console.log("deleteInventoryitem len===1 InventoryItem", InventoryItem);
					for (let key in this.invForm) {
						this.invForm[key] = InventoryItem[key];
					}
					//Set to inactive
					this.invForm.is_active = false;
					await this.$store.dispatch("deleteInventoryItem", this.invForm);
				}
			}
			await this.clearFormData();
			this.resetViewtoHome();
		},
		deleteChip() {
			console.log("deleting Chip");
		},
		clearFormData() {
			return new Promise((resolve, reject) => {
				try {
					this.$store.commit("RESET_ERRORS");
					console.log("clearFormData this.invForm", this.invForm);
					for (let key in this.invForm) {
						console.log("key", this.invForm[key]);
						if (this.invForm[key] === true || this.invForm[key] === false) {
							// console.log('TF key', key);
							this.invForm[key] = false;
						} else {
							this.invForm[key] = null;
						}
					}
					for (let key in this.invImgGallery) {
						console.log("key", this.invImgGallery[key]);
						this.invImgGallery[key] = null;
					}
					////Bacode Images
					for (let key in this.barcode) {
						console.log("key", this.barcode[key]);
						this.barcode[key] = null;
					}
					//Reset Variables
					this.invForm.is_active = true;

					return resolve("clearForm Completed");
				} catch (error) {
					return reject("clearForm Failed");
				}
			});
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
		//Profile Image
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
		//Send Profile Image
		async sendFile() {
			console.log("this.invForm", this.invForm);
			console.log("this.cropped", this.cropped);
			this.invForm.profile_img = this.cropped;
			let newForm = await this.stripCompanyObject(this.invForm);
			console.log("newForm from stripCompanyObject", newForm);
			//I Need to add header information
			var token = localStorage.getItem("token");
			console.log("inventory token", token);
			try {
				let response = await axios({
					method: "put",
					headers: {
						"Content-Type": "application/json;charset=UTF-8",
						"Access-Control-Allow-Origin": "*",
						Authorization: "Token " + token
					},
					url: "/django/inventory/" + newForm.id + "/",
					data: newForm
				}).then((response) => {
					console.log("Django Image PUT response", response);
					response.type = "Update Inventory Profile Image";
					this.$store.dispatch("updateNotification", response);
					this.$store.dispatch("getInventoryList");
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
		selectFiles() {
			const files = this.$refs.galleryfiles.files;
			this.uploadFiles = [...this.files, ...files];
			this.files = [
				...this.files,
				..._.map(files, (key) => ({
					name: key.name,
					size: key.size,
					type: key.type,
					title: key.title,
					invalidMessage: this.validateFiles(key)
				}))
			];
			console.log("this.files2", this.files);
			console.log("this.uploadFiles", this.uploadFiles);
		},
		sendFiles() {
			if (this.uploadFiles.length != 0) {
				console.log("this.uploadFiles.length", this.uploadFiles);
				var lastUploadFile = this.uploadFiles.pop();
				console.log("lastUploadFile.pop", lastUploadFile);
				var lastFile = this.files.pop();
				console.log("lastFile.pop", lastFile);

				const formData = new FormData();
				if (this.validateFiles(lastUploadFile) === undefined) {
					formData.set("image", lastUploadFile);
					console.log("file[key]", lastUploadFile);
					console.log("lastFile", lastFile);
					formData.set("product", this.invForm.id);
					formData.set("title", lastFile.title);
					formData.append("sub_title", lastFile.sub_title);
					formData.append("size", lastFile.size);
					//Just logging the formData Only
					for (let pair of formData.entries()) {
						console.log("formData Pairs", pair[0] + "," + pair[1]);
					}
					try {
						this.uploading = true;
						axios({
							method: "put",
							data: formData,
							headers: {
								"Content-Type": "application/json;charset=UTF-8",
								"Access-Control-Allow-Origin": "*",
								Authorization: "Token " + token
							},
							url: "/django/inventorygallery/" + formdata.id + "/",
							onUploadProgress: function(e) {
								this.progress = Math.round((e.loaded * 100) / e.total);
							}
						}).then((response) => {
							console.log("response", response);
							this.$store.commit("APPEND_GALLERY_LIST", response.data);
							this.uploadedFiles.push(response.data.file);
							response.type = "Update Inventory Gallery Images";
							this.$store.dispatch("updateNotification", response);
						});
						this.uploading = false;
						this.message = "File has been uploaded";
						formData.delete("file");
					} catch {
						this.uploadMessage = err.response.data.error;
						this.error = true;
						this.uploading = false;
					}
				}
				console.log("formData2", formData);
				this.sendFiles();
			} else {
				console.log("Else Statement of Images, No more left");
				console.log("Else, this.invForm", this.invForm);
				this.getInventoryImages();
			}
		},
		deleteInvGalleryImg(id) {
			this.$store.dispatch("deleteInventoryImage", id);
		},
		validateFiles(file) {
			const MAX_SIZE = 5400000000;
			const allowedFileTypes = ["image/jpeg", "image/png", "image/x-png", "image/gif"];
			if (file.size > MAX_SIZE) {
				return `Max Size: ${MAX_SIZE / 1000}kb`;
			}
			if (!allowedFileTypes.includes(file.type)) {
				return "Not an Image";
			}
		},
		//Croppie JS Image Cropper
		bind() {
			var $$ = this.Dom7;
			// Bind image to Cropper
			console.log("this.fileURL from bind()", this.fileURL);
			this.$refs.croppieRefInv
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
			this.$refs.croppieRefInv.result(options, (output) => {
				this.cropped = output;
			});
		},
		// Croppie JS EVENT USAGE
		cropViaEvent() {
			this.$refs.croppieRefInv.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			// Rotates the image
			this.$refs.croppieRefInv.rotate(rotationAngle);
		},
		calcWholesaleMargin(e) {
			console.log("calcWholesaleMargin");
			this.invForm.wholesale_price = e.target.value;
			this.invForm.wholesale_margin =
				(this.invForm.wholesale_price - this.invForm.purchase_price) / this.invForm.list_price;
		},
		calcRetailMargin(e) {
			console.log("calcRetailMargin");
			this.invForm.list_price = e.target.value;
			this.invForm.retail_margin = (this.invForm.list_price - this.invForm.purchase_price) / this.invForm.list_price;
		},
		receiveExpDate(date) {
			console.log('receiveExpDate date', date);
			this.invForm.sale_expires = date;
		}
	},
	computed: {
		...mapState(["Auth", "Inventory", "Orders", "Companies", "Errors", "Static", "Users"]),
		...mapGetters(["getInventory", "getInventoryBarcodes", "getInventoryCategories", "getInventoryGallery"])
	},
	async mounted() {
		let response = await this.setUserPlatformGET();
		this.$store.dispatch("getInventoryList", response);
		this.$store.dispatch("getInventoryBarcodes");
		this.$store.dispatch("getInventoryCategories");

		// function to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefInv.bind({
			url: ""
		});
	},
	on: {}
};
</script>

<style lang="scss" scoped>
.sticky-top {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
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

//Inventory Image Database
.inventory-img {
	display: flex;
	background: rgb(255, 255, 255);
	height: 75%;
	text-align: center;
	justify-content: center;
	img {
		height: 55px;
	}
}
</style>
