<template>
	<div>
		<f7-list-input
			:ref="dateSettings.ref"
			type="datepicker"
			placeholder="Select date"
			:calendar-params="pickerOpts"
			@calendar:change="(values) => pickerOpts.value.push(...values)"
			class="datacom-input"
		></f7-list-input>
</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';


export default {
	name: "f7DateTimePickerComponent",
	components: {},
	mixins: [],
	props: {
		dateSettings: {
			type: Object
		},

	},
	data() {
		var today = new Date();
		return {
			//Main Data
			//F7-TimePicker
			pickerOpts: {
				touchMove: true,
				dateFormat: "MM dd, yyyy hh:mm",
				timePicker: true,
				timePickerFormat: {
					hour: 'numeric', 
					minute: 'numeric'
					},
				timePickerPlaceholder: "Select a time",
				value:[]
			}
		}
	},
	methods: {
		async testingMethod(e) {


		},

	},
	computed: {
		...mapState([]),
		...mapGetters([]),
	},
	created() {},
	async mounted() {

		
	}

};
</script>

<style scoped style="less">

</style>
