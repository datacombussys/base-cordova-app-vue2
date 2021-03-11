import { mapState } from "vuex"
import { mapGetters } from "vuex"
import _ from "lodash"
import { UtilityMixins } from "@/mixins/utility-mixins"

export const ElavonConvergeSDKMixins = {
	name: "elavonConvergeSDKMixin",
	mixins: [
		UtilityMixins
	],
  data() {
    return {
     //Init System
			getEnvironment: {
				method: "getEnvironmentInfo",
				requestId: this.uuidv4(),
				targetType: "api",
				version: "1.0"
			},
			openGatewayData: {
				method: "openPaymentGateway",
				requestId: this.uuidv4(),
				targetType: "paymentGatewayConverge",
				version: "1.0",
				parameters: {
					app: "VMM",
					email: "merchant@emailaddress.com",
					merchantId: "0020546",
					pin: "N5JBB62QRISFTBM9HJ2Q50Q6HGOIR16NYPPYOYT9330GJR2TJYVLOSO5M8U378DP",
					userId: "apiUser",
					handleDigitalSignature: true,
					paymentGatewayEnvironment: "DEMO",
					vendorId: "sc100231",
					vendorAppName: "DataBoxx",
					vendorAppVersion: "1.0",
					overrideDefaultTerminalLanguage: {
						languageInformation: {
							languageCode: "UNSET",
							countryCode: "UNSET"
						}
					},
					overrideDebitNetworkPreferences : {
						visa: "NO_PREFERENCE",
						mastercard: "US_COMMON_DEBIT",
						discover: "GLOBAL_NETWORK"
					}
				}
			},

			//Card Reader Search
			startCardReaderSearchData: {
				method: "startCardReadersSearch",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
					timeout : 9000,
					updateIfNecessary:true,
					connect:true
				}
			},
			getCardSearchResults: {
				method: "getCardReadersSearchStatus",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
					commandId: null,
				}
			},
			//Get Card Reader Info
			getCardReaderInfoData:{
				method: "getCardReaderInfo",
				requestId: _.uniqueId(),
				targetType: "api",
				parameters: {
				}
			},
			//Get Device Status
			startDeviceStatusInfo: {
				requestId: _.uniqueId(),
				method:"startDeviceStatusOnCardReader",
				parameters:{
				}
			},
			getDeviceStatusInfo: {
				requestId: _.uniqueId(),
				method:"getCommandStatusOnCardReader",
				parameters:{
					id: null
				}
			},
			//ON-DEMAND FUNCTIONS
			// Reset Pinpad and Ping
			startCardReaderReset: {
				method: "startResetOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: { }
			},
			pingCardReaderResetData: {
				method: "getCommandStatusOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
					id: null,
				}
			},
			//Reboot Device
			startCardReaderRebootData: {
				method: "getDailyRebootTimeOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
					rebootTime: {
						hour: 21,
						minute: 235
					}
				}
			},
			pingCardReaderRebootData: {
				method: "getCommandStatusOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
					id: null
				}
			},
			//Capture Card Data
			startCardReadData: {
				method: "startCardReadOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
						retrievalModes: ["SWIPE", "MSD_PROXIMITY", "MANUALLY_ENTERED", "EMV_CONTACT", "EMV_PROXIMITY"]
				}
			},
			pingCardReaderData: {
				method: "getCommandStatusOnCardReader",
				requestId: _.uniqueId(),
				targetType: "cardReader",
				version: "1.0",
				parameters: {
						id: null
				}
			},
			
			//Set Device Configuation
			startDeviceConfigurationData: {
				method: "setDeviceConnectionConfiguration",
				requestId: _.uniqueId(),
				targetType: "api",
				parameters: {
					connectionCriteria: {
						providerTypes: ["INGENICO_RBA_UPP", "STAR"],
						connectionTypes: ["USB"],
						deviceTypes: ["CARD_READER", "PRINTER"],
					}
				}
			},
			getDeviceConfigData: {
				method: "getDeviceConnectionConfiguration",
				requestId: _.uniqueId(),
				targetType: "api"
			},

			//INTEGRATED WIZARD TRANSACTIONS

			//Sale Transaction
			startPaymentTransaction: {
				method: "startPaymentTransaction",
				requestId: _.uniqueId(),
				targetType: "paymentGatewayConverge",
				version: "1.0",
				parameters: {
					paymentGatewayId: null,
					transactionType: "SALE",
					baseTransactionAmount: {
						value: 2100,
						currencyCode: "USD"
					},
					tenderType: "CARD",
					cardType: null,
					isTaxInclusive: false,
					taxAmounts: [{
						value: 0,
						currencyCode: "USD"
					}],
					discountAmounts: null
				}
			},
			pingTransaction: {
				method: "getPaymentTransactionStatus",
				requestId: _.uniqueId(),
				targetType: "paymentGatewayConverge",
				version: "1.0",
				parameters: {
					paymentGatewayId: null,
					chanId: null
				}
			},

    }
  },
  methods: {
		// ESTABLISH NEW CONNECTION
		async intializeCommerceSDK() {
			return new Promise( async (resolve,  reject) => {
				// 1) Get Environment Info
				let SDKEnvironment = await this.$store.dispatch('GETSDKEnvironment', this.getEnvironment)
				console.log('SDKEnvironment', SDKEnvironment)
				return resolve(SDKEnvironment)
			})		
		},
		openGateway() {
			return new Promise( async (resolve, reject) => {
				// Pre) Open Gateway with Elavon - openPaymentGateway {credentials}
				let openGatewayResponse = await this.$store.dispatch('OPENGateway', this.openGatewayData) 
				console.log('openGatewayResponse', openGatewayResponse)
				return resolve(openGatewayResponse)
			})
		},

		// GET CARD READER SPECIFIC DETAILS
		//Single Call to get reader Information
		async getCardReaderInfo() {
			// Get card reader Info - getCardReaderInfo
			let cardReaderInfo = await this.$store.dispatch('GETReaderInfo', this.getCardReaderInfoData)
			console.log('cardReaderInfo', cardReaderInfo)
		},
		
		//Card Reader Search and Ping
		startCardReaderSearch() {
			console.log("startCardReaderSearch")
			return new Promise( async (resolve, reject) => {
				// 1) Search for PinPad - startCardReadersSearch
				let cardSearch = await this.$store.dispatch('STARTReaderSearch', this.startCardReaderSearchData)
				console.log('cardSearch', cardSearch)
				//Search already in progress
				if(cardSearch.data.data.statusDetails === "SEARCH_ALREADY_IN_PROGRESS") {
					this.getSearchResultsOnly()
					return resolve()
				}
				//Search not completed yet
				else {
					this.getCardSearchResults.parameters.commandId = cardSearch.data.data.cardReadersSearch.commandId
					console.log('this.getCardSearchResult', this.getCardSearchResults)
					// 2) Get Search Results - getCardReadersSearchStatus - (polling)
					setTimeout( async () => {
						let ping = true
						let x = 0
						if(x > 10) {ping = false}
						while(ping) {
							let response = await this.setReaderSearchPingTimer()
							console.log("response", response)
							if(response.data.data.cardReadersSearch.completed) {
								ping = false
								return resolve(response.data.data)
							} else {
								ping = true
								x+=1
							}
						}
					}, 2000);
				} 
			})
		},
		setReaderSearchPingTimer() {
			console.log("setReaderSearchPingTimer")
			return new Promise( async (resolve, reject) => {
				this.getCardSearchResults.parameters.id = this.$store.getters.RETURN_startCardReaderSearch_ID
				setTimeout( async () => {
					console.log("setTimeout")
					let cardSearchResults = await this.$store.dispatch('GETReaderSearchResults', this.getCardSearchResults) 
					console.log('cardSearchResults', cardSearchResults)

					return resolve(cardSearchResults)
				}, 1000);
			})
		},
		async getSearchResultsOnly() {
			console.log('getSearchResultsOnly start')
			this.getCardSearchResults.parameters.id = this.$store.getters.RETURN_startCardReaderSearch_ID
			let cardSearchResults = await this.$store.dispatch('GETReaderSearchResults', this.getCardSearchResults) 
			console.log('cardSearchResults', cardSearchResults)
		},

		// Device Status Check and Ping
		startDeviceStatus() {
			console.log("startDeviceStatus")
			return new Promise( async (resolve, reject) => {
				let cardReaderStatus = await this.$store.dispatch('STARTDeviceStatus', this.startDeviceStatusInfo)
				console.log('cardReaderStatus', cardReaderStatus)

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.setDeviceStatusPing()
						console.log("response", response)
						if(response.data.data.cardReaderCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		setDeviceStatusPing() {
			console.log("setReaderSearchPingTimer")
			return new Promise( async (resolve, reject) => {
				this.getDeviceStatusInfo.parameters.id = this.RETURN_startDeviceStatusInfo_ID;
				setTimeout( async() => {
					console.log("setTimeout")
					let deviceStatus = await this.$store.dispatch('PINGDeviceStatus', this.getDeviceStatusInfo) 
					console.log('deviceStatus', deviceStatus)

					return resolve(deviceStatus)
				}, 1000);
			})
		},


		// MANUAL ONDEMAND TRASNACTIONS TO TERMINAL

		//Reset Payment Terminal and Ping
		resetPaymentDevice() {
			return new Promise( async (resolve, reject) => {
				let resetTransactions = await this.$store.dispatch('STARTCardReaderReset', this.startCardReaderReset) 

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.pingCardReaderReset()
						console.log("response", response)
						if(response.data.data.cardReaderCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		pingCardReaderReset() {
			//Status of resetting the terminal before processing transaction
			return new Promise( async (resolve, reject) => {
				setTimeout( async () => {
					this.pingCardReaderResetData.parameters.id = this.$store.getters.CARD_READER_RESET_ID
					let pingReaderReset = await this.$store.dispatch('PINGCardReaderReset', this.pingCardReaderResetData) 
					return resolve(pingReaderReset)
				}, 1000);
			})
		},
		//24 Hr Card Reader Reboot
		rebootPaymentDevice() {
			return new Promise( async (resolve, reject) => {
				let rebootDevice = await this.$store.dispatch('STARTCardReaderReboot', this.startCardReaderRebootData) 

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.pingCardReaderReboot()
						console.log("response", response)
						if(response.data.data.cardReaderCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		pingCardReaderReboot() {
			//Status of resetting the terminal before processing transaction
			return new Promise( async (resolve, reject) => {
				setTimeout( async () => {
					console.log("this.$store.getters.RETURN_REBOOT_ID2", this.VTHPP.startCardReaderReboot.data.cardReaderCommand.id)
					this.pingCardReaderRebootData.parameters.id = this.VTHPP.startCardReaderReboot.data.cardReaderCommand.id
					let pingReaderReboot = await this.$store.dispatch('PINGCardReaderReboot', this.pingCardReaderRebootData) 
					return resolve(pingReaderReboot)
				}, 1000);
			})
		},
		//Set Device Configuration
		setDeviceConfiguration() {
			return new Promise( async (resolve, reject) => {
				let deviceConfig = await this.$store.dispatch('STARTSetDeviceConfiguration', this.startDeviceConfigurationData) 
				console.log('deviceConfig',deviceConfig)

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.getDeviceConfiguration()
						console.log("response", response)
						if(response.data.data.cardReaderCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		async setDeviceConfiguration() {
			console.log('getSearchResultsOnly start')
			let deviceConfig = await this.$store.dispatch('STARTSetDeviceConfiguration', this.startDeviceConfigurationData)
			console.log('deviceConfig', deviceConfig)
		},
		async getDeviceConfiguration() {
			console.log('getSearchResultsOnly start')
			let deviceConfig = await this.$store.dispatch('GETDeviceConfiguration', this.getDeviceConfigData)
			console.log('deviceConfig', deviceConfig)
		},

		//Capture Card Data and Ping
		onDemandCaptureCardData() {
			return new Promise( async (resolve, reject) => {
				let cardData = await this.$store.dispatch('STARTCardReadOnCardReader', this.startCardReadData) 
				console.log('cardData', cardData)

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.pingCaptureCardData()
						console.log("response", response)
						if(response.data.data.cardReaderCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		pingCaptureCardData() {
			return new Promise( async (resolve, reject) => {
				setTimeout( async () => {
					this.pingCardReaderData.parameters.id = this.$store.getters.RETURN_startCardReadData_ID
					let pingCardRead = await this.$store.dispatch('PINGCardReadOnCardReader', this.pingCardReaderData) 
					console.log('pingCardRead', pingCardRead)
					return resolve(pingCardRead)
				}, 1000);
			})
		},

		

		// INTEGRATED TRANSACTIONS FULL PROCESS
		saleSDKTransaction() {
			return new Promise( async (resolve, reject) => {
				this.startPaymentTransaction.parameters.paymentGatewayId = this.$store.getters.RETURN_PAYMENT_GATEWAY_ID
				let startTransaction = await this.$store.dispatch('STARTPaymentSale', this.startPaymentTransaction) 
				console.log('startTransaction', startTransaction)

				setTimeout( async () => {
					let ping = true
					let x = 0
					if(x > 10) {ping = false}
					while(ping) {
						let response = await this.pingSaleTransaction()
						console.log("response", response)
						if(response.data.data.paymentGatewayCommand.completed) {
							ping = false
							return resolve(response.data.data)
						} else {
							ping = true
							x+=1
						}
					}
				}, 1000);
			})
		},
		pingSaleTransaction() {
			console.log("pingSaleTransaction")
			return new Promise( async (resolve, reject) => {
				this.pingTransaction.parameters.paymentGatewayId = this.$store.getters.RETURN_PAYMENT_GATEWAY_ID
				this.pingTransaction.parameters.chanId = this.$store.getters.RETURN_startPaymentTransaction_chanId
				setTimeout( async () => {
					// 2) Query status of transaction - getPaymentTransactionStatus
					let transactionResponse = await this.$store.dispatch('PINGPaymentSale', this.pingTransaction) 
					console.log('transactionResponse', transactionResponse)
					return resolve(transactionResponse)
				}, 1000)
			})
		},
		

	},
	computed: {
		...mapState(["Auth", "VTHPP", "Common"]),
		...mapGetters(["CARD_READER_RESET_ID", "RETURN_startDeviceStatusInfo_ID"]),
	},
  async mounted() {
		console.log('this.Common.platform', this.Common.platform)
		if(this.Common.platform === "Electron") {
			let commerceSDK = await this.intializeCommerceSDK()
			if(commerceSDK.data.data.cwsInfo.name.length != 0) {
				let gateway = await this.openGateway()
			}
		}
  },
  created() {

  }
}