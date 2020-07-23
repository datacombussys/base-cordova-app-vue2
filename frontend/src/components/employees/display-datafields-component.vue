<template>
	<div>

		<!-- <template v-if="!formData.id">	
			<div class="errorField">
				<p>Create or select a company</p>
			</div>
		</template> -->

		<template>
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Employee Id</div>
							<div class="dx-field-value-static">4</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Employee Number</div>
							<div class="dx-field-value-static">D-30125415</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Global ID</div>
							<div class="dx-field-value-static">Logo here</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">4435436544</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">img Here</div>
						</div>
						
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">12-30-2016</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">Yes</div>
						</div>
						
					
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "displayEmployeeDataComponent",
	mixins: [],
	components: {

	},
	props: {
		formData: {
			type: Object,
			required: true
		},
		accountSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Main Data

			//Form Settings

			
		};
	},
	methods: {
		testingMethod(e) {

		}
	},
	computed: {
		...mapState([]),

	},
	created() {},
	mounted() {

	}
};
</script>

<style scoped lang="scss">

</style>
