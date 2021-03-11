<template>
  <div class="container">
		<div class="mt-5">
		</div>
		<div class="row">
			<div class="col-6">
				<div class="headline-3">
					On_Demand Calls
				</div>
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="startCardReaderSearch">
						Card Reader Search
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Search Request: {{ ConvergeSDK.startCardReaderSearch }}
						</p>
						<p class="font-semibold">
							Ping Search Results: {{ ConvergeSDK.cardReaderSearchResults }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="getCardReaderInfo">
						Get Card Reader Info
					</v-btn>
					<div class="row">
						<p>
							CardReader Info Individual: {{ ConvergeSDK.cardReaderInfo }}
						</p>
					</div>
				</div>
				
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="startDeviceStatus">
						Get Device Status
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Device Status: {{ ConvergeSDK.deviceStatusOnReader }}
						</p>
						<p class="font-semibold">
							Get Device Status Request: {{ ConvergeSDK.deviceStatusResults }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="resetPaymentDevice">
						Reset Device
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Card Reader Reset: {{ ConvergeSDK.cardReaderReset }}
						</p>
						<p class="font-semibold">
							Card Reader Reset Status: {{ ConvergeSDK.getCardReaderResetStatus }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="onDemandCaptureCardData">
						On-Demand Card Capture
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Card Read: {{ ConvergeSDK.startCardReadOnCardReader }}
						</p>
						<p class="font-semibold">
							Ping Card Read: {{ ConvergeSDK.getCardReadOnCardReader }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="rebootPaymentDevice">
						Reboot Terminal
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Reader Reboot: {{ ConvergeSDK.startCardreaderReboot }}
						</p>
						<p >
							Ping Reader Reboot: {{ ConvergeSDK.pingCardReaderReboot }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="setDeviceConfiguration">
						Set Configuration
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p class="font-semibold">
							Ping Set Configuration: {{ ConvergeSDK.setDeviceConfiguration }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="getDeviceConfiguration">
						Get Configuration
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Get Configuration: {{ ConvergeSDK.getDeviceConfiguration }}
						</p>
					</div>
				</div>
			</div>
		</div>


		<div class="row">
			<div class="col-6">
				<div class="headline-3">
					Integrated SDK Transactions
				</div>
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="saleSDKTransaction">
						SDK Sale Transaction
					</v-btn>
				</div>
				<div class="row">
					<div>
						<p>
							Start Payment Sale: {{ ConvergeSDK.startPaymentSale }}
						</p>
						<p class="font-semibold">
							Ping Payment Sale: {{ ConvergeSDK.completedPaymentSale }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">

				</div>
				<div class="row">

				</div>
			</div>
		</div>
		<div class="headline-3">
			Converge Calls
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="getTerminalSetup">
						Get Terminal Setup
					</v-btn>
				</div>
				<div class="row">
					<p>
						Setup Info: {{ Converge.terminalSetupResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccUpdateTip">
						Update Tip
					</v-btn>
				</div>
				<div class="row">
					<p>
						Tip Info: {{ Converge.updateTipResponse }}
					</p>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccSale">
						Sale
					</v-btn>
				</div>
				<div class="row">
					<p>
						Sale: {{ Converge.saleResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccReturn">
						Return
					</v-btn>
				</div>
				<div class="row">
					<p>
						Return: {{ Converge.returnResponse }}
					</p>
				</div>				
			</div>
		</div>
		
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccVoid">
						Void
					</v-btn>
				</div>
				<div class="row">
					<p>
						Void: {{ Converge.voidResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccAuthOnly">
						Auth Only
					</v-btn>
				</div>
				<div class="row">
					<p>
						Auth Only: {{ Converge.authOnlyResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccAuthOnlyIncriment">
						Auth Only Incriment
					</v-btn>
				</div>
				<div class="row">
					<p>
						Auth Only Incriment: {{ Converge.authOnlyIncrimentResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccComplete">
						Auth Complete
					</v-btn>
				</div>
				<div class="row">
					<p>
						Auth Complete: {{ Converge.authCompleteResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccDelete">
						Auth Delete
					</v-btn>
				</div>
				<div class="row">
					<p>
						Auth Delete: {{ Converge.authDeleteResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					Empty
				</div>
				<div class="row">
					Empty
				</div>
			</div>
		</div>
		<div class="title">
			Card Manager
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccUpdateToken">
						Update Token
					</v-btn>
				</div>
				<div class="row">
					<p>
						Update Token: {{ Converge.updateTokenResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccQueryToken">
						Query Token
					</v-btn>
				</div>
				<div class="row">
					<p>
						Query Token: {{ Converge.queryTokenResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccGetToken">
						Create Token
					</v-btn>
				</div>
				<div class="row">
					<p>
						Create Token: {{ Converge.createTokenResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="ccDeleteToken">
						Delete Token
					</v-btn>
				</div>
				<div class="row">
					<p>
						Delete Token: {{ Converge.deleteTokenResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="title">
			End Of Day Transactions
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="txnEmail">
						Email Receipt
					</v-btn>
				</div>
				<div class="row">
					<p>
						Email Receipt: {{ Converge.emailTxnResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="txnQuery">
						Query Transaction
					</v-btn>
				</div>
				<div class="row">
					<p>
						Query Transaction: {{ Converge.queryTxnResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="total">
						Get Daily Totals
					</v-btn>
				</div>
				<div class="row">
					<p>
						Get Daily Totals: {{ Converge.totalResponse }}
					</p>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<v-btn
						class="m-3"
						depressed
						color="primary"
						@click="settle">
						Settle Batch
					</v-btn>
				</div>
				<div class="row">
					<p>
						Settle Batch: {{ Converge.settleResponse }}
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<v-btn
				class="m-3"
				depressed
				color="primary"
				@click="testButton">
				test Button
			</v-btn>
		</div>



		

			
  </div>
</template>

<script>
import { mapState } from "vuex"
import { mapGetters } from "vuex"

//Mixins
import { ElavonConvergeSDKMixins } from "@/mixins/credit-card/elavon-convergeSDK-mixin"
import { ElavonConvergeMixins } from "@/mixins/credit-card/elavon-converge-mixin"

export default {
	name: "testPage",
	mixins: [
		ElavonConvergeSDKMixins,
		ElavonConvergeMixins
	],
	components: {

	},
  data() {
    return {
			saleResponse: null,
			returnResponse: null,
			getTokenResponse: null,
			
			//My CC Test
			debounceFunction: null,
			tempCCNumber: "",
			parsedCCNumber: null,
			fullTrackNumber: null,
			expDate: null,

			

		}
	},
	methods: {
		testButton() {
			console.log("APIKeys.elavonAPIKeyList", this.APIKeys.elavonAPIKeyList)
			console.log("APIKeys.elavonAPIKeyProfile", this.APIKeys.elavonAPIKeyProfile)

		},
		//Converge Calls
		newSale() {
			console.log('newSale')
		},
		newReturn() {
			console.log('newReturn')
		},
		newGETToken() {
			console.log('newGETToken')
		},	

		//Parce CC Number
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
		
				
		

		
	},
	computed: {
		...mapState(["Auth", "Converge", "ConvergeSDK", "APIKeys"]),
		...mapGetters([]),

	},
	watch: {
		// whenever question changes, this function will run
    tempCCNumber: function(oldVal, newVal) {
			console.log("tempCCNumber changed")
			this.debounceFunction()
		}
	},
	created() {
		this.debounceFunction = _.debounce(this.creditCardNumber, 500)
	},
	mounted() {
		
		
		
	}

};
</script>

<style lang="scss">
@import "../assets/sass/variables.scss";



</style>
