<template>
	<div>
		<vue-date-time-picker 
			only-time 
			v-model="openTime" 
			format="hh:mm a"
			formatted="hh:mm a"
			:minute-interval="minuteInterval"
			input-size="sm">
		</vue-date-time-picker>
</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';


export default {
	name: "timePickerComponent",
	components: {},
	mixins: [],
	props: {
	},
	data() {
		return {
			//Main Data
		}
	},
	methods: {
		async testingMethod(e) {
			console.log('this.Attendance.operatingHoursObj', this.Attendance.operatingHoursObj);
			console.log('this.hoursForm', this.hoursForm);

		},

	},
	computed: {
		...mapState(["Auth"]),
		...mapGetters([]),
	},
	created() {},
	async mounted() {

		// this.retrieveAndMountTimes();
		
	}

};
</script>

<style scoped style="less">

</style>
