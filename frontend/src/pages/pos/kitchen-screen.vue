<template>
    <f7-page name="kitchen-screen">
      <f7-navbar back-link="Back">
        <f7-nav-left>
          <f7-icon material="menu"></f7-icon>
        </f7-nav-left>
        <f7-nav-title>Kitchen Screen</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-width">
        <!-- Main Container Column -->
        <f7-col width="100">
       
          <f7-row class="display-flex justify-content-flex-end">
            <div v-for="item in Orders.orders" :key="item.id">
                <Vue2InteractDraggable
                  v-if="isShowing"
                  @draggedDown="draggedDown"
                  @draggedLeft="draggedLeft"
                  @draggedRight="draggedRight"
                  @draggedUp="draggedUp"
                  :interact-block-drag-down="interactBlockDragDown"
                  :interact-block-drag-left="interactBlockDragLeft"
                  :interact-block-drag-right="interactBlockDragRight"
                  :interact-block-drag-up="interactBlockDragUp"
                  :interact-max-rotation="15"
                  :interact-lock-x-axis="interactLockXAxis"
                  :interact-lock-y-axis="interactLockYAxis"
                  :interact-lock-swipe-down="interactLockSwipeDown"
                  :interact-lock-swipe-left="interactLockSwipeLeft"
                  :interact-lock-swipe-right="interactLockSwipeRight"
                  :interact-lock-swipe-up="interactLockSwipeUp"
                  :interact-out-of-sight-x-coordinate="500"
                  :interact-x-threshold="200"
                  class="rounded-borders shadow-10 swipe-card">
                  <div class="card-container">
                    <f7-card class="kitchen-card">
                      <f7-card-header>
                        <p>{{ item.title }}</p>
                        <p>{{ item.id }}</p>
                      </f7-card-header>
                      <f7-card-content>
                        <p>Card Content</p>
                        <f7-button fill @click="testMethods">Test Button</f7-button>
                        <p>{{ item.items }}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et doloribus culpa aliquid, exercitationem repellendus numquam. Beatae id eos provident placeat iure odit quasi quaerat maiores reprehenderit, vel molestiae temporibus non.</p>
                      </f7-card-content>
                    </f7-card>
                  </div>
                </Vue2InteractDraggable>
            </div>
          </f7-row>
          <f7-row class="bg-color-orange bottom-buttons padding">
            <f7-col width="20">
              <section class="buttons">
                <f7-button class="event-button" @click="dragLeft">Left</f7-button>
                <f7-button class="event-button" @click="dragDown">Down</f7-button>
                <f7-button class="event-button" @click="dragRight">Right</f7-button>
                <f7-button class="event-button" @click="dragUp">Up</f7-button>
              </section>
            </f7-col>
            <f7-col width="20">
              <f7-button fill>Send Back</f7-button>
            </f7-col>
            <f7-col width="20">
              <f7-button fill>First</f7-button>
            </f7-col>
            <f7-col width="20">
              <f7-button fill>Next</f7-button>
            </f7-col>
            <f7-col width="20">
              <f7-button fill>Last</f7-button>
            </f7-col>
            
          </f7-row>
    



   
          
        </f7-col>
        <!-- Main Container Column -->
      </f7-row>
      <!-- END Main Container Row -->
  
    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact';

const INTERACT_DRAGGED_DOWN = "INTERACT_DRAGGED_DOWN";
const INTERACT_DRAGGED_LEFT = "INTERACT_DRAGGED_LEFT";
const INTERACT_DRAGGED_RIGHT = "INTERACT_DRAGGED_RIGHT";
const INTERACT_DRAGGED_UP = "INTERACT_DRAGGED_UP";

  export default {
    name: "kitchenScreen",
    data() {
      return {
        //Vue-Interact
        isShowing: true,
        isShowing: true,
        interactBlockDragDown: false,
        interactBlockDragLeft: false,
        interactBlockDragRight: false,
        interactBlockDragUp: false,
        interactLockXAxis: false,
        interactLockYAxis: false,
        interactLockSwipeDown: false,
        interactLockSwipeLeft: false,
        interactLockSwipeRight: false,
        interactLockSwipeUp: false,
        interactEventBusEvents: {
        draggedDown: INTERACT_DRAGGED_DOWN,
        draggedLeft: INTERACT_DRAGGED_LEFT,
        draggedRight: INTERACT_DRAGGED_RIGHT,
        draggedUp: INTERACT_DRAGGED_UP
      }
      }
    },
    methods: {
      testMethods(e) {
        console.log("Orders", this.Orders.orders);
        console.log("event", e);
        console.log("event.target", e.target);
      },
       draggedDown() {
      console.log("dragged down!");
      this.hideCard();
    },

      draggedLeft(evt) {
     
        console.log("dragged left!");
        this.hideCard();
      },

      draggedRight() {
        console.log("dragged right!");
        this.hideCard();
      },

      draggedUp() {
        console.log("dragged down!");
        this.hideCard();
      },

      hideCard() {
        setTimeout(() => {
          this.isShowing = false;
          // console.log("Setimeout", this.isShowing);
        }, 200);
        setTimeout(() => {
          this.isShowing = true;
        }, 1000);
      },
      dragDown() {
        InteractEventBus.$emit(INTERACT_DRAGGED_DOWN);
      },

      dragLeft() {
        InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
      },

      dragRight() {
        InteractEventBus.$emit(INTERACT_DRAGGED_RIGHT);
      },

      dragUp() {
        InteractEventBus.$emit(INTERACT_DRAGGED_UP);
      }
      
      },
      computed: {
        ...mapState(["Inventory", "Orders"]),
      },
      mounted() {

    },
    on: {
      pageInit() {
        
      }
    }
  }
</script>

<style lang="scss" scoped>


.card-container {
  margin:3px;
  width: 19vw;
}
.rounded-borders {
  border-radius: 12px;
}
.kitchen-card {

  min-height: 400px;
  color: rgb(66, 66, 66);
}
.bottom-buttons{
  height: 100px;
}
</style>

