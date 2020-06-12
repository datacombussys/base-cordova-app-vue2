<template>
    <f7-page name="label-merge">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-2">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Merge Labels Data</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
      </f7-navbar>
      
      <f7-row>
        <!-- Main Column -->
        <f7-col width="100" medium="100">
          <!-- Page content-->
          <f7-block-title medium>Merge Labels</f7-block-title>
          <div class="block">
            <button class="button" @click="activeStep = 0">Start Over</button>
          </div>
          <b-steps v-model="activeStep"
            :animated="isAnimated"
            :has-navigation="hasNavigation"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            size="is-large">
            <!-- Select Inventory Item from Database -->
            <b-step-item label="Choose Data" icon="database" :clickable="isStepsClickable">
              <!-- Card-->
              <f7-card class="demo-card-header-pic margin-top">
                <f7-card-header class="padding-top">               
                  <f7-block-header>Select inventory items to merge</f7-block-header>
                </f7-card-header>
                <f7-card-content>
                  <custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
                  <f7-row v-if="Inventory.inventoryList.length === 0">
                    <f7-col>
                      <p class="text-align-center">There are no items to display.</p>
                      <p class="text-align-center">Please create a new inventory item.</p>
                        <f7-row class="full-width margin-top">
                          <f7-col>
                            <f7-button href="/inventory/" large fill class="bg-color-red">Add New Item</f7-button>
                          </f7-col>
                        </f7-row>
                    </f7-col>
                  </f7-row>
                  <f7-block v-if="Inventory.inventoryList.length != 0">
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
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">ID</div>
                              <div class="input" style="width: 100px">
                                <input type="number" placeholder="Filter">
                              </div>
                            </th>
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">Date Added</div>
                              <div class="input" style="width: 200px">
                                <input type="date" placeholder="Filter">
                              </div>
                            </th>
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">Name</div>
                              <div class="input" style="width: 200px">
                                <input type="text" placeholder="Filter">
                              </div>
                            </th>
                            
                            <th class="input-cell sortable-cell">
                            <div class="table-head-label">Category</div>
                            <div class="input input-dropdown">
                              <select>
                                <option 
                                v-for="category in Inventory.categories" 
                                :key="category.id"
                                value="All">{{ category.name }}</option>
                              </select>
                            </div>
                          </th>
                          </tr>
                        </thead>
                        <tbody v-for="item in mergedInventory" :key="item.id">
                          <tr>
                            <td class="checkbox-cell">
                              <label class="checkbox">
                                <input type="checkbox"/>
                                <i class="icon-checkbox"></i>
                              </label>
                            </td>
                            <td class="label-cell text-align-left">{{item.id}}</td>
                            <td class="label-cell text-align-left">{{item.date_added | moment("MM/DD/YYYY")}}</td>
                            <td class="label-cell text-align-left">{{item.name}}</td>
                            <td class="label-cell text-align-left">{{item.category || ""}}</td>
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
                  </f7-block>
                  </custom-scrollbar>
                </f7-card-content>
              </f7-card>
            </b-step-item>
            <!-- END Inventory Database -->

            <!-- Labels Database -->
            <b-step-item label="Choose Template" icon="label-percent-outline">
              <!-- Card-->
              <f7-card class="margin-top">
                <f7-card-header class="padding-top">               
                  <f7-block-header>Select Label Template</f7-block-header>
                </f7-card-header>
                <f7-card-content>
                  <f7-row v-if="Labels.inventoryLabelList.length === 0">
                    <f7-col>
                      <p class="text-align-center">There are no items to display.</p>
                      <p class="text-align-center">Please create a new inventory item.</p>
                        <f7-row class="full-width margin-top">
                          <f7-col>
                            <f7-button href="/inventory/" large fill class="bg-color-red">Add New Item</f7-button>
                          </f7-col>
                        </f7-row>
                    </f7-col>
                  </f7-row>
                  <f7-block v-if="Labels.inventoryLabelList.length != 0">
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
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">ID</div>
                              <div class="input" style="width: 100px">
                                <input type="number" placeholder="Filter">
                              </div>
                            </th>
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">Date Added</div>
                              <div class="input" style="width: 200px">
                                <input type="date" placeholder="Filter">
                              </div>
                            </th>
                            <th class="input-cell sortable-cell">
                              <div class="table-head-label">Name</div>
                              <div class="input" style="width: 200px">
                                <input type="text" placeholder="Filter">
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody v-for="label in Labels.inventoryLabelList" :key="label.id">
                          <tr>
                            <td class="checkbox-cell">
                              <label class="checkbox">
                                <input type="checkbox"/>
                                <i class="icon-checkbox"></i>
                              </label>
                            </td>
                            <td class="label-cell text-align-left">{{ label.id }}</td>
                            <td class="label-cell text-align-left">{{ label.date_added | moment("MM/DD/YYYY") }}</td>
                            <td class="label-cell text-align-left">{{ label.name }}</td>
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
                  </f7-block>
                </f7-card-content>
              </f7-card>
            </b-step-item>
            <!-- END Labels Database -->
            <!-- Merge Documents -->
            <b-step-item label="Download and Print" icon="cloud-download">
              <p>Step 3</p>
            </b-step-item>
          <!--End Merge Documents -->
          <template
            v-if="customNavigation"
            slot="navigation"
            slot-scope="{previous, next}">
            <f7-row class="display-flex justify-content-space-around">
              <f7-col width="25" class="imageNavButtons">
                <b-button
                  class="display-flex justify-content-center"
                  outlined
                  type="is-danger"
                  icon-pack="mdi"
                  icon-left="arrow-left-box"
                  size="is-large"
                  :disabled="previous.disabled"
                  @click.prevent="previous.action">
                  Previous
              </b-button>
          
              </f7-col>
              <f7-col width="25" class="imageNavButtons">
                  <b-button
                  class="display-flex justify-content-center"
                  outlined
                  type="is-success"
                  icon-pack="mdi"
                  size="is-large"
                  icon-left="arrow-right-box"
                  :disabled="next.disabled"
                  @click.prevent="next.action">
                  Next
              </b-button>
              </f7-col>
            </f7-row>
          </template>
          <!-- END navigation Links -->
        </b-steps>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-button @click="testMethod">Test</f7-button>
        </f7-col>
      </f7-row>
      
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

  export default {
    name: "labelMerge",
    data() {
      return {
        settings: {
          maxScrollbarLength: 120
        },
        //b-Steps
        activeStep: 0,
        showSocial: false,
        isAnimated: true,
        hasNavigation: true,
        customNavigation: true,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        isStepsClickable: false,
        isProfileSuccess: false,
      }
    },
    methods: {
      testMethod() {
        // console.log('Inventory.categories', this.Inventory.categories);
        // console.log('Inventory.inventoryList', this.Inventory.inventoryList);
        // var catList = this.Inventory.categories;
        // var invList = this.Inventory.inventoryList;

        //Use Category ID to get Category name
        var catList = this.Inventory.categories;
        var newInvList = this.Inventory.inventoryList;
        // newInvList.forEach((each, index) => {
        //   if(each['category'] == undefined) {
        //     each['category'] = 1232434676;
        //   } else {
            
        //   }
        //   console.log('newInvList', newInvList);
        // });
        // newInvList.forEach(elem => {
        //       elem.category = catList.find((item, index) => {
        //         return item.id == elem.category_id;
        //       });
        //     });
        //     return newInvList;
        
      
        
       
      },
      scrollHandle(evt) {
      }
    },
    computed: {
      ...mapState(["Users", "Inventory", "Labels"]),
      mergedInventory() {
        var catList = this.Inventory.categories;
        var newInvList = this.Inventory.inventoryList;
        newInvList.forEach(elem => {
          var result = catList.find((item, index) => {
            return elem.category == elem.category_id;
          });
          elem.category = result['name'];
        });
        
        return newInvList;
      }
    },
    mounted() {
      this.$store.dispatch("getInventoryLabels");
      this.$store.dispatch("getInventoryList");
      this.$store.dispatch("getInventoryCategories");
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
  max-height: 400px;
}

</style>

