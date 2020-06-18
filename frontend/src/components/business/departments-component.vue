<template>
  <div>
    <!-- Departments Popup -->
    <f7-popup class="departments-popup" :opened="deptPopupOpened" @popup:closed="deptPopupOpened = false">
      <f7-page>
        <f7-navbar title="Company Departments">
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
                    <p class="field-title">Department Name</p>
                    <f7-list-input 
                      placeholder="Sales"
                      required
                      validate
                      :value="departmentForm.name" 
                      @input="departmentForm.name = $event.target.value" 
                      type="text">
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="50">
                    <p class="field-title">All Departments</p>
                    <div class="full-width display-flex justify-content-space-around" v-for="(dept, index) in Companies.departmentList" :key="index">
                      <div class="margin-half full-width"> {{dept.name}}</div>
                      <div class="delete" @click="deleteDepartment(dept.name)"></div>
                    </div>
                  </f7-col>
                </f7-row>

                <f7-row class="display-flex justify-content-center">
                  <f7-col width="50">
                    <f7-button class="margin" @click="addDepartment">Add Department</f7-button>
                    <f7-button class="margin" @click="testMethod">Test</f7-button>
                  </f7-col>
                </f7-row>
              </f7-list>
            </f7-card-content>
          </f7-card>
        </f7-block>
      </f7-page>
    </f7-popup>
    <!-- END Departments Popup -->
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
var moment = require('moment');

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';

export default {
  name: "departmentsComponent",
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
      deptPopupOpened: false,
      //DepartmetnForm
      departmentForm: {
        datacom: null,
        partner: null,
        company: null,
        name: null,
        date_added: null,
        date_input: null,
        datetime_input: null,
      }
    }
  },
  methods: {
    testMethod(e) {
        console.log("this.Companies.departmentList", this.Companies.departmentList);
        console.log("this.departmentForm", this.departmentForm);

        var x = moment().format();
        console.log('x', x);
        var Y = moment(x).format(moment.HTML5_FMT.DATE);
        console.log('Y', Y);
    },
    async addDepartment() {
      //Add Department for Users Own Company
      console.log('addDepartment');
      // var dateTime = moment();
      this.departmentForm.datetime_input = "2011-09-01T13:20:30+03:00";
      this.departmentForm.date_input = moment("2019-11-08T17:44:56.144").format(moment.HTML5_FMT.DATE);
      let response = await this.setUserPlatformPOST(this.departmentForm);
      console.log('addDepartment response', response);
      
      await this.$store.dispatch('addDepartment', response);
      this.resetForm();
    },
    resetForm() {
      for(let key in this.departmentForm) {
        this.departmentForm[key]= null;
      }
    },
    
    deleteDepartment(name) {
      //I need to do a search for inventory items that already have a category attached to them that are being deleted
      //Ask the user if they want to delete the categories from the items first. Otherwise prevent deletion.
      console.log('deleteDepartment');
      var departmentObj = this.Companies.departmentList.find(elem => elem.name === name);
      console.log('departmentObj', departmentObj);
      this.$store.dispatch('deleteDepartment', departmentObj.id);
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

<style scoped style="less">

</style>