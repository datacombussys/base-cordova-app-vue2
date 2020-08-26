<template>
	<div>

		<template v-if="!formData.id">	
			<div class="errorField">
				<p>Create or select a company</p>
			</div>
		</template>
		
		<template v-if="formSettings.type === 'company' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">{{ formData.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">{{ formData.account_number }}</div>
						</div>
						
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static business-barcode">{{ formData.barcode_obj.barcode_number }}</div>
						</div>					
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">{{ formData.date_added }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.is_active }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">
								<img :src="formData.profile_img" width="50" height="50" alt="Image Here">
							</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Logo</div>
							<div class="dx-field-value-static">{{ formData.logo }}</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-if="formSettings.type === 'inventory' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">{{ formData.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">{{ formData.account_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Logo</div>
							<div class="dx-field-value-static">{{ formData.product_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">{{ formData.barcode_obj.barcode_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Service</div>
							<div class="dx-field-value-static">{{ formData.is_service }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Quantity on Hand</div>
							<div class="dx-field-value-static">{{ formData.qty_on_hand }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">{{ formData.date_added }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.is_active }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<img :src="formData.profile_img" width="50" height="50" alt="Image Here">
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-if="formSettings.type === 'user' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">{{ formData.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">{{ formData.account_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">{{ formData.barcode_obj.barcode_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">{{ formData.date_added }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.is_active }}</div>
						</div>	
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">{{ formData.profile_img }}</div>
						</div>				
					</div>
				</div>
			</div>
		</template>

		<!-- Warehouse and Sales Office -->
		<template v-if="formSettings.type === 'warehouse' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">{{ formData.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">{{ formData.warehouse_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">{{ formData.barcode_obj.barcode_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">{{ formData.date_added }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.is_active }}</div>
						</div>	
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">{{ formData.profile_img }}</div>
						</div>				
					</div>
				</div>
			</div>
		</template>
		<!-- Warehouse and Sales Office -->
		<template v-if="formSettings.type === 'sales-office' && formData.id">
			<div class="form">
				<div class="dx-fieldset">
					<div class="dx-fieldset-header">General Info</div>
					<div class="gridCols">
						<div class="dx-field vertical">
							<div class="dx-field-label">Global Id</div>
							<div class="dx-field-value-static">{{ formData.global_id }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Account Number</div>
							<div class="dx-field-value-static">{{ formData.salesoffice_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Barcode</div>
							<div class="dx-field-value-static">{{ formData.barcode_obj.barcode_number }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Date Added</div>
							<div class="dx-field-value-static">{{ formData.date_added }}</div>
						</div>
						<div class="dx-field vertical">
							<div class="dx-field-label">Is Active</div>
							<div class="dx-field-value-static">{{ formData.is_active }}</div>
						</div>	
						<div class="dx-field vertical">
							<div class="dx-field-label">Profile Image</div>
							<div class="dx-field-value-static">{{ formData.profile_img }}</div>
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
		formSettings: {
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
