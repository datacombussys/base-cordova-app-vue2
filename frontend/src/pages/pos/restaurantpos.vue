<template>
	<f7-page name="restaurantpos">
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
							<f7-col width="20" class="quarterbox-top">
							<f7-block-header>Order Type</f7-block-header>
								<f7-row>
									<f7-col width="50 padding-left">
										<f7-button class="tall-button padding-half" @click="testButton" fill>Dine-In</f7-button>
									</f7-col>
									<f7-col width="50">
										<f7-button class="tall-button bg-color-red margin-right padding-half" fill>Take-Out</f7-button>
									</f7-col>
								</f7-row>
							</f7-col>
							<f7-col width="25" class="quarterbox-top margin-left-half">
							<f7-block-header>Transaction Type</f7-block-header>
								<f7-row class="display-flex justify-content-space-evenly">
									<f7-col width="30">
										<f7-button class="tall-button bg-color-teal padding-half" fill style="min-width:30%;">Sale</f7-button>
									</f7-col>
									<f7-col width="40">
										<f7-button class="tall-button bg-color-deeporange padding-half" fill style="min-width:30%;">Return</f7-button>
									</f7-col>
									<f7-col width="30">
										<f7-button class="tall-button bg-color-red margin-right padding-half" fill style="min-width:30%;">Void</f7-button>
									</f7-col>
								</f7-row>
							</f7-col>
							<f7-col width="25" class="quarterbox-top margin-left-half no-margin-top no-padding-top">
							<f7-block-header>Notifications</f7-block-header>
							<f7-row class="margin-half">
							<f7-row class="full-width">
								<div class="notifications">
									<h3>Server 1: Table 13 Food Ready</h3>
								</div>
							</f7-row>
							</f7-row>
							</f7-col>
							<f7-col width="30" class="quarterbox-top margin-left-half">
							<f7-row class="margin-half padding-bottom">
								<f7-col width="30">
										<f7-button class="med-button bg-color-gray no-padding no-margin" fill>Mgr</f7-button>
									</f7-col>
									<f7-col width="30">
										<f7-button class="med-button bg-color-blue no-padding no-margin" fill>Dash</f7-button>
									</f7-col>
									<f7-col width="30">
										<f7-button class="med-button bg-color-black text-color-white no-padding no-margin" fill>Admin</f7-button>
									</f7-col>
							</f7-row>
							<f7-row class="chevrons margin-half display-flex bg-color-white padding-half">
								<div class="chevron1">
									<p>Place <br />Order</p>
								</div>
								<div class="chevron2">
									<p>Deliver<br /> Food</p>
								</div>
								<div class="chevron3">
									<p>Tender <br />Sale</p>
								</div>
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
								<f7-col resizable class="thirdbox-middle mbox-1 no-padding display-flex">
									
									<f7-row class="full-width margin-top-half inv-header padding-bottom-half padding-right-half">
										<f7-col width="50" class="margin-top-half">
											<f7-input class="bg-color-white"
												label="Search"
												type="select" 
												placeholder="Select category"
												outline>
													<option value="All">-Select Category-</option>
													<option value="Shoes">Shoes</option>
													<option value="Food">Food</option>
												</f7-input>
										</f7-col>
										<f7-col width="50" class="margin-top-half">
											<f7-input class="bg-color-white"
											label="Search"
											type="text" 
											placeholder="Sku / Item / Description"
											outline
											clear-button></f7-input>
										</f7-col>
									</f7-row>
									<f7-row class="inventory-row margin-top-half full-width full-height">
										
											<f7-col class="display-flex justify-content-start category-box">
												<f7-link class="align-self-center text-color-white" panel-open="left">
													<b-icon icon="chevron-double-right"></b-icon>
												</f7-link>
											</f7-col>
											<f7-col class="inventory-div">
												<custom-scrollbar class="scroll-area inventory-div" :settings="settings" @ps-scroll-y="scrollHandle"> 
													<div v-for="item in Inventory.inventoryList" 
													:key="item.id" 
													class="inventory-item no-margin no-padding"
													@click="addItemToTill(item.id)">
														<div class="inventory-img">
															<img :src="item.profile_img">
														</div>
														<div class="inventory-title">{{ item.name }}</div>
													</div>
												</custom-scrollbar>
											</f7-col>
										
									</f7-row>
								</f7-col>
								<!-- End Inventory -->
						
								<!-- Begin Calculator -->
								<f7-col resizable class="thirdbox-middle margin-left-half">
									<div id="calculator" class="margin-top-half padding-half">
										<input type="string" class="calculator-input" :value="calc.value" @keyup.enter="getResult()">
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
									<f7-row class="calc-row" style="margin-right:12px;">
										<f7-col width="33">
											<f7-button fill @click="saveQty" class="bg-color-green calc-button">Save</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color-green calc-button">Edit Item</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color-green calc-button">Qty</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="calc-row" style="margin-right:12px;">
										<f7-col width="33">
											<f7-button fill class="bg-color-orange calc-button">Split</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color-orange calc-button">Discount</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color-orange calc-button">Print</f7-button>
										</f7-col>
									</f7-row>
									<f7-row class="calc-row" style="margin-right:12px;">
										<f7-col width="33">
											<f7-button fill class="bg-color blue calc-button">Cash</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color blue calc-button">Credit</f7-button>
										</f7-col>
										<f7-col width="33">
											<f7-button fill class="bg-color blue calc-button">Gift</f7-button>
										</f7-col>
									</f7-row>
								</f7-col>
								<!-- End Calculator -->
								<!-- Begin Till -->
								<f7-col resizable class="thirdbox-middle margin-left-half mbox-3">
									<div class="till justify-content-space-evenly">
									<f7-row class="full-width padding-half till-header">
										<f7-col width="20" class="display-flex justify-content-center">
											<div class="text-align-center">QTY</div>
										</f7-col>
										<f7-col width="40" class="display-flex justify-content-center">
											<div class="text-align-center">ITEM</div>
										</f7-col>
										<f7-col width="20" class="display-flex justify-content-center">
											<div class="text-align-center">EACH</div>
										</f7-col>
										<f7-col width="20" class="display-flex justify-content-center">
											<div class="text-align-center">TOTAL</div>
										</f7-col>
									</f7-row>
									<!--Till Content Rows-->
									<f7-row class="full-height align-content-flex-start till-container">
										<custom-scrollbar class="scroll-area-till inventory-div" :settings="settings" @ps-scroll-y="scrollHandle"> 
											<f7-row @click="testButton" 
												v-for="item in updateQty" 
												:key="item.id" 
												class="full-width padding-half till-item-row">
												<f7-col width="20" class="display-flex justify-content-center">
													<div class="qtyButton" @click="editQty(item.id)">
													<p>{{ item.qty }}</p>
													</div>
												</f7-col>
												<f7-col width="40" class="display-flex justify-content-center">
													<div>
													<p>{{ item.name }}</p>
													</div>
												</f7-col>
												<f7-col width="20" class="display-flex justify-content-center">
													<div>
													<p>{{ item.sale_price || item.list_price }}</p>
													</div>
												</f7-col>
												<f7-col width="20" class="display-flex justify-content-center">
													<div>
													<p>{{ item.qty * item.sale_price ||  item.qty * item.list_price}}</p>
													</div>
												</f7-col>
											</f7-row>
											<f7-row class="full-width padding">
												<f7-col width="50" class="total-text">
													<div>Subtotal</div>
													<div>Tax</div>
													<div>Gratuitity</div>
													<div>Total</div>
												</f7-col>
												<f7-col width="50" class="text-align-right total-text">
													<div>$ 6.98</div>
													<div>$ 34.25</div>
													<div>$ 18.90</div>
													<div>$ 24.95</div>
												</f7-col>
											</f7-row>
									</custom-scrollbar>
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
						<f7-col width="30" class="thirdbox-bottom full-width">
						<f7-block-header>Quick Links</f7-block-header>
							
							<f7-row class="display-flex justify-content-space-around">
								<f7-col width="25" class="padding-left">
									<f7-button class="bottom-button bg-color-teal padding-half" fill><span>Client Lookup </span> </f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-teal padding-half" fill><span>Trans Lookup</span> </f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-teal padding-half" fill><span>Gift Card</span> </f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-teal margin-right padding-half" fill><span>Tip Adjust</span> </f7-button>
								</f7-col>
							</f7-row>
						</f7-col>
						<f7-col width="35" class="thirdbox-bottom margin-left-half full-width">
						<f7-block-header>Table Management</f7-block-header>
							<f7-row class="display-flex justify-content-space-between">
								<f7-col width="25" class="padding-left">
									<f7-button class="bottom-button bg-color-deeporange padding-half" fill>Assign Table</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-deeporange padding-half" fill>Find Table</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-deeporange padding-half" fill>Asssign Seat</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-deeporange margin-right padding-half" fill>Send Order</f7-button>
								</f7-col>
							</f7-row>
						</f7-col>
						<f7-col width="30" class="thirdbox-bottom margin-left-half full-width">
						<f7-block-header>Order Management</f7-block-header>
							<f7-row class="display-flex justify-content-space-between">
								<f7-col width="25" class="padding-left">
									<f7-button class="bottom-button bg-color-orange padding-half" fill>Order Note</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-orange padding-half" fill>Add Item</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-orange padding-half" fill>Hold Item</f7-button>
								</f7-col>
								<f7-col width="25">
									<f7-button class="bottom-button bg-color-red margin-right padding-half" fill>Rush Order</f7-button>
								</f7-col>
							</f7-row>
						</f7-col>
						<f7-col width="5" class="thirdbox-bottom margin-left-half">
						<f7-block-header>Logout</f7-block-header>
							<f7-row class="full-width">
								<f7-col width="100" class="margin-right margin-left">
									<f7-button class="bottom-button bg-color-black text-color-white padding-half margin-bottom" fill>Logout</f7-button>
								</f7-col>
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
		



	</f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

export default {
	name: "restaurantPOS",
	data() {
		return {
			//Scrollbar Settings
			settings: {
				maxScrollbarLength: 120
			},
			//Calculator
			calc: {
				value: 0,
				id: null,
			},
			logs: [],
			allItems: [],
			orderForm: {
				table: null,
				qty_customers: null,

		
			}
		};
	},

	methods: {
		testButton() {
			console.log("this", this.$f7router);
			console.log("this.allItems", this.allItems);
			
		},
		//Ticket
		addItemToTill(id) {
			//Find item in Ticket First to increase QTY
			var findTillItem = this.allItems.findIndex(elem => {
        return elem.id == id;
			})
			if(findTillItem === -1) {
				//Then add from Inventory if not already in list
				var findIndexPos = this.Inventory.inventoryList.findIndex(elem => {
					return elem.id == id;
				});
				console.log("findIndexPos", findIndexPos);
				var oneItem = this.Inventory.inventoryList[findIndexPos];
				oneItem.qty = 1;
				this.allItems.push(oneItem);
			} else {
				console.log("findTillItem Obj", this.allItems[findTillItem]['qty']);
				this.allItems[findTillItem]['qty'] += 1;
				this.$forceUpdate();

				//Why is this not updating my DOM?
				// https://vuejs.org/v2/guide/list.html#Caveats
				// this.$parent.setState({
				// 	currentObj: oldVal += 1,
				// 	});
			}
			
		},
		editTecketItem() {
			console.log("test")
		},
		editQty(id){
			console.log("id", id)
			//Find object in array
			var findTillItem = this.allItems.findIndex(elem => {
        return elem.id == id;
			})
			this.calc.value = this.allItems[findTillItem]['qty'];
			this.calc.id = this.allItems[findTillItem]['id'];
		},
		
		saveQty() {
			//Find object in array
			var id = this.calc.id;
			console.log("this.calc.id", this.calc.id);
			var findTillItem = this.allItems.findIndex(elem => {
        return elem.id == id;
			})
			this.allItems[findTillItem]['qty'] = this.calc.value;
			console.log("Orde qty has been updated", this.allItems);
		},
		//Calculator
		addExpresion(e) {
      if ( Number.isInteger(this.calc.value) )
        this.calc.value = ''; 
      this.calc.value += e;
		},
		//Calculator
    getResult() {
      let log = this.calc.value;
      this.calc.value = eval(this.calc.value);
      this.logs.push( log + `=${this.calc.value}` );
		},
		//Calculator
    clear() {
      this.calc.value = 0;
		},
		//Calculator
    del() {
      this.calc.value = this.calc.value.slice(0, -1);
		},
		//Scrollbar
		scrollHandle(evt) {
		}
	},
	computed: {
		...mapState(["Users", "Inventory"]),
		...mapGetters(['getInventoryBarcodes']),
		updateQty() {
			return this.allItems;
		}
	},
	watch: {
	},
	mounted() {
		this.$store.dispatch("getInventoryList");
	}
};
</script>

<style lang="scss" scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
.scroll-area-till {
  position: relative;
  margin: auto;
  width: 100%;
  height: 80%;
}
.main-row {
	padding-top: 8px;
	padding-bottom: 0px;
	padding-right: 8px;
	padding-left: 8px;
}
.quarterbox-top {
	width: 100%;
	border: 2px solid black;
	background: lightblue;
	height: 18vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;
		font-size: 1.25em;
		font-weight: 900;
	}
}
.thirdbox-middle {
	border: 2px solid black;
	background: lightblue;
	height: 64vh;
	min-width: 290px;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;
		font-size: 1.25em;
		font-weight: 900;
	}
}
.thirdbox-bottom {
	border: 2px solid black;
	background: lightblue;
	height: 15vh;
	p {
		margin-top: 5px;
		margin-bottom: 10px;
		text-align: center;
		font-size: 1.25em;
		font-weight: 900;
	}
}
.tall-button {
	display: flex;
	justify-content: center;
	height: 5.5rem;
}
.bottom-button {
	display: flex;
	justify-content: center;
	height: 5.5rem;
	font-size: 1rem;
}
.med-button {
	display: flex;
	justify-content: center;
	height: 2em;

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
	background:  rgba(46, 180, 192, 1);
	clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0 100%, 25% 50%, 0% 0%);
	height: 4em;
	width: 33%;
	font-weight: 900;

	}
	.chevron3 {
	background:  rgba(3, 90, 98, 1);
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
		display: flex;
		justify-content: stretch;
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
			overflow-y: hidden;
			.inventory-item {
			border: 2px solid black;
			cursor:pointer;
			min-width: 150px;
			max-width: 200px;
			height: 6em;
			background: white;
			font-weight: 300;
			margin: 5px;
			background: rgb(47, 47, 47);
			
			.inventory-img {
				display: flex;
				background: rgb(235, 235, 235);
				height: 75%;
				text-align: center;
				justify-content: center;
				img {
					height: 75px;
				}
			}
			.inventory-title {
				text-align: center;
				font-weight:600;
				font-size: 1.25em;
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
	background:rgb(78, 78, 78);
	width: 5%;
	max-width: 25px;
	height: 90%;
}

//  CALCULATOR  \\
$darker: #2f2f31;
$dark: #424345;
$gray: #616163;
$white: #fff;
$light: #D4D4D2;
$accent: #f49e3f;

#calculator {
	// height:97%;
  margin: 10px;
  display: flex;
  padding: 0;
  max-width: 100%;
  min-width: 250px;
  flex-direction: column;
  background-color: $darker;

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
      content: '';
      z-index: 5;
      position: absolute;      
      background: linear-gradient(to bottom, $darker, rgba($darker, 0));
    }
    span {
      color: $light;
      opacity: .75;
      display: block;
      font-size: .8rem;
      text-align: right;
      margin-top: .4rem;
      line-height: 1;
      font-weight: lighter;
    }
  }

  .calculator-input {
    color: $light;
		height: 4.5rem;
    width: 90%;
    border: none;
    padding: .8rem;
    display: block;
    font-size: 2.4rem;
    background: none;
    text-align: right;
    font-weight: lighter;
    &:focus, &:active {
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
      &.wide { flex: 2; }
    }
  }

  .calculator-btn {
		width: 100%;
		height:3.5rem;
    color: $light;
    border: none;
    cursor: pointer;
    padding: .8rem;
    outline: none;
    font-size: 1.6rem;
    transition: all .3s ease-in-out;
    font-weight: 200;
    justify-content: center;
    background-color: $gray;
    &.accent { background-color: $accent; color: $white;}
    &.gray { background-color: $dark;}
    &.action { }
    &:active {
      background-color: $darker;
    }
  }
}
.calc-row{
	margin: 4px;
	
	.calc-button{
		display: flex;
		justify-content: center;
		margin: 3px;
		width:100%;
		height: 50px;
}
}

.till {
	background: white;
	margin: 10px;
	height: 95%;

	.till-header{
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
	overflow-y: hidden;
	max-height: 80%;
}
.inv-header{
	background: lightgrey;
}
.total-text{
	font-family: OpenSans-Bold;
	font-weight: 500;

}

</style>