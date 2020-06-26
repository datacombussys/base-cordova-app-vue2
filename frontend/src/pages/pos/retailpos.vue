<template>
	<f7-page name="retail-pos">
		<f7-row>
			<!--<f7-navbar title="POS" back-link="Back" back-link-url="/">
			</f7-navbar>-->
		</f7-row>

		<!-- Main Container Row -->
		<f7-row>
			<!-- Main Container Column -->
			<f7-col width="100" medium="100" class="fullheight">
				<!-- Main Container Block -->
				<f7-block class="no-padding no-margin">
					<!-- Top Row -->
					<f7-row class="full-width no-margin-top">
						<div class="full-width no-margin-bottom">
							<div class="display-flex justify-content-space-around main-row">
								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-row class="display-flex justify-content-space-evenly">
										<f7-col width="25" class="display-flex justify-content-start">
											<f7-row class="full-width">
												<f7-link
													class="align-self-center bg-color-gray text-color-white"
													panel-open="pos-categories"
												>
													<b-icon icon="chevron-double-right"></b-icon>
												</f7-link>
											</f7-row>
											<f7-row class="full-width">
												<f7-link
													class="bg-color-red align-self-center text-color-white"
													@click="Inventory.selectedCategory = ''"
												>
													<b-icon icon="mdi mdi-close"></b-icon>
												</f7-link>
											</f7-row>
										</f7-col>
										<f7-col width="75" class="display-flex justify-content-start">
											<f7-block-header>Transaction Type</f7-block-header>
										</f7-col>
										<f7-row class="full-width">
											<f7-col width="100" class="display-flex justify-content-space-between">
												<div
													class="tall-button time-box display-flex flex-direction-column"
													style="width:23%; border: 1px solid gray;"
												>
													<strong>
														<f7-row class="justify-content-center" style="font-size: 1.3em">{{ Static.time }}</f7-row>
													</strong>
													<f7-row class="justify-content-center" style="font-size: 1.25em">{{ Static.date }}</f7-row>
												</div>
												<f7-button
													class="tall-button padding-half"
													@click="initSale"
													fill
													:active="orderForm.isSale"
													style="width:23%;"
												>Sale</f7-button>
												<f7-button
													class="tall-button padding-half"
													@click="initReturn"
													fill
													:active="orderForm.isReturn"
													style="width:23%;"
												>Return</f7-button>
												<f7-button
													class="tall-button padding-half"
													@click="initVoid"
													fill
													:active="orderForm.isVoid"
													style="width:23%;"
												>Void</f7-button>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-col>
								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-block-header>Register Management</f7-block-header>
									<f7-row class="full-width">
										<f7-col width="100" class="display-flex justify-content-space-between">
											<f7-button
												popup-open=".open-till-popup"
												class="tall-button padding-half"
												style="width:23%;"
												fill
											>Open Till</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Close Till</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Reports</f7-button>
											<f7-button class="tall-button padding-half" style="width:23%;" fill>Drawer</f7-button>
										</f7-col>
									</f7-row>
								</f7-col>

								<f7-col width="33" class="quarterbox-top margin-left-half elevation-10">
									<f7-row class="padding-bottom display-flex justify-content-center">
										<f7-col>
											<f7-segmented raised round>
												<f7-button round active>Clerk</f7-button>
												<f7-button @click="testButton" round>Mgr</f7-button>
											</f7-segmented>
										</f7-col>
									</f7-row>
									<f7-row class="full-width">
										<f7-col width="75" class="display-flex justify-content-space-between">
											<f7-button class="bottom-button padding-half" style="width:35%;" fill>Dashboard</f7-button>
											<f7-button
												class="bottom-button padding-half bg-color-gray"
												style="width:28%;"
												fill
												sheet-open=".retail-POS-Settings"
											>Settings</f7-button>
											<f7-button
												class="bottom-button bg-color-black text-color-white padding-half margin-bottom"
												style="width:28%;"
												href="/pos-login/"
												@click="logout"
											>Logout</f7-button>
										</f7-col>
										<f7-col width="25" class="padding-top-half">
											<f7-row class="full-width display-flex justify-content-center">
												<b-switch
													:value="isOnLine"
													size="is-large"
													:type="isOnLine ? 'is-success' : 'is-danger'"
												></b-switch>
											</f7-row>
											<f7-row class="full-width display-flex justify-content-center">
												<p>Connected</p>
											</f7-row>
										</f7-col>
									</f7-row>
								</f7-col>
							</div>
						</div>
					</f7-row>
					<!-- END Top Row -->

					<!-- Middle Row  Calculator-->
					<f7-row class="full-width no-padding-top no-margin-top">
						<div class="full-width no-margin-top no-margin-bottom">
							<div class="main-row">
								<f7-row class="full-width">
									<!-- Begin Inventory -->
									<f7-col resizable class="thirdbox-middle mbox-1 no-padding display-flex elevation-10">
										<f7-row class="full-width">
											<f7-list class="full-width no-margin no-padding">
												<f7-list-input type="text" class="barcode-search" placeholder="Barcode Number">
													<f7-icon f7="barcode" slot="media"></f7-icon>
												</f7-list-input>
											</f7-list>
										</f7-row>
										<f7-row class="full-width">
											<f7-col>
												<f7-searchbar
													placeholder="Sku / Item / Description"
													searchContainer=".search-list"
													searchItem=".inventory-item"
													searchIn=".inventory-title"
													:disable-button="!$theme.aurora"
												></f7-searchbar>
											</f7-col>
										</f7-row>

										<f7-row class="inventory-row no-margin full-width full-height">
											<div
												v-bar="{
													preventParentScroll: true,
													scrollThrottle: 30
												}"
												style="height: 88%;"
											>
												<!-- el1 -->
												<div>
													<!-- el2 -->
													<!-- your scrollable content -->
													<f7-col class="inventory-div searchbar-found search-list">
														<!-- All Items in Inventory -->
														<f7-col v-if="!Inventory.selectedCategory" class="inventory-div">
															<div
																v-for="item in Inventory.inventoryList"
																:key="item.id"
																:class="orderForm.isSale || orderForm.isReturn ? '' : 'disabled'"
																class="inventory-item no-margin no-padding"
																@click="addItemToTill(item.id)"
															>
																<div class="inventory-img">
																	<img :src="item.profile_img" />
																</div>
																<div class="inventory-title">{{ item.name }}</div>
															</div>
														</f7-col>
														<f7-col v-if="Inventory.selectedCategory" class="inventory-div">
															<div
																v-for="item in categoryItems"
																:key="item.id"
																class="inventory-item no-margin no-padding"
																:class="orderForm.isSale || orderForm.isReturn ? '' : 'disabled'"
																@click="addItemToTill(item.id)"
															>
																<div class="inventory-img">
																	<img :src="item.profile_img" />
																</div>
																<div class="inventory-title">{{ item.name }}</div>
															</div>
														</f7-col>
													</f7-col>

													<f7-row class="full-width searchbar-not-found">
														<p class="text-align-center">Nothing to show</p>
													</f7-row>
												</div>
											</div>
										</f7-row>
									</f7-col>
									<!-- End Inventory -->

									<!-- Begin Calculator -->
									<f7-col
										resizable
										class="no-padding thirdbox-middle center-box display-flex flex-direction-column justify-content-center elevation-10"
									>
										<f7-row class="bg-color-black" @click="showCalc = !showCalc" style="cursor: pointer;">
											<p class="no-margin text-color-white" style="font-size: 1em;">Change View</p>
										</f7-row>
										<f7-row v-show="showCalc" class="full-width">
											<f7-col width="100">
												<div id="calculator" class="no-padding no-margin">
													<input
														type="string"
														class="calculator-input"
														:value="calc.value"
														@keyup.enter="getResult()"
													/>
													<div class="calculator-row">
														<div class="calculator-col">
															<button class="calculator-btn gray action" @click="clear()">C</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn gray action" @click="del()">del</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn gray action" @click="addExpresion('%')">%</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn accent action" @click="addExpresion('/')">/</button>
														</div>
													</div>
													<div class="calculator-row">
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(7)">7</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(8)">8</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(9)">9</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn accent action" @click="addExpresion('*')">*</button>
														</div>
													</div>
													<div class="calculator-row">
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(4)">4</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(5)">5</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(6)">6</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn accent action" @click="addExpresion('-')">-</button>
														</div>
													</div>
													<div class="calculator-row">
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(1)">1</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(2)">2</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn" @click="addExpresion(3)">3</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn accent action" @click="addExpresion('+')">+</button>
														</div>
													</div>
													<div class="calculator-row">
														<div class="calculator-col wide">
															<button class="calculator-btn" @click="addExpresion(0)">0</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn action" @click="addExpresion('.')">.</button>
														</div>
														<div class="calculator-col">
															<button class="calculator-btn accent action" @click="getResult()">=</button>
														</div>
													</div>
												</div>
											</f7-col>

											<f7-row class="calc-row no-padding full-width no-margin">
												<div class="display-flex justify-content-center flex-direction-column order-buttons-bg">
													<f7-row class="full-width">
														<f7-col class="display-flex">
															<f7-button fill class="bg-color-green calc-button">Gratuity</f7-button>
															<f7-button fill @click="saveQty" class="bg-color-green calc-button">Save</f7-button>
														</f7-col>
													</f7-row>
													<f7-row class="full-width">
														<f7-col width="50" class="display-flex">
															<f7-button fill class="calc-button" @click="canApplyDiscount">Discount</f7-button>
														</f7-col>
														<f7-col width="50">
															<f7-row>
																<f7-col width="50">
																	<f7-button fill popup-open=".popup-component" class="calc-button">Popup</f7-button>
																	<popup-component :popupSettings="popupSettings">
																		<span slot="title">Transaction Response</span>
																		<f7-block-title class="classy text-align-center" slot="errorTitle">DECLINED</f7-block-title>
																		<span slot="errorMsg">
																			<p class="field-title">Please call support for help with this issue</p>
																			<p class="field-title">Error Code: 4205</p>
																			<p class="field-title">Phone Number: 1-800-555-1212</p>
																		</span>
																	</popup-component>
																</f7-col>
																<f7-col width="50">
																	<f7-button fill @click="testButton" class="calc-button">Test</f7-button>
																</f7-col>
															</f7-row>
														</f7-col>
													</f7-row>
												</div>
											</f7-row>

											<f7-row class="calc-row no-margin">
												<div
													class="display-flex justify-content-center flex-direction-column tender-buttons-bg no-padding-bottom"
												>
													<f7-row class="tender-rows">
														<p class="no-margin" style="font-size: 1em;">Tender</p>
													</f7-row>
													<f7-row class="full-width">
														<f7-col class="display-flex">
															<f7-button fill popup-open=".cash-popup" class="bg-color blue calc-button">Cash</f7-button>
															<f7-button
																fill
																popup-open=".credit-card-popup"
																class="bg-color blue calc-button"
															>Credit</f7-button>
															<f7-button fill popup-open=".gift-card-popup" class="bg-color blue calc-button">Gift</f7-button>
														</f7-col>
													</f7-row>
												</div>
											</f7-row>
										</f7-row>

										<!-- Flip Side View -->
										<f7-row v-show="!showCalc" class="full-width">
											<f7-list>
												<f7-col width="100">
													<f7-row>
														<f7-col width="100" style="border: 2px solid black;">
															<p>barcode scanner field</p>
														</f7-col>
													</f7-row>
													<div class="no-padding no-margin">
														<p>User Notifications Go here</p>
													</div>
													<f7-row>
														<f7-col width="100" style="border: 2px solid black;">
															<p>Order Information Here</p>
															<p>Order is Open / Paid / On Hold / Voided</p>
															<p>Amount Paid / Amount Remaining</p>
														</f7-col>
													</f7-row>
												</f7-col>
											</f7-list>
										</f7-row>
									</f7-col>
									<!-- End Calculator -->
									<!-- Begin Till -->
									<f7-col resizable class="thirdbox-middle mbox-3 elevation-10">
										<div class="till justify-content-space-evenly">
											<f7-row class="full-width padding-half till-header">
												<f7-col width="5" class="display-flex justify-content-start">
													<div class="text-align-center">QTY</div>
												</f7-col>
												<f7-col width="50" class="display-flex justify-content-center">
													<div class="text-align-center">ITEM</div>
												</f7-col>
												<f7-col width="20" class="display-flex justify-content-center">
													<div class="text-align-center">EACH</div>
												</f7-col>
												<f7-col width="15" class="display-flex justify-content-center">
													<div class="text-align-center">TOTAL</div>
												</f7-col>
												<f7-col width="10" class="display-flex justify-content-center">
													<div class="text-align-center"></div>
												</f7-col>
											</f7-row>
											<!--Till Content Rows-->
											<f7-row class="align-content-flex-start till-container">
												<f7-col width="100" class="no-padding no-margin display-flex flex-direction-column">
													<div
														v-bar="{
															preventParentScroll: true,
															scrollThrottle: 30
														}"
														style="max-height: 49vh;"
													>
														<!-- el1 -->
														<div>
															<!-- el2 -->
															<!-- your scrollable content -->
															<f7-list class="no-margin">
																<f7-list-item
																	v-for="(item, index) in allItemsInTill"
																	:key="item.id"
																	class="pos-till no-margin"
																	swipeout
																>
																	<f7-row
																		@click="editSelectedItem(item.id)"
																		class="full-width display-flex justify-content-space-between padding-right-half"
																		style="cursor: pointer;"
																		:class="selectedItem.id === item.id ? 'selected-item' : ''"
																	>
																		<f7-col width="5" class="display-flex justify-content-start margin-left-half">
																			<div class="till-text">{{ item.qty }}</div>
																		</f7-col>
																		<f7-col width="40" class="flex-shrink-1">
																			<div class="till-text text-align-center">{{ item.name }}</div>
																		</f7-col>
																		<f7-col width="20">
																			<div class="till-text">{{ item.sale_price || item.list_price | formatDollar }}</div>
																		</f7-col>
																		<f7-col width="20" class="display-flex justify-content-end">
																			<div
																				class="till-text"
																			>{{ item.qty * item.sale_price || (item.qty * item.list_price) | formatDollar }}</div>
																		</f7-col>
																		<f7-col
																			width="10"
																			@click.prevent="deleteItemFromTill(index)"
																			class="display-flex justify-content-center"
																		>
																			<b-icon class="padding-top" icon="mdi mdi-close-circle-outline"></b-icon>
																		</f7-col>
																	</f7-row>
																	<f7-swipeout-actions left>
																		<f7-swipeout-button
																			delete
																			confirm-text="Are you sure you want to delete this item?"
																		>Delete</f7-swipeout-button>
																	</f7-swipeout-actions>
																</f7-list-item>
															</f7-list>
														</div>
													</div>

													<f7-row class="full-width till-totals display-flex align-items-center">
														<f7-col width="50">
															<f7-row>
																<f7-col class="total-text margin-left-half" width="50">
																	<div v-if="enableGratuity" style="font-size:1em;">Gratuity</div>
																	<div>Tax</div>
																	<div style="font-size:1em;">Discounts</div>
																</f7-col>
																<f7-col class="total-text" width="50">
																	<div
																		v-if="enableGratuity"
																		class="text-align-center"
																		style="font-size:1em;"
																	>{{ orderForm.gratuity | formatDollar }}</div>
																	<div
																		class="text-align-center"
																		style="font-size:1em;"
																	>{{ orderForm.tax | formatDollar }}</div>
																	<div
																		class="text-align-center"
																		style="font-size:1em;"
																	>({{ orderForm.totalDiscounts | formatDollar }})</div>
																</f7-col>
															</f7-row>
														</f7-col>
														<f7-col width="15" class="total-text text-align-center">
															<div>Subtotal</div>
															<div style="font-size:1.35em;">Total</div>
														</f7-col>
														<f7-col width="35" class="text-align-center total-text">
															<div>{{ orderForm.subtotal | formatDollar }}</div>
															<div style="font-size:1.35em;">{{ grandTotal | formatDollar }}</div>
														</f7-col>
													</f7-row>
												</f7-col>
												<!-- END TIll Screen -->
											</f7-row>
										</div>
									</f7-col>
									<!-- END Till -->
								</f7-row>
							</div>
						</div>
					</f7-row>
					<!-- END Middle Row -->

					<!-- Bottom Row -->
					<f7-row class="full-width">
						<div class="display-flex main-row no-margin full-width">
							<f7-col width="33" class="thirdbox-bottom full-width elevation-10">
								<f7-block-header>Lookup</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Customer</span>
									</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Transactions</span>
									</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>
										<span>Inventory</span>
									</f7-button>
								</f7-row>
							</f7-col>
							<f7-col width="33" class="thirdbox-bottom margin-left-half full-width elevation-10">
								<f7-block-header>Loyalty</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Coupons</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Gift Cards</f7-button>
									<f7-button class="bottom-button padding-half" style="width:32%;" fill>Loyalty Cards</f7-button>
								</f7-row>
							</f7-col>
							<f7-col width="33" class="thirdbox-bottom margin-left-half full-width elevation-10">
								<f7-block-header>Orders</f7-block-header>
								<f7-row class="full-width display-flex justify-content-space-between">
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Find</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Reprint</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Hold</f7-button>
									<f7-button class="bottom-button padding-half" style="width:23%;" fill>Resume</f7-button>
								</f7-row>
							</f7-col>
						</div>
					</f7-row>
					<!-- END Bottom Row -->
				</f7-block>
				<!-- END Main Container Block -->
			</f7-col>
			<!-- END Main Container Column -->
		</f7-row>
		<!-- END Main Container Row -->

		<!-- Left Panel POS Categories -->
		<div class="panel panel-left pos-categories panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Datacom Links"></f7-navbar>
					<f7-list v-if="Inventory.categories.length === 0">
						<f7-list-item view=".view-main" link="#" panel-close title="Categories are Empty"></f7-list-item>
					</f7-list>
					<f7-list v-if="Inventory.categories.length != 0">
						<f7-list-item
							v-for="cat in Inventory.categories"
							:key="cat.id"
							view=".view-main"
							link="#"
							panel-close
							:title="cat.name"
						></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Settings Sheet -->
		<f7-sheet
			class="retail-POS-Settings"
			:opened="retailPOSsheetOpened"
			@sheet:closed="retailPOSsheetOpened = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<f7-card>
					<f7-card-header class="padding">
						<f7-block-header>POS Settings</f7-block-header>
					</f7-card-header>
					<f7-card-content>
						<f7-list>
							<f7-row class="padding">
								<f7-col width="50">
									<p>Enable Gratuity</p>
									<f7-list-item>
										<f7-toggle :checked="enableGratuity" @change="enableGratuity = $event.target.checked"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="50">
									<p>Enable Cash Discount</p>
									<f7-list-item>
										<f7-toggle
											:checked="Orders.enableCashDisocunt"
											@change="Orders.enableCashDisocunt = $event.target.checked"
										></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row class="padding">
								<f7-col width="50">
									<p>Enable Gratuity</p>
									<f7-list-item>
										<f7-toggle :checked="enableGratuity" @change="enableGratuity = $event.target.checked"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="50">
									<p>Cash Discount Percentage</p>
									<f7-list-input
										type="number"
										step="0.01"
										error-message="Numbers only. 2 decimal places."
										required
										validate
										style="background: rgb(216,252,253)"
									></f7-list-input>
								</f7-col>
							</f7-row>
						</f7-list>
					</f7-card-content>
				</f7-card>
			</f7-page-content>
		</f7-sheet>
		<!-- END Settings Sheet -->

		<!-- Discount Page Popup -->
		<f7-popup
			class="discount-popup"
			:opened="DiscountpopupOpened"
			@popup:closed="
				DiscountpopupOpened = false;
				resetDiscounts;
			"
		>
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="margin-top text-color-white">Discounts</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right margin-top-half"
							@click="popupCloseDiscount($event)"
							icon-size="50"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>
				<f7-row class="full-width margin-bottom">
					<f7-button class="full-width" @click="resetDiscounts">Start Over</f7-button>
				</f7-row>
				<b-steps
					v-model="activeStepDiscount"
					:animated="isAnimated"
					:has-navigation="hasNavigation"
					:icon-prev="prevIcon"
					:icon-next="nextIcon"
				>
					<!-- Enter Manager Approval -->
					<b-step-item
						:visible="!manager.isUserManager"
						label="Manager Approval"
						:clickable="isStepsClickable"
					>
						<f7-card v-show="allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card
							v-show="!orderForm.discounts.managerApproved && !manager.invalidCredentials && allItemsInTill.length != 0"
						>
							<f7-card-content>
								<f7-row>
									<f7-col width="100">
										<f7-block-header>Barcode + PIN</f7-block-header>
										<f7-list form>
											<f7-list-input
												ref="barcodeInput"
												id="barcodeInputID"
												autofocus
												maxlength="7"
												:value="manager.loginBarcode.barcode_number"
												@input="
													changeFocus('barcodeInput', 'pinInput');
													manager.loginBarcode.barcode_number = $event.target.value;
												"
												label="Barcode Number"
												type="number"
												placeholder="10000001"
											></f7-list-input>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div v-show="errorArray[0] === 'username'" class="message-body">{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
											<f7-list-item>
												<input
													id="pinInput"
													class="pin-cell"
													type="password"
													placeholder="PIN"
													maxlength="4"
													:value="manager.loginBarcode.pin"
													@input="manager.loginBarcode.pin = $event.target.value"
													@focus="show"
													data-layout="numeric"
												/>
											</f7-list-item>
											<vue-touch-keyboard
												:options="options"
												v-show="visible"
												:layout="layout"
												:cancel="hide"
												:accept="accept"
												:input="input"
											/>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div v-show="errorArray[0] === 'password'" class="message-body">{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
											<div v-if="Errors.loginErrorData.length != 0">
												<div
													class="full-width display-flex justify-content-center no-padding-no-margin"
													v-for="errorArray in Errors.loginErrorData"
													:key="errorArray.id"
												>
													<div
														class="display-flex justify-content-center"
														:class="`message ${Errors.loginErrorHandle ? 'is-danger' : 'is-success'}`"
													>
														<div
															v-show="errorArray[0] === 'non_field_errors'"
															class="message-body"
														>{{ errorArray[1][0] }}</div>
													</div>
												</div>
											</div>
										</f7-list>
									</f7-col>
								</f7-row>
								<f7-row class="margin-top display-flex justify-content-center">
									<f7-col width="50">
										<f7-button fill @click="sendManagerCredentials">Submit</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="orderForm.discounts.managerApproved">
							<f7-card-content style="height: 175px;">
								<f7-row class="display-flex justify-content-center">
									<img src="/static/AnimatedGreenCheck.gif" />
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<p>Success.</p>
								</f7-row>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="manager.invalidCredentials">
							<f7-card-content style="height: 175px;">
								<f7-row class="display-flex justify-content-center">
									<img src="/static/AnimatedRedX.gif" />
								</f7-row>
								<f7-row class="display-flex justify-content-center">
									<p>Credentials were not approved.</p>
									<p>Please try again.</p>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</b-step-item>
					<!-- Enter Discount Type -->
					<b-step-item
						label="Select Discount Type"
						:clickable="isStepsClickable"
						:type="{ 'is-success': isProfileSuccess }"
					>
						<f7-row class="margin-top">
							<f7-col width="50">
								<f7-button outline class="tall-button" @click="selectIndividualItem">Single Item</f7-button>
							</f7-col>
							<f7-col width="50">
								<f7-button outline class="tall-button" @click="selectEntireOrder">Entire Order</f7-button>
							</f7-col>
						</f7-row>
					</b-step-item>
					<!-- Individual Item Discount -->
					<b-step-item
						:visible="orderForm.discounts.individualItemSelected"
						label="Individual Item"
						:clickable="isStepsClickable"
					>
						<f7-card v-if="allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or "Refund" to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="allItemsInTill.length != 0">
							<f7-card-content>
								<f7-list>
									<!-- Select Item to Discount -->
									<f7-row v-if="!orderForm.discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" title="Select Item"></f7-list-item>
										</f7-col>
										<f7-col
											v-if="allItemsInTill.length != 0"
											width="50"
											class="display-flex justify-content-center"
										>
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="orderForm.discounts.individualItem"
												@input="selectDiscountItem"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discountItem in allItemsInTill" :key="discountItem.id">
													{{
													discountItem.name
													}}
												</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Show Selected item -->
									<f7-row v-if="orderForm.discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" :title="orderForm.discounts.individualItem"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item
												class="checkout-text"
												:title="
													`$ ${orderForm.discounts.individualItemList[0]['price'] *
														orderForm.discounts.individualDiscountQtySelected}`
												"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- How Many items to Discount -->
									<f7-row v-if="orderForm.discounts.individualItem">
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Select Qty"></f7-list-item>
										</f7-col>
										<f7-col
											v-if="allItemsInTill.length != 0"
											width="50"
											class="display-flex justify-content-center"
										>
											<b-numberinput
												v-model="orderForm.discounts.individualDiscountQtySelected"
												step="1"
												min="1"
												:max="selectedItem.qty"
												type="is-success"
											></b-numberinput>
										</f7-col>
									</f7-row>
									<!-- Select Discount Type -->
									<f7-row v-if="showDiscountType">
										<f7-col width="50">
											<f7-list-item
												checkbox
												:disabled="discountType == 'discount-dollar'"
												:checked="discountType == 'discount-percent'"
												title="Percentage"
												name="discount-checkbox"
												value="discount-percentage"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
										<f7-col width="50">
											<f7-list-item
												checkbox
												title="Dollar Amount"
												name="discount-checkbox"
												value="discount-dollar"
												:checked="discountType == 'discount-dollar'"
												:disabled="discountType == 'discount-percentage'"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Selected Percentage Discount -->
									<f7-row
										v-if="discountType === 'discount-percentage'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount %"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="orderForm.discounts.individualItemSelectedPercent"
												@input="orderForm.discounts.individualItemSelectedPercent = $event.target.value"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discount in Orders.dicountsList" :key="discount.id">{{ discount }}%</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Selected Dollar Amount Discount -->
									<f7-row
										v-if="discountType === 'discount-dollar'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount $"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-row class="justify-content-center">
												<b-field>
													<b-numberinput
														class="checkout-text-bold"
														v-model="orderForm.discounts.individualItemAmount"
														step="0.01"
														min="0"
														:max="selectedItem.price"
														type="is-success"
													></b-numberinput>
												</b-field>
											</f7-row>
										</f7-col>
									</f7-row>
									<!-- Discount Applied Calculation-->
									<f7-row
										v-if="discountType === 'discount-percentage' || discountType === 'discount-dollar'"
									>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" title="Discount Applied"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" :title="`$ ${discountCalculation}`"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-bold" title="New Item Total"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item
													class="checkout-text-bold"
													:title="orderForm.discounts.newItemTotal | formatDollar"
												></f7-list-item>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-list>
								<f7-row>
									<f7-col>
										<f7-button
											fill
											large
											:disabled="checkToDiscountSave"
											@click="setNewItemDiscountedPrice"
										>Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</b-step-item>
					<!-- Entire Order Discount -->
					<b-step-item
						:visible="orderForm.discounts.entireOrderSelected"
						label="Entire Order"
						:clickable="isStepsClickable"
					>
						<f7-card v-if="allItemsInTill.length === 0">
							<f7-card-content>
								<p>There are no items in your till.</p>
								<p>Click on Sale" or to get started.</p>
							</f7-card-content>
						</f7-card>
						<f7-card v-if="allItemsInTill.length != 0">
							<f7-card-content>
								<f7-list>
									<!-- Show Selected item -->
									<f7-row>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" title="Order Total"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text" :title="`$ ${orderForm.total}` | formatDollar"></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Select Discount Type -->
									<f7-row v-if="!showDiscountType">
										<f7-col width="50">
											<f7-list-item
												checkbox
												:disabled="discountType == 'discount-dollar'"
												:checked="discountType == 'discount-percent'"
												title="Percentage"
												name="discount-checkbox"
												value="discount-percentage"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
										<f7-col width="50">
											<f7-list-item
												checkbox
												title="Dollar Amount"
												name="discount-checkbox"
												value="discount-dollar"
												:checked="discountType == 'discount-dollar'"
												:disabled="discountType == 'discount-percentage'"
												@change="selectDiscountType($event.target.value)"
											></f7-list-item>
										</f7-col>
									</f7-row>
									<!-- Selected Percentage Discount -->
									<f7-row
										v-if="discountType === 'discount-percentage'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount %"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-input
												class="checkout-text-bold-paid"
												type="select"
												validate-on-blur
												:value="orderForm.discounts.entireOrderPercent"
												@input="orderForm.discounts.entireOrderPercent = $event.target.value"
												style="background: rgb(216,252,253)"
											>
												<option v-for="discount in Orders.dicountsList" :key="discount.id">{{ discount }}%</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
									<!-- Selected Dollar Amount Discount -->
									<f7-row
										v-if="discountType === 'discount-dollar'"
										class="display-flex justify-content-center"
									>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-list-item class="checkout-text-paid" title="Discount $"></f7-list-item>
										</f7-col>
										<f7-col width="50" class="display-flex justify-content-center">
											<f7-row class="justify-content-center">
												<b-field>
													<b-numberinput
														class="checkout-text-bold"
														v-model="orderForm.discounts.entireOrderAmount"
														step="0.01"
														min="0"
														:max="orderForm.total"
														type="is-success"
													></b-numberinput>
												</b-field>
											</f7-row>
										</f7-col>
									</f7-row>
									<!-- Discount Applied Calculation-->
									<f7-row
										v-if="discountType === 'discount-percentage' || discountType === 'discount-dollar'"
									>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" title="Discount Applied"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-paid" :title="`$ ${discountCalculation}`"></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-bold" title="New Item Total"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item
													class="checkout-text-bold"
													:title="orderForm.discounts.newOrderTotal | formatDollar"
												></f7-list-item>
											</f7-col>
										</f7-row>
									</f7-row>
								</f7-list>
								<f7-row>
									<f7-col>
										<f7-button
											fill
											large
											:disabled="!orderForm.discounts.newItemTotal"
											@click="setNewItemDiscountedPrice"
										>Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-card-content>
						</f7-card>
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
								>Submit</f7-button>
							</f7-col>
						</f7-row>
					</template>
					<!-- END navigation Links -->
				</b-steps>
				<f7-row>
					<f7-col>
						<f7-button @click="testButton">Test Button</f7-button>
					</f7-col>
				</f7-row>
			</f7-page>
		</f7-popup>
		<!-- END Discount Page Popup -->

		<!-- Cash Payment Page Popup -->
		<f7-popup class="cash-popup" :opened="CashpopupOpened" @popup:closed="CashpopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="margin-top text-color-white">Cash Tender</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right text-color-grey margin-right"
							@click="popupCloseCashPayment($event)"
							popup-close
							icon-size="50"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>

				<f7-card>
					<f7-card-content>
						<f7-row v-show="allItemsInTill.length === 0">
							<f7-col>
								<p>Your till is empty</p>
								<p>Select "Sale" or "Refund" to get started</p>
							</f7-col>
						</f7-row>
						<f7-row v-show="showTotalPaid === false && allItemsInTill.length != 0">
							<f7-list>
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" :title="orderForm.total | currency"></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row v-if="showTotalPaid">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="$(120.00)"></f7-list-item>
									</f7-col>
								</f7-row>

								<f7-row class="display-flex justify-content-center">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-paid" title="Amount Tendered"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-input
											class="checkout-text-bold-paid"
											type="number"
											validate
											step="0.01"
											error-message="Numbers only"
											:value="orderForm.payment.cashPaidAmount"
											@input="orderForm.payment.cashPaidAmount = $event.target.value"
											style="background: rgb(216,252,253)"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row class="full-width margin-top display-flex justify-content-center">
									<f7-col width="50">
										<f7-button fill large @click="processTransactionCash">Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-row>
						<f7-row class="full-width" v-show="showTotalPaid === true && allItemsInTill.length != 0">
							<f7-list class="full-width">
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" :title="orderForm.total | currency"></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row v-if="showTotalPaid">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item
											class="checkout-text-bold-paid"
											:title="orderForm.payment.cashPaidAmount | currency"
										></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold" title="Change"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item
											class="checkout-text-bold"
											:title="(parseFloat(orderForm.payment.cashPaidAmount) - parseFloat(orderForm.total)) | currency"
										></f7-list-item>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-row>
						<!-- <f7-row class="margin-top full-width">
							<f7-col>
								<f7-button popup-close fill large>Close</f7-button>
							</f7-col>
						</f7-row>-->
					</f7-card-content>
				</f7-card>
				<f7-row>
					<f7-col>
						<f7-button @click="testButton">Test</f7-button>
					</f7-col>
				</f7-row>
			</f7-page>
		</f7-popup>
		<!-- END Cash Payment Page Popup -->

		<!-- Credit Card Payment Page Popup -->
		<f7-popup class="credit-card-popup" :opened="CCpopupOpened" @popup:closed="CCpopupOpened = false">
			<f7-page>
				<f7-row>
					<f7-col width="90" class="margin-left">
						<f7-block-title large>Credit Card Payment</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right text-color-grey margin-right"
							popup-close
							icon-size="50"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>

				<f7-card>
					<f7-card-content>
						<f7-list>
							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="$125.45"></f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row v-if="showTotalPaid">
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold-paid" title="$(120.00)"></f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row class="display-flex justify-content-center">
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-paid" title="Amount Tendered"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-input
										class="checkout-text-bold-paid"
										type="number"
										step="0.01"
										validate-on-blur
										error-message="Numbers only. 2 decimal places."
										style="background: rgb(216,252,253)"
									></f7-list-input>
								</f7-col>
							</f7-row>

							<f7-row>
								<!-- Row 1 Credit Card Number -->
								<f7-col width="100" medium="100">
									<f7-list-input
										outline
										label="Card Number"
										floating-label
										type="text"
										placeholder="Card Number"
										clear-button
									>
										<f7-icon f7="creditcard" slot="media"></f7-icon>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<!-- Row 2 - Exp Date and CVV -->
							<f7-row>
								<f7-col width="50" medium="50">
									<f7-list-input
										outline
										label="Expiration Date"
										floating-label
										type="text"
										placeholder="MMYY"
										clear-button
									>
										<f7-icon f7="cerdit_card" slot="media"></f7-icon>
									</f7-list-input>
								</f7-col>
								<f7-col width="50" medium="50">
									<f7-list-input
										outline
										label="CVV / CVV2"
										floating-label
										type="text"
										placeholder="###"
										clear-button
									></f7-list-input>
								</f7-col>
							</f7-row>

							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="Change"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="$5.65"></f7-list-item>
								</f7-col>
							</f7-row>
						</f7-list>
						<!-- Row 3 Submit Button -->
						<f7-row>
							<f7-col width="50" medium="50">
								<f7-button fill large color="deeporange">Cancel</f7-button>
							</f7-col>
							<f7-col width="50" medium="50">
								<f7-button fill large color="blue">Authorize</f7-button>
							</f7-col>
						</f7-row>
					</f7-card-content>
				</f7-card>
			</f7-page>
		</f7-popup>
		<!-- END Credit Card Payment Page Popup -->

		<!-- Gift Card Page Popup -->
		<f7-popup
			class="gift-card-popup"
			:opened="GiftpopupOpened"
			@popup:closed="GiftpopupOpened = false"
		>
			<f7-page>
				<f7-row>
					<f7-col width="90" class="margin-left">
						<f7-block-title large>Gift Card Payment</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right text-color-grey margin-right"
							popup-close
							icon-size="50"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>

				<f7-card>
					<f7-card-content>
						<f7-list>
							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="$125.45"></f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row v-if="showTotalPaid">
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold-paid" title="$(120.00)"></f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row class="display-flex justify-content-center">
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-paid" title="Amount Tendered"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-input
										class="checkout-text-bold-paid"
										type="number"
										step="0.01"
										validate-on-blur
										error-message="Numbers only. 2 decimal places."
										style="background: rgb(216,252,253)"
									></f7-list-input>
								</f7-col>
							</f7-row>

							<!-- Row 1 Credit Card Number -->
							<f7-row>
								<f7-col width="100" medium="100">
									<f7-list-input
										outline
										label="Card Number"
										floating-label
										type="text"
										placeholder="Card Number"
										clear-button
									>
										<f7-icon f7="creditcard" slot="media"></f7-icon>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<f7-row class="display-flex justify-content-center">
								<f7-col width="60">
									<f7-button>Customer Lookup</f7-button>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="Change"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="$5.65"></f7-list-item>
								</f7-col>
							</f7-row>
						</f7-list>
						<f7-row>
							<f7-col>
								<f7-button fill large>Confirm</f7-button>
							</f7-col>
						</f7-row>
					</f7-card-content>
				</f7-card>
			</f7-page>
		</f7-popup>
		<!-- END Gift Card Page Popup -->


	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import numeral from "numeral";

//Components
import successTransComponent from "@/components/layout-elements/popup-component.vue";
import openTillPopupComponent from "./components/open-till-popup-component.vue";

export default {
	name: "retailPOS",
	mixins: [],
	components: {
		"popup-component": successTransComponent,
		"open-till-popup-component": openTillPopupComponent
	},
	data() {
		return {
			//Componets Data
			popupSettings: {
				link: '.popup-component',
				name: "POS",
				type: "POS",
			},
			moduleInfo: {
				name: "Retail POS",
				type: "POS"
			},
			transactionDetails: {
				type: "Sale",
				isError: false,
				errorLevel: 1,
				errorData: "Error Data"
			},
			//Cash Drawer Coins and Bills
			cashDrawer: {
				coins: {
					pennies: 0,
					nickels: 0,
					dimes: 0,
					quarters: 0,
					halfDollars: 0,
					dollarCoins: 0
				},
				bills: {
					ones: 0,
					fives: 0,
					tens: 0,
					twenties: 0,
					fiftys: 0,
					hundreds: 0
				}
			},
			//Main Settings and Variables
			isOnLine: navigator.onLine,
			isTillOpen: false,
			enableGratuity: true,
			printReport: false,
			openCashDrawer: null,
			manager: {
				managerMode: null,
				isUserManager: false,
				approvingManager: null,
				invalidCredentials: false,
				loginForm: {
					email: null,
					password: null
				},
				loginBarcode: {
					barcode_number: null,
					pin: null
				}
			},
			allItemsInTill: [],
			taxRate: null,
			inventoryCategory: null,
			showTotalPaid: false,
			//Selected Item
			selectedItem: {
				id: null,
				qty: 0,
				name: null,
				price: null,
				net_price: null,
				discounts: 0,
				total_price: 0
			},
			selectedOrder: {},
			showDiscountType: false,
			discountType: null,
			//Order Form
			orderForm: {
				id: null,
				customer: null,
				onHold: false,
				isSale: false,
				isReturn: false,
				isVoid: false,
				isEdit: false,
				isDiscounted: false,
				isRefund: false,
				isSplitCheck: false,
				splitWays: 1,
				date: null,
				time: null,
				registerID: null,
				clerkID: null,
				merchantID: null,
				payment: {
					cashPaidAmount: null,
					cardPaidAmount: null,
					giftCardPaidAmount: null,
					transactionType: null,
					paymentMethod: null,
					transactionApproval: null,
					approvalCode: null,
					transactionID: null,
					coupons: null,
					giftCards: null
				},
				orderNumber: 0,
				qtyItems: 0,
				subtotal: 0,
				totalDiscounts: 0,
				//Error Data
				errorData: {
					type: "Authorization Unsuccessful",
					data: {
						non_field_errors: ["Error sending request to server"]
					},
					status: 400
				},
				//Discounts Popup
				discounts: {
					managerApproved: false,
					individualItemList: [],
					individualItemSelected: false,
					individualItem: "",
					selectedDiscountPercent: false,
					individualItemAmount: 0,
					individualItemSelectedPercent: 0,
					individualDiscountQtySelected: 1,
					individualDiscountQtyTotal: 1,
					newItemTotal: null,
					newOrderTotal: null,
					entireOrderSelected: false,
					entireOrderAmount: 0,
					entireOrderPercent: 0
				},
				gratuity: 0,
				tax: 0,
				total: 0,
				status: null,
				table: null,
				qty_customers: null
			},
			//End orderForm
			//Settings and Popups
			retailPOSsheetOpened: false,
			openRegisterPopup: false,
			closeRegisterPopup: false,
			CCpopupOpened: false,
			CashpopupOpened: false,
			GiftpopupOpened: false,
			DiscountpopupOpened: false,

			//Calculator
			showCalc: true,
			calc: {
				value: 0,
				id: null
			},
			logs: [],
			//Input Selectors
			inputFocusList: {
				"pos-login": "this.$refs.barcodeInput.$el.querySelector('input').focus()",
				CashPayment: "this.$refs.barcodeInput.$el.querySelector('input').focus()"
			},
			//Buefy Tabs
			activeStepDiscount: 0,
			stepItems: [],
			isAnimated: true,
			hasNavigation: false,
			customNavigation: false,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: true,
			isProfileSuccess: false,
			//Login Data
			loginBarcode: {
				barcode: "",
				pin: ""
			},
			//Built-In Keyboard
			visible: false,
			layout: "numeric",
			input: null,
			options: {
				useKbEvents: false,
				preventClickEvent: false
			}
		};
	},

	methods: {
		testButton() {
			console.log("this.Static.date", this.Static.date);
			console.log("this.Static.time", this.Static.time);
		},
		//Reset View
		resetView() {
			this.allItemsInTill = [];
			this.orderForm.isSale = false;
			this.orderForm.isVoid = false;
			this.orderForm.isReturn = false;
			this.orderForm.subtotal = 0;
			this.orderForm.gratuity = 0;
			this.orderForm.tax = 0;
			this.orderForm.totalDiscounts = 0;
			this.orderForm.total = 0;
		},
		//Reset Methods
		resetDiscounts() {
			this.activeStepDiscount = 0;
			this.orderForm.totalDiscounts = 0;
			this.orderForm.discounts.managerApproved = false;
			this.manager.invalidCredentials = false;
			this.orderForm.discounts.individualItem = null;
		},
		resetCashPayment() {},
		//SelectDiscountItem
		selectDiscountItem(e) {
			console.log("e", e);
			//find Item in inventoryList
			var invObj = this.Inventory.inventoryList.find((elem) => elem.name === e.target.value);
			console.log("invObj", invObj);
			this.orderForm.discounts.individualItemList.push(invObj);
			this.orderForm.discounts.individualItem = e.target.value;
			console.log("this.orderForm.discounts", this.orderForm.discounts);
			this.showDiscountType = true;
		},
		selectDiscountType(e) {
			console.log("e", e);
			if (this.discountType) {
				this.discountType = "";
			} else {
				this.orderForm.discounts.selectedDiscountPercent = true;
				this.discountType = e;
			}
		},

		//Close Discount Popup
		popupCloseDiscount(e) {
			// console.log('discount popup e', e);
			this.$f7.popup.close();
			this.resetDiscounts();
		},
		//Close Cash Payment Popup
		popupCloseCashPayment(e) {
			// console.log('discount popup e', e);
			this.$f7.popup.close();
			this.resetCashPayment();
		},
		openTill() {
			this.isTillOpen = true;
		},
		//Initiate Sale
		initSale() {
			this.resetView();
			this.orderForm.isSale = true;
		},
		//Initiate Void
		initVoid() {
			this.resetView();
			this.orderForm.isVoid = true;
		},
		//Initiate Return
		initReturn() {
			this.resetView();
			this.orderForm.isReturn = true;
		},

		//Ticket
		addItemToTill(id) {
			console.log("this.allItemsInTill", this.allItemsInTill);
			//Find item in Ticket First to increase QTY
			var findTillItem = this.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			console.log("findTillItem", findTillItem);
			if (findTillItem === undefined) {
				//Then add from Inventory if not already in list
				var invObj = this.Inventory.inventoryList.find((elem) => {
					return elem.id == id;
				});
				console.log("invObj", invObj);
				//Add Item Attributes
				invObj.qty = 1;
				invObj.is_discounted = false;
				this.allItemsInTill.push(invObj);
				// this.subtotal += invObj.list_price * invObj.qty;
				this.calculateTotals();
			} else {
				//Item already in List, increase quantity
				console.log("findTillItem Obj", findTillItem["qty"]);
				findTillItem["qty"] += 1;
				//Populate SelectedItem Object
				this.selectedItem.id = findTillItem["id"];
				this.selectedItem.qty = findTillItem["qty"];
				this.selectedItem.name = findTillItem["name"];
				var currentItemPrice = findTillItem["price"];
				this.selectedItem.price = parseFloat(currentItemPrice);
				console.log("this.selectedItem", this.selectedItem);

				this.$forceUpdate();
				this.calculateTotals();
			}
			this.selectedItem.id = null;
		},
		deleteItemFromTill(e) {
			console.log("e", e);
			console.log("deleteItemFromTill");
			this.allItemsInTill.splice(e, 1);
			this.calculateTotals();
		},
		calculateTotals() {
			//Reduce the tax rate from each item and add them up
			var taxRatePercent = 9.75;

			this.orderForm.subtotal = this.allItemsInTill.reduce((acc, obj) => {
				return acc + parseFloat(obj.list_price) * parseFloat(obj.qty);
			}, 0);
			console.log("this.orderForm.subtotal", this.orderForm.subtotal);

			this.orderForm.tax = this.allItemsInTill.reduce((acc, obj) => {
				return acc + (parseFloat(obj.list_price) * parseFloat(obj.qty) * taxRatePercent) / 100;
			}, 0);
			console.log("this.orderForm.tax", this.orderForm.tax);
			//Calculate Total Discounts
			// console.log("Object.keys(this.allItemsInTill[0].discounted_price", Object.keys(this.allItemsInTill[0].discounted_price));
			if (this.allItemsInTill.length != 0) {
				if (this.allItemsInTill[0].discount != undefined) {
					var sumDiscount = this.allItemsInTill.reduce((acc, obj) => {
						return acc + obj.discount;
					}, 0);
					console.log("sumDiscount", sumDiscount);
					console.log("sumDiscount", typeof sumDiscount);
					console.log("this.orderForm.totalDiscounts", this.orderForm.totalDiscounts);
					this.orderForm.totalDiscounts = sumDiscount;
				} else {
					this.orderForm.totalDiscounts = 0.0;
				}
			} else {
				this.orderForm.totalDiscounts = 0.0;
			}
			//Totals computed in watcher
		},
		discountDollars(e) {
			console.log("e", e);
			if (e >= this.selectedItem.price) {
				this.orderForm.discounts.individualItemAmount = this.selectedItem.price;
			}
		},
		editSelectedItem(itemId) {
			if (this.selectedItem.id) {
				this.selectedItem.id = null;
			} else {
				this.selectedItem.id = itemId;
			}
			console.log("itemId", itemId);
			console.log("this.allItemsInTill", this.allItemsInTill);
			var findOrderItem = this.allItemsInTill.find((elem) => elem.id === itemId);
			console.log("findOrderItem", findOrderItem);

			this.calc.value = findOrderItem.qty;
			this.calc.id = findOrderItem.id;
			console.log("this.calc", this.calc);
		},
		saveOrdersInstead() {
			console.log("Offine - Orders are being saved for future processing");
			//1) Push all orders to a list
			//2) Execute transactions when back online 5 minutes afer connection
			//3) verify that all ofers have been successfully completed
			//4) If not all successful, find the unsuccessful ones and execute them individually
		},
		canApplyDiscount() {
			if (this.orderForm.isSale) {
				this.$f7.popup.open(".discount-popup");
				this.$refs.barcodeInput.$el.querySelector("input").focus();
			}
			if (this.orderForm.isReturn) {
				// this.$f7.popup.open(".discount-popup");
				console.log("You cannot apply a disocunt to a return order");
			}
		},
		//Save item in Till with updated Discounted Price
		setNewItemDiscountedPrice() {
			console.log("setNewItemDiscountedPrice");
			console.log("this.orderForm.discounts.newItemTotal", this.orderForm.discounts.newItemTotal);
			var discountedPrice = this.orderForm.discounts.newItemTotal;

			var finTillItemIndex = this.allItemsInTill.findIndex(
				(elem) => elem.name === this.orderForm.discounts.individualItem
			);
			console.log("finTillItemIndex", finTillItemIndex);
			this.allItemsInTill[finTillItemIndex]["is_discounted"] = true;
			this.allItemsInTill[finTillItemIndex]["discount"] =
				this.allItemsInTill[finTillItemIndex]["price"] - discountedPrice;
			this.allItemsInTill[finTillItemIndex]["discounted_price"] = discountedPrice;
			console.log("this.allItemsInTill", this.allItemsInTill);
			this.resetDiscounts();
			this.calculateTotals();

			this.$f7.popup.close();
		},
		saveQty() {
			//Find object in array
			var id = this.selectedItem.id;
			console.log("this.selectedItem.id", this.selectedItem.id);
			var findTillItem = this.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			findTillItem.qty = this.calc.value;
			console.log("Orde qty has been updated", this.allItemsInTill);
			this.selectedItem.id = null;
			this.calc.value = 0;
		},
		async sendManagerCredentials() {
			this.$f7.preloader.show();
			// If Manager uses the UserID and PW Field... Need to create API endpoint
			if (this.manager.loginForm.email) {
				if (this.manager.loginForm.email && this.manager.loginForm.password) {
					this.$store.dispatch("managerAuthorizationBarcode", this.loginForm);
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
			//Barcode signIn Option
			if (this.manager.loginBarcode.barcode_number) {
				console.log("Auth using barcode signin");
				console.log("this.manager.loginBarcode", this.manager.loginBarcode);
				if (this.manager.loginBarcode.barcode_number && this.manager.loginBarcode.pin) {
					//find user in employeeList by barcode and sign that person in
					var managerAuthRes = await this.$store.dispatch("managerAuthorizationBarcode", this.manager.loginBarcode);
					console.log("managerAuthRes", managerAuthRes);
					//Clear Login Form
					this.manager.loginBarcode.barcode_number = null;
					this.manager.loginBarcode.pin = null;
					//Handle Response
					if (managerAuthRes.status === 200) {
						this.orderForm.discounts.managerApproved = true;
						setTimeout(() => {
							this.activeStepDiscount = 1;
						}, 2000);
					} else {
						this.manager.invalidCredentials = true;
						setTimeout(() => {
							this.resetDiscounts();
						}, 2000);
					}
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
		},
		selectIndividualItem() {
			this.orderForm.discounts.individualItemSelected = true;
			this.orderForm.discounts.entireOrderSelected = false;
			this.activeStepDiscount = 2;
		},
		selectEntireOrder() {
			this.orderForm.discounts.individualItemSelected = false;
			this.orderForm.discounts.entireOrderSelected = true;
			this.activeStepDiscount = 3;
		},
		//Cash Transaction
		processTransactionCash() {
			this.showTotalPaid = true;
			//if Balance reamins do not close order offer another payment method
			//if Balance === 0, them clear the order and reset for new entry order
		},
		closeCashTender() {},
		//Calculator
		addExpresion(e) {
			if (Number.isInteger(this.calc.value)) this.calc.value = "";
			this.calc.value += e;
		},
		//Calculator
		getResult() {
			let log = this.calc.value;
			this.calc.value = eval(this.calc.value);
			this.logs.push(log + `=${this.calc.value}`);
		},
		//Calculator
		clear() {
			this.calc.value = 0;
		},
		//Calculator
		del() {
			this.calc.value = this.calc.value.slice(0, -1);
		},
		//Input Focus Change
		changeFocus(fromBox, toBox) {
			console.log("fromBox", fromBox);
			console.log("this toBox", toBox);
			var length = this.$refs[fromBox].$el.querySelector("input").value.length;
			console.log("length", length);
			var maxLength = this.$refs[fromBox].$el.querySelector("input").getAttribute("maxlength");
			console.log("maxLength", maxLength);

			var nextField = document.getElementById(toBox);
			console.log("nextField", nextField);

			if (length == maxLength) {
				nextField.focus();
			}
		},
		//Vue-Keyboard-Methods
		accept(text) {
			alert("Input text: " + text);
			this.hide();
		},
		show(e) {
			console.log("e", e);
			console.log("this.$refs", this.$refs);
			this.input = e.target;
			this.layout = e.target.dataset.layout;

			if (!this.visible) this.visible = true;
			console.log("this.visible", this.visible);
		},
		hide() {
			this.visible = false;
		},
		//LogOut
		logout() {
			this.$store.dispatch("signOut");
		},
		logon(credentials) {
			console.log(credentials);
			this.$store.dispatch("signIn", credentials);
		}
	},
	computed: {
		...mapState(["Auth", "Users", "Inventory", "Orders", "Static", "Errors"]),
		...mapGetters(["getInventoryBarcodes"]),
		categoryItems() {
			var filtered = this.Inventory.inventoryList.filter((elem) => elem.category != null);
			var answer = filtered.filter((elem) => elem.category.name === this.Inventory.selectedCategory);
			return answer;
		},
		discountCalculation() {
			console.log("Start discountCalculation");
			//Calculation for Individual Item Discount
			if (this.orderForm.discounts.individualItemList.length != 0) {
				var currentPercentString = String(this.orderForm.discounts.individualItemSelectedPercent);
				var currentItemPrice = this.orderForm.discounts.individualItemList[0]["price"];
				var currentPercentFloat = currentPercentString.split("%")[0];
				var currentItemPriceFloat = parseFloat(currentItemPrice);
				var discount = 0;
				if (this.discountType == "discount-percentage") {
					// console.log("discount-percentage");
					if (this.orderForm.discounts.individualItemSelectedPercent) {
						discount =
							(currentPercentFloat / 100) *
							currentItemPriceFloat *
							this.orderForm.discounts.individualDiscountQtySelected;
						// console.log("discount-percentage", discount);
					}
				}
				if (this.discountType == "discount-dollar") {
					console.log("this.orderForm.discounts.individualItemAmount", this.orderForm.discounts.individualItemAmount);
					if (this.orderForm.discounts.individualItemAmount) {
						// console.log("discount-dollar");
						discount =
							this.orderForm.discounts.individualItemAmount * this.orderForm.discounts.individualDiscountQtySelected;
						// console.log("discount-dollar", discount);
					}
				} else {
				}
				if (discount === undefined) {
					return "0.00";
				}
				this.orderForm.discounts.newItemTotal =
					currentItemPriceFloat * this.orderForm.discounts.individualDiscountQtySelected - discount;
				return numeral(discount).format("0,0.00");
			}
			//Calculation for entitre order
			if (this.orderForm.discounts.entireOrderSelected) {
				var currentPercentString = String(this.orderForm.discounts.entireOrderPercent);
				var currentPercentFloat = currentPercentString.split("%")[0];
				console.log("grandTotal", this.grandTotal);
				var discount = 0;
				if (this.orderForm.discounts.entireOrderAmount) {
					if (this.discountType == "discount-percentage") {
						// console.log("discount-percentage");
						discount = (currentPercentFloat / 100) * this.grandTotal;
						// console.log("discount-percentage", discount);
					}
					if (this.discountType == "discount-dollar") {
						console.log("this.orderForm.discounts.entireOrderAmount", this.orderForm.discounts.entireOrderAmount);
						console.log("discount-dollar");
						discount = this.orderForm.discounts.entireOrderAmount;
						// console.log("discount-dollar", discount);
					}
					if (discount === undefined) {
						return "0.00";
					}
					this.orderForm.discounts.newOrderTotal = this.grandTotal - discount;
					return numeral(discount).format("0,0.00");
				}
			}
		},
		grandTotal() {
			//Calculate Grand Total
			var newTotal =
				parseFloat(this.orderForm.subtotal) - parseFloat(this.orderForm.gratuity) + parseFloat(this.orderForm.tax);
			console.log("newTotal", newTotal);
			this.orderForm.total = newTotal;

			return newTotal;
		},
		checkToDiscountSave() {
			if (this.orderForm.discounts.newItemTotal) {
				var currentItemPrice = this.orderForm.discounts.individualItemList[0]["price"];
				var currentItemPriceFloat = parseFloat(currentItemPrice);
				if (this.discountCalculation <= currentItemPriceFloat) {
					console.log("You can make a discount greater than the item itself");
					return false;
				}
			}
			return true;
		}
	},
	watch: {
		isOnLine() {
			console.log("Orders are being pushed to a List");
			this.saveOrdersInstead();
		},
		"orderForm.discounts.individualItem": {
			deep: true,
			handler: function(after, before) {
				console.log("There has been a change to the orderForm.discounts.individualItem");
				console.log("before", before);
				console.log("after", after);
			}
		}
	},
	mounted() {
		this.$store.dispatch("getInventoryList");
		this.$store.dispatch("getInventoryCategories");
	}
};
</script>

<style lang="scss" scoped>
.main-row {
	padding-top: 8px;
	padding-bottom: 0px;
	padding-right: 8px;
	padding-left: 8px;
}
.quarterbox-top {
	background: rgb(221, 228, 228);
	width: 100%;
	padding: 7px;
	height: 18vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}
.thirdbox-middle {
	background: rgb(255, 255, 255);
	height: 64vh;
	min-width: 290px;

	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}
.thirdbox-bottom {
	background: rgb(221, 228, 228);
	padding: 1px;
	height: 15vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;

		font-weight: 900;
	}
}

.tall-button {
	display: flex;
	justify-content: center;
	height: 5.5rem;
	border-radius: 10px;
}
.bottom-button {
	display: flex;
	justify-content: center;
	height: 4.5rem;

	border-radius: 10px;
}
.med-button {
	display: flex;
	justify-content: center;
	height: 2em;
	border-radius: 10px;
}

.chevrons {
	.chevron1 {
		background: rgba(129, 235, 245, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		font-weight: 900;
	}
	.chevron2 {
		background: rgba(46, 180, 192, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		font-weight: 900;
	}
	.chevron3 {
		background: rgba(3, 90, 98, 1);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
		height: 4em;
		width: 33%;
		color: white;
		font-weight: 900;
	}
}
.mbox-1 {
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: start;
	.inventory-row {
		height: 90%;
		width: 100%;
		.inventory-div {
			display: flex;
			justify-content: space-around;
			flex-shrink: 2;
			flex-wrap: wrap;
			min-width: 20%;
			width: 95%;
			height: 100%;
			.inventory-item {
				border: 2px solid black;
				cursor: pointer;
				width: 150px;
				height: 6em;
				background: white;
				font-weight: 300;
				margin-bottom: 5px;
				background: rgb(47, 47, 47);

				.inventory-img {
					display: flex;
					background: rgb(235, 235, 235);
					height: 75%;
					text-align: center;
					justify-content: center;
					img {
						height: 75px;
						border-radius: 50%;
						box-shadow: 5px 5px 10px rgb(34, 33, 33);
					}
				}
				.inventory-title {
					box-shadow: 0px 7px 10px rgb(34, 33, 33);
					text-align: center;
					font-weight: 600;
					color: black;
					height: 25%;
					color: white;
				}
			}
		}
	}
}

.notifications {
	border: 2px solid black;
	width: 100%;
	height: 7.5em;
	background: white;
	font-weight: 300;
	margin: 0px;
}

.category-box {
	flex-grow: 3;
	border-right: 2px solid grey;
	border-top: 2px solid grey;
	border-bottom: 2px solid grey;
	background: rgb(78, 78, 78);
	width: 5%;
	max-width: 25px;
	height: 90%;
}

//  CALCULATOR  \\
$darker: #1c1c1d;
$dark: #474849;
$gray: #838383;
$white: #fff;
$light: rgb(180, 180, 180);
$accent: #d47f24;

#calculator {
	// height:97%;
	margin: 10px;
	display: flex;
	padding: 0;
	max-width: 100%;
	min-width: 250px;
	flex-direction: column;
	background-color: $light;
	border: 5px solid rgb(65, 64, 64);

	.calculator-logs {
		display: flex;
		position: relative;
		overflow: hidden;
		align-items: flex-end;
		flex-direction: column;
		justify-content: flex-end;
		&:before {
			top: 0;
			left: 0;
			right: 0;
			height: 48px;
			content: "";
			z-index: 5;
			position: absolute;
			background: linear-gradient(to bottom, $darker, rgba($darker, 0));
		}
		span {
			color: $light;
			opacity: 0.75;
			display: block;
			font-size: 0.8rem;
			text-align: right;
			margin-top: 0.4rem;
			line-height: 1;
			font-weight: lighter;
		}
	}

	.calculator-input {
		color: black;
		height: 4.5rem;
		width: 90%;
		border: none;
		padding: 0.8rem;
		padding-bottom: 1rem;
		display: block;
		font-size: 3.5rem;
		background: none;
		text-align: right;
		font-weight: lighter;
		&:focus,
		&:active {
			outline: none;
		}
	}

	.calculator-row {
		display: flex;
		padding: 0;
		justify-content: space-around;
		.calculator-col {
			width: 25%;
			box-shadow: 0 0 0 2px $darker;
			&.wide {
				flex: 2;
			}
		}
	}

	.calculator-btn {
		width: 100%;
		height: 3.5rem;
		color: $darker;
		border: none;
		cursor: pointer;
		padding: 0.8rem;
		outline: none;
		font-size: 1.6rem;
		transition: all 0.3s ease-in-out;
		font-weight: 200;
		justify-content: center;
		background-color: $light;
		&.accent {
			background-color: $accent;
			color: $white;
		}
		&.gray {
			background-color: $gray;
		}
		&.action {
		}
		&:active {
			background-color: $darker;
		}
	}
}
.calc-row {
	margin: 4px;
	width: 100%;

	.calc-button {
		display: flex;
		justify-content: center;
		margin: 3px;
		width: 100%;
		height: 50px;
	}
	.tender-buttons-bg {
		p {
			color: white;
			text-align: center;
		}
		background: rgb(175, 177, 177);
		width: 100%;
	}
}
.tender-rows {
	background: rgb(68, 68, 68);
	border-radius: 8px;
	padding-left: 20px;
	margin-left: 20px;
	margin-right: 20px;
}
.order-buttons-bg {
	padding-top: 0px;
	background: rgb(177, 177, 177);
	width: 100%;
	height: 12vh;
	p {
		color: white;
		text-align: center;
	}
}

.till {
	background: white;
	margin: 10px;
	height: 95%;

	.till-header {
		font-family: OpenSans-Bold;
		font-weight: 500;
		background: lightgrey;
	}
	.qtyButton {
		display: flex;
		justify-content: center;
		background: rgb(216, 246, 244);
		height: 2.5em;
		cursor: pointer;
		border: 2px solid rgb(126, 124, 124);
		border-radius: 15px;
		width: 75%;
	}
}
.till-container {
	height: 96%;
}
.till-totals {
	position: absolute;
	bottom: 10px;
	padding-right: 20px;
}
.inv-header {
	background: lightgrey;
}
.total-text {
	font-family: OpenSans-Bold;
	font-weight: 500;
}

//Till Text
div .till-text {
	font-size: 0.95em;
	line-height: 2.5em;
	// background: green;
}

// Sheets and Popups
.popup-header {
	background: rgb(2, 41, 51);
}
.retail-POS-Settings {
	height: 100%;
}
.discount-popup {
	height: 750px;
}
.cash-popup {
	height: 500px;
}
.credit-card-popup {
	height: 650px;
}


//Checkout Popups Totals
.checkout-text {
	font-size: 2em;
}

.checkout-text-bold {
	font-size: 2em;
	font-family: OpenSans-SemiBold;
}
.checkout-text-paid {
	font-size: 1.5em;
}
.checkout-text-bold-paid {
	font-size: 1.5em;
	font-family: OpenSans-SemiBold;
}
.time-box {
	background-image: linear-gradient(rgb(255, 255, 255), rgb(212, 212, 212));
}
.selected-item {
	background: rgb(235, 192, 192);
}

//Login PIN
.pin-cell {
	height: 50px;
	width: 50%;
	background: rgb(169, 236, 236);
	font-size: 1.5em;
}
</style>
