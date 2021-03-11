<template>
  <div>
		<div class="calc-height block">
			<div class="row">
				<div class="col-6">
					<div>
						<v-card
							color="grey lighten-2"
							class="compact-card"
						>
							<v-card-title class="headline">New Registers</v-card-title>

							<v-card-text>
								<div class="title">Sales Office</div>
								<v-select
									:items="GET_SALES_OFFICE_LIST"
									item-value="salesoffice_name"
									item-text="salesoffice_name"
									outlined
									solo
									placeholder="Select"
									@change="selectSalesOffice"
								></v-select>
								<div class="block text-center m-3">
									<div class="title">
										Open new Register
									</div>
									<v-btn class="m-3" color="primary" @click="initNewPOS">Create</v-btn>
									<v-btn class="m-3" color="primary" @click="testButton">Test</v-btn>
								</div>
							</v-card-text>
							
						</v-card>
					</div>
				</div>
				<div class="col-6">
					<v-card
						color="grey lighten-2"
						class="compact-card"
					>
						<v-card-title class="headline">Available Registers</v-card-title>

						<v-card-text>
							<div class="title text-center" v-if="RETURN_TILL_LIST.length === 0">
								No registers to show
							</div>
							<div class="row justify-start">
								<v-card
									v-for="(till, index) in RETURN_TILL_LIST"
									:key="till.id"
									elevation="3"
									rounded
									ripple
									class="m-4"
									min-width="175"
									min-height="175"
								>
							
									<div class="ribbon-wrap">
										<span class="active-ribbon">Active</span>
									</div>

									<v-card-text>
										<div class="row justify-center mt-12 mb-8">
											<i class="mdi mdi-cash-register mdi-80 text-orange-light"></i>
										</div>
										<div class="row justify-center">
											{{ till.salesOffice }}
										</div>
										<div class="row justify-center">
											{{ till.orderID }}
										</div>
										<div class="row justify-center">
											<v-chip
												class="m-2 p-4"
												dark
												color="blue-grey darken-4"
											>
												Close Register
											</v-chip>
										</div>
										<div class="row justify-center">
											<v-chip
												link
												outlined
												class="p-4"
												:to="{ name: 'retail-pos', params: { id: till.id }}"
											>
												Launch
											</v-chip>

										</div>
										
									</v-card-text>
								</v-card>

								

							</div>
							
						</v-card-text>
					</v-card>
					
				</div>
			</div>
		</div>

		
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { bus } from '@/services/event-bus';

import { confirm, custom, alert } from 'devextreme/ui/dialog';

//Mixins
import { UtilityMixins } from "@/mixins/utility-mixins"

export default {
	name: "registers",
	mixins: [
		UtilityMixins
	],
	components: {

	},
  data() {
    return {
			salesOffice: null,

		}
	},
	methods: {
		testButton() {
			console.log('RETURN_TILL_LIST', this.RETURN_TILL_LIST)
		},
		initNewPOS() {
			console.log("initNewPOS")
			const UUID4 = this.uuidv4()
			// bus.$emit("INIT_POS", {id: 24})
			if(this.salesOffice == null) {
				alert("You must first select a sales office for this register", "Error")
			} else {
				this.$router.push({ name: 'retail-pos', params: { id: UUID4.slice(UUID4.length -10), SO: this.salesOffice} })
			}
			
			
		},
		selectSalesOffice(e) {
			console.log("selectSalesOffice e", e)
			this.salesOffice = e
		}

		
	},
	computed: {
		...mapGetters(["RETURN_TILL_LIST", "GET_SALES_OFFICE_LIST"]),

	}

};
</script>

<style lang="scss">


</style>
