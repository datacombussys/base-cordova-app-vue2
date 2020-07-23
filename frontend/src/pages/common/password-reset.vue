<template>
	<f7-page name="password-reset" style="background-image: url('/static/LoginPage1920x1080.jpg');" login-screen no-toolbar no-navbar no-swipeback>
		
		<!-- Login Box -->
		<f7-login-screen-title>Password Reset</f7-login-screen-title>
		<!-- Error Mapping -->
		<f7-row class="full-width display-flex justify-content-center">
			<div v-if="Errors.loginErrorHandle" class="left message is-danger display-flex align-items-center col-20">
				<div class="message-body">Logging in was unsuccessful.</div>
			</div>
		</f7-row>
		<f7-row class="display-flex justify-content-center">
			<f7-col width="40">
				<f7-card>
					<f7-card-content>
						<f7-row class="display-flex justify-content-center">
							<f7-list form class="full-width">
								<f7-list-input
									label="Current Password"
									type="password"
									placeholder="Your Current Password"
									:value="loginData.password"
									@input="loginData.password = $event.target.value"
								>
								</f7-list-input>
								<f7-list-input
									label="New Password"
									type="password"
									placeholder="Confirm Your New Password"
									:value="loginData.new_password"
									@input="loginData.new_password = $event.target.value"
								>
								</f7-list-input>
							
								<f7-list-input
									label="Confirm Password"
									type="password"
									placeholder="Confirm Your New Password"
									:value="loginData.confirm_password"
									@input="loginData.confirm_password = $event.target.value"
								>
								</f7-list-input>
							</f7-list>
							<f7-row class="no-margin">
									<f7-col class="no-margin">
										<strong><p>Password Requirements:</p></strong>
										<f7-list-item>Minimum of 9 characters</f7-list-item>
										<f7-list-item>Cannot contain personal informaiton</f7-list-item>
										<f7-list-item>Cannot be a common word</f7-list-item>
										<f7-list-item>Cannot be entirely numeric</f7-list-item>
									</f7-col>
								</f7-row>
							<f7-list class="full-width">
								<f7-list-button @click.prevent="passwordReset">Submit</f7-list-button>
								<f7-block-footer>
									© Copyright 2020 Datacom Business Systems. All Rights
									Reserved.
								</f7-block-footer>
							</f7-list>
						</f7-row>
					</f7-card-content>
				</f7-card>
			</f7-col>
		</f7-row>
		<!-- <f7-row>
			<f7-col width="25">
				<f7-button fill @click="testingmethod"> Test Button</f7-button>
			</f7-col>
		</f7-row> -->
		
		
		

		
		
		<!-- END Login Screen -->
	</f7-page>
</template>

<script>

import { mapActions } from "vuex";
import {mapState} from 'vuex';

export default {
	name: "passwordReset",
	data() {
		return {
			loginData: {
				email: "",
				currentPassword: "",
        new_password: "",
        confirm_password: "",
			},
			errorData: {
        type: "Login Unsuccessful",
        data: {
					non_field_errors: ["Credentials Do Not Match"]
				},
        status: 400
      },
		};
	},

	methods: {
		testingmethod() {
			console.log('this', this);
			console.log('this.$router', this.$router);
			console.log('Users.employeeListe', this.Users.employeeList);


    },
    async passwordReset() {
			try {
				if(this.loginData.new_password != this.loginData.confirm_password) {
					console.log('Passwords do not match');
				}
				else {
					console.log('Password Reset Submitted');
					this.loginData.email = this.$f7route.params.email;
					let employeeResponse = await this.$store.dispatch('GETEmployeeList');
					console.log("employeeResponse", employeeResponse);
					//Query Emplpoyee List for specific User
					var userObj = employeeResponse.find(item => item.user.email == this.loginData.email);
					console.log("userObj", userObj);
					this.loginData.id = userObj.user.id;
					console.log("this.loginData", this.loginData);
					this.$store.dispatch("passwordReset", this.loginData);
					this.$store.commit('RESET_ERRORS');
				}
			} catch (error) {
				console.error("Promise Response Error creating User and Employee", error);
			}
      
    },
		...mapActions({
			signIn: "/js/store/auth/auth"
		}),

	},
	computed: {
		...mapState(["Users", "Errors", "Auth", "Emails"]),
	},
	on: {
	}
};
</script>

<style lang="scss" scoped>
.login-screen-content {
	padding-top: 10%;
}
</style>
