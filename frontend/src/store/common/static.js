
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Industries
import industries from "@/js/industries"

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
    industries: industries,
    months: [
      {id: 1, name: 'January', abbr: 'Jan'},
      {id: 2, name: 'February', abbr: 'Feb'},
      {id: 3, name: 'March', abbr: 'Mar'},
      {id: 4, name: 'April', abbr: 'Apr'},
      {id: 5, name: 'May', abbr: 'May'},
      {id: 6, name: 'June', abbr: 'Jun'},
      {id: 7, name: 'July', abbr: 'Jul'},
      {id: 8, name: 'August', abbr: 'Aug'},
      {id: 9, name: 'September', abbr: 'Sept'},
      {id: 10, name: 'October', abbr: 'Oct'},
      {id: 11, name: 'November', abbr: 'Nov'},
      {id: 12, name: 'December', abbr: 'Dec'}
    ],
    days: [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ],
    dayOfWeek: [
      {id: 1, name: 'Sunday', abbr: 'Sun', code: 'SU'},
      {id: 2, name: 'Monday', abbr: 'Mon', code: 'MO'},
      {id: 3, name: 'Tuesday', abbr: 'Tue', code: 'TU'},
      {id: 4, name: 'Wednesday', abbr: 'Wed', code: 'WE'},
      {id: 5, name: 'Thursday', abbr: 'Thu', code: 'TH'},
      {id: 6, name: 'Friday', abbr: 'Fri', code: 'FR'},
      {id: 7, name: 'Saturday', abbr: 'Sat', code: 'SA'},
      
    ],
    Units: [
      "Each",
      "Box",
      "Unit",
      "Bag",
      "Pallet",
      "Carton"
    ],
    UOMWeight: [
      "Grams",
      "Kilograms",
      "Ounces",
      "Pounds"
    ],
    UOMDimension: [
      "Centimeters",
      "Milimeters",
      "Inches",
      "Feet",
      "Kilometers"
    ],
    barcodeType: [
      "SKU",
      "UPC",
    ],
    UOMBilling: [
      "Hour",
      "Job",
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