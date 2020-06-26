<template>
  <div>
    <!-- Employee Positions Popup -->
    <f7-popup class="positions-popup" :opened="positionPopupOpened" @popup:closed="positionPopupOpened = false">
      <f7-page>
        <f7-navbar title="Employee Positions">
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
                    <p class="field-title">Position Name</p>
                    <f7-list-input 
                      placeholder="Manager"
                      required
                      validate
                      :value="positionForm.name" 
                      @input="positionForm.name = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="50">
                    <p class="field-title">All Positions</p>
                    <div class="full-width display-flex justify-content-space-around" v-for="(position, index) in Companies.positionList" :key="index">
                      <div class="margin-half full-width"> {{position.name}}</div>
                      <div class="delete" @click="deletePosition(position.name)"></div>
                    </div>
                  </f7-col>
                </f7-row>

                <f7-row class="display-flex justify-content-center">
                  <f7-col width="50">
                    <f7-button class="margin" @click="addPosition">Add Position</f7-button>
                  </f7-col>
                </f7-row>
              </f7-list>
            </f7-card-content>
          </f7-card>
        </f7-block>
      </f7-page>
    </f7-popup>
    <!-- END Employee Positions Popup -->
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';

export default {
  name: "positionsComponent",
  mixins: [
    UniversalMixins
  ],
  components: {

  },
  props: {
    moduleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      positionPopupOpened: false,
      positionForm: {
        partner: null,
        datacom: null,
        company: null,
        name: null,
        date_added: null,
      }
    }
  },
  methods: {
    testingMethod(e) {
      console.log("this.shippingForm ");
    },
    async addPosition(e) {
      console.log("addingPosition", e);
      console.log("this.positionForm", this.positionsForm);
      let response = await this.setUserPlatformPOST(this.positionForm);
      console.log('addPosition response', response);

      await this.$store.dispatch('addPosition', response);
      this.resetForm();
      
    },
    resetForm() {
      for(let key in this.positionForm) {
        this.positionForm[key]= null;
      }
    },
    deletePosition(name) {
      console.log("deletingPosition name", name);
      //Find Position form store and send that ID value
      var positonObj = this.Companies.positionList.find(elem => elem.name === name);
      console.log("positonObj", positonObj);
      this.$store.dispatch('deletePosition', positonObj.id);
    },
  },
  computed: {
    ...mapState(["Common", "Locale", "Companies", "Auth"]),
    // ...mapGetters([]),
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped lang="less">

</style>