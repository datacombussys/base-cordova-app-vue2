https://cdn.materialdesignicons.com/
<span class="mdi mdi-cart-minus mdi-48" ></span>
<md-icon class="md-size-5x">menu</md-icon>

<fa-icon :icon="['far', 'address-book']" class="mdi-35"></fa-icon>
<fa-icon :icon="['fa', 'ambulance']" class="mdi-35"></fa-icon>

https://material.io/resources/icons
<i class="material-icons" style="font-size:45px;">check_circle</i>
<span class="material-icons md-48 orange600"> check_circle </span>
<span class="material-icons md-48 text-orange">check-bold</span>

https://ej2.syncfusion.com/vue/documentation/appearance/icons/
also Devexpress ICons See Icon Page.vue
<span class="e-icons e-upload"></span>
.e-upload:before{
	content: '\e714';
	font-size: 60px;
}
https://js.devexpress.com/Documentation/Guide/Themes_and_Styles/Icons/#Built-In_Icon_Library
<DxItem title="Profile" icon="dx-icon dx-icon-card">
text: "Login",
icon: "mdi mdi-login",

DxtextBox Modes: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'

**********************************Successful Computed Setter ********************************
totalThings: {
  get: function () {
    console.log("totalThings Getter");
    return 28
  },
  set: function (newVal) {
    console.log("totalThings Setter");
    console.log('newVal', newVal);
    this.newData = newVal;
  }
}
mounted: {
  this.totalThings = 10;
}
************** Preloader in Component from Getter ******************
data() {
  listItem: null
}
computed: {
  listData() {
    return this.$store.getters.GET_NOTIFICATIONS_LIST;
  }
}
watch: {
  listData(newVal, oldVal) {
    this.messageData.list = this.listData;
    this.loading = false;
  }

***************************************Lazy Load Comonents with PreLoader*********************************************
<script>
  const notificationMessagesComponent = import("@/components/universal/notification-messages-component.vue");
  import LoadingState from '@/components/universal/loading-state-component.vue';
  import ErrorState from '@/components/universal/error-state-component.vue';

  components: {
      "notification-messages-component": () => ({
      component: notificationMessagesComponent,
      loading: LoadingState,
      error: ErrorState,
      delay:100,
      timeout: 0
    })
  }
</script>

**************************** AutoFocus ***********************************
this.$refs.barcodeInput.$el.querySelector('input').focus();



Usage of BASE_URL
url("#{\$baseURL}assets/images/backgrounds/bg-1.png")



<div for person in people>
<h1> {{ people.firstmname | capitalize }} <h2>

// V-Model
<f7-input type="text"
:value="classdata.title"
@input="classdata.title = \$event.target.value"
placeholder=" ">
</f7-input>

//Checkboxes V-Model
<template>
<input
type="checkbox"
v-for="item in items"
:value="item.id"
:checked="selectedItems.indexOf(item.id) >= 0"
@change="updateSelectedItems"

> </template>

<script>
  ...
  methods: {
    updateSelectedItems(e) {
      const checked = e.target.checked;
      const value = e.target.value;
      if (checked) {
        this.selectedItems.push(value)
      } else {
        this.selectedItems.splice(this.selectedItems.indexOf(value), 1);
      }
    }
  }
</script>




<div class="left" v-if="uploadMessage" :class="`message ${error ? 'is-danger': 'is-success'}`">



****** Slots ******
--Parent--
<template #:button>
  <f7-row class="display-flex justify-content-center">
    <f7-col width="50">
      Start Below
    </f7-col>
  </f7-row>
</template>
--Child--
<slot name="button"></slot>

******************************Passing Data from Child to Parent Component*****************************
Parent Listen for event
<component @receiveOpenTimes="changeOpenData"></component>
methods(){
  changeOpenData(payload) {
    this.timeOpenListFromChild = payload;
  },
}
---------------------Child Emit Event-----------------
<div @change="sendToParent" id="idClose">
methods() {
  sendToParent() {
    this.$emit("receiveOpenTimes", this.timeOpenList);
  },
}

***********************Animation Transition Between two Elements ********************************
<div class="full-width">
  <transition name="calc-transition" class="flip-card" mode="out-in">
    <div v-if="showCalc" key="firstText" class="cardFront"><p>This is the first text</p></div>
    <div v-else key="secondText" class="cardBack"><p>Sorry, no items found.</p></div>
  </transition>
</div>

<div class="full-width">
  <button @click="showCalc = !showCalc">Click</button>
</div>

***** Get Dates from JavaScript Convert to Python *****
console.log('this.holidayForm', this.holidayForm);
var year = new Date().getFullYear();
console.log('year', year);
var newDate = new Date(this.holidayForm.date + " " + year);
console.log('newDate', newDate);
console.log('newDate', newDate.toISOString());

<F7 PRELOADERS And DIALOG BOXES>

Devexpress Custom Button
this.$nextTick(function() {
  let myDialog = custom({
    title: "Custom dialog",
    messageHtml: "<b>Dialog with custom buttons</b>",
    buttons: [{
      text: "button 1",
      onClick: (e) => {
        return { buttonText: e.component.option("text") }
      }
    }]
  });
  myDialog.show().then((dialogResult) => {
      console.log(dialogResult.buttonText);
  });
})



Javascript TEMPLATES with Null Undefined, etc... REMOVE NULL AND UNDEFINED FIRST BY filter(),THEN PERFORM FUNCTION ON RESULT
Empty Object with nested entries --> e.g. --> category.name
category: {}
Object.keys(this.category).length
Object.entries(this.category).length --> Same as above
category: null
Object.entries(this.category)[0][1] != null --> category.id === null

Template Syntax empye Object with nested elements
{{ props.row.category === null ? '' : props.row.category.name }}

Javascript TEMPLASCRIPTES with Null Undefined, etc...
if(this.invCategory.name) {}

****delete icon****
<div><a class="delete"></a></div>
//Use the icon to splice array
<a @click.prevent="files.splice(index, 1)" class="delete"></a>



//Primary ClearForm Option //Option 1
clearFormData() {
console.log("clearFormData this.invForm", this.invForm)
for (let key in this.invForm) {
console.log('key', this.invForm[key]);
if(this.invForm[key] === true || this.invForm[key] === false) {
// console.log('TF key', key);
this.invForm[key] = false;
} else {
this.invForm[key] = null;
}
}
}

//Simple Promise Function
const exists = x => x != null;
const ifExists = value => exists(value) ?
Promise.resolve(value) :
Promise.reject(`Invalid value: ${ value }`);
let answer = ifExists("Hello"); // Invalid value: null
console.log("answer",answer);

//Secondary ClearForm Option
clearForm() {
//Option 2
var $$ = this.Dom7
  var element = $$('input');
for (let key = 0; key<element.length; key++) {
element[key]['value'] = null;
}
console.log("element", element);
},

//Passing several variables to vue method
:checked="selectedPermissions.indexOf(item.id) >= 0"
@change="updateSelectedItems($event, props.row.name)"

//Getting values from different state module
addGroupPermissions({ commit, dispatch, context }, permissions) {
var PermisisonList = context.rootState.Permissions.permissionList;
}

    ------------------------------ Proper Javascript forloop ----------------
for(let item in newGroupObj) {
console.log('newGroupObj[item]', newGroupObj[item]);
}

//Computed Setter
See the userprofile computed section

//Grab Data with Dom7 id="salesNotes"
var $$ = this.Dom7;
var htmlContent = $$("#salesNotes").html();
console.log("htmlContent", htmlContent);

// FindINdex
setIndex({commit, state}) {
const findIndexItem = symbolPrice.findIndex(function(item, index){
return item.symbol == chartsymbol;
});

    OR

var eeIndex = this.Users.employeeList.findIndex(elem => elem.id === rowID);
//My first reduce function this.order.subtotal = this.allItemsInTill.reduce((acc, obj) => {
return acc + parseFloat(obj.list_price);
}, 0);

//Hidden Div tags

<div v-if="!DataFeed.showCharts ? 'hidden' : ''">Please load a chart from the side menu</div>

************\*\*************PYTHON**********\***********

Avoid Circular Reference in Kodels
industry = models.ForeignKey('commons.Industry', on_delete=models.DO_NOTHING, blank=True, null=True)

//Django Multiple Create
mixins.py
class CreateListMixin:
"""Allows bulk creation of a resource."""
def get_serializer(self, *args, \*\*kwargs):
if isinstance(kwargs.get('data', {}), list):
kwargs['many'] = True
return super().get_serializer(*args, \*\*kwargs)

views.py
class HistorViewSet(CreateListMixin, viewsets.ModelViewSet):
queryset = SymbolHistory.objects.all()
serializer_class = HistorySerializer


//Determine if object is empty
if(Object.keys(this.DataFeed.djangoSymbolHistory).length === 0) {
return this.chart
} else {

//Determine if Array is empty
if(this.DataFeed.djangoSymbolHistory.ohlcv.length == 0) {
return this.chart
} else {

//Python for loop range. Start at end and step backward by -1
for i in range(len(somelist) - 1, -1, -1):
if some_condition(somelist, i):
del somelist[i]

//Reference Store Data from another module
import...
import store from './store';
then use...
var history = store.state.DataFeed.djangoSymbolHistory;

**********************************************Date Conversion *****************************************************

            ---------------------- Convert from Javascript to Django Readable ------------------------------
let today = new Date();     // Date Wed Jun 24 2020 14:39:37 GMT-0700 (Mountain Standard Time)
today.toISOString();       // "2020-06-24T21:39:37.733Z"

            ---------------------- Convert from Django to Javascript Readable ------------------------------
let newdate = new Date("2020-06-24T21:39:37.733Z");       //Date Wed Jun 24 2020 14:39:37 GMT-0700 (Mountain Standard Time)

//Using Moment to convert to UNIX
let date = moment("10/15/2014 9:00", "MM/DD/YYYY HH:mm").valueOf()
convert from unix to regualar
let date = moment(1413388800000)format("dddd, MMMM Do YYYY, h:mm:ss a");


------------------------------- Time -----------------------------------------------
var date_time = moment().format();
console.log('date_time', date_time);
var date_only = moment(date_time).format(moment.HTML5_FMT.DATE);
console.log('date_only', date_only);

********************************************** Axios Error Handling *****************************************************
//Axios Error Handling
async sendFile() {
const formData = new FormData();
formData.append('file', this.file);
try {
await axios.post('/node/upload/', formData);
this.uploadMessage = "File has been uploaded";
this.file = "";
} catch(err) {
this.uploadMessage = `There was an error uploading ${err.response.data.error}`;
console.log("Error Uploading", err);
this.error = true;
}

//Django managing Files

> > > from django.core.files import File

# Create a Python file object using open()

> > > f = open('/path/to/hello.world', 'w')
> > > myfile = File(f)

//File Storage
from django.core.files.storage import FileSystemStorage
from django.db import models

fs = FileSystemStorage(location='/media/photos')

class Car(models.Model):
...
photo = models.ImageField(storage=fs)

****\*\*****Error Codes******\*\*******
Createcompany
404 bad data
error.response.data.detail - gives no response

Vuex State Rules
I Cannot return a promise from a Mutation
I Can Access rootState in a Mutation if I pass it from the Actions
I cannot access rootState from Mutation d
I cannot return a promise from an Action.

merging Objects in Javascript
Use spread operator
let merged = {...obj1, ...obj2};

	return reject(response.message);

****************************Django-Rest To Representaiton() ********************************

# def to_representation(self, value):
#     data = super().to_representation(value)  
#     if data['barcode']:
#         barcode_data_serializer = UserBarcodeSerializer(value.barcode)
#         data['barcode'] = barcode_data_serializer.data

#     return data



