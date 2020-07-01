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
			if (this.manager.loginForm.email) {
				if (this.manager.loginForm.email && this.manager.loginForm.password) {
					this.$store.dispatch("managerAuthorizationBarcode", this.loginForm);
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
			//Barcode signIn Option
			if (this.manager.loginBarcode.barcode_number) {
				console.log("Auth using barcode signin");
				console.log("this.manager.loginBarcode", this.manager.loginBarcode);
				if (this.manager.loginBarcode.barcode_number && this.manager.loginBarcode.pin) {
					//find user in employeeList by barcode and sign that person in
					var managerAuthRes = await this.$store.dispatch("managerAuthorizationBarcode", this.manager.loginBarcode);
					console.log("managerAuthRes", managerAuthRes);
					//Clear Login Form
					this.manager.loginBarcode.barcode_number = null;
					this.manager.loginBarcode.pin = null;
					//Handle Response
					if (managerAuthRes.status === 200) {
						this.orderForm.discounts.managerApproved = true;
						setTimeout(() => {
							this.discountSettings.activeStepDiscount = 1;
						}, 2000);
					} else {
						this.manager.invalidCredentials = true;
						setTimeout(() => {
							this.resetDiscounts();
						}, 2000);
					}
				} else {
					this.$store.dispatch("updateNotification", this.errorData);
				}
			}
			this.$f7.preloader.hide();
		},
		//Input Focus Change
		changeFocus(fromBox, toBox) {
			console.log("fromBox", fromBox);
			console.log("this toBox", toBox);
			var length = this.$refs[fromBox].$el.querySelector("input").value.length;
			console.log("length", length);
			var maxLength = this.$refs[fromBox].$el.querySelector("input").getAttribute("maxlength");
			console.log("maxLength", maxLength);

			var nextField = document.getElementById(toBox);
			console.log("nextField", nextField);

			if (length == maxLength) {
				nextField.focus();
			}
		},


  },
  mounted() {

  },
  created() {
    console.log("The created Mixin for the LocaleMixin worked!");
  }
}