import Vue from 'vue';
var numeral = require("numeral");
// http://numeraljs.com/


// switch between locales
numeral.locale('en');

Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0.00"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter("formatDollar", function(value) {
  return numeral(value).format(	'$ 0,0.00'); 
});

Vue.filter("percent", function(value) {
  return numeral(value).format(	'%0.00'); 
});

Vue.filter('toLowerCase', function(value) {
  return value.toLowerCase();
});

//Make a filter to format the Permissions and module code name