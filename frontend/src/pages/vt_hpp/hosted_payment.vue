<template>
    <f7-page name="hosted-payment-page">
      <f7-row>
        <f7-progressbar :progress="0" id="demo-inline-progressbar"></f7-progressbar>
      </f7-row>
      <f7-row>
        <!-- Left Column -->
        <f7-col width="50" medium="50">
           <!-- Payment Details Card-->
            <f7-card outline>
              <f7-card-header>Transaction Details</f7-card-header>
              <f7-card-content>
              <f7-block-title>Billing Information</f7-block-title>
                 <f7-list no-hairlines-md>
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
                  <f7-col width="33" medium="33">
                    <f7-list-input
                      outline
                      label="City"
                      floating-label
                      type="text"
                      placeholder="City"
                      clear-button
                    >
                     
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="33" medium="33">
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
                  <f7-col width="33" medium="33">
                    <f7-list-input
                      outline
                      label="Zip Code"
                      floating-label
                      type="text"
                      placeholder="Zip Code"
                      clear-button
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
                      label="Comments"
                      floating-label
                      type="textarea"
                      placeholder="Comments"
                      clear-button
                    >
                    <f7-icon f7="envelope" slot="media"></f7-icon>
                    </f7-list-input>
                  </f7-col>
                 </f7-row>                
                 <f7-row>
                 <!-- Accordion Row 1 Shipping  -->
                  <f7-col width="100" medium="100">
                  <br /><hr />
                  <f7-list-item checkbox 
                    title="Shipping information is different" 
                    name="shipping-address" 
                    checked>
                    </f7-list-item>
                  <f7-list accordion-list>
                    <f7-list-item color="orange" accordion-item title="Edit Shipping Information">
                      <f7-accordion-content>
                        <f7-row>
                          <f7-list-input
                            outline
                            label="Shipping Address"
                            floating-label
                            type="text"
                            placeholder="Shipping Address"
                            clear-button
                          >
                            <f7-icon f7="map" slot="media"></f7-icon>
                          </f7-list-input>
                        </f7-row>

                        <f7-row>
                          <!-- Accordion Row 2 City State Zip -->
                            <f7-col width="33" medium="33">
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
                            <f7-col width="33" medium="33">
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
                            <f7-col width="33" medium="33">
                              <f7-list-input
                                outline
                                label="Zip Code"
                                floating-label
                                type="text"
                                placeholder="Zip Code"
                                clear-button
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

                      </f7-accordion-content>
                      <!-- END Accordion Content-->
                      <hr />
                    <f7-row>
                    <!--Credit Card Details -->
                      <f7-block-title>Credit Card Details</f7-block-title>
                      <f7-block>
                      
                        <f7-row>
                          <!-- Row 1 Credit Card Number -->
                          <f7-col width="100" medium="100">
                            <f7-list-input
                            outline
                            label="Card Number"
                            floating-label
                            type="text"
                            placeholder="Card Number"
                            clear-button
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
                              clear-button
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
                              clear-button
                            >
                            </f7-list-input>
                          </f7-col>
                        </f7-row>
                        <br />
                        <f7-row>
                        <!-- Row 3 Submit Button -->
                          <f7-col width="50" medium="50">
                            <f7-button fill color="deeporange">Cancel</f7-button>
                          </f7-col>
                          <f7-col width="50" medium="50">
                           <f7-button fill color="blue">Authorize</f7-button>
                          </f7-col>
           
                        </f7-row>
                      </f7-block>
                        
                    </f7-row>
                    </f7-list-item>
                  </f7-list>
                 </f7-col>
                </f7-row>
                </f7-list>
                
              </f7-card-content>
              <f7-card-footer>
                <p>this site is protected and encrypted</p>
                
              </f7-card-footer>
            </f7-card>
          </f7-col>
          <!-- Right Column -->
          <f7-col width="50" medium="50">
             <!-- Payment Details Card-->
            <f7-card outline>
              <f7-card-header>Transaction Summary</f7-card-header>
              <f7-card-content>
              <f7-block-title>Items Sold</f7-block-title>
                <f7-list Checkout-list>
             
                    <f7-list-item class="full-width" large-inset>
                      <f7-row class="full-width">
                        <f7-col width="15" class="margin">
                          <p>Qty</p>
                        </f7-col>
                        <f7-col width="30" class="margin">
                          <p>Item Name</p>
                        </f7-col>
                        <f7-col width="15" class="margin">
                          <p>Each</p>
                        </f7-col>
                        <f7-col width="15" class="margin">
                          <p>Total</p>
                        </f7-col>
                        <f7-col width="5" class="margin">
                          <f7-icon f7="trash_fill"></f7-icon>
                        </f7-col>
                      </f7-row>

                    </f7-list-item>
                    <f7-list-item title="Foobars" after="$145.00">
                      <f7-icon slot="media" f7="trash_fill"></f7-icon>
                    </f7-list-item>
                    <f7-list-item title="Bars of Foo" after="$245.00">
                      <f7-icon slot="media" f7="trash_fill"></f7-icon>
                    </f7-list-item>
                    <f7-list-item title="Total" after="$435.00">
                      <f7-icon slot="media" f7="trash_fill"></f7-icon>
                    </f7-list-item>

           
                
                </f7-list>
               

      
                <br /><hr /><br />
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quia accusantium commodi ipsa! Modi, excepturi repudiandae. Nostrum, ullam dolorem veritatis, quidem repudiandae unde aperiam, incidunt exercitationem magni molestiae fugiat error.
                 </p>
                
            
              </f7-card-content>
              <f7-card-footer>
                <p>Disclaimer</p>
                <p>Terms and Conditions</p>
              </f7-card-footer>
            </f7-card>
          </f7-col>
         
        
      </f7-row>
      
    </f7-page>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>

</style>

