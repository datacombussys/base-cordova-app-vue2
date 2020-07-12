<template>
    <f7-page name="chat-app">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Chat</f7-nav-title>
        <f7-nav-right>
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
                <f7-col class="nav-col-2 display-flex">
                  <f7-link 
                  icon-color="white" 
                  icon-size="40" 
                  href="/lobby/"
                  icon="mdi mdi-chevron-left">Lobby</f7-link>
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

          <!-- Content Section Chat -->
          <f7-row class="full-width body-row display-flex justify-content-stretch">
            <f7-col class="body-col-1 display-flex flex-direction-column padding">
              <!-- Left Nav Section -->
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title>In this room</f7-block-title>
                <f7-list class="full-width" accordion-list>
                  <f7-list-item accordion-item title="Chat Users">
                    <f7-accordion-content>
                   
                      <!-- <f7-list-index
                          indexes="auto"
                          list-el=".list.contacts-list"
                          :scroll-list="false"
                          :label="false"
                          @listindex:select="onIndexSelect"
                        ></f7-list-index> -->

                        <f7-list contact-list>
                          <f7-list-group>
                            <f7-list-item no-chevron title="A" group-title>
                            </f7-list-item>
                            <f7-list-item title="Aaron">
                              <img src="/static/UserProfile75x75.png" style="width: 35px" slot="media">
                              <f7-link icon-size="20" icon="mdi mdi-dots-horizontal" popover-open=".user-menu"></f7-link>
                            </f7-list-item>
                            <f7-list-item title="B" group-title></f7-list-item>
                            <f7-list-item title="Benjamin"></f7-list-item>
                            <f7-list-item title="Blake"></f7-list-item>
                            <f7-list-item title="Bobby"></f7-list-item>
                          </f7-list-group>
                        </f7-list>
                        <f7-popover class="user-menu">
                          <f7-list>
                            <f7-list-item link="#" no-chevron popover-close title="Private-Message"></f7-list-item>
                            <f7-list-item link="#" no-chevron popover-close title="Nudge"></f7-list-item>

                          </f7-list>
                        </f7-popover>
                    </f7-accordion-content>
                  </f7-list-item>
                </f7-list>
              </f7-row>

              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title>All users</f7-block-title>
                <f7-list class="full-width" accordion-list> 
                  <f7-list-item accordion-item title="All Available">
                    <f7-accordion-content>
                  
                      <!-- <f7-list-index
                          indexes="auto"
                          list-el=".list.contacts-list"
                          :scroll-list="false"
                          :label="false"
                          @listindex:select="onIndexSelect"
                        ></f7-list-index> -->

                        <f7-list contact-list>
                          <f7-list-group>
                            <f7-list-item no-chevron title="A" group-title>
                            </f7-list-item>
                            <f7-list-item title="Aaron">
                              <img src="/static/UserProfile75x75.png" style="width: 35px" slot="media">
                              <f7-link icon-size="20" icon="mdi mdi-dots-horizontal" popover-open=".user-menu"></f7-link>
                            </f7-list-item>
                            <f7-list-item title="B" group-title></f7-list-item>
                            <f7-list-item title="Benjamin"></f7-list-item>
                            <f7-list-item title="Blake"></f7-list-item>
                            <f7-list-item title="Bobby"></f7-list-item>
                          </f7-list-group>
                        </f7-list>
                        <f7-popover class="user-menu">
                          <f7-list>
                            <f7-list-item link="#" no-chevron popover-close title="Invite to Room"></f7-list-item>
                            <f7-list-item link="#" no-chevron popover-close title="Private-Message"></f7-list-item>
                            <f7-list-item link="#" no-chevron popover-close title="Nudge"></f7-list-item>
                          </f7-list>
                        </f7-popover>
                    </f7-accordion-content>
                  </f7-list-item>
                </f7-list>
              </f7-row>
              <f7-row>
                <f7-col>
                  <f7-button @click="chatTestButton">Test Button</f7-button>
                </f7-col>
              </f7-row>
            </f7-col>
            <!-- END Col-1 -->

            <!-- Col-2 Chat List Display-->
            <f7-col class="body-col-2 no-padding full-height">
              <f7-row class="full-width full-height display-flex justify-content-space-evenly">
                  <f7-col width="100" class="full-height">
                   
                     <f7-messages ref="messages" new-messages-first>
                        <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title>
                        <f7-message
                          v-for="(message, index) in messagesData"
                          :key="index"
                          :type="message.type"
                          :image="message.image"
                          :name="message.name"
                          :avatar="message.avatar"
                          :first="isFirstMessage(message, index)"
                          :last="isLastMessage(message, index)"
                          :tail="isTailMessage(message, index)"
                        >
                          <span slot="text" v-if="message.text" v-html="message.text"></span>
                        </f7-message>
                        <f7-message v-if="typingMessage"
                          type="received"
                          :typing="true"
                          :first="true"
                          :last="true"
                          :tail="true"
                          :header="`${typingMessage.name} is typing`"
                          :avatar="typingMessage.avatar"
                        ></f7-message>
                      </f7-messages>
                  </f7-col>
                  <f7-col width="100">
                    <f7-messagebar
                    class="sticky-bar"
                      resize-page
                      :placeholder="placeholder"
                      ref="messagebar"
                      :attachments-visible="attachmentsVisible"
                      :sheet-visible="sheetVisible"
                    >
                      <f7-link
                        icon-ios="f7:camera_fill"
                        icon-aurora="f7:camera_fill"
                        icon-md="material:camera_alt"
                        slot="inner-start"
                        @click="sheetVisible = !sheetVisible"
                      ></f7-link>
                      <f7-link
                        icon-ios="f7:arrow_up_circle_fill"
                        icon-aurora="f7:arrow_up_circle_fill"
                        icon-md="material:send"
                        slot="inner-end"
                        @click="sendMessage"
                      ></f7-link>
                      <f7-messagebar-attachments>
                        <f7-messagebar-attachment
                          v-for="(image, index) in attachments"
                          :key="index"
                          :image="image"
                          @attachment:delete="deleteAttachment(image)"
                        ></f7-messagebar-attachment>
                      </f7-messagebar-attachments>
                      <f7-messagebar-sheet>
                        <f7-messagebar-sheet-image
                          v-for="(image, index) in images"
                          :key="index"
                          :image="image"
                          :checked="attachments.indexOf(image) >= 0"
                          @change="handleAttachment"
                        ></f7-messagebar-sheet-image>
                      </f7-messagebar-sheet>
                    </f7-messagebar>
                  </f7-col>
                      
       
  
              </f7-row>
                  </f7-col>
                
              </f7-row>
        </f7-col>
        <!-- END Main Column -->
      </f7-row>
      <!-- END Main Container Row-->
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';


export default {
    name: "chat",
    data() {
      return {
        //Main Settings
        users: [],
        username: null,
        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
        //f7-messages Settings
        attachments: [],
        sheetVisible: false,
        typingMessage: false,
        messagesData: [       
          {
            name: 'Kate',
            type: 'received',
            text: 'Nice going man. Really Cool!',
            image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
          },
          {
            name: 'Kate',
            type: 'received',
            text: 'Like it very much!',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
          },
        ],
        images: [
          'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
          'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',

        ],
        people: [
          {
            name: 'Kate Johnson',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
          },
          {
            name: 'Blue Ninja',
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
          },
        ],
        answers: [
          'Yes!',
          'No',
          'Hm...',
          'I am not sure',
          'And what about you?',
          'May be ;)',
          'Lorem ipsum dolor sit amet, consectetur',
          'What?',
          'Are you sure?',
          'Of course',
          'Need to think about it',
          'Amazing!!!',
        ],
        responseInProgress: false,
      }
    },
    methods: {
      chatTestButton() {
        // console.log("This.myMessages", this.myMessages);
        // console.log("this.$socket", this.$socket);
        this.$store.dispatch("emitSocketEvent");

   
      
    

      },

      
      // f7-Contact List
      onIndexSelect(itemContent) {
        console.log(itemContent);
      },
      //f7-messages Methods
      isFirstMessage(message, index) {
        const previousMessage = this.messagesData[index - 1];
        if (message.isTitle) return false;
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
      },
      isLastMessage(message, index) {
        const nextMessage = this.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
      isTailMessage(message, index) {
        const nextMessage = this.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
      deleteAttachment(image) {
        const index = this.attachments.indexOf(image);
        this.attachments.splice(index, 1)[0]; // eslint-disable-line
      },
      handleAttachment(e) {
        const index = this.$$(e.target).parents('label.checkbox').index();
        const image = this.images[index];
        if (e.target.checked) {
          // Add to attachments
          this.attachments.unshift(image);
        } else {
          // Remove from attachments
          this.attachments.splice(this.attachments.indexOf(image), 1);
        }
      },
      sendMessage() {
        // console.log('evt', evt);
        var $$ = this.Dom7;
        //Scrolltom bottom Need to reconfigure
        // var elem = $$('.scroll-area-messages')[0];
        // elem.scrollTop = elem.clientHeight;
        // Handle text
        const text = this.messagebar.getValue().replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        this.attachments.forEach(attachment => {
          messagesToSend.push({
            image: attachment,
            type: "sent",
            text: text,
            name: this.Users.userData.username
          });
        });
        if (text.trim().length) {
          messagesToSend.push({
            type: "sent",
            text: text,
            name: this.Users.userData.username
          });
        }
        if (messagesToSend.length === 0) {
          return;
        }

        // Reset attachments
        this.attachments = [];
        // Hide sheet
        this.sheetVisible = false;
        // Clear area
        this.messagebar.clear();
        // Focus area
        if (text.length) this.messagebar.focus();
        // Send message
        this.$socket.client.emit('msg', ...messagesToSend);
        // this.messagesData.push(...messagesToSend);


        //Meassages Options - See docs
        // if (this.responseInProgress) return;
        // this.responseInProgress = true; - set response to true
        // this.typingMessage = { - start animation
        //   name: person.name,
        //   avatar: person.avatar,
        // };
        //this.messagesData.push({ - push message here
        //       text: answer,
        //       type: 'received',
        //       name: person.name,
        //       avatar: person.avatar,
        //     });
        // this.typingMessage = null;   - End Animation
        // this.responseInProgress = false;  - End Animation

      },
      //Join the ChatRoom on Node Server - **No Arrow funcitons**
      joinServer() {
        const userData = {name:this.Users.userData.username, room: "Marketing "} 
        console.log("joining server, userData", userData);
        this.$socket.client.emit('join', userData, ({error}) => {
          console.log('error adding new user', error);
        });
        this.$store.commit('NOTIFICATION_MESSAGE', this.Users.userData.username + " " + "Logged in");
      },
    
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
      ...mapActions(["getConnectedClients"]),

      //f7-messages Computed properties
      attachmentsVisible() {
        return this.attachments.length > 0;
      },
      placeholder() {
        return this.attachments.length > 0 ? 'Add comment or Send' : 'Message';
      },
      
    },
    //Socket Listeners
    sockets: {
      connection: function (data) {
          console.log('socket connected from Vue');
          console.log('connection Data', data);
      },
      loggedIn: function(data) {
        console.log('Vue On loggedIn');
        var loginData = data;
        console.log('Vue loginData Works!', loginData);
        this.$socket.client.emit('newUser', this.Users.userData.username);
      },
      userOnline: function (user) {
        console.log('A new user has joined the chat', user);
        //Do a method here to notify everybody in the chat
        this.users.push(user);
        
      },
      sendMessage: function (msg) { //Messages received from the server to client
        console.log('Receiving a new message', msg);
        //Push to MessageData Stack
        this.messagesData.push(msg);
        this.messagesData.slice(-1)[0]= 'received';
        console.log('clientMSG this.messagesData', this.messagesData);
      },
      message: function (msg) { //Messages received from the server Admin to client
        console.log('Receiving a new admin message', msg);
        //Push to MessageData Stack
        this.messagesData.push(msg);
        this.messagesData.slice(-1)[0]= 'sent';
        console.log('clientMSG this.messagesData', this.messagesData);

      },
      userLeft: function (user) {
        console.log('This User Left the room', user);
        this.users.splice(this.users.indexOf(user), 1);
      },
      
    },
    watch: {

    },
    mounted() {
      
      //f7-messages bind messagebar to data
      this.$f7ready(() => {
        this.messagebar = this.$refs.messagebar.f7Messagebar;
        this.messages = this.$refs.messages.f7Messages;
      });

      this.joinServer();
      
      
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
    height: 100vh;
    width: 17%;
  }
  .body-col-2 {
    background: rgb(255, 255, 255);
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
//Link Buttons in Nav
.link-button{
  background: rgb(74, 88, 114);
  color: white;
  &.active {
    background:rgb(47, 58, 80);
  }
}
.message-content {
  height: 100%;
}
.messages {
 height: 100%;
}
.sticky-bar {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0px;
  background: rgb(153, 197, 200);
  height: 50px;
}
.messagebar-sheet {
 height: 600px;
 position: relative;
}
</style>

