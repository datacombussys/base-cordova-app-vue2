<template>
	<div>
		<!-- Primary Form -->
		<div v-if="formSettings.type === 'primary'">
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						First Name:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						validate
						placeholder="Joe"
						pattern="[A-Za-z]*"
						error-message="Format: Letters Only"
						:value="contactForm.primary_first_name"
						@input="contactForm.primary_first_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">
						Last Name:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						validate
						placeholder="Smith"
						pattern="[A-Za-z]*"
						error-message="Format: Format Letters Only"
						:value="contactForm.primary_last_name"
						@input="contactForm.primary_last_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Phone:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.primary_phone"
						@input="contactForm.primary_phone = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">Fax:</p>
					<f7-list-input
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.primary_fax"
						@input="contactForm.primary_fax = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="30">
					<p class="field-title">
						Country:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="localeCities.primary_country_id"
						@input="getPrimaryStates($event, 'primary')"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="country in GET_PRIMARY_COUNTRY_LIST"
							:key="country.id"
							:value="country.id">
							{{ country.name }}
						</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						State:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="localeCities.primary_state_id"
						@input="getPrimaryCities($event, 'primary')"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="mailing_state in GET_PRIMARY_STATE_LIST"
							:key="mailing_state.id"
							:value="mailing_state.id"
						>{{ mailing_state.name }}</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						City:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="contactForm.primary_mailing_city"
						@input="contactForm.primary_mailing_city = $event.target.value"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="mailing_city in GET_PRIMARY_CITY_LIST"
							:key="mailing_city.id"
							:value="mailing_city.name"
						>{{ mailing_city.name }}</option>
					</f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="70">
					<p class="field-title">
						Address:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="contactForm.primary_mailing_address"
						@input="contactForm.primary_mailing_address = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						Zip:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="contactForm.primary_mailing_zip"
						@input="contactForm.primary_mailing_zip = $event.target.value"
						type="text"
						pattern="[0-9]*"
						style="background: rgb(216,252,253)"
					>
					</f7-list-input>
				</f7-col>
				
			</f7-row>

			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Email:
						<span style="color: red;">*</span>
					</p>
					<f7-list-input
						required
						:value="contactForm.primary_email"
						@input="contactForm.primary_email = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
		</div>
		<!-- END Primary Form -->
		<!-- ************************************************************************ -->
		<!-- Billing Form -->
		<div v-if="formSettings.type === 'billing'">
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						First Name:
					</p>
					<f7-list-input
						required
						validate
						placeholder="Deborah"
						pattern="[A-Za-z]*"
						error-message="Format: Letters Only"
						:value="contactForm.billing_first_name"
						@input="contactForm.billing_first_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">
						Last Name:
					</p>
					<f7-list-input
						required
						validate
						placeholder="Smith"
						pattern="[A-Za-z]*"
						error-message="Format: Format Letters Only"
						:value="contactForm.billing_last_name"
						@input="contactForm.billing_last_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Phone:
					</p>
					<f7-list-input
						required
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.billing_phone"
						@input="contactForm.billing_phone = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">Fax:</p>
					<f7-list-input
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.billing_fax"
						@input="contactForm.billing_fax = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="30">
					<p class="field-title">
						Country:
					</p>
					<f7-list-input
						required
						:value="localeCities.billing_country_id"
						@input="getBillingStates($event, 'billing')"
						type="select"
						default-value="6252001"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="bill_country in GET_BILLING_COUNTRY_LIST"
							:key="bill_country.id"
							:value="bill_country.id">
							{{ bill_country.name }}
						</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						State:
					</p>
					<f7-list-input
						required
						:value="localeCities.billing_state_id"
						@input="getBillingCities($event, 'billing')"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="bill_state in GET_BILLING_STATE_LIST"
							:key="bill_state.id"
							:value="bill_state.id"
						>{{ bill_state.name }}</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						City:
					</p>
					<f7-list-input
						required
						:value="contactForm.billing_city"
						@input="contactForm.billing_city = $event.target.value"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="bill_city in GET_BILLING_CITY_LIST"
							:key="bill_city.id"
							:value="bill_city.name"
						>{{ bill_city.name }}</option>
					</f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="70">
					<p class="field-title">
						Address:
					</p>
					<f7-list-input
						required
						:value="contactForm.billing_address"
						@input="contactForm.billing_address = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						Zip:
					</p>
					<f7-list-input
						required
						:value="contactForm.billing_zip"
						@input="contactForm.billing_zip = $event.target.value"
						type="text"
						pattern="[0-9]*"
						style="background: rgb(216,252,253)"
					>
					</f7-list-input>
				</f7-col>
				
			</f7-row>

			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Email:
					</p>
					<f7-list-input
						required
						:value="contactForm.billing_email"
						@input="contactForm.billing_email = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
		</div>
		<!-- END Billing Form -->
			<!-- ************************************************************************ -->
		<!-- Shipping Form -->
		<div v-if="formSettings.type === 'shipping'">
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						First Name:
					</p>
					<f7-list-input
						required
						validate
						placeholder="Deborah"
						pattern="[A-Za-z]*"
						error-message="Format: Letters Only"
						:value="contactForm.shipping_first_name"
						@input="contactForm.shipping_first_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">
						Last Name:
					</p>
					<f7-list-input
						required
						validate
						placeholder="Smith"
						pattern="[A-Za-z]*"
						error-message="Format: Format Letters Only"
						:value="contactForm.shipping_last_name"
						@input="contactForm.shipping_last_name = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Phone:
					</p>
					<f7-list-input
						required
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.shipping_phone"
						@input="contactForm.shipping_phone = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="50">
					<p class="field-title">Fax:</p>
					<f7-list-input
						validate
						placeholder="(800) 555-1234"
						pattern="[0-9]{1,10}"
						error-message="Format  '##########'"
						:value="contactForm.shipping_fax"
						@input="contactForm.shipping_fax = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="30">
					<p class="field-title">
						Country:
					</p>
					<f7-list-input
						required
						:value="localeCities.shipping_country_id"
						@input="getShippingStates($event, 'shipping')"
						type="select"
						default-value="6252001"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="ship_country in GET_SHIPPING_COUNTRY_LIST"
							:key="ship_country.id"
							:value="ship_country.id">
							{{ ship_country.name }}
						</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						State:
					</p>
					<f7-list-input
						required
						:value="localeCities.shipping_state_id"
						@input="getShippingCities($event, 'shipping')"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="ship_state in GET_SHIPPING_STATE_LIST"
							:key="ship_state.id"
							:value="ship_state.id"
						>{{ ship_state.name }}</option>
					</f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						City:
					</p>
					<f7-list-input
						required
						:value="contactForm.shipping_city"
						@input="contactForm.shipping_city = $event.target.value"
						type="select"
						style="background: rgb(216,252,253)"
					>
						<option
							v-for="ship_city in GET_SHIPPING_CITY_LIST"
							:key="ship_city.id"
							:value="ship_city.name"
						>{{ ship_city.name }}</option>
					</f7-list-input>
				</f7-col>
			</f7-row>
			<f7-row>
				<f7-col width="70">
					<p class="field-title">
						Address:
					</p>
					<f7-list-input
						required
						:value="contactForm.shipping_address"
						@input="contactForm.shipping_address = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
				<f7-col width="30">
					<p class="field-title">
						Zip:
					</p>
					<f7-list-input
						required
						:value="contactForm.shipping_zip"
						@input="contactForm.shipping_zip = $event.target.value"
						type="text"
						pattern="[0-9]*"
						style="background: rgb(216,252,253)"
					>
					</f7-list-input>
				</f7-col>
				
			</f7-row>

			<f7-row>
				<f7-col width="50">
					<p class="field-title">
						Email:
					</p>
					<f7-list-input
						required
						:value="contactForm.shipping_email"
						@input="contactForm.shipping_email = $event.target.value"
						type="text"
						style="background: rgb(216,252,253)"
					></f7-list-input>
				</f7-col>
			</f7-row>
		</div>
		<!-- END Billing Form -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';

// Mixins
import { LocaleMixin } from '@/mixins/businesses/locale-mixins';


export default {
	name: "businessContactFormComponent",
	components: {},
	mixins: [LocaleMixin],
	props: {
		formSettings: {
			type: Object,
			required: true
		},
		contactForm: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Main Data
			defaultPrimaryCountry: 6252001
	
		}
	},
	methods: {
		async testingMethod(e) {


		},

			
	},
	computed: {
		...mapState(["Locale"]),
		...mapGetters(["GET_PRIMARY_COUNTRY_LIST", "GET_PRIMARY_STATE_LIST", "GET_PRIMARY_CITY_LIST", 
										"GET_BILLING_COUNTRY_LIST", "GET_BILLING_STATE_LIST", "GET_BILLING_CITY_LIST", 
										"GET_SHIPPING_COUNTRY_LIST", "GET_SHIPPING_STATE_LIST", "GET_SHIPPING_CITY_LIST"]),
	},
	created() {},
	async mounted() {
		
		
	}

};
</script>

<style scoped style="less">

</style>
