<template>
  <div>
		<div class="container">
			<div class="row">
				<div class="col-6">
					<p>Device Platform: {{ platform }}</p>
					<p>Network Type: {{ networkType }}</p>
					<p>Is Online: {{ isOnline }}</p>
					
				</div>
				<div class="col-6">
					<div class="title">
						Icon Material Icons
					</div>
					<i class="mdi mdi-cart mdi-40"></i>
					<i class="dx-icon-email" style="font-size: 50px;"></i>

				</div>
			</div>
		</div>

		<DxButton
        text="Test"
        @click="testButton" />
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";

export default {
  mixins: [

  ],
  components: {
		DxButton
  },
  props: {

  },
  data() {

    return {
		}
	},
	methods: {
		testButton() {
			
		}
	},
	computed: {
		platform() {
			return device.platform
		},
		networkType() {
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';

			console.log('states[networkState]', states[networkState])

			return states[networkState]
		},
		isOnline() {
			//Fire event when offline
			// document.addEventListener("offline", yourCallbackFunction, false);

			//Fire event when online
			// document.addEventListener("online", yourCallbackFunction, false);

			return navigator.onLine
		}
	}

};
</script>

<style lang="scss">

</style>
