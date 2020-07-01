import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";
var moment = require('moment');
var momenttz = require('moment-timezone');

export const Static = {
	namespace: true,
	state: {
    date: null,
    time: null, 
    userTimezone: null,
    timeZoneList: [],
    payFrequency: [
      'Annual',
      'Semi-Annual',
      'Quarterly',
      'Bi-Monthly',
      'Monthly', 
      'Weekly',
      'Daily',
      'Hourly'
    ],
    contractType: [
      "Exempt Salary",
      "Non-exempt Hourly",
      "Independent Contractor",
    ],
    employeeType: [
      "Full Time",
      "Part Time",
      "Seasonal",
    ],
    industries: ["Accounting/CPA", "Banking / Finance", "Sales", "Marketing", "Eating and Drinking Establishment"],
    months: [
      {id: 1, name: 'January', abrev: 'Jan'},
      {id: 2, name: 'February', abrev: 'Feb'},
      {id: 3, name: 'March', abrev: 'Mar'},
      {id: 4, name: 'April', abrev: 'Apr'},
      {id: 5, name: 'May', abrev: 'May'},
      {id: 6, name: 'June', abrev: 'Jun'},
      {id: 7, name: 'July', abrev: 'Jul'},
      {id: 8, name: 'August', abrev: 'Aug'},
      {id: 9, name: 'September', abrev: 'Sept'},
      {id: 10, name: 'October', abrev: 'Oct'},
      {id: 11, name: 'November', abrev: 'Nov'},
      {id: 12, name: 'December', abrev: 'Dec'}
    ],
    days: [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ],
    dayOfWeek: [
      {id: 1, name: 'Sunday', abrev: 'Sun', code: 'SU'},
      {id: 2, name: 'Monday', abrev: 'Mon', code: 'MO'},
      {id: 3, name: 'Tuesday', abrev: 'Tue', code: 'TU'},
      {id: 4, name: 'Wednesday', abrev: 'Wed', code: 'WE'},
      {id: 5, name: 'Thursday', abrev: 'Thu', code: 'TH'},
      {id: 6, name: 'Friday', abrev: 'Fri', code: 'FR'},
      {id: 7, name: 'Saturday', abrev: 'Sat', code: 'SA'},
      
    ]

	},
	mutations: {
    SET_TIMEZONE_LIST(state, payload) {
      state.timeZoneList.push(payload);
    },
    SET_USER_TIMEZONE(state, payload) {
      state.userTimezone = payload;
    },
    SET_TIME(state, payload) {
      state.time = payload;
    },
    SET_DATE(state, payload) {
      state.date = payload;
    }

	},
	actions: { 
    initTimeZone({ dispatch, commit }) {
      var momentTZs = momenttz.tz.zonesForCountry('US', { offset: true });
      var tzItem = momentTZs.map(elem => {
        return {name: elem.name, offset: "-" + elem.offset/60}
      });
      commit('SET_TIMEZONE_LIST', tzItem);

      var offset = new Date().getTimezoneOffset();
      commit('SET_USER_TIMEZONE', offset);
    },
    initTime({ dispatch, commit }) {
      var time = new Date;
      var h = time.getHours();
      var m = time.getMinutes();
      var s = time.getSeconds();
      if(h == 0) {
        h = 12;
      }
      if(h > 12) {
        h = h-12;
      }
      h = (h<10) ? h : h;
      m = (m<10) ? "0" + m : m;
      s = (s<10) ? "0" + s : s;

      var timeNow = h + ":" + m + ":" + s;
      
      commit('SET_TIME', timeNow);
      
      setTimeout(() => {dispatch('initTime');}, 30000);
    },
    initDate({ dispatch, commit }) {
      var date = new Date;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      var todaysDate = month + "/" + day + "/" + year;
      commit('SET_DATE', todaysDate);
    }
   

	},
	getters: {

	}
}