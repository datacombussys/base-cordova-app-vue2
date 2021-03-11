<template>
	<div>
		<basicPopupComponent
			@callSaveMethod="callSaveMethod"
			:openedBasicPopup="openedDeptPopup"
			@closePopup="closeDeptPopup">

			<template #:title>
				Departments
			</template>
			<template #:main-data>
				<div class="row">
					<div class="container">
						<v-card 	
							class="p-4 positions-popup">
							
							<div class="row">
								<div class="col-6">
									<div class="title text-center">
										Department Name
									</div>
									<v-text-field
										label="Name"
										outlined
									></v-text-field>
								
								</div>
						
								<div class="col-6 h-full">
									<DxScrollView
										id="shippingScrollview"
										ref="shippingScrollviewWidget"
										show-scrollbar="always"
										height="100%">

										<div class="title text-center">
											All Departments
										</div>
										<div class="w-full flex justify-around" v-for="(dept, index) in GET_DEPARTMENTS_LIST" :key="index">
											<div class="m-4 w-full"> {{dept.name}}</div>
											<div class="delete" @click="deleteDepartment(dept.name)"></div>
										</div>
									</DxScrollView>
								</div>
							</div>							
						</v-card>
					</div>
				</div>
			</template>

			<template v-slot:action>
				<div class="row justify-end mt-4">
					<div class="col-30p text-center mx-4">
						<DxButton
							width="100%"
							text="Cancel"
							type="warning"
							styling-mode="contained"
							:focusStateEnabled="false"
							@click="openedDeptPopup = !openedDeptPopup">
						</DxButton>
					</div>
					<div class="col-3.
					0p text-center mx-4">
						<DxButton
							width="100%"
							text="Add Department"
							type="success"
							styling-mode="contained"
							:focusStateEnabled="false"
							@click="addDepartment">
						</DxButton>
					</div>
				</div>
			</template>

		</basicPopupComponent>
	</div>
</template>


<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//DevExpress
import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxButton from "devextreme-vue/button"

//Components
import basicPopupComponent from "@/components/elements/modals/basic-popup-component"

export default {
	name: "departmentsComponent",
	mixins: [],
	components: {
		basicPopupComponent,
		DxScrollView,
		DxButton,
	},
	props: {

	},
	data() {
		return {
			//Main Data
			saveMethod: "addDepartment",
			openDepartmentsPopup: false,

			openedDeptPopup: false,
      //DepartmetnForm
      departmentForm: {
        datacom: null,
        partner: null,
        company: null,
        name: null,
        date_added: null,
				date_input: null,
			}
		}
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
		},
		callSaveMethod(evt) {
			console.log('evt', evt);
			this.addDepartment()
		},
		closeDeptPopup(evt) {
			console.log("ClosePopup", evt)
			this.openedDeptPopup = evt
		},
		async addDepartment() {
      //Add Department for Users Own Company
      console.log('addDepartment');
      // var dateTime = moment();
      this.departmentForm.datetime_input = "2011-09-01T13:20:30+03:00";
      this.departmentForm.date_input = moment("2019-11-08T17:44:56.144").format(moment.HTML5_FMT.DATE);
      let response = await this.setUserPlatformPOST(this.departmentForm);
      console.log('addDepartment response', response);
      
      await this.$store.dispatch('addDepartment', response);
      this.resetForm();
    },
    resetForm() {
      for(let key in this.departmentForm) {
        this.departmentForm[key]= null;
      }
    },
    
    deleteDepartment(name) {
      //I need to do a search for inventory items that already have a category attached to them that are being deleted
      //Ask the user if they want to delete the categories from the items first. Otherwise prevent deletion.
      console.log('deleteDepartment');
      var departmentObj = this.GET_DEPARTMENTS_LIST.find(elem => elem.name === name);
      console.log('departmentObj', departmentObj);
      this.$store.dispatch('deleteDepartment', departmentObj.id);
    },
	},
	computed: {
		...mapState(["Common", "Locale", "Merchants", "Auth"]),
    ...mapGetters(["GET_DEPARTMENTS_LIST"]),
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
.positions-popup {
	height: 400px;
}
</style>
