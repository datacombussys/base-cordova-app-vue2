<template>
  <div>
    <!-- Begin Shipping Details Tab -->
    <f7-card class="mo-margin-top">
      <f7-card-header
        class="no-border hovering"
        valign="bottom"
        style="background: lightgray"
      >
      <f7-row class="full-width">
        <f7-col width="50" class="align-self-flex-end">
          <f7-block-title class="full-width margin-bottom-half">Shipping Details</f7-block-title>
        </f7-col>
        <!-- <f7-col width="50" class="text-align-right" >
          <f7-link @click="toggleEditProfile"> <b-icon icon="pencil" class="edit-icon"></b-icon> </f7-link>
        </f7-col> -->
      </f7-row>
      </f7-card-header>
      <f7-card-content>
        <!-- Begin Shipping Details List-->
        <f7-list>
          <f7-row v-show="0">
            <p>Jesus is Lord</p>
            <p>In the name of Jesus Christ, I command all unGodly to leave.</p>
            <p>This website is protected by Jesus Christ our Lord and savior.</p>
          </f7-row>
          <f7-block-title class="full-width" medium>Manage Addresses</f7-block-title>

          <!-- Check Module Type -->
          <f7-row class="full-width" v-if="!dataForm.id && moduleInfo.name === 'Customers'">
            <div class="error-text text-align-center padding-top">
              You must first select a customer
            </div>
          </f7-row>
          <f7-row class="full-width" v-if="!dataForm.id && moduleInfo.name === 'Employees'">
            <div class="error-text text-align-center padding-top">
              You must first select an employee
            </div>
          </f7-row>
          <f7-row class="full-width" v-if="!dataForm.id && moduleInfo.name === 'Datacom'">
            <div class="error-text text-align-center padding-top">
              You must first select a Datacom company
            </div>
          </f7-row>
          <f7-row class="full-width" v-if="!dataForm.id && moduleInfo.name === 'Partner'">
            <div class="error-text text-align-center padding-top">
              You must first select a partner
            </div>
          </f7-row>
          <f7-row class="full-width" v-if="!dataForm.id && moduleInfo.name === 'Merchant'">
            <div class="error-text text-align-center padding-top">
              You must first select a merchant
            </div>
          </f7-row>
          
      
          <f7-row class="display-flex justify-content-space-between">
            <f7-card v-for="ship in Common.shippingAddressList" :key="ship.id" style="min-width:250px;">
              <f7-card-header class="shipping-card display-flex align-items-center" style="min-height:60px;">
                <f7-icon v-if="ship.is_primary" size="30" icon="mdi mdi-star-outline" color="red"></f7-icon>
                <f7-block-title v-if="ship.is_primary" class="full-width small margin-bottom-half text-color-red">Primary Address</f7-block-title>
              </f7-card-header>
              <f7-card-content>
                <strong><p>Name: {{ ship.name }}</p></strong>
                <strong><p>Address:</p></strong>
                <p>{{ ship.address }} {{ ship.addresss }}, {{ ship.zip }}</p>
                <p>{{ ship.city }} {{ ship.state }}</p>
                <p>Phone: {{ ship.phone }}</p>
                <f7-row class="full-width display-flex justify-content-center">
                  <f7-col width="75">
                    <f7-button class="padding-half" @click="deleteShippingAddress">Delete</f7-button>
                  </f7-col>
                </f7-row>
              </f7-card-content>
            </f7-card>
            <f7-link popup-open=".shipping-popup">
              <f7-card style="cursor:pointer;">
                <f7-card-header class="shipping-card display-flex align-items-center">
                </f7-card-header>
                <f7-card-content>
                  <f7-row class="display-flex justify-content-center align-content-center" style="height:175px; width:175px;">
                    <f7-icon size="30" icon="mdi mdi-plus-thick"></f7-icon>
                    <f7-block-title 
                    
                    class="text-align-center full-width small margin-bottom-half">Add New</f7-block-title>
                  </f7-row>
                </f7-card-content>
              </f7-card>
            </f7-link>
          </f7-row>
        </f7-list>
        <!-- END Shipping Details Display -->
      </f7-card-content>
    </f7-card>
    <!-- END Shipping Tab -->

    <!-- Shipping Addresses Popup -->
    <f7-popup class="shipping-popup" :opened="shippingPopupOpened" @popup:closed="shippingPopupOpened = false">
      <f7-page>
        <f7-navbar title="New Shipping Address">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-card>
            <f7-card-content>
              <f7-list class="padding">
                <f7-row>
                  <f7-col width="50">
                    <p class="field-title">Name of Person Receiving Shipment</p>
                    <f7-list-input 
                      placeholder="Joe Smith"
                      :value="shippingForm.name" 
                      @input="shippingForm.name = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="50">
                    <p class="field-title">Phone of Person Receiving Shipment</p>
                    <f7-list-input 
                      placeholder="### ### ####"
                      :value="shippingForm.phone" 
                      @input="shippingForm.phone = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row>
                  <f7-col width="50">
                    <p class="field-title">Billing Address</p>
                    <f7-list-input 
                      placeholder="1 N. Main St."
                      :value="shippingForm.address" 
                      @input="shippingForm.address = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="50">
                    <p class="field-title">Suite / Unit / Apt</p>
                    <f7-list-input 
                      placeholder="Unit 100"
                      :value="shippingForm.address2" 
                      @input="shippingForm.address2 = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row>
                  <f7-col width="30">
                    <p class="field-title">State</p>
                     <f7-list-input 
                      :value="localeCities.new_shipping_id"
                      @input="getNewShippingCities"
                      type="select" style="background: rgb(216,252,253)">
                      <option v-for="n_ship_state in GET_STATE_LIST" :key="n_ship_state.id" :value="n_ship_state.id">{{ n_ship_state.name }}</option>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="30">
                    <p class="field-title">City</p>
                    <f7-list-input 
                      :value="shippingForm.city"
                      @input="shippingForm.city = $event.target.value"
                      type="select" 
                      style="background: rgb(216,252,253)">
                      <option v-for="n_ship_city in Locale.cities" :key="n_ship_city.id" :value="n_ship_city.name">{{ n_ship_city.name }}</option>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="30">
                    <p class="field-title">Zip</p>
                    <f7-list-input 
                      placeholder="Unit 100"
                      :value="shippingForm.zip" 
                      @input="shippingForm.zip = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row>
                  <f7-col width="50">
                    <p class="field-title">Make Primary:</p>
                    <f7-list-item>
                      <f7-toggle :checked="shippingForm.is_primary" @change="shippingForm.is_primary = $event.target.checked"></f7-toggle>
                    </f7-list-item>
                  </f7-col>
                </f7-row>
                <f7-row class="display-flex justify-content-center">
                  <f7-col width="100">
                    <f7-button class="margin" popup-close @click="addShippingAddress">Add Shipping Address</f7-button>
                    <f7-button @click="testingMethod">test</f7-button>
                  </f7-col>
                </f7-row>
              </f7-list>
            </f7-card-content>
          </f7-card>
        </f7-block>
      </f7-page>
    </f7-popup>
    <!-- END Shipping Addresses Popup -->
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { LocaleMixin } from '../../mixins/businesses/locale-mixins';
import { UniversalMixins } from '../../mixins/universal-mixins';

export default {
  name: "shippingComponent",
  mixins: [
    LocaleMixin,
    UniversalMixins
  ],
  components: {

  },
  props: {
    dataForm: {
      type: Object,
    },
    moduleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shippingPopupOpened: false,
      shippingForm: {
          user: null,
          name: null,
          address: null,
          city: null,
          state: null,
          zip: null,
          phone: null,
          instructions: null,
          is_primary: false,
          is_active: true,
          date_added: null,
        },
    }
  },
  methods: {
    testingMethod(e) {

        console.log("this.shippingForm ", this.shippingForm);
        console.log("this.dataForm", this.dataForm);
    },
    async addShippingAddress() {
      this.shippingForm.state = this.localeCities.new_shipping_state_name;
      let newShippingForm = await this.setUserPlatformPOST(this.shippingForm);
      console.log('newShippingForm',  newShippingForm);
      this.$store.dispatch("addShippingAddress",  newShippingForm);
    },
    deleteShippingAddress() {

    },
  },
  computed: {
    ...mapState(["Common", "Locale"]),
    ...mapGetters(["GET_STATE_LIST"]),
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped lang="less">


</style>