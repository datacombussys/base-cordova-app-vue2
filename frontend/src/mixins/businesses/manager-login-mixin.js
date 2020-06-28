export const managerLoginMixin = {
  data() {
    return {
			manager: {
				managerMode: null,
				isUserManager: false,
				approvingManager: null,
				invalidCredentials: false,
				loginForm: {
					email: null,
					password: null
				},
				loginBarcode: {
					barcode_number: null,
					pin: null
				}
			}
   

    }
  },
  methods: {
		async sendManagerCredentials() {
			this.$f7.preloader.show();
			// If Manager uses the UserID and PW Field... Need to create API endpoint
			if (this.sharedData.manager.loginForm.email) {
				if (this.sharedData.manager.loginForm.email && this.sharedData.manager.loginForm.password) {
					this.$store.dispatch("managerAuthorizationBarcode", this.loginForm);
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
			//Barcode signIn Option
			if (this.sharedData.manager.loginBarcode.barcode_number) {
				console.log("Auth using barcode signin");
				console.log("this.sharedData.manager.loginBarcode", this.sharedData.manager.loginBarcode);
				if (this.sharedData.manager.loginBarcode.barcode_number && this.sharedData.manager.loginBarcode.pin) {
					//find user in employeeList by barcode and sign that person in
					var managerAuthRes = await this.$store.dispatch("managerAuthorizationBarcode", this.sharedData.manager.loginBarcode);
					console.log("managerAuthRes", managerAuthRes);
					//Clear Login Form
					this.sharedData.manager.loginBarcode.barcode_number = null;
					this.sharedData.manager.loginBarcode.pin = null;
					//Handle Response
					if (managerAuthRes.status === 200) {
						this.orderForm.discounts.managerApproved = true;
						setTimeout(() => {
							this.discountSettings.activeStepDiscount = 1;
						}, 2000);
					} else {
						this.sharedData.manager.invalidCredentials = true;
						setTimeout(() => {
							this.resetDiscounts();
						}, 2000);
					}
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
		},


  },
  mounted() {

  },
  created() {
    console.log("The created Mixin for the LocaleMixin worked!");
  }
}