<template>
  <div>
		<div>
			<h1>Testing Page</h1>
		</div>
		<div class="row">
			<div class="col-6">
				<v-btn
					class="m-3"
					depressed
					color="primary"
					@click="setConfig">
					Converge Set
				</v-btn>
				<v-btn
					class="m-3"
					depressed
					color="primary"
					@click="getConfig">
					Converge Get
				</v-btn>
			</div>
			<div class="col-6">
				<p>
					Set Response: {{ setResponse }}
				</p>
				<p>
					Get Response: {{ getResponse }}
				</p>
				
			</div>
		</div>

			
  </div>
</template>

<script>
import axios from 'axios';

export default {

  data() {
    return {
			setDeviceConfiguration: {
				"method" : "setDeviceConnectionConfiguration",
				"requestId" : "1253881538",
				"targetType" : "api",
				"parameters" : {
					"connectionCriteria" : {
						"providerTypes" : ["INGENICO_RBA_UPP", "STAR"],
						"connectionTypes" : ["USB", "IP"],
						"deviceTypes" : ["CARD_READER", "PRINTER"],
						"inetAddress" : {
							"host" : "192.168.1.137",
							"port" : 12000,
							"encryptionScheme" : "NONE"/"TLS_12"
						}
					}
				}
			},
			getDeviceConnection: {
				"method" : "getDeviceConnectionConfiguration",
				"requestId" : "1253881539",
				"targetType" : "api"
			},
			setResponse: null,
			getResponse: null
			

		}
	},
	methods: {
		setConfig() {
			axios.post("https://localhost:9790/rest/command", this.setDeviceConfiguration).then(response => {
				console.log('response', response)
			})
		},
		getConfig() {
			axios.post("https://localhost:9790/rest/command", this.getDeviceConnection).then(response => {
				console.log('response', response)
			})
		}
		
	},
	computed: {

		
		
	}

};
</script>

<style lang="scss">


</style>
