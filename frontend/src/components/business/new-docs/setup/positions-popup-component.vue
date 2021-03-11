<template>
	<div class="container py-0">
		<v-overlay
			:absolute="false"
			:value="openPositionsPopup">
			<v-sheet
				light
				color="v-primary-base"
				class="mx-auto"
				height="565"
				width="600">
				<nav class="close-button">
					<div class="header">
						Recurring
					</div>
					<div class="close-button">
						<a href="#" @click="openPositionsPopup = false">
							<fa-layer class="mdi-35">
								<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
								<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
							</fa-layer>
						</a>
					</div>
				</nav>
				<div class="positions-popup">
					<div class="row positions-popup">
						<div class="container">
							<v-card 	
								class="p-4">
								<DxScrollView
									id="shippingScrollview"
									ref="shippingScrollviewWidget"
									show-scrollbar="always"
									:height="425"
								>
								<div class="row">
									<div class="col-6">
										<div class="title">
											Position Name
										</div>
										<v-text-field
											label="Name"
											outlined
										></v-text-field>
									
									</div>
									<div class="col-6">
										<div class="title">
											All Positions
										</div>
										<div class="w-full flex justify-around" v-for="(position, index) in GET_POSITIONS_LIST" :key="index">
											<div class="m-4 w-full"> {{position.name}}</div>
											<div class="delete" @click="deletePosition(position.name)"></div>
										</div>
									</div>
								</div>
									
									<div class="row justify-end mt4">
										<div class="col-25p text-center mx-4">
											<DxButton
												:width="150"
												text="Cancel"
												type="danger"
												styling-mode="contained"
												:focusStateEnabled="false"
												@click="openPositionsPopup = false">
											</DxButton>
										</div>
										<div class="col-25p text-center mx-4 primary">
											<DxButton
												:width="150"
												text="Add Position"
												type="success"
												styling-mode="contained"
												:focusStateEnabled="false"
												@click="addPosition">
											</DxButton>
										</div>
									</div>
								</DxScrollView>
							</v-card>
						</div>


					</div>
					<v-divider></v-divider>
					<v-divider></v-divider>
					<v-divider></v-divider>
					<div class="row justify-end">
						<div class="col-3">	
							<v-btn
								color="primary"
								@click="openPositionsPopup = false">
								Save
							</v-btn>
						</div>
					</div>
				</div>

			</v-sheet>
		</v-overlay>	
	</div>
</template>


<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import { DxPopup } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxButton from "devextreme-vue/button"

export default {
	name: "employeePositionsComponent",
	mixins: [],
	components: {
		DxScrollView,
		DxButton,
		DxPopup
	},
	props: {

	},
	data() {
		return {
			//Main Data
			openPositionsPopup: false,

			//Position Form
			positionForm: {
        partner: null,
        datacom: null,
        company: null,
        name: null,
        date_added: null,
      }
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
		},
		async addPosition(e) {
      console.log("addingPosition", e);
      console.log("this.positionForm", this.positionsForm);
      let response = await this.setUserPlatformPOST(this.positionForm);
      console.log('addPosition response', response);

      await this.$store.dispatch('addPosition', response);
      this.resetForm();
      
    },
    resetForm() {
      for(let key in this.positionForm) {
        this.positionForm[key]= null;
      }
    },
    deletePosition(name) {
      console.log("deletingPosition name", name);
      //Find Position form store and send that ID value
      var positonObj = this.GET_POSITIONS_LIST.find(elem => elem.name === name);
      console.log("positonObj", positonObj);
      this.$store.dispatch('deletePosition', positonObj.id);
    },
	},
	computed: {
		...mapState(["Common", "Locale", "Merchants", "Auth"]),
    ...mapGetters(["GET_POSITIONS_LIST"]),
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
