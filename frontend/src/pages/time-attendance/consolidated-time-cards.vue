<template>
    <f7-page name="leave-request">
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".time-attendance">
          <f7-icon color="white" material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Consolidated TimeCards</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
          <!-- Page content-->

          <!-- Card Overview -->
          <f7-row class="full-width">
            <f7-col class="padding-left padding-right">
              <f7-card class="margin-top">
                <f7-card-content>
                  <div class="error-text" hidden>
                    There are no timesheets to display
                  </div>
                  <div class="data-table data-table-collapsible  data-table-init">
                    <table>
                      <thead>
                        <tr>
                          <th class="label-cell sortable-cell">End Date</th>
                          <th class="numeric-cell sortable-cell">Total Hours</th>
                          <th class="numeric-cell sortable-cell">Total Overtime</th>
                          <th class="numeric-cell sortable-cell">Total Leave</th>
                          <th class="numeric-cell sortable-cell">Total Pay</th>
                          <th class="numeric-cell sortable-cell">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr @click="selectPayCycle">
                          <td class="label-cell">06/01/2020</td>
                          <td class="numeric-cell">220 hrs</td>
                          <td class="numeric-cell">25 hrs</td>
                          <td class="numeric-cell">8 hrs</td>
                          <td class="numeric-cell">$13,279</td>
                          <td class="numeric-cell">Archived</td>
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
                </f7-card-content>
              </f7-card>
            </f7-col>
          </f7-row>
          <!-- END Card Overview-->

          <!-- Card Consolidated Timesheets-->
          <f7-row class="full-width">
            <f7-col class="padding-left padding-right">
              <f7-card class="margin-top">
                <f7-card-header class="padding-top">               
                  <f7-row class="full-width display-flex align-items-center">
                    <f7-col width="20" class="search-container">
                      <f7-searchbar class="margin-top-half" inline></f7-searchbar>
                    </f7-col>
                    <f7-col width="20">
                     
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
                    <f7-col width="20">
                       <f7-row class="display-flex justify-content-end">
                        <f7-col width="25" class="display-flex justify-content-end margin">
                          <div>
                            <f7-button fill sheet-open=".view-timesheet" class="timecard-btn-left"><span>Actions</span></f7-button>
                          </div>
                          <f7-button fill class="timecard-btn-right" popover-open=".timesheet-popover" icon-size="40" icon-color="white" icon="mdi mdi-menu-down"></f7-button>
                          <f7-popover class="timesheet-popover">
                            <f7-list>
                              <f7-list-item link="#" popover-close title="Approve Timesheet"></f7-list-item>
                              <f7-list-item link="#" popover-close sheet-open=".view-timesheet" title="View Timesheet"></f7-list-item>
                              <f7-list-item link="#" popover-close sheet-open=".edit-timesheet" title="Edit Timesheet"></f7-list-item>
                            </f7-list>
                          </f7-popover>
                        </f7-col>
                      </f7-row>
                    </f7-col>
                    
                  </f7-row>
                </f7-card-header>
                <f7-card-content>
                  <div class="error-text" hidden>
                    There are no timesheets for this period
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
                          <th class="label-cell sortable-cell">End Date</th>
                          <th class="numeric-cell sortable-cell">Employee</th>
                          <th class="numeric-cell sortable-cell">Hours</th>
                          <th class="numeric-cell sortable-cell">Overtime</th>
                          <th class="numeric-cell sortable-cell">Leave</th>
                          <th class="numeric-cell sortable-cell">Status</th>
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
                          <td class="numeric-cell">Michael Tolstoy</td>
                          <td class="numeric-cell">40</td>
                          <td class="numeric-cell">3</td>
                          <td class="numeric-cell">0</td>
                          <td class="numeric-cell">Approved</td>
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
                </f7-card-content>
              </f7-card>
            </f7-col>
          </f7-row>
          <!-- END Card Consolidated Timesheets-->
        </f7-col>
      </f7-row>
      <!-- END Page wrapper -->
         
      <!-- View Leave Rquest Sheet -->
      <f7-sheet class="view-timesheet" :opened="leaveSheetOpened" @sheet:closed="leaveSheetOpened = false">
        <f7-toolbar>
          <div class="left"></div>
          <div class="right">
            <f7-link sheet-close>Close</f7-link>
          </div>
        </f7-toolbar>
        <!-- Scrollable sheet content -->
        <f7-page-content>
          <f7-row class="full-width">
            <f7-col width="100" class="display-flex flex-direction-column padding">
              <f7-row style="background:#4E4F50; border-radius: 7px;">
                <f7-col width="50" class="padding-left">
                  <f7-block-title class="classy text-color-white">Employee TimeCard</f7-block-title>
                </f7-col>
                <f7-col width="50" class="display-flex justify-content-end padding">
                  
                  <p class="text-color-white">Status: <b-tag size="is-medium" type="is-success">Open</b-tag></p>
                </f7-col>
              </f7-row>
              
              <f7-row class="full-width">
                <f7-col width="70">
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Employee Information</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="30">
                            <f7-list-item title="Ian Christensen">
                              <div slot="root-start" class="field-title">Name:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="30">
                            <f7-list-item title="3100014">
                              <div slot="root-start" class="field-title">Employee ID:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="30">
                            <f7-list-item title="$12.35">
                              <div slot="root-start" class="field-title">Hourly wage:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                        <f7-row>
                          <f7-col width="30">
                            <f7-list-item title="Marketing">
                              <div slot="root-start" class="field-title">Department:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="30">
                            <f7-list-item title="Marketing Director">
                              <div slot="root-start" class="field-title">Position:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="30">
                            <f7-list-item title="Full Time">
                              <div slot="root-start" class="field-title">Employement Type:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row> 
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
                <f7-col width=30>
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Pay Period Details</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <f7-list-item title="bi-weekly">
                              <div slot="root-start" class="field-title">Pay Cycle:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-item title="42">
                              <div slot="root-start" class="field-title">Total Hours:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                        <f7-row>
                          <f7-col width="50">
                            <f7-list-item title="04/06/2020">
                              <div slot="root-start" class="field-title">Period Start:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-item title="04/20/2020">
                              <div slot="root-start" class="field-title">Period Ending:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>

              <f7-row class="full-width">
                <f7-col width="100">
                  <f7-card>
                    <f7-card-header>
                      
                      <f7-row class="full-width">
                        <f7-col width="60">
                          <f7-block-title class="classy-small">TimeCard Details</f7-block-title>
                        </f7-col>
                        <f7-col width="30" class="display-flex justify-content-end margin">
                          <div>
                            <f7-button fill sheet-open=".view-timesheet" class="timecard-btn-left"><span>Actions</span></f7-button>
                          </div>
                          <f7-button fill class="timecard-btn-right" popover-open=".timesheet-popover" icon-size="40" icon-color="white" icon="mdi mdi-menu-down"></f7-button>
                          <f7-popover class="timesheet-popover">
                            <f7-list>
                              <f7-list-item link="#" popover-close title="Approve Timesheet"></f7-list-item>
                              <f7-list-item link="#" popover-close sheet-open=".view-timesheet" title="View Timesheet"></f7-list-item>
                              <f7-list-item link="#" popover-close sheet-open=".edit-timesheet" title="Edit Timesheet"></f7-list-item>
                            </f7-list>
                          </f7-popover>
                        </f7-col>
                      </f7-row>
                    </f7-card-header>
                    <f7-card-content>
                      <div class="error-text" hidden>
                        There are no timesheets for this period
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
                              <th class="label-cell sortable-cell">Day</th>
                              <th class="numeric-cell sortable-cell">Clock-In</th>
                              <th class="numeric-cell sortable-cell">Lunch (Minutes)</th>
                              <th class="numeric-cell sortable-cell">Clock-Out</th>
                              <th class="numeric-cell sortable-cell">Regular Hours</th>
                              <th class="numeric-cell sortable-cell">Overtime Hours</th>
                              <th class="numeric-cell sortable-cell">PTO Hours</th>
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
                              <td class="label-cell">Monday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Tuesday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Wednesday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Thursday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Friday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Saturday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>
                            <tr>
                              <td class="checkbox-cell">
                                <label class="checkbox">
                                  <input type="checkbox"/>
                                  <i class="icon-checkbox"></i>
                                </label>
                              </td>
                              <td class="label-cell">Sunday</td>
                              <td class="numeric-cell">7:59</td>
                              <td class="numeric-cell">45</td>
                              <td class="numeric-cell">16:59</td>
                              <td class="numeric-cell">8.02</td>
                              <td class="numeric-cell">0.00</td>
                              <td class="numeric-cell">0.00</td>
                            </tr>

                          </tbody>
                        </table>
                      </div>



                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="100">
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Approval Information</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <f7-row>
                            <f7-col width="50">
                              <f7-list-item title="John Smith">
                                <div slot="root-start" class="field-title">Approved by:</div>
                              </f7-list-item>
                            </f7-col>
                            <f7-col width="50">
                              <f7-list-item title="5/24-2019">
                                <div slot="root-start" class="field-title">Approval Date:</div>
                              </f7-list-item>
                            </f7-col>
                              </f7-row>
                          </f7-col>
                          <f7-col width="50">
                            <p style="border: 1px solid black; height:75px; width:100%;">Remarks:</p>
                          </f7-col>
                        </f7-row>
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>
            </f7-col>
          </f7-row>    
        </f7-page-content>
      </f7-sheet>
      <!-- END View TimeSheet -->

      <!-- Edit TimeSheet -->
      <f7-sheet class="edit-timesheet" :opened="leaveSheetOpened" @sheet:closed="leaveSheetOpened = false">
        <f7-toolbar>
          <div class="left"></div>
          <div class="right">
            <f7-link sheet-close>Close</f7-link>
          </div>
        </f7-toolbar>
        <!-- Scrollable sheet content -->
        <f7-page-content>
          <f7-row class="full-width">
            <f7-col width="100" class="display-flex flex-direction-column padding">
              <f7-row style="background:#4E4F50; border-radius: 7px;">
                <f7-col width="50" class="padding-left">
                  <f7-block-title class="classy text-color-white">Leave Request Form</f7-block-title>
                </f7-col>
                <f7-col width="50" class="display-flex justify-content-end padding">
                  <!-- <b-tag size="is-medium" :type="`${props.row.is_active ? 'is-success' : 'is-danger'}`">{{ props.row.is_active ? "Active" : "Inactive" }}</b-tag> -->
                  <p>Status: Approved</p>
                </f7-col>
              </f7-row>
              
              <f7-row class="full-width">
                <f7-col width="50">
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Employee Information</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <p class="field-title">Name:</p>
                            <f7-list-input 
                              class="datacom-input"
                              type="select" 
                              :value="leaveForm.employee"
                              @input="leaveForm.employee = $event.target.value"
                            >
                              <option value="">Ian Christensen</option>
                              <option value="">Joe Smith</option>
                            </f7-list-input>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-item title="3100014">
                              <div slot="root-start" class="field-title">Employee ID:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                        <f7-row>
                          <f7-col width="50">
                            <f7-list-item title="Marketing">
                              <div slot="root-start" class="field-title">Department:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-input :title="leaveForm.date">
                              <div slot="root-start" class="field-title">Date:</div>
                            </f7-list-input>
                          </f7-col>
                        </f7-row> 
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
                <f7-col width="50">
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Leave Balance</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <f7-list-item title="12">
                              <div slot="root-start" class="field-title">Vacation Days Remaining:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-item title="13">
                              <div slot="root-start" class="field-title">Sick Days Remaining:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                        <f7-row>
                          <f7-col width="50">
                            <f7-list-item title="3">
                              <div slot="root-start" class="field-title">Personal Days Remaining:</div>
                            </f7-list-item>
                          </f7-col>
                          <f7-col width="50">
                            <f7-list-item title="4">
                              <div slot="root-start" class="field-title">PTO Days Remaining:</div>
                            </f7-list-item>
                          </f7-col>
                        </f7-row>
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>

              <f7-row class="full-width">
                <f7-col width="100">
                  <f7-card>
                    <f7-card-header>
                      <f7-block-title class="classy-small">Leave Details</f7-block-title>
                    </f7-card-header>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <f7-row>
                              <f7-col width="50">
                                <p>Leave Type:</p>
                                <f7-list-input
                                  class="datacom-input"
                                  type="select" 
                                  :value="leaveForm.leaveType"
                                  @input="leaveForm.leaveType = $event.target.value">
                                  <option value="">Personal Time Off</option>
                                  <option value="">Paid Time Off</option>
                                  <option value="">Vacation</option>
                                  <option value="">Sick Time Off</option>
                                </f7-list-input>
                              </f7-col>
                              <f7-col width="50">
                                <p>Days Requested:</p>
                                <f7-list-item title="5">
                                </f7-list-item>
                              </f7-col>
                            </f7-row>
                            <f7-row>
                            <f7-col width="50">
                              <p>Start Date / Time:</p>
                              <div class="list no-hairlines-md">
                                <ul>
                                  <li>
                                    <div class="item-content item-input datacom-input">
                                      <div class="item-inner">
                                        <div class="item-input-wrap">
                                          <input type="text" placeholder="Select date" readonly="readonly" id="leave-start-date"/>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                   
                            </f7-col>
                            <f7-col width="50">
                              <p>End Date / Time:</p>
                              <div class="list no-hairlines-md">
                                <ul>
                                  <li>
                                    <div class="item-content item-input datacom-input">
                                      <div class="item-inner">
                                        <div class="item-input-wrap">
                                          <input type="text" placeholder="Select date" readonly="readonly" id="leave-end-date"/>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </f7-col>
                          </f7-row>
                          </f7-col>
                          <f7-col width="50">
                            <f7-col width="50">
                        
                            
                            </f7-col>
                          </f7-col>
                        </f7-row>
                        </f7-list>
                        <f7-row>
                          <f7-col width="100">
                            <f7-list>
                              <p style="border: 1px solid black; height:75px; width:100%;">Comments:</p>
                            </f7-list>
                            
                          </f7-col>
                        </f7-row>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="100">
                  <f7-card>
                    <f7-card-content>
                      <f7-list class="padding-half">
                        <f7-row>
                          <f7-col width="50">
                            <f7-button>Cancel</f7-button>
                          </f7-col>
                          <f7-col width="50">
                            <f7-button>Sumbit</f7-button>
                          </f7-col>
                        </f7-row>
                      </f7-list>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
              </f7-row>
              
            </f7-col>
          </f7-row>    
        </f7-page-content>
      </f7-sheet>
      <!-- END Edit timeSheet -->
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "ConsolidatedTimeCards",
    data() {
      return {
        //Main Settings
        leaveForm: {
          employee: null,
          employee_id: null,
          manager: null,
          approved_by: null,
          approve_decline_date: null,
          leaveType: null,
          start_date: null,
          end_date: null,
          days_requested: 1,
          date: 12-31-2011,
          status: null,
          is_approved: false,
          leave_comments: null,
          approval_remarks: null,
          vacation_remaining: null,
          sick_remaining: null,
          personal_remaining: null,
          pto_remaining: null,
          files: []

        },
        //Image Uploading
        fileURL: null,
        uploadFiles: [],
        uploadedFiles: [],
        uploading: false,
        uploadMessage: "",
        error: false,
        fileProgress: 0,
        //Sheets and Popups
        leaveSheetOpened: false,
     
      }
    },
    methods: {
      testButton() {

      },
      selectPayCycle() {
        console.log("selectPayCycle");
      },
     
   
   
  
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
     
    },
    watch: {
 
    },
    mounted() {
      var calendarRange = this.$f7.calendar.create({
        inputEl: '#leave-range-picker',
        rangePicker: true
      });
      var leaveStartDate = this.$f7.calendar.create({
        inputEl: '#leave-start-date',
        timePicker: true,
        timePickerPlaceholder: "Select Time (Optional)",
        dateFormat: 'MM dd, yyyy HH::mm'
      });
      var leaveEndDate = this.$f7.calendar.create({
        inputEl: '#leave-end-date',
        timePicker: true,
        timePickerPlaceholder: "Select Time (Optional)",
        dateFormat: 'MM dd, yyyy HH::mm'
      });
     
    },
    created() {

    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.edit-timesheet {
  height: 100%;
}
.view-timesheet {
  height: 100%;
}
.dropzone {
  min-height: 100px;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  outline: 2px dashed grey;
  outline-offset: -10px;
  width: 90%;
  background: lightcyan;
  color: dimgray;
  &:hover {
    background: lightblue;
  }
  & .call-to-action {
    font-size: 2rem;
    text-align: center;
    padding: 30px;
  }
}
.input-field {
  opacity: 0;
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
}

//Double Button
.timecard-btn-left {
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: 5px 0px 0px 5px;
  border: 1px solid black;
  height: 35px;
}
.timecard-btn-right {
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 15%;
  border-radius: 0px 5px 5px 0px;
  border: 1px solid black;
  height: 35px;
}

</style>

