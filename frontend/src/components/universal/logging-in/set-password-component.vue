<template>
	<div>
		<f7-row v-show="accountSettings.editProfile">
			<f7-block-title class="full-width" medium>Login Information</f7-block-title>
			<f7-row class="full-width" v-if="!accountSettings.showPasswordReset">
				<f7-col>
					<table class="password-requirements-table">
						<p>	Password requirements:</p>
						<tbody>
							<tr>
								<td>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="minOneLetter" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											Minimum of One Letter: a, b c, d, e
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="minOneNumber" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											Minimum of One Number: 1234567890
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="minOneCharacter" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											Minimum of One Special Character: #@*^&!
										</f7-col>
									</f7-row>
								</td>
								<td>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="minSixChars" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											Minimum 6 characters
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="cantUseName" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											Cannot use your name in password
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="10">
											<f7-icon size="20" :color="cantUseCommon" icon="mdi mdi-check-bold"></f7-icon>
										</f7-col>	
										<f7-col width="90">
											No common words such as 'password'
										</f7-col>
									</f7-row>
								</td>
							</tr>
						</tbody>
					</table>
				</f7-col>
			</f7-row>
			<f7-row class="full-width">
				<f7-list simple-list class="full-width">
					<f7-row v-if="accountSettings.showPasswordReset" class="full-width margin-top">
						<f7-col width="100">
							<f7-button fill>Password Reset</f7-button>
						</f7-col>
					</f7-row>
					<f7-row v-if="!accountSettings.showPasswordReset" class="margin-top">
						<f7-col width="50">
							<p class="field-title">Email:<span style="color: red;"> *</span></p>
							<f7-list-input
								validate
								required
								error-message="Email is required"
								:value="loginForm.user.email"
								@input="loginForm.user.email = $event.target.value"
								type="email"
								class="datacom-input"
							>
							</f7-list-input>
							<f7-row>
								<f7-col width="10">
									<f7-icon size="20" :color="isValidEmail" icon="mdi mdi-check-bold"></f7-icon>
								</f7-col>	
								<f7-col width="90" v-if="isValidEmail== 'red'">
									Please enter a valid email address
								</f7-col>
								<f7-col width="90" v-if="isValidEmail== 'green'">
									Valid email
								</f7-col>
							</f7-row>
							<!-- Error Handling -->
							<f7-row 
								v-for="errorArray in errorData" 
								:key="errorArray.id">	
								<article
									v-if="errorArray[0] === 'email'"
									class="has-background-white margin-top-half"
									:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
									<div 
										class="message-body">
										{{ errorArray[1][0] }}
									</div>
								</article>
							</f7-row>
							<!-- <f7-row>	
								<article
									v-if="isValidEmail"
									class="has-background-white margin-top-half"
									:class="`message ${isValidEmail ? 'is-danger' : 'is-success'}`">
									<div 
										class="message-body">
										{{ isValidEmail }}
									</div>
								</article>
							</f7-row> -->
							<!-- END Error Handling -->
						</f7-col>
						<f7-col width="50">
							<p class="field-title">PIN:<span style="color: red;"> *</span></p>
							<f7-list-input
								validate
								required
								pattern="[0-9]{1,4}"
								error-message="4-Digit Numerical PIN is required"
								:value="loginForm.user.pin"
								@input="loginForm.user.pin = $event.target.value"
								type="password"
								class="datacom-input"
							>
							</f7-list-input>
							<!-- Error Handling -->
							<f7-row 
								v-for="errorArray in errorData" 
								:key="errorArray.id">	
								<article
									v-if="errorArray[0] === 'pin'"
									class="has-background-white margin-top-half"
									:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
									<div 
										class="message-body">
										{{ errorArray[1][0] }}
									</div>
								</article>
							</f7-row>
							<!-- END Error Handling -->
						</f7-col>
						<f7-col width="50">
							<p class="field-title">Password:<span style="color: red;"> *</span></p>
							<f7-list-input
								validate
								required
								error-message="Password is required"
								:value="loginForm.user.password"
								@input="loginForm.user.password = $event.target.value"
								type="password"
								class="datacom-input"
							>
							</f7-list-input>
							<!-- Error Handling -->
							<f7-row 
								v-for="errorArray in errorData" 
								:key="errorArray.id">	
								<article
									v-if="errorArray[0] === 'password'"
									class="has-background-white margin-top-half"
									:class="`message ${errorHandle ? 'is-danger' : 'is-success'}`">
									<div 
										class="message-body">
										{{ errorArray[1][0] }}
									</div>
								</article>
							</f7-row>
							<!-- END Error Handling -->
						</f7-col>
						<f7-col width="50">
							<p class="field-title">Verify PW:<span style="color: red;"> *</span></p>
							<f7-list-input
								validate
								required
								error-message="You must verify password"
								:value="loginForm.user.verify_pw"
								@input="loginForm.user.verify_pw = $event.target.value"
								type="password"
								class="datacom-input"
							></f7-list-input>
						</f7-col>
					</f7-row>
				</f7-list>
				<!-- Error Handling -->
				<f7-row>	
					<article
						v-if="computedPasswords"
						class="has-background-white margin-top-half"
						:class="`message ${computedPasswords ? 'is-danger' : 'is-success'}`">
						<div 
							class="message-body">
							{{ computedPasswords }}
						</div>
					</article>
				</f7-row>
				<!-- END Error Handling -->
			</f7-row>
		</f7-row>
		<f7-row velse>

		</f7-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
import _ from 'lodash';

export default {
	name: "setPasswordComponent",
	mixins: [],
	components: {},
	props: {
		accountSettings: {
			type: Object,
			required: true
		},
		loginForm: {
			type: Object,
			required: true
		},
		errorData: {
			type: Array,
			required: true
		},
		errorHandle: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			passwordMessage: "",
		};
	},
	methods: {
		testingMethod(e) {

		}
	},
	computed: {
		computedPasswords: {
			get() {
				console.log("this.passwordMessage", this.passwordMessage);
				if (this.loginForm.user.password != this.loginForm.user.verify_pw) {
					return "The passwords do not match";
				} else {
					return;
				}
			},
			set(newVal, oldVal) {
				console.log('newVal', newVal);
				console.log('oldVal', oldVal);

				this.passwordMessage = "New Message";
			},
		},
		minOneLetter() {
			console.log('minOneLetter');
			var re = /[a-zA-Z]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return 'green';
				}
			}
			return 'red';
		},
		minOneNumber() {
			console.log('minOneNumber');
			var re = /[0-9]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return 'green';
				}
			}
			return 'red';
		},
		minOneCharacter() {
			console.log('minOneCharacter');
			var re = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return 'green';
				}
			}
			return 'red';
		},
		minSixChars() {
			console.log('minSixChars');
			var re = /.{6,}$/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return 'green';
				}
			}
			return 'red';
		},
		cantUseName() {
			console.log('cantUseName');
			if(this.loginForm.user.first_name) {
				var firstname = this.loginForm.user.first_name.toLowerCase();
			}
			if(this.loginForm.user.last_name) {
				var lastname = this.loginForm.user.last_name.toLowerCase();
			}
			if(this.loginForm.user.email) {
				var email = this.loginForm.user.email.toLowerCase();
			}
			var words = [firstname, lastname, email];
			if(this.loginForm.user.password) {
				var password = this.loginForm.user.password.toLowerCase();
				for(let key in words) {
					if(password.includes(words[key])) {
						return 'red'
					} 
				}
			}
			return 'green';
		},
		cantUseCommon() {
			console.log('cantUseCommon');
			var words = ['password', '12345'];

			if(this.loginForm.user.password) {
				var password = this.loginForm.user.password.toLowerCase();
				for(let key in words) {
					if(password.includes(words[key])) {
						return 'red'
					} 
				}
			}
			return 'green';
		},
		isValidEmail() {
			console.log('cantUseCommon');
			var re = /([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/;
			if(this.loginForm.user.email) {
				if(this.loginForm.user.email.match(re)) {
					return 'green';
				}
			}
			return 'red';
		}
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less">
@standard-font: 1.1em;

.password-requirements-table {
	width: 100%;
	p {
		font-family: OpenSans-Bold;
		font-size: @standard-font*1.2;
	}
	tbody {
		tr {
			td {
				ul {
					li {
						font-size: @standard-font*0.8;
						list-style: disc inside;
					}
				}
			}
		}
	}
}
</style>
