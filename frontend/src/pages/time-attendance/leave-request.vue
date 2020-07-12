<template>
    <f7-page name="leave-request">
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".time-attendance">
          <f7-icon color="white" material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Leave Request</f7-nav-title>
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
          <f7-row class="display-flex justify-content-end">
            <f7-col width="30" class="display-flex justify-content-end margin">
              <f7-button fill sheet-open=".edit-leave-request-sheet" class="trans-btn-left"><span>New Leave Request</span></f7-button>
              <f7-button fill class="trans-btn-right" popover-open=".leave-popover" icon-size="40" icon-color="white" icon="mdi mdi-menu-down"></f7-button>
              <f7-popover class="leave-popover">
                <f7-list>
                  <f7-list-item link="#" popover-close title="New Leave Request"></f7-list-item>
                  <f7-list-item link="#" popover-close title="Delete Selected Requests"></f7-list-item>
                  <f7-list-item link="#" sheet-open=".view-leave-request-sheet" popover-close title="View Selected Request"></f7-list-item>
                  <f7-list-item link="#" popover-close title="Edit Selected Request"></f7-list-item>
                </f7-list>
              </f7-popover>
            </f7-col>
          </f7-row>
          <!-- Card-->
          <f7-row class="full-width">
            <f7-col class="padding-left padding-right">
              <f7-card class="margin-top">
                <f7-card-header class="padding-top">               
                  <f7-row class="full-width display-flex align-items-center">
                    <f7-col width="20" class="search-container">
                      <f7-searchbar class="margin-top-half" inline></f7-searchbar>
                    </f7-col>
                    <f7-col width="20">
                      <div>
                        <p>Select Date Range:</p>
                        <f7-list>
                          <div class="list no-hairlines-md">
                            <ul>
                              <li>
                                <div class="item-content item-input">
                                  <div class="item-inner">
                                    <div class="item-input-wrap">
                                      <input type="text" placeholder="Select date range" readonly="readonly" id="leave-range-picker"/>
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
                    There are no leave requests to display
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
                          <th class="label-cell sortable-cell">Date Requested</th>
                          <th class="numeric-cell sortable-cell">Employee</th>
                          <th class="numeric-cell sortable-cell">Manager</th>
                          <th class="numeric-cell sortable-cell">Date(s) Requested</th>
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
                          <td class="numeric-cell">Edward Jones</td>
                          <td class="numeric-cell">06/27/2018</td>
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
          <!-- END Page content-->
        </f7-col>
      </f7-row>
      <!-- END Page wrapper -->

      <!-- Edit Leave Rquest Sheet -->
      <f7-sheet class="edit-leave-request-sheet" :opened="leaveSheetOpened" @sheet:closed="leaveSheetOpened = false">
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
                              <f7-block>
                                <form enctype="multipart/form-data">
                                  <f7-row class="justify-content-center">
                                    <div class="dropzone">
                                      <input type="file" name="invArray" multiple @change="selectFiles" ref="galleryfiles" class="input-field">
                                      <p v-if="!uploading" class="call-to-action">
                                      Drop files here
                                      </p>
                                    </div>
                                  </f7-row>
                                  <f7-row>
                                    <f7-col>
                                      <f7-block>
                                        <div class="field">
                                          <f7-row calss="full-width" v-if="leaveForm.files.length != 0">
                                              <f7-col width="20">
                                                <p>Name</p>
                                              </f7-col>
                                              <f7-col width="20">
                                                <p class="text-align-center">Title</p>
                                              </f7-col>
                                              <f7-col width="30">
                                                <p class="text-align-center">Subtitle</p>
                                              </f7-col>
                                              <f7-col width="20">
                                                <p class="text-align-center">Progress</p>
                                              </f7-col>
                                              <f7-col width="10" class="level-right">
                                                <p>Delete</p>
                                              </f7-col>
                                            </f7-row>
                                          <div :class="`level ${file.invalidMessage && 'has-text-danger'}`" 
                                            v-for="(file, index) in leaveForm.files" :key="index">
                                            
                                            <f7-row class="full-width">
                                              <f7-col width="20">
                                                <div class="level-left">{{file.name}}
                                                  <span v-if="file.invalidMessage">&nbsp; - {{ file.invalidMessage }}</span>
                                                </div>
                                              </f7-col>
                                              <f7-col width="20">
                                                <f7-input 
                                                  :value="file.title"
                                                  @input="file.title = $event.target.value"
                                                  type="text"></f7-input>
                                              </f7-col>
                                              <f7-col width="30">
                                                <f7-input 
                                                  :value="file.sub_title"
                                                  @input="file.sub_title = $event.target.value"
                                                  type="text"></f7-input>
                                              </f7-col>
                                              <f7-col width="20">
                                                <p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
                                                <progress class="progress"></progress>
                                                {{ progress }} %</p>

                                              </f7-col>
                                              <f7-col width="10">
                                                <div class="level-right"><a @click.prevent="leaveForm.files.splice(index, 1);uploadFiles.splice(index, 1)" class="delete">
                                                  </a>
                                                </div>
                                              </f7-col>
                                            </f7-row>
                                          </div>
                                        </div>
                                      </f7-block>
                                    </f7-col>
                                  </f7-row>
                                </form>
                              </f7-block>
                            
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
                            <f7-button sheet-close>Cancel</f7-button>
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
      <!-- END Edit Leave Rquest Sheet -->
         
      <!-- View Leave Rquest Sheet -->
      <f7-sheet class="view-leave-request-sheet" :opened="leaveSheetOpened" @sheet:closed="leaveSheetOpened = false">
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
                            <f7-list-item title="Ian Christensen">
                              <div slot="root-start" class="field-title">Name:</div>
                            </f7-list-item>
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
                            <f7-list-item title="05/24/2010">
                              <div slot="root-start" class="field-title">Date:</div>
                            </f7-list-item>
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
                                <f7-list-item title="Personal">
                                  <div slot="root-start" class="field-title">Leave Type:</div>
                                </f7-list-item>
                              </f7-col>
                              <f7-col width="50">
                                <f7-list-item title="5">
                                  <div slot="root-start" class="field-title">Days Requested:</div>
                                </f7-list-item>
                              </f7-col>
                            </f7-row>
                            <f7-row>
                            <f7-col width="50">
                              <f7-list-item title="3">
                                <div slot="root-start" class="field-title">Start Date / Time:</div>
                              </f7-list-item>
                            </f7-col>
                            <f7-col width="50">
                              <f7-list-item title="4">
                                <div slot="root-start" class="field-title">End Date / Time:</div>
                              </f7-list-item>
                            </f7-col>
                          </f7-row>
                          </f7-col>
                          <f7-col width="50">
                            <f7-col width="50">
                              
                              <input type="file" class="field-title" />
                              <p>thisfile.png</p>
                            
                            <p style="border: 1px solid black; height:75px; width:100%;">Comments:</p>
                          </f7-col>
                          </f7-col>
                        </f7-row>
                        </f7-list>
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
      <!-- END View leave Rquest Sheet -->
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "leaveRequest",
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
      selectFiles() {  
        const files = this.$refs.leavefiles.files;
        this.uploadFiles = [...this.leaveForm.files, ...files];
        this.leaveForm.files = [
          ...this.leaveForm.files,
          ..._.map(files, key => ({
            name: key.name, 
            size: key.size, 
            type: key.type,
            title: key.title,
          }))
        ]
        console.log("this.files2", this.leaveForm.files);
        console.log("this.uploadFiles", this.uploadFiles);
      },
      sendFiles() {
        if(this.uploadFiles.length != 0) {
          console.log('this.uploadFiles.length', this.uploadFiles);
          var lastUploadFile = this.uploadFiles.pop();
          console.log('lastUploadFile.pop', lastUploadFile);
          var lastFile = this.files.pop();
          console.log('lastFile.pop', lastFile);

          const formData = new FormData();
          if(this.validateFiles(lastUploadFile) === undefined) {
            formData.set('image', lastUploadFile);
            console.log("file[key]", lastUploadFile);
            console.log("lastFile", lastFile);
            formData.set('product', this.invForm.id);
            formData.set('title', lastFile.title);
            formData.append('sub_title', lastFile.sub_title);
            formData.append('size', lastFile.size);
            //Just logging the formData Only
            for(let pair of formData.entries()) {
              console.log("formData Pairs", pair[0]+ ',' + pair[1]);
            }
            try {
              this.uploading = true;
              axios({
                method: 'put',
                data: formData,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  "Authorization": "Token " + token
                },
                url: '/django/inventorygallery/'+ formdata.id + '/',
                onUploadProgress: function (e) {
                  this.progress = Math.round(e.loaded * 100 / e.total)
                }
              }).then(response => {
                console.log("response", response);
                this.$store.commit('APPEND_GALLERY_LIST', response.data);
                this.uploadedFiles.push(response.data.file);
                response.type = "Update Inventory Gallery Images";
					      this.$store.dispatch('updateNotification', response); 
              });  
              this.uploading = false;
              this.message = "File has been uploaded";
              formData.delete('file');
            } catch {
                this.uploadMessage = err.response.data.error;
                this.error = true;
                this.uploading = false;
              }
          }
          console.log("formData2", formData);
          this.sendFiles();
        } else {
          console.log("Else Statement of Images, No more left");
          console.log("Else, this.invForm", this.invForm);
          this.getInventoryImages();
        }       
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
.edit-leave-request-sheet {
  height: 100%;
}
.view-leave-request-sheet {
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

</style>

