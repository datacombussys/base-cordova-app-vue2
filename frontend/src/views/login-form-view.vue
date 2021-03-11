<template>
  <div>  
    <DxValidationGroup 
			ref="loginValidationGrpRef">
      <div class="login-header">
        <div class="title">{{ title }}</div>
        <div>Sign In to your account</div>
      </div>

      <template>
				<DxValidationSummary id="summary"/>
			</template>

      <div class="mt-5">
        <div class="dx-field">
          <dx-text-box placeholder="Email" width="100%" :value.sync="loginData.username">
            <dx-validator>
              <dx-required-rule message="Login is required" />
            </dx-validator>
          </dx-text-box>
      </div>
      </div>
      

      <div class="dx-field mt-5">
        <dx-text-box
          placeholder="Password"
          width="100%"
          mode="password"
          :value.sync="loginData.password"
        >
          <dx-validator>
            <dx-required-rule message="Password is required" />
          </dx-validator>
        </dx-text-box>
      </div>

      <div class="dx-field mt-5">
        <dx-check-box :value.sync="rememberUser" text="Remember me" />
      </div>

      <div class="dx-field mt-5">
        <dx-button
          type="default"
          text="Login"
          width="100%"
          @click="onLoginClick"
        />
      </div>

      <div class="dx-field mt-5">
        <router-link to="/password-reset"><a>Forgot password ?</a></router-link>
      </div>

      <div class="dx-field mt-5">
        <dx-button type="normal" text="Create an account" width="100%" />
      </div>
    </DxValidationGroup>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxCheckBox from "devextreme-vue/check-box";
import DxTextBox from "devextreme-vue/text-box";
import DxValidationGroup from "devextreme-vue/validation-group";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DxValidationSummary from 'devextreme-vue/validation-summary';

export default {
  components: {
    DxButton,
    DxCheckBox,
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxValidationGroup,
    DxValidationSummary
  },
  data() {
    return {
      title: this.$appInfo.title,
      loginData: {
        username: "ian1@ian.com",
				password: "manofGod123",
      },
      rememberUser: false
    };
  },
  methods: {
    onLoginClick() {
      let validate = this.validateForm();
      console.log('validate', validate)
      // console.log('loginData', this.loginData)
      if (validate.isValid) {
        this.$store.dispatch("signIn", this.loginData)
				// e.validationGroup.reset()
        return;
      }
      
		},
		validateForm() {
			return this.validateLoginGroup.validate()
		}
    
	},
	computed: {
		validateLoginGroup() {
			return this.$refs.loginValidationGrpRef.instance
		}
	},
	mounted() {
		document.addEventListener("keyup", event => {
			if(event.keyCode === 13) {
				this.onLoginClick()
			}
		})
	}
  
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
