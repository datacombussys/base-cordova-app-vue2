<template>
	<f7-page style="background-image: url('/static/LoginPage1920x1080.jpg');" no-toolbar no-navbar no-swipeback login-screen>
		
		<!-- Login Box -->
		<f7-login-screen-title>Login</f7-login-screen-title>
		<!-- Error Mapping -->
		<f7-row class="full-width display-flex justify-content-center">
			<div v-if="Errors.loginErrorHandle" class="left message is-danger display-flex align-items-center col-20">
				<div class="message-body">Logging in was unsuccessful.</div>
			</div>
		</f7-row>
		<f7-row class="display-flex justify-content-center">
			<f7-col width="75">
				<f7-card>
					<f7-card-content>
            <f7-row>
              <f7-col width="50">
                <f7-block-header>UserID + Password</f7-block-header>
                <f7-list form>
                  <f7-list-input
                    label="email"
                    type="text"
                    placeholder="Email Address"
                    :value="loginForm.username"
                    @input="loginForm.username = $event.target.value"
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
                    placeholder="Your password"
                    :value="loginForm.password"
                    @input="loginForm.password = $event.target.value"
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
              </f7-col>
              <f7-col width="50">
                <f7-block-header>Barcode + PIN</f7-block-header>
                <f7-list form>
                  <f7-list-input
                    ref="barcodeInput"
                    id="barcodeInputID"
                    autofocus
                    maxlength="7"
                    :value="loginBarcode.barcode_number"
                    @input="changeFocus('barcodeInput', 'pinInput'); loginBarcode.barcode_number = $event.target.value"
                    label="Barcode Number"
                    type="number"
                    placeholder="10000001"
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
                  <f7-list-item>
                    <input 
                    ID="pinInput"
                    class="pin-cell" 
                    type="numeric" 
                    placeholder="PIN" 
                    maxlength="4"
                    :value="loginBarcode.pin"
                    @input="loginBarcode.pin = $event.target.value"
                    @focus="show" 
                    data-layout="numeric" />
                  </f7-list-item>
                  <vue-touch-keyboard :options="options" v-show="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
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
              </f7-col>
            </f7-row>
					</f7-card-content>
          <f7-card-footer>
              <f7-row class="full-width display-flex justify-content-center">
                <f7-col width="100">  
                  <f7-list class="full-width">
                    <f7-list-button @click.prevent="submit">Sign In</f7-list-button>
                    <f7-block-footer>
                      © Copyright 2020 Datacom Business Systems. All Rights
                      Reserved.
                    </f7-block-footer>
                  </f7-list>
                </f7-col>
              </f7-row>
          </f7-card-footer>
				</f7-card>
			</f7-col>
		</f7-row>
		<f7-row>
			<f7-col width="25">
				<f7-button fill @click="testingmethod">Test Button</f7-button>
			</f7-col>
      <f7-col width="25">
				<f7-button fill href="/">Home</f7-button>
			</f7-col>
		</f7-row>

		<!-- END Login Screen -->
	</f7-page>
</template>

<script>
import {mapState} from 'vuex';

export default {
	name: "pos-login",
	data() {
		return {    
      //Login Forms
      loginForm: {
        email: "",
        password: "",
      },
      loginBarcode: {
        barcode_number: "",
        pin: ""
      },  
      errorData: {
        type: "Authorization Unsuccessful",
        data: {
          non_field_errors: ["Error sending request to server"]
        },
        status: 400
      },
      //Built-In Keyboard
      visible: false,
      layout: "numeric",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
		};
	},

	methods: {
		testingmethod() {
      console.log('this.Users.employeeBarcodeList', this.Users.employeeBarcodeList);
      console.log('this.Users.employeeList', this.Users.employeeList);
      console.log('this.loginBarcode', this.loginBarcode);
      console.log('this.loginForm', this.loginForm);
      // console.log('this.$refs', this.$refs.barcodeInput.$el.querySelector('input').focus());
      // console.log('this.$refs', this.$el.find('#barcodeInput'));
		},
		async submit(loginData) {
      // userID and PW signIn
      if(this.loginForm.username) {
        if(this.loginForm.username && this.loginForm.password) {
          this.$store.dispatch('signIn', this.loginForm);
        } else {
          this.$store.dispatch('updateNotification', this.errorData);
        }
      }
      //Barcode signIn
      if(this.loginBarcode.barcode_number) {
        if(this.loginBarcode.barcode_number && this.loginBarcode.pin) {
          //find user in employeeList by barcode and sign that person in
          this.$store.dispatch('signInAlt', this.loginBarcode);
        } else {
          this.$store.dispatch('updateNotification', this.errorData);
        }
      }
    },
    //Input Focus Change
    changeFocus(fromBox, toBox) {
      console.log('fromBox', fromBox);
      console.log('this toBox', toBox);
      var length = this.$refs[fromBox].$el.querySelector('input').value.length;
      console.log('length', length);
      var maxLength = this.$refs[fromBox].$el.querySelector('input').getAttribute('maxlength');
      console.log('maxLength', maxLength);

      var nextField = document.getElementById(toBox);
      console.log('nextField', nextField);

      if(length == maxLength) {
        nextField.focus();
      }
    },
    //Vue-Keyboard-Methods
    accept(text) {
      alert("Input text: " + text);
      this.hide();
    },
    show(e) {
      console.log('e', e);
      console.log('this.$refs', this.$refs);
      this.input = e.target;
      this.layout = e.target.dataset.layout;

      if (!this.visible)
        this.visible = true;
        console.log('this.visible', this.visible);
    },
    hide() {
      this.visible = false;
    }
	},
	computed: {
		...mapState(["Users", "Errors", "Auth"]),
  },
  mounted() {
    this.$refs.barcodeInput.$el.querySelector('input').focus();
  },
	on: {
	}
};
</script>

<style lang="scss" scoped>
.pin-cell {
  height: 50px;
  width: 50%;
  background: rgb(169, 236, 236);
  font-size: 1.5em;
}
.login-screen-content .list, .login-screen-page .list {
  max-width: 100%;
}
</style>
