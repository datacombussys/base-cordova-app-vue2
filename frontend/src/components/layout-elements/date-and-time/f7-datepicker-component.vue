<template>
	<div>
		<f7-list-input
			ref="datepicker"
			type="datepicker"
			placeholder="Select date"
			:calendar-params="pickerOpts"
			@change="updateAndSendToParent"
			class="datacom-input"
		></f7-list-input>
</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';


export default {
	name: "f7DatePickerComponent",
	components: {},
	mixins: [],
	props: {

	},
	data() {
		return {
			//Main Data

			//F7-TimePicker
			pickerOpts: {
				touchMove: true,
				dateFormat: "MM dd, yyyy",
				value: [],
				multiple: false,
				header: true, 
				footer: true,
				closeOnSelect: true
			}
		}
	},
	methods: {
		async testingMethod(e) {


		},
		updateAndSendToParent(e) {
			// console.log('updateAndSendToParent e', e);
			// console.log('this.pickerOpts', this.pickerOpts);
			// console.log('this.$refs', this.$refs.datepicker);
			if(e.target.value) {
				this.pickerOpts.value = [];
				this.pickerOpts.value.push(e.target.value);
				var newDate = new Date(e.target.value);
				console.log('newDate', newDate);
				var ISODate = newDate.toISOString();
				
				console.log('ISODate', ISODate);
				console.log('this.pickerOpts', this.pickerOpts);

				//Send to Parent
				this.$emit("receiveDate", ISODate);
			}
			
		}

	},
	computed: {
		// ...mapState([]),
		// ...mapGetters([]),
	},
	created() {},
	async mounted() {

		
	}

};
</script>

<style scoped lang="less">

</style>
