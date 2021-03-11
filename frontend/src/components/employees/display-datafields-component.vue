<template>
	<div>

		<template v-if="!formData.id">	
			<div class="errorField">
				<p>Create or select an Employee</p>
			</div>
		</template>

		<template v-if="accountSettings.type === 'employee' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Employee Id</div>
							<div class="dx-field-value-static">{{ formData.id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Employee Number</div>
							<div class="dx-field-value-static">{{ formData.employee_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Global ID</div>
							<div class="dx-field-value-static">{{ formData.user_obj.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">{{ formData.barcode_obj.barcode_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Hired</div>
							<div class="dx-field-value-static">{{ formData.user_obj.hire_date }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.user_obj.is_active }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">
								<img :src="formData.profile_img" width="50" height="50" alt="Image Here">
							</div>
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
