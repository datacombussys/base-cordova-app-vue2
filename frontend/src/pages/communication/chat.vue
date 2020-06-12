<template>
    <f7-page name="chat-app" @page:init="onPageInit">
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
                  <div>
                    <p>Marketing Room</p>
                </div>
                </f7-col>
                <f7-col class="nav-col-4 display-flex justify-content-end">
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
            <f7-col class="body-col-2 no-padding">
              <f7-row class="full-width display-flex justify-content-space-evenly">
                <f7-col width="100" class="full-height2">
                  <f7-row class="full-width">
                    <f7-messages ref="messages" class="full-width" new-messages-first>
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

                  </f7-row>
                  <f7-row class="full-width message-bar-row">
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
                    </f7-messagebar>
                  </f7-row>
                  <f7-row class="full-width" v-if="sheetVisible">
                    <f7-messagebar-sheet>
                      <f7-messagebar-sheet-image
                        v-for="(image, index) in images"
                        :key="index"
                        :image="image"
                        :checked="attachments.indexOf(image) >= 0"
                        @change="handleAttachment"
                      ></f7-messagebar-sheet-image>
                    </f7-messagebar-sheet>
                  </f7-row>
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

//Import Audio File Incoming
var audio = new Audio('/static/notification_alert1.mp3');
var inSound = new Audio('/static/chat-incoming.mp3');
var outSound = new Audio('/static/chat-outgoing.mp3');


export default {
  // on: {
  //     pageInit: function (page) {
  //        console.log('page', page);
  //        console.log('e', e);
  //        this.$setState({
  //         roomName: "roomname123",
  //         });
      

  //     }
  //   },
    name: "chat",
    data() {
      return {
        //Main Settings
        users: [],
        roomName: "",
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
        // this.$store.dispatch("emitSocketEvent");


        // var views = this.$f7.views;
        // console.log("views", views);
        // console.log("this.$f7.views.current", this.$f7.views.current);
        console.log('this.Users.employeeProfile', this.Users.employeeProfile);      
    

      },
      //PageINit Method
      onPageInit(page) {
        console.log('page', page);
        this.roomName = page.route.params.room;

        this.joinServer();
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
        //Need to reconfigure scrollt to bottom
        // var elem = $$('.scroll-area-messages')[0];
        // elem.scrollTop = elem.clientHeight;
        // Handle text
        const text = this.messagebar.getValue().replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        this.attachments.forEach(attachment => {
          messagesToSend.push({
            name: this.Users.employeeProfile.user.full_name,
            type: "sent",
            text: text,
            avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
            image: attachment,
            
          });
        });
        if (text.trim().length) {
          messagesToSend.push({
            name: this.Users.employeeProfile.user.full_name,
            type: "sent",
            text: text,
            avatar: '/static/UserProfile75x75.png',
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
        this.$socket.client.emit('sendMessage', ...messagesToSend);
        // this.messagesData.push(...messagesToSend);

        //Make sound
        outSound.play();
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
        const room = this.roomName;
        console.log("this.roomName", this.roomName);
        const name = this.Users.employeeProfile.user.full_name
        this.$socket.client.emit('join', {name, room}, () => {
          
        });
        this.$store.commit('NOTIFICATION_MESSAGE', this.Users.employeeProfile.user.full_name + " " + "Logged in");
        
      },
    
    },
    
    computed: {
      ...mapState(["Users", "Inventory", "Chat"]),
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
        this.$socket.client.emit('newUser', this.Users.employeeProfile.user.full_name);
      },
      roomData: function (users) {
        console.log('List of Users in the room', users);
        this.$store.commit('SET_CHAT_LIST', users);
        console.log('this.Chat.chatList', this.Chat.chatList);
      },
      sendMessage: function (msg) { //Messages received from the server to client
        console.log('Receiving a new message', msg);
        //Determine if msg was sent by this user and alter the 'type' property
        const lowerCaseName = this.Users.employeeProfile.user.full_name.trim().toLowerCase();
        const sameUser = msg.name === this.Users.employeeProfile.user.full_name;
        console.log('msg.name', msg.name);
        console.log('lowerCaseName', lowerCaseName);

        if(sameUser) {
          //Push to MessageData Stack
          this.messagesData.push(msg);
          this.messagesData.slice(-1)[0]['type']= 'sent';
        }
        else {
          //Push to MessageData Stack
          this.messagesData.push(msg);
          this.messagesData.slice(-1)[0]['type']= 'received';
        }
        
        console.log('clientMSG this.messagesData', this.messagesData);
        //Play incoming Sound
        inSound.play();
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

        //Get Roomname from URL parameters
        // this.roomName = this.$f7.views.current.router.currentRoute.params.room;
        // console.log("this.roomName mount", this.roomName);
        // console.log("this.$route.params", this.$route.params);

        //Get Messages form Messagebar
        this.messagebar = this.$refs.messagebar.f7Messagebar;
        this.messages = this.$refs.messages.f7Messages;
      });

      
      
      
    },
    created() {
      
    },
    //None of these work -------
 
    
  }
</script>

<style lang="less" scoped>

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
       width: 25%;
      }
      .nav-col-2 {
        width: 25%;
        .searchbar {
          display: flex;
          justify-content: flex-start;
          width: 300px;
        }
      }
      .nav-col-3 {
         width: 25%;
      }
      .nav-col-4 {
         width: 25%;
      }
  }
}
.body-row {
  .body-col-1 {
    background: rgb(217, 230, 235);
    height: 85vh;
    width: 17%;
  }
  .body-col-2 {
    background: rgb(255, 255, 255);
    height: 85vh;
    width: 83%;
  }
}

//Message Div
.full-height2 {
  background: rgb(5, 97, 105);
  height: 85vh;
  padding: 20px;
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
//MessageBar Formatting
// .message-content {
//   height: 100%;
//   background: green;
// }
.messages {
 height: 75vh;

}
.sticky-bar {
  position: absolute;
  position: sticky;
  bottom: 0px;
  background: rgb(153, 197, 200);

}
.messagebar-sheet {
 height: 100px;
 width: 100%;
}
</style>

