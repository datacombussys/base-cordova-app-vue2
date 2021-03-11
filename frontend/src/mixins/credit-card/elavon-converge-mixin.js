import { mapState } from "vuex"
import { mapGetters } from "vuex"
import _ from "lodash"
import { UtilityMixins } from "@/mixins/utility-mixins"
import { UniversalMixins } from "@/mixins/universal-mixins"

export const ElavonConvergeMixins = {
	name: "elavonConvergeMixin",
	mixins: [
		UtilityMixins,
		UniversalMixins
	],
  data() {
    return {
			//CREDIT CARD TRANSACTIONS
			mainData: {
				ssl_amount: "26.45",
				ssl_dynamic_dba: "Sellers Central",
				ssl_txn_id: "00000000-0000-0000-0000-00000000000", // Required for Return and Void
				ssl_exclude_account_update: null, //Will not pass token to updater - for ccqueryoken
				ssl_first_name: null, // Required for ccupdatetoken
				ssl_flast_name: null, // Required for ccupdatetoken
			},
			cardData: {
				ssl_card_number: '5121212121212124',
				ssl_exp_date: '0123',
				ssl_card_present: null,
				ssl_track_data: null,
				ssl_enc_track_data: null, //Ingenico Encrypted Device
				ssl_encrypted_track1_data: null, //Required for Swiped and contactless
				ssl_encrypted_track2_data: null, //Required for Magtek Devices
				ssl_ksn: null, //Unique identifier generated from the swiped payment card and returned by the encrypting device. The KSN encrypts the PAN data through the DUKPT method
				ssl_vm_mobile_source: "NOMOB",
				ssl_vendor_id: null,//ssl_vendor_id: null //Important: Required for encrypting devices.
				ssl_mobile_id: null,
				ssl_token: null, //Required if ssl_merchant_initiated_unscheduled = Y.
				ssl_pos_mode: null,
				ssl_entry_mode: null,
			},
			accountData: {
				ssl_company: null,
				ssl_customer_id: null,
				ssl_avs_address: null,
				ssl_address2: null,
				ssl_avs_zip: null,
				ssl_city: null,
				ssl_state: null,
				ssl_country: null,
				ssl_email: null,
				ssl_phone: null,
				ssl_description: null,
				ssl_verify: null,
				
			},
			cardVerification: {
				ssl_cvv2cvc2: 333,
				ssl_cvv2cvc_indicator: null,
			},
			tipData: {
				ssl_tip_amount: null,
				ssl_server: null,
				ssl_shift: null,
			},
			tokenizationData: {
				ssl_get_token: null, //Indicates whether to generate a token when submitting the card data
				ssl_add_token: null, //Indicates whether to generate and store the token in Card Manager
			},
			tokenData: {
				ssl_verify: null,
				ssl_first_name: null,
				ssl_last_name: null,
			},
			recurringData: {
				ssl_recurring_flag: null,
				ssl_payment_number: null,
				ssl_payment_count: null,
			},
			cardOnFileData: {
				ssl_merchant_initiated_unscheduled: null, //Indicates the transaction was initiated by a merchant using a stored credential (token or stored card number) for a fixed or variable amount that does not occur on a scheduled or regularly occurring transaction date
				ssl_oar_data: null, //Include this parameter for all future Card On File transactions using Token or Card Number.
				ssl_ps2000_data: null, //Include this parameter for all future Card On File transactions using Token or Card Number.
			},
			optionalData: {
				ssl_avs_address: null,
				ssl_avs_zip: null,
				ssl_description: null,
				ssl_partial_auth_indicator: null,
			},
			//END OF DAY TRANSACITON DATA
			emailData: {
				ssl_email: null,
				ssl_update_email: null,
				ssl_do_customer_email: null,
				ssl_do_merchant_email: null,
			},

			//Final Form Data
			terminalSetupForm: null,
			saleTransactionForm: null,
			returnTransactionForm: null,
			voidTransactionForm: null,
			authTransactionForm: null,
			authExtendTransactionForm: null,
			authCompleteTransactionForm: null,
			authDeleteTransactionForm: null,
			//Tip
			tipUpdateTransactionForm: null,
			//Card Manager
			queryTokenForm: null,
			updateTokenForm: null,
			createTokenForm: null,
			deleteTokenForm: null,
			//End of Day
			emailTransactionForm: null,
			queryTransactionForm: null,
			dailyTotalsForm: null,
			settleBatchForm: null,
    }
  },
  methods: {
		//******************************** ADMINISTRATION ********************************//

		//Get Terminal Setup Info
		async getTerminalSetup() {
			let requiredFields = ["ssl_transaction_type"]

			this.terminalSetupForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "terminalsetup", 
			})
			console.log("this.terminalSetupForm", this.terminalSetupForm)
			//Send Transaction
			let form = await this.setUserPlatformPOST(this.terminalSetupForm)
			this.$store.dispatch("POSTConvergeTerminalSetup", form)
		},

		//************************************* CREDIT CARD TRANSACTIONS *************************************//

		//Sale Transaction
		async ccSale() {
			console.log("ccSale")
			console.log("transaction Object", this.saleTransactionForm)
			let requiredFields = ["ssl_transaction_type", "ssl_amount"]

			this.saleTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccsale", 
				ssl_amount: this.mainData.ssl_amount,
			})
			console.log("sale Object", this.saleTransactionForm)

			//Cycle through al the dataSets
			let answer = await this.cycleDataSets(this.saleTransactionForm)
			console.log('answer', answer)
		
			//Send Transaction
			let form = await this.setUserPlatformPOST(this.saleTransactionForm)
			this.$store.dispatch("POSTConvergeSale", form)
		},

		//Return Transaction
		async ccReturn() {
			let required = ["ssl_transaction_type", "ssl_amount", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"

			this.returnTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccreturn", 
				ssl_amount: this.mainData.ssl_amount,
				ssl_txn_id: this.mainData.ssl_txn_id
			})
			let form = await this.setUserPlatformPOST(this.returnTransactionForm)
			this.$store.dispatch("POSTConvergeReturn", form)
		},
		//Void Transaction
		async ccVoid() {
			let required = ["ssl_transaction_type", "ssl_amount", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"

			this.voidTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccvoid", 
				ssl_amount: this.mainData.ssl_amount,
				ssl_txn_id: this.mainData.ssl_txn_id
			})
			let form = await this.setUserPlatformPOST(this.voidTransactionForm)
			this.$store.dispatch("POSTConvergeVoid", form)
		},
		//Auth Only Transaction
		async ccAuthOnly() {
			let required = ["ssl_transaction_type", "ssl_amount",]

			this.authTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccauthonly", 
				ssl_amount: this.mainData.ssl_amount,
			})

			//Cycle through al the dataSets
			let answer = await this.cycleDataSets(this.authTransactionForm)
			console.log('answer', answer)

			let form = await this.setUserPlatformPOST(this.authTransactionForm)
			this.$store.dispatch("POSTConvergeAuthOnly", form)
		},
		//Auth Only incriment to extend original Auth amount Transaction
		async ccAuthOnlyIncriment() {
			let required = ["ssl_transaction_type", "ssl_amount", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"

			this.authExtendTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccauthonly", 
				ssl_amount: this.mainData.ssl_amount,
				ssl_txn_id: transactionID
			})

			//Cycle through al the dataSets
			let answer = await this.cycleDataSets(this.authExtendTransactionForm)
			console.log('answer', answer)

			let form = await this.setUserPlatformPOST(this.authExtendTransactionForm)
			this.$store.dispatch("POSTConvergeAuthIncriment", form)
		},
		//Auth Completion (Close Auth and Charge Card)
		async ccComplete() {
			let required = ["ssl_transaction_type", "ssl_txn_id"]
			let optional = ["ssl_amount", "ssl_partial_shipment_flag"]
			let transactionID = "Need to get ID somewhere"
			// ssl_amount: "Full" - Blank/Null
			// ssl_amount: "Partial" - Less than the original Auth Only amount
			// ssl_amount: "Multi-partial" - Less than the original Auth Only amount. Must set ssl_partial_shipment_flag: "Y"

			this.authCompleteTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "cccomplete", 
				ssl_amount: this.mainData.ssl_amount,
				ssl_txn_id: transactionID
			})

			let form = await this.setUserPlatformPOST(this.authCompleteTransactionForm)
			this.$store.dispatch("POSTConvergeAuthComplete", form)
		},
		//Auth Deletion (Reversal of Original Auth)
		async ccDelete() {
			let required = ["ssl_transaction_type", "ssl_amount", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"

			this.authDeleteTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccdelete", 
				ssl_amount: this.mainData.ssl_amount,
				ssl_txn_id: transactionID
			})
			
			let form = await this.setUserPlatformPOST(this.authDeleteTransactionForm)
			this.$store.dispatch("POSTConvergeAuthDelete", form)
		},
		

		//******************************** TIP PROCESSING ********************************

		//Update Tip
		async ccUpdateTip() {
			let required = ["ssl_transaction_type", "ssl_tip_amount", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"
			// ssl_tip_amount: Tip amount to add, update or reset. Set to 0.00 to reset or remove the original tip amount.

			this.tipUpdateTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccupdatetip", 
				ssl_tip_amount: this.tipData.ssl_tip_amount,
				ssl_txn_id: transactionID
			})

			let form = await this.setUserPlatformPOST(this.tipUpdateTransactionForm)
			this.$store.dispatch("POSTConvergeUpdateTip", form)
		},

		//******************************** DEBIT CARD TRANSACTIONS ********************************

		//Update Tip
		async binLookup() {
			let required = ["ssl_transaction_type", "ssl_card_number", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"
			// ssl_tip_amount: Tip amount to add, update or reset. Set to 0.00 to reset or remove the original tip amount.

			this.tipUpdateTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccupdatetip", 
				ssl_tip_amount: this.tipData.ssl_tip_amount,
				ssl_txn_id: transactionID
			})

			let form = await this.setUserPlatformPOST(this.tipUpdateTransactionForm)
			this.$store.dispatch("POSTBINLookup", form)
		},
		
		//******************************** CARD MANAGER ********************************//

		//Query Token
		async ccQueryToken() {
			let required = ["ssl_transaction_type", "ssl_token"]
			let optional = ["ssl_exclude_account_update"]
			let creditCardToken = null

			this.queryTokenForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccquerytoken", 
				ssl_token: creditCardToken
			})

			let form = await this.setUserPlatformPOST(this.queryTokenForm)
			this.$store.dispatch("POSTConvergeQueryToken", form)
		},
		//Update Token
		async ccUpdateToken() {
			let required = ["ssl_transaction_type", "ssl_token", "ssl_first_name", "ssl_last_name"]
			let optional = ["ssl_card_number", "ssl_exp_date", "ssl_exclude_account_update"]
			let creditCardToken = null

			this.updateTokenForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccupdatetoken", 
				ssl_token: creditCardToken
			})
			for(let key in this.accountData) {
				if(this.accountData[key] != null) {
					this.$set(this.updateTokenForm, key, this.accountData[key])
				}
			}

			let form = await this.setUserPlatformPOST(this.updateTokenForm)
			this.$store.dispatch("POSTConvergeUpdateToken", form)
		},
		//Generate Token - Get Token
		async ccGetToken() {
			return new Promise( async (resolve, reject) => {
				let required = ["ssl_transaction_type"]
				let optional = ["ssl_verify", "ssl_first_name", "ssl_last_name", "ssl_add_token", "ssl_avs_address", "ssl_avs_zip", "ssl_cvv2cvc2", "ssl_cvv2cvc2_indicator"]

				this.createTokenForm = Object.assign({}, this.Converge.merchantData, { 
					ssl_transaction_type: "ccgettoken", 
				})
				for(let key in this.cardData) {
					if(this.cardData[key] != null) {
						this.$set(this.createTokenForm, key, this.cardData[key])
					}
				}

				let form = await this.setUserPlatformPOST(this.createTokenForm)
				let response = await this.$store.dispatch("POSTConvergeGetToken", form)
				return resolve(response)
			})
			
		},
		//Delete Token
		async ccDeleteToken() {
			let required = ["ssl_transaction_type", "ssl_token"]
			let creditCardToken = null
			this.deleteTokenForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "ccdeletetoken", 
				ssl_token: creditCardToken
			})

			let form = await this.setUserPlatformPOST(this.deleteTokenForm)
			this.$store.dispatch("POSTConvergeDeleteToken", form)
		},


		//******************************** END OF DAY ********************************//

		//Send Email to Customer or Merchant
		async txnEmail() {
			let required = ["ssl_transaction_type", "ssl_txn_id"]
			let transactionID = "Need to get ID somewhere"

			this.emailTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "txnemail", 
				ssl_txn_id: transactionID
			})
			//Email Data Assignments
			for(let key in this.emailData) {
				if(this.emailData[key] != null) {
					this.$set(emailTransactionForm, key, this.emailData[key])
				}
			}

			let form = await this.setUserPlatformPOST(this.emailTransactionForm)
			this.$store.dispatch("POSTConvergeEmailTxn", form)
		},
		//Query Transaction
		async txnQuery() {
			//I need to complete this method. It is extensive
			let required = ["ssl_transaction_type"]
			//See docs for many search fields

			this.queryTransactionForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "txnquery", 
			})

			let form = await this.setUserPlatformPOST(this.queryTransactionForm)
			this.$store.dispatch("POSTConvergeQueryTxn", form)
		},
		//Summary - Total - Review prior to settling Batch
		async total() {
			let required = ["ssl_transaction_type"]

			this.dailyTotalsForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "total", 
			})

			let form = await this.setUserPlatformPOST(this.dailyTotalsForm)
			this.$store.dispatch("POSTConvergeTotal", form)
		},
		//Settle
		async settle() {
			let required = ["ssl_transaction_type"]
			let optional = ["ssl_txn_id"] // for closing a single transaction

			this.settleBatchForm = Object.assign({}, this.Converge.merchantData, { 
				ssl_transaction_type: "settle", 
			})

			let form = await this.setUserPlatformPOST(this.settleBatchForm)
			this.$store.dispatch("POSTConvergeSettle", form)
		},




		//CYCLE DATASETS FOR EACH METHOD
		cycleDataSets(dataSet) {
			return new Promise( async (resolve, reject) => {
				//Card Data Assignments
				for(let key in this.cardData) {
					if(this.cardData[key] != null) {
						this.$set(dataSet, key, this.cardData[key])
					}
				}
				//Card Verification
				for(let key in this.cardVerification) {
					if(this.cardVerification[key] != null) {
						this.$set(dataSet, key, this.cardVerification[key])
					}
				}
				//Tip Data Assignments
				for(let key in this.tipData) {
					if(this.tipData[key] != null) {
						this.$set(dataSet, key, this.tipData[key])
					}
				}
				//Tokenization Data Assignments
				for(let key in this.tokenizationData) {
					if(this.tokenizationData[key] != null) {
						this.$set(dataSet, key, this.tokenizationData[key])
					}
				}
				//Token Data Assignments
				for(let key in this.tokenData) {
					if(this.tokenData[key] != null) {
						this.$set(dataSet, key, this.tokenData[key])
					}
				}
				//Recurring Data Assignments
				for(let key in this.recurringData) {
					if(this.recurringData[key] != null) {
						this.$set(dataSet, key, this.recurringData[key])
					}
				}
				//Card On File Data Assignments
				for(let key in this.cardOnFileData) {
					if(this.cardOnFileData[key] != null) {
						this.$set(dataSet, key, this.cardOnFileData[key])
					}
				}
				//Optional Data Assignments
				for(let key in this.optionalData) {
					if(this.optionalData[key] != null) {
						this.$set(dataSet, key, this.optionalData[key])
					}
				}
				console.log("dataSet Object", dataSet)
				return resolve({Message: "Completed"})
			})
			
		},
		

		testButtonTwo() {
			console.log("test")
		},
		

	},
	computed: {
		...mapState(["Converge"]),
		...mapGetters([]),
	},
  mounted() {
		

  },
  created() {

  }
}