<template>
    <f7-page name="email">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Inbox</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
          <!-- Title Bar -->
          <f7-row class="full-width title-bar display-flex justify-content-stretch">
            <f7-navbar>
              <f7-col class="row-col-1 display-flex justify-content-center align-items-center text-color-white padding">
                <img src="/static/UserProfile600x600.png" style="width:60px; height: 60px;" class="no-margin-left margin-right-half">
                <span style="font-size: 0.75em;">Ian Christensen</span>
                <span><f7-icon class="color-white" size="30" icon="mdi mdi-chevron-down" slot="media"></f7-icon></span>
              </f7-col>
              <f7-col class="row-col-2 display-flex align-items-center justify-content-space-between text-color-white padding">
                <f7-col class="nav-col-1 display-flex">
                  <f7-button round class="link-button active margin-right" @click="showView = 'email'" large>Inbox</f7-button>
                  <f7-button round class="link-button active margin-right" @click="showView = 'notification'" large>Notifications</f7-button>
                </f7-col>
                <f7-col class="nav-col-2 display-flex">
                  <f7-searchbar
                  class="searchbar"
                    disable-button-text="Cancel"
                    placeholder="Search"
                    :clear-button="true"
                  ></f7-searchbar>
                </f7-col>
                <f7-col class="nav-col-3 display-flex justify-content-end">
                  <f7-link href="/checkout/">
                    <f7-icon color="white" ios="f7:bell" aurora="f7:bell" md="f7:bell">
                      <f7-badge color="red">5</f7-badge>
                    </f7-icon>
                  </f7-link>
                  <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
                  <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
                  <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
                  <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
                </f7-col>
            </f7-col>
            </f7-navbar>
          </f7-row>
          <!-- END Title Bar -->
          <!-- Content Section Email -->
          <f7-row v-if="showView == 'email'" class="full-width body-row display-flex justify-content-stretch">
            <f7-col resizable class="body-col-1 display-flex flex-direction-column padding">
              <!-- Left Nav Section -->
              <f7-row class="full-width">
                <f7-col width="100" class="display-flex align-content-center">
                   <f7-button fill class="trans-btn-left full-width display-flex" large round raised icon-color="white" icon-size="30" icon="mdi mdi-email-plus-outline" text="New Email"></f7-button>
                </f7-col>
              </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">MAILBOXES</f7-block-title>
                <f7-col width="100">
                  <f7-list class="full-width email-nav-list">
                    <f7-list-item no-chevron link="#" badge="525" badge-color="success" title="Inbox">
                      <f7-icon size="30" class="color-blue" slot="media" icon="mdi mdi-email"></f7-icon>
                    </f7-list-item>
                    <f7-list-item no-chevron link="#" badge="13" badge-color="success" title="Flagged">
                      <f7-icon size="30" class="color-red" slot="media" icon="mdi mdi-flag"></f7-icon>
                    </f7-list-item>
                    <f7-list-item no-chevron link="#" badge="43" badge-color="success" title="Sent">
                      <f7-icon size="30" class="color-deeporange" slot="media" icon="mdi mdi-email-send-outline"></f7-icon>
                    </f7-list-item>
                    <f7-list-item no-chevron link="#" badge="5456" badge-color="success" title="Deleted">
                      <f7-icon size="30" class="color-black" slot="media" icon="mdi mdi-trash-can-outline"></f7-icon>
                    </f7-list-item>
                  </f7-list>
                </f7-col>
              </f7-row>

              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">FOLDERS</f7-block-title>
                <f7-col width="100">
                  <f7-list class="full-width email-nav-list">
                    <f7-list-item no-chevron link="#" title="Personal">
                    </f7-list-item>
                    <f7-list-item no-chevron link="#" title="Business">
                    </f7-list-item>
                  </f7-list>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-block></f7-block>
              </f7-row>

              <f7-row class="full-width">
                <f7-col width="100">

                  <f7-link icon-f7="home" text="New Request Form" color="red"></f7-link>
                  <f7-link icon-f7="home" text="Request Templates" color="blue"></f7-link>

                </f7-col>
              </f7-row>
            </f7-col>
            <!-- END Col-1 -->

            <!-- Col-2 Email List Display-->
            <f7-col resizable class="body-col-2 display-flex flex-direction-column align-items-center no-padding">
              <f7-row class="full-width padding-half">
                <f7-col width="70" class="display-flex align-items-center">
                  <span>Sort by Date</span>
                  <span><f7-icon size="25" icon="mdi mdi-chevron-down"></f7-icon></span>
                </f7-col>
                <f7-col width="30" class="level-right">
                  <f7-icon size="25" class="color-grey" icon="mdi mdi-sort-descending"></f7-icon>
              </f7-col>
            </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <custom-scrollbar class="email-scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
                  <f7-col width="100" class="display-block">
                    <f7-list-group media-list class="full-width email-list mail">
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Accounting"
                        after="10:45"
                        subtitle="System: Accounting"
                        text="The Acocunting Module needs your approval."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="John Smith"
                        after="1:25"
                        subtitle="Requesting Time Off"
                        text="Hey manager, Can I request time off for the following days?."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item is_active"
                        link="#"
                        title="Payroll"
                        after="17:14"
                        subtitle="Payroll Needs your Approval"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing et. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Tiemsheets"
                        after="17:14"
                        subtitle="Timesheets need your approval"
                        text="Lorem ipsum dolor sit amet,  eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Scheduling"
                        after="17:14"
                        subtitle="Vacation Time Off Request"
                        text="Lut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                    </f7-list-group>
                  </f7-col>
                </custom-scrollbar>
              </f7-row>
            </f7-col>
            <!-- END Col-2 Email List-->

            <!-- Col-3 Email Display-->
            <f7-col class="body-col-3 display-flex flex-direction-column align-items-flex-start">
              
              <f7-row class="full-width padding-half" style="background: rgb(185, 185, 185);">
                <f7-col width="30" class="display-flex justify-content-space-evenly">
                  <f7-icon size="25" icon="mdi mdi-undo"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-tag"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-download"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-dots-horizontal"></f7-icon>
                </f7-col>
                <f7-col width="30" class="display-flex justify-content-space-evenly">
                  <f7-icon size="25" icon="mdi mdi-chevron-double-up"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-down"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-up"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-double-down"></f7-icon>
                </f7-col>
              </f7-row>
              <f7-row class="email-header full-width display-flex justify-content-center align-items-flex-end">
                <f7-col width="40">
                  <p>Subject: Accounting needs approval to run payroll</p>
                  <p>From:Accounting Module</p>
                </f7-col>
                <f7-col width="40" class="display-flex flex-direction-column justify-content-center">
                  <f7-segmented strong tag="p">
                    <f7-button small>Approve</f7-button>
                    <f7-button small>Decline</f7-button>
                  </f7-segmented>
                </f7-col>
                <f7-col width="20" class="display-flex flex-direction-column align-items-flex-end">
                  <f7-badge color="yellow">Overdue</f7-badge>
                  <f7-badge color="green">System Notification</f7-badge>
                  <f7-badge color="Rred">Approval Requested</f7-badge>
                </f7-col>
              </f7-row>
              <custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
              <f7-row class="full-width email-body">
                <f7-col>
              
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  
                </f7-col>
              </f7-row>
              </custom-scrollbar>
            </f7-col>
            <!-- END Col-3 Email Display Display-->
          </f7-row>
          <!-- END Content Section Email -->

          <!-- Content Section Notifications-->
          <f7-row v-if="showView == 'notification'" class="full-width body-row display-flex justify-content-stretch">
            <f7-col class="body-col-1 display-flex flex-direction-column padding">
              <!-- Left Nav Section -->
              <f7-row class="full-width">
                <f7-col width="100" class="display-flex align-content-center">
                   <f7-button fill class="trans-btn-left full-width display-flex" large round raised icon-color="white" icon-size="30" icon="mdi mdi-email-plus-outline" text="New Notification"></f7-button>
                </f7-col>
              </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">Notifications</f7-block-title>
                <f7-col width="100">
                </f7-col>
              </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">FOLDERS</f7-block-title>
                <f7-col width="100">
                  <f7-list class="full-width email-nav-list">
                    <f7-list-item no-chevron link="#" title="Personal">
                    </f7-list-item>
                    <f7-list-item no-chevron link="#" title="Business">
                    </f7-list-item>
                  </f7-list>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-block></f7-block>
              </f7-row>
            </f7-col>
            <!-- END Col-1 Nav Notifications-->

            <!-- Col-2 Notification List -->
            <f7-col class="body-col-2 display-flex flex-direction-column align-items-center no-padding">
              <f7-row class="full-width padding-half">
                <f7-col width="70" class="display-flex align-items-center">
                  <span>Sort by Date</span>
                  <span><f7-icon size="25" icon="mdi mdi-chevron-down"></f7-icon></span>
                </f7-col>
                <f7-col width="30" class="level-right">
                  <f7-icon size="25" class="color-grey" icon="mdi mdi-sort-descending"></f7-icon>
              </f7-col>
            </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <custom-scrollbar class="email-scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
                  <f7-col width="100" class="display-block">
                    <f7-list-group media-list class="full-width email-list mail">
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item is_active"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                      <f7-list-item
                        class="email-preview-item"
                        link="#"
                        title="Facebook"
                        after="17:14"
                        subtitle="New messages from John Doe"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros."
                      ></f7-list-item>
                    </f7-list-group>
                  </f7-col>
                </custom-scrollbar>
              </f7-row>
            </f7-col>
            <!-- END Col-2 Notification List-->

            <!-- Col-3 Notification Display-->
            <f7-col class="body-col-3 display-flex flex-direction-column align-items-flex-start">
              <f7-row class="full-width padding-half" style="background: rgb(185, 185, 185);">
                <f7-col width="80" class="display-flex">
                  <f7-icon size="25" icon="mdi mdi-undo"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-tag"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-download"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-dots-horizontal"></f7-icon>
                </f7-col>
                <f7-col width="20" class="display-flex">
                  <f7-icon size="25" icon="mdi mdi-chevron-double-up"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-down"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-up"></f7-icon>
                  <f7-icon size="25" icon="mdi mdi-chevron-double-down"></f7-icon>
                </f7-col>
              </f7-row>
              <f7-row class="email-header full-width">
                <f7-col width="80">
                  <p>Name of Email</p>
                  <p>From:</p>
                  <p>To:</p>
                </f7-col>
                <f7-col width="20">
                  <f7-badge color="green"> Active</f7-badge>
                </f7-col>
              </f7-row>
              <custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHandle">
              <f7-row class="full-width email-body">
                <f7-col>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio aspernatur tenetur, facilis eligendi magnam aut odit optio recusandae dolores totam, ipsam quidem nobis culpa quaerat vitae. Eligendi, facilis iure.</p>
                </f7-col>
              </f7-row>
              </custom-scrollbar>
            </f7-col>
            <!-- END Col-3 Notification Display-->
          </f7-row>
          <!-- END Content Section Notifications -->


        </f7-col>
        <!-- END Main Column -->
      </f7-row>
      <!-- END Main Container Row-->
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "email",
    data() {
      return {
        //Main Settings
        showView: "email",
        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
  
      }
    },
    methods: {
      testButton() {

        console.log("this.$refs.messagebar", this.$refs.messagebar);

      },
     
      scrollHandle(evt) {
      }
   
  
 
  
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
      //f7-messages Computed properties
      
    },
    watch: {

    },
    mounted() {
  
     
      
    },
    created() {

    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="less" scoped>
.email-scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100vh;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100vh;
}
.navbar {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
}
.title-bar {
  height: 75px;
  .row-col-1 {
    height: 100vh;
    width: 17%;
    background:rgb(47, 58, 80);
  }
  .row-col-2 {
    height: 100%;
    width: 83%;
    background:rgb(74, 88, 114);
      .nav-col-1 {
       width: 30%;
      }
      .nav-col-2 {
        width: 40%;
        .searchbar {
          display: flex;
          justify-content: flex-start;
          width: 300px;
        }
      }
      .nav-col-3 {
         width: 30%;
      }
  }
}
.body-row {
  .body-col-1 {
    background: rgb(217, 230, 235);
    height: 100%;
    min-width: 10%;
  }
  .body-col-2 {
    background: rgb(185, 185, 185);
    height: 100%;
    min-width: 15%;
  }
  .body-col-3 {
    background: rgb(207, 207, 207);
    height: 100%;
    min-width: 30%;
  }
}

.body-row {
  .chat-col-2 {
    background: rgb(207, 207, 207);
    height: 80%;
    width: 83%;
  }
}
.searchbar-inner {
  div {
    input {
      width: 150px;
    }
  }
}
//Link Buttons in Nav
.link-button{
  background: rgb(74, 88, 114);
  color: white;
  &.active {
    background:rgb(47, 58, 80);
  }
}
.email-header {
  border-radius: 10px;
  background: white;
  padding: 10px;
}
.email-body {
  padding: 10px;
  border-radius: 10px;
  height: 100%;
  background: white;
  margin-top: 10px;
}

</style>

