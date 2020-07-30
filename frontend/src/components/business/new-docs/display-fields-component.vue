<template>
	<div>

		<template v-if="!formData.id">	
			<div class="errorField">
				<p>Create or select a company</p>
			</div>
		</template>
		
		<template v-else>
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">K8svdc7cdw78sdv8</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">D-30125415</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Logo</div>
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
							<div class="dx-field-label">Is Service</div>
							<div class="dx-field-value-static">True</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Quantity on Hand</div>
							<div class="dx-field-value-static">14</div>
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
	name: "displayFieldsComponent",
	mixins: [],
	components: {

	},
	props: {
		formData: {
			type: Object,
			required: true
		},
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
