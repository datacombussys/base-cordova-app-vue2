<template>
	<div>
			<template v-if="!formData.id">	
			<div class="errorField">
				<p>Create or select a Product</p>
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
							<div class="dx-field-label">Product ID</div>
							<div class="dx-field-value-static">D-30125415</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Image</div>
							<div class="dx-field-value-static">Image here</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">4435436544</div>
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
	name: "inventoryDisaplayFieldsComponent",
	mixins: [],
	components: {},
	props: {
		formData: {
			type: Object,
			required: true
		},
	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log();
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
