<template>
    <f7-page name="clock-screen">
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".time-attendance">
          <f7-icon color="white" material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Clock-In Clock-Out</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
          <!-- Page content-->
          <f7-row class="full-width">
            <f7-col width="100">
              
            </f7-col>
            <!-- Left Column-->
            <f7-col width="70" class="padding full-height display-flex flex-direction-column justify-content-space-evenly">
              <f7-card>
                <f7-card-content>
                  <f7-row>
                    <f7-col width="100">
                      <f7-block-header>UserID + Password</f7-block-header>
                      <f7-list form>
                        <!-- <f7-list-input
                          label="email"
                          type="text"
                          placeholder="Email Address"
                          :value="loginForm.username"
                          @input="loginForm.username = $event.target.value"
                        >
                        </f7-list-input> -->
                        <f7-list-item>
                          <input type="email" 
                            class="login-input"
                            placeholder="Email Address" 
                            @focus="EMAILshowKeyboard" 
                            data-layout="normal" />
                        </f7-list-item>
                        <vue-touch-keyboard :options="EMAILoptions" v-if="EMAILvisible" :layout="EMAILlayout" :cancel="EMAILhide" :accept="EMAILaccept" :input="EMAILinput" />
                        <div v-if="Errors.loginErrorData.length != 0">
                          <div class="full-width" v-for="errorArray in Errors.loginErrorData" :key="errorArray.id">
                            <div class="display-flex justify-content-center" :class="`message ${Errors.loginErrorHandle ? 'is-danger': 'is-success'}`">
                              <div v-show="errorArray[0] === 'username'" class="message-body">
                                {{ errorArray[1][0] }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <f7-list-input
                          label="password"
                          type="password"
                          placeholder="Your password"
                          :value="loginForm.password"
                          @input="loginForm.password = $event.target.value"
                        >
                        </f7-list-input> -->
                        <f7-list-item>
                          <input type="password" 
                            class="login-input"
                            placeholder="Password" 
                            @focus="PASSWORDshowKeyboard" 
                            data-layout="normal" />
                        </f7-list-item>
                        <vue-touch-keyboard :options="EMAILoptions" v-if="PASSWORDvisible" :layout="PASSWORDlayout" :cancel="PASSWORDhide" :accept="PASSWORDaccept" :input="PASSWORDinput" />
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
                    <f7-col width="100">
                      <f7-block-header>Barcode + PIN</f7-block-header>
                      <f7-list form>
                        <f7-row>
                          <f7-col width="100">
                            <!-- <f7-list-input
                              ref="barcodeInput"
                              id="barcodeInputID"
                              autofocus
                              maxlength="7"
                              :value="loginBarcode.barcode_number"
                              @input="changeFocus('barcodeInput', 'pinInput'); loginBarcode.barcode_number = $event.target.value"
                              label="Barcode Number"
                              type="number"
                              placeholder="10000001"
                              @focus="BARCODEshowNumeric" 
                              data-layout="numeric"
                            >
                            </f7-list-input> -->
                            <f7-list-item>
                              <input 
                                class="datacom-input"
                                ref="barcodeInput"
                                id="barcodeInputID"
                                type="numeric" 
                                placeholder="3100014" 
                                maxlength="7"
                                :value="loginBarcode.barcode_number"
                                @input="changeFocus('barcodeInput', 'pinInput'); loginBarcode.barcode_number = $event.target.value"
                                @focus="BARCODEshowNumeric" 
                                data-layout="numeric" />
                            </f7-list-item>
                            <vue-touch-keyboard :options="BARCODEoptions" v-show="BARCODEvisible" :layout="BARCODElayout" :cancel="BARCODEhide" :accept="BARCODEaccept" :input="BARCODEinput" />
                          </f7-col>
                        </f7-row>
                        
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
                            class="datacom-input" 
                            type="numeric" 
                            placeholder="PIN" 
                            maxlength="4"
                            :value="loginBarcode.pin"
                            @input="loginBarcode.pin = $event.target.value"
                            @focus="PINshowNumeric" 
                            data-layout="numeric" />
                        </f7-list-item>
                        <vue-touch-keyboard :options="PINoptions" v-show="PINvisible" :layout="PINlayout" :cancel="PINhide" :accept="PINaccept" :input="PINinput" />
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
                          <f7-button fill @click.prevent="submit">Sign In</f7-button>
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
            <!-- END Left Column-->

            <!-- Right Column-->
            <f7-col width="30" class="no-padding full-height display-flex flex-direction-column justify-content-space-evenly">
              <f7-row class="full-width display-flex justify-content-center margin-top">
                 <div class="clock-in-button">
                   <p>Clock In</p> 
                 </div>
              </f7-row>
              <f7-row class="full-width display-flex justify-content-center margin-top">
                  <div class="clock-out-button">
                    <p>Clock Out</p> 
                  </div>
              </f7-row>
            </f7-col>
            <!-- END Right Column-->

          </f7-row>
          <!-- END Page content-->
        </f7-col>
      </f7-row>

    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "clockScreen",
    data() {
      return {
        //Main Settings
        loginForm: {
          username: null,
          password: null,
        },
        loginBarcode: {
          barcode_number: null,
          pin: null,
        },
        //Vue Touch Keyboard
        PINvisible: false,
        PINlayout: "numeric",
        PINinput: null,
        PINoptions: {
          useKbEvents: false,
          preventClickEvent: false
        },
        BARCODEvisible: false,
        BARCODElayout: "numeric",
        BARCODEinput: null,
        BARCODEoptions: {
          useKbEvents: false,
          preventClickEvent: false
        },
        EMAILvisible: false,
        EMAILlayout: "numeric",
        EMAILinput: null,
        EMAILoptions: {
          useKbEvents: false,
          preventClickEvent: false
        },
        PASSWORDvisible: false,
        PASSWORDlayout: "numeric",
        PASSWORDinput: null,
        PASSWORDoptions: {
          useKbEvents: false,
          preventClickEvent: false
        },
      }
    },
    methods: {
      testButton() {
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
        console.log('this.$refs', this.$refs);
        var length = this.$refs[fromBox].value.length;
        console.log('length', length);
        var maxLength = this.$refs[fromBox].maxLength;
        console.log('maxLength', maxLength);

        var nextField = document.getElementById(toBox);
        console.log('nextField', nextField);

        if(length == maxLength) {
          nextField.focus();
        }
      },
      //Vue-Keyboard-Methods
      PINaccept(text) {
        // alert("Input text: " + text);
        // alert("this.input: " + this.input);
        console.log("this.input: " + this.input);
        this.PINhide();
      },
      PINshowNumeric(e) {
        console.log('e', e);
        this.PINinput = e.target;
        this.PINlayout = e.target.dataset.layout;

        if (!this.PINvisible) {
          this.PINvisible = true;
          console.log('this.PINvisible', this.PINvisible);
        }
          
        this.BARCODEhide();
      },
      PINhide() {
        this.PINvisible = false;
      },
      BARCODEaccept(text) {
        console.log("BARCODEaccept");
        // alert("Input text: " + text);
        // alert("this.input: " + this.input);
        console.log("this.input: " + this.input);
        this.BARCODEhide();
      },
      BARCODEshowNumeric(e) {
        console.log('e', e);
        this.BARCODEinput = e.target;
        this.BARCODElayout = e.target.dataset.layout;

        if (!this.BARCODEvisible) {
          this.BARCODEvisible = true;
          console.log('this.BARCODEvisible', this.BARCODEvisible);
        }
          
        this.PINhide();
        this.PASSWORDhide();
        this.EMAILhide();
      },
      BARCODEhide() {
        console.log("BARCODEhide");
        this.BARCODEvisible = false;
      },
      EMAILaccept(text) {
        console.log("EMAILaccept");
        console.log("this.input: " + this.input);
        this.EMAILhide();
      },
      EMAILshowKeyboard(e) {
        console.log('e', e);
        this.EMAILinput = e.target;
        this.EMAILlayout = e.target.dataset.layout;

        if (!this.EMAILvisible) {
          this.EMAILvisible = true;
          console.log('this.EMAILvisible', this.EMAILvisible);
        }
          
        this.PINhide();
        this.BARCODEhide();
        this.PASSWORDhide();
      },
      EMAILhide() {
        console.log("EMAILhide");
        this.EMAILvisible = false;
      },
      EMAILaccept(text) {
        console.log("PASSWORDaccept");
        console.log("this.input: " + this.input);
        this.PASSWORDhide();
      },
      PASSWORDshowKeyboard(e) {
        console.log('e', e);
        this.PASSWORDinput = e.target;
        this.PASSWORDlayout = e.target.dataset.layout;

        if (!this.PASSWORDvisible) {
          this.PASSWORDvisible = true;
          console.log('this.PASSWORDvisible', this.PASSWORDvisible);
        }
          
        this.PINhide();
        this.BARCODEhide();
        this.EMAILhide();
      },
      PASSWORDhide() {
        console.log("PASSWORDhide");
        this.PASSWORDvisible = false;
      },
  
    },
    computed: {
      ...mapState(["Users", "Errors", "Inventory"]),
     
    },
    watch: {
 
    },
    mounted() {
 
     
    },
    created() {

    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.clock-in-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 300px;
  height: 300px;
  background: rgb(4, 107, 107);
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  &:active {
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  }
  p {
    font-size: 5em;
    font-weight: 900;
    text-align: center;
    color: white;
  }

}
.clock-out-button {
  width: 300px;
  height: 300px;
  padding: 10px;
  background: rgb(199, 96, 12);
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  &:active {
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  }
  p {
    font-size: 5em;
    font-weight: 900;
    text-align: center;
    color: white;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.login-input {
  height: 50px;
  background: rgb(216,252,253);
  font-size: 1.5em;
}
</style>

