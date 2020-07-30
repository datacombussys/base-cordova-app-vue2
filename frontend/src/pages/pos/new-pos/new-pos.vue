<template>
  <div class="pos-page">
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
              styling-mode="contained"
              @click="saleButton($event)"
            />
          </div>
          <div class="col-25p px-1 justify-center">
            <DxButton
              text="Return"
              type="pos"
              styling-mode="contained"
              @click="initReturn($event)"
            />
          </div>
          <div class="col-25p px-1 justify-center">
            <DxButton
              text="Void"
              type="pos"
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
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Close"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Report"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Drawer"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
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
            <div class="col-25p px-1">
              <DxButton
                text="Manager"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Settings"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Logout"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1 justify-center items-center">
              <toggle-button 
              disabled
              :value="isOnLine"
              :color="switchColors"
              switch-color="#494949"
              :labels="true"
              :width="90"
              :height="40"
              :font-size="13"/>
              <p v-if="isOnLine">Connected</p>
              <p v-else="isOnLine">Disconnected</p>
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
            <v-col sm="12" class="pl-6">
               <input type="text" class="w-full" v-model="barcodeInput" placeholder="Barcode Number"/>
            </v-col>
            <v-col sm="12" class="p-0 w-full">
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
              height="75vh"
              :scroll-by-content="true"
              :scroll-by-thumb="true"
              show-scrollbar="always"
              :bounce-enabled="true"
            >
            <div class="row">
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
                <div class="inventory-title">Name:{{ item.name }}</div>
              </div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
              <div>This is a test</div>
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
              <div class="row bg-gray-800 text-white my-2 rounded p-1">
                <span class="mdi mdi-swap-horizontal-bold mdi-20 pr-4"></span><p>View Order</p> 
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
                    text="Cash"
                    type="success"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    text="Credit"
                    type="success"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
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
                    text="Discount"
                    type="warning"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    text="Split"
                    type="warning"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    text="Print"
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
                    text="Edit"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    text="Delete"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
                <div class="col-33p px-2 items-center">
                  <DxButton
                    text="Save"
                    type="danger"
                    class="w-full"
                    styling-mode="contained"
                    @click="testButton($event)"
                  />
                </div>
              </div>
              
            </DxScrollView>
          </div>
        </div>
        <multipane-resizer class="resixer"></multipane-resizer>
        <div class="pane p-1" :style="{ minWidth: '50px', width: '33%' }" style="flex-grow: 1;">
          <div class="container p-0">
            <div class="row bg-gray-700 text-white py-2">
              <div class="col-25p items-center">
                <p>Qty</p>
              </div>
              <div class="col-25p items-center">
                <p>Item</p>
              </div>
              <div class="col-25p items-center">
                <p>Each</p>
              </div>
              <div class="col-25p items-center">
                <p>Total</p>
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
              <div class="container p-0 w-full">
                <div class="row p-2">
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
                    <div class="inventory-title">Name:{{ item.name }}</div>
                  </div>
                </div>
                <div class="row delete justify-between" @click="editSelectedItem($event)" style="cursor: pointer;">
                  <div class="col-10p">
                    <div class="till-text">
                      3
                    </div>
                  </div>
                  <div class="col-40p">
                    <div class="till-text">
                      Lucy Sofa Set
                    </div>
                  </div>
                  <div class="col-20p">
                    <div class="till-text">
                      1350.00
                    </div>
                  </div>
                  <div class="col-20p">
                    <div class="till-text">
                      4050.00
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
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Transactions"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Inventory"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
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
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Gift Cards"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-33p px-1">
              <DxButton
                text="Loyalty Cards"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
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
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Reprint"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Hold"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
              />
            </div>
            <div class="col-25p px-1">
              <DxButton
                text="Resume"
                type="pos"
                styling-mode="contained"
                @click="saleButton($event)"
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

import DxResizable from 'devextreme-vue/resizable';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import DxButton from 'devextreme-vue/button';
import { confirm, custom, alert } from 'devextreme/ui/dialog';
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Components
import calculatorComponent from "@/pages/pos/new-pos/components/calculator-component.vue";

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
    calculatorComponent
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
				allItemsInTill: [],
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
			//Calculate Settings
			showCalc: true,
			calc: {
				value: 0,
				id: null
      },
      
      //Main Settings
			isOnLine: navigator.onLine,
      switchColors: {
        checked: ' #0BB804', unchecked: '#F03A00', disabled: '#0BB804'
      },
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
			selectedOrder: {},
      
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
				//Totals
				gratuity: 0,
				tax: 0,
				total: 0,
      },
      
      //Input Selectors
			inputFocusList: {
				"pos-login": "this.$refs.barcodeInput.$el.querySelector('input').focus()",
				CashPayment: "this.$refs.barcodeInput.$el.querySelector('input').focus()"
			},
    
    }
  },
  //***************************************Methods ********************************************** */
  methods: {
    testButton(e) {
      console.log("testButton e", e)
      
    },
    toggleNavBar() {
      this.$emit('navigated')
    },
    filterResults(e) {
      console.log("filterResults e", e)
      //Filter the active list of inventory being displayed
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.searchWords.toLowerCase())
      })
    },
    //Reset View
		resetView() {
			this.sharedData.allItemsInTill = [];
			this.orderForm.isSale = false;
			this.orderForm.isVoid = false;
			this.orderForm.isReturn = false;
			this.orderForm.subtotal = 0;
			this.orderForm.gratuity = 0;
			this.orderForm.tax = 0;
			this.orderForm.totalDiscounts = 0;
			this.orderForm.total = 0;
		},
		//Initiate Sale
		initSale() {
			if(this.orderForm.isReturn) {
				this.$f7.dialog.confirm("Do you want to cancel the current return?", "Order Change", () => {
					//User clicked OK
					console.log("User clicked OK");
					this.resetView();
					this.orderForm.isSale = true;
				}, () => {
					//User clicked Cancel
					console.log("User clicked Cancel");
					return
				}).open();
			}
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
			if(this.orderForm.isSale) {
				this.$f7.dialog.confirm("Do you want to cancel the current sale?", "Order Change", () => {
					//User clicked OK
					console.log("User clicked OK");
					this.resetView();
					this.orderForm.isReturn = true;
				}, () => {
					//User clicked Cancel
					console.log("User clicked Cancel");
					return
				}).open();
			}
			this.resetView();
			this.orderForm.isReturn = true;
		},

		//Ticket
		addItemToTill(id) {
			console.log("this.sharedData.allItemsInTill", this.sharedData.allItemsInTill);
			//Find item in Ticket First to increase QTY
			var findTillItem = this.sharedData.allItemsInTill.find((elem) => {
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
				this.sharedData.allItemsInTill.push(invObj);
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
			this.sharedData.allItemsInTill.splice(e, 1);
			this.calculateTotals();
		},
		calculateTotals() {
			//Reduce the tax rate from each item and add them up
			var taxRatePercent = 9.75;

			this.orderForm.subtotal = this.sharedData.allItemsInTill.reduce((acc, obj) => {
				return acc + parseFloat(obj.list_price) * parseFloat(obj.qty);
			}, 0);
			console.log("this.orderForm.subtotal", this.orderForm.subtotal);

			this.orderForm.tax = this.sharedData.allItemsInTill.reduce((acc, obj) => {
				return acc + (parseFloat(obj.list_price) * parseFloat(obj.qty) * taxRatePercent) / 100;
			}, 0);
			console.log("this.orderForm.tax", this.orderForm.tax);
			//Calculate Total Discounts
			// console.log("Object.keys(this.sharedData.allItemsInTill[0].discounted_price", Object.keys(this.sharedData.allItemsInTill[0].discounted_price));
			if (this.sharedData.allItemsInTill.length != 0) {
				if (this.sharedData.allItemsInTill[0].discount != undefined) {
					var sumDiscount = this.sharedData.allItemsInTill.reduce((acc, obj) => {
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
		editSelectedItem(e) {
      console.log("e", e)
      if(e.explicitOriginalTarget.classList.add("edit-item")) {
        e.explicitOriginalTarget.classList.remove("edit-item")
      } else {
        e.explicitOriginalTarget.classList.add("edit-item")
      }

			// if (this.selectedItem.id) {
			// 	this.selectedItem.id = null;
			// } else {
			// 	this.selectedItem.id = itemId;
			// }
			// console.log("itemId", itemId);
			// console.log("this.sharedData.allItemsInTill", this.sharedData.allItemsInTill);
			// var findOrderItem = this.sharedData.allItemsInTill.find((elem) => elem.id === itemId);
			// console.log("findOrderItem", findOrderItem);

			// this.calc.value = findOrderItem.qty;
			// this.calc.id = findOrderItem.id;
			// console.log("this.calc", this.calc);
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
			var findTillItem = this.sharedData.allItemsInTill.find((elem) => {
				return elem.id == id;
			});
			findTillItem.qty = this.calc.value;
			console.log("Orde qty has been updated", this.sharedData.allItemsInTill);
			this.selectedItem.id = null;
			this.calc.value = 0;
		},
    
    //LogOut
		logout() {
			this.$store.dispatch("signOut");
		},
		logon(credentials) {
			console.log(credentials);
			this.$store.dispatch("signIn", credentials);
		},
		clearBarcodeInterval() {
			console.log('clearBarcodeInterval');
			clearInterval(this.barcodeInterval);
		},
		startTimer() {
			this.barcodeInterval = setInterval(() => {
					this.$refs.barcodeInput.$el.querySelector('input').focus();
					// console.log("this", this);			
			}, 2000);
		},

  },
  computed: {
    ...mapState(["Auth", "Users", "Inventory", "Orders", "Static", "Errors"]),
		...mapGetters(["GET_INV_CATEGORY_LIST", "GET_INV_CATEGORY_LIST_LENGTH"]),
    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {

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
  text-align: center;
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

</style>

