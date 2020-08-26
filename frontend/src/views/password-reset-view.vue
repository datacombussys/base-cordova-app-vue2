<template>
  <div>  
    <dx-validation-group>
      <div class="login-header">
        <div class="title">{{ title }}</div>
        <div>Sign In to your account</div>
      </div>

			<template>
				<DxValidationSummary id="summary"/>
			</template>

      <div class="dx-field mt-5">
        <dx-text-box placeholder="Email" width="100%" :value.sync="email">
          <dx-validator>
						<DxEmailRule
							message="Must be a valid email address"
            />
            <dx-required-rule message="Login is required" />
          </dx-validator>
        </dx-text-box>
      </div>

      <div class="dx-field mt-5 mb-5">
        <dx-text-box
          placeholder="Confirm Email"
          width="100%"
          mode="email"
          :value.sync="confirmEmail"
        >
          <dx-validator>
						<DxEmailRule
							message="Must be a valid email address"
            />
            <dx-required-rule message="Confirm Password is required" />
						<DxCompareRule
							:comparison-target="emailComparison"
							message="Password and Confirm Password do not match"
						/>
          </dx-validator>
        </dx-text-box>
      </div>

			<div class="mt-10">
				<div class="dx-field">
					<dx-button
						type="default"
						text="Reset"
						width="100%"
						@click="sendEmail"
					/>
      </div>
			</div>
      

    </dx-validation-group>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxCheckBox from "devextreme-vue/check-box";
import DxTextBox from "devextreme-vue/text-box";
import DxValidationGroup from "devextreme-vue/validation-group";
import { alert } from 'devextreme/ui/dialog';
import DxValidationSummary from 'devextreme-vue/validation-summary';

import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
} from 'devextreme-vue/validator';

export default {
  components: {
    DxButton,
    DxCheckBox,
    DxTextBox,
    DxValidator,
		DxRequiredRule,
		DxCompareRule,
  	DxEmailRule,
		DxValidationGroup,
		DxValidationSummary,
		alert
  },
  data() {
    return {
      title: this.$appInfo.title,
      email: "",
			confirmEmail: "",
    };
  },
  methods: {
    sendEmail(e) {
			let validate = e.validationGroup.validate();
			if (validate.isValid) {
				this.$store.commit('NOTIFICATION_MESSAGES', {title: "Success", text: "Please check your email"});
				this.$store.dispatch('passwordResetEmail', this.loginData.username);

				// this.$nextTick(function() {
				// 	let result = alert("An email hgas been sent to " + this.email, "Email Sent")
				// 	this.$router.push('/login-form')
				// 	// e.validationGroup.reset()
				// })
        return;
      } else {
				this.$store.commit('SET_FORGOT_PW_ERRORS', "You must enter your email address first");
			}
			
		},
		emailComparison() {
      return this.email;
    },
  },
  
};
</script>

<style lang="scss">
@import "../assets/themes/devexpress/generated/variables.base.scss";

.login-header {
  text-align: center;
  margin-bottom: 40px;

  .title {
    color: $base-accent;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
  }
}
</style>
