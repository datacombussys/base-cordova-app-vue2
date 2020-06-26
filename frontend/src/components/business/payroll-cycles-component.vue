<template>
  <div>
    <!-- Employee Positions Popup -->
    <f7-popup class="payroll-cycles-popup" :opened="payrollCyclesOpened" @popup:closed="payrollCyclesOpened = false">
      <f7-page>
        <f7-navbar title="Payroll Cycles">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <div v-bar="{
          preventParentScroll: true,
          scrollThrottle: 30,
        }" style="height: 100%;"> <!-- el1 -->
          <div> <!-- el2 -->
            <f7-block class="padding-left-half no-padding-right">
              <f7-card>
                <f7-card-content>
                  <!-- Vue Scrollbar (dragger) -->
                  
                      <f7-list class="no-padding">
                        <f7-row>
                          <f7-col width="50">
                            <f7-block-title class="full-width no-margin-top classy-small">Payroll Cycle Name</f7-block-title>
                            <f7-list-input 
                              placeholder="B-Weekly"
                              required
                              validate
                              :value="payrollCycleForm.name" 
                              @input="payrollCycleForm.name = $event.target.value" 
                              type="text">
                            </f7-list-input>
                          </f7-col>
                          <f7-col width="50">
                            <f7-block-title class="full-width no-margin-top classy-small">Start Date</f7-block-title>
                            <f7-list-input
                              id="schedule-start"
                              ref="scheduleStartDate"
                              type="datepicker"
                              placeholder="Select date"
                              closeOnSelect="true"
                              :calendar-params="{dateFormat: 'MM dd, yyyy'}"
                              @calendar:change="(values) => scheduleStartDate.push(...values)">
                              <b-icon slot="media" icon="mdi-clock-outline" size="is-medium"></b-icon>
                            </f7-list-input>
                          </f7-col>
                          <!-- <f7-col width="50">
                            <p class="field-title">All Payroll Cycles</p>
                            <div class="full-width display-flex justify-content-space-around" v-for="(cycle, index) in Attendance.payrollCycleList" :key="index">
                              <div class="margin-half full-width"> {{cycle.name}}</div>
                              <div class="delete" @click="deleteCycle(cycle.name)"></div>
                            </div>
                          </f7-col> -->
                        </f7-row>
                        
                        <!-- Row 2 -->
                        <f7-row class="display-flex justify-content-center full-width margin-top">
                          <f7-block-title class="full-width no-margin-top classy-small">Select Frequency</f7-block-title>
                          <f7-col width="25" class="display-flex justify-content-center">
                            <f7-list-item 
                              @change="frequencySelector" 
                              :checked="showDaily"
                              radio 
                              title="Daily"
                              value="daily" 
                              name="contract-recurrence">
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="25" class="display-flex justify-content-center">
                            <f7-list-item 
                            @change="frequencySelector"
                            :checked="showWeekly"
                            radio
                            title="Weekly"
                            value="weekly" 
                            name="contract-recurrence">
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="25" class="display-flex justify-content-center">
                            <f7-list-item 
                            @change="frequencySelector"
                            :checked="showMonthly"
                            radio
                            title="Monthly"
                            value="monthly" 
                            name="contract-recurrence"></f7-list-item>
                          </f7-col>
                          <f7-col width="25" class="display-flex justify-content-center">
                            <f7-list-item 
                            @change="frequencySelector"
                            :checked="showYearly"
                            radio
                            title="Yearly"
                            value="yearly" 
                            name="contract-recurrence"></f7-list-item>
                          </f7-col>
                        </f7-row>
                        <!-- Daily Block -->
                        <f7-block class="no-padding" v-if="showDaily">
                          <f7-row class="display-flex justify-content-start align-items-center">
                            <f7-col width="35">
                              <f7-list-item 
                                radio 
                                value="days" 
                                title="Every" 
                                name="daily"
                                @change="frequencyForm.dailySelected.is_dailyInterval = !frequencyForm.dailySelected.is_dailyInterval"
                                :checked="frequencyForm.dailySelected.is_dailyInterval">
                              </f7-list-item>
                            </f7-col>
                            <f7-col width="30">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                :disabled="!frequencyForm.dailySelected.is_dailyInterval "
                                label="days"
                                floating-label
                                type="number"
                                clear-button
                                required
                                :value="frequencyForm.dailySelected.dayInterval"
                                @input="frequencyForm.dailySelected.dayInterval = $event.target.value">
                              </f7-list-input>
                            </f7-col>
                          </f7-row>
                          <f7-row>
                            <f7-col>
                              <f7-list-item 
                                radio 
                                value="daily" 
                                title="Every Weekday" 
                                name="daily"
                                @change="frequencyForm.dailySelected.is_everyWeekday = $event.target.checked"
                                :checked="frequencyForm.dailySelected.is_everyWeekday">
                              </f7-list-item>
                            </f7-col>
                          </f7-row>
                        </f7-block>
                        <!-- END Daily Block -->
                        <!-- Weekly Block -->
                        <f7-block class="no-padding" v-if="showWeekly">
                          <f7-row class="display-flex justify-content-start align-items-center">
                            <f7-col width="100" class="margin-left">
                              <f7-row class="display-flex justify-content-start align-items-center">
                                <f7-col width="10">
                                  <span>Every</span>
                                </f7-col>
                                <f7-col width="25">
                                  <f7-list-input
                                  style="max-width: 150px;"
                                  outline
                                  floating-label
                                  type="number"
                                  pattern="[0-9]*"
                                  validate-on-blur
                                  max=12
                                  required
                                  error-message="No more than 12 weeks are allowed"
                                  :value="frequencyForm.weeklySelected.weekInterval" 
                                  @input="frequencyForm.weeklySelected.weekInterval = $event.target.value">
                                </f7-list-input>
                                </f7-col>
                                <f7-col width="50">
                                  <span>Week(s) on:</span>
                                </f7-col>
                              </f7-row>                  
                            </f7-col>
                          </f7-row>
                          <f7-row class="full-width">
                            <f7-segmented class="full-width" raised>
                              <f7-button 
                                v-for="days in Static.dayOfWeek.slice(1, 6)" :key="days.id"
                                class="day-button" 
                                @click="frequencyForm.weeklySelected.dayOfWeek = days.code"
                                outline
                                :active="frequencyForm.weeklySelected.dayOfWeek === days.code ? true : false">
                                {{days.name}}
                              </f7-button>
                      
                            </f7-segmented>
                          </f7-row>
                        </f7-block>
                        <!-- END Weekly Block -->
                        <!-- Monthly Block -->
                        <f7-block class="no-padding" v-if="showMonthly">
                          <f7-row class="full-width display-flex justify-content-start align-items-center">
                            <f7-col width="25">
                              <f7-list-item 
                                radio 
                                value="days" 
                                title="On the" 
                                name="monthly-choice"
                                @change="frequencyForm.monthlySelected.is_dailyInterval = !frequencyForm.monthlySelected.is_dailyInterval"
                                :checked="frequencyForm.monthlySelected.is_dailyInterval">
                              </f7-list-item>
                            </f7-col>
                            <f7-col width="25">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                :disabled="!frequencyForm.monthlySelected.is_dailyInterval"
                                label="day"
                                floating-label
                                type="number"
                                max="31"
                                validate-on-blur
                                step="1"
                                required
                                :value="frequencyForm.monthlySelected.dayInterval" 
                                @input="frequencyForm.monthlySelected.dayInterval = $event.target.value">
                              </f7-list-input>
                            </f7-col>
                            <f7-col width="15">
                              <span>of every</span>
                            </f7-col>
                            <f7-col width="25">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                :disabled="!frequencyForm.monthlySelected.is_dailyInterval"
                                label="month"
                                floating-label
                                type="number"
                                max="12"
                                step="1"
                                validate-on-blur
                                required
                                :value="frequencyForm.monthlySelected.monthInterval" 
                                @input="frequencyForm.monthlySelected.monthInterval = $event.target.value">
                              </f7-list-input>
                            </f7-col>
                            <f7-col width="10">
                              <span>month</span>
                            </f7-col>
                          </f7-row>
                          <f7-row class="display-flex justify-content-start align-items-center">
                            <f7-col width="20">
                              <f7-list-item 
                              radio 
                              value="days" 
                              title="On"
                              name="monthly-choice"
                              @change="frequencyForm.monthlySelected.is_specificDay = !frequencyForm.monthlySelected.is_specificDay"
                              :checked="frequencyForm.monthlySelected.is_specificDay"></f7-list-item>
                            </f7-col>  
                            <f7-col width="80">
                              <f7-row class="display-flex justify-content-start align-items-center">
                                <f7-list-input
                                  style="max-width: 200px;"
                                  outline
                                  :disabled="!frequencyForm.monthlySelected.is_specificDay"
                                  label="day"
                                  floating-label
                                  type="select"
                                  :value="frequencyForm.monthlySelected.dateSpecified" 
                                  @input="updateMonthlyArrayOfDays($event)">
                                    <option value="-Please Select-">-Please Select-</option>
                                    <option value="-1">Last Day of Month</option>
                                    <option v-for="dai in Static.days" :key="dai.id" :value="dai">{{dai}}</option>
                                </f7-list-input>
                                <!-- <f7-link 
                                  icon-only 
                                  v-if="!frequencyForm.monthlySelected.hideFirstAddButton"
                                  @click="newMonthlyDate">
                                  <f7-icon size="40" icon="mdi mdi-plus-circle">
                                  </f7-icon>
                                </f7-link> -->
                              </f7-row>
                            </f7-col>  
                          </f7-row>
                          <f7-row 
                            v-for="(date, $dateIndex) in frequencyForm.monthlySelected.datesSpecified.length +1" 
                            :key="$dateIndex" 
                            class="display-flex justify-content-start align-items-center">
                            <f7-col width="20" class="display-flex justify-content-end">
                              <span>and</span>

                            </f7-col>  
                            <f7-col width="40">
                              <f7-list-input
                                style="max-width: 200px;"
                                :disabled="!frequencyForm.monthlySelected.is_specificDay"
                                outline
                                label="day"
                                floating-label
                                default-value="-Please Select-"
                                type="select"
                                :value="frequencyForm.monthlySelected.datesSpecified[$dateIndex]" 
                                @input="newMonthlyDate2($event)">
                                  <option value="-Please Select-">-Please Select-</option>
                                  <option value="Last Day of Month">Last Day of Month</option>
                                  <option v-for="dai in Static.days" :key="dai.id" :value="dai">{{dai}}</option>
                              </f7-list-input>
                            </f7-col>  
                            <f7-col width="35" v-if="frequencyForm.monthlySelected.datesSpecified[$dateIndex] === frequencyForm.monthlySelected.datesSpecified.slice(-1)[0]">
                              <span>of every month</span>
                              <!-- <f7-list-item title="Add New">
                                <f7-link 
                                  icon-only 
                                  v-if="!frequencyForm.monthlySelected.hideAddtlAddButtons"
                                  @click="newMonthlyDate2">
                                  <f7-icon size="40" icon="mdi mdi-plus-circle">
                                  </f7-icon>
                                </f7-link>
                              </f7-list-item> -->
                            </f7-col>
                          </f7-row>
                        </f7-block>
                        <!-- END Monthly Block -->
                        <!-- Yearly Block -->
                        <f7-block class="no-padding" v-if="showYearly">
                          <f7-row class="full-width display-flex justify-content-start align-items-center">
                            <f7-col width="20">
                              <span>Recur every</span>
                            </f7-col>
                            <f7-col width="20">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                label="Years"
                                floating-label
                                pattern="[0-9]*"
                                validate-on-blur
                                type="text"
                                required
                                :value="frequencyForm.yearlySelected.yearInterval" 
                                @input="frequencyForm.yearlySelected.yearInterval = $event.target.value">
                              </f7-list-input>
                            </f7-col>
                            <f7-col width="10">
                              <p>on</p>
                            </f7-col>
                            <f7-col width="30">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                label="month"
                                floating-label
                                type="select"
                                :value="frequencyForm.yearlySelected.monthOfYear" 
                                @input="frequencyForm.yearlySelected.monthOfYear = $event.target.value">
                                  <option v-for="month in Static.months" :key="month.id" :value="month.id">{{month.name}}</option>
                              </f7-list-input>
                            </f7-col>
                            <f7-col width="20">
                              <f7-list-input
                                style="max-width: 150px;"
                                outline
                                label="day"
                                floating-label
                                type="select"
                                :value="frequencyForm.yearlySelected.dayOfMonth" 
                                @input="frequencyForm.yearlySelected.dayOfMonth = $event.target.value">
                                  <option v-for="day in Static.days" :key="day.id" :value="day">{{day}}</option>
                              </f7-list-input>
                            </f7-col>
                          </f7-row>
                        </f7-block>
                        <!-- END Frequency Options -->
                        <f7-row class="display-flex justify-content-center">
                          <f7-col width="50">
                            <f7-button class="margin linear-grad" fill @click="addCycle">Add Payroll Cycle</f7-button>
                            <f7-button fill @click="testingMethod">Test</f7-button>
                          </f7-col>
                        </f7-row>
                        <f7-row class="margin-bottom">
                          
                        </f7-row>
                      </f7-list>
                    
                </f7-card-content>
              </f7-card>
           </f7-block>
          </div>
        </div>
      </f7-page>
    </f7-popup>
    <!-- END Employee Positions Popup -->
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import Vue from 'vue';

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';

export default {
  name: "payrollCyclesComponent",
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
      payrollCyclesOpened: false,
      //Show / Hide Views
      showDaily: false,
      showWeekly: false,
      showMonthly: false,
      showYearly: false,
      //Basic Form
      scheduleStartDate: [],
      payrollCycleForm: {
        partner: null,
        datacom: null,
        company: null,
        name: null,
        date_added: null,
        frequency: null,
        rule: null,
        start_date: null,
        end_date: null,
      },
      frequencyForm: {
        daySelected: 0,
        daily: false,
        dailySelected: {
          is_dailyInterval: false,
          dayInterval: 0,
          is_everyWeekday: false,
        },
        weekly: false,
        weeklySelected: {
          weekInterval: 0,
          dayOfWeek: null,
        },
        monthly: false,
        monthlySelected: {
          is_dailyInterval: false,
          dayInterval: 0,
          monthInterval: 0,
          is_specificDay: false,
          dateSpecified: 0,
          multipleDatesSelected: false,
          hideFirstAddButton: false,
          hideAddtlAddButtons: false,
          datesSpecified: [],
        },
        yearly: false,
        yearlySelected: {
          yearInterval: 0,
          monthOfYear: 0,
          dayOfMonth: 0,
        },
      },
      recurrenceForm: {
        RULE: null,
        FREQ: null,
        CACHE: false,
        DTSTART: null,
        UNTIL: null,
        INTERVAL: null,
        WKST: null,
        COUNT: null,
        BYSETPOS: null,
        BYMONTH: null,
        BYMONTHDAY: null,
        BYYEARDAY: null,
        BYWEEKNO: null,
        BYWEEKDAY:null,
        BYHOUR: null,
        BYMINUTE: null,
        BYSECOND: null,
        BYEASTER: null,
      }
    }
  },
  methods: {
    testingMethod(e) {
        console.log("this.frequencyForm",this.frequencyForm);
        // console.log("this.addCycle",this.addCycle);
        console.log("this.recurrenceRule()",this.recurrenceRule());
        console.log("this.payrollCycleForm",this.payrollCycleForm);
        console.log("this.recurrenceForm",this.recurrenceForm);
        console.log("Vue",Vue);
    },
    async addCycle() {
      console.log("this.payrollCycleForm", this.payrollCycleForm);
      //Need to Send 2 POST requests
      //1) Create Cycle
      console.log("this.scheduleStartDate", this.scheduleStartDate);
      this.payrollCycleForm.start_date = new Date(this.scheduleStartDate.slice(-1)[0]);
      var newPayrollCycleForm = JSON.parse(JSON.stringify(this.payrollCycleForm));
      console.log("newPayrollCycleForm", newPayrollCycleForm);

      let platformForm = await this.setUserPlatformPOST(newPayrollCycleForm);
      let response = await this.$store.dispatch("addPayrollCycle", platformForm);
      console.log("response", response);

      //2) Create Recurrence Foreign Key and Attach to Cycle
      var recurrence = {
        recurrence: 0,
        repeat: null,
        start_date: this.payrollCycleForm.start_date,
        end_date: null
      };
      //Assemble Recurrence Rule
      await this.recurrenceRule();

      recurrence.recurrence = response.id;
      recurrence.rrule = this.recurrenceForm.RULE;
      recurrence.start_date = response.start_date;
      recurrence.end_date = response.end_date;
      this.$store.dispatch("addPayrollCycleRecurrence", recurrence);

    },
    deleteCycle() {
      console.log("this.shippingForm ");
    },
    recurrenceRule() {     
      if(this.showDaily) {
        //If Daily Schedule
        this.recurrenceForm.FREQ= "DAILY";
        if(this.frequencyForm.dailySelected.is_dailyInterval) {
          //Daily Interval (Count)
          this.recurrenceForm.INTERVAL=this.frequencyForm.dailySelected.dayInterval;
          this.recurrenceForm.RULE=`FREQ=${this.recurrenceForm.FREQ},INTERVAL=${this.recurrenceForm.INTERVAL}`;
        } else {
          //is_everyWeekday
          this.recurrenceForm.RULE=`FREQ=${this.recurrenceForm.FREQ}`;
        }
      } else if(this.showWeekly) {
        //If Weekly Schedule
        this.recurrenceForm.FREQ = "WEEKLY";
        this.recurrenceForm.INTERVAL=this.frequencyForm.weeklySelected.weekInterval;
        this.recurrenceForm.BYWEEKDAY=this.frequencyForm.weeklySelected.dayOfWeek;
        this.recurrenceForm.RULE=`FREQ=${this.recurrenceForm.FREQ},INTERVAL=${this.recurrenceForm.INTERVAL},BYWEEKDAY=${this.recurrenceForm.BYWEEKDAY}`;
      }else if(this.showMonthly) {
        //If Monthly Schedule
        this.recurrenceForm.FREQ = "MONTHLY";
        if(this.frequencyForm.monthlySelected.is_dailyInterval) {
          this.recurrenceForm.INTERVAL = this.frequencyForm.monthlySelected.monthInterval;
          this.recurrenceForm.BYMONTHDAY = this.frequencyForm.monthlySelected.dayInterval;
          this.recurrenceForm.RULE=`FREQ=${this.recurrenceForm.FREQ},INTERVAL=${this.recurrenceForm.INTERVAL},BYMONTHDAY=${this.recurrenceForm.BYMONTHDAY}`;
        } else {
          this.recurrenceForm.INTERVAL = 1;
          if(this.frequencyForm.monthlySelected.datesSpecified.length != 0) {
            this.recurrenceForm.BYMONTHDAY = this.frequencyForm.monthlySelected.datesSpecified;
          } else {
            this.recurrenceForm.BYMONTHDAY = this.frequencyForm.monthlySelected.dateSpecified;
          }
        }
      } else if(this.showYearly) {
        //If Yearly Schedule
        this.recurrenceForm.FREQ = "YEARLY";
        this.recurrenceForm.INTERVAL = this.frequencyForm.yearlySelected.yearInterval;
        this.recurrenceForm.BYMONTH = this.frequencyForm.yearlySelected.monthOfYear;
        this.recurrenceForm.BYMONTHDAY = this.frequencyForm.yearlySelected.dayOfMonth;
        this.recurrenceForm.RULE=`FREQ=${this.recurrenceForm.FREQ},INTERVAL=${this.recurrenceForm.INTERVAL},BYMONTH=${this.recurrenceForm.BYMONTH},BYMONTHDAY=${this.recurrenceForm.BYMONTHDAY}`;
      }

    },
    updateMonthlyArrayOfDays(e) {
      console.log('e', e);
      this.frequencyForm.monthlySelected.dateSpecified = e.target.value;

    },
    newMonthlyDate(e) {
      console.log("newMonthlyDate e", e);
      this.frequencyForm.monthlySelected.hideFirstAddButton = true;
    },
    newMonthlyDate2(e) {
      console.log("newMonthlyDate e", e);
      if(this.frequencyForm.monthlySelected.datesSpecified.length === 1) {
        this.frequencyForm.monthlySelected.datesSpecified.push(this.frequencyForm.monthlySelected.dateSpecified);
        this.frequencyForm.monthlySelected.datesSpecified.push(e.target.value);
      } else {
        this.frequencyForm.monthlySelected.datesSpecified.push(e.target.value);
      }
      
    },
    frequencySelector(e) {
      // console.log('e', e);
      if(e.target.value === 'daily') {
        this.showDaily = true;
        this.showWeekly=false; 
        this.showMonthly=false; 
        this.showYearly=false;
        this.frequencyForm.daily = true;
      } else if(e.target.value === 'weekly') {
        this.showDaily = false;
        this.showWeekly=true; 
        this.showMonthly=false; 
        this.showYearly=false;
        this.frequencyForm.weekly = true;
      } else if(e.target.value === 'monthly') {
        this.showDaily = false;
        this.showWeekly=false; 
        this.showMonthly=true; 
        this.showYearly=false;
        this.frequencyForm.monthly = true;
      } else if(e.target.value === 'yearly') {
        this.showDaily = false;
        this.showWeekly=false; 
        this.showMonthly=false; 
        this.showYearly=true;
        this.frequencyForm.yearly = true;
      }
    },
    resetForm() {

    },
    
  },
  computed: {
    ...mapState(["Attendance", "Static"]),
    // ...mapGetters([]),
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
.navbar-bg {
  background: linear-gradient(45deg, rgba(0,55,87,1) 0%, rgba(23,122,143,1) 100%);
}
.payroll-cycles-popup {
  width: 55%;
}

.day-button {
  font-size: .75em;
}
.linear-grad {
  background: linear-gradient(45deg, rgba(0,55,87,1) 0%, rgba(23,122,143,1) 100%);
}

</style>