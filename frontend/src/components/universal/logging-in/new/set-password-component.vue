<template>
	<div>

		<template>
			<DxValidationSummary id="summary"/>
		</template>
		<template>	
			<div class="row">
				<div class="col-100p">
					<table class="password-requirements-table">
						<p>	Password requirements:</p>
						<tbody>
							<tr>
								<td>
									<div class="row">
										<div class="col-10p p-4">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneLetter ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
											Minimum of One Letter: a, b c, d, e
										</div>
									</div>
									<div class="row">
										<div class="col-10p">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneNumber ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
											Minimum of One Number: 1234567890
										</div>
									</div>
									<div class="row">
										<div class="col-10p">
											<div class="mdi mdi-check-bold mdi-24px" :class="minOneCharacter ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
											Minimum of One Special Character: #@*^&!
										</div>
									</div>
								</td>
								<td>
									<div class="row">
										<div class="col-10p">
											<div class="mdi mdi-check-bold mdi-24px" :class="minSixChars ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
											Minimum 6 characters
										</div>
									</div>
									<div class="row">
										<div class="col-10p">
											<div class="mdi mdi-check-bold mdi-24px" :class="cantUseName ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
											Cannot use your name in password
										</div>
									</div>
									<div class="row">
										<div class="col-10p">
											<div class="mdi mdi-check-bold mdi-24px" :class="cantUseCommon ? 'text-green': 'text-red'"></div>
										</div>	
										<div class="col-90p">
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
				<div class="col-50p">
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

					<div class="col-50p">
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
					<div class="col-50p">
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
						<div class="col-50p">
							<div class="dx-field">
								<div class="dx-field-label">Password</div>
								<div class="dx-field-value">
									<DxTextBox
										:disabled="!accountSettings.editProfile"
										:value.sync="loginForm.user.password"
										@key-up="calcValidPassword($event)"
										mode="password"
									>
										<DxValidator>
											<DxRequiredRule message="Password is required"/>
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
						</div>
						<div class="col-50p">
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
			minOneLetter: false,
			minOneNumber: false,
			minOneCharacter: false,
			minSixChars: false,
			cantUseName: false,
			cantUseCommon: false,

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.accountSettings.editProfile', this.accountSettings.editProfile)

		},
		passwordComparison() {
      return this.loginForm.user.password;
		},
		
		asyncValidation() {
			console.log("AsyncValidation")
		},
		calcValidPassword(e) {
			console.log('e', e)
			var oneLetter = /[a-zA-Z]+/
			var minOneNum = /[0-9]+/
			var minOneChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
			var minSixChar = /^.{6,}$/
			
			let foundoneLetter = oneLetter.test(e.event.target.value)
			console.log('foundoneLetter', foundoneLetter);
			let foundminOneNum = minOneNum.test(e.event.target.value)
			console.log('foundminOneNum', foundminOneNum);
			let foundminOneChar = minOneChar.test(e.event.target.value)
			console.log('foundminOneChar', foundminOneChar);
			let foundminSixChar = minSixChar.test(e.event.target.value)
			console.log('foundminSixChar', foundminSixChar);


			if(oneLetter.test(e.event.target.value)) {
				this.minOneLetter = true
				console.log('minOneLetter', this.minOneLetter);
			} else if(minOneNum.test(e.event.target.value)) {
				this.minOneNumber = true
				console.log('minOneNumber', this.minOneNumber);
			} else if(minOneChar.test(e.event.target.value)) {
				this.minOneCharacter = true
				console.log('minOneCharacter', this.minOneCharacter);
			} else if(minSixChar.test(e.event.target.value)) {
				this.minSixChars = true
				console.log('minSixChars', this.minSixChars);
			} else {
				this.minOneLetter = false
				this.minOneNumber = false
				this.minOneCharacter = false
				this.minSixChars = false
			}

		}
	
	},
	computed: {
		...mapState([]),
		// minOneLetter() {
			
		// 	return false;
		// },
		// minOneNumber() {
		// 	
		// 	return false;
		// },
		// minOneCharacter() {
		// 	console.log('minOneCharacter');
		// 	var minOneChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		// 	if(this.loginForm.user.password) {
		// 		if(this.loginForm.user.password.match(minOneChar)) {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// },
		// minSixChars() {
		// 	console.log('minSixChars');
		// 	var minSixChar = /.{6,}$/;
		// 	if(this.loginForm.user.password) {
		// 		if(this.loginForm.user.password.match(minSixChar)) {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// },
		// cantUseName() {
		// 	console.log('cantUseName');
		// 	if(this.loginForm.user.first_name) {
		// 		var firstname = this.loginForm.user.first_name.toLowerCase();
		// 	}
		// 	if(this.loginForm.user.last_name) {
		// 		var lastname = this.loginForm.user.last_name.toLowerCase();
		// 	}
		// 	if(this.loginForm.user.email) {
		// 		var email = this.loginForm.user.email.toLowerCase();
		// 	}
		// 	var words = [firstname, lastname, email];
		// 	if(this.loginForm.user.password) {
		// 		var password = this.loginForm.user.password.toLowerCase();
		// 		for(let key in words) {
		// 			if(password.includes(words[key])) {
		// 				return false
		// 			} 
		// 		}
		// 	}
		// 	return true;
		// },
		// cantUseCommon() {
		// 	console.log('cantUseCommon');
		// 	var words = ['password', '12345'];

		// 	if(this.loginForm.user.password) {
		// 		var password = this.loginForm.user.password.toLowerCase();
		// 		for(let key in words) {
		// 			if(password.includes(words[key])) {
		// 				return false
		// 			} 
		// 		}
		// 	}
		// 	return true;
		// },
		
	},
	watch: {
		// 'loginForm.user.password': {
		// 	handler: function (after, before) {
				 
		// 	},
		// 	deep: true
		// }
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
