import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";
var moment = require('moment');
var momenttz = require('moment-timezone');

export const Admin = {
	namespace: true,
	state: {
   
	},
	mutations: {

	},
	actions: { 
    CSVJSONFixtureFile({ dispatch, commit }, file) {
      console.log("CSVJSONFixtureFile file", file);
      axios.post('/node/file-maker/json-maker', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          // "Authorization": "Token " + token
        },
      }).then(response => {
        console.log("Response from Node", response);
        if (response.status === 201) {
          console.log("it was totally successful!");
        }
      }).catch(error => {
          console.log("error",error);
      });
    }

   

	},
	getters: {

	}
}