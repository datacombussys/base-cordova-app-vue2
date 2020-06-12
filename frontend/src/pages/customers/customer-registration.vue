<template>
	<f7-page name="customer-registration" style="background-image: url('/static/BlueHexagonBG-1920x1080web.png');" no-toolbar no-navbar no-swipeback login-screen>
		
		<!-- Registration Box -->
		<f7-login-screen-title>Registration</f7-login-screen-title>
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
                <f7-row>
                  <f7-col width="50">
                    <f7-list-input
                      label="First Name"
                      type="text"
                      :value="loginData.first_name"
                      @input="loginData.first_name = $event.target.value">
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="50">
                    <f7-list-input
                      label="Last Name"
                      type="text"
                      :value="loginData.last_name"
                      @input="loginData.last_name = $event.target.value">
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row>
                  <f7-col width="50">
                    <f7-list-input
                      label="Email"
                      type="text"
                      :value="loginData.username"
                      @input="loginData.username = $event.target.value">
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
                  </f7-col>
                  <f7-col width="50">
                    <f7-list-input
                      label="Password"
                      type="password"
                      :value="loginData.password"
                      @input="loginData.password = $event.target.value">
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
                  </f7-col>
                </f7-row>
							</f7-list>
							<f7-list class="full-width">
							<f7-row class="display-flex justify-content-center"> 
								<f7-button @click.prevent="submit">Register</f7-button>
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
		<!-- END Registration Screen -->
	</f7-page>
</template>

<script>
//Import and Use Axios
import axios from "axios";

import { mapActions } from "vuex";
import {mapState} from 'vuex';

export default {
	name: "customerRegistration",
	data() {
		return {
			loginData: {
				username: null,
        password: null,
        datacom: null,
        partner: null,
        company: null,
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
      // I need to access the Datacom, Partner, or Company data to register the Customer for that particular business
      // Append the email address with the company ID#			
		},

	},
	computed: {
		...mapState(["Users", "Errors"]),
	},
	on: {
	}
};
</script>

<style lang="scss" scoped></style>
