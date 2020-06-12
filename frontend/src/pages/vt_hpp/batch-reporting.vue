<template>
    <f7-page name="batch-reporting">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".virtual-terminal">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Virtual Terminal</f7-nav-title>
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
      
      <custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
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
              
              <f7-button fill class="trans-btn-right" icon-size="40" icon="mdi mdi-menu-down"></f7-button>
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
                <div class="card data-table data-table-collapsible  data-table-init">
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
              </f7-card-content>
            </f7-card>
        </f7-col>
      </f7-row>
      </custom-scrollbar>
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

  export default {
    name: "batchReporting",
    data() {
      return {
        showPanel: false,
        settings: {
          maxScrollbarLength: 120
        }
      }
    },
    methods: {
      scrollHandle(evt) {
      }
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
    },
    mounted() {
      var calendarRange = this.$f7.calendar.create({
          inputEl: '#calendar-range',
          rangePicker: true,
          range: {
            from: new Date(2016, 0, 1),
            to: Date.now()
          }
        });
    },
    on: {
      pageInit() {
        
      }
    }
    
  }
</script>

<style lang="less" scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}

.custom-searchbar {
  display: flex;
  justify-content: space-evenly;
  text-align: left;
}

.account-div {
  width: 40%px;
  height: 50px;
  background: rgb(221, 220, 220);
  border-left: 1px solid black;
  border-right: 1px solid black;
  color: black;
}
.trans-btn-left {
  border-radius: 5px 0px 0px 5px;
  
}
.trans-btn-right {
  border-radius: 0px 5px 5px 0px;
  border-left: 1px solid black;
}
.search-container {
  display: flex;
  margin-top: 15px;
  margin-left: 50px;
}


</style>

