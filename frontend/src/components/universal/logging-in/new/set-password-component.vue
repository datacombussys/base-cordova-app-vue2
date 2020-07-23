<template>
	<div>

		<template>
			<DxValidationSummary id="summary"/>
		</template>
		<template>	
			<div class="row">
				<div class="col-100">
					<table class="password-requirements-table">
						<p>	Password requirements:</p>
						<tbody>
							<tr>
								<td>
									<div class="row">
										<div class="col-10 p-4">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneLetter ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											Minimum of One Letter: a, b c, d, e
										</div>
									</div>
									<div class="row">
										<div class="col-10">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneNumber ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											Minimum of One Number: 1234567890
										</div>
									</div>
									<div class="row">
										<div class="col-10">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneCharacter ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											Minimum of One Special Character: #@*^&!
										</div>
									</div>
								</td>
								<td>
									<div class="row">
										<div class="col-10">
											<div class="mdi mdi-check-bold mdi-24px" :class="minSixChars ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											Minimum 6 characters
										</div>
									</div>
									<div class="row">
										<div class="col-10">
											<div class="mdi mdi-check-bold mdi-24px" :class="cantUseName ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											Cannot use your name in password
										</div>
									</div>
									<div class="row">
										<div class="col-10">
											<div class="mdi mdi-check-bold mdi-24px" :class="cantUseCommon ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90">
											No common words such as 'password'
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</template>

		<template>	
			<div class="row" v-if="accountSettings.showPasswordReset" >
				<div class="col-50">
					<DxButton
					class="w-full"
					text="Reset password"
					@click="testingMethod" />
				</div>
			</div>
		</template>

		<template>
			<div class="dx-fieldset">
				<div class="dx-fieldset-header">Set Password</div>
				<div class="row">

					<div class="col-50">
						<div class="dx-field">
							<div class="dx-field-label">Email Address</div>
							<div class="dx-field-value">
								<DxTextBox 
									:disabled="!accountSettings.editProfile"
									:value.sync="loginForm.user.email">
									<DxValidator>
										<DxRequiredRule message="Email is required"/>
										<DxEmailRule message="Email is invalid"/>
										<!-- <DxAsyncRule
											:validation-callback="asyncValidation"
											message="Email is already registered"
										/> -->
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="col-50">
						<div class="dx-field">
						<div class="dx-field-label">PIN</div>
							<div class="dx-field-value">
								<DxTextBox
									:disabled="!accountSettings.editProfile"
									:value.sync="loginForm.user.pin">
									<DxValidator>
										<DxRequiredRule message="Last Name is required"/>
										<DxPatternRule
											pattern="^[0-9]+$"
											message="The name should not contain numbers or special characters"
										/>
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-50">
							<div class="dx-field">
								<div class="dx-field-label">Password</div>
								<div class="dx-field-value">
									<DxTextBox
										:disabled="!accountSettings.editProfile"
										:value.sync="loginForm.user.password"
										mode="password"
									>
										<DxValidator>
											<DxRequiredRule message="Password is required"/>
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
						</div>
						<div class="col-50">
							<div class="dx-field">
								<div class="dx-field-label">Confirm Password</div>
								<div class="dx-field-value">
									<DxTextBox 
										:disabled="!accountSettings.editProfile"
										:value.sync="confirmPassword"
										mode="password">
										<DxValidator>
											<DxRequiredRule message="Confirm Password is required"/>
											<DxCompareRule
												:comparison-target="passwordComparison"
												message="Password and Confirm Password do not match"
											/>
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</template>


	</div>
</template>

<script>
import { mapState } from "vuex";
import DxTextBox from 'devextreme-vue/text-box';
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import DxDateBox from 'devextreme-vue/date-box';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule
} from 'devextreme-vue/validator';

//Mixins
import { FormMixins } from "@/mixins/form-mixins"

export default {
	name: "setPasswordComponent",
	mixins: [
		FormMixins
	],
	components: {
		DxTextBox,
		DxButton,
		DxDateBox,
		DxValidationSummary,
		DxValidator,
		DxRequiredRule,
		DxCompareRule,
		DxEmailRule,
		DxPatternRule,
		DxStringLengthRule,
		DxRangeRule,
		DxAsyncRule

	},
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
			required: false
		},
		errorHandle: {
			type: Boolean,
			required: false
		}

	},
	data() {
		return {
			//Form Settings
			confirmPassword: null,

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.accountSettings.editProfile', this.accountSettings.editProfile)

		},
		passwordComparison() {
      return this.loginForm.user.password;
		},
		minOneLetter() {
			console.log('minOneLetter');
			var re = /[a-zA-Z]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return true;
				}
			}
			return false;
		},
		minOneNumber() {
			console.log('minOneNumber');
			var re = /[0-9]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return true;
				}
			}
			return false;
		},
		minOneCharacter() {
			console.log('minOneCharacter');
			var re = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return true;
				}
			}
			return false;
		},
		minSixChars() {
			console.log('minSixChars');
			var re = /.{6,}$/;
			if(this.loginForm.user.password) {
				if(this.loginForm.user.password.match(re)) {
					return true;
				}
			}
			return false;
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
						return false
					} 
				}
			}
			return true;
		},
		cantUseCommon() {
			console.log('cantUseCommon');
			var words = ['password', '12345'];

			if(this.loginForm.user.password) {
				var password = this.loginForm.user.password.toLowerCase();
				for(let key in words) {
					if(password.includes(words[key])) {
						return false
					} 
				}
			}
			return true;
		},
		asyncValidation() {
			console.log("AsyncValidation")
		}
	
	},
	computed: {
		...mapState([]),
	},
	created() {},
	mounted() {




	}
}
</script>

<style lang="scss" scoped>
$standard-font: 1.1em;

.password-requirements-table {
	width: 100%;
	p {
		font-family: OpenSans-Bold;
		font-size: $standard-font*1.2;
	}
	tbody {
		tr {
			td {
				ul {
					li {
						font-size: $standard-font*0.8;
						list-style: disc inside;
					}
				}
			}
		}
	}
}
</style>
