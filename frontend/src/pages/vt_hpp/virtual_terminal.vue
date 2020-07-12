<template>
    <f7-page name="virtual-terminal">
      <nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
        <f7-row class="full-height">
          <!-- Main Column -->
          <f7-col width="100" medium="100" class="full-height-percent">
            <!-- Page content-->
            <!-- Vue Scrollbar (dragger) -->
          <div v-bar="{
            preventParentScroll: true,
            scrollThrottle: 30,
          }" style="height: 100vh;"> <!-- el1 -->
            <div> <!-- el2 -->  
              <f7-block>
                <b-steps 
                  class="b-step-height"
                  v-model="activeStep" 
                  :animated="isAnimated"
                  :has-navigation="hasNavigation"
                  :icon-prev="prevIcon"
                  :icon-next="nextIcon"
                  size="is-medium">
                  <!-- Enter Transaction Type -->
                  <b-step-item label="Transaction Type" icon="account-key">
                      <!-- Transaction Type Card-->
                      <f7-row class="margin-top-half full-width display-flex justify-content-center">
                        <f7-col width="75">
                          <f7-card class="full-width">
                            <f7-card-content>
                              <f7-block-title class="classy text-align-center">Transaction Type</f7-block-title>
                              <f7-row class="full-width display-flex justify-content-space-around">
                                <f7-col width="75" class="order-buttons1">
                                  <f7-segmented>
                                    <f7-button large outline @click="isSale=true, isVoid=false, isRefund=false, isAuth=false" 
                                    :class="{'button-active': isSale}">Sale</f7-button>
                                    <f7-button large outline @click="isSale=false, isVoid=true, isRefund=false, isAuth=false" 
                                    :class="{'button-active': isVoid}">Void</f7-button>
                                    <f7-button large outline @click="isSale=false, isVoid=false, isRefund=true, isAuth=false" 
                                    :class="{'button-active': isRefund}">Refund</f7-button>
                                    <f7-button large outline @click="isSale=false, isVoid=false, isRefund=false, isAuth=true" 
                                    :class="{'button-active': isAuth}">Auth</f7-button>
                                  </f7-segmented>
                                </f7-col>
                                <div hidden>
                                <f7-row class=" full-width display-flex justify-content-space-around">
                                  <f7-col class="order-buttons3">
                                    <f7-block-title class="margin-top-half">Entry Type</f7-block-title>
                                    <f7-segmented>
                                      <f7-button large outline active>Swiped</f7-button>
                                      <f7-button large outline>Keyed</f7-button>
                                    </f7-segmented>
                                  </f7-col>
                                </f7-row>
                                </div>
                              </f7-row>
                            </f7-card-content>
                          </f7-card>
                        </f7-col>
                        
                      </f7-row>
                      <!-- END Transaction Type Card-->
                    </b-step-item>
                    <!-- END Transaction Type  -->
                    <!-- Enter Amount -->
                    <b-step-item label="Enter Amount" icon="account-key">
                      <!-- Amount Card-->
                      <f7-row class="margin-top-margin-bottom display-flex justify-content-center">
                        <div class="card-container">
                          <f7-card class="full-width">
                            <f7-card-content>
                              <f7-list>
                                <f7-block-title class="classy text-align-center">Amount</f7-block-title>
                                <f7-row class="full-width display-flex justify-content-center">
                                  <f7-col width="30">
                                    <f7-block-title class="margin-top-half small">Subtotal</f7-block-title>
                                    <f7-list-input 
                                      outline
                                      type="number"
                                      placeholder="$"
                                      :value="paymentForm.subtotal"
                                      @input="paymentForm.subtotal = $event.target.value">
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                <f7-row class="display-flex justify-content-center">
                                  <f7-col width="30">
                                    <f7-block-title class="margin-top-half small">Sales Tax</f7-block-title>
                                    <f7-list-input
                                      outline
                                      type="number"
                                      placeholder="%"
                                      :value="paymentForm.salesTax"
                                      @change="paymentForm.salesTax = $event.target.value">
                                    </f7-list-input>
                                  </f7-col>
                                  <f7-col width="30">
                                    <f7-block-title class="margin-top-half small">Tax Rate</f7-block-title>
                                    <f7-list-input 
                                      type="select"
                                      >
                                      <option v-for="tax in Financial.salesTaxList" 
                                        :key="tax.id" 
                                        :value="tax">
                                        {{ tax }}
                                      </option>
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                <f7-row class="display-flex justify-content-center">
                                  <f7-col width="30" class="padding-left">
                                    <strong style="font-size: 1.25rem;">Subtotal</strong>
                                  </f7-col>
                                  <f7-col width="30" class="padding-right">
                                    <strong style="font-size: 1.25rem;">${{ paymentForm.subtotal }}</strong>
                                  </f7-col>
                                </f7-row>
                                <f7-row class="display-flex justify-content-center">
                                  <f7-col width="30" class="padding-left">
                                    <strong style="font-size: 1.25rem;">Sales Tax</strong>
                                  </f7-col>
                                  <f7-col width="30" class="padding-right">
                                    <strong style="font-size: 1.25rem;">${{ paymentForm.salesTax }}</strong>
                                  </f7-col>
                                </f7-row>
                                <f7-row class="display-flex justify-content-center">
                                  <f7-col width="30" class="padding-left">
                                    <strong style="font-size: 1.75rem;">Total</strong>
                                  </f7-col>
                                  <f7-col width="30" class="padding-right">
                                    <strong style="font-size: 1.75rem;">${{ paymentForm.total }}</strong>
                                  </f7-col>
                                </f7-row>
                               
                              </f7-list>
                            </f7-card-content>
                          </f7-card>
                        </div>
                      </f7-row>
                      <!-- END Amount Card-->
                    </b-step-item>
                    <!-- END Amount -->
                    <!-- Enter Order Type -->
                    <b-step-item label="Order Type" icon="account">
                      <!-- Order Type Card-->
                      <f7-row class="margin-top-half full-width">
                        <f7-card class="full-width">
                          <f7-card-content>
                            <f7-block-title class="classy text-align-center">Order Type</f7-block-title>
                            <f7-row class="full-width display-flex justify-content-space-around">
                              <f7-col width="50" class="order-buttons1">
                                <f7-block-title class="margin-top-half">Payment Type</f7-block-title>
                                <f7-segmented>
                                  <f7-button 
                                    @click="isCreditCardTrans=true, isCashTrans=false, isCheckTrans=false, isACHTrans=false" 
                                    large
                                    :class="{'button-active': isCreditCardTrans}"
                                    outline>Credit Card</f7-button>
                                  <f7-button 
                                    @click="isCreditCardTrans=false, isCashTrans=true, isCheckTrans=false, isACHTrans=false" 
                                    large
                                    :class="{'button-active': isCashTrans}"
                                    outline>Cash</f7-button>
                                  <f7-button 
                                    @click="isCreditCardTrans=false, isCashTrans=false, isCheckTrans=true, isACHTrans=false" 
                                    large
                                    :class="{'button-active': isCheckTrans}"
                                    outline>Check</f7-button>
                                  <f7-button 
                                    @click="isCreditCardTrans=false, isCashTrans=false, isCheckTrans=false, isACHTrans=true" 
                                    large
                                    :class="{'button-active': isACHTrans}"
                                    outline>ACH</f7-button>
                                </f7-segmented>
                              </f7-col>
                              <f7-col width="50" class="order-buttons2">
                                <f7-block-title class="margin-top-half">Transaction Type</f7-block-title>
                                <f7-segmented>
                                  <f7-button 
                                    @click="isOneTimeTrans=true, isRecurringTrans=false, isInstallmentTrans=false" 
                                    large
                                    :class="{'button-active': isOneTimeTrans}"
                                    outline>One-Time</f7-button>
                                  <f7-button 
                                    @click="isOneTimeTrans=false, isRecurringTrans=true, isInstallmentTrans=false" 
                                    large 
                                    :class="{'button-active': isRecurringTrans}"
                                    outline>Recurring</f7-button>
                                  <f7-button 
                                    @click="isOneTimeTrans=false, isRecurringTrans=false, isInstallmentTrans=true" 
                                    large 
                                    :class="{'button-active': isInstallmentTrans}"
                                    outline>Installement</f7-button>
                                </f7-segmented>
                              </f7-col>
                            </f7-row>
                          </f7-card-content>
                        </f7-card>
                      </f7-row>
                      <!-- END Order Type Card-->
                    </b-step-item>
                    <!--END Order Type -->
                    <!-- Enter Customer -->
                    <b-step-item label="Customer Information" icon="account-plus">
                      <f7-row class="display-flex justify-content-center">
                        
                        <!--Search for Customer -->
                        <f7-col width="30" class="full-height-percent">
                          <f7-row class="display-flex justify-content-center full-height-percent">
                            <f7-block-title class="classy text-align-center">Select Customer</f7-block-title>
                            <f7-col width="75" class="full-height-percent display-flex flex-direction-column align-items-center">
                              <f7-button outline>Add New Customer</f7-button>
                            </f7-col>
                          </f7-row>
                          
                        </f7-col>
                        <f7-col width="50">
                         <select-customer-component></select-customer-component>
                          
                        </f7-col>
                        <!-- END Search for Customer -->
                      </f7-row>
                    </b-step-item>
                    <!--END Enter Customer -->
                    <!-- Enter Billing Info -->
                    <b-step-item label="Billing Information" icon="account-plus">
                      <f7-row class="full-height-percent full-width display-flex justify-content-center">
                        <!-- Enter Customer Billing Info -->
                        <f7-col width="50">
                          <f7-card>
                            <f7-card-content>
                              <f7-block-title class="classy text-align-center">Billing Information</f7-block-title>
                              <f7-list>
                                <f7-row>
                                  <!-- Row 1 Name -->
                                  <f7-col width="50" medium="50">
                                    <f7-list-input
                                    outline
                                    label="First Name"
                                    floating-label
                                    type="text"
                                    placeholder="First Name"
                                    clear-button
                                  >
                                    <f7-icon f7="person_circle" slot="media"></f7-icon>
                                    </f7-list-input>
                                  </f7-col>
                                  <f7-col width="50" medium="50">
                                    <f7-list-input
                                    outline
                                    label="Last Name"
                                    floating-label
                                    type="text"
                                    placeholder="Last Name"
                                    clear-button
                                  >
                                
                                  </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                
                                <f7-row>
                                <!-- Row 2 -->
                                  <f7-col width="100" medium="100">
                                    <f7-list-input
                                      outline
                                      label="Billing Address"
                                      floating-label
                                      type="text"
                                      placeholder="Billing Address"
                                      clear-button
                                    >
                                      <f7-icon f7="map" slot="media"></f7-icon>
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                <f7-row>
                                <!-- Row 3 City State Zip -->
                                  <f7-col width="50" medium="50">
                                    <f7-list-input
                                      outline
                                      label="City"
                                      floating-label
                                      type="text"
                                      placeholder="City"
                                      clear-button
                                    >
                                    <f7-icon f7="map" slot="media"></f7-icon>
                                    </f7-list-input>
                                  </f7-col>
                                  <f7-col width="20" medium="20">
                                    <f7-list-input
                                      outline
                                      label="State"
                                      floating-label
                                      type="text"
                                      placeholder="State"
                                      clear-button
                                    >
                                    </f7-list-input>
                                  </f7-col>
                                  <f7-col width="30" medium="30">
                                    <f7-list-input
                                      outline
                                      label="Zip Code"
                                      floating-label
                                      type="text"
                                      placeholder="Zip Code"
                                      clear-button
                                      required
                                    >
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                <f7-row>
                                <!-- Row 4 Phone and Email -->
                                  <f7-col width="50" medium="50">
                                    <f7-list-input
                                      outline
                                      label="Phone"
                                      floating-label
                                      type="text"
                                      placeholder="Phone"
                                      clear-button
                                    >
                                      <f7-icon f7="device_phone_portrait" slot="media"></f7-icon>
                                    </f7-list-input>
                                  </f7-col>
                                  <f7-col width="50" medium="50">
                                    <f7-list-input
                                      outline
                                      label="E-mail"
                                      floating-label
                                      type="email"
                                      placeholder="E-mail"
                                      clear-button
                                    >
                                    <f7-icon f7="envelope" slot="media"></f7-icon>
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>
                                <f7-row>
                                <!-- Row 5 Misc -->
                                  <f7-col width="100" medium="100">
                                    <f7-list-input
                                      outline
                                      label="Order Notes"
                                      floating-label
                                      type="textarea"
                                      placeholder="Comments"
                                      clear-button
                                    >
                                    </f7-list-input>
                                  </f7-col>
                                </f7-row>  
                              </f7-list>
                            </f7-card-content>
                          </f7-card>
                          <!-- END Billing Form -->
                        </f7-col>
                      </f7-row>
                          

                    </b-step-item>
                    <!--END Billing Info -->
                    <!-- Enter Payment Details -->
                    <b-step-item label="Payment Details" icon="account-plus">
                      <f7-row class="">
                        <!-- Container Row for different transactions-->
                        <f7-row class="full-height-percent display-flex justify-content-center full-width margin-bottom-half margin-top-half">
                          <!-- Credit Card Sale Card-->
                          <f7-col width="25">
                            <f7-row class=" full-width display-flex justify-content-space-around">
                              <f7-card>
                                <f7-card-content>
                                  <f7-block-title class="classy text-align-center">Entry Type</f7-block-title>
                                  <f7-segmented>
                                    <f7-button 
                                    @click="isKeyedTrans=false, isSwipedTrans=true" 
                                    large
                                    :class="{'button-active': isSwipedTrans}"
                                    outline>Swiped</f7-button>
                                    <f7-button
                                    @click="isKeyedTrans=true, isSwipedTrans=false" 
                                    large
                                    :class="{'button-active': isKeyedTrans}"
                                    outline>Keyed</f7-button>
                                  </f7-segmented>
                                </f7-card-content>
                              </f7-card>
                            </f7-row>
                          </f7-col>
                          <f7-col width="50">
                            <f7-card>
                              <f7-card-content>
                                <f7-block-title class="classy text-align-center">Payment Details</f7-block-title>
                                <f7-row class="full-width display-flex justify-content-center">
                                  <f7-col width="100">
                                    <f7-block-title class="margin-top-half">Credit Card Details</f7-block-title>
                                    <!--Credit Card Details -->
                                    <f7-block>
                                      <f7-list>
                                        <f7-row>
                                          <strong>Select Card on File</strong>
                                          <f7-list-input class="full-width" type="select" >
                                            <option value="Visa">Visa ...0004</option>
                                          </f7-list-input>
                                          <p>-OR-</p>
                                        </f7-row>
                                        <!-- Row 1 Credit Card Number -->
                                        <f7-row class="margin-top">
                                          <strong>Enter New Card</strong>
                                          <f7-col width="100" medium="100">
                                            <f7-list-input
                                            outline
                                            label="Card Number"
                                            floating-label
                                            type="text"
                                            placeholder="Card Number"
                                          >
                                            <f7-icon f7="creditcard" slot="media"></f7-icon>
                                            </f7-list-input>
                                          </f7-col>
                                        </f7-row>
                                        <f7-row>
                                        <!-- Row 2 - Exp Date and CVV -->
                                        <f7-col width="50" medium="50">
                                          <f7-list-input
                                            outline
                                            label="Expiration Date"
                                            floating-label
                                            type="text"
                                            placeholder="MMYY"
                                          >
                                            <f7-icon f7="cerdit_card" slot="media"></f7-icon>
                                          </f7-list-input>
                                        </f7-col>
                                        <f7-col width="50" medium="50">
                                          <f7-list-input
                                            outline
                                            label="CVV / CVV2"
                                            floating-label
                                            type="text"
                                            placeholder="###"
                                          >
                                          </f7-list-input>
                                        </f7-col>
                                      </f7-row>
                                      </f7-list>
                                    </f7-block>
                                    <!-- END Credit Card Details -->
                                  </f7-col>
                                </f7-row>
                              </f7-card-content>
                            </f7-card>
                          </f7-col>
                          <!-- END Credit Card Sale Card-->
                        </f7-row>
                      <!-- END Container Row for different transactions-->
                      </f7-row>
                    </b-step-item>
                    <!--END Payment Details -->
                    <!-- Enter Recurring Options -->
                    <b-step-item v-if="isRecurringTrans" label="Recurring Options" icon="account-plus">
                      <f7-row class="display-flex justify-content-center">
                        <!-- One-Time Sale Card-->
                        <f7-col v-if="oneTimeView" width="50">
                          <f7-card>
                            <f7-card-content>
                              <f7-block-header>One-Time Sale</f7-block-header>
                              <f7-row class="full-width display-flex justify-content-center">
                                <f7-col width="100">
                                  <f7-block-title class="margin-top-half">Credit Card Information</f7-block-title>
                                  <f7-list>
                                    <f7-list-item 
                                      checkbox 
                                      title="Process Now">
                                    </f7-list-item>
                                    <f7-list-item 
                                      checkbox 
                                      title="Process Later"
                                      @change="futureTransDate = $event.target.checked">
                                    </f7-list-item>
                                    <f7-block v-if="futureTransDate">
                                      <f7-list-input
                                        label="Select Date"
                                        type="date"
                                        defaultValue="2014-04-30"
                                        placeholder="Please choose...">
                                        <f7-icon size="70" icon="mdi mdi-calendar" slot="media"></f7-icon>
                                      </f7-list-input>
                                    </f7-block>
                                  </f7-list>
                                </f7-col>
                              </f7-row>
                            </f7-card-content>
                          </f7-card>
                        </f7-col>
                        <!-- END One-Time Sale Card-->

                        <!-- One-Recurring Sale Card-->
                        <f7-col v-if="recurringView" width="50">
                          <f7-card>
                            <f7-card-content>
                              <f7-block-header>Recurring Sale</f7-block-header>
                              <f7-row class="full-width display-flex justify-content-center">
                                <f7-col width="100">
                                  <f7-list>
                                  <f7-block-title class="margin-top-half">Contract Details</f7-block-title>
                                  <strong>Select Contract</strong>
                                  <f7-list-input 
                                    type="select">
                                    <option value="Contract A">Contract A</option>
                                    <option value="Contract A">Contract B</option>
                                    <option value="Contract A">Contract C</option>
                                  </f7-list-input>
                                    <f7-block class="margin-top">
                                    <strong>How would you like to process the initial transaction?</strong>
                                    <f7-list-item 
                                      checkbox 
                                      title="Process Now">
                                    </f7-list-item>
                                    <f7-list-item 
                                      checkbox 
                                      title="On Recurring Date"
                                      @change="futureTransDate = $event.target.checked">
                                    </f7-list-item>
                                    </f7-block>
                                  </f7-list>
                                </f7-col>
                              </f7-row>
                            </f7-card-content>
                          </f7-card>
                          <!-- Submit-->
                          <f7-row>
                            <f7-card class="full-width">
                              <f7-card-content>
                                <f7-row>
                                  <f7-row class="full-width">
                                  <!-- Row 3 Submit Button -->
                                    <f7-col width="50" medium="50">
                                      <f7-button fill color="red">Reset</f7-button>
                                    </f7-col>
                                    <f7-col width="50" medium="50">
                                    <f7-button fill color="blue">Authorize</f7-button>
                                    </f7-col>
                                  </f7-row>
                                </f7-row>
                              </f7-card-content>
                            </f7-card>
                          </f7-row>
                          <!-- END Submit-->
                        </f7-col>
                        <!-- END Recurring Sale Card-->
                      </f7-row>
                      
                    </b-step-item>
                    <!--END Recurring Options -->

                    <!-- navigation Links -->
                    <template
                      v-if="customNavigation"
                      slot="navigation"
                      slot-scope="{previous, next}">
                      <f7-row class="display-flex justify-content-space-around">
                        <f7-col width="25" class="imageNavButtons">
                          <b-button
                            v-if="!previous.disabled"
                            class="display-flex justify-content-center"
                            outlined
                            type="is-danger"
                            icon-pack="mdi"
                            icon-left="arrow-left-box"
                            size="is-large"
                            :disabled="previous.disabled"
                            @click.prevent="previous.action">
                            <span>Previous</span>
                        </b-button>
                    
                        </f7-col>
                        <f7-col width="25" class="imageNavButtons">
                          <b-button
                            v-if="!next.disabled"
                            class="display-flex justify-content-center"
                            outlined
                            type="is-success"
                            icon-pack="mdi"
                            size="is-large"
                            icon-left="arrow-right-box"
                            :disabled="next.disabled"
                            @click.prevent="next.action">
                          <span>Next</span> 
                        </b-button>
                        <f7-button 
                          class="display-flex justify-content-center"
                          v-if="next.disabled"
                          large fill 
                          sheet-close 
                          @click.prevent="sendFile">Submit</f7-button>
                        </f7-col>
                      </f7-row>
                      <f7-row>
                        <f7-block></f7-block>
                      </f7-row>

                    </template>
                    <!-- END navigation Links -->
                  </b-steps>
                  <f7-row class="full-width">
                    <f7-button @click="testMethod">Test</f7-button>
                  </f7-row>
              </f7-block>         
            </div>
          </div>
          <!-- END Scrollbar -->
          </f7-col>
          <!-- END Main Col -->
          <!-- Disclosures and Notices-->
          <f7-row class="disclosure-row">
            <f7-card class="full-width">
              <f7-card-content>
                <f7-row class="display-flex justify-content-center margin-top">
                  <f7-col width="100" class="text-align-center">
                    <p>Datacom Merchant Services is a registered ISO/MSP with Elavon / US Bank</p>
                  </f7-col>
                </f7-row>
              </f7-card-content>
            </f7-card>
          </f7-row>
          <!-- END Disclosures and Notices-->
            
          
        </f7-row>
        
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import selectCustomerComponent from '@/components/universal/select-customer-component.vue';

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

  export default {
    name: "virtualTerminal",
    mixins: [
      UniversalMixins
    ],
    components: {
      "nav-bar-component": navBarComponent,
      "select-customer-component": selectCustomerComponent
    },
    data() {
      return {
        //Component Data
        pageSettings: {
				leftNavDrawer: ".virtual-terminal",
				pageTitle: "Virtual Terminal"
        },
        moduleInfo: {
          name: "virtual-terminal",
          type: "payment",
          level: 5
        },
        //Main Settings and Variables
        isSale: false,
        isVoid: null, 
        isRefund: null,
        isAuth: null,
        isOneTimeTrans: true,
        isRecurringTrans: false, 
        isInstallmentTrans: false,
        isCreditCardTrans: true,
        isCashTrans: false,
        isCheckTrans:false, 
        isACHTrans: false,
        isKeyedTrans: false,
        isSwipedTrans: false,
        paymentForm: {
          datacom: null,
          partner: null,
          company: null,
          transType: null,
          subtotal: null,
          total: null,
          salesTax: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
          subtotal: null,
        },
        //Buefy Tabs
        activeStep: 0,
        isAnimated: true,
        hasNavigation: true,
        customNavigation: true,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        isStepsClickable: false,
        isProfileSuccess: false,
        //Enable / Disable Views
        recurringView: true,
        oneTimeView: false,
        futureTransDate: false,
        showPanel: false,
      }
    },
    methods: {
      testMethod() {
        console.log("It worked");
        console.log("this.Users.employeeList",this.Users.employeeList);
      },
      onIndexSelect(itemContent) {
        console.log(itemContent);
      },
    },
    computed: {
      ...mapState(["Customers", "Inventory", "Financial", "Users"]),
    },
    mounted() {
      var processTransDate = this.$f7.calendar.create({
        inputEl: '#process-trans-date',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' },
      });
    },
    on: {
      pageInit() {
        
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.card-container {
  width: 75%;
}
.order-buttons1 {
  width: 40%;
  padding: 5px;

}
.order-buttons2 {
  padding: 5px;
  width: 40%;

}
.order-buttons3 {
  padding: 5px;
  width: 20%;

}

.account-div {
  width: 40%px;
  height: 50px;
  background: rgb(221, 220, 220);
  border-left: 1px solid black;
  border-right: 1px solid black;
  color: black;
}
.trans-btn-left {
  border-radius: 5px 0px 0px 5px;
}
.trans-btn-right {
  border-radius: 0px 5px 5px 0px;
  border-left: 1px solid black;
}
.search-container {
  display: flex;
  margin-top: 15px;
  margin-left: 50px;
}
.disclosure-row {
  z-index: 10000;
  position:fixed;
  width: 100%;
  bottom: 0px;
}
.b-step-height{
  height: 63vh;
}

</style>

