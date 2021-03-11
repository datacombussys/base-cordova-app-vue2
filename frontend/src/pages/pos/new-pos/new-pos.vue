<template>
  <div class="pos-page">

		<transactionResponseComponent 
			:transResponsePopup="transResponsePopup"
			@closeTransResponsePopup="closeTransResponsePopup" />

    <!-- First Row -->
    <div class="top-row">
      <div class="row1-col1">
        <div class="row items-center">
          <div class="col-25p">
            <a href="#" @click="toggleNavBar">
              <span class="mdi mdi-menu mdi-25"></span>
            </a>
          </div>
          <div class="col-75p">
            <div class="title">Transaction Type</div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-25p p-2">
            <div class="text-center">
              {{ Static.time }}
            </div>
            <div class="text-center">
              {{ Static.date }}
            </div>
          </div>
          <div class="col-25p px-1 justify-center">
            <DxButton
              text="Sale"
              type="pos"
              :focusStateEnabled="true"
              styling-mode="contained"
              @click="initSale($event)"
            />
          </div>
          <div class="col-25p px-1 justify-center">
            <DxButton
              text="Return"
              type="pos"
              :focusStateEnabled="true"
              styling-mode="contained"
              @click="initReturn($event)"
            />
          </div>
          <div class="col-25p px-1 justify-center">
            <DxButton
              text="Void"
              type="pos"
              :focusStateEnabled="true"
              styling-mode="contained"
              @click="initVoid($event)"
            />
          </div>
        </div>
      </div>
      <div class="row1-col2">
        <div class="row items-center">
          <div class="row pt-2">
            <div class="title text-center">Register Management</div>
          </div>
          <div class="row pt-2">
            <div class="col-25p px-1">
              <DxButton
                text="Open"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="openSheetOpenTill = true"
              />
							<openTillComponent 
								:openSheetOpenTill="openSheetOpenTill" 
								@closeTillSheet="closeOpenTillSheet"
								@total-open="openTillAmount" />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Close"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="openSheetCloseTill = true"
              />
							<closeTillComponent 
								:openSheetCloseTill="openSheetCloseTill" 
								@closeTillSheet="closeCloseTillSheet"/>
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Report"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Drawer"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row1-col3">
        <div class="row items-center">
          <div class="row pt-2">
            <div class="title text-center">System Management</div>              
          </div>
          <div class="row pt-2">
            <div class="col-20p px-1">
              <DxButton
                text="Mgr"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-20p px-1">
              <DxButton
                text="Settings"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-20p px-1">
              <router-link to="home">
                <DxButton
                  width="100%"
                  text="Dash"
                  type="pos"
                  :focusStateEnabled="false"
                  styling-mode="contained"
                />
              </router-link>
            </div>
            <div class="col-20p px-1">
              <router-link to="pos-login">
                <DxButton
                  width="100%"
                  text="Logout"
                  type="pos"
                  :focusStateEnabled="false"
                  styling-mode="contained"
                />
              </router-link>
            </div>
            <div class="col-20p px-1 justify-center items-center">
              <toggle-button 
              disabled
              :value="Common.isOnline"
              :color="switchColors"
              switch-color="#494949"
              :labels="true"
              :width="90"
              :height="40"
              :font-size="13"/>
              <p v-if="Common.isOnline">Connected</p>
              <p v-else="Common.isOnline">Disconnected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END First Row -->
    <!-- Second Row -->
    <div class="second-row">
      <multipane class="vertical-panes" layout="vertical">
        <div class="pane px-2" :style="{ minWidth: '100px', width: '33%', maxWidth: '1500px'  }">
          <v-row>
						<v-col sm="2" class="p-0">
							<div class="row my-2 rounded p-1 items-center">
								<v-btn 
									link
									icon
								 @click="showBarcodeInput = !showBarcodeInput">
							
									<div class="mdi mdi-swap-horizontal-bold mdi-25"></div>
								</v-btn>
								
							</div>
						</v-col>
            <v-col v-show="!showBarcodeInput" sm="10" class="p-0 flex items-center">
               <input id="barcodeInputField" type="text" class="w-full" v-model="barcodeInput" placeholder="Barcode Number"/>
            </v-col>
						
            <v-col v-show="showBarcodeInput" sm="10" class="p-0 mt-2 w-full">
              <v-text-field
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                outline
                dense
                @input="filterResults"
                v-model="searchWords"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <div class="row">
            <DxScrollView
              id="scrollview"
              ref="inventoryScrollView"
              height="100%"
							width="100%"
              :scroll-by-content="true"
              :scroll-by-thumb="true"
              show-scrollbar="always"
              :bounce-enabled="true"
            >
            <div class="inventory-row">
							<div 
								class="text-center" 
								v-if="GET_INVENTORY_LIST.length === 0">
									There are no items to show
								</div>
              <div class="inventory-div">
								
                <div
                  v-for="item in GET_INVENTORY_LIST"
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
              </div>
              
            </div>
            
            </DxScrollView>
          </div>
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="pane p-1" :style="{ minWidth: '100px', width: '33%', maxWidth: '1200px' }">
          <div class="container p-0">
            <DxScrollView
              id="scrollview"
              ref="calculatorScrollView"
              height="75vh"
              :scroll-by-content="true"
              :scroll-by-thumb="true"
              show-scrollbar="always"
              :bounce-enabled="false"
            >
							<div class="row bg-gray-800 text-white my-2 rounded p-1 items-center">
								<span class="mdi mdi-swap-horizontal-bold mdi-20 pr-4"></span>
								<span>View Order</span> 
							</div>
              <div class="row">
                <calculator-component :calcData="calc"></calculator-component>  
              </div>
              <div class="row bg-gray-800 text-white my-2 rounded p-1">
                Tender Order
              </div>
              <div class="row">
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Cash"
                    type="success"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Credit"
                    type="success"
                    class="w-full"
                    styling-mode="contained"
                    @click="creditCardSale"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Gift"
                    type="success"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
              </div>
              
              <div class="row bg-gray-800 text-white my-2 rounded p-1">
                Manage Order
              </div>
              <div class="row">
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Discount"
                    type="warning"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Split"
                    type="warning"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Print/test"
                    type="warning"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
              </div>
              <div class="row bg-gray-800 text-white my-2 rounded p-1">
                Edit Order
              </div>
              <div class="row">
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Edit"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Delete"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    :height="50"
                    text="Save"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="saveTillToStore($event)"
                  />
                </div>
              </div>
              
            </DxScrollView>
          </div>
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="pane p-1" :style="{ minWidth: '50px', width: '33%' }" style="flex-grow: 1;">
          <div class="container p-0">
						<creditCardPaymentComponent 
							ref="creditCardPmtRef"
							:grandTotal="grandTotal"
							:paymentForm="orderForm"
							:openedCCDrawer="openedCCDrawer"
							@closeCCDrawer="closeCCDrawer" />

            <div class="row bg-gray-700 text-white py-2 justify-between">
              <div class="col-10p text-center">
                Qty
              </div>
              <div class="col-40p text-center">
                Item
              </div>
              <div class="col-20p text-center">
                Each
              </div>
              <div class="col-20p text-center">
                Total
              </div>
              <div class="col-5p text-center">
              </div>
            </div>
            <div class="row">
              <DxScrollView
                id="scrollview"
                ref="tillScrollView"
                height="75vh"
                width="100%"
                :scroll-by-content="true"
                :scroll-by-thumb="true"
                show-scrollbar="always"
                :bounce-enabled="true"
              >
                <div class="container p-0 pl-1 w-full">
                  <div class="d-list">
                    <div class="d-list-item" 
                      v-for="(item, index) in orderForm.allItemsInTill"
                      :key="item.id">
                      <div class="row justify-evenly" 
                        :class="selectedItem.id === item.id ? 'edit-item' : ''"
                        @click="editSelectedItem(item.id)">
                        <div class="col-10p">
                          <div class="till-text">
                            {{ item.qty }}
                          </div>
                        </div>
                        <div class="col-40p">
                          <div class="till-text">
                            {{ item.name }}
                          </div>
                        </div>
                        <div class="col-20p">
                          <div class="till-text">
                            {{ item.sale_price || item.list_price | formatDollar }}
                          </div>
                        </div>
                        <div class="col-20p">
                          <div class="till-text">
                            {{ item.qty * item.sale_price || (item.qty * item.list_price) | formatDollar }}
                          </div>
                        </div>
                        <div class="col-5p pr-2 items-center" v-if="selectedItem.id === item.id">
                          <div class="till-text">
                            <a href="#" @click="deleteItemFromTill(index)">
                              <span class="material-icons md-48 pt-2">delete</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <!-- Till Summary -->
                <div class="container till-totals">
                  <div class="row">
                    <div class="col-6 p-0">
                      <div class="row">
                        <div class="col-6 p-0">
                          <div v-if="retailSettings.enableGratuity" style="font-size:1em;">Gratuity</div>
                          <div>Tax</div>
                          <div style="font-size:1em;">Discounts</div>
                        </div>
                        <div class="col-6 p-0 total-text">
                          <div
                            v-if="retailSettings.enableGratuity"
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
                        </div>
                      </div>
                    </div>
                    <div class="col-6 p-0">
                      <div class="row">
                        <div class="col-4 p-0">
                          <div>Subtotal</div>
                          <div style="font-size:1.35em;">Total</div>
                        </div>
                        <div class="col-8 p-0">
                          <div>{{ orderForm.subtotal | formatDollar }}</div>
                          <div style="font-size:1.35em;">{{ grandTotal | formatDollar }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DxScrollView>
            </div>
          </div>
        </div>
      </multipane>
    </div>
    <div class="bottom-row">
      <div class="row3-col1">
        <div class="row items-center">
          <div class="row pt-2">
            <div class="title text-center">Lookup</div>
          </div>
          <div class="row pt-2">
            <div class="col-33p px-1">
              <DxButton
                text="Customer"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Transactions"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Inventory"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row3-col2">
        <div class="row items-center">
          <div class="row pt-2">
            <div class="title text-center">Loyalty</div>
          </div>
          <div class="row pt-2">
            <div class="col-33p px-1">
              <DxButton
                text="Coupons"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Gift Cards"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Loyalty Cards"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row3-col3">
        <div class="row items-center">
          <div class="row pt-2">
            <div class="title text-center">Orders</div>
          </div>
          <div class="row pt-2">
            <div class="col-25p px-1">
              <DxButton
                text="Find"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Reprint"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Hold"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Resume"
                type="pos"
                :focusStateEnabled="false"
                styling-mode="contained"
                @click="testButton($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>	
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { bus } from '@/services/event-bus';

import DxResizable from 'devextreme-vue/resizable';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import DxButton from 'devextreme-vue/button';
import { confirm, custom, alert } from 'devextreme/ui/dialog';
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Components
import calculatorComponent from "@/pages/pos/new-pos/components/calculator-component.vue";
import openTillComponent from "@/pages/pos/new-pos/components/open-till-component.vue";
import closeTillComponent from "@/pages/pos/new-pos/components/close-till-component.vue";
import creditCardPaymentComponent from "@/pages/pos/new-pos/components/credit-card-payment-component.vue";
import transactionResponseComponent from "@/components/financial/new/transaction-response-component.vue";

export default {
  name: "retailPOS",
    mixins: [

  ],
  components: {
    DxScrollView,
    DxResizable,
    Multipane,
    MultipaneResizer,
    DxButton,
    alert,
		calculatorComponent,
		openTillComponent,
		closeTillComponent,
		creditCardPaymentComponent,
		transactionResponseComponent
  },
  props: {
     keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data() {
    return {
      //Component Data
      pageSettings: {
      leftNavDrawer: ".accounting-panel",
      pageTitle: "Accounting"
    },
      moduleInfo: {
				name: "Retail POS",
				type: "POS"
      },
      retailSettings: {
				retailPOSsheetOpened: false,
				enableGratuity: true,
      },
      sharedData: {
				CCpopupOpened: false,
				CashpopupOpened: false,
				GiftpopupOpened: false,
      },

      //Transaction Completion Popup
			transactionDetails: {
				type: "Sale",
				isError: false,
				errorLevel: 1,
				errorData: "Error Data"
			},
			//Disocunt Popup Settings
			discountSettings: {
				DiscountpopupOpened: false,
				activeStepDiscount: 0,
			},
			// Popups and Sheets
			openSheetOpenTill: false,
			openSheetCloseTill: false,
			openedCCDrawer: false,
			transResponsePopup: false,

			//Calculate Settings
			showCalc: true,
			calc: {
				value: 0,
				id: null
      },
      
      //Main Settings
      switchColors: {
        checked: ' #0BB804', unchecked: '#F03A00', disabled: '#0BB804'
			},
			showBarcodeInput: false,
      barcodeInput: null,
      searchWords: null,

			//Resizeable
			resizableAttributes: {
				id: 'resizable',
				handles:'all',
				height: 400,
				width: 400,
				maxHeight: 800,
				maxWidth: 800,
      },

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
      
      //Order Form
			orderForm: {
				id: null,
				orderNumber: 0,
				orderID: null,
				salesOffice: null,
				orderStatus: null,
				customer: null,
				onHold: false,
				isSale: false,
				isReturn: false,
				isVoid: false,
				isEdit: false,
				isDiscounted: false,
				isRefund: false,
				isTillOpen: false,
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
				//Error Data
				errorData: {
					type: "Authorization Unsuccessful",
					data: {
						non_field_errors: ["Error sending request to server"]
					},
					status: 400
				},
				//Totals
				qtyItems: 0,
				subtotal: 0,
				totalDiscounts: 0,
				gratuity: 0,
				tax: 0,
				total: 0,
				allItemsInTill: [],
				openTillAmount: null,
				closeTillAmount: null,
      },
      
      //Input Selectors
			inputFocusList: {
				"pos-login": "this.$refs.barcodeInput.$el.querySelector('input').focus()",
				CashPayment: "this.$refs.barcodeInput.$el.querySelector('input').focus()"
			},
			barcodeInterval: null,
    
    }
  },
  //***************************************Methods ********************************************** */
  methods: {
    testButton(e) {
      console.log("this.orderForm", this.orderForm)
			console.log("this.RETURN_TILL_LIST", this.RETURN_TILL_LIST)
			var barcodeSearch = document.getElementById("barcodeInputField")
			barcodeSearch.focus()

      
    },
    toggleNavBar() {
      this.$emit('navigated')
		},
		closeCCDrawer(evt) {
			console.log("closeCCDrawer evt", evt)
			this.openedCCDrawer = false
		},
    filterResults(e) {
      console.log("filterResults e", e)
			//Filter the active list of inventory being displayed
			this.clearBarcodeFocusInterval()
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.searchWords.toLowerCase())
      })
    },
    //Reset View
		resetView() {
			this.orderForm.allItemsInTill = [];
			this.orderForm.isSale = false;
			this.orderForm.isVoid = false;
			this.orderForm.isReturn = false;
			this.orderForm.subtotal = 0;
			this.orderForm.gratuity = 0;
			this.orderForm.tax = 0;
			this.orderForm.totalDiscounts = 0;
			this.orderForm.total = 0;
		},
		initializePOS(id, SO) {
			console.log("initializePOS id", id)
			console.log("initializePOS SO", SO)
			var POSObj = this.$store.getters.RETURN_TILL_LIST.find(elem => elem.id === id)
			console.log("POSObj", POSObj)
			if(POSObj != undefined) {
				//map variables to local form
				for(let i in this.orderForm) {
					this.orderForm[i] = POSObj[i]
				}
			} else {
				this.$nextTick(function() {
					// alert("New Store Created", "Success");
					this.orderForm.orderID = id
					this.orderForm.salesOffice = SO
					this.$store.commit("PUSH_NEW_TILL", this.orderForm)
				})
				if(!this.isTillOpen) {
					this.openSheetOpenTill = true
				}
				console.log('this.orderForm', this.orderForm)
			}
		},
		saveTillToStore(evt) {
			console.log("saveTillToStore evt", evt)
			try {
				//Find object in store current Index, delete it and replace it woth this one in the same position
				let tillIndex = this.RetailPOS.tillList.findIndex(elem => elem.id === this.orderForm.id)
				console.log("tillIndex", tillIndex)
				if(tillIndex >= 0) {
					console.log("this.RetailPOS.tillList", this.RetailPOS.tillList)
					this.$store.commit("SAVE_TILL", {id: tillIndex, data: this.orderForm})
					console.log("this.RetailPOS.tillList", this.RetailPOS.tillList)
				}			

				this.$nextTick(function() {
					alert("Saved", "Success");
				})
				console.log('RETURN_TILL_LIST', this.RETURN_TILL_LIST)
			} catch(error) {
				console.error("There was an error saving till")
			}
		},
		//Initiate Sale
		initSale(e) {
			console.log('initSale e', e)
			let startSale = () => {
				console.log('startSale')
				this.resetView();
				this.orderForm.isSale = true;
				e.element[0].classList.add("dx-state-focused")
			}
			if(this.orderForm.isReturn) {
				this.$nextTick(function() {
					let comfirmDialog = confirm("Do you want to cancel the current return?", "Change Order");
					comfirmDialog.then((dialogResult) => {
						console.log("dialogResult", dialogResult);
						console.log("dialogResult.buttonText", dialogResult.buttonText);
						if(dialogResult) {
							console.log("User clicked OK");
							startSale()
						} else {
							console.log("User clicked Cancel");
							return
						}
					});
				})
		
			} else {
				startSale()
				if(!this.orderForm.openTillAmount) {
					this.$nextTick(function() {
						alert("You must first enter the opening drawer amounts", "Error");
					})
				}
				
			}			
		},
		//Initiate Void
		initVoid(e) {
			console.log('initVoid e', e)
			this.resetView();
			this.orderForm.isVoid = true;
		},
		//Initiate Return
		initReturn(e) {
			console.log('initReturn e', e)
			let startReturn = () => {
				console.log('startReturn')
				this.resetView();
				this.orderForm.isReturn = true;
				e.element[0].classList.add("dx-state-focused")
			}
			
			if(this.orderForm.isSale) {
				this.$nextTick(() => {
					let comfirmDialog = confirm("Do you want to cancel the current sale?", "Change Order");
					comfirmDialog.then((dialogResult) => {
						console.log("dialogResult", dialogResult);
						console.log("dialogResult.buttonText", dialogResult.buttonText);
						if(dialogResult) {
							console.log("User clicked OK");
							startReturn()
						} else {
							console.log("User clicked Cancel");
							return
						}
					});
				});
			} else {
				startReturn()
			}
		},
		closeOpenTillSheet(e) {
			console.log("closeOpenTillSheet e", e);
			this.openSheetOpenTill = false
		},
		closeCloseTillSheet(e) {
			console.log("closeCloseTillSheet e", e);
			this.openSheetCloseTill = false
		},
		openTillAmount(e) {
			console.log("openTillAmount e", e);
			this.orderForm.openTillAmount = e
			console.log("this.orderForm.openTillAmount", this.orderForm.openTillAmount);
		},
		closeTransResponsePopup(e) {
			console.log("closeTransResponsePopup e", e);
			this.transResponsePopup = e
		},
		//,Ticket
		addItemToTill(id) {
			console.log("this.orderForm.allItemsInTill", this.orderForm.allItemsInTill);
			//Find item in Ticket
			var findTillItem = this.orderForm.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			console.log("findTillItem", findTillItem);
			if (findTillItem === undefined) {
				//Not in List, Add to Till Here
				var invObj = this.Inventory.inventoryList.find((elem) => {
					return elem.id == id;
				});
				console.log("invObj", invObj);
				//Add Item Attributes
				invObj.qty = 1;
				invObj.is_discounted = false;
				this.orderForm.allItemsInTill.push(invObj);
        this.calculateTotals();
        
			} else {
				//Item already in List, increase quantity
				console.log("findTillItem Obj", findTillItem["qty"]);
				findTillItem["qty"] += 1;
				
				this.$forceUpdate();
				this.calculateTotals();
			}
			this.selectedItem.id = null;
		},
		deleteItemFromTill(e) {
			console.log("e", e);
			console.log("deleteItemFromTill");
			this.orderForm.allItemsInTill.splice(e, 1);
			this.calculateTotals();
		},
		calculateTotals() {
			//Reduce the tax rate from each item and add them up
			var taxRatePercent = 9.75;

			this.orderForm.subtotal = this.orderForm.allItemsInTill.reduce((acc, obj) => {
				return acc + parseFloat(obj.list_price) * parseFloat(obj.qty);
			}, 0);
			console.log("this.orderForm.subtotal", this.orderForm.subtotal);

			this.orderForm.tax = this.orderForm.allItemsInTill.reduce((acc, obj) => {
				return acc + (parseFloat(obj.list_price) * parseFloat(obj.qty) * taxRatePercent) / 100;
			}, 0);
			console.log("this.orderForm.tax", this.orderForm.tax);
			//Calculate Total Discounts
			// console.log("Object.keys(this.orderForm.allItemsInTill[0].discounted_price", Object.keys(this.orderForm.allItemsInTill[0].discounted_price));
			if (this.orderForm.allItemsInTill.length != 0) {
				if (this.orderForm.allItemsInTill[0].discount != undefined) {
					var sumDiscount = this.orderForm.allItemsInTill.reduce((acc, obj) => {
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
		editSelectedItem(itemId) {
      console.log("itemId", itemId)
      console.log("this.selectedItem", this.selectedItem);

			if (this.selectedItem.id == itemId) {
				this.selectedItem.id = null;
			} else {
        this.selectedItem.id = itemId;

        console.log("this.orderForm.allItemsInTill", this.orderForm.allItemsInTill);
        //Find item in Ticket
        var findOrderItem = this.orderForm.allItemsInTill.find((elem) => elem.id === itemId);
        console.log("findOrderItem", findOrderItem);
        
        //Populate SelectedItem Object
        this.selectedItem.id = findOrderItem["id"];
        this.selectedItem.qty = findOrderItem["qty"];
        this.selectedItem.name = findOrderItem["name"];
        this.selectedItem.price = parseFloat(findOrderItem["price"]);
        
        //Update Calculator
        this.calc.value = findOrderItem.qty;
        this.calc.id = findOrderItem.id;
        console.log("this.calc", this.calc);
			}
			
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
				// this.$f7.popup.open(".discount-popup");
				this.discountSettings.DiscountpopupOpened=true;
			}
			if (this.orderForm.isReturn) {
				// this.$f7.popup.open(".discount-popup");
				this.$f7.dialog.alert('Discounts cannot be applied to return orders!');
			}
		},
		saveQty() {
			//Find object in array
			var id = this.selectedItem.id;
			console.log("this.selectedItem.id", this.selectedItem.id);
			var findTillItem = this.orderForm.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			findTillItem.qty = this.calc.value;
			console.log("Orde qty has been updated", this.orderForm.allItemsInTill);
			this.selectedItem.id = null;
			this.calc.value = 0;
		},
		creditCardSale() {
			console.log("creditCardSale clicked")
			this.clearBarcodeFocusInterval()
			this.openedCCDrawer = true
			this.$refs.creditCardPmtRef.focusChange()
			
		},
    //Input Focus
		clearBarcodeFocusInterval() {
			console.log('clearBarcodeFocusInterval');
			clearInterval(this.barcodeInterval);
		},
		startBarcodeFocusTimer() {
			var barcodeSearch = document.getElementById("barcodeInputField")
			console.log('barcodeSearch', barcodeSearch)
			this.barcodeInterval = setInterval(() => {
					barcodeSearch.focus();
					// console.log("this", this);
			}, 2000);
		},
		
    //LogOut
		logout() {
			this.$store.dispatch("signOut");
		},
		logon(credentials) {
			console.log(credentials);
			this.$store.dispatch("signIn", credentials);
		},
		


  },
  computed: {
    ...mapState(["Auth", "Users", "Inventory", "Orders", "Static", "Errors", "Common", "RetailPOS"]),
		...mapGetters(["GET_INVENTORY_LIST", "GET_INV_CATEGORY_LIST", "GET_INV_CATEGORY_LIST_LENGTH", "RETURN_TILL_LIST"]),
    categoryItems() {
			var filtered = this.Inventory.inventoryList.filter((elem) => elem.category != null);
			var answer = filtered.filter((elem) => elem.category.name === this.Inventory.selectedCategory);
			return answer;
		},
		grandTotal() {
			//Calculate Grand Total
			var newTotal = parseFloat(this.orderForm.subtotal) + parseFloat(this.orderForm.gratuity) + 
				parseFloat(this.orderForm.tax) - parseFloat(this.orderForm.totalDiscounts);
			console.log("newTotal", newTotal);

			return Number(newTotal.toFixed(2));
		},
  },
  watch: {

  },
  mounted() {
		this.startBarcodeFocusTimer()
    
  },
  created() {
		console.log("this.$route", this.$route)
		let id = this.$route.params.id
		console.log("id", id)
		let SO = this.$route.params.SO
		console.log("SO", SO)
		this.initializePOS(id, SO)
  },

    
  }
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/variables.scss";

.top-row {
  display: flex;
  height: 12%;
  .row1-col1 {
    display: inline-block;
    width: 33%;
    background: rgb(221, 228, 228);
    .dx-button {
      height: 60px;
    }
  }
  .row1-col2 {
    display: inline-block;
    width: 33%;
    background: rgb(221, 228, 228);
  }
  .row1-col3 {
    display: inline-block;
    flex-grow: 1;
    width: 33%;
    background: rgb(221, 228, 228);
  }
}

.second-row {
  display: flex;
  height: 76%;
}
.till-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $base-font-size*.9;
	line-height: 2.5em;
}
.bottom-row {
  height: 12%;
  display: flex;
  .row3-col1 {
    height: 100%;
    display: inline-block;
    width: 33%;
    background: rgb(221, 228, 228);
  }
  .row3-col2 {
    display: inline-block;
    width: 33%;
    background: rgb(221, 228, 228);
  }
  .row3-col3 {
    display: inline-block;
    width: 33%;
    background: rgb(221, 228, 228);
  }
}

.vertical-panes {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
    .pane {
    background: #eee;
    border-right: 1px solid #ccc;
  }
}

.vertical-panes > .pane ~ .pane {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.layout-v > .multipane-resizer {
  top: 45%;
  height: 50px;
}
.multipane.vertical-panes.layout-v .multipane-resizer {
  margin: 2px; left: 0; /* reset default styling */
  width: 5px;
  background: rgb(172, 172, 172);
}
.edit-item {
  background: rgba(204, 36, 36, 0.5);
}

//Inventory List Pane
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
      font-weight: 300;
      margin-bottom: 5px;
      background: rgb(235, 235, 235);

			.inventory-img {
				z-index: 10;
				display: flex;
				height: 75%;
				text-align: center;
				justify-content: center;
				img {
					height: 100%;
					border-radius: 50%;
					box-shadow: 5px 5px 10px rgb(34, 33, 33);
				}
			}
      .inventory-title {
				z-index: 50;
        box-shadow: 0px 7px 10px rgb(34, 33, 33);
        text-align: center;
        font-weight: 600;
        height: 25%;
				color: rgb(255, 255, 255);
				background: rgb(47, 47, 47);
      }
    }
  }
}
.till-totals {
	position: absolute;
	bottom: 30px;

}
.total-text {
	font-family: OpenSans-Bold;
	font-weight: 500;
}
</style>

