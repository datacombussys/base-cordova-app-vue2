<template>
    <f7-page name="chat-lobby">
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Chat Lobby</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link href="/checkout/">
              <f7-icon color="white" ios="f7:bell" aurora="f7:bell" md="f7:bell">
                <f7-badge color="red">5</f7-badge>
              </f7-icon>
            </f7-link>
            <f7-link icon-color="white" v-if="Users.isLoggedIn" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" v-if="!Users.isLoggedIn" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
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
                  <f7-button round class="link-button active margin-right" large>Inbox</f7-button>
                  <f7-button round class="link-button active margin-right" large>Notifications</f7-button>
                </f7-col>
                <f7-col class="nav-col-2 display-flex">
                  <f7-block-header class="text-color-white">Main Lobby</f7-block-header>
                </f7-col>
                <f7-col class="nav-col-3 display-flex justify-content-end">
                  <div class="field">
                    <b-switch 
                    size="is-large"
                    :value="$socket.connected"
                    type="is-success">Connected</b-switch>
                </div>
                </f7-col>
            </f7-col>
            </f7-navbar>
          </f7-row>
          <!-- END Title Bar -->

          <!-- Page content-->
          <f7-row class="full-width body-row display-flex justify-content-stretch">
            <!-- Col-1 Left Nav Section-->
            <f7-col class="body-col-1 display-flex flex-direction-column padding">
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title>In this room</f7-block-title>
                <f7-col>


                </f7-col>
              </f7-row>
            </f7-col>

            <!-- Col-2 Chat List Display-->
            <f7-col class="body-col-2 no-padding full-height">
              <f7-row class="full-width full-height display-flex justify-content-space-evenly">
                  <f7-col width="50">
                  
                      <f7-card class="elevation-3">
                        <f7-card-header>
                          <f7-block-header>Join a Group</f7-block-header>
                        </f7-card-header>
                        <f7-card-content>
                          <f7-list v-for="room in Chat.publicChatRooms" :key="room.id">
                            <f7-list-item :link="`/chat-app/${room}`" :title="room"></f7-list-item>
                          </f7-list>
                        </f7-card-content>
                        <f7-card-footer>
                          <p class="margin">*Private conversations are not be posted as available chats</p>
                        </f7-card-footer>
                      </f7-card>

                  </f7-col>
                  <f7-col width="50">
                  
                      <f7-card class="elevation-3">
                        <f7-card-header>
                          <f7-block-header>Create a New Conversation</f7-block-header>
                        </f7-card-header>
                        <f7-card-content>
                          <f7-list>
                            <f7-list-item>
                              <f7-row class="full-width display-flex justify-content-space-evenly">
                                <f7-col width="50">
                                <f7-radio
                                  class="display-flex"
                                  name="chat-room-type"
                                  value="Public"
                                ><span class="margin-left-half">Public</span></f7-radio>
                              </f7-col>
                              <f7-col width="50">
                                <f7-radio
                                  class="display-flex"
                                  name="chat-room-type"
                                  value="Private"
                                ><span class="margin-left-half">Private</span></f7-radio>
                              </f7-col>
                              </f7-row>
                              
                            </f7-list-item>
                            <f7-list-input
                              label="Group Name"
                              type="text"
                              placeholder="Marketing Review Call"
                              clear-button
                            >
                              <f7-icon icon="mdi mdi-account" slot="media"></f7-icon>
                            </f7-list-input>
                          </f7-list>
                        </f7-card-content>
                        <f7-card-footer>
                          <p class="margin">Join and invite guests</p>
                        </f7-card-footer>
                      </f7-card>

                  </f7-col>
              </f7-row>
            </f7-col>


          </f7-row>
        </f7-col>
      </f7-row>
      
   
        

        
            




    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "chatLobby",
    data() {
      return {
        //Main Settings

        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
     
      }
    },
    methods: {
      testButton() {
   
       
      },
     //Scrollbar Handler
      scrollHandle(e) {
        
      },
      

      
      //Custom Scrollbar
   
  
    },
    computed: {
      ...mapState(["Users", "Inventory", "Chat"]),
     
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

<style lang="scss" scoped>


.navbar {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
}

.title-bar {
  height: 75px;
  .row-col-1 {
    height: 100%;
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
          width: 30%;
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
    height: 100vh;
    width: 17%;
  }
  .body-col-2 {
    background: rgb(185, 185, 185);
    height: 100vh;
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

</style>

