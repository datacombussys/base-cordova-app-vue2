export const LocaleMixin = {
  data() {
    return {
      positionsForm: {
        name: null,
      }, 
      localeCities: {
        primary_country_id: 6252001,
        primary_country_name: "United States",
        primary_state_id: null,
        primary_state_name: null,
        mailing_country_id: 6252001,
        mailing_country_name: "United States",
        mailing_state_id: null,
        mailing_state_name: null,
        shipping_country_id: 6252001,
        shipping_country_name: "United States",
        shipping_state_id: null,
        shipping_state_name: null,
        billing_country_id: 6252001,
        billing_country_name: "United States",
        billing_state_id: null,
        billing_state_name: null,
        creditcard_country_id: 6252001,
        creditcard_country_name: "United States",
        creditcard_state_id: null,
        creditcard_state_name: "",
        ach_country_id: 6252001,
        ach_country_name: "United States",
        ach_state_id: null,
        ach_state_name: "",
        new_shipping_country_id: 6252001,
        new_shipping_country_name: "United States",
        new_shipping_state_id: null,
        new_shipping_state_name: null,
        user_country_id: 6252001,
        user_country_name: "United States",
        user_state_id: null,
        user_state_name: null,

      },


    }
  },
  methods: {
    getPrimaryStates(e, type) {
      if(e.target.value) {
        var country = this.Locale.primaryCountryList.find(elem => elem.id == e.target.value);
        this.localeCities.primary_country_id = e.target.value;
        this.localeCities.primary_country_name = country.name;
        this.$store.dispatch("getStates", {id: e.target.value, type: type});
      }
    },
    getPrimaryCities(e, type) {
      if(e.target.value) {
        console.log('getPrimaryCities e', e);
        console.log('type', type);
        var state = this.Locale.primaryStateList.find(elem => elem.id == e.target.value);
        console.log('state', state);
        this.localeCities.primary_state_id = e.target.value;
        this.localeCities.primary_state_name = state['name'];
        console.log('state.name', state.name);
        console.log('state[name]', state['name']);
        console.log('this.localeCities.primary_state_name', this.localeCities.primary_state_name);
        console.log('this.localeCities', this.localeCities);
        this.$store.dispatch("getCities", {id: e.target.value, type: type});
      }
    },
    getBillingStates(e, type) {
      if(e.target.value) {
        var country = this.Locale.billingCountryList.find(elem => elem.id == e.target.value);
        this.localeCities.billing_country_id = e.target.value;
        this.localeCities.billing_country_name = country.name;
        this.$store.dispatch("getStates", {id: e.target.value, type: type});
      }
    },
    getBillingCities(e, type) {
      if(e.target.value) {
        var state = this.Locale.billingStateList.find(elem => elem.id == e.target.value);
        this.localeCities.billing_state_id = e.target.value;
        this.localeCities.billing_state_name = state.name;
        this.$store.dispatch("getCities", {id: e.target.value, type: type});
      }
    },
    getShippingStates(e, type) {
      if(e.target.value) {
        var country = this.Locale.shippingCountryList.find(elem => elem.id == e.target.value);
        this.localeCities.shipping_country_id = e.target.value;
        this.localeCities.shipping_country_name = country.name;
        this.$store.dispatch("getStates", {id: e.target.value, type: type});
      }
    },
    getShippingCities(e, type) {
      if(e.target.value) {
        var state = this.Locale.shippingStateList.find(elem => elem.id == e.target.value);
        this.localeCities.shipping_state_id = e.target.value;
        this.localeCities.shipping_state_name = state.name;
        this.$store.dispatch("getCities", {id: e.target.value, type: type});
      }
    },
    getCreditCardStates(e) {
      if(e.target.value) {
        var country = this.Locale.region.find(elem => elem.id == e.target.value);
        this.localeCities.creditcard_country_id = e.target.value;
        this.localeCities.creditcard_country_id = country.name;
        this.$store.dispatch("getSharedStates", e.target.value);
      }
    },
    getCreditCardCities(e) {
      if(e.target.value) {
        var state = this.Locale.stateList.find(elem => elem.id == e.target.value);
        this.localeCities.creditcard_state_id = e.target.value;
        this.localeCities.creditcard_state_name = state.name;
        this.$store.dispatch("getSharedCities", e.target.value);
        // this.$store.dispatch("getPostalCodes", e.target.value);
      }
    },
    getACHStates(e) {
      if(e.target.value) {
        var country = this.Locale.countryList.find(elem => elem.id == e.target.value);
        this.localeCities.ach_country_id = e.target.value;
        this.localeCities.ach_country_name = country.name;
      this.$store.dispatch("getSharedStates", e.target.value);
      }
    },
    getACHCities(e) {
      if(e.target.value) {
        var state = this.Locale.stateList.find(elem => elem.id == e.target.value);
        this.localeCities.ach_state_id = e.target.value;
        this.localeCities.ach_state_name = state.name;
        this.$store.dispatch("getSharedCities", e.target.value);
        // this.$store.dispatch("getPostalCodes", e.target.value);
      }
    },
    getNewShippingStates(e) {
      if(e.target.value) {
        var country = this.Locale.countryList.find(elem => elem.id == e.target.value);
        this.localeCities.new_shipping_country_id = e.target.value;
        this.localeCities.new_shipping_country_name = country.name;
        this.$store.dispatch("getSharedStates", e.target.value);
      }
    },
    getNewShippingCities(e) {
      if(e.target.value) {
        var state = this.Locale.stateList.find(elem => elem.id == e.target.value);
        this.localeCities.new_shipping_id = e.target.value;
        this.localeCities.new_shipping_state_name = state.name;
        this.$store.dispatch("getSharedCities", e.target.value);
        // this.$store.dispatch("getPostalCodes", e.target.value);
      }
    },
    getUserStates(e) {
      console.log('getUserStates e', e);
      if(e.target.value) {
        console.log('Yes, e exists');
        var country = this.Locale.countryList.find(elem => elem.id == e.target.value);
        this.localeCities.user_country_id = e.target.value;
        this.localeCities.user_country_name = country.name;
        this.$store.dispatch("getSharedStates", e.target.value);
      }
    },
    getUserCities(e) {
      console.log('getUserCities e', e);
      if(e.target.value) {
        console.log('Yes, e exists');
        var state = this.Locale.stateList.find(elem => elem.id == e.target.value);
        this.localeCities.user_state_id = e.target.value;
        this.localeCities.user_state_state_name = state.name;
        this.$store.dispatch("getSharedCities", e.target.value);
        // this.$store.dispatch("getPostalCodes", e.target.value);
      }
    },

  },
  mounted() {

  },
  created() {

  }
}