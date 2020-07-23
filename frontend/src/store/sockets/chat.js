;
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Import and Use Axios


export const Chat = {
	namespace: true,
	state: {
    publicChatRooms: [
      'Company Wide',
      'Marketing',
      'Sales', 
      'Accounting',
      'Warehouse',
      'IT and Web Dev'
    ],
    messages: {},
    messagesOrder: [],
    chatList: []
	},
	mutations: {
    NEW_MESSAGE(state, message) {
      state.messages[message.id] = message;
      state.messagesOrder.push(message.id);
    }, 
    SET_CHAT_LIST(state, payload) {
      state.chatList = payload;
    }
	},
	actions: {
    getConnectedClients() {
      console.log('getConnectedClients from Vuex');
    },
    emitSocketEvent(data) {
      // console.log("this._vm.$socket", this._vm.$socket);
      // console.log(this._vm.$socket.client.emit('eventName', data));
      this._vm.$socket.client.emit('userLeftServer', "Michael");
    },

	},
	getters: {
  
  }
}