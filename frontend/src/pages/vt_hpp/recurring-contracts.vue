<template>
  <f7-page name="recurring-contracts">
    <f7-navbar back-link="Back">
      <f7-nav-left>
      <f7-link size="10" panel-open=".virtual-terminal">
        <f7-icon material="menu"></f7-icon>
      </f7-link>
      </f7-nav-left>
      <f7-nav-title>Contracts</f7-nav-title>
      <f7-subnavbar :inner="false" class="custom-searchbar">
        <f7-searchbar
          search-container=".search-list"
          search-in=".item-title"
          :disable-button="!$theme.aurora">
        <f7-row class="full-width">
          <f7-col width="60">
            <div class="account-div">
              <f7-row class="display-flex align-items-center">
              <f7-col width="90" class="margin-left text-color-gray">
                Terminal: Account 10029543
              </f7-col>
              <f7-col width="10" class="level-right">
                <f7-link icon-ios="f7:chevron_down" icon-aurora="f7:chevron_down" icon-md="f7:chevron_down" href="/checkout/"></f7-link>
              </f7-col>
              </f7-row>
            </div>
          </f7-col>
          <f7-col width="10"></f7-col>
          <f7-col width="10">
            <f7-link icon-ios="f7:cart" icon-aurora="f7:cart" icon-md="f7:cart" href="/checkout/"></f7-link>
          </f7-col>
          <f7-col width="10" v-if="!Users.isLoggedIn">
            <f7-link icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
          </f7-col>
          <f7-col width="10" v-if="Users.isLoggedIn">
            <f7-link con-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
          </f7-col>
          <f7-col width="10">
            <f7-link icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-row>
        </f7-searchbar>
        
      </f7-subnavbar>
    </f7-navbar>
    
      <f7-row>
        <!-- Main Column -->
        <f7-col width="100" medium="100">
          <!-- Page content-->
          <f7-block-title medium>Batch Dashboard</f7-block-title>
          <f7-row class="display-flex justify-content-end">
            <f7-col width="10">
              <f7-button fill link="/batches/">Batches</f7-button>
            </f7-col>
            <f7-col width="25" class="display-flex justify-content-end margin-right">
              <div>
                <f7-button fill class="trans-btn-left"><span>New Transaction</span></f7-button>
              </div>
              
              <f7-button fill class="trans-btn-right" icon-size="40" icon-color="white" icon="mdi mdi-menu-down"></f7-button>
            </f7-col>
          </f7-row>
          <!-- Card-->
            <f7-card class="demo-card-header-pic margin-top">
              <f7-card-header class="padding-top">               
                <f7-row class="full-width">
                  <f7-col width="20" class="search-container">
                    <f7-searchbar class="margin-top-half" inline></f7-searchbar>
                  </f7-col>
                  <f7-col width="20">
                    <div>
                      <p>Select Dates:</p>
                      <f7-list>
                        <div class="list no-hairlines-md">
                          <ul>
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-input-wrap">
                                    <input type="text" placeholder="Select date range" readonly="readonly" id="calendar-range"/>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </f7-list>
                    </div>
                  </f7-col>
                  <f7-col width="20">
                    <p>Terminal:</p>
                    <f7-list>
                      <f7-list-input 
                        type="select">
                        <option value="7504321">7504321</option>
                        <option value="7504322">7504322</option>
                        <option value="7504323">7504323</option>
                      </f7-list-input>
                    </f7-list>
                  </f7-col>
                  <f7-col width="20">
                    <p>Type:</p>
                    <f7-list>
                      <f7-list-input 
                        type="select">
                        <option value="grams">Approved</option>
                        <option value="oz">Declined</option>
                        <option value="lbs">Cancelled</option>
                      </f7-list-input>
                    </f7-list>
                  </f7-col>
                </f7-row>
              </f7-card-header>
              <f7-card-content>
                <div class="error-text" hidden>
                  There are no transactions to display
                </div>
                <div class="data-table data-table-collapsible  data-table-init">
                  <table>
                    <thead>
                      <tr>
                        <th class="checkbox-cell">
                          <label class="checkbox">
                            <input type="checkbox"/>
                            <i class="icon-checkbox"></i>
                          </label>
                        </th>
                        <th class="label-cell sortable-cell">Date</th>
                        <th class="numeric-cell sortable-cell">Batch</th>
                        <th class="numeric-cell sortable-cell">Terminal</th>
                        <th class="numeric-cell sortable-cell">Amount Submitted</th>
                        <th class="numeric-cell sortable-cell">Settled</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-cell">
                          <label class="checkbox">
                            <input type="checkbox"/>
                            <i class="icon-checkbox"></i>
                          </label>
                        </td>
                        <td class="label-cell">05/24/2018</td>
                        <td class="numeric-cell">24</td>
                        <td class="numeric-cell">1592548710</td>
                        <td class="numeric-cell">$14,258.67</td>
                        <td class="numeric-cell">Yes</td>
                      </tr>
                      <tr>
                        <td class="checkbox-cell">
                          <label class="checkbox">
                            <input type="checkbox"/>
                            <i class="icon-checkbox"></i>
                          </label>
                        </td>
                        <td class="label-cell">05/24/2018</td>
                        <td class="numeric-cell">24</td>
                        <td class="numeric-cell">1592548710</td>
                        <td class="numeric-cell">$14,259.67</td>
                        <td class="numeric-cell">Yes</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="data-table-footer">
                    <div class="data-table-rows-select">
                      Per page:
                      <div class="input input-dropdown">
                        <select>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="all">All</option>
                        </select>
                      </div>
                    </div>
                    <div class="data-table-pagination">
                      <span class="data-table-pagination-label">1-5 of 10</span>
                      <a href="#" class="link disabled">
                        <i class="icon icon-prev color-gray"></i>
                      </a>
                      <a href="#" class="link">
                        <i class="icon icon-next color-gray"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <f7-row class="level-right margin-top">
                  <f7-col width ="25">
                    <f7-button fill popup-open=".new-contract">New Contract</f7-button>
                  </f7-col>
                </f7-row>
              </f7-card-content>
            </f7-card>
        </f7-col>
      </f7-row>

    <!-- Popup for New Contract -->
    <f7-sheet class="new-contract" :opened="sheetPopupOpened" @popup:closed="sheetPopupOpened = false">
      <f7-page>
       <f7-link class="level-right text-color-grey margin-right" popup-close icon-size="50" icon="mdi mdi-close"></f7-link>
        <f7-card class="margin-top">
          <f7-card-content>
            <f7-list>
              <!-- Row 1 Name -->
              <f7-row>
                <f7-block-title class="full-width margin-top">Contract Title</f7-block-title>
                <f7-col width="100">
                  <f7-list-input
                  outline
                  label="Contract Name"
                  floating-label
                  type="text"
                  clear-button
                  required>
                  <f7-icon size="35" icon="mdi mdi-script-text-outline" slot="media"></f7-icon>
                  </f7-list-input>
                </f7-col>
              </f7-row>
              <!-- END Row 1 -->

              <!-- Row 2 -->
              <f7-row class="display-flex justify-content-center full-width margin-top">
                <f7-block-title class="full-width no-margin-top">Select Frequency</f7-block-title>
                <f7-col width="25" class="display-flex justify-content-center">
                  <f7-list-item 
                    @click="showDaily = true, showWeekly=false, showMonthly=false, showYearly=false" 
                    radio 
                    title="Daily"
                    value="daily" 
                    name="contract-recurrence">
                  </f7-list-item>
                </f7-col>
                <f7-col width="25" class="display-flex justify-content-center">
                  <f7-list-item 
                  @click="showDaily=false, showWeekly=true, showMonthly=false, showYearly=false"
                  radio
                  title="Weekly"
                  value="weekly" 
                  name="contract-recurrence">
                  </f7-list-item>
                </f7-col>
                <f7-col width="25" class="display-flex justify-content-center">
                  <f7-list-item 
                  @click="showDaily=false, showWeekly=false, showMonthly=true, showYearly=false"
                  radio
                  title="Monthly"
                  value="monthly" 
                  name="contract-recurrence"></f7-list-item>
                </f7-col>
                <f7-col width="25" class="display-flex justify-content-center">
                  <f7-list-item 
                  @click="showDaily=false, showWeekly=false, showMonthly=false, showYearly=true"
                  radio
                  title="Yearly"
                  value="yearly" 
                  name="contract-recurrence"></f7-list-item>
                </f7-col>
              </f7-row>
              <!-- Daily Block -->
              <f7-block v-if="showDaily">
                <f7-row class="display-flex justify-content-start align-items-center">
                  <f7-col width="20">
                    <f7-list-item radio value="days" title="Every" name="daily"></f7-list-item>
                  </f7-col>
                  <f7-col width="30">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="days"
                      floating-label
                      type="number"
                      clear-button
                      required>
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row>
                  <f7-col>
                    <f7-list-item radio value="daily" title="Every Weekday" name="daily"></f7-list-item>
                  </f7-col>
                </f7-row>
              </f7-block>
              <!-- END Daily Block -->
              <!-- Weekly Block -->
              <f7-block v-if="showWeekly">
                <f7-row class="display-flex justify-content-start align-items-center">
                  <f7-col width="60" class="margin-left">
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
                        clear-button
                        required>
                      </f7-list-input>
                      </f7-col>
                      <f7-col width="50">
                        <span>Week(s) on:</span>
                      </f7-col>
                    </f7-row>                  
                  </f7-col>
                  <f7-row>
                    <f7-col width="100" class="display-flex">
                      <f7-list-item
                        radio
                        name="day-of-week"
                        value="Monday"
                        title="Monday"
                      ></f7-list-item>
                      <f7-list-item
                        radio
                        name="day-of-week"
                        value="Tuesday"
                        title="Tuesday"
                      ></f7-list-item>
                      <f7-list-item
                        radio
                        name="day-of-week"
                        value="Wednesday"
                        title="Wednesday"
                      ></f7-list-item>
                      <f7-list-item
                        radio
                        name="day-of-week"
                        value="Thursday"
                        title="Thursday"
                      ></f7-list-item>
                      <f7-list-item
                        radio
                        name="day-of-week"
                        value="Friday"
                        title="Friday"
                      ></f7-list-item>
                    </f7-col>
                  </f7-row>
                </f7-row>
              </f7-block>
              <!-- END Weekly Block -->
              <!-- Monthly Block -->
              <f7-block v-if="showMonthly">
                <f7-row class="display-flex justify-content-start align-items-center">
                  <f7-col width="15">
                    <f7-list-item radio value="days" title="Day Number:" name="company-type"></f7-list-item>
                  </f7-col>
                  <f7-col width="15">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="5th"
                      floating-label
                      type="number"
                      clear-button
                      required>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="10">
                    <span>Of every</span>
                  </f7-col>
                  <f7-col width="25">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="4th"
                      floating-label
                      type="number"
                      clear-button
                      required>
                    </f7-list-input>
                  </f7-col>
                </f7-row>
                <f7-row class="display-flex justify-content-start align-items-center">
                  <f7-col width="25">
                    <f7-list-item radio value="days" title="Specific Day" name="company-type"></f7-list-item>
                  </f7-col>  
                  <f7-col width="25">
                    <f7-list-item radio value="days" title="1st" name="company-type"></f7-list-item>
                  </f7-col>
                  <f7-col width="25">
                    <f7-list-item radio value="days" title="15th" name="company-type"></f7-list-item>
                  </f7-col>
                  <f7-col width="25">
                    <f7-list-item radio value="days" title="25th" name="company-type"></f7-list-item>
                  </f7-col>   
                </f7-row>
              </f7-block>
              <!-- END Monthly Block -->
              <!-- Yearly Block -->
              <f7-block v-if="showYearly">
                <f7-row class="display-flex justify-content-start align-items-center">
                  <f7-col width="10" class="margin-left">
                    <span>Recur every</span>
                  </f7-col>
                  <f7-col width="15">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="3"
                      floating-label
                      type="number"
                      clear-button
                      required>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="10">
                    <p>years, on:</p>
                  </f7-col>
                  <f7-col width="15">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="month"
                      floating-label
                      type="select">
                        <option value="">Jan</option>
                        <option value="">Feb</option>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="15">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="day"
                      floating-label
                      type="select">
                        <option value="">1</option>
                        <option value="">2</option>
                    </f7-list-input>
                  </f7-col>
                </f7-row>

              </f7-block>
              <!-- END Row 2 -->

              <!-- Row 3 -->
              <f7-row class="margin-top">
                <f7-block-title class="full-width no-margin-top">Date Range</f7-block-title>
                <f7-col width="50" medium="50">
                  <f7-list-input
                      label="Start Date"
                      id="recurring-start"
                      ref="recurringStartDate"
                      type="datepicker"
                      placeholder="Select date"
                      :calendar-params="{dateFormat: 'MM dd, yyyy'}"
                    >
                      <b-icon slot="media" icon="mdi-clock-outline" size="is-medium"></b-icon>
                    </f7-list-input>
                </f7-col>
                <f7-col width="50" medium="50">
                  <f7-list-input
                      label="End Date"
                      id="recurring-start"
                      ref="recurringStartDate"
                      type="datepicker"
                      placeholder="Select date"
                      :calendar-params="{dateFormat: 'MM dd, yyyy'}"
                    >
                      <b-icon slot="media" icon="mdi-clock-outline" size="is-medium"></b-icon>
                    </f7-list-input>
                </f7-col>
              </f7-row>
              <f7-row class="display-flex justify-content-end">
                <f7-col width="50" class="display-flex justify-content-start align-items-center">
                  <f7-col width="30" class="text-align-left padding-left-half">
                    <f7-list-item
                      
                      title="End after:"
                      radio 
                      value="weekly" 
                      name="contract-recurrence">
                    </f7-list-item>
                  </f7-col>
                  <f7-col width="15">
                    <f7-list-input
                      style="max-width: 150px;"
                      outline
                      label="15"
                      floating-label
                      type="number"
                      clear-button
                      required>
                    </f7-list-input>
                  </f7-col>
                  <f7-col width="10">
                    <p>occurences</p>
                  </f7-col>
                </f7-col>
              </f7-row>
              <f7-row class="display-flex justify-content-end">
                <f7-col width="50" class="text-align-left padding-left-half">
                  <f7-list-item 
                  title="No End Date"
                  radio 
                  value="weekly" 
                  name="contract-recurrence">
                  </f7-list-item>
                </f7-col>
              </f7-row>
              <!-- END Row 3 -->

              <!-- Row 4 -->
               <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="full-width no-margin-top">Amount (Optional)</f7-block-title>
                <f7-col width="30">
                  <f7-list-input
                    outline
                    label="Dollar Amount"
                    type="number"
                    placeholder="$">
                    <f7-icon size="30" icon="mdi mdi-currency" slot="media"></f7-icon>
                  </f7-list-input>
                </f7-col>
                <f7-col width="30">
                  <f7-list-input 
                    outline
                    label="Sales Tax"
                    type="number"
                    placeholder="%"
                    clear-button>
                  </f7-list-input>
                </f7-col>
                <f7-col width="30">
                  <f7-list-input
                    outline
                    label="Tax Rate"
                    type="select">
                    <option value="AZ Sales Tax">AZ Sales Tax</option>
                    </f7-list-input>
                </f7-col>
              </f7-row>
              <!-- End Row 4 -->
              
              <!-- Row 5 -->
              <f7-row class="display-flex justify-content-end margin-top">
                <f7-col width="25">
                  <f7-button outline fill class="bg-color-red">Add Contract</f7-button>
                </f7-col>
              </f7-row> 
            </f7-list>
          </f7-card-content>
        </f7-card>
        
      </f7-page>
    </f7-sheet>
    <!-- END Popup for New Contract -->

  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

  export default {
    name: "recurringContracts",
    data() {
      return {
        //Show / Hide Views
        showDaily: false,
        showWeekly: false,
        showMonthly: false,
        showYearly: false,

        //Popups Modals and Sheets
        sheetPopupOpened: false,
      }
    },
    methods: {
  
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
    },
    mounted() {
      
    },
    on: {
      pageInit() {
        
      }
    }
    
  }
</script>

<style lang="less" scoped>
.new-contract {
  height: 100%;
  width: 100%;
  align-self: center;
}
//Align bigger Popup window
.popup:not(.popup-tablet-fullscreen) {
  left: 40%;
  top: 40%;
}


</style>

