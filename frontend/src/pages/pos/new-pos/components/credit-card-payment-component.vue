
<template>
	<div>
		<v-navigation-drawer
			v-model="openedCCDrawer"
			:mini-variant.sync="miniDrawer"
      class="teal accent-1"
			width="90%"
			absolute
			right
    >
			<div class="container">
				<div class="d-list">
					<div class="d-list-item border-b border-gray-500">
						<div class="row">
							<div class="col-6">
								Subtotal
							</div>
							<div class="col-6 text-end">
								{{ paymentForm.subtotal || 0.00 | formatDollar}}
							</div>
						</div>
					</div>
					<div class="d-list-item border-b border-gray-500">
						<div class="row">
							<div class="col-6">
								Discounts
							</div>
							<div class="col-6 text-end">
								{{ paymentForm.totalDiscounts || 0.00 | formatDollar}}
							</div>
						</div>
					</div>
					<div class="d-list-item border-b border-gray-500">
						<div class="row">
							<div class="col-6">
								Tax
							</div>
							<div class="col-6 text-end">
								{{ paymentForm.tax || 0.00 | formatDollar}}
							</div>
						</div>
					</div>
					<div class="d-list-item border-b border-gray-500">
						<div class="row font-bold text-xl">
							<div class="col-6">
								Total
							</div>
							<div class="col-6 text-end">
								{{ grandTotal || 0.00 | formatDollar}}
							</div>
						</div>
					</div>
				</div>
				<!-- Enter Payment Amount -->
				<div class="d-list">
					<div class="d-list-item">
						<div class="row">
							<div class="col-6 pt-7 title text-center">
								Received
							</div>
							<div class="col-6">
								<v-text-field
									outlined
									prefix="$"
									background-color="grey lighten-3"
									@input="amtReceived = $event"
									:value="amtReceived>0? amtReceived:grandTotal"
								></v-text-field>
							</div>
						</div>
					</div>
				</div>

				<!-- Credit Card Details -->
				<div class="headline-4">
					Tender Payment
				</div>
				<div class="d-list">
					<div class="d-list-item">
						<div class="row">
							<div class="col-12 p-0">
								<v-text-field
									id="CCFieldInput"
									ref="ccField"
									filled
									solo
									outlined
									label="Card Number"
									background-color="grey lighten-3"
									@input="tempCCNumber = $event"
									:value="parsedCCNumber"
									v-mask="CCmask"
								></v-text-field>
							</div>
						</div>
						<div class="row">
							<div class="col-6 p-0">
								<v-text-field
									filled
									solo
									outlined
									label="Exp Date"
									background-color="grey lighten-3"
									v-model="expDate"
									v-mask="'##/##'"
								></v-text-field>
							</div>
							<div class="col-6 p-0">
								<v-text-field
									filled
									solo
									outlined
									label="CVV"
									background-color="grey lighten-3"
									v-model="CVVCode"
								></v-text-field>
							</div>
						</div>
					</div>
				</div>
				
			<!-- END Container -->
			</div>
      
			<!-- SLOTS -->
      <template v-slot:prepend>
        <div class="p-2 teal accent-4">
					<div class="row">
						<div class="col-10 p-0 flex items-center">
							<div class="headline-5">
								Credit Card Sale
							</div>
						</div>
						<div class="col-2 p-0 text-center">
							<v-btn icon @click="closeCCDrawer">
								<v-icon>mdi mdi-close-circle</v-icon>
							</v-btn>
							
						</div>
					</div>
          
        </div>
      </template>
			<template v-slot:append>
				<div class="row">
					<div class="col-12 p-2 teal accent-4">
						<v-btn 
							block
							@click="newSale">
							Process
						</v-btn>
					</div>
				</div>
				<div class="row">
					<div class="col-12 p-2 teal accent-4">
						<v-btn 
							block
							@click="testingMethod">
							Test
						</v-btn>
					</div>
				</div>
        
      </template>
    </v-navigation-drawer>
	</div>
</template>

<script>
import { mapState } from "vuex";
var moment = require("moment");
import _ from "lodash"
import axios from 'axios';


import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
	name: "creditCardPaymentComponent",
	mixins: [],
	components: {
		DxScrollView
	},
	props: {
		openedCCDrawer: {
			type: Boolean,
			required: true
		},
		paymentForm: {
			type: Object,
			required:	true
		},
		grandTotal: {
			type: Number,
			required: false
		}
	},
	data() {
		return {
			miniDrawer: false,
			items: [
				{ title: 'Dashboard', icon: 'dashboard' },
				{ title: 'Account', icon: 'account_box' },
				{ title: 'Admin', icon: 'gavel' },
			],

			//Debounce Function
			debouncedFunction: null,
			//Transaction Data
			expDate: null,
			CVVCode: null,
			amtReceived: 0,
			parsedCCNumber: null,
			fullTrackNumber: null,
			tempCCNumber: "",
			CCmask: "#### #### #### ####",

			//Converge Transaction Data
			newCCSale: {
				is_demo: true,
				ssl_merchant_id: "020546",
				ssl_user_id: "apiUser",
				ssl_pin: "FJK5E3AFRQ8OMA2JC9E900XKG76KLAYCR3SBFLUASUPLAYYQKC1KURRWRRPZE8RJ",
				ssl_test_mode: true,
				ssl_vendor_id: "sc100231",
				ssl_partner_app_id: "AY",
				
				ssl_transaction_type: "ccsale",
				ssl_card_number: '4000000000000002',
				ssl_exp_date: '0124',
				ssl_cvv2cvc2: "002",
				ssl_amount: "45.95",
				// ssl_vm_mobile_source: "NOMOB"
			},
			newCCReturn: {
				ssl_txn_id: "wefojerfo"
			},
			newCCGetToken: {
				ssl_test_mode: true,
				ssl_transaction_type: "ccgettoken",
				ssl_merchant_id: "500712",
				ssl_user_id: "webpage",
				ssl_pin: "TEUND4HS7E7LWALYXFDT3VCLZ9RCFC1NU3Y34TCKW5XHBQTF7UTKTO1SOLZTHIG1",
				ssl_vendor_id: "sc100231",
				ssl_card_number: '4000000000000002',
				ssl_exp_date: '0124',
				ssl_avs_address: '123 easy st',
				ssl_avs_zip: '94041',
				ssl_verify: "N",
				ssl_add_token: "N",
				ssl_vm_mobile_source: "NOMOB"
			},
			//Converge Responses
			setResponse: null,
			getResponse: null,
			returnResponse: null,
			getTokenResponse: null,

			//Ingenico IPP320
			IPP320Installed: false,
			CommerceSDKRequest: {
				targetType: "cardReader",
				method: "post",
				requestId: "",
				parameters: {}
			},
			confirmWorkingCWS: {
				targetType : "api",
				method : "getEnvironmentInfo",
				requestId : "d002edbd-010a-4c51-8407-f14b80c49bf4",
				version : "1.0"
			},
			getCardReaderInfo:{
				method : "getCardReaderInfo",
				requestId : "1",
				targetType : "api",
				parameters : { }
			},
			//Transactions
			openGateway: {
				method : "openPaymentGateway",
				requestId : "1326383996",
				targetType : "paymentGatewayConverge",
				version : "1.0",
				parameters : {
					app : "VMM",
					email : "merchant@emailaddress.com",
					merchantId: "0020546",
					pin : "N5JBB62QRISFTBM9HJ2Q50Q6HGOIR16NYPPYOYT9330GJR2TJYVLOSO5M8U378DP",
					userId : "apiUser",
					handleDigitalSignature : true,
					paymentGatewayEnvironment : "DEMO",
					vendorId : "sc100231",
					vendorAppName : "DataBoxx",
					vendorAppVersion : "1.0",
					overrideDefaultTerminalLanguage : {
						languageInformation : {
							languageCode : "UNSET",
							countryCode : "UNSET"
						}
					},
					overrideDebitNetworkPreferences : {
						visa : "NO_PREFERENCE",
						mastercard : "US_COMMON_DEBIT",
						discover : "GLOBAL_NETWORK"
					}
				}
			},
			startPaymentTransaction: {
				method : "startPaymentTransaction",
				requestId : "32878540",
				targetType : "paymentGatewayConverge",
				version : "1.0",
				parameters : {
					paymentGatewayId : "11b0032b-eb0d-4d9a-8664-eb430684cb92",
					transactionType : "SALE",
					baseTransactionAmount : {
						value : 2000,
						currencyCode : "USD"
					},
					tenderType : "CARD",
					cardType : null,
					isTaxInclusive : false,
					taxAmounts : [{
						value : 0,
						currencyCode : "USD"
					}],
					discountAmounts : null
				}
			}

			
		};
	},
	methods: {
		testingMethod(e) {
			// this.$refs.ccField.$el.querySelector('input').focus()
			console.log("grandTotal", this.grandTotal);
			console.log("amtReceived", this.amtReceived);
			let ccField = document.getElementById("CCFieldInput")
			console.log("ccField",ccField)
			ccField.focus()
		},
		closeCCDrawer() {
			console.log("Closing Drawer")
			this.$emit("closeCCDrawer", false)
		},
		//Converge Transaction Methods
		newSale() {
			this.newSale.ssl_amount = this.amtReceived
			console.log("this.newSale.ssl_amount",this.newSale.ssl_amount)
			this.newSale.ssl_exp_date = this.expDate
			console.log("this.newSale.ssl_exp_date",this.newSale.ssl_exp_date)
			this.newSale.ssl_cvv2cvc2 = this.CVVCode
			console.log("this.newSale.ssl_cvv2cvc2",this.newSale.ssl_cvv2cvc2)
			this.$store.dispatch("POSTElavonConvergeSale", this.newSale)

		},
		newReturn() {
			axios.post("/django/elavon2/", this.newReturn).then(response => {
				console.log('response', response)
				this.returnResponse = response
			})
		},
		newGETToken() {
			axios.post("/django/elavon2/", this.newGetToken).then(response => {
				console.log('response', response)
				this.returnResponse = response
			})
		},
		initializeIngenicoConnection() {
			// 1) Search for PinPad - startCardReadersSearch
			// 2) Get Search Results - getCardReadersSearchStatus - (polling)
			// 3) Set device to Active and use this device for all calls moving forward
			// 4) Get card reader Info - getCardReaderInfo
		},
		//CommerceSDK PINPAD Methods
		startTransaction() {

			// 1) Open Gateway with Elavon - openPaymentGateway {credentials}
			// 2) Start Gateway Transaction - startPaymentTransaction
			// 3) Query status of transaction - getPaymentTransactionStatus
		},
		//Parse CC Number with Lodash
		parseCCNumber(track) {
			return new Promise( async(resolve, reject) => {
				console.log('track', track)
				let parsedData = track.slice(2,19)

				this.fullTrackNumber = track
				console.log('this.fullTrackNumber', this.fullTrackNumber)

				return resolve(parsedData)
			})
		},
		parseExpDate() {
			console.log('parseExpDate this.fullTrackNumber', this.fullTrackNumber)
			var newexpDate = this.fullTrackNumber.split("=")[1]
			console.log('newexpDate', newexpDate)
			let year = newexpDate.slice(0,2)
			let month = newexpDate.slice(2,4)

			this.expDate = month + year
		},
		async creditCardNumber(evt) {
			console.log('evt', evt)
			console.log('this.tempCCNumber', this.tempCCNumber)
			
			if(this.tempCCNumber.startsWith("%")) {
				let response = await this.parseCCNumber(this.tempCCNumber)
				this.parsedCCNumber = response
				this.parseExpDate()
			} else {
				this.parsedCCNumber = this.tempCCNumber
			}
		},
		focusChange() {
			console.log("focusChange")
			// console.log("this.$refs.ccField", this.$refs.ccField)
			// this.$refs.ccField.$el.querySelector('input').focus()
			let ccField = document.getElementById("CCFieldInput")

			setTimeout(function(){ 
				console.log("ccField",ccField)
				ccField.focus()
			}, 1000);
			
			
		}

	},
	computed: {
		returnCCNumber() {
			//%B4744880048805541^CHRISTENSEN/IAN^2203201000000000893100931000000?;4744880048805541=22032010000000008931?
		}
		
	},
	watch: {
		//Runs when tempNumber is changed
		tempCCNumber: function(oldVal, newVal) {
			console.log("tempCCNumber changed")
			this.debouncedFunction()
		}
	},
	created() {
		this.debouncedFunction = _.debounce(this.creditCardNumber, 500)
	},
	mounted() {
		this.IPP320Installed = true
	}
};
</script>

<style scoped lang="scss">

</style>
