<template>
  <div>
    <f7-card v-if="cardSettings.type == 'business'" class="margin-top">
      <f7-card-header 
        class="no-border"
        valign="bottom"
        style="background-color: lightgrey;">
        <f7-block-title class="full-width no-margin-bottom">{{cardSettings.title}}</f7-block-title>
      </f7-card-header>
        <f7-card-content class="padding-half text-align-center">
          <f7-row>
            <div class="error-text" v-if="!profileForm.id">
              Please load a location
            </div>
            <f7-col v-else>
              <f7-block-title medium class="margin-top-half">{{ profileForm.warehouse_name }}</f7-block-title>
              <p class="text-align-center">{{ profileForm.primary_mailing_address }}</p>
              <p class="text-align-center">{{ profileForm.primary_mailing_city }}, {{ profileForm.primary_mailing_state }}. {{ profileForm.primary_mailing_zip }}</p>
              <p class="text-align-center">{{ profileForm.primary_phone }}</p>
            </f7-col>
          </f7-row>
          <f7-row class="full-width display-flex justify-content-stretch">
            <f7-col width="100">
              <f7-list>
                <f7-list-item title="Date Added" :after="profileForm.date_added | moment('MMM, Do, YYYY')"></f7-list-item>
                <f7-list-item title="Business Type" after="Warehouse"></f7-list-item>
                <f7-list-item title="Status">
                    <b-tag slot="content" 
                    size="is-medium" 
                    class="margin-right"
                    :type="`${profileForm.is_active && profileForm.id? 'is-success' : 'is-danger'}`">
                    {{ profileForm.is_active && profileForm.id? "Active" : "Inactive" }}
                    </b-tag>
                </f7-list-item>
              </f7-list>
            </f7-col>
          </f7-row>
        </f7-card-content>
    </f7-card>
    <f7-card v-if="cardSettings.type == 'employee'" class="margin-top">
      <f7-card-header 
        class="no-border"
        valign="bottom"
        style="background-color: lightgrey;">
        <f7-block-title class="full-width no-margin-bottom">{{cardSettings.title}}</f7-block-title>
      </f7-card-header>
        <f7-card-content class="padding-half text-align-center">
          <f7-row>
            <div class="error-text" v-if="!profileForm.id">
              Please load an employee
            </div>
            <f7-col v-else>
              <f7-block-title medium class="margin-top-half">{{ profileForm.user.full_name }}</f7-block-title>
              <p class="text-align-center">{{ profileForm.user.street_address }}</p>
              <p class="text-align-center">{{ profileForm.user.city }}, {{ profileForm.user.state }}. {{ profileForm.user.zip }}</p>
              <p class="text-align-center">{{ profileForm.user.mobile_phone }}</p>
            </f7-col>
          </f7-row>
          <f7-row class="full-width display-flex justify-content-stretch">
            <f7-col width="100">
              <f7-list>
                <f7-list-item title="Date Added" :after="profileForm.date_added | moment('MMM, Do, YYYY')"></f7-list-item>
                <f7-list-item title="Position Title" after="Sales Manager"></f7-list-item>
                <f7-list-item title="Status">
                    <b-tag slot="content" 
                    size="is-medium" 
                    class="margin-right"
                    :type="`${profileForm.is_active && profileForm.id? 'is-success' : 'is-danger'}`">
                    {{ profileForm.is_active && profileForm.id? "Active" : "Inactive" }}
                    </b-tag>
                </f7-list-item>
              </f7-list>
            </f7-col>
          </f7-row>
        </f7-card-content>
    </f7-card>
    <f7-card v-if="cardSettings.type == 'inventory'" class="margin-top">
      <f7-card-header 
        class="no-border"
        valign="bottom"
        style="background-color: lightgrey;">
        <f7-block-title class="full-width no-margin-bottom">{{cardSettings.title}}</f7-block-title>
      </f7-card-header>
        <f7-card-content class="padding-half text-align-center">
          <f7-row>
            <div class="error-text" v-if="!profileForm.id">
              Please load an inventory item
            </div>
            <f7-col v-else>
              <f7-block-title medium class="margin-top-half">{{ profileForm.name }}</f7-block-title>
              <p class="text-align-center">Manufacturer: {{ profileForm.manufacturer }}</p>
              <p class="text-align-center">Model: {{ profileForm.model }}</p>
              <p class="text-align-center">Model Number: {{ profileForm.model_number }}</p>
            </f7-col>
          </f7-row>
          <f7-row class="full-width display-flex justify-content-stretch">
            <f7-col width="100">
              <f7-list>
                <f7-list-item title="Date Added" :after="profileForm.date_added | moment('MMM, Do, YYYY')"></f7-list-item>
                <f7-list-item title="Business Type" after="Warehouse"></f7-list-item>
                <f7-list-item title="Status">
                    <b-tag slot="content" 
                    size="is-medium" 
                    class="margin-right"
                    :type="`${profileForm.is_active && profileForm.id? 'is-success' : 'is-danger'}`">
                    {{ profileForm.is_active && profileForm.id? "Active" : "Inactive" }}
                    </b-tag>
                </f7-list-item>
              </f7-list>
            </f7-col>
          </f7-row>
        </f7-card-content>
    </f7-card>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { LocaleMixin } from '../../mixins/businesses/locale-mixins';
import { UniversalMixins } from '../../mixins/universal-mixins';

export default {
  name: "profileCardComponent",
  components: {

  },
  mixins: [
    LocaleMixin,
    UniversalMixins
  ],
  props: {
    cardSettings: {
      type: Object,
      required: true
    },
    profileForm: {
      type: Object,
      required: true
    }

  },
  data() {
    return {

    }
  },
  methods: {
    testingMethod(e) {

        console.log("this.shippingForm ", this.shippingForm);
        console.log("this.propForm", this.propForm);
    },

  },
  computed: {
    ...mapState(["Common", "Locale"]),
    ...mapGetters([]),
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped style="less">


</style>