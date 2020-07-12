<template>
	<f7-page no-toolbar no-navbar no-swipeback>
		<div class="login-background">
			<!-- Login Box -->
			<f7-login-screen-title>Databoxx</f7-login-screen-title>
			<!-- Error Mapping -->
			<f7-row class="full-width display-flex justify-content-center">
				<div v-if="Errors.loginErrorHandle" class="left message is-danger display-flex align-items-center col-20">
					<div class="message-body">Logging in was unsuccessful.</div>
				</div>
			</f7-row>
			<f7-row class="display-flex justify-content-center">
				<f7-col width="30">
					<f7-card>
						<f7-card-content>
							<f7-row class="display-flex justify-content-center">
								<f7-list form class="full-width">
									<f7-list-input
										label="email"
										type="text"
										placeholder="Email Address"
										:value="loginData.username"
										@input="loginData.username = $event.target.value"
									>
									</f7-list-input>
									<div v-if="Errors.loginErrorData.length != 0">
										<div class="full-width" v-for="errorArray in Errors.loginErrorData" :key="errorArray.id">
											<div class="display-flex justify-content-center" :class="`message ${Errors.loginErrorHandle ? 'is-danger': 'is-success'}`">
												<div v-show="errorArray[0] === 'username'" class="message-body">
													{{ errorArray[1][0] }}
												</div>
											</div>
										</div>
									</div>
									<f7-list-input
										label="password"
										type="password"
										placeholder="Your Password"
										:value="loginData.password"
										@input="loginData.password = $event.target.value"
									>
									</f7-list-input>
									<div v-if="Errors.loginErrorData.length != 0">
										<div class="full-width" v-for="errorArray in Errors.loginErrorData" :key="errorArray.id">
											<div class="display-flex justify-content-center" :class="`message ${Errors.loginErrorHandle ? 'is-danger': 'is-success'}`">
												<div v-show="errorArray[0] === 'password'" class="message-body">
													{{ errorArray[1][0] }}
												</div>
											</div>
										</div>
									</div>
									<div v-if="Errors.loginErrorData.length != 0">
										<div class="full-width display-flex justify-content-center no-padding-no-margin" v-for="errorArray in Errors.loginErrorData" :key="errorArray.id">
											<div class="display-flex justify-content-center" :class="`message ${Errors.loginErrorHandle ? 'is-danger': 'is-success'}`">
												<div v-show="errorArray[0] === 'non_field_errors'" class="message-body">
													{{ errorArray[1][0] }}
												</div>
											</div>
										</div>
									</div>
								</f7-list>
								<f7-list class="full-width">
								<f7-row class="display-flex justify-content-space-around"> 
									<f7-list-button @click.prevent="submit">Sign In</f7-list-button>
									<f7-list-button @click.prevent="forgotPW">Forgot Password</f7-list-button>
								</f7-row>
							
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
			</f7-row>
			-->

		</div>
		<!-- END Login Screen -->
	</f7-page>
</template>

<script>
//Import and Use Axios
import axios from "axios";

import { mapActions } from "vuex";
import {mapState} from 'vuex';

export default {
	name: "login",
	data() {
		return {
			loginData: {
				username: "ian@datacom.com",
				password: "manofGod123",
			}
		};
	},

	methods: {
		testingmethod() {
			console.log('this.Errors.loginErrorHandle', this.Errors.loginErrorHandle);
			console.log('this.Errors.loginErrorData', this.Errors.loginErrorData);
			
		},
		...mapActions({
			signIn: "/js/store/auth/auth"
		}),
		submit(loginData) {
			this.$store.commit('RESET_ERRORS');
			this.$store.dispatch("signIn", this.loginData);
			
		},
		forgotPW() {
			this.$store.commit('RESET_ERRORS');
			if(!this.loginData.username) {
				this.$store.commit('SET_FORGOT_PW_ERRORS', "You must enter your email address first");
			} else{
				this.$store.dispatch('passwordResetEmail', this.loginData.username);
				this.$store.commit('NOTIFICATION_MESSAGES', "Please check your email");
			}
		}
	},
	computed: {
		...mapState(["Users", "Errors", "Auth"]),
	},
	on: {
	}
};
</script>

<style lang="scss" scoped>
.login-background {
	// background: green;
	background-image: url('/static/LoginPage1920x1080.jpg');
	height: 100vh;
	padding-top: 15%;
}
	
	
	</style>
