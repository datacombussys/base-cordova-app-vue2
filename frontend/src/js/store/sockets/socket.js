import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Socket = {
	namespace: true,
	state: {
    // we store messages as a dictionary for easier access and interaction
    // @see https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
    messages: {},
    messagesOrder: [],
    chatList: []
	},
	mutations: {
    NEW_MESSAGE(state, message) {
      state.messages[message.id] = message;
      state.messagesOrder.push(message.id);
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