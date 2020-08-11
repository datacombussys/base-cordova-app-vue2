console.log("Loaded Universal Mixin");
//This is not a Vuex Template but a <script> template

export const UniversalMixins = {
  data() {
    return {

    }
  },
  methods: {
    setUserPlatformPOST(inForm) {
      var newForm = {};
      if (inForm != undefined) {
        newForm = inForm;
      }
      console.log('newForm', newForm);
      return new Promise(async (resolve, reject) => {
        // console.log('newForm', newForm);
        const state = this.$store._modules.root.state;
        // console.log('newForm', newForm);
        var plat = state.Auth.platformInfo;
        if (plat.platform === "datacom") {
          newForm['datacom'] = plat.id;
          return resolve(newForm);
        } else if (plat.platform === "partner") {
          newForm['partner'] = plat.id;
          return resolve(newForm);
        } else if (plat.platform === "company") {
          newForm['company'] = plat.id;
          return resolve(newForm);
        } else {
          console.log('No Logged In Company');
          var response = {};
          response.type = "Create Employee";
          response.status = 401;
          this.$store.dispatch('updateNotification', response);

          return reject("You must select a Company");
        }
      });
    },
    setUserPlatformGET(moduleInfo) {
      //moduleInfo is the module that is sending the request and is compared to the User organization to restrict access
      console.log('setUserPlatformGET moduleInfo', moduleInfo);
      var newForm = {};
      if (moduleInfo != undefined) {
        newForm = moduleInfo;
      }
      console.log('newForm', newForm);
      return new Promise(async (resolve, reject) => {
        const state = this.$store._modules.root.state;
        var platForm = state.Auth.platformInfo;
        console.log('platForm',platForm);

        //get Module info
        if (newForm.name === "datacom" && platForm.platform === "datacom") {
          console.log("setUserPlatformGET datacom");
          return resolve(platForm);

        } else if (newForm.name === "partner" && platForm.platform === "partner") {
          console.log("setUserPlatformGET partner");
          return resolve(platForm);

        } else if (newForm.name === "merchant" && platForm.platform === "merchant") {
          console.log("setUserPlatformGET merchant");
          return resolve(platForm);

        } else if (newForm.name === "vendor" && platForm.platform === "vendor") {
          console.log("setUserPlatformGET vendor");
          return resolve(platForm);

        }
      });
    },
    getObjectQueryFilter(form) {
      console.log('getObjectQueryFilter form', form);
      return new Promise(async (resolve, reject) => {
        let obj = {
          filterURL: "",
          id: 0
        };
        if (form.is_datacom) {
          console.log("getObjectQueryFilter datacom");
          obj.filterURL = "?datacom__id=";
          obj.id = form.id
          return resolve(obj);
        } else if (form.is_partner) {
          console.log("getObjectQueryFilter partner");
          obj.filterURL = "?partner__id=";
          obj.id = form.id
          return resolve(obj);
        } else if (form.is_merchant) {
          console.log("getObjectQueryFilter company");
          obj.filterURL = "?company__id=";
          obj.id = form.id
          return resolve(obj);
        } else {
          return reject({error: "No Matching companies"})
        }
      });

    }
    // setUserPlatformPUT(form) {
    //   console.log('setUserPlatformGET form', form);
    //   var newForm = {};
    //   if (form != undefined) {
    //     newForm = form;
    //   }
    //   console.log('newForm', newForm);
    //   return new Promise(async (resolve, reject) => {
    //     const state = this.$store._modules.root.state;
    //     var platForm = state.Auth.platformInfo;
    //     console.log('platForm',platForm);

    //     return resolve({...platForm, ...newForm});
    //   });
    // }

  },
  mounted() {

  },
  created() {

  }
}